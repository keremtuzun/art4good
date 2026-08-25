"use client";

import Link from "next/link";
import { FormEvent, useRef, useState } from "react";
import { motion } from "framer-motion";
import styles from "./CultureCanvas.module.css";

type TopicId = "iznik" | "ebru" | "kilim" | "minyatur" | "tezhip" | "hat";

const topics: Array<{ id: TopicId; title: string; subtitle: string; emoji: string; color: string }> = [
  { id: "iznik", title: "İznik Çinileri", subtitle: "Laleler, karanfiller ve kobalt mavisi", emoji: "🏺", color: "#176e9f" },
  { id: "ebru", title: "Ebru", subtitle: "Suyun üzerinde dans eden renkler", emoji: "〰️", color: "#34aaa8" },
  { id: "kilim", title: "Kilim Desenleri", subtitle: "İpliklerle anlatılan Anadolu hikâyeleri", emoji: "◆", color: "#d94c42" },
  { id: "minyatur", title: "Osmanlı Minyatürü", subtitle: "Küçük resimlerde büyük dünyalar", emoji: "🏰", color: "#e29437" },
  { id: "tezhip", title: "Tezhip", subtitle: "Sayfaları aydınlatan altın bahçeler", emoji: "✦", color: "#d2a52a" },
  { id: "hat", title: "Hat Sanatı", subtitle: "Harflerin ritmi ve dengesi", emoji: "ق", color: "#173967" },
];

const regions = [
  { city: "İstanbul", art: "Hat & Minyatür", emoji: "✒️", x: "17%", y: "22%", color: "#ef6c61" },
  { city: "İznik", art: "Çini", emoji: "🌷", x: "27%", y: "42%", color: "#1c75a8" },
  { city: "Kütahya", art: "Seramik", emoji: "🏺", x: "34%", y: "67%", color: "#35aaa8" },
  { city: "Orta Anadolu", art: "Kilim", emoji: "◆", x: "52%", y: "48%", color: "#db5346" },
  { city: "Tokat", art: "Yazma", emoji: "🌿", x: "67%", y: "30%", color: "#e3a62c" },
  { city: "Karadeniz", art: "Bölgesel El Sanatları", emoji: "🧺", x: "80%", y: "20%", color: "#258b68" },
];

const motifs = [
  { name: "Hayat Ağacı", mark: "♧", region: "Anadolu · Kilim ve taş işçiliği", meaning: "Yaşamı, büyümeyi ve kuşaklar arasındaki bağı anlatır.", question: "Senin hayat ağacında hangi şeyler büyürdü?", color: "#2c9368" },
  { name: "Koçboynuzu", mark: "〽", region: "Anadolu · Dokuma", meaning: "Güç, cesaret ve bereketle ilişkilendirilir.", question: "Gücü bir şekille anlatsan köşeli mi, yuvarlak mı olurdu?", color: "#df584b" },
  { name: "Lale", mark: "♠", region: "İstanbul ve İznik · Çini", meaning: "Zarafetle anılır; çinilerde pek çok hayali biçime dönüşür.", question: "Daha önce hiç görülmemiş bir lalenin yaprakları nasıl olurdu?", color: "#176e9f" },
  { name: "Göz", mark: "◉", region: "Anadolu · Kilim ve takı", meaning: "Korunma düşüncesini taşıyan çok eski bir işarettir.", question: "Seni koruyan bir işaret tasarlasan içine ne saklardın?", color: "#2d78b1" },
  { name: "Bereket", mark: "✣", region: "Anadolu · Dokuma", meaning: "Çoğalma, paylaşma ve iyi dileklerle bağlantılı motif ailesidir.", question: "Paylaştıkça çoğalan bir şeyi hangi renklerle anlatırdın?", color: "#e8aa31" },
  { name: "Su Yolu", mark: "≈", region: "Anadolu · Kilim", meaning: "Yaşamın akışını ve suyun önemini hatırlatır.", question: "Suyun sesi bir çizgi olsaydı nasıl kıvrılırdı?", color: "#27aeb2" },
  { name: "Yıldız", mark: "✦", region: "Anadolu ve Osmanlı süsleme", meaning: "Geometrik düzen, gökyüzü ve sonsuzluk düşüncesiyle buluşur.", question: "Kendi gökyüzünde kaç köşeli bir yıldız parlardı?", color: "#233e78" },
  { name: "Çintemani", mark: "◌", region: "Osmanlı · Kumaş ve seramik", meaning: "Güç ve hareketle ilişkilendirilen üç benekli bir düzenlemedir.", question: "Üç şekli farklı boylarda tekrarlasan nasıl bir ritim oluşurdu?", color: "#8e58a5" },
];

const journey = [
  { key: "motif", title: "Ana motif", question: "Bir çiçek seçmek yerine kendi çiçeğini icat etsek nasıl görünürdü?", options: ["Hayali lale", "Yıldız çiçeği", "Dalgadan çiçek"] },
  { key: "leaf", title: "Yaprak", question: "Bu çiçeğin kaç yaprağı olsun?", options: ["4", "6", "9"] },
  { key: "colors", title: "Renkler", question: "İki renk seçsen hangileri birlikte konuşurdu?", options: ["Turkuaz + kırmızı", "Kobalt + sarı", "Yeşil + pembe"] },
  { key: "feeling", title: "His", question: "Desenin bir duygusu olsa hangisi olurdu?", options: ["Bahar", "Merak", "Cesaret"] },
  { key: "repeat", title: "Tekrar", question: "Hangi hareket desene ritim kazandırsın?", options: ["Dairesel", "Dalga gibi", "Sağa sola"] },
];

const lessons = ["Keşfet", "Desenleri İncele", "Hikayesini Öğren", "Sıra Sende"];

export default function CultureCanvasExperience({ locale }: { locale: "tr" | "en" }) {
  const [selectedTopic, setSelectedTopic] = useState<TopicId>("iznik");
  const [region, setRegion] = useState(regions[1]);
  const [motif, setMotif] = useState(motifs[0]);
  const [lesson, setLesson] = useState(0);
  const [journeyStep, setJourneyStep] = useState(0);
  const [concept, setConcept] = useState<Record<string, string>>({});
  const [idea, setIdea] = useState("");
  const [lastMentorIdea, setLastMentorIdea] = useState("");
  const [mentorVariant, setMentorVariant] = useState(0);
  const [mentorReply, setMentorReply] = useState("Ne yapmak istediğini anlat; sana bir ya da iki meraklı soru sorayım.");
  const [thinking, setThinking] = useState(false);
  const journeyRef = useRef<HTMLElement>(null);
  const topic = topics.find((item) => item.id === selectedTopic) ?? topics[0];

  const chooseTopic = (id: TopicId) => {
    setSelectedTopic(id);
    setLesson(0);
    journeyRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const chooseJourneyAnswer = (answer: string) => {
    const current = journey[journeyStep];
    setConcept((previous) => ({ ...previous, [current.key]: answer }));
    setJourneyStep((step) => Math.min(step + 1, journey.length));
  };

  const requestMentorQuestions = async (message: string, variant: number) => {
    setThinking(true);
    try {
      const response = await fetch("/api/culturecanvas/mentor", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ message, age: 10, topic: selectedTopic, variant }) });
      const data = (await response.json()) as { response?: string };
      setMentorReply(data.response ?? "Bu fikri bir şekle dönüştürsen ilk çizgin nasıl olurdu?");
    } catch {
      setMentorReply("Fikrindeki en merak uyandırıcı parça hangisi? Onu üç farklı biçimde değiştirebilir misin?");
    } finally { setThinking(false); }
  };

  const askMentor = async (event: FormEvent) => {
    event.preventDefault();
    const message = idea.trim();
    if (!message) return;
    setLastMentorIdea(message);
    setMentorVariant(0);
    setIdea("");
    await requestMentorQuestions(message, 0);
  };

  const deriveMoreQuestions = async () => {
    if (!lastMentorIdea || thinking) return;
    const nextVariant = mentorVariant + 1;
    setMentorVariant(nextVariant);
    await requestMentorQuestions(lastMentorIdea, nextVariant);
  };

  return (
    <div className={`${styles.canvas} min-h-screen overflow-hidden bg-[#fff8e8] pt-[70px] text-[#172c50]`}>
      <section className="relative isolate min-h-[calc(100vh-70px)] overflow-hidden px-5 py-14 sm:px-8 lg:py-20">
        <div className={styles.ebru} />
        <div className="mx-auto grid min-h-[72vh] max-w-[1180px] items-center gap-12 lg:grid-cols-[1.05fr_.95fr]">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="relative z-10">
            <p className="mb-5 inline-flex rotate-[-2deg] rounded-full bg-[#f2bd3c] px-5 py-2 text-sm font-extrabold uppercase tracking-[0.16em] text-[#172c50] shadow-[4px_5px_0_#172c50]">Art4Good sunar · 7–14 yaş</p>
            <h1 className="max-w-[760px] text-[clamp(3.4rem,8vw,7.7rem)] font-semibold leading-[.84] tracking-[-.06em]">Türk sanatını <span className="text-[#176e9f]">keşfet.</span><br />Kendi sanatını <span className="font-hand text-[#d94740]">yarat.</span></h1>
            <p className="mt-8 max-w-2xl text-lg font-medium leading-relaxed text-[#28456d] sm:text-xl">CultureCanvas sana ne çizeceğini söylemez. Türk ve Anadolu sanatını keşfetmene ve kendi fikirlerini geliştirmeni sağlar.</p>
            <div className="mt-9 flex flex-wrap gap-4"><a href="#kesfet" className="rounded-full bg-[#183b78] px-7 py-4 text-base font-extrabold text-white shadow-[6px_7px_0_#f2bd3c] transition-transform hover:-translate-y-1">Keşfetmeye Başla →</a><span className="self-center rounded-full border-2 border-[#183b78]/15 bg-white/60 px-5 py-3 text-sm font-bold text-[#31527d] backdrop-blur">Yerel açık model · Çocuk odaklı</span></div>
          </motion.div>
          <div aria-label="Türk sanatlarından ilham alan görsel kompozisyon" className="relative mx-auto aspect-square w-full max-w-[560px]"><div className={styles.plate} aria-hidden="true"><span className={styles.plateCenter}>✿</span></div><div className={`${styles.floatObject} left-0 top-[8%] bg-[#f2bd3c]`}>🖌️</div><div className={`${styles.floatObject} right-0 top-[19%] bg-white [animation-delay:-2s]`}>🌷</div><div className="absolute bottom-[3%] left-[4%] rotate-[-8deg] rounded-2xl bg-[#172c50] px-7 py-5 text-4xl text-white shadow-lift">◆ ◇ ◆</div><div className={`${styles.floatObject} bottom-[8%] right-[3%] bg-[#e66d5c] [animation-delay:-4s]`}>🏺</div></div>
        </div>
      </section>

      <section id="kesfet" className="relative bg-[#173969] px-5 py-24 text-white sm:px-8"><div className="mx-auto max-w-[1180px]"><div className="mb-12 max-w-3xl"><p className={styles.kicker}>Sanat rotası</p><h2 className="text-5xl font-semibold sm:text-7xl">Türkiye’nin renkli haritası</h2><p className="mt-5 text-lg text-white/75">Bir durağa dokun; o bölgenin malzemeleri, desenleri ve hikâyeleri canlansın.</p></div><div className="grid gap-8 lg:grid-cols-[1.55fr_.65fr]"><div className={styles.map}><div className={styles.mapSea}>KARADENİZ</div><div className={styles.land} />{regions.map((item) => <button key={item.city} type="button" onClick={() => setRegion(item)} className={styles.regionPin} style={{ left: item.x, top: item.y, background: item.color }} aria-label={`${item.city}: ${item.art}`}><span>{item.emoji}</span><small>{item.city}</small></button>)}</div><motion.aside key={region.city} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="relative overflow-hidden rounded-[36px] bg-[#fff8e8] p-8 text-[#173969] shadow-lift"><span className="text-7xl" aria-hidden="true">{region.emoji}</span><p className="mt-6 text-sm font-extrabold uppercase tracking-[.2em] text-[#d44d45]">Haritadaki durağın</p><h3 className="mt-2 text-4xl font-semibold">{region.city}</h3><p className="mt-3 text-xl font-bold text-[#287d8f]">{region.art}</p><p className="mt-6 leading-relaxed text-[#40587b]">Buradaki sanat, yaşanan coğrafyanın rengi ve gündelik yaşamın izleriyle biçimlenir. Aynı gelenek komşu bölgelerde farklı anlatılabilir.</p></motion.aside></div></div></section>

      <section className="bg-[#fff8e8] px-5 py-24 sm:px-8"><div className="mx-auto max-w-[1180px]"><p className={`${styles.kicker} text-[#d44d45]`}>Keşfet</p><div className="flex flex-wrap items-end justify-between gap-5"><h2 className="max-w-3xl text-5xl font-semibold sm:text-7xl">Her konu küçük bir sanat dünyası.</h2><p className="max-w-sm font-medium text-[#58708e]">Birini seç. Önce bak, sonra hikâyesini öğren, en son kendi fikrini kur.</p></div><div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{topics.map((item, index) => <motion.button whileHover={{ y: -8, rotate: index % 2 ? 1 : -1 }} key={item.id} type="button" onClick={() => chooseTopic(item.id)} className={`${styles.topicCard} text-left`} style={{ "--topic": item.color } as React.CSSProperties}><span className="text-7xl" aria-hidden="true">{item.emoji}</span><span className="mt-10 block text-3xl font-semibold">{item.title}</span><span className="mt-2 block font-medium opacity-75">{item.subtitle}</span><span className="mt-7 inline-flex rounded-full bg-white/85 px-4 py-2 text-sm font-extrabold text-[#173969]">Yolculuğu aç →</span></motion.button>)}</div></div></section>

      <section ref={journeyRef} className="scroll-mt-20 bg-[#f1cc68] px-5 py-24 sm:px-8"><div className="mx-auto max-w-[1180px]"><div className="grid gap-8 lg:grid-cols-[.7fr_1.3fr]"><div><p className={`${styles.kicker} text-[#173969]`}>Öğrenme yolculuğu</p><span className="mt-5 block text-8xl" aria-hidden="true">{topic.emoji}</span><h2 className="mt-6 text-5xl font-semibold">{topic.title}</h2><p className="mt-4 max-w-md text-lg font-medium text-[#4c5264]">İznik atölyelerinde ustalar beyaz yüzeyleri kobalt mavisi, turkuaz ve mercan kırmızısıyla canlandırdı. Lale ve karanfil gibi çiçekler doğadan esinlendi; ama çoğu birebir kopya değildi.</p></div><div className="rounded-[40px] bg-[#fffaf0] p-5 shadow-lift sm:p-8"><div className="grid grid-cols-2 gap-3 sm:grid-cols-4">{lessons.map((item, index) => <button key={item} type="button" onClick={() => setLesson(index)} className={`rounded-2xl px-3 py-3 text-sm font-extrabold transition ${lesson === index ? "bg-[#173969] text-white" : "bg-[#e8dfcd] text-[#405675]"}`}>{index + 1}. {item}</button>)}</div><div className="mt-8 min-h-[330px] rounded-[30px] border-2 border-dashed border-[#173969]/20 bg-white p-7 sm:p-10">{lesson === 0 && <Lesson title="Bir tabağa dikkatle bak" icon="👀"><p>Çiçekler aynı yöne mi bakıyor? Gözün önce merkeze mi, kenara mı gidiyor? Sanatçı bakışını yavaşlatarak başlar.</p><button onClick={() => setLesson(1)} className={styles.nextButton}>Desenleri incele →</button></Lesson>}{lesson === 1 && <Lesson title="Doğa değişince desen olur" icon="🌷"><div className="grid grid-cols-4 gap-3 text-center text-4xl"><span>♠</span><span>✿</span><span>❧</span><span>◆</span></div><p className="mt-6">Lale, karanfil, yaprak ve geometrik şekiller. Hangisi sakin, hangisi hareketli görünüyor?</p><button onClick={() => setLesson(2)} className={styles.nextButton}>Hikâyesini öğren →</button></Lesson>}{lesson === 2 && <Lesson title="Gerçek bilgi + yaratıcı yorum" icon="📜"><p><strong>Tarihsel bilgi:</strong> İznik, 16. yüzyılda önemli bir seramik üretim merkeziydi.</p><p className="mt-3"><strong>Yaratıcı yorum:</strong> Bir motifin sana ne hissettirdiğinin tek doğru cevabı yoktur.</p><button onClick={() => setLesson(3)} className={styles.nextButton}>Sıra bende →</button></Lesson>}{lesson === 3 && <Lesson title="Fikrin yavaş yavaş oluşsun" icon="💭"><p>Sana bitmiş bir desen vermeyeceğiz. Küçük seçimlerin kendi tasarım fikrini oluşturacak.</p><button onClick={() => document.getElementById("yaratici-yolculuk")?.scrollIntoView({ behavior: "smooth" })} className={styles.nextButton}>Yaratıcı yolculuğa başla →</button></Lesson>}</div></div></div></div></section>

      <section id="yaratici-yolculuk" className="scroll-mt-20 bg-[#ed685e] px-5 py-24 sm:px-8"><div className="mx-auto max-w-[1180px]"><p className={`${styles.kicker} text-white`}>Sıra sende</p><h2 className="max-w-4xl text-5xl font-semibold text-white sm:text-7xl">Cevapların, senin fikrinin parçaları.</h2><div className="mt-12 grid gap-7 lg:grid-cols-[1.25fr_.75fr]"><div className={styles.questionPaper}>{journeyStep < journey.length ? <><span className="font-hand text-2xl text-[#d44d45]">Yaratıcı soru {journeyStep + 1}/{journey.length}</span><h3 className="mt-5 text-4xl font-semibold leading-tight">{journey[journeyStep].question}</h3><div className="mt-8 flex flex-wrap gap-3">{journey[journeyStep].options.map((option) => <button key={option} type="button" onClick={() => chooseJourneyAnswer(option)} className="rounded-full border-2 border-[#173969] bg-white px-5 py-3 font-extrabold text-[#173969] transition hover:-translate-y-1 hover:bg-[#f2bd3c]">{option}</button>)}</div><p className="mt-8 text-sm font-semibold text-[#60708b]">Bunlar sadece başlangıç seçenekleri. Kağıdında her birini istediğin kadar değiştirebilirsin.</p></> : <><span className="text-7xl">🎨</span><h3 className="mt-6 text-4xl font-semibold">Şimdi sıra sende.</h3><p className="mt-4 text-xl leading-relaxed">Kağıdını al ve fikrini kendi tarzında çiz. Bir seçim hoşuna gitmezse değiştir; sanat denemekle büyür.</p><button type="button" onClick={() => { setJourneyStep(0); setConcept({}); }} className={styles.nextButton}>Yeni bir yolculuk</button></>}</div><aside className="rounded-[36px] bg-[#173969] p-7 text-white shadow-lift sm:p-9"><p className="font-hand text-2xl text-[#f2bd3c]">Benim Tasarım Fikrim</p><div className="mt-7 space-y-4">{journey.map((item) => <div key={item.key} className="border-b border-white/15 pb-3"><span className="block text-xs font-bold uppercase tracking-[.16em] text-white/50">{item.title}</span><strong className="mt-1 block text-lg">{concept[item.key] ?? "Henüz seçmedim"}</strong></div>)}</div><p className="mt-7 rounded-2xl bg-white/10 p-4 text-sm leading-relaxed text-white/75">Bu bir çizim tarifi değil; kendi eserine başlarken hatırlamak istediğin fikirler.</p></aside></div></div></section>

      <section className="bg-[#fff8e8] px-5 py-24 sm:px-8"><div className="mx-auto max-w-[1180px]"><p className={`${styles.kicker} text-[#d44d45]`}>Motif kaşifi</p><h2 className="text-5xl font-semibold sm:text-7xl">Şekillerin hafızası var.</h2><div className="mt-12 grid gap-7 lg:grid-cols-[.9fr_1.1fr]"><div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-2">{motifs.map((item) => <button key={item.name} type="button" onClick={() => setMotif(item)} className={`rounded-[28px] border-2 p-5 text-left transition hover:-translate-y-1 ${motif.name === item.name ? "border-[#173969] bg-white shadow-soft" : "border-transparent bg-[#efe4d0]"}`}><span className="block text-5xl" style={{ color: item.color }}>{item.mark}</span><strong className="mt-4 block">{item.name}</strong></button>)}</div><motion.article key={motif.name} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="relative overflow-hidden rounded-[42px] p-8 text-white shadow-lift sm:p-12" style={{ background: motif.color }}><div className="absolute right-[-5%] top-[-20%] text-[18rem] font-bold leading-none opacity-10">{motif.mark}</div><span className="text-8xl">{motif.mark}</span><p className="mt-7 text-xs font-extrabold uppercase tracking-[.2em] text-white/65">{motif.region}</p><h3 className="mt-2 text-5xl font-semibold">{motif.name}</h3><p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/85">{motif.meaning}</p><div className="mt-9 rotate-[-1deg] rounded-[28px] bg-[#fff8e8] p-6 text-[#173969]"><span className="font-hand text-2xl text-[#d44d45]">Kopyalamak yerine merak et:</span><p className="mt-2 text-2xl font-bold">“{motif.question}”</p></div></motion.article></div></div></section>

      <section className="relative overflow-hidden bg-[#2aa8a8] px-5 py-24 sm:px-8"><div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_center,#fff_2px,transparent_2px)] [background-size:28px_28px]" /><div className="relative mx-auto grid max-w-[1100px] gap-9 lg:grid-cols-[.8fr_1.2fr]"><div className="text-white"><p className={styles.kicker}>Bana ilham ver</p><h2 className="text-5xl font-semibold sm:text-7xl">Bazen ilk çizgi en zorudur.</h2><p className="mt-6 text-lg text-white/80">Ne düşündüğünü yaz. CultureCanvas senin yerine çizmez; hayal gücünü açacak bir veya iki soru sorar.</p></div><div className="rounded-[40px] bg-[#fff8e8] p-6 shadow-lift sm:p-9"><div className={styles.mentorPaper}><span className="text-4xl">🪁</span><p aria-live="polite" className="mt-4 text-xl font-bold leading-relaxed text-[#173969]">{mentorReply}</p><div className="mt-5 flex flex-wrap items-center gap-2"><span className="inline-block rounded-full bg-[#f2bd3c] px-3 py-1 text-xs font-extrabold text-[#173969]">GELİŞTİRME MODU · YEREL MOCK MODEL</span>{lastMentorIdea ? <button type="button" onClick={deriveMoreQuestions} disabled={thinking} className="rounded-full border-2 border-[#173969]/15 bg-white px-3 py-1 text-xs font-extrabold text-[#173969] transition hover:-translate-y-0.5 disabled:opacity-50">↻ Başka iki soru</button> : null}</div></div><form onSubmit={askMentor} className="mt-5 flex flex-col gap-3 sm:flex-row"><label className="sr-only" htmlFor="idea">Sanat fikrin</label><input id="idea" value={idea} onChange={(event) => setIdea(event.target.value)} placeholder="Örn. Bir kilim yapmak istiyorum…" className="min-w-0 flex-1 rounded-full border-2 border-[#173969]/15 bg-white px-6 py-4 font-semibold outline-none focus:border-[#173969]" /><button disabled={thinking} className="rounded-full bg-[#173969] px-6 py-4 font-extrabold text-white disabled:opacity-60">{thinking ? "Düşünüyor…" : "Sorumu sor →"}</button></form><div className="mt-4 flex flex-wrap gap-2">{["Ne çizeceğimi bilmiyorum.", "Bir kilim yapmak istiyorum.", "Ebru hakkında fikir istiyorum."].map((prompt) => <button key={prompt} type="button" onClick={() => setIdea(prompt)} className="rounded-full bg-[#e9dfcb] px-3 py-2 text-xs font-bold text-[#526782]">{prompt}</button>)}</div></div></div></section>

      <section className="bg-[#173969] px-5 py-20 text-center text-white sm:px-8"><div className="mx-auto max-w-3xl"><span className="text-7xl">🖍️</span><h2 className="mt-7 text-5xl font-semibold">Bitmiş resmi biz vermiyoruz.</h2><p className="mt-5 text-xl leading-relaxed text-white/75">Çünkü en güzel bölüm, fikrin senin elinde hiç beklemediğin bir şeye dönüşmesi.</p><a href="#kesfet" className="mt-9 inline-flex rounded-full bg-[#f2bd3c] px-7 py-4 font-extrabold text-[#173969]">Yeni bir şey keşfet ↑</a><div className="mt-8"><Link href={`/${locale}/culturecanvas/admin`} className="text-xs font-bold text-white/35 hover:text-white/70">Art4Good eğitim ekibi · Veri stüdyosu</Link></div></div></section>
    </div>
  );
}

function Lesson({ title, icon, children }: { title: string; icon: string; children: React.ReactNode }) {
  return <div><span className="text-5xl" aria-hidden="true">{icon}</span><h3 className="mt-5 text-4xl font-semibold">{title}</h3><div className="mt-5 text-lg leading-relaxed text-[#526782]">{children}</div></div>;
}
