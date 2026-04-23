"use client";

import { useRouter } from "next/navigation";

export default function Landing() {
  const router = useRouter();

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "var(--bg)",
        color: "var(--text)",
        fontFamily: "'DM Sans', sans-serif",
        overflowX: "hidden",
      }}
    >
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(0.8)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        .cat-pill:hover { border-color:var(--gold); background:rgba(201,168,76,0.05); transform:translateY(-2px); }
        nav { position:fixed; top:0; left:0; right:0; z-index:100; display:flex; align-items:center; justify-content:space-between; padding:0 48px; height:72px; background:rgba(10,10,10,0.9); backdrop-filter:blur(20px); border-bottom:1px solid var(--border); }
        .nav-logo { font-family:'Cormorant Garamond',serif; font-size:26px; font-weight:600; color:var(--gold); letter-spacing:0.02em; cursor:pointer; }
        .nav-links { display:flex; gap:36px; }
        .nav-links a { color:var(--text-dim); text-decoration:none; font-size:14px; font-weight:500; transition:color 0.2s; cursor:pointer; }
        .nav-links a:hover { color:var(--text); }
        .nav-actions { display:flex; gap:12px; align-items:center; }
        .hero { flex:1; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; padding:120px 24px 80px; position:relative; overflow:hidden; }
        .hero::before { content:''; position:absolute; inset:0; background:radial-gradient(ellipse 80% 60% at 50% 0%, rgba(201,168,76,0.08) 0%, transparent 70%), var(--bg); }
        .hero-badge { display:inline-flex; align-items:center; gap:8px; background:rgba(201,168,76,0.1); border:1px solid rgba(201,168,76,0.3); color:var(--gold); padding:6px 16px; border-radius:100px; font-size:13px; font-weight:500; margin-bottom:32px; animation:fadeUp 0.6s ease both; }
        .hero-badge .dot { width:6px; height:6px; background:var(--gold); border-radius:50%; animation:pulse 2s infinite; }
        .display { font-family:'Cormorant Garamond',serif; font-size:clamp(52px,7vw,96px); font-weight:300; line-height:1.05; letter-spacing:-0.02em; margin-bottom:24px; animation:fadeUp 0.6s 0.1s ease both; }
        .display em { font-style:italic; color:var(--gold); }
        .display span { display:block; }
        .hero-sub { font-size:18px; color:var(--text-dim); font-weight:300; max-width:480px; line-height:1.7; margin-bottom:48px; animation:fadeUp 0.6s 0.2s ease both; }
        .hero-actions { display:flex; gap:16px; animation:fadeUp 0.6s 0.3s ease both; flex-wrap:wrap; justify-content:center; }
        .btn-lg { padding:16px 36px; border-radius:8px; font-size:16px; font-weight:600; }
        .floating-cards { position:relative; width:100%; max-width:900px; height:260px; margin:60px auto 0; animation:fadeUp 0.6s 0.4s ease both; }
        .float-card { position:absolute; border-radius:12px; overflow:hidden; box-shadow:0 20px 60px rgba(0,0,0,0.6),0 0 0 1px rgba(255,255,255,0.05); transition:transform 0.3s ease; }
        .categories { display:flex; gap:12px; justify-content:center; flex-wrap:wrap; margin-top:48px; padding:0 24px; animation:fadeUp 0.6s 0.5s ease both; }
        .cat-pill { display:flex; flex-direction:column; align-items:center; gap:8px; background:var(--surface); border:1px solid var(--border); border-radius:12px; padding:20px 28px; cursor:pointer; transition:all 0.2s; min-width:90px; }
        .cat-pill .icon { font-size:24px; }
        .cat-pill .label { font-size:12px; color:var(--text-dim); font-weight:500; }
        .how-section { padding:80px 48px; background:var(--surface); }
        .section-label { font-size:12px; text-transform:uppercase; letter-spacing:0.15em; color:var(--gold); font-weight:600; margin-bottom:16px; }
        .section-title { font-family:'Cormorant Garamond',serif; font-size:42px; font-weight:400; margin-bottom:48px; }
        .steps { display:grid; grid-template-columns:repeat(3,1fr); gap:32px; max-width:900px; margin:0 auto; }
        .step { display:flex; flex-direction:column; gap:16px; }
        .step-num { width:40px; height:40px; border-radius:50%; border:1px solid var(--gold); display:flex; align-items:center; justify-content:center; font-family:'Cormorant Garamond',serif; font-size:18px; color:var(--gold); }
        .step h3 { font-size:16px; font-weight:600; }
        .step p { font-size:14px; color:var(--text-dim); line-height:1.7; }
        .features-list { display:flex; flex-direction:column; gap:8px; margin-top:48px; padding:0 48px 80px; }
        .feat { display:flex; align-items:center; gap:12px; font-size:14px; color:var(--text-dim); }
        .feat::before { content:'✦'; color:var(--gold); font-size:10px; }
      `}</style>

      {/* NAV */}
      <nav>
        <div className="nav-logo" onClick={() => router.push("/")}>Invitee</div>
        <div className="nav-links">
          <a onClick={() => router.push("/templates")}>Templates</a>
          <a href="#">How it Works</a>
          <a href="#">Pricing</a>
        </div>
        <div className="nav-actions">
          <button className="btn btn-ghost" onClick={() => router.push("/dashboard")}>Dashboard</button>
          <button className="btn btn-primary" onClick={() => router.push("/templates")}>Get Started</button>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-badge">
          <span className="dot" />
          Beautiful invites in seconds
        </div>
        <h1 className="display">
          <span>Create Stunning</span>
          <em>Invites</em>
          <span>in Seconds</span>
        </h1>
        <p className="hero-sub">
          Pick a template, add your details and share. Beautiful invites. Zero design skills required.
        </p>
        <div className="hero-actions">
          <button className="btn btn-primary btn-lg" onClick={() => router.push("/templates")}>
            Create My Invite
          </button>
          <button className="btn btn-outline btn-lg" onClick={() => router.push("/templates")}>
            View Templates
          </button>
        </div>

        {/* Floating preview cards */}
        <div className="floating-cards">
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 20,
              width: 160,
              height: 220,
              transform: "rotate(-6deg)",
            }}
          >
            <div style={{ width: 160, height: 220, borderRadius: 12, overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.6)" }}>
              <div style={{ width: "100%", height: "100%", background: "linear-gradient(160deg,#1a1208 0%,#0d0a04 50%,#1c1609 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 20, position: "relative" }}>
                <div style={{ position: "absolute", top: 0, fontSize: 28 }}>🌸✨🌸</div>
                <div style={{ position: "relative", textAlign: "center" }}>
                  <div style={{ fontSize: 7, textTransform: "uppercase", letterSpacing: "0.2em", color: "rgba(201,168,76,0.7)", marginBottom: 8 }}>YOU&apos;RE INVITED TO</div>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontWeight: 600, color: "#E8C97A", lineHeight: 1.2, marginBottom: 10 }}>Birthday<br />Party</div>
                  <div style={{ width: 40, height: 1, background: "linear-gradient(90deg,transparent,#C9A84C,transparent)", margin: "0 auto 8px" }} />
                  <div style={{ fontSize: 8, color: "rgba(240,237,232,0.75)", lineHeight: 1.6 }}>24 May 2025<br />6:00 PM<br /><br />123 Party Street</div>
                </div>
                <div style={{ position: "absolute", bottom: 0, fontSize: 22 }}>🌿🌸🌿</div>
              </div>
            </div>
          </div>

          <div
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%) rotate(2deg)",
              top: 0,
              width: 180,
              height: 240,
            }}
          >
            <div style={{ width: 180, height: 240, borderRadius: 12, overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.6)", border: "1px solid rgba(201,168,76,0.3)" }}>
              <div style={{ width: "100%", height: "100%", background: "#050505", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 20, position: "relative" }}>
                <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(45deg,rgba(201,168,76,0.03) 0,rgba(201,168,76,0.03) 1px,transparent 1px,transparent 50%)", backgroundSize: "20px 20px" }} />
                <div style={{ position: "absolute", top: 16, left: 16, right: 16, bottom: 16, border: "1px solid rgba(201,168,76,0.15)" }} />
                <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
                  <div style={{ fontSize: 6, textTransform: "uppercase", letterSpacing: "0.25em", color: "rgba(201,168,76,0.6)", marginBottom: 10 }}>YOU ARE CORDIALLY INVITED</div>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 600, color: "#C9A84C", lineHeight: 1.2, marginBottom: 10 }}>Olivia&apos;s<br />Birthday</div>
                  <div style={{ width: 40, height: 1, background: "#C9A84C", margin: "0 auto 10px" }} />
                  <div style={{ fontSize: 8, color: "rgba(240,237,232,0.65)", lineHeight: 1.8 }}>24 May 2025<br />6:00 PM<br /><br />123 Party Street</div>
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              position: "absolute",
              right: 0,
              top: 20,
              width: 160,
              height: 220,
              transform: "rotate(5deg)",
            }}
          >
            <div style={{ width: 160, height: 220, borderRadius: 12, overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.6)" }}>
              <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg,#0d0020 0%,#1a0035 50%,#000d20 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 20, position: "relative" }}>
                <div style={{ position: "absolute", top: "-20%", left: "-10%", width: "60%", height: "60%", borderRadius: "50%", background: "radial-gradient(circle,rgba(255,0,200,0.15) 0%,transparent 70%)" }} />
                <div style={{ position: "absolute", bottom: "-20%", right: "-10%", width: "50%", height: "50%", borderRadius: "50%", background: "radial-gradient(circle,rgba(0,200,255,0.15) 0%,transparent 70%)" }} />
                <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 700, textTransform: "uppercase", color: "#fff", textShadow: "0 0 15px rgba(255,0,200,0.8)", lineHeight: 1.1 }}>NEON<br />PARTY</div>
                  <div style={{ width: 60, height: 2, background: "linear-gradient(90deg,#ff00c8,#00c8ff)", margin: "10px auto" }} />
                  <div style={{ fontSize: 7, textTransform: "uppercase", letterSpacing: "0.25em", color: "rgba(0,200,255,0.9)", textShadow: "0 0 8px rgba(0,200,255,0.6)", margin: "8px 0" }}>YOU&apos;RE INVITED</div>
                  <div style={{ fontSize: 8, color: "rgba(255,255,255,0.75)", lineHeight: 1.6 }}>24 May 2025<br />6:00 PM<br />123 Party Street</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <div className="categories">
        {[
          { icon: "🎂", label: "Birthday", filter: "Birthday" },
          { icon: "💍", label: "Wedding", filter: "Wedding" },
          { icon: "🎉", label: "Party", filter: "Party" },
          { icon: "👶", label: "Baby Shower", filter: "Baby Shower" },
          { icon: "🏢", label: "Corporate", filter: "Corporate" },
          { icon: "✨", label: "Other", filter: "All" },
        ].map((cat) => (
          <div
            key={cat.label}
            className="cat-pill"
            onClick={() => router.push(`/templates?filter=${cat.filter}`)}
          >
            <div className="icon">{cat.icon}</div>
            <div className="label">{cat.label}</div>
          </div>
        ))}
      </div>

      {/* How it works */}
      <section className="how-section" style={{ marginTop: 60 }}>
        <div style={{ textAlign: "center", maxWidth: 600, margin: "0 auto" }}>
          <div className="section-label">How it Works</div>
          <div className="section-title" style={{ marginBottom: 48 }}>
            Three steps to a perfect invite
          </div>
        </div>
        <div className="steps">
          <div className="step">
            <div className="step-num">1</div>
            <h3>Choose Template</h3>
            <p>Browse our curated collection of stunning invite designs across every occasion.</p>
          </div>
          <div className="step">
            <div className="step-num">2</div>
            <h3>Add Details</h3>
            <p>Enter your event details in a few simple steps. See a live preview as you type.</p>
          </div>
          <div className="step">
            <div className="step-num">3</div>
            <h3>Share &amp; Collect RSVPs</h3>
            <p>Get your invite link and start collecting RSVPs. Download as image or PDF too.</p>
          </div>
        </div>
      </section>

      <div className="features-list">
        {[
          "Beautiful, high-quality templates for every occasion",
          "Super fast invite generation — ready in seconds",
          "Shareable link for RSVPs with real-time tracking",
          "Guest RSVP with real-time tracking dashboard",
          "Download as Image or PDF instantly",
        ].map((f) => (
          <div key={f} className="feat">{f}</div>
        ))}
      </div>

      <div
        style={{
          textAlign: "center",
          padding: "48px",
          color: "var(--text-dim)",
          fontSize: 13,
          borderTop: "1px solid var(--border)",
          marginTop: "auto",
        }}
      >
        © 2025 Invitee · Create beautiful invites for every occasion
      </div>
    </main>
  );
}
