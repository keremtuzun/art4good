import { NextRequest, NextResponse } from "next/server";

type MentorRequest = { message?: unknown; age?: unknown; topic?: unknown };

const MAX_MESSAGE_LENGTH = 500;

function mentorResponse(message: string) {
  const normalized = message.toLocaleLowerCase("tr-TR");

  if (/yapamıyorum|kötü oldu|çizemiyorum|güzel değil/.test(normalized)) {
    return "Sanatta ‘kötü’ diye tek bir ölçü yok; denediğin her çizgi sana yeni bir şey gösterir. Çiziminde en çok hangi küçük ayrıntıyı seviyorsun? Onu biraz daha büyütsen ne değişirdi?";
  }
  if (/kilim/.test(normalized)) {
    return "Deseninin bir hikâyesi olsa ne anlatırdı? Doğadan bir şekil seçip onu üç farklı biçimde değiştirebilir misin?";
  }
  if (/ebru/.test(normalized)) {
    return "Suyun üzerinde yüzen renkler bir duygu taşısa hangisi olurdu? O duyguyu hızlı bir hareket mi, yavaş bir kıvrım mı daha iyi anlatırdı?";
  }
  if (/çini|iznik/.test(normalized)) {
    return "Hayalindeki çiçeğin kaç yaprağı olsun? Hangi küçük şeklin tabakta tekrar etmesini isterdin?";
  }
  if (/bilmiyorum|fikrim yok|ne çiz/.test(normalized)) {
    return "Bugün gördüğün bir şekli düşün: yaprak, bulut, pencere ya da taş olabilir. Hangisini seçerdin ve onu hiç görülmemiş bir şekle dönüştürmek için neyi değiştirirdin?";
  }
  return "Bu fikrin sende uyandırdığı his hangi renk olurdu? Aynı fikri köşeli ve yuvarlak biçimlerle ayrı ayrı denesen aralarında nasıl bir fark görürdün?";
}

export async function POST(request: NextRequest) {
  let body: MentorRequest;
  try {
    body = (await request.json()) as MentorRequest;
  } catch {
    return NextResponse.json({ error: "Geçersiz istek." }, { status: 400 });
  }

  const message = typeof body.message === "string" ? body.message.trim() : "";
  if (!message || message.length > MAX_MESSAGE_LENGTH) {
    return NextResponse.json({ error: "Mesaj 1–500 karakter olmalı." }, { status: 400 });
  }

  return NextResponse.json({
    response: mentorResponse(message),
    model: "culturecanvas-local-mock-v1",
    mode: "mock-local",
    notice: "Geliştirme yanıtıdır; ticari bir LLM API'si kullanılmaz.",
  });
}
