# KiberUstoz’ni ilova sifatida o‘rnatish

KiberUstoz zamonaviy brauzerlarda alohida oynada ochiladigan Progressive Web App (PWA) tarzida o‘rnatilishi mumkin. Bu usul native installer emas: alohida Windows `.exe`, Linux AppImage yoki Android `.apk` o‘rnini bosmaydi.

## Kompyuter

1. KiberUstoz’ni HTTPS manzili orqali Chrome, Edge yoki mos Chromium brauzerida oching.
2. Bosh sahifadagi **Kompyuterga / telefonga o‘rnatish** tugmasini bosing. Agar brauzer o‘z install prompt’ini bermasa, brauzer menyusidan **Install app** yoki **Install KiberUstoz** bandini tanlang.
3. O‘rnatilgach, ilovani desktop/Start menyusidan ishga tushiring. Olib tashlash browser yoki operatsion tizimdagi ilovalarni boshqarish menyusidan amalga oshiriladi.

## Android va iPhone

Android’da KiberUstoz’ni Chrome’da ochib, o‘rnatish tugmasi yoki browser menyusidagi **Install app / Add to Home screen** bandini tanlang. iPhone’da Safari’ning **Share → Add to Home Screen** yo‘lidan foydalaning. Mavjud menyu nomlari brauzer va operatsion tizim versiyasiga qarab farq qilishi mumkin.

## Ulanish va eslatmalar

- Service worker faqat app shell, offline sahifa va versiyalangan statik JavaScript/CSS fayllarni saqlaydi.
- Login, API, shaxsiy profil, avatar, imtihon natijasi va admin ma’lumotlari offline cache’ga qo‘shilmaydi; bu xizmatlar uchun internet zarur.
- Ixtiyoriy 10:00 dars va uyga-vazifa eslatmalarini bosh sahifada yoqish mumkin. Ular Asia/Tashkent vaqtiga moslangan va sayt/PWA ochiq bo‘lgandagina local browser timer tomonidan tekshiriladi. Ilova yopiq, OS uyquda yoki browser timer’lari cheklanganda yetkazib berish kafolatlanmaydi.
- Bu PWA imzolangan APK emas. Haqiqiy APK uchun alohida native Android loyihasi, imzolash kaliti va release build talab etiladi.
