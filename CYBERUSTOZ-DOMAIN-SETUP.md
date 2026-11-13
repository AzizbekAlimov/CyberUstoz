# CyberUstoz.com — custom domain and hosting guide

**Informational only.** This guide does not connect or buy a domain, change DNS, move hosting, or alter the currently published KiberUstoz site. Before using it, confirm that you control `CyberUstoz.com` through your registrar. If you do not own it, choose separately whether to register it; do not change another person's DNS.

## Before changing DNS

First deploy the website to the hosting provider you intend to use. In that project's **Domains** or **Production domains** settings, add `CyberUstoz.com` and `www.CyberUstoz.com`. The host will display the exact records and any ownership-verification value for that project. Use those values; do not copy a DNS target from another website, old tutorial, or unrelated project. If DNS verification is requested, add only the exact `TXT` record shown by the provider.

Choose which hostname will be canonical, for example the apex `CyberUstoz.com` or `www.CyberUstoz.com`, then set the provider's redirect for the other hostname. Adding both names to the hosting project does not, by itself, connect either name to the site.

## Vercel

1. Deploy or import the website into Vercel, then open **Project → Settings → Domains** and add the apex domain and `www` hostname.
2. At the registrar/DNS provider that currently manages the domain, create the records requested in the Vercel project's domain panel. Vercel normally uses an `A` record for an apex domain and a project-specific `CNAME` for a subdomain such as `www`. The displayed target can vary by project, so copy the current dashboard values.
3. If Vercel requests domain ownership verification, create the exact `TXT` record it provides. Wait for Vercel to mark the domain as configured and check its certificate/HTTPS status before directing learners to the new hostname.

A `CNAME` is not normally used at the zone apex (`CyberUstoz.com`). Vercel also offers nameserver-based configuration, but changing nameservers moves authority for the entire DNS zone; do not choose it unless you intend to migrate and verify **all** existing records.

## Netlify

1. Deploy or import the website into Netlify, then add the domain in **Domain management → Production domains**. Open **Pending DNS verification** to see the records customized for the site.
2. For `www`, add a `CNAME` using the exact Netlify site target shown in the dashboard. For the apex domain, use the provider-supported `ALIAS`, `ANAME`, or flattened `CNAME` option when available and the target shown in Netlify's domain instructions. Netlify's current external-DNS guide documents `apex-loadbalancer.netlify.com` as its standard target for this configuration.
3. If the DNS provider does not support those apex record types, Netlify documents `75.2.60.5` as a fallback `A` record for its standard external-DNS setup. Use the customized dashboard value instead if it differs; Netlify High-Performance Edge has different targets.
4. Save the records and wait for DNS verification and the managed HTTPS certificate to become ready. Netlify documents that propagation can take several hours and, in some cases, a full day.

The host's current domain settings take precedence over this guide if a provider changes its record targets or serving configuration.

## Protect existing website and email records

An `A` record maps a hostname to an IPv4 address. A `CNAME` makes a subdomain an alias for another hostname; it is not a replacement for every DNS record in the zone. The root/apex and a name such as `www` are different DNS names and can require different record types.

Before making a change, save a copy of the current DNS zone. Keep existing `MX` records used for email and any unrelated `TXT` verification records. Do not remove `NS`, mail, or verification records merely because they are not used for the website. If an `A`, `AAAA`, or `CNAME` conflicts with the new website record at the same hostname, compare the exact records shown by the hosting provider and change only the intended website entry.

DNS changes are not always visible everywhere immediately. Recheck the hosting dashboard after propagation. Enable or redirect public traffic only after the correct domain, both chosen hostnames, and HTTPS certificate show as ready.

## Important for this KiberUstoz project

DNS only points a hostname at a host. It does not copy or deploy this React/Express/tRPC application, its MySQL database, protected server secrets, or authentication configuration. Moving KiberUstoz to Vercel or Netlify would also require a compatible backend and database deployment, correct runtime environment secrets, and a tested application build. Do not assume that adding records alone migrates the application.

The currently configured KiberUstoz public site remains unchanged until its owner separately verifies domain ownership, selects a hosting target, and explicitly authorizes a real domain/hosting change. Search engines also decide when to crawl and index a newly connected hostname; ranking or a specific indexing date cannot be guaranteed.

## Official provider references

- [Vercel: Adding and configuring a custom domain](https://vercel.com/docs/domains/working-with-domains/add-a-domain)
- [Vercel: Working with DNS](https://vercel.com/docs/domains/working-with-dns)
- [Netlify: Configure external DNS for a custom domain](https://docs.netlify.com/manage/domains/configure-domains/configure-external-dns/)
- [Netlify: HTTPS and SSL certificates](https://docs.netlify.com/manage/domains/secure-domains-with-https/https-ssl/)

---

# CyberUstoz.com — domen va DNS bo‘yicha qo‘llanma

**Faqat ma’lumot uchun.** Ushbu qo‘llanma domenni ulamaydi yoki sotib olmaydi, DNS’ni o‘zgartirmaydi, hostingni ko‘chirmaydi va hozir e’lon qilingan KiberUstoz saytiga ta’sir qilmaydi. Amalga oshirishdan oldin `CyberUstoz.com` domeniga registrator orqali egalik qilishingizni tasdiqlang. Domen sizga tegishli bo‘lmasa, uni ro‘yxatdan o‘tkazish haqida alohida qaror qiling; boshqa shaxs DNS yozuvlarini o‘zgartirmang.

## DNS’ni o‘zgartirishdan oldin

Avval saytni tanlagan hosting provayderingizga deploy qiling. O‘sha loyiha sozlamalaridagi **Domains** yoki **Production domains** bo‘limida `CyberUstoz.com` va `www.CyberUstoz.com` ni qo‘shing. Hosting har bir loyiha uchun kerakli yozuvlar va egalikni tasdiqlash qiymatini o‘zi ko‘rsatadi. Shu qiymatlarni aynan ko‘chiring; boshqa sayt, eski qo‘llanma yoki begona loyihadan olingan DNS manzilini ishlatmang. Tasdiqlash so‘ralsa, provayder bergan aniq `TXT` yozuvini qo‘shing.

Qaysi nom asosiy canonical bo‘lishini tanlang: masalan `CyberUstoz.com` yoki `www.CyberUstoz.com`. Ikkinchi nomni hosting panelidagi redirect bilan birinchisiga yo‘naltiring. Har ikkala nomni panelga qo‘shishning o‘zi DNS’ni saytga ulab qo‘ymaydi.

## Vercel

1. Saytni Vercel’ga deploy/import qiling, so‘ng **Project → Settings → Domains** bo‘limida asosiy domen va `www` nomini qo‘shing.
2. Domeningizning DNS’ini boshqaradigan registrator/provayderda Vercel loyiha paneli ko‘rsatgan yozuvlarni kiriting. Odatda asosiy domen uchun `A`, `www` kabi subdomain uchun esa aynan loyihaga tegishli `CNAME` ishlatiladi. Maqsad manzili loyiha bo‘yicha farq qilishi mumkin, shuning uchun joriy dashboard qiymatini ko‘chiring.
3. Vercel egalikni tasdiqlashni so‘rasa, ko‘rsatilgan `TXT` yozuvini aynan kiriting. Vercel domenni sozlangan deb belgilashini va HTTPS sertifikat holatini kutib, keyin o‘quvchilarni yangi manzilga yo‘naltiring.

`CNAME` odatda domen ildizi (`CyberUstoz.com`) uchun ishlatilmaydi. Vercel nameserver orqali sozlashni ham taklif qiladi, lekin nameserverni o‘zgartirish butun DNS zonasi boshqaruvini ko‘chiradi; barcha mavjud yozuvlarni ko‘chirish va tekshirish niyati bo‘lmasa, buni tanlamang.

## Netlify

1. Saytni Netlify’ga deploy/import qiling va **Domain management → Production domains** bo‘limida domenni qo‘shing. **Pending DNS verification** orqali aynan shu sayt uchun ko‘rsatilgan yozuvlarni oching.
2. `www` uchun Netlify dashboard ko‘rsatgan sayt manziliga `CNAME` kiriting. Asosiy domen uchun DNS provayderi qo‘llasa `ALIAS`, `ANAME` yoki flattened `CNAME` turini va Netlify ko‘rsatgan qiymatni ishlating. Netlify’ning joriy external-DNS qo‘llanmasida standart holat uchun `apex-loadbalancer.netlify.com` nishoni keltirilgan.
3. DNS provayderingiz bu apex yozuv turlarini qo‘llamasa, Netlify standart external-DNS holatida `75.2.60.5` manzilini zaxira `A` yozuvi sifatida ko‘rsatadi. Paneldagi maxsus qiymat farq qilsa, panelga amal qiling; Netlify High-Performance Edge’da boshqa qiymatlar ishlatiladi.
4. Yozuvlarni saqlang va DNS tasdiqlanishi hamda boshqariladigan HTTPS sertifikati tayyor bo‘lishini kuting. Netlify ma’lumotiga ko‘ra, tarqalish bir necha soat olishi, ayrim hollarda to‘liq bir kungacha cho‘zilishi mumkin.

Provayder yozuvlari yoki xizmat ko‘rsatish sozlamalarini o‘zgartirsa, ushbu qo‘llanmadan ko‘ra hosting panelidagi joriy ko‘rsatmalar ustun hisoblanadi.

## Mavjud sayt va email yozuvlarini asrang

`A` yozuvi hostname’ni IPv4 manziliga bog‘laydi. `CNAME` subdomain’ni boshqa hostname’ga alias qiladi; u DNS zonadagi har bir yozuv o‘rnini bosmaydi. Asosiy domen va `www` alohida nomlar bo‘lgani uchun ular boshqa-boshqa yozuv turini talab qilishi mumkin.

O‘zgartirishdan oldin joriy DNS zonangiz nusxasini saqlang. Email uchun kerak bo‘ladigan `MX` va saytga aloqasi bo‘lmagan `TXT` tasdiqlash yozuvlarini saqlang. Ular website uchun ko‘rinmayapti deb `NS`, pochta yoki tekshiruv yozuvlarini o‘chirmang. Yangi yozuv bilan bir xil hostname’dagi `A`, `AAAA` yoki `CNAME` to‘qnashsa, hosting ko‘rsatgan aniq qiymatni solishtiring va faqat kerakli website yozuvini o‘zgartiring.

DNS o‘zgarishlari hamma joyda bir vaqtda ko‘rinmasligi mumkin. Tarqalishdan keyin hosting dashboard’ni qayta tekshiring. Domen, tanlangan hostname’lar va HTTPS sertifikati tayyor deb tasdiqlanmaguncha jamoatchilikni yangi nomga yo‘naltirmang.

## Ushbu KiberUstoz loyihasi uchun muhim

DNS faqat hostname’ni hosting serveriga yo‘naltiradi. U React/Express/tRPC ilovasini, MySQL bazasini, protected server secret’larini yoki authentication sozlamalarini ko‘chirib/deploy qilib bermaydi. KiberUstoz’ni Vercel yoki Netlify’ga ko‘chirish uchun backend va database’ni mos deploy qilish, runtime muhit sirlarini sozlash hamda ilova buildini tekshirish ham kerak. Yozuv qo‘shishning o‘zi ilovani ko‘chirdi deb hisoblamang.

Loyiha egasi domen egaligini alohida tasdiqlab, hostingni tanlab, haqiqiy domain/hosting o‘zgarishiga aniq ruxsat bermaguncha KiberUstoz’ning joriy public sayti o‘zgarishsiz qoladi. Qidiruv tizimlari yangi domenni qachon crawl/index qilishini o‘zi belgilaydi; aniq muddat yoki reyting kafolatlanmaydi.

## Rasmiy provayder manbalari

- [Vercel: maxsus domen qo‘shish va sozlash](https://vercel.com/docs/domains/working-with-domains/add-a-domain)
- [Vercel: DNS bilan ishlash](https://vercel.com/docs/domains/working-with-dns)
- [Netlify: tashqi DNS’da custom domain sozlash](https://docs.netlify.com/manage/domains/configure-domains/configure-external-dns/)
- [Netlify: HTTPS va SSL/TLS sertifikatlari](https://docs.netlify.com/manage/domains/secure-domains-with-https/https-ssl/)
