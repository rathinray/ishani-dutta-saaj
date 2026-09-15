"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

const WA_NUMBER = "919999999999";
const images = [
  ["https://images.unsplash.com/photo-1600685890506-593fdf55949b?auto=format&fit=crop&w=1200&q=80", "The Red and White", "BRIDAL"],
  ["https://images.unsplash.com/photo-1756483560049-e7b2208f99a0?auto=format&fit=crop&w=1200&q=80", "Pujor Shajh", "FESTIVE"],
  ["https://images.unsplash.com/photo-1610047614301-13c63f00c032?auto=format&fit=crop&w=1200&q=80", "Studio Light", "EDITORIAL"],
  ["https://images.unsplash.com/photo-1631549424057-403e75d68e2f?auto=format&fit=crop&w=1200&q=80", "Quiet Portraits", "PORTRAIT"],
  ["https://images.unsplash.com/photo-1677691257001-8bfd91e288ff?auto=format&fit=crop&w=1200&q=80", "Sindoor Khela", "CELEBRATION"]
];

function whatsappUrl(message: string) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}

export default function Home() {
  const rail = useRef<HTMLDivElement>(null);
  const [activePhrase, setActivePhrase] = useState(0);
  const [form, setForm] = useState({ name: "", phone: "", lookingFor: "Bridal Makeup", date: "", city: "", details: "" });

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      document.documentElement.style.setProperty("--mx", `${event.clientX}px`);
      document.documentElement.style.setProperty("--my", `${event.clientY}px`);
    };
    const onScroll = () => {
      if (rail.current && window.innerWidth > 860) {
        const progress = Math.min(1, Math.max(0, (window.scrollY - rail.current.offsetTop + window.innerHeight) / (rail.current.scrollHeight + window.innerHeight)));
        rail.current.style.transform = `translateX(${-progress * Math.max(0, rail.current.scrollWidth - window.innerWidth)}px)`;
      }
      setActivePhrase(Math.min(2, Math.floor((window.scrollY / Math.max(1, document.body.scrollHeight)) * 8)));
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("scroll", onScroll, { passive: true });
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.target.classList.toggle("in-view", entry.isIntersecting));
    }, { threshold: 0.35 });
    document.querySelectorAll(".plan").forEach((plan) => observer.observe(plan));
    return () => { window.removeEventListener("mousemove", onMove); window.removeEventListener("scroll", onScroll); observer.disconnect(); };
  }, []);

  const submitEnquiry = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const message = `Hello Ishani, I would like to make an enquiry.\n\nName: ${form.name}\nPhone: ${form.phone}\nLooking for: ${form.lookingFor}\nPreferred date: ${form.date || "Not decided"}\nCity / venue: ${form.city || "Not decided"}\nAdditional details: ${form.details || "None"}`;
    window.open(whatsappUrl(message), "_blank", "noopener,noreferrer");
  };

  return <>
    <div className="cursor" aria-hidden="true" />
    <header><a className="brand" href="#">ISHANI DUTTA <span className="bn">সাজ</span></a><nav>{["about", "portfolio", "services", "academy", "contact"].map((item) => <a href={`#${item}`} key={item}>{item[0].toUpperCase() + item.slice(1)}</a>)}</nav></header>
    <main>
      <section className="hero"><div className="hero-copy"><div className="hero-eyebrow bn">সাজ শিল্পী — makeup artist, Kolkata</div><h1 className="hero-title">Beauty, <em>rooted</em><br />in heritage.</h1><p className="hero-sub">Bridal and festive makeup artistry drawing on Bengal&apos;s own visual language of red and white, gold and skin — built for the camera and for the twelve-hour wedding day alike.</p><a className="hero-cta" href="#portfolio">View the portfolio →</a></div><div className="hero-img"><img src="https://images.unsplash.com/photo-1610173827043-9db50e0d8ef9?auto=format&fit=crop&w=1200&q=80" alt="Bridal makeup with gold jewelry and henna" /></div></section>
      <section id="about"><div className="about-grid"><div className="about-img"><img src="https://images.unsplash.com/photo-1610047614256-023d7c028d0b?auto=format&fit=crop&w=900&q=80" alt="Ishani Dutta at work" /></div><div className="about-copy"><div className="section-eyebrow">ABOUT</div><p className="section-lede">Trained in Kolkata and Mumbai, Ishani has spent fifteen years learning that a Bengali face asks for its own rules.</p><p>She started at nineteen, assisting on wedding mornings before dawn, and built her practice around the specific demands of Bengali ceremonies — heat, long hours, and the deep red of sindoor and Benarasi silk. Today she splits her time between bridal bookings and training the next generation of artists at her small academy.</p><div className="about-stats"><div><b>15+</b><span>years in practice</span></div><div><b>400+</b><span>weddings styled</span></div><div><b>120+</b><span>students trained</span></div></div></div></div></section>
      <section id="portfolio" className="portfolio-intro"><div className="section-eyebrow">SELECTED WORK</div><p className="section-lede">Five bodies of work, chosen for what they taught me about a face rather than how they photographed.</p></section>
      <div className="rail-wrap"><div className="rail-num">01 / 05</div><div className="rail" ref={rail}>{images.map(([src, title, category], i) => <div className={`frame ${i % 3 === 0 ? "tall" : i === 2 || i === 4 ? "wide" : ""}`} key={title}><img src={src} alt={title} /><div className="cap"><div className="ttl">{title}</div><div className="cat">{category}</div></div></div>)}</div></div>
      <section id="services"><div className="section-head"><div className="section-eyebrow">SERVICES</div><p className="section-lede">Booked individually or as part of a full wedding season.</p></div><div className="services-grid">{[["Bridal Makeup", "Full bridal look built for a Bengali wedding's specific rituals and hours — from ashirwad to bidaai, tested to last."], ["Festive & Party", "Pujo mornings, sangeet nights, and everything between — looks matched to the event, not a fixed template."], ["Editorial & Shoot", "Makeup built for the camera — magazine, campaign, or a personal shoot — with attention to lighting and lens."], ["Draping & Styling", "Saree draping and jewellery styling, offered alongside makeup for a complete, considered look."]].map(([title, text], i) => <div className="service" key={title}><div className="svc-n">0{i + 1}</div><h3>{title}</h3><p>{text}</p></div>)}</div></section>
      <div className="type-wrap"><div className="type-count">0{activePhrase + 1} / 03</div>{["Every face carries a story before the makeup even begins.", "Fifteen wedding seasons taught me restraint, not more product.", "Craft is a language. And a language can be taught."].map((text, i) => <div className={`type-phrase ${activePhrase === i ? "is-active" : ""}`} key={text}><p>{text}</p></div>)}<div className="type-track"><div className="type-fill" style={{ width: `${((activePhrase + 1) / 3) * 100}%` }} /></div></div>
      <section id="academy"><div className="section-head"><div className="section-eyebrow bn">বিদ্যালয় — the academy</div><p className="section-lede">A small academy for artists who want to work weddings and editorials, not just birthdays.</p></div><div className="flagship"><div><div className="badge">FLAGSHIP PROGRAM</div><h3>The Signature 7-Day Makeup Course</h3><p>Our most requested course — seven days, one face at a time, covering everything from skin prep to a finished bridal look.</p></div></div><div className="plans">{[["Essentials", "7 DAYS · MORNING BATCH"], ["Advanced", "7 DAYS · FULL DAY"], ["Pro Mentorship", "7 DAYS + 4 WEEKS MENTORSHIP"]].map(([name, duration], i) => <article className={`plan ${i === 1 ? "featured" : ""}`} key={name}>{i === 1 && <div className="plan-badge">MOST CHOSEN</div>}<div className="plan-name">{name}</div><div className="plan-duration">{duration}</div><ul>{["Skin prep and long-wear base", "One bridal look, start to finish", "Product and tool guidance", "Certificate of participation"].map((item) => <li key={item}>{item}</li>)}</ul></article>)}</div><p className="academy-note">Cohorts are small and by application, held twice a year in Kolkata. Full curriculum and dates shared on request.</p></section>
      <section className="enquiry"><div><div className="section-eyebrow">QUICK ENQUIRY</div><p className="section-lede">Tell me what you&apos;re planning. I&apos;ll reply on WhatsApp.</p></div><form onSubmit={submitEnquiry}><input required placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /><input required type="tel" placeholder="Phone / WhatsApp number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /><select value={form.lookingFor} onChange={(e) => setForm({ ...form, lookingFor: e.target.value })}><option>Bridal Makeup</option><option>Festive & Party</option><option>Editorial & Shoot</option><option>Draping & Styling</option><option>Academy Course</option></select><input type="text" placeholder="Preferred date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} /><input type="text" placeholder="City / venue" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} /><textarea placeholder="Tell me anything important about your enquiry" rows={4} value={form.details} onChange={(e) => setForm({ ...form, details: e.target.value })} /><button type="submit">Send enquiry on WhatsApp →</button></form></section>
    </main>
    <footer id="contact"><div className="foot-title">Let&apos;s talk<br /><span className="bn">সাজ</span> for your day.</div><div className="foot-links"><a href="mailto:studio@ishanidutta.com">studio@ishanidutta.com</a><a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a></div><div className="foot-meta"><span>© 2026 Ishani Dutta</span><span>Kolkata · India</span></div></footer>
    <a className="whatsapp" href={whatsappUrl("Hello Ishani, I would like to make an enquiry.")} target="_blank" rel="noreferrer" aria-label="Chat with Ishani on WhatsApp"><span>☏</span><b>WhatsApp</b></a>
  </>;
}
