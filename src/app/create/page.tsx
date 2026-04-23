"use client";
export const dynamic = 'force-dynamic';

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ElegantFloral, BlackAndGold, NeonParty, BotanicalGarden, MinimalElegance, BalloonBash, WeddingClassic, StarryBaby, CorporatePrestige } from "@/components/templates";

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

function formatDate(d: string) {
  if (!d) return "";
  const dt = new Date(d + "T12:00:00");
  return dt.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}
function formatTime(t: string) {
  if (!t) return "";
  const [h, m] = t.split(":");
  const hour = parseInt(h);
  return `${hour % 12 || 12}:${m} ${hour >= 12 ? "PM" : "AM"}`;
}

const TemplateComponents: Record<string, React.FC<{ data: any }>> = {
  elegant: ElegantFloral, blackgold: BlackAndGold, neon: NeonParty,
  botanical: BotanicalGarden, minimal: MinimalElegance, balloon: BalloonBash,
  wedding: WeddingClassic, baby: StarryBaby, corporate: CorporatePrestige,
};

function CreateContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const templateId = searchParams.get("template") || "blackgold";
  const [form, setForm] = useState({
    title: "Olivia's Birthday Party",
    host: "Olivia Smith",
    date: "2025-05-24",
    time: "18:00",
    location: "123 Party Street, Los Angeles, CA 90001",
    description: "Join us for a night of fun, music and celebration!",
    dressCode: "Party Wear",
    rsvpDeadline: "2025-05-20",
  });
  const [previewKey, setPreviewKey] = useState(0);

  const data = {
    title: form.title,
    date: formatDate(form.date),
    time: formatTime(form.time),
    location: form.location,
    description: form.description,
    dressCode: form.dressCode,
  };

  function updateField(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setPreviewKey((k) => k + 1);
  }

  const templateInfo = templates.find((t) => t.id === templateId) || templates[1];
  const TemplateComp = TemplateComponents[templateId] || BlackAndGold;

  return (
    <>
      <style>{`
        .form-group { margin-bottom:20px; }
        .form-group label { display:block; font-size:12px; text-transform:uppercase; letter-spacing:0.1em; color:var(--text-dim); margin-bottom:8px; font-weight:600; }
        .form-group input, .form-group textarea { width:100%; background:var(--surface2); border:1px solid var(--border); color:var(--text); padding:12px 14px; border-radius:8px; font-family:'DM Sans',sans-serif; font-size:14px; outline:none; transition:border 0.2s; }
        .form-group input:focus, .form-group textarea:focus { border-color:var(--gold); }
        .form-group textarea { resize:vertical; min-height:80px; }
        .step-dot { width:8px; height:8px; border-radius:50%; background:var(--surface3); }
        .step-dot.done { background:var(--gold); }
        .step-dot.active { background:var(--gold); box-shadow:0 0 0 3px rgba(201,168,76,0.2); }
      `}</style>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", flex: 1, overflow: "hidden", minHeight: "calc(100vh - 64px)" }}>
        <div style={{ padding: 32, overflowY: "auto", borderRight: "1px solid var(--border)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
            <div className="step-dot done" />
            <div className="step-dot active" />
            <div className="step-dot" />
          </div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 400, marginBottom: 6 }}>Event Details</h2>
          <p style={{ color: "var(--text-dim)", fontSize: 13, marginBottom: 28 }}>Fill in the details for your invite. See the preview update live.</p>

          <div className="form-group">
            <label>Event Title *</label>
            <input type="text" value={form.title} onChange={(e) => updateField("title", e.target.value)} placeholder="e.g. Olivia's Birthday Party" />
          </div>
          <div className="form-group">
            <label>Host Name *</label>
            <input type="text" value={form.host} onChange={(e) => updateField("host", e.target.value)} placeholder="Your name" />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div className="form-group">
              <label>Date *</label>
              <input type="date" value={form.date} onChange={(e) => updateField("date", e.target.value)} />
            </div>
            <div className="form-group">
              <label>Time *</label>
              <input type="time" value={form.time} onChange={(e) => updateField("time", e.target.value)} />
            </div>
          </div>
          <div className="form-group">
            <label>Location *</label>
            <input type="text" value={form.location} onChange={(e) => updateField("location", e.target.value)} placeholder="Venue name & address" />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea value={form.description} onChange={(e) => updateField("description", e.target.value)} placeholder="A short note to your guests…" />
          </div>
          <div className="form-group">
            <label>Dress Code <span style={{ color: "var(--text-dim)", fontSize: 11 }}>(optional)</span></label>
            <input type="text" value={form.dressCode} onChange={(e) => updateField("dressCode", e.target.value)} placeholder="e.g. Smart Casual" />
          </div>
          <div className="form-group">
            <label>RSVP Deadline <span style={{ color: "var(--text-dim)", fontSize: 11 }}>(optional)</span></label>
            <input type="date" value={form.rsvpDeadline} onChange={(e) => updateField("rsvpDeadline", e.target.value)} />
          </div>

          <button
            style={{ width: "100%", background: "var(--gold)", border: "none", color: "#000", padding: 15, borderRadius: 8, fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 700, cursor: "pointer", marginTop: 8 }}
            onClick={() => {
              localStorage.setItem("invitee_form", JSON.stringify(form));
              router.push(`/preview?template=${templateId}`);
            }}>
            Continue to Preview →
          </button>
        </div>

        <div style={{ padding: 32, background: "var(--surface)", overflowY: "auto", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--text-dim)", marginBottom: 20, fontWeight: 600 }}>Live Preview</div>
          <div key={previewKey} style={{ width: "100%", maxWidth: 280, aspectRatio: "3/4", borderRadius: 12, overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.5)", position: "relative" }}>
            <TemplateComp data={data} />
          </div>
          <div style={{ marginTop: 16, fontSize: 12, color: "var(--text-dim)", textAlign: "center" }}>
            {templateInfo.name} · {templateInfo.tag}
          </div>
        </div>
      </div>
    </>
  );
}

export default function CreatePage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--text)", fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        .inner-nav { display:flex; align-items:center; justify-content:space-between; padding:0 32px; height:64px; border-bottom:1px solid var(--border); background:var(--surface); position:sticky; top:0; z-index:10; }
        .back-btn { display:flex; align-items:center; gap:8px; color:var(--text-dim); cursor:pointer; font-size:14px; background:none; border:none; font-family:'DM Sans',sans-serif; transition:color 0.2s; }
        .back-btn:hover { color:var(--gold); }
      `}</style>
      <div className="inner-nav">
        <Link href="/templates" className="back-btn">← Back</Link>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, color: "var(--gold)" }}>Invitee</div>
        <div style={{ width: 60 }} />
      </div>
      <Suspense fallback={<div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "calc(100vh - 64px)", color: "var(--text-dim)" }}>Loading…</div>}>
        <CreateContent />
      </Suspense>
    </div>
  );
}
