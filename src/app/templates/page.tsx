"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export const dynamic = "force-dynamic";

const templates = [
  { id: "elegant", name: "Elegant Floral", tag: "Birthday" },
  { id: "blackgold", name: "Black & Gold", tag: "Birthday" },
  { id: "neon", name: "Neon Party", tag: "Party" },
  { id: "botanical", name: "Botanical Garden", tag: "Wedding" },
  { id: "minimal", name: "Minimal Elegance", tag: "Wedding" },
  { id: "balloon", name: "Balloon Bash", tag: "Birthday" },
  { id: "wedding", name: "Wedding Classic", tag: "Wedding" },
  { id: "baby", name: "Starry Baby", tag: "Baby Shower" },
  { id: "corporate", name: "Corporate Prestige", tag: "Corporate" },
];

const templatePreviews: Record<string, React.CSSProperties> = {
  elegant: { background: "linear-gradient(160deg,#1a1208,#0d0a04,#1c1609)" },
  blackgold: { background: "#050505" },
  neon: { background: "linear-gradient(135deg,#0d0020,#1a0035,#000d20)" },
  botanical: { background: "linear-gradient(150deg,#0a1a0a,#071207)" },
  minimal: { background: "#f9f5ef" },
  balloon: { background: "linear-gradient(160deg,#1a0a2e,#0d0520)" },
  wedding: { background: "linear-gradient(160deg,#1a1520,#0d0a14)" },
  baby: { background: "linear-gradient(160deg,#0f1520,#080d18)" },
  corporate: { background: "linear-gradient(160deg,#080e16,#050a10)" },
};

const templateIcons: Record<string, React.ReactNode> = {
  elegant: <span style={{ fontSize: 40 }}>🌸</span>,
  blackgold: <span style={{ fontSize: 48, fontFamily: "'Cormorant Garamond', serif", color: "#C9A84C" }}>✦</span>,
  neon: <span style={{ fontSize: 48, color: "#ff00c8", textShadow: "0 0 20px #ff00c8" }}>✦</span>,
  botanical: <span style={{ fontSize: 40 }}>🌿</span>,
  minimal: <span style={{ fontSize: 40, color: "#1a1a1a", fontStyle: "italic" }}>✦</span>,
  balloon: <span style={{ fontSize: 40 }}>🎈</span>,
  wedding: <span style={{ fontSize: 40 }}>💍</span>,
  baby: <span style={{ fontSize: 40 }}>🍼</span>,
  corporate: <span style={{ fontSize: 40 }}>🏢</span>,
};

function TemplatesContent() {
  const searchParams = useSearchParams();
  const [filter, setFilter] = useState(searchParams.get("filter") || "All");
  const [search, setSearch] = useState("");

  const filtered = templates.filter((t) => {
    const matchF = filter === "All" || t.tag === filter;
    const matchS = !search || t.name.toLowerCase().includes(search.toLowerCase());
    return matchF && matchS;
  });

  function selectTemplate(id: string) {
    if (typeof window !== "undefined") {
      localStorage.setItem("invitee_template", id);
      window.location.href = `/create?template=${id}`;
    }
  }

  return (
    <>
      <style>{`
        .filter-chip { background:var(--surface2); border:1px solid var(--border); color:var(--text-dim); padding:8px 18px; border-radius:100px; font-size:13px; cursor:pointer; font-family:'DM Sans',sans-serif; transition:all 0.2s; }
        .filter-chip:hover, .filter-chip.active { background:rgba(201,168,76,0.15); border-color:var(--gold); color:var(--gold); }
        .template-card { border-radius:12px; overflow:hidden; cursor:pointer; border:1px solid var(--border); transition:all 0.3s; background:var(--surface); }
        .template-card:hover { border-color:var(--gold); transform:translateY(-4px); box-shadow:0 12px 40px rgba(0,0,0,0.4); }
        .inner-nav { display:flex; align-items:center; justify-content:space-between; padding:0 32px; height:64px; border-bottom:1px solid var(--border); background:var(--surface); position:sticky; top:0; z-index:10; }
        .back-btn { display:flex; align-items:center; gap:8px; color:var(--text-dim); cursor:pointer; font-size:14px; background:none; border:none; font-family:'DM Sans',sans-serif; transition:color 0.2s; }
        .back-btn:hover { color:var(--gold); }
      `}</style>

      {/* Header */}
      <div style={{ padding: "32px 32px 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
          {[1, 2, 3].map((i) => (
            <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: i === 1 ? "var(--gold)" : "var(--surface3)", boxShadow: i === 1 ? "0 0 0 3px rgba(201,168,76,0.2)" : "none" }} />
          ))}
        </div>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, fontWeight: 400, marginBottom: 8 }}>Choose Your Template</h2>
        <p style={{ color: "var(--text-dim)", fontSize: 14, marginBottom: 32 }}>Select a design that matches your occasion and personal style.</p>
      </div>

      {/* Filters */}
      <div style={{ padding: "0 32px 32px", display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
        {["All", "Birthday", "Wedding", "Party", "Baby Shower", "Corporate"].map((f) => (
          <button key={f} className={`filter-chip ${filter === f ? "active" : ""}`} onClick={() => setFilter(f)}>{f}</button>
        ))}
        <input
          type="text"
          placeholder="🔍  Search templates…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ marginLeft: "auto", background: "var(--surface2)", border: "1px solid var(--border)", color: "var(--text)", padding: "9px 16px", borderRadius: 8, fontSize: 13, fontFamily: "'DM Sans', sans-serif", outline: "none", width: 220 }}
        />
      </div>

      {/* Grid */}
      <div style={{ padding: "0 32px 48px", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 20 }}>
        {filtered.map((t) => (
          <div key={t.id} className="template-card" onClick={() => selectTemplate(t.id)}>
            <div style={{ height: 260, position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 20, ...templatePreviews[t.id as keyof typeof templatePreviews] }}>
              <div style={{ position: "absolute", top: "50%", transform: "translateY(-50%)" }}>
                {templateIcons[t.id as keyof typeof templateIcons]}
              </div>
              <div style={{ position: "relative", zIndex: 1, textAlign: "center", width: "100%" }}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, fontWeight: 600, color: t.id === "minimal" ? "#1a1a1a" : "var(--text)", lineHeight: 1.3, marginBottom: 6 }}>{t.name}</div>
                <div style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: "0.2em", color: t.id === "minimal" ? "#888" : "var(--text-dim)" }}>{t.tag}</div>
              </div>
            </div>
            <div style={{ padding: 14 }}>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{t.name}</div>
              <div style={{ fontSize: 11, color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.1em" }}>{t.tag}</div>
              <button style={{ width: "100%", marginTop: 10, background: "var(--gold)", border: "none", color: "#000", padding: 9, borderRadius: 6, fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, cursor: "pointer" }}
                onClick={(e) => { e.stopPropagation(); selectTemplate(t.id); }}>
                Use Template →
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default function TemplatesPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--text)", fontFamily: "'DM Sans', sans-serif" }}>
      <div className="inner-nav">
        <Link href="/" className="back-btn">← Back</Link>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, color: "var(--gold)" }}>Invitee</div>
        <div style={{ width: 60 }} />
      </div>
      <Suspense fallback={<div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "calc(100vh - 64px)", color: "var(--text-dim)" }}>Loading…</div>}>
        <TemplatesContent />
      </Suspense>
    </div>
  );
}
