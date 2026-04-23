"use client";
export const dynamic = 'force-dynamic';

import { useState, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ElegantFloral, BlackAndGold, NeonParty, BotanicalGarden, MinimalElegance, BalloonBash, WeddingClassic, StarryBaby, CorporatePrestige } from "@/components/templates";

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

function PreviewContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const templateId = searchParams.get("template") || "blackgold";

  const [formStr] = useState(() => localStorage.getItem("invitee_form") || JSON.stringify({
    title: "Olivia's Birthday Party", host: "Olivia Smith", date: "2025-05-24",
    time: "18:00", location: "123 Party Street, Los Angeles, CA 90001",
    description: "Join us for a night of fun!", dressCode: "Party Wear", rsvpDeadline: "2025-05-20",
  }));
  const form = JSON.parse(formStr);
  const previewRef = useRef<HTMLDivElement>(null);
  const [toast, setToast] = useState("");

  const data = {
    title: form.title, host: form.host,
    date: formatDate(form.date), time: formatTime(form.time),
    location: form.location, description: form.description, dressCode: form.dressCode,
  };

  const TemplateComp = TemplateComponents[templateId] || BlackAndGold;

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  }

  async function downloadImage() {
    showToast("Generating image…");
    const el = previewRef.current;
    if (!el) return;
    const { default: html2canvas } = await import("html2canvas");
    const canvas = await html2canvas(el, { scale: 2, backgroundColor: null });
    const link = document.createElement("a");
    link.download = `${form.title.replace(/\s+/g, "-").toLowerCase()}-invite.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
    showToast("Image downloaded!");
  }

  async function downloadPDF() {
    showToast("Generating PDF…");
    const el = previewRef.current;
    if (!el) return;
    const { default: html2canvas } = await import("html2canvas");
    const { default: jsPDF } = await import("jspdf");
    const canvas = await html2canvas(el, { scale: 2, backgroundColor: null });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pw = 210, ph = 297;
    const ratio = canvas.width / canvas.height;
    let w = pw, h = pw / ratio;
    if (h > ph) { h = ph; w = ph * ratio; }
    pdf.addImage(imgData, "PNG", (pw - w) / 2, (ph - h) / 2, w, h);
    pdf.save(`${form.title.replace(/\s+/g, "-").toLowerCase()}-invite.pdf`);
    showToast("PDF downloaded!");
  }

  function generateInvite() {
    const slug = Math.random().toString(36).substring(2, 10);
    localStorage.setItem("invitee_slug", slug);
    localStorage.setItem("invitee_generated", JSON.stringify({ ...form, templateId, slug }));
    router.push(`/invite/${slug}`);
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", flex: 1, minHeight: "calc(100vh - 64px)" }}>
      <div style={{ padding: 40, display: "flex", flexDirection: "column", alignItems: "center", borderRight: "1px solid var(--border)" }}>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 400, marginBottom: 8 }}>Preview</div>
        <div style={{ color: "var(--text-dim)", fontSize: 14, marginBottom: 32 }}>This is how your invite will look.</div>
        <div ref={previewRef} style={{ width: "100%", maxWidth: 300, aspectRatio: "3/4", borderRadius: 12, overflow: "hidden", boxShadow: "0 24px 80px rgba(0,0,0,0.6)", position: "relative" }}>
          <TemplateComp data={data} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 20, width: "100%", maxWidth: 300 }}>
          <button style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: 11, borderRadius: 7, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", background: "var(--surface2)", border: "1px solid var(--border)", color: "var(--text)" }} onClick={downloadImage}>⬇ Download Image</button>
          <button style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: 11, borderRadius: 7, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", background: "var(--gold)", border: "none", color: "#000" }} onClick={downloadPDF}>⬇ Download PDF</button>
        </div>
      </div>

      <div style={{ padding: 40, display: "flex", flexDirection: "column", gap: 24, overflowY: "auto" }}>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 400 }}>Ready to generate?</h2>
        <p style={{ color: "var(--text-dim)", fontSize: 14, lineHeight: 1.7 }}>Once generated, you can download your invite and share a link for guests to RSVP.</p>

        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>📋 Event Summary</h3>
          <div style={{ fontSize: 13, color: "var(--text-dim)", lineHeight: 2, marginTop: 12 }}>
            <div><strong style={{ color: "var(--text)" }}>Event:</strong> {form.title}</div>
            <div><strong style={{ color: "var(--text)" }}>Host:</strong> {form.host}</div>
            <div><strong style={{ color: "var(--text)" }}>Date:</strong> {formatDate(form.date)}</div>
            <div><strong style={{ color: "var(--text)" }}>Time:</strong> {formatTime(form.time)}</div>
            <div><strong style={{ color: "var(--text)" }}>Location:</strong> {form.location}</div>
            {form.dressCode && <div><strong style={{ color: "var(--text)" }}>Dress:</strong> {form.dressCode}</div>}
          </div>
        </div>

        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>✨ What you&apos;ll get</h3>
          <p style={{ fontSize: 13, color: "var(--text-dim)", lineHeight: 1.6 }}>A shareable invite link for guest RSVPs, plus image and PDF downloads of your beautiful invite.</p>
        </div>

        <button style={{ width: "100%", background: "transparent", border: "1px solid var(--border)", color: "var(--text)", padding: 12, borderRadius: 8, fontFamily: "'DM Sans', sans-serif", fontSize: 14, cursor: "pointer", textAlign: "center" }} onClick={() => router.push(`/create?template=${templateId}`)}>← Edit Details</button>
        <button style={{ width: "100%", background: "var(--gold)", border: "none", color: "#000", padding: 15, borderRadius: 8, fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 700, cursor: "pointer" }} onClick={generateInvite}>Generate Invite ✦</button>
      </div>

      {toast && (
        <div style={{ position: "fixed", bottom: 32, right: 32, background: "var(--surface)", border: "1px solid var(--border)", borderLeft: "3px solid var(--gold)", padding: "14px 20px", borderRadius: 8, fontSize: 13, zIndex: 1000, boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}>
          {toast}
        </div>
      )}
    </div>
  );
}

export default function PreviewPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--text)", fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        .inner-nav { display:flex; align-items:center; justify-content:space-between; padding:0 32px; height:64px; border-bottom:1px solid var(--border); background:var(--surface); position:sticky; top:0; z-index:10; }
        .back-btn { display:flex; align-items:center; gap:8px; color:var(--text-dim); cursor:pointer; font-size:14px; background:none; border:none; font-family:'DM Sans',sans-serif; transition:color 0.2s; }
        .back-btn:hover { color:var(--gold); }
      `}</style>
      <div className="inner-nav">
        <Link href="/create" className="back-btn">← Back</Link>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, color: "var(--gold)" }}>Invitee</div>
        <div style={{ width: 60 }} />
      </div>
      <Suspense fallback={<div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "calc(100vh - 64px)", color: "var(--text-dim)" }}>Loading…</div>}>
        <PreviewContent />
      </Suspense>
    </div>
  );
}
