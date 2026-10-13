import { en } from "./en";

// Natural Turkish, not a literal translation. Matches the shape of `en`.
export const tr: typeof en = {
  meta: {
    siteName: "Art4Good",
    tagline: "Her çocuk üretmenin özgürlüğünü hak eder.",
    description:
      "Art4Good, İstanbul'da öğrencilerin kurduğu bir girişim; yaratıcı eğitime sınırlı erişimi olan çocuklara anlamlı sanat deneyimleri ulaştırıyor.",
  },

  nav: {
    about: "Hakkımızda",
    impact: "Etkimiz",
    workshops: "Atölyeler",
    projects: "Projeler",
    gallery: "Galeri",
    getInvolved: "Katıl",
    contact: "İletişim",
    support: "Art4Good'a Destek Ol",
    menu: "Menü",
    close: "Kapat",
    langLabel: "Dil",
  },

  loading: { line: "Sanat iyileştirir." },

  hero: {
    eyebrow: "Öğrenci girişimi · İstanbul",
    title: "Her çocuk üretmenin özgürlüğünü hak eder.",
    lede: "Art4Good, yaratıcı eğitime sınırlı erişimi olan çocuklara anlamlı sanat deneyimleri ulaştırıyor.",
    ctaPrimary: "Çalışmalarımızı Keşfet",
    ctaSecondary: "Aramıza Katıl",
    scroll: "Kaydır",
    badge: "Bağışın %100'ü çocuklara",
  },

  marquee: ["Sanat iyileştirir", "Her çocuk bir sanatçıdır", "İyilik için renk", "Üret · Paylaş · Ver"],

  mission: {
    eyebrow: "Neden önemli",
    title: "Sanat, bir çocuğun dünyayı ve kendini görme biçimini değiştirebilir.",
    body: [
      "İmkânları kısıtlı büyüyen bir çocuk için boş bir sayfa, kendini tamamen özgür hissedebildiği tek yer olabilir. Sanat özgüven kazandırır, iletişimi güçlendirir ve çocuklara henüz kelimelere dökemedikleri şeyleri ifade etme yolu sunar.",
      "Yaratıcılığa erişimin bir ailenin gelirine ya da bir okulun bütçesine bağlı olmaması gerektiğine inanıyoruz. Bu yüzden boyayı, kâğıdı ve insanları biz getiriyoruz, ve her çocuğun bir sanatçı olduğunu keşfedebileceği bir alan açıyoruz.",
    ],
    pillars: [
      { title: "Özgüven", text: "Bir eseri bitirip “bunu ben yaptım” demek, çocuğun kendi yeteneğine bakışını değiştirir." },
      { title: "Yaratıcılık", text: "Uçları açık üretim, çocuklara hayal kurmayı, denemeyi ve kendi yolunu bulmayı öğretir." },
      { title: "İletişim", text: "Renk ve biçim, kelimeler gelmeden önce duygulara ve fikirlere ses verir." },
      { title: "Kendini ifade", text: "Her çocuğun bakış açısının hoş karşılandığı, yargısız ve güvenli bir alan." },
    ],
  },

  impact: {
    eyebrow: "Etkimiz",
    title: "Küçük eller, gerçek değişim.",
    lede: "Renklerin arkasındaki rakamlar; her biri kendi kampanya ve kayıtlarımızdan doğrulanmıştır.",
    note: "Rakamlar bağış kampanyalarımızdan ve gönüllülük kayıtlarımızdan doğrulanmıştır.",
    stats: {
      marathon: "toplandı · İstanbul Maratonu 2025 “Run for Good”",
      bakesale: "toplandı · kermes etkinliği",
      biennial: "hafta gönüllülük · 18. İstanbul Bienali",
      partners: "paydaş kurum",
    },
  },

  journey: {
    eyebrow: "Bir atölye nasıl doğuyor",
    title: "Bir bağıştan tamamlanmış bir resme.",
    lede: "Her atölye aynı yolu izler, öğrenciler, malzemeler ve bolca yürekle.",
    steps: {
      funds: { title: "Kaynak toplama", text: "Maratonlar, kermesler ve kampanyalar topluluğun iyi niyetini bütçeye dönüştürür." },
      materials: { title: "Malzeme toplama", text: "Her lira çocuklar için fırçaya, boyaya, kâğıda ve hamura dönüşür." },
      partners: { title: "İş birliği", text: "Çocukları en iyi tanıyan okullar ve derneklerle güç birliği yaparız." },
      volunteers: { title: "Gönüllü bulma", text: "Öğrenciler her atölyeyi planlamak, yürütmek ve desteklemek için kaydolur." },
      organise: { title: "Atölyeyi kurma", text: "Bir tema belirler, mekânı hazırlar ve her şeyi kurarız." },
      create: { title: "Üretme alanı açma", text: "Çocuklar özgürce ve yargılanmadan boyar, şekillendirir, hayal eder." },
      impact: { title: "Etkiyi paylaşma", text: "Günü belgeler ve hikâyeyi topluluğumuza geri taşırız." },
    },
  },

  projects: {
    eyebrow: "Öne çıkan projeler",
    title: "Çalışmalarımıza yakından bakış.",
    lede: "Atölyeler, bağış kampanyaları ve gönüllülük, en gurur duyduğumuz girişimler.",
    viewAll: "Tüm projeleri gör",
    viewDetail: "Projeyi incele",
    raised: "toplandı",
    children: "çocuğa ulaşıldı",
    weeks: "hafta",
    filters: { all: "Tümü", workshop: "Atölyeler", fundraiser: "Bağış", volunteering: "Gönüllülük", future: "Yakında" },
    items: {
      "art-workshops": {
        title: "Çocuk sanat atölyeleri",
        date: "2025'ten beri sürüyor",
        summary: "Paydaş okul ve derneklerdeki çocuklar için ücretsiz, uygulamalı yaratıcı seanslar, resim, hamur, origami ve geri dönüşüm.",
        detail: [
          "Atölyelerimiz Art4Good'un kalbidir. Her hafta sonu bir grup öğrenci gönüllü, sanat yapma fırsatını nadiren bulan çocuklara temalı bir yaratıcı seans götürür.",
          "Hayalimizdeki şehirleri, süper güçleri, hamur heykelleri, origamiyi ve geri dönüşüm sanatını birlikte keşfettik. Amacımız kusursuz bir sonuç değil, her çocuğun kendini özgürce ifade edebileceği ve yaptığıyla gurur duyarak ayrılacağı bir alan.",
        ],
      },
      "istanbul-marathon-2025": {
        title: "İstanbul Maratonu 2025 · Run for Good",
        date: "Kasım 2025",
        summary: "Toplum Gönüllüleri Vakfı ile yürütülen; koşucuların ve tezahürat yapan öğrenci gönüllülerin güç kattığı bir bağış kampanyası.",
        detail: [
          "2025 İstanbul Maratonu'nda Art4Good, Toplum Gönüllüleri Vakfı (TOG) ile birlikte bir “Run for Good” bağış kampanyası yürüttü.",
          "Gönüllülerimiz İstanbul Maratonu'nun tezahürat alanlarına enerji verdi, alkışladı, gülümsedi, iyilik için ses oldu, kampanya ise daha fazla çocuğa sanat ulaştırmak için kaynak topladı.",
        ],
      },
      "bake-sale": {
        title: "Kermes etkinliği",
        date: "2025",
        summary: "Kek ve kurabiyeyi atölye malzemelerine dönüştüren, öğrencilerin düzenlediği bir kermes.",
        detail: [
          "Klasiğin güzeli: gönüllülerimiz pişirdi, sattı ve paylaştı, bir okul kermesini atölye malzemelerine anlamlı bir katkıya çevirdi.",
          "Toplanan her lira doğrudan çocuklar için fırça, boya ve kâğıda gidiyor.",
        ],
      },
      "istanbul-biennial": {
        title: "18. İstanbul Bienali · gönüllülük",
        date: "Eylül-Kasım 2025",
        summary: "Galata Rum Okulu'ndaki çocuklarla, PACE Çocuk Sanat Merkezi'nin Bienal Eğitim Programı'na yedi hafta destek.",
        detail: [
          "İKSV tarafından düzenlenen ve Vehbi Koç Vakfı desteğiyle gerçekleşen 18. İstanbul Bienali boyunca, gönüllülerimiz yedi hafta boyunca PACE Çocuk Sanat Merkezi'nin eğitim programına destek oldu.",
          "Çocuklara sergiyi gezdirdik, eserleri konuştuk, ardından eski oyuncakları ve artık malzemeleri bambaşka sanat eserlerine dönüştürdük, yaratıcılığı sürdürülebilirlikle birleştirdik.",
        ],
      },
      "school-collaborations": {
        title: "Gelecek okul iş birlikleri",
        date: "Yakında",
        summary: "İstanbul genelinde daha fazla devlet ilkokuluna açılıyor, daha çok sınıfa düzenli sanat atölyeleri götürüyoruz.",
        detail: [
          "Bir sonraki adımımız, devlet ilkokullarıyla daha derin ve sürekli iş birlikleri kurmak; böylece sanat tek seferlik bir ziyaret değil, eğitim yılının düzenli bir parçası olacak.",
          "Bundan faydalanabilecek bir okulda çalışıyorsanız, sizden haber almayı çok isteriz.",
        ],
      },
    },
  },

  gallery: {
    eyebrow: "Anlar",
    title: "Atölyelerimizden ve kampanyalarımızdan.",
    lede: "Renk, konsantrasyon ve bir sürü gururlu küçük yüz. Filtreleyin ya da bir görseli açıp hikâyesini okuyun.",
    filters: { all: "Tümü", workshop: "Atölyeler", fundraiser: "Bağış", volunteering: "Gönüllülük" },
    open: "Görseli aç",
    close: "Kapat",
    captions: {
      "ws-star": "Atölyelerimizden birinde minik bir sanatçı yıldızını kazanıyor",
      "ws-drawing": "Yaptığı resimle gurur duyuyor",
      "ws-together": "Yan yana, birer çizimle üretiyoruz",
      "ws-pencils": "Kuru boyalar, kocaman hayaller",
      origami: "Koç Lisesi öğrencileriyle origami atölyesi",
      clay5: "Hamurla serbest üretim · Atölye #5, Atlas Yardım Derneği",
      colouring: "Çocukların isteğiyle birlikte boyama",
      "dream-cities": "Hayalimizdeki şehirler · Atölye #3",
      playdough: "Oyun hamuru eserleri · Atölye #2",
      superpower: "“Bir süper gücüm olsaydı…” · sanatla kendini keşfetme",
      whatisart: "“Sanat nedir?” · Galata Rum Okulu'nda geri dönüşüm eserleri",
      "biennial-7": "Bienal 7. hafta · atığı sanata dönüştürmek",
      "biennial-5": "Bienal 5. hafta · yeniden kullan, yeniden hayal et",
      "biennial-3": "Bienal 3. hafta · renk ve kahkaha",
      "biennial-start": "18. İstanbul Bienali · her şeyin başladığı yer",
      marathon: "İstanbul Maratonu 2025 · Run for Good",
      "marathon-cheer": "İstanbul Maratonu'nda tezahürat alanları",
      kalpten: "Kalpten Kutular · hastanedeki çocuklar için kalpten kutular",
      bolu: "Bolu'daki bir hastanede çocuklara destek",
      materials: "Bağışlarınız, fırçaya ve boyaya dönüştü",
    },
  },


  getInvolved: {
    eyebrow: "Katıl",
    title: "Aramıza katıl. Bir çocukluğu değiştirmek bir hafta sonu sürer.",
    lede: "Nasıl yardım etmek istersen, zamanınla, desteğinle ya da sesinle, bir yolu var.",
    cta: "Bunu seç",
    options: {
      volunteer: { title: "Gönüllü Ol", text: "Bir hafta sonunu ayır, bir atölye yürüt ya da sahne arkasında destek ol. Sanat diploması gerekmez, yürek yeter." },
      sponsor: { title: "Bir Atölyeye Sponsor Ol", text: "Bir seansın malzemesini ve mekânını karşıla; bir grup çocuk üretebilsin." },
      partner: { title: "Bizimle İş Birliği Yap", text: "Okullar, dernekler ve kurumlar, hizmet verdiğiniz çocuklara birlikte sanat götürelim." },
      materials: { title: "Sanat Malzemesi Bağışla", text: "Boya, fırça, kâğıt ve hamur; hepsi doğrudan çocukların eline geçer." },
      fundraiser: { title: "Bağış Etkinliği Düzenle", text: "Arkadaşlarınla ya da sınıfınla Art4Good için kermes, koşu veya kampanya düzenle." },
      school: { title: "Art4Good'u Okula Davet Et", text: "İlkokuluna bir atölye getir, bir sınıfa yaratıcı bir gün armağan et." },
    },
  },

  instagram: {
    eyebrow: "@art4good.ist",
    title: "Hikâye yazılırken takip et.",
    lede: "Her atölye, her kampanya ve her gururlu küçük yüz, olurken, Instagram'da.",
    cta: "Instagram'da takip et",
  },

  finalCta: {
    title: "Daha çok çocuğun eline yaratıcılığı koymamıza yardım et.",
    volunteer: "Gönüllü Ol",
    support: "Bir Atölyeye Destek Ol",
  },

  footer: {
    mission: "İstanbul merkezli, öğrencilerin kurduğu bir girişim; sanatla en çok ihtiyacı olan çocuklara yaratıcılık, özgüven ve neşe taşıyor.",
    explore: "Keşfet",
    involved: "Katıl",
    legal: "Yasal",
    privacy: "Gizlilik Politikası",
    accessibility: "Erişilebilirlik",
    partnership: "İş birliği talepleri",
    contactEmail: "İletişim e-postası",
    based: "İstanbul merkezli, öğrenci girişimi",
    rights: "Tüm hakları saklıdır.",
  },

  forms: {
    name: "Ad soyad",
    email: "E-posta adresi",
    org: "Kurum / okul (isteğe bağlı)",
    role: "Kimsiniz…",
    message: "Mesaj",
    interest: "İsteğim",
    consent: "Art4Good'un bu mesaja yanıt vermek için bilgilerimi saklamasını kabul ediyorum.",
    submit: "Mesajı gönder",
    sending: "Gönderiliyor…",
    successTitle: "Teşekkürler!",
    successBody: "Mesajın yola çıktı. En kısa sürede sana geri döneceğiz.",
    errorRequired: "Bu alan zorunludur.",
    errorEmail: "Lütfen geçerli bir e-posta adresi girin.",
    errorConsent: "Yanıt verebilmemiz için lütfen onay verin.",
    another: "Yeni bir mesaj gönder",
    honeypotLabel: "Bu alanı boş bırakın",
  },

  pages: {
    about: {
      title: "Hakkımızda",
      lede: "Sanatın bir çocukluğu değiştirebileceğine inanan bir grup öğrenci.",
      body: [
        "Art4Good, İstanbul merkezli, öğrencilerin kurduğu kâr amacı gütmeyen bir girişimdir. Devlet okullarındaki ekonomik açıdan dezavantajlı ilkokul çocuklarına sanat atölyeleri ve yaratıcı fırsatlar sunuyoruz.",
        "Basit bir inançla yola çıktık: her çocuk, ailesinin gelirine ya da okulunun imkânlarına bakılmaksızın, sanata, yaratıcılığa ve kendini ifadeye erişimi hak eder.",
        "Çoğu Koç Okulu'ndan lise öğrencileriyiz; hafta sonlarımızı yaratıcı atölyeler yürütmeye, kaynak toplamaya ve şehir genelinde okul ve derneklerle iş birliği yapmaya ayırıyoruz. Sadece malzeme dağıtmıyoruz, oturuyor, karıştırıyor, gülüyor ve her çocuğun bir sanatçı olduğunu keşfetmesini sağlıyoruz.",
      ],
      valuesTitle: "Misyon ve değerler",
      teamEyebrow: "Ekibimiz",
      teamTitle: "Art4Good'un arkasındaki insanlarla tanışın.",
      teamLede: "Ayda, Maya ve Kerem, her çocuğun sanata erişimi olması gerektiği inancını atölyelere ve fırsatlara dönüştürüyor.",
      values: [
        { title: "Herkes için erişim", text: "Yaratıcılık asla gelire ya da okul bütçesine bağlı olmamalı." },
        { title: "Çocuk odaklı", text: "Her seans çocukların kendi fikirlerine ve sesine alan açar." },
        { title: "Öğrenci gücü", text: "Zamanını ve yeteneğini veren genç gönüllülerle yürütülür." },
        { title: "Şeffaf", text: "Toplanan kaynak doğrudan çocuklar için malzeme ve atölyeye gider." },
      ],
    },
    impact: { title: "Etkimiz", lede: "Renklerin arkasındaki ölçülebilir fark." },
    workshops: {
      title: "Atölyeler",
      lede: "İstanbul'daki çocuklar için ücretsiz, uygulamalı yaratıcı seanslar.",
      body: [
        "Atölyelerimiz çoğu hafta sonu paydaş okul ve derneklerde düzenlenir. Her seansın bir teması vardır, hayalimizdeki şehirler, süper güçler, hamur heykel, origami, geri dönüşüm sanatı, ve eğitimli öğrenci gönüllüler tarafından yürütülür.",
        "Seanslar uçları açık ve yargısız olacak şekilde tasarlanır. Tek bir doğru cevap yoktur; yalnızca her çocuğun hayal gücü ve kendi elleriyle bir şey yapmanın gururu vardır.",
      ],
      howTitle: "Bir seans nasıl geçer",
    },
    projects: { title: "Projeler", lede: "Atölyeler, bağış kampanyaları ve gönüllülük, en gurur duyduğumuz girişimler." },
    gallery: { title: "Galeri", lede: "Atölyelerimizden, kampanyalarımızdan ve çocukların kendi eserlerinden anlar." },
    partners: {
      title: "Paydaşlar",
      lede: "Çalışmamızı mümkün kılan kurumlar.",
      body: "Hizmet verdiğimiz çocuklara kapılarını açan okullara, derneklere ve kültür kurumlarına birlikte çalışabildiğimiz için minnettarız.",
    },
    contact: {
      title: "İletişim",
      lede: "Sorular, fikirler, iş birlikleri, sizden haber almayı çok isteriz.",
      reachTitle: "Bize ulaşın",
      followTitle: "Takip edin",
      formTitle: "Mesaj gönderin",
    },
    getInvolved: { title: "Katıl", lede: "Nasıl yardım etmek istediğini seç, her seçenek gerçek bir fark yaratır." },
    privacy: {
      title: "Gizlilik Politikası",
      lede: "Bizimle paylaştığın bilgileri nasıl kullandığımız.",
      updated: "Art4Good, İstanbul merkezli, öğrencilerin kurduğu kâr amacı gütmeyen bir girişimdir.",
      body: [
        { h: "Kimiz", p: "Art4Good, İstanbul merkezli, öğrencilerin kurduğu kâr amacı gütmeyen bir girişimdir. Bu politika, bizimle paylaştığınız bilgileri nasıl kullandığımızı açıklar." },
        { h: "Neyi topluyoruz", p: "İletişim formumuzu kullandığınızda, yalnızca size yanıt verebilmemiz için sağlamayı seçtiğiniz bilgileri (ad, e-posta ve mesaj gibi) toplarız." },
        { h: "Nasıl kullanıyoruz", p: "Bilgilerinizi yalnızca talebinize yanıt vermek ve katılımı koordine etmek için kullanırız. Verilerinizi asla satmaz, reklam için kullanmayız." },
        { h: "Saklama ve paylaşım", p: "Site üzerinden gönderdiğiniz mesajlar kendi e-posta uygulamanızda açılır ve doğrudan bize ulaşır. Yalnızca yanıt vermesi gereken gönüllülerle paylaşılır." },
        { h: "Haklarınız", p: "Bizimle paylaştığınız bilgilere erişmemizi veya silmemizi her zaman bizimle iletişime geçerek isteyebilirsiniz." },
        { h: "İletişim", p: "Her türlü gizlilik sorusu için altbilgideki iletişim e-postasından bize ulaşın." },
      ],
    },
    accessibility: {
      title: "Erişilebilirlik Bildirimi",
      lede: "Bu siteyi herkesin kullanabilmesini istiyoruz.",
      body: [
        "WCAG 2.1 AA seviyesini hedefliyoruz. Site klavye ile gezinmeyi destekler, azaltılmış hareket tercihlerine saygı gösterir ve okunabilir renk kontrastı kullanır.",
        "Bir engelle karşılaşırsanız lütfen bizimle iletişime geçin, yardımcı olmak ve sorunu gidermek için elimizden geleni yaparız.",
      ],
    },
    notFound: { title: "Sayfa bulunamadı", lede: "Bu sayfa tuvalden kaçmış gibi görünüyor.", cta: "Ana sayfaya dön" },
  },

  roles: { volunteer: "Gönüllü adayı", school: "Okul / eğitimci", partner: "Kurum / paydaş", donor: "Bağışçı / sponsor", other: "Önemseyen biri" },
};
