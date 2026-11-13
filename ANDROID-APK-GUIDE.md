# KiberUstoz Android APK: build, yuklash va o‘rnatish

**Joriy holat:** KiberUstoz veb loyihasi tayyorlanmoqda, ammo native Android APK hali build qilinmagan. Shuning uchun tekshirilmagan yoki mavjud bo‘lmagan fayl uchun download havolasi ko‘rsatilmaydi. APK — sayt kodi emas; alohida Expo/React Native Android companion loyihasi va imzolangan build artefakti talab qilinadi.

## Loyiha egasi uchun APK tayyorlash ketma-ketligi

1. Android companion ilovasi uchun KiberUstoz WebDev Mobile starteri (`applicationKind: mobile_app`) boshlanadi; Android package ID, `appSlug`, deep-link scheme va brand ikonkalari belgilanadi. Sayt/backendka bog‘lash uchun haqiqiy published HTTPS API manzili va Google loginning Android OAuth redirect/client sozlamalari ham kerak bo‘ladi.
2. Native app’da darslar, O‘zbekcha/English til almashuvi, quiz, hisob, xavfsiz sessiya, ikonka va splash ekran sozlanadi. Kiberxavfsizlik mashqlari faqat ruxsatli laboratoriya doirasida bo‘ladi.
3. Kod va manifest tekshirilib, qabul qilingan checkpoint yaratiladi. Android release buildni sandbox terminalida emas, WebDev Dashboard’dagi Android build amali orqali chiqaring.
4. Tarqatish turi sifatida o‘rnatiladigan Android APK’ni tanlang (AAB Play Store yuklash paketi; oddiy telefon o‘rnatish uchun odatda APK kerak). Android build tugab artefakt fayli paydo bo‘lgandan keyin imzo, versiya va o‘rnatishni sinang.
5. APKni faqat rasmiy KiberUstoz HTTPS havolasiga yuklang; release versiya/nomi va fayl xeshini saqlang. Hozircha production domeni yoki APK fayli mavjud emas.

## O‘quvchi Android telefoniga o‘rnatish yo‘riqnomasi

1. Loyiha egasi e’lon qilgan rasmiy, versiyasi ko‘rsatilgan `KiberUstoz-<versiya>.apk` faylini faqat rasmiy HTTPS saytdan yuklab oling. Telegram chatdan olingan noma’lum APK’ni o‘rnatmang.
2. Yuklangan faylni `Downloads/Yuklab olinganlar` ichidan bosing; Android paket o‘rnatuvchisi ochiladi. Agar tizim so‘rasa, faqat ayni brauzer/fayl boshqaruvchisi uchun “noma’lum ilovalarni o‘rnatish” ruxsatini vaqtincha bering.
3. Ilova nomi va talab qiladigan ruxsatlarni tekshirib, `Install/O‘rnatish` tugmasini bosing. Tugagach ilovani oching va Google orqali kiring.
4. O‘rnatishdan so‘ng Sozlamalar → Ilovalar → maxsus ruxsatlar → noma’lum ilovani o‘rnatish bo‘limiga qayting va brauzer/fayl boshqaruvchisi ruxsatini o‘chiring. Android versiyasi va ishlab chiqaruvchiga qarab menyu nomi farq qilishi mumkin.
5. Android “Play Protect noma’lum manba” ogohlantirsa uni ko‘r-ko‘rona bekor qilmang: fayl rasmiy saytdan kelgani, SHA-256 qiymati va release manbasini loyiha egasi orqali tasdiqlang. Shubha bo‘lsa o‘rnatmang.

## APK hozircha yo‘qligida

Veb saytni telefon brauzerida ochib, brauzer menyusidan **“Add to Home screen / Bosh ekranga qo‘shish”** orqali web shortcut yaratish mumkin; bu native APK emas va APK sifatida ko‘rsatilmasligi kerak. Windows EXE/Linux AppImage ham hozircha build qilinmagan.
