<?php
/**
 * SMTP-доступ для форм сайта (public/contact.php, public/subscribe.php).
 *
 * 1. Скопируй этот файл как mail-config.php.
 * 2. Впиши пароль приложения Яндекс.Почты (id.yandex.ru → Безопасность → Пароли приложений).
 * 3. Залей по FTP на reg.ru ОДИН РАЗ — уровнем выше корня сайта (рядом с папкой www/…)
 *    или в сам корень сайта. Деплой из GitHub этот файл не трогает.
 *
 * В git этот файл не коммитить: mail-config.php добавлен в .gitignore.
 */
return [
    'user'      => 'baxgat@yandex.ru',
    'pass'      => 'ВСТАВЬ_ПАРОЛЬ_ПРИЛОЖЕНИЯ',
    'host'      => 'smtp.yandex.ru',
    'port'      => 465,
    'recipient' => 'baxgat@yandex.ru',
];
