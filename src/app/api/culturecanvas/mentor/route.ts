import { NextRequest, NextResponse } from "next/server";

type MentorRequest = { message?: unknown; age?: unknown; topic?: unknown; variant?: unknown };

const MAX_MESSAGE_LENGTH = 500;

const questionFamilies = {
  confidence: [
    "Çiziminde en çok hangi küçük ayrıntıyı seviyorsun? Onu biraz büyütsen ne değişirdi?",
    "Bu denemede seni şaşırtan bir çizgi var mı? Aynı çizgiyi başka bir yönde tekrar etsen ne olurdu?",
    "Resminin yalnızca sana ait olan kısmı hangisi? O kısmı farklı bir renkle yeniden denemek ister misin?",
    "Şu anda değiştirmek yerine korumak istediğin şey ne? Bir sonraki denemende yalnızca tek bir parçayı değiştirsen hangisi olurdu?",
  ],
  kilim: [
    "Deseninin bir hikâyesi olsa ne anlatırdı? Doğadan bir şekil seçip onu üç farklı biçimde değiştirebilir misin?",
    "Kilimindeki şekiller bir ritim tutsa hangisi tekrar ederdi? Aynı şekli bir kez köşeli, bir kez yuvarlak denesen ne değişirdi?",
    "Bu kilimin taşıdığı his hangi iki renk olurdu? Bu renklerden hangisi daha çok, hangisi daha az görünürdü?",
    "Desenin bir yolculuğu anlatsa nereden başlardı? Yol ilerledikçe şekiller büyür müydü, küçülür müydü?",
  ],
  ebru: [
    "Suyun üzerinde yüzen renkler bir duygu taşısa hangisi olurdu? O duyguyu hızlı bir hareket mi, yavaş bir kıvrım mı daha iyi anlatırdı?",
    "Ebrunun bir hava durumu olsa nasıl olurdu? Renkler birbirine yaklaşınca mı, uzaklaşınca mı bu hava daha iyi hissedilirdi?",
    "Suyun sesi bir çizgiye dönüşse nasıl kıvrılırdı? Bu çizginin yanına hangi renk sessizce eşlik ederdi?",
    "İki renk suyun üzerinde karşılaşsa nasıl hareket ederdi? Biri diğerinin içinden geçse desenin hissi nasıl değişirdi?",
  ],
  iznik: [
    "Hayalindeki çiçeğin kaç yaprağı olsun? Hangi küçük şeklin tabakta tekrar etmesini isterdin?",
    "Çiçeğinin daha önce görülmemiş bir parçası olsa bu ne olurdu? Onu kobalt mavisiyle mi, mercan kırmızısıyla mı vurgulardın?",
    "Desenin merkezinden kenarına doğru hangi şekil yolculuk etsin? Yol boyunca büyüse mi, küçülse mi?",
    "Bu çini sana bir mevsimi hatırlatsa hangisi olurdu? O mevsimin hissini yuvarlak mı, köşeli mi biçimler taşırdı?",
  ],
  beginning: [
    "Bugün gördüğün bir şekli düşün: yaprak, bulut, pencere ya da taş olabilir. Hangisini seçerdin? Onu hiç görülmemiş bir şekle dönüştürmek için neyi değiştirirdin?",
    "Aklına ilk gelen doğa parçası hangisi? Onu üç kez tekrar edip her seferinde biraz değiştirsen nasıl görünürdü?",
    "Bugünkü duygun bir renk ve bir şekil olsaydı hangileri olurdu? Bu ikisi sayfanın neresinde karşılaşırdı?",
    "Bir çizgiyle başlamak istesen çizgin hızlı mı, yavaş mı ilerlerdi? Yol boyunca hangi küçük sürprizle karşılaşırdı?",
  ],
  general: [
    "Bu fikir bir renk olsaydı hangi renk olurdu? Neden?",
    "İçindeki duyguyu iki renkle anlatsan hangilerini seçerdin? Bu renklerden biri diğerine yaklaşınca ne değişirdi?",
    "Bu fikrin rengi günün farklı saatlerinde değişir miydi? Sabah ve gece hâlleri arasında nasıl bir fark olurdu?",
    "Fikrin neşelendiğinde hangi renge, sakinleştiğinde hangi renge dönüşürdü? İki hâli aynı sayfada nasıl buluştururdun?",
    "Bu duygu sıcak bir renk mi, serin bir renk mi isterdi? Beklenmedik bir renk eklesen his nasıl değişirdi?",
    "Aynı fikri yalnızca köşeli şekillerle anlatsan nasıl hissedilirdi? Yuvarlak çizgiler ona ne katardı?",
    "Bir şeklin köşelerini yavaşça yuvarlatsan fikrin nasıl değişirdi? Hangi hâli sana daha yakın gelirdi?",
    "Köşeli ve yuvarlak şekilleri bir araya getirsen hangisi önce dikkat çekerdi? İkisi arasında nasıl bir denge kurardın?",
    "Bu fikir sert çizgiler mi, yumuşak kıvrımlar mı isterdi? Çizgilerin yönü değişince his de değişir miydi?",
    "Aynı motifi önce büyük ve köşeli, sonra küçük ve yuvarlak denesen aralarında nasıl bir fark görürdün? Hangisi daha hareketli olurdu?",
    "Renklerin ve şekillerin bir ritmi olsa hangisi tekrar ederdi? Ritmi bir yerde bozsan gözün nereye giderdi?",
    "Fikrinin en meraklı kısmı hangi renk ve biçimle kendini gösterirdi? O parçayı üç farklı şekilde değiştirebilir misin?",
  ],
} as const;

function stableIndex(message: string, variant: number, length: number) {
  let value = variant * 17;
  for (const character of message) value = (value * 31 + character.charCodeAt(0)) >>> 0;
  return value % length;
}

function pickQuestion(message: string, variant: number, family: keyof typeof questionFamilies) {
  const questions = questionFamilies[family];
  return questions[stableIndex(message, variant, questions.length)];
}

function mentorResponse(message: string, variant: number) {
  const normalized = message.toLocaleLowerCase("tr-TR");

  if (/yapamıyorum|kötü oldu|çizemiyorum|güzel değil/.test(normalized)) {
    return `Sanatta ‘kötü’ diye tek bir ölçü yok; denediğin her çizgi sana yeni bir şey gösterir. ${pickQuestion(normalized, variant, "confidence")}`;
  }
  if (/kilim/.test(normalized)) {
    return pickQuestion(normalized, variant, "kilim");
  }
  if (/ebru/.test(normalized)) {
    return pickQuestion(normalized, variant, "ebru");
  }
  if (/çini|iznik/.test(normalized)) {
    return pickQuestion(normalized, variant, "iznik");
  }
  if (/bilmiyorum|fikrim yok|ne çiz/.test(normalized)) {
    return pickQuestion(normalized, variant, "beginning");
  }
  return pickQuestion(normalized, variant, "general");
}

export async function POST(request: NextRequest) {
  let body: MentorRequest;
  try {
    body = (await request.json()) as MentorRequest;
  } catch {
    return NextResponse.json({ error: "Geçersiz istek." }, { status: 400 });
  }

  const message = typeof body.message === "string" ? body.message.trim() : "";
  const variant = typeof body.variant === "number" && Number.isInteger(body.variant)
    ? Math.min(Math.max(body.variant, 0), 50)
    : 0;
  if (!message || message.length > MAX_MESSAGE_LENGTH) {
    return NextResponse.json({ error: "Mesaj 1–500 karakter olmalı." }, { status: 400 });
  }

  return NextResponse.json({
    response: mentorResponse(message, variant),
    variant,
    model: "culturecanvas-local-mock-v1",
    mode: "mock-local",
    notice: "Geliştirme yanıtıdır; ticari bir LLM API'si kullanılmaz.",
  });
}
