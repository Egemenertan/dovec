import { useLanguage } from '@/context/LanguageContext';

export default function useTranslation() {
  const { language, t } = useLanguage();
  return { t, language };
} 