# Инструкция по завершению настройки i18n

## Что уже сделано ✅
1. Установлен `next-intl`
2. Созданы файлы переводов: `messages/en.json` и `messages/ru.json`
3. Созданы конфигурационные файлы: `src/i18n.ts`, `src/middleware.ts`, `src/navigation.ts`
4. Обновлен `next.config.ts` для использования `next-intl`
5. Обновлена схема `src/data/projects.ts` с поддержкой двух языков

## Что нужно сделать вручную

### Шаг 1: Создать папку [locale]
```powershell
mkdir src\app\[locale]
```

### Шаг 2: Переместить все страницы в [locale]
```powershell
# Переместить главные файлы
move src\app\page.tsx src\app\[locale]\
move src\app\not-found.tsx src\app\[locale]\

# Переместить папки страниц
move src\app\about src\app\[locale]\
move src\app\contact src\app\[locale]\
move src\app\projects src\app\[locale]\
move src\app\lost-mark src\app\[locale]\
move src\app\hellish-bureaucracy src\app\[locale]\
move src\app\project-neon src\app\[locale]\
move src\app\holiday-audit-kramp src\app\[locale]\
move src\app\timer src\app\[locale]\
```

### Шаг 3: Восстановить layout.tsx в [locale]
Текущий `src/app/layout.tsx` испорчен. Вам нужно:

1. Удалить текущий `src/app/layout.tsx`
2. Найти оригинальный layout (возможно в истории Git или бэкапе)
3. Переместить его в `src\app\[locale]\layout.tsx`

### Шаг 4: Создать новый корневой layout
Создайте `src/app/layout.tsx` со следующим содержимым:

```typescript
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';

export default async function LocaleLayout({
  children,
  params: {locale}
}: {
  children: React.ReactNode;
  params: {locale: string};
}) {
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

### Шаг 5: Обновить компоненты для использования переводов

Пример для `Navigation.tsx`:
```typescript
import {useTranslations} from 'next-intl';
import {Link} from '@/navigation';

export default function Navigation() {
  const t = useTranslations('Navigation');
  
  return (
    <nav>
      <Link href="/">{t('home')}</Link>
      <Link href="/projects">{t('projects')}</Link>
      {/* ... */}
    </nav>
  );
}
```

### Шаг 6: Создать Language Switcher
Создайте `src/components/LanguageSwitcher.tsx`:

```typescript
'use client';

import {useLocale} from 'next-intl';
import {useRouter, usePathname} from '@/navigation';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: 'en' | 'ru') => {
    router.push(pathname, {locale: newLocale});
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={() => switchLocale('en')}
        className={locale === 'en' ? 'font-bold' : ''}
      >
        EN
      </button>
      <span>/</span>
      <button
        onClick={() => switchLocale('ru')}
        className={locale === 'ru' ? 'font-bold' : ''}
      >
        RU
      </button>
    </div>
  );
}
```

## Проверка
После выполнения всех шагов:
1. Запустите `npm run dev`
2. Откройте `http://localhost:3000` - должен перенаправить на `/en`
3. Откройте `http://localhost:3000/ru` - должен показать русскую версию

## Проблемы?
Если что-то не работает, дайте знать!
