"use client";
import React from "react";

interface InviteData {
  title: string;
  host?: string;
  date: string;
  time: string;
  location: string;
  description?: string;
  dressCode?: string;
}

function formatDate(d: string) {
  if (!d) return "";
  const dt = new Date(d + "T12:00:00");
  return dt.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}
function formatTime(t: string) {
  if (!t) return "";
  const [h, m] = t.split(":");
  const hour = parseInt(h);
  const ampm = hour >= 12 ? "PM" : "AM";
  const h12 = hour % 12 || 12;
  return `${h12}:${m} ${ampm}`;
}

// ── Elegant Floral ──────────────────────────────────────
export function ElegantFloral({ data }: { data: InviteData }) {
  return (
    <div className="w-full h-full" style={{
      background: "linear-gradient(160deg, #1a1208 0%, #0d0a04 50%, #1c1609 100%)",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      padding: "28px 20px", position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 90,
        background: "radial-gradient(ellipse 100% 100% at 50% 0%, rgba(201,168,76,0.15) 0%, transparent 80%)",
        display: "flex", alignItems: "flex-start", justifyContent: "center", fontSize: 36, paddingTop: 6,
      }}>🌸✨🌸</div>
      <div style={{ position: "relative", textAlign: "center" }}>
        <div style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: "0.25em", color: "rgba(201,168,76,0.7)", marginBottom: 10 }}>YOU&apos;RE INVITED TO</div>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 26, fontWeight: 600, color: "#E8C97A", lineHeight: 1.2, marginBottom: 14 }}>{data.title}</div>
        <div style={{ width: 60, height: 1, background: "linear-gradient(90deg,transparent,#C9A84C,transparent)", margin: "0 auto 14px" }} />
        <div style={{ fontSize: 10, color: "rgba(240,237,232,0.75)", lineHeight: 1.8 }}>
          {formatDate(data.date)}<br />{formatTime(data.time)}<br /><br />{data.location}
        </div>
        {data.dressCode && <div style={{ fontSize: 9, color: "rgba(201,168,76,0.6)", textTransform: "uppercase", letterSpacing: "0.15em", marginTop: 12 }}>DRESS CODE: {data.dressCode}</div>}
      </div>
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 70, display: "flex", alignItems: "flex-end", justifyContent: "center", fontSize: 28, paddingBottom: 8 }}>🌿🌸🌿</div>
    </div>
  );
}

// ── Black & Gold ──────────────────────────────────────
export function BlackAndGold({ data }: { data: InviteData }) {
  return (
    <div className="w-full h-full" style={{
      background: "#050505", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      padding: "28px 20px", position: "relative", overflow: "hidden", border: "1px solid rgba(201,168,76,0.3)",
    }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(45deg, rgba(201,168,76,0.03) 0, rgba(201,168,76,0.03) 1px, transparent 1px, transparent 50%)", backgroundSize: "20px 20px" }} />
      {[["top:20px;left:20px","border-width:1px 0 0 1px"],["top:20px;right:20px","border-width:1px 1px 0 0"],["bottom:20px;left:20px","border-width:0 0 1px 1px"],["bottom:20px;right:20px","border-width:0 1px 1px 0"]].map(([pos, border], i) => (
        <div key={i} style={{ position: "absolute", width: 30, height: 30, borderColor: "#C9A84C", borderStyle: "solid", opacity: 0.5, ...Object.fromEntries(pos.split(";").map(s => s.split(":"))) }} data-pos={pos} data-border={border} />
      ))}
      <div style={{ position: "absolute", top: 20, left: 20, right: 20, bottom: 20, border: "1px solid rgba(201,168,76,0.15)", pointerEvents: "none" }} />
      <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
        <div style={{ fontSize: 8, textTransform: "uppercase", letterSpacing: "0.3em", color: "rgba(201,168,76,0.6)", marginBottom: 12 }}>YOU ARE CORDIALLY INVITED</div>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 30, fontWeight: 600, color: "#C9A84C", lineHeight: 1.2, marginBottom: 12 }}>{data.title}</div>
        <div style={{ width: 50, height: 1, background: "#C9A84C", margin: "0 auto 12px" }} />
        <div style={{ fontSize: 10, color: "rgba(240,237,232,0.65)", lineHeight: 2 }}>
          {formatDate(data.date)}<br />{formatTime(data.time)}<br /><br />{data.location}
          {data.dressCode && <><br /><br />DRESS: {data.dressCode.toUpperCase()}</>}
        </div>
      </div>
    </div>
  );
}

// ── Neon Party ──────────────────────────────────────
export function NeonParty({ data }: { data: InviteData }) {
  return (
    <div className="w-full h-full" style={{
      background: "linear-gradient(135deg, #0d0020 0%, #1a0035 50%, #000d20 100%)",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      padding: "28px 20px", position: "relative", overflow: "hidden",
    }}>
      <div style={{ position: "absolute", top: "-30%", left: "-10%", width: "60%", height: "60%", borderRadius: "50%", background: "radial-gradient(circle, rgba(255,0,200,0.15) 0%, transparent 70%)" }} />
      <div style={{ position: "absolute", bottom: "-20%", right: "-10%", width: "50%", height: "50%", borderRadius: "50%", background: "radial-gradient(circle, rgba(0,200,255,0.15) 0%, transparent 70%)" }} />
      <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 38, fontWeight: 700, textTransform: "uppercase", color: "#fff", textShadow: "0 0 20px rgba(255,0,200,0.8), 0 0 40px rgba(255,0,200,0.4)", lineHeight: 1.1 }}>{data.title.toUpperCase()}</div>
        <div style={{ width: 80, height: 2, background: "linear-gradient(90deg,#ff00c8,#00c8ff)", margin: "12px auto" }} />
        <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.3em", color: "rgba(0,200,255,0.9)", textShadow: "0 0 10px rgba(0,200,255,0.6)", margin: "10px 0" }}>YOU&apos;RE INVITED</div>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.75)", lineHeight: 1.8 }}>{formatDate(data.date)}<br />{formatTime(data.time)}<br />{data.location}</div>
      </div>
    </div>
  );
}

// ── Botanical Garden ──────────────────────────────────────
export function BotanicalGarden({ data }: { data: InviteData }) {
  const leaves = [
    { emoji: "🌿", pos: "top:-10px;left:-10px;transform:rotate(-30deg)" },
    { emoji: "🍃", pos: "top:-5px;right:-10px;transform:rotate(60deg)" },
    { emoji: "🌿", pos: "bottom:-10px;left:-5px;transform:rotate(120deg)" },
    { emoji: "🍃", pos: "bottom:-8px;right:-8px;transform:rotate(200deg)" },
  ];
  return (
    <div className="w-full h-full" style={{
      background: "linear-gradient(150deg, #0a1a0a 0%, #071207 100%)",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      padding: "28px 20px", position: "relative", overflow: "hidden",
    }}>
      {leaves.map((l, i) => (
        <div key={i} style={{ position: "absolute", fontSize: 48, opacity: 0.15, ...Object.fromEntries(l.pos.split(";").map(s => { const [k,v] = s.split(":"); return [k,v]; })) }}>{l.emoji}</div>
      ))}
      <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
        <div style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: "0.25em", color: "rgba(126,200,90,0.8)", marginBottom: 10 }}>{data.title.toUpperCase()}</div>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontStyle: "italic", fontWeight: 400, color: "#c8e6b0", lineHeight: 1.3, marginBottom: 14 }}>{data.title}</div>
        <div style={{ fontSize: 18, marginBottom: 10 }}>🌱</div>
        <div style={{ fontSize: 10, color: "rgba(200,230,176,0.6)", lineHeight: 1.9 }}>{formatDate(data.date)}<br />{formatTime(data.time)}<br />{data.location}</div>
      </div>
    </div>
  );
}

// ── Minimal Elegant ──────────────────────────────────────
export function MinimalElegance({ data }: { data: InviteData }) {
  return (
    <div className="w-full h-full" style={{
      background: "#f9f5ef", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      padding: "32px 24px", position: "relative", overflow: "hidden",
    }}>
      <div style={{ position: "absolute", top: 16, left: 16, right: 16, bottom: 16, border: "1px solid rgba(0,0,0,0.08)" }} />
      <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
        <div style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: "0.3em", color: "#888", marginBottom: 16 }}>YOU&apos;RE INVITED</div>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 30, fontWeight: 300, color: "#1a1a1a", lineHeight: 1.3, marginBottom: 16 }}>{data.title}</div>
        <div style={{ width: 40, height: 0.5, background: "#1a1a1a", margin: "0 auto 16px", opacity: 0.3 }} />
        <div style={{ fontSize: 10, color: "#666", lineHeight: 2, fontWeight: 400 }}>{formatDate(data.date)}<br />{formatTime(data.time)}<br />{data.location}{data.dressCode && <><br /><br />{data.dressCode}</>}</div>
      </div>
    </div>
  );
}

// ── Balloon Bash ──────────────────────────────────────
export function BalloonBash({ data }: { data: InviteData }) {
  return (
    <div className="w-full h-full" style={{
      background: "linear-gradient(160deg, #1a0a2e 0%, #0d0520 100%)",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      padding: "28px 20px", position: "relative", overflow: "hidden",
    }}>
      {[
        { emoji: "🎈", pos: "top:10px;left:15px;transform:rotate(-15deg)" },
        { emoji: "🎈", pos: "top:5px;left:50px" },
        { emoji: "🎈", pos: "top:15px;right:10px;transform:rotate(10deg)" },
        { emoji: "🎈", pos: "bottom:10px;left:20px;transform:rotate(20deg)" },
        { emoji: "🎈", pos: "bottom:5px;right:20px;transform:rotate(-10deg)" },
      ].map((b, i) => (
        <div key={i} style={{ position: "absolute", fontSize: 24, ...Object.fromEntries(b.pos.split(";").map(s => { const [k,v] = s.split(":"); return [k,v]; })) }}>{b.emoji}</div>
      ))}
      {[
        { emoji: "🎊", pos: "top:80px;left:10px" },
        { emoji: "🎉", pos: "top:70px;right:15px" },
      ].map((c, i) => (
        <div key={i} style={{ position: "absolute", fontSize: 14, ...Object.fromEntries(c.pos.split(";").map(s => { const [k,v] = s.split(":"); return [k,v]; })) }}>{c.emoji}</div>
      ))}
      <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
        <div style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: "0.25em", color: "rgba(255,180,100,0.8)", marginBottom: 10 }}>YOU&apos;RE INVITED</div>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 600, color: "#fff", lineHeight: 1.2, marginBottom: 12 }}>{data.title}</div>
        <div style={{ fontSize: 16, marginBottom: 10 }}>🎉 🎊 🎉</div>
        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.65)", lineHeight: 2 }}>{formatDate(data.date)}<br />{formatTime(data.time)}<br />{data.location}</div>
      </div>
    </div>
  );
}

// ── Wedding Classic ──────────────────────────────────────
export function WeddingClassic({ data }: { data: InviteData }) {
  return (
    <div className="w-full h-full" style={{
      background: "linear-gradient(160deg, #1a1520 0%, #0d0a14 100%)",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      padding: "28px 20px", position: "relative", overflow: "hidden",
    }}>
      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 52, color: "rgba(201,168,76,0.15)", position: "absolute", lineHeight: 1, top: "50%", transform: "translateY(-50%)" }}>♥</div>
      <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
        <div style={{ fontSize: 22, marginBottom: 12 }}>💍</div>
        <div style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: "0.25em", color: "rgba(201,168,76,0.7)", marginBottom: 8 }}>TOGETHER WITH THEIR FAMILIES</div>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontStyle: "italic", color: "#E8C97A", lineHeight: 1.3, marginBottom: 12 }}>{data.title}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, margin: "0 auto 12px", width: "fit-content" }}>
          <span style={{ width: 30, height: 0.5, background: "rgba(201,168,76,0.4)" }} />
          <span style={{ fontSize: 8, color: "rgba(201,168,76,0.6)" }}>◆</span>
          <span style={{ width: 30, height: 0.5, background: "rgba(201,168,76,0.4)" }} />
        </div>
        <div style={{ fontSize: 10, color: "rgba(240,237,232,0.6)", lineHeight: 2 }}>{formatDate(data.date)}<br />{formatTime(data.time)}<br /><br />{data.location}</div>
      </div>
    </div>
  );
}

// ── Starry Baby ──────────────────────────────────────
export function StarryBaby({ data }: { data: InviteData }) {
  const stars = [
    { top: "10%", left: "15%" }, { top: "25%", left: "70%" }, { top: "55%", left: "8%" },
    { top: "70%", left: "55%" }, { top: "40%", left: "85%" }, { top: "80%", left: "25%" },
    { top: "15%", left: "45%" }, { top: "65%", left: "80%" }, { top: "45%", left: "20%" },
    { top: "85%", left: "60%" },
  ];
  return (
    <div className="w-full h-full" style={{
      background: "linear-gradient(160deg, #0f1520 0%, #080d18 100%)",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      padding: "28px 20px", position: "relative", overflow: "hidden",
    }}>
      {stars.map((s, i) => (
        <div key={i} style={{ position: "absolute", top: s.top, left: s.left, fontSize: 12, color: "rgba(180,200,255,0.3)" }}>✦</div>
      ))}
      <div style={{ fontSize: 36, position: "absolute", top: 16, right: 24, opacity: 0.2 }}>🌙</div>
      <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
        <div style={{ fontSize: 32, marginBottom: 10 }}>🍼</div>
        <div style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: "0.25em", color: "rgba(150,180,255,0.8)", marginBottom: 8 }}>BABY SHOWER</div>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 26, fontStyle: "italic", color: "#d0dcff", lineHeight: 1.3, marginBottom: 12 }}>{data.title}</div>
        <div style={{ width: 50, height: 1, background: "rgba(150,180,255,0.3)", margin: "0 auto 12px" }} />
        <div style={{ fontSize: 10, color: "rgba(200,215,255,0.6)", lineHeight: 2 }}>{formatDate(data.date)}<br />{formatTime(data.time)}<br />{data.location}</div>
      </div>
    </div>
  );
}

// ── Corporate Prestige ──────────────────────────────────────
export function CorporatePrestige({ data }: { data: InviteData }) {
  return (
    <div className="w-full h-full" style={{
      background: "linear-gradient(160deg, #080e16 0%, #050a10 100%)",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      padding: "28px 20px", position: "relative", overflow: "hidden",
    }}>
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 3, background: "linear-gradient(180deg, #C9A84C, transparent)" }} />
      <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
        <div style={{ fontSize: 8, textTransform: "uppercase", letterSpacing: "0.35em", color: "rgba(201,168,76,0.6)", marginBottom: 16 }}>YOU ARE INVITED</div>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 26, fontWeight: 600, color: "#F0EDE8", lineHeight: 1.3, marginBottom: 16 }}>{data.title}</div>
        <div style={{ width: "100%", height: 0.5, background: "linear-gradient(90deg,transparent,rgba(201,168,76,0.3),transparent)", margin: "12px 0" }} />
        <div style={{ fontSize: 10, color: "rgba(240,237,232,0.5)", lineHeight: 2 }}>{formatDate(data.date)}<br />{formatTime(data.time)}<br /><br />{data.location}</div>
      </div>
    </div>
  );
}
