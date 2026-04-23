"use client";
export const dynamic = 'force-dynamic';

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
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

export default function InvitePage() {
  const params = useParams();
  const slug = params.slug as string;
  const [inviteData, setInviteData] = useState<any>(null);
  const [rsvpStatus, setRsvpStatus] = useState<"pending" | "attending" | "not_attending" | null>(null);
  const [form, setForm] = useState({ name: "", email: "", guests: "1", message: "" });
  const [toast, setToast] = useState("");

  useEffect(() => {
    // In production, fetch from Supabase. For demo, use localStorage.
    const generated = localStorage.getItem("invitee_generated");
    if (generated) {
      setInviteData(JSON.parse(generated));
    } else {
      setInviteData({
        title: "Olivia's Birthday Party", host: "Olivia Smith",
        date: "2025-05-24", time: "18:00",
        location: "123 Party Street, Los Angeles, CA 90001",
        templateId: "blackgold",
      });
    }
  }, [slug]);

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  }

  async function submitRsvp(status: "attending" | "not_attending") {
    if (!form.name.trim() || !form.email.trim()) {
      showToast("Please enter your name and email.");
      return;
    }
    // In production: POST /api/rsvps
    setRsvpStatus(status);
    showToast(status === "attending" ? "🎉 RSVP confirmed! See you there!" : "RSVP noted. Thanks for letting us know!");
  }

  if (!inviteData) {
    return (
      <div style={{ minHeight: "100vh", background: "var(--bg)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans', sans-serif" }}>
        <div style={{ color: "var(--text-dim)" }}>Loading invite…</div>
      </div>
    );
  }

  const data = {
    title: inviteData.title,
    date: formatDate(inviteData.date),
    time: formatTime(inviteData.time),
    location: inviteData.location,
    dressCode: inviteData.dressCode,
  };

  const TemplateComp = TemplateComponents[inviteData.templateId] || BlackAndGold;

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--text)", fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        .inner-nav { display:flex; align-items:center; justify-content:space-between; padding:0 32px; height:64px; border-bottom:1px solid var(--border); background:var(--surface); }
        .rsvp-btn { padding:14px; border-radius:8px; font-family:'DM Sans',sans-serif; font-size:14px; font-weight:600; cursor:pointer; transition:all 0.2s; border:none; width:100%; }
        .rsvp-yes { background:var(--green); color:#fff; }
        .rsvp-yes:hover { opacity:0.9; transform:translateY(-1px); }
        .rsvp-no { background:var(--surface2); border:1px solid var(--border); color:var(--text-dim); }
        .rsvp-no:hover { border-color:var(--red); color:var(--red); }
      `}</style>

      <div className="inner-nav">
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, color: "var(--gold)" }}>Invitee</div>
        <div style={{ fontSize: 13, color: "var(--text-dim)" }}>RSVP Page</div>
        <div style={{ width: 60 }} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", flex: 1, minHeight: "calc(100vh - 64px)" }}>
        {/* Left: invite preview */}
        <div style={{ padding: 60, background: "var(--surface)", borderRight: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: "100%", maxWidth: 280, aspectRatio: "3/4", borderRadius: 12, overflow: "hidden", boxShadow: "0 24px 80px rgba(0,0,0,0.5)" }}>
            <TemplateComp data={data} />
          </div>
        </div>

        {/* Right: RSVP form */}
        <div style={{ padding: "60px 48px", overflowY: "auto" }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, fontWeight: 400, marginBottom: 8 }}>{inviteData.title}</h2>
          <p style={{ color: "var(--text-dim)", fontSize: 14, marginBottom: 32 }}>Please fill in your details to RSVP for this event.</p>

          {rsvpStatus ? (
            <div style={{ background: "rgba(76,175,125,0.1)", border: "1px solid rgba(76,175,125,0.3)", borderRadius: 12, padding: 24, textAlign: "center" }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>{rsvpStatus === "attending" ? "🎉" : "👍"}</div>
              <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>{rsvpStatus === "attending" ? "You're in!" : "RSVP Submitted"}</div>
              <div style={{ color: "var(--text-dim)", fontSize: 14 }}>
                {rsvpStatus === "attending" ? "We can't wait to see you there!" : "Thanks for letting us know."}
              </div>
            </div>
          ) : (
            <>
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: "block", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-dim)", marginBottom: 8, fontWeight: 600 }}>Full Name *</label>
                <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your full name"
                  style={{ width: "100%", background: "var(--surface2)", border: "1px solid var(--border)", color: "var(--text)", padding: "12px 14px", borderRadius: 8, fontFamily: "'DM Sans', sans-serif", fontSize: 14, outline: "none" }} />
              </div>
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: "block", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-dim)", marginBottom: 8, fontWeight: 600 }}>Email Address *</label>
                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="your@email.com"
                  style={{ width: "100%", background: "var(--surface2)", border: "1px solid var(--border)", color: "var(--text)", padding: "12px 14px", borderRadius: 8, fontFamily: "'DM Sans', sans-serif", fontSize: 14, outline: "none" }} />
              </div>
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: "block", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-dim)", marginBottom: 8, fontWeight: 600 }}>Number of Guests</label>
                <select value={form.guests} onChange={(e) => setForm({ ...form, guests: e.target.value })} style={{ width: "100%", background: "var(--surface2)", border: "1px solid var(--border)", color: "var(--text)", padding: "12px 14px", borderRadius: 8, fontFamily: "'DM Sans', sans-serif", fontSize: 14, outline: "none", appearance: "none" }}>
                  {["1", "2", "3", "4+"].map((g) => <option key={g} value={g}>{g}</option>)}
                </select>
              </div>
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: "block", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-dim)", marginBottom: 8, fontWeight: 600 }}>Message <span style={{ fontSize: 11 }}>(optional)</span></label>
                <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Leave a message for the host…"
                  style={{ width: "100%", background: "var(--surface2)", border: "1px solid var(--border)", color: "var(--text)", padding: "12px 14px", borderRadius: 8, fontFamily: "'DM Sans', sans-serif", fontSize: 14, outline: "none", minHeight: 60, resize: "vertical" }} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <button className="rsvp-btn rsvp-yes" onClick={() => submitRsvp("attending")}>✓ Yes, I&apos;ll be there!</button>
                <button className="rsvp-btn rsvp-no" onClick={() => submitRsvp("not_attending")}>✗ Sorry, can&apos;t make it</button>
              </div>
            </>
          )}
        </div>
      </div>

      {toast && (
        <div style={{ position: "fixed", bottom: 32, right: 32, background: "var(--surface)", border: "1px solid var(--border)", borderLeft: "3px solid var(--gold)", padding: "14px 20px", borderRadius: 8, fontSize: 13, zIndex: 1000, boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}>
          {toast}
        </div>
      )}
    </div>
  );
}
