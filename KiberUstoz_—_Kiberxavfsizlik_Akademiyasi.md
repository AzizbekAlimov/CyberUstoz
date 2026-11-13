# KiberUstoz — Kiberxavfsizlik Akademiyasi

React / Express / tRPC / Drizzle starter, adapted from the Sandbox web-db-user template.

- `pnpm dev`: development server; honors `PORT` (default 3000).
- `pnpm build` / `pnpm start`: build and serve `dist/index.js` and `dist/public/`.
- `pnpm db:migrate`: apply checked-in migrations. `pnpm db:push`: generate and apply new schema changes.
- `pnpm check` / `pnpm test`: types and application tests.

Start with the Webdev skill's default-template guide. Platform login, storage, payments and service contracts live in its shared references; read the relevant capability before extending its helper.

`server/_core/publicConfig.ts` exposes only named public runtime values. Private keys stay server-side. The platform serves managed `/manus-storage/` assets; the application does not register a second proxy.

Platform configuration is readable and editable through `webdev.config`. Default settings are initial values, not enforced constraints. The agent may modify the files, commands and configuration or follow the flexible guide for another stack.

## Login va admin sozlamalari

O‘quvchilar Google orqali emas, login va parol orqali ro‘yxatdan o‘tadi. Login 3–32 ta lotin harfi, raqam, nuqta, `_` yoki `-` dan iborat bo‘lishi kerak. Parol kamida 12 belgidan iborat bo‘lib, katta-kichik harf va raqamni o‘z ichiga oladi. Parollar bazada scrypt hash ko‘rinishida saqlanadi.

O‘quvchi ro‘yxatdan o‘tgach yoki kirgach o‘zining `/profile` sahifasiga o‘tadi. Admin panel `/admin` yo‘lida joylashgan va faqat serverdagi dedicated Admin principal’iga ochiladi; asosiy Admin login nomi `Tommy1727`. Admin paroli faqat serverdagi `CYBERUSTOZ_ADMIN_PASSWORD` maxfiy sozlamasida saqlanadi; uning qiymatini repository, client bundle, commit, log yoki ommaga ochiq joyga kiritmang.

Admin o‘quvchi username/login nomi, profil va o‘qish natijalarini ko‘rishi mumkin, ammo parol yoki parol xeshini o‘qiy olmaydi. Zarur bo‘lsa, Admin audit sababi bilan yangi parol o‘rnatadi; tizim eski sessiyalarni bekor qiladi. `0005_add_local_credentials.sql` migration foydalanuvchi login/hash ustunlarini, `0006_admin_management.sql` esa akkaunt holati, sessiya versiyasi va Admin audit jurnalini yaratadi.
