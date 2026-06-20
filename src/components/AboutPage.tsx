import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Globe, Shield, Heart, Lightbulb, Zap, Award,
  Users, BookOpen, Star, TrendingUp, ArrowRight, Play,
} from "lucide-react";

const C = {
  bg: "#0A0A0F",
  card: "rgba(255,255,255,0.03)",
  primary: "#6C63FF",
  secondary: "#00D4FF",
  accent: "#7C3AED",
  text: "#FFFFFF",
  muted: "#A1A1AA",
};
const gradPrimary = "linear-gradient(135deg, #6C63FF, #7C3AED)";
const easeInOut = [0.16, 1, 0.3, 1] as const;

const aboutMission = {
  tagline: "Global Community · Launched 2024",
  title: "About Dark Code",
  subtitle: "We're on a mission to democratize coding education worldwide and empower learners of all backgrounds to build the future with technology and programming skills.",
  body: "At Dark Code, we believe that coding is the essential literacy of the 21st century. Our mission is to democratize coding education and empower individuals from all backgrounds, regardless of location or financial situation, to master programming and build their careers in technology. Founded in 2024 by a passionate team of developers and educators, Dark Code has quickly grown from a startup vision into a global platform serving students across the United States and worldwide — from complete beginners to professional developers.",
};

const coreValues = [
  { icon: Shield, title: "Quality Education", desc: "We deliver the highest standard of coding education with industry-relevant curriculum and real-world projects.", color: "#6C63FF" },
  { icon: Heart, title: "Community First", desc: "Learning is most effective together. We foster collaboration, peer support, and an inclusive community where everyone can succeed.", color: "#FF6584" },
  { icon: Lightbulb, title: "Innovation", desc: "We continuously innovate our teaching methods and tools to provide the most effective and engaging learning experience.", color: "#F59E0B" },
  { icon: Globe, title: "Accessibility", desc: "Quality coding education for everyone. We remove barriers through free courses, flexible learning, and global support.", color: "#00D4FF" },
  { icon: Zap, title: "Practical Skills", desc: "We teach job-ready programming skills you can immediately apply in real-world projects, interviews, and professional growth.", color: "#10B981" },
  { icon: Award, title: "Lifelong Learning", desc: "We support your entire programming journey — from your first 'Hello World' to advanced professional-level expertise.", color: "#7C3AED" },
];

const teamMembers = [
  { name: "Md Santo Sarkar", role: "Founder & CEO", bio: "Full-stack software engineer with 4+ years building scalable web applications and designing engaging educational platforms.", initials: "SS", color: "#6C63FF" },
  { name: "Mousumi Akter Mou", role: "Human Resources Manager", bio: "HR professional dedicated to building inclusive teams, nurturing talent development, and aligning our people strategy with company mission.", initials: "MM", color: "#FF6584" },
  { name: "Easin Arafat Jihad", role: "Chief Technology Officer", bio: "Tech visionary leading Dark Code's technology infrastructure and innovation strategy. Architecting scalable solutions for millions of learners worldwide.", initials: "EJ", color: "#00D4FF" },
  { name: "Pratyay Biswas", role: "Instructor — Data Science", bio: "Data Science instructor skilled in Python, ML, and data storytelling with 2+ years of industry experience.", initials: "PB", color: "#10B981" },
  { name: "Aumimul Ahoshan Aurin", role: "Instructor — Flutter", bio: "Passionate Flutter instructor with 2+ years of app development experience. Helping beginners master cross-platform apps through real-world projects.", initials: "AA", color: "#F59E0B" },
];

const impactStats = [
  { icon: Users, value: 5000, suffix: "+", label: "Active Learners" },
  { icon: Globe, value: 30, suffix: "+", label: "Countries Reached" },
  { icon: BookOpen, value: 40, suffix: "+", label: "Courses Available" },
  { icon: Star, value: 98, suffix: "%", label: "Student Satisfaction" },
];

function AnimatedCounter({ target, suffix = "", duration = 2000 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        const startTime = performance.now();
        const animate = (now: number) => {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.floor(eased * target));
          if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
        observer.disconnect();
      }
    }, { threshold: 0.3 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function AboutPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: C.bg, color: C.text }}>
      {/* Particles bg */}
      <div className="dot-grid fixed inset-0 z-0 pointer-events-none" />

      {/* Nav-like bar */}
      <nav className="relative z-10 border-b" style={{ borderColor: "rgba(255,255,255,0.06)", backgroundColor: "rgba(10,10,15,0.8)" }}>
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg" style={{ background: gradPrimary, boxShadow: "0 4px 12px rgba(108,99,255,0.3)" }}>
              <span className="text-sm font-bold text-white">DC</span>
            </div>
            <span className="text-lg font-bold tracking-tight">
              Dark <span className="gradient-text-primary">Code</span>
            </span>
          </Link>
          <Link to="/"
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-white transition-all hover:-translate-y-0.5"
            style={{ background: gradPrimary, boxShadow: "0 4px 16px rgba(108,99,255,0.3)" }}>
            <ArrowRight size={15} /> Back to Home
          </Link>
        </div>
      </nav>

      <main className="relative z-10">
        {/* Hero */}
        <section className="py-20 sm:py-28 dot-grid-subtle text-center" style={{ backgroundColor: "rgba(15,15,26,0.5)" }}>
          <div className="mx-auto max-w-4xl px-5">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[0.7rem] font-bold uppercase tracking-[2px]" style={{ color: C.primary, borderColor: `${C.primary}40`, backgroundColor: `${C.primary}15` }}>
              <Globe size={14} /> {aboutMission.tagline}
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
              className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
              {aboutMission.title}
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="mx-auto mb-8 max-w-2xl text-base leading-relaxed" style={{ color: C.muted }}>
              {aboutMission.subtitle}
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
              className="mx-auto max-w-3xl rounded-2xl border p-6 sm:p-8 text-left" style={{ backgroundColor: "rgba(108,99,255,0.03)", borderColor: "rgba(108,99,255,0.1)" }}>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.75)" }}>{aboutMission.body}</p>
            </motion.div>
          </div>
        </section>

        {/* Core Values */}
        <section className="border-t py-20 sm:py-28 dot-grid-subtle" style={{ backgroundColor: C.bg, borderColor: "rgba(255,255,255,0.05)" }}>
          <div className="mx-auto max-w-6xl px-5">
            <div className="mb-14 text-center">
              <h2 className="mb-2 text-3xl font-extrabold tracking-tight sm:text-4xl">What We Stand For</h2>
              <p className="text-sm" style={{ color: C.muted }}>Principles that guide every decision we make at Dark Code</p>
            </div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
              className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {coreValues.map((v, i) => {
                const ValIcon = v.icon;
                return (
                  <motion.div key={i}
                    variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeInOut } } }}
                    className="group relative overflow-hidden rounded-2xl border p-6 transition-all duration-500 hover:-translate-y-1"
                    style={{ backgroundColor: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.06)" }}>
                    <div className="pointer-events-none absolute -inset-20 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      style={{ background: `radial-gradient(circle, ${v.color}15 0%, transparent 70%)` }} />
                    <div className="relative z-10">
                      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                        style={{ backgroundColor: `${v.color}18`, color: v.color }}>
                        <ValIcon size={22} />
                      </div>
                      <h4 className="mb-2 text-base font-bold">{v.title}</h4>
                      <p className="text-sm leading-relaxed" style={{ color: C.muted }}>{v.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* Team */}
        <section className="border-t py-20 sm:py-28 dot-grid-subtle" style={{ backgroundColor: "rgba(15,15,26,0.5)", borderColor: "rgba(255,255,255,0.05)" }}>
          <div className="mx-auto max-w-6xl px-5">
            <div className="mb-14 text-center">
              <h2 className="mb-2 text-3xl font-extrabold tracking-tight sm:text-4xl">Meet The Team</h2>
              <p className="text-sm" style={{ color: C.muted }}>Passionate educators and developers building the future of coding education</p>
            </div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {teamMembers.map((m, i) => (
                <motion.div key={i}
                  variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: easeInOut } } }}
                  className="group rounded-2xl border p-5 text-center transition-all duration-300 hover:-translate-y-1"
                  style={{ backgroundColor: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.06)" }}>
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full text-lg font-bold text-white transition-transform group-hover:scale-110"
                    style={{ background: `linear-gradient(135deg, ${m.color}, ${m.color}aa)`, boxShadow: `0 4px 12px ${m.color}40` }}>
                    {m.initials}
                  </div>
                  <h4 className="mb-1 text-sm font-bold">{m.name}</h4>
                  <p className="mb-2 text-xs font-semibold" style={{ color: m.color }}>{m.role}</p>
                  <p className="text-xs leading-relaxed" style={{ color: C.muted }}>{m.bio}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Impact Stats */}
        <section className="border-t py-20 sm:py-28 dot-grid-subtle" style={{ backgroundColor: C.bg, borderColor: "rgba(255,255,255,0.05)" }}>
          <div className="mx-auto max-w-6xl px-5">
            <div className="mb-14 text-center">
              <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[0.7rem] font-bold uppercase tracking-[2px]" style={{ color: "#10B981", borderColor: "rgba(16,185,129,0.3)", backgroundColor: "rgba(16,185,129,0.1)" }}>
                <TrendingUp size={14} /> Our Growth
              </div>
              <h2 className="mb-2 text-3xl font-extrabold tracking-tight sm:text-4xl">The Impact We&apos;re Making</h2>
              <p className="text-sm" style={{ color: C.muted }}>Real numbers reflecting our growing community of learners worldwide</p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {impactStats.map((s, i) => {
                const StatIcon = s.icon;
                return (
                  <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                    className="rounded-2xl border p-6 text-center transition-all hover:-translate-y-1"
                    style={{ backgroundColor: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.06)" }}>
                    <StatIcon size={28} style={{ color: C.primary }} className="mx-auto mb-3" />
                    <p className="mb-1 text-3xl font-black gradient-text-primary">
                      <AnimatedCounter target={s.value} suffix={s.suffix} />
                    </p>
                    <p className="text-sm" style={{ color: C.muted }}>{s.label}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t py-20 sm:py-28 dot-grid text-center" style={{ backgroundColor: "#050508", borderColor: "rgba(255,255,255,0.05)" }}>
          <div className="mx-auto max-w-3xl px-5">
            <h2 className="mb-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Ready to Start Your <span className="gradient-text">Programming Journey</span>?
            </h2>
            <p className="mx-auto mb-8 max-w-lg text-sm leading-relaxed" style={{ color: C.muted }}>
              Join thousands of learners building in-demand programming skills. Whether you&apos;re starting from zero or levelling up, Dark Code has the right course for you.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link to="/"
                className="inline-flex items-center gap-2.5 rounded-full px-8 py-3.5 text-base font-semibold text-white transition-all hover:-translate-y-1"
                style={{ background: gradPrimary, boxShadow: "0 8px 28px rgba(108,99,255,0.35)" }}>
                <Play size={18} /> Explore Free Courses
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t px-5 py-6" style={{ borderColor: "rgba(255,255,255,0.05)", backgroundColor: "#050508" }}>
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-center text-xs sm:flex-row sm:text-left" style={{ color: "rgba(161,161,170,0.5)" }}>
          <p>&copy; {new Date().getFullYear()} Dark Code. All rights reserved.</p>
          <Link to="/" style={{ color: C.primary }} className="transition-colors hover:brightness-125">
            Back to Home
          </Link>
        </div>
      </footer>
    </div>
  );
}
