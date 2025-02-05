import GoogleProvider from "next-auth/providers/google";
import { FirestoreAdapter } from "@auth/firebase-adapter";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import type { JWT } from "next-auth/jwt"
import { Account, Profile, User as NextAuthUser, Session } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import { getFirestore } from 'firebase-admin/firestore';
import { User } from '@/types/user';

// Firebase Admin başlatma
const apps = getApps();

if (!apps.length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
}

const db = getFirestore();

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
  ],
  adapter: FirestoreAdapter({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  }),
  pages: {
    signIn: "/admin",
    error: '/admin/error',
    signOut: '/admin'
  },
  callbacks: {
    async signIn({ 
      user, 
      account, 
      profile 
    }: { 
      user: NextAuthUser | AdapterUser; 
      account: Account | null; 
      profile?: Profile 
    }) {
      if (!user.email) {
        console.log('E-posta adresi bulunamadı');
        return false;
      }

      try {
        // Firestore'dan kullanıcıyı kontrol et
        const userDoc = await db.collection('users').doc(user.email).get();
        
        if (!userDoc.exists) {
          // Koleksiyondaki toplam kullanıcı sayısını kontrol et
          const usersSnapshot = await db.collection('users').count().get();
          const isFirstUser = usersSnapshot.data().count === 0;

          // Kullanıcı yoksa oluştur
          const newUser = {
            id: user.id,
            email: user.email,
            name: user.name || '',
            image: user.image || '',
            isAdmin: isFirstUser,
            createdAt: new Date(),
            updatedAt: new Date()
          };

          await db.collection('users').doc(user.email).set(newUser);
          
          console.log('Yeni kullanıcı oluşturuldu:', {
            email: user.email,
            isAdmin: isFirstUser
          });
          
          return isFirstUser;
        }

        const userData = userDoc.data() as User;
        
        // Eğer isAdmin alanı yoksa veya null ise güncelle
        if (userData.isAdmin === undefined || userData.isAdmin === null) {
          // Koleksiyondaki toplam kullanıcı sayısını kontrol et
          const usersSnapshot = await db.collection('users').count().get();
          const isFirstUser = usersSnapshot.data().count === 1;
          
          await db.collection('users').doc(user.email).update({
            isAdmin: isFirstUser,
            updatedAt: new Date()
          });
          
          userData.isAdmin = isFirstUser;
        }

        console.log('Kullanıcı girişi:', {
          email: user.email,
          isAdmin: userData.isAdmin,
          name: userData.name
        });

        return userData.isAdmin;
      } catch (error) {
        console.error('Kullanıcı kontrolünde hata:', error);
        return false;
      }
    },
    async session({ session, token, user }: { session: Session; token: JWT; user: AdapterUser }) {
      try {
        if (!session.user?.email) {
          return session;
        }
        
        // Firestore'dan güncel admin durumunu kontrol et
        const userDoc = await db.collection('users').doc(session.user.email).get();
        const userData = userDoc.data() as User;

        return {
          ...session,
          user: {
            ...session.user,
            id: user.id,
            isAdmin: userData.isAdmin
          }
        };
      } catch (error) {
        console.error('Oturum oluşturmada hata:', error);
        return session;
      }
    },
    async jwt({ token, user, account, profile }: { 
      token: JWT; 
      user?: NextAuthUser | AdapterUser; 
      account?: Account | null; 
      profile?: Profile 
    }) {
      if (user) {
        try {
          const userDoc = await db.collection('users').doc(user.email!).get();
          const userData = userDoc.data() as User;
          token.isAdmin = userData.isAdmin;
          token.userId = user.id;
        } catch (error) {
          console.error('Token oluşturmada hata:', error);
        }
      }
      return token;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
  session: {
    strategy: "jwt" as const,
  }
}; 