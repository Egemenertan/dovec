import GoogleProvider from "next-auth/providers/google";
import { FirestoreAdapter } from "@auth/firebase-adapter";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import type { JWT } from "next-auth/jwt"
import { Account, Profile, User as NextAuthUser, Session, AuthOptions } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import { getFirestore } from 'firebase-admin/firestore';
import { User } from '@/types/user';

// Firebase Admin başlatma
const apps = getApps();

const getPrivateKey = () => {
  const key = process.env.FIREBASE_PRIVATE_KEY;
  if (!key) return undefined;
  try {
    // Eğer JSON string olarak kaydedildiyse
    return JSON.parse(key);
  } catch {
    // Eğer düz string olarak kaydedildiyse
    return key.replace(/\\n/g, '\n');
  }
};

if (!apps.length) {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = getPrivateKey();

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error('Firebase Admin SDK yapılandırma bilgileri eksik');
  }

  try {
    initializeApp({
      credential: cert({
        projectId,
        clientEmail,
        privateKey,
      }),
    });
  } catch (error) {
    console.error('Firebase Admin başlatma hatası:', error);
    throw error;
  }
}

const db = getFirestore();

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
      authorization: {
        params: {
          access_type: "offline",
          response_type: "code",
          prompt: "select_account"
        }
      }
    }),
  ],
  adapter: FirestoreAdapter({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID!,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
      privateKey: getPrivateKey()!,
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
        const userDoc = await db.collection('users').doc(user.email).get();
        
        if (!userDoc.exists) {
          console.log('Yeni kullanıcı kaydı yapılıyor');
          const usersSnapshot = await db.collection('users').count().get();
          const isFirstUser = usersSnapshot.data().count === 0;

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
          console.log('Yeni kullanıcı kaydedildi, admin durumu:', isFirstUser);
          return isFirstUser;
        }

        const userData = userDoc.data() as User;
        console.log('Mevcut kullanıcı bilgileri:', {
          email: user.email,
          isAdmin: userData.isAdmin,
          name: userData.name
        });
        return userData.isAdmin === true;
      } catch (error) {
        console.error('Kullanıcı kontrolünde detaylı hata:', error);
        return false;
      }
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith('/')) return `${baseUrl}${url}`
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session?.user) {
        session.user.isAdmin = token.isAdmin;
        session.user.id = token.userId;
        console.log('Session oluşturuldu:', {
          email: session.user.email,
          isAdmin: session.user.isAdmin,
          id: session.user.id
        });
      }
      return session;
    },
    async jwt({ token, user }: { token: JWT; user?: NextAuthUser | AdapterUser }) {
      if (user) {
        try {
          const userDoc = await db.collection('users').doc(user.email!).get();
          const userData = userDoc.data() as User;
          token.isAdmin = userData.isAdmin;
          token.userId = user.id;
          console.log('JWT token oluşturuldu:', {
            email: user.email,
            isAdmin: userData.isAdmin,
            userId: user.id
          });
        } catch (error) {
          console.error('Token oluşturmada detaylı hata:', error);
        }
      }
      return token;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt" as const,
    maxAge: 30 * 24 * 60 * 60, // 30 gün
  }
}; 