"use client";
export const dynamic = 'force-dynamic';

import { useState, useEffect } from "react";
import Link from "next/link";
import { ElegantFloral, BlackAndGold, NeonParty, BotanicalGarden, MinimalElegance, BalloonBash, WeddingClassic, StarryBaby, CorporatePrestige } from "@/components/templates";

function formatDate(d: string) {
  if (!d) return "";
  const dt = new Date(d + "T12:00:00");
  return dt.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

const TemplateComponents: Record<string, React.FC<{ data: any }>> = {
  elegant: ElegantFloral, blackgold: BlackAndGold, neon: NeonParty,
  botanical: BotanicalGarden, minimal: MinimalElegance, balloon: BalloonBash,
  wedding: WeddingClassic, baby: StarryBaby, corporate: CorporatePrestige,
};

const initialRsvps = [
  { name: "Emma Johnson", status: "attending", guests: 1 },
  { name: "Liam Williams", status: "attending", guests: 2 },
  { name: "Sophia Brown", status: "not_attending", guests: 1 },
  { name: "Noah Davis", status: "pending", guests: 2 },
  { name: "Ava Martinez", status: "attending", guests: 1 },
];

const avatarColors = ["#E8C97A", "#7EC8E3", "#C8E6B0", "#FFB4B4", "#D4B0FF"];

export default function DashboardPage() {
  const [inviteData, setInviteData] = useState<any>(null);

  useEffect(() => {
    const generated = localStorage.getItem("invitee_generated");
    if (generated) {
      setInviteData(JSON.parse(generated));
    } else {
      setInviteData({
        title: "Olivia's Birthday Party",
        host: "Olivia Smith",
        date: "2025-05-24",
        time: "18:00",
        location: "123 Party Street, Los Angeles, CA 90001",
        templateId: "blackgold",
      });
    }
  }, []);

  const stats = {
    total: 128,
    attending: 76,
    notAttending: 12,
    pending: 40,
  };

  const slug = typeof window !== "undefined" ? localStorage.getItem("invitee_slug") || "abc123" : "abc123";

  const data = inviteData ? {
    title: inviteData.title,
    date: formatDate(inviteData.date),
    time: inviteData.time,
    location: inviteData.location,
    dressCode: inviteData.dressCode,
  } : { title: "", date: "", time: "", location: "", dressCode: "" };

  const TemplateComp = inviteData ? (TemplateComponents[inviteData.templateId] || BlackAndGold) : BlackAndGold;

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--text)", fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        .sidebar-item { display:flex; align-items:center; gap:12px; padding:12px 24px; font-size:14px; cursor:pointer; transition:all 0.2s; color:var(--text-dim); }
        .sidebar-item:hover, .sidebar-item.active { color:var(--text); background:rgba(201,168,76,0.07); border-right:2px solid var(--gold); }
        .csv-btn { background:var(--surface2); border:1px solid var(--border); color:var(--text-dim); padding:8px 14px; border-radius:6px; font-size:12px; font-weight:600; cursor:pointer; font-family:'DM Sans',sans-serif; }
        .csv-btn:hover { border-color:var(--gold); color:var(--gold); }
        .status-badge { padding:4px 10px; border-radius:100px; font-size:11px; font-weight:600; }
        .status-attending { background:rgba(76,175,125,0.15); color:var(--green); }
        .status-not { background:rgba(224,92,92,0.15); color:var(--red); }
        .status-pending { background:rgba(201,168,76,0.15); color:var(--gold); }
      `}</style>

      {/* Nav */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 32px", height: 64, borderBottom: "1px solid var(--border)", background: "var(--surface)" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--text-dim)", fontSize: 14, background: "none", border: "none", fontFamily: "'DM Sans', sans-serif", textDecoration: "none" }}>← Home</Link>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, color: "var(--gold)" }}>Invitee</div>
        <button style={{ background: "var(--gold)", border: "none", color: "#000", padding: "10px 22px", borderRadius: 6, fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, cursor: "pointer" }} onClick={() => window.location.href = "/templates"}>+ New Invite</button>
      </div>

      {/* Body */}
      <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", flex: 1, minHeight: "calc(100vh - 64px)" }}>
        {/* Sidebar */}
        <div style={{ background: "var(--surface)", borderRight: "1px solid var(--border)", padding: "24px 0", position: "relative" }}>
          <div style={{ padding: "16px 24px 24px", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-dim)", fontWeight: 600 }}>Menu</div>
          {[{ icon: "📊", label: "Dashboard", active: true }, { icon: "💌", label: "My Invites", active: false }, { icon: "✅", label: "RSVPs", active: false }, { icon: "⚙️", label: "Settings", active: false }].map((item) => (
            <div key={item.label} className={`sidebar-item ${item.active ? "active" : ""}`}>
              <span>{item.icon}</span>{item.label}
            </div>
          ))}
          <div style={{ position: "absolute", bottom: 24, left: 16, right: 16 }}>
            <div style={{ background: "rgba(201,168,76,0.08)", border: "1px solid var(--border)", borderRadius: 10, padding: 16, fontSize: 12, color: "var(--text-dim)" }}>
              <div style={{ color: "var(--gold)", fontWeight: 600, marginBottom: 6 }}>✦ Pro Plan</div>
              Unlimited invites & RSVPs
            </div>
          </div>
        </div>

        {/* Main content */}
        <div style={{ padding: 32, overflowY: "auto" }}>
          <div style={{ marginBottom: 28 }}>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 400 }}>{inviteData?.title || "My Invite"}</h2>
            <p style={{ color: "var(--text-dim)", fontSize: 14, marginTop: 4 }}>
              {inviteData ? `${formatDate(inviteData.date)} · ${inviteData.time} · ${inviteData.location}` : "No invite created yet"}
            </p>
          </div>

          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 32 }}>
            {[
              { label: "Total Invites", value: stats.total, sub: "Sent" },
              { label: "Attending", value: stats.attending, sub: "Confirmed", color: "var(--green)" },
              { label: "Not Attending", value: stats.notAttending, sub: "Declined", color: "var(--red)" },
              { label: "Pending", value: stats.pending, sub: "Awaiting response", color: "var(--gold-dim)" },
            ].map((s) => (
              <div key={s.label} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: "20px 24px" }}>
                <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-dim)", fontWeight: 600, marginBottom: 8 }}>{s.label}</div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 36, fontWeight: 400, color: s.color || "var(--gold)" }}>{s.value}</div>
                <div style={{ fontSize: 12, color: "var(--text-dim)", marginTop: 4 }}>{s.sub}</div>
              </div>
            ))}
          </div>

          {/* Bottom grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 20 }}>
            {/* RSVP Table */}
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden" }}>
              <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <h3 style={{ fontSize: 16, fontWeight: 600 }}>RSVP List</h3>
                <button className="csv-btn">⬇ Download CSV</button>
              </div>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    {["Guest", "Status", "Guests"].map((h) => (
                      <th key={h} style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-dim)", fontWeight: 600, padding: "12px 24px", textAlign: "left", borderBottom: "1px solid var(--border)" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {initialRsvps.map((r, i) => (
                    <tr key={i}>
                      <td style={{ padding: "14px 24px", fontSize: 14, borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                        <span style={{ width: 32, height: 32, borderRadius: "50%", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 600, marginRight: 10, background: `${avatarColors[i % 5]}20`, color: avatarColors[i % 5] }}>{r.name.charAt(0)}</span>
                        {r.name}
                      </td>
                      <td style={{ padding: "14px 24px" }}>
                        <span className={`status-badge status-${r.status === "not_attending" ? "not" : r.status}`}>
                          {r.status === "attending" ? "Attending" : r.status === "not_attending" ? "Not Attending" : "Pending"}
                        </span>
                      </td>
                      <td style={{ padding: "14px 24px", fontSize: 14 }}>{r.guests}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: 24 }}>
                <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <div style={{ width: 64, height: 80, borderRadius: 6, overflow: "hidden", flexShrink: 0 }}>
                    <div style={{ width: "100%", height: "100%", transform: "scale(0.4)", transformOrigin: "top left" }}>
                      {inviteData && <TemplateComp data={data} />}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>{inviteData?.title}</div>
                    <div style={{ fontSize: 12, color: "var(--text-dim)" }}>{inviteData ? `${formatDate(inviteData.date)} · ${inviteData.time}` : ""}</div>
                    <div style={{ fontSize: 12, color: "var(--text-dim)" }}>{inviteData?.location}</div>
                  </div>
                </div>
                <button style={{ width: "100%", marginTop: 12, background: "var(--gold)", border: "none", color: "#000", padding: "9px", borderRadius: 6, fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, cursor: "pointer" }}
                  onClick={() => window.location.href = `/invite/${slug}`}>
                  View Invite →
                </button>
              </div>

              <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: 24 }}>
                <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>Share Link</h3>
                <div style={{ display: "flex", alignItems: "center", background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: 8, overflow: "hidden", marginTop: 10 }}>
                  <div style={{ flex: 1, padding: "12px 14px", fontSize: 13, color: "var(--text-dim)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {typeof window !== "undefined" ? `${window.location.origin}/invite/${slug}` : `/invite/${slug}`}
                  </div>
                  <button style={{ background: "var(--gold)", border: "none", color: "#000", padding: "12px 18px", fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, cursor: "pointer", flexShrink: 0 }}
                    onClick={() => navigator.clipboard?.writeText(`${window.location.origin}/invite/${slug}`)}>
                    Copy
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
