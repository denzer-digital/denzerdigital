import { NextResponse, type NextRequest } from "next/server";

type ChatMessage = {
  text: string;
  ts: number;
  idx: number;
  agentType?: string;
};

type SessionStore = Map<string, ChatMessage[]>;

const sessions: SessionStore = new Map();

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function getSession(sessionId: string): ChatMessage[] {
  if (!sessions.has(sessionId)) {
    sessions.set(sessionId, []);
  }
  return sessions.get(sessionId) ?? [];
}

export async function POST(req: NextRequest) {
  try {
    const { sessionId, text, agentType } = (await req.json()) as {
      sessionId?: string;
      text?: string;
      agentType?: string;
    };

    if (!sessionId || typeof sessionId !== "string" || !sessionId.trim()) {
      return NextResponse.json({ error: "sessionId is required" }, { status: 400, headers: corsHeaders });
    }
    if (!text || typeof text !== "string" || !text.trim()) {
      return NextResponse.json({ error: "text is required" }, { status: 400, headers: corsHeaders });
    }

    const messages = getSession(sessionId.trim());
    const msg: ChatMessage = {
      text: text.trim(),
      ts: Date.now(),
      idx: messages.length,
      agentType,
    };
    messages.push(msg);

    return NextResponse.json(
      { ok: true, idx: msg.idx, total: messages.length },
      { status: 200, headers: corsHeaders },
    );
  } catch (error) {
    return NextResponse.json({ error: "invalid json body", detail: String(error) }, { status: 400, headers: corsHeaders });
  }
}

export function GET(req: NextRequest) {
  const sessionId = String(req.nextUrl.searchParams.get("sessionId") ?? "").trim();
  const cursorRaw = req.nextUrl.searchParams.get("cursor");
  const cursor = Number(cursorRaw ?? -1);

  if (!sessionId) {
    return NextResponse.json({ error: "sessionId is required" }, { status: 400, headers: corsHeaders });
  }
  if (Number.isNaN(cursor)) {
    return NextResponse.json({ error: "cursor must be a number" }, { status: 400, headers: corsHeaders });
  }

  const messages = getSession(sessionId);
  const next = messages.filter((m) => m.idx > cursor);

  return NextResponse.json(
    {
      messages: next,
      lastIdx: messages.length - 1,
    },
    { status: 200, headers: corsHeaders },
  );
}

export function OPTIONS() {
  return NextResponse.json({}, { status: 200, headers: corsHeaders });
}

