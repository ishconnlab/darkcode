import { useRef, useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, ChevronRight, Menu, X, Play,
  Code2, Brain, Users, BookOpen, Zap,
  Layers, GraduationCap, Rocket,
  Award, BarChart3,
  Bot, MessageCircle,
  Mail, Phone, ExternalLink, Search, LogIn,
  Globe, FileText, Map, Image,
  RefreshCw, Clock, Eye,
  Briefcase, GitBranch, Wrench, HelpCircle,
  MessageSquare, FileDown,
  Terminal, Server, Star, Quote,
  CheckCircle, XCircle, Target,
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

/* ─── Data ─── */

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Week Task", href: "#" },
  { label: "Learn", href: "#" },
  { label: "Blog", href: "#" },
  { label: "Contact", href: "#" },
];

const techStack = [
  { name: "Python", icon: Code2, color: "#3776AB", use: "Data science, AI, automation" },
  { name: "JavaScript", icon: Terminal, color: "#F7DF1E", use: "Web apps, full-stack dev" },
  { name: "C++", icon: Code2, color: "#00599C", use: "Systems, game dev, perf" },
  { name: "Java", icon: Globe, color: "#ED8B00", use: "Android, enterprise" },
  { name: "Git", icon: GitBranch, color: "#F05032", use: "Version control, CI/CD" },
  { name: "React", icon: Layers, color: "#61DAFB", use: "UI components, SPA apps" },
  { name: "Node.js", icon: Server, color: "#339933", use: "Backend APIs, real-time" },
];

const heroStats = [
  { value: "5,000+", label: "Active Learners" },
  { value: "40+", label: "Courses" },
  { value: "95%", label: "Success Rate" },
];

const allLearn = [
  { icon: Globe, title: "Programming Languages", desc: "Master Python, JavaScript, C++, Java and more through structured lessons and real-world projects.", href: "#", cta: "Start Learning" },
  { icon: Brain, title: "Skills", desc: "Go beyond syntax — master the essential developer skills top companies actually look for.", href: "#", cta: "Build Skills" },
  { icon: FileText, title: "Cheat Sheet", desc: "Quick-reference syntax sheets for every major language — bookmark and use during your projects.", href: "#", cta: "Browse Sheets" },
  { icon: FileDown, title: "PDFs", desc: "Download curated PDF guides, reference books, and cheat sheets — completely free, always.", href: "#", cta: "Download Free" },
  { icon: Map, title: "Roadmap", desc: "Follow expert-crafted visual roadmaps so you always know exactly what to learn next.", href: "#", cta: "View Roadmaps" },
  { icon: BookOpen, title: "Blogs", desc: "Deep dives, tutorials, and insights from the Dark Code team to sharpen your thinking.", href: "#", cta: "Read Articles" },
];

const allPractice = [
  { icon: Code2, title: "Projects", desc: "Hands-on project ideas with guided steps — the fastest way to cement what you've learned.", href: "#", cta: "Start Building" },
  { icon: HelpCircle, title: "Quiz", desc: "500+ questions across Python, JS, DSA, and more. Fresh quizzes every week — no login needed.", href: "#", cta: "Take a Quiz" },
  { icon: MessageSquare, title: "Interview Q&A", desc: "Real interview questions with model answers — prep smarter for your next technical interview.", href: "#", cta: "Start Prepping" },
  { icon: Image, title: "Posts", desc: "Curated visual collections, cheat-sheet graphics, and reference images for developers.", href: "#", cta: "Explore Posts" },
  { icon: Zap, title: "Coding Challenges", desc: "Bite-sized coding challenges with increasing difficulty — sharpen your problem-solving speed.", href: "#", cta: "Take Challenge" },
  { icon: Layers, title: "DSA Practice", desc: "Master data structures and algorithms with guided problems, patterns, and explanations.", href: "#", cta: "Start Practicing" },
];

const allCareer = [
  { icon: GitBranch, title: "Git & GitHub", desc: "Learn version control from scratch — commits, branches, pull requests, and collaboration workflows.", href: "#", cta: "Learn Git" },
  { icon: Bot, title: "AI Tools", desc: "Discover the best AI tools for coding, productivity, and learning — curated for developers.", href: "#", cta: "Explore AI" },
  { icon: Wrench, title: "Developer Tools", desc: "Essential tools, extensions, and utilities every developer should have in their workflow.", href: "#", cta: "View Tools" },
  { icon: BarChart3, title: "Progress Tracker", desc: "Track your daily learning streak, goals, and progress to stay motivated and accountable.", href: "#", cta: "Track Progress" },
  { icon: Award, title: "Certificates", desc: "Earn verifiable certificates for completed courses and skills to showcase your achievements.", href: "#", cta: "Get Certified" },
  { icon: Briefcase, title: "Portfolio Guide", desc: "Build a portfolio that stands out — structure, projects, and tips to impress employers.", href: "#", cta: "Build Portfolio" },
];

// Blog categories
const blogCategories = ["All", "Python", "JavaScript", "Web Development", "DevOps", "AI & ML", "Database", "Career Tips", "News"];

const blogPosts = [
  { category: "Python", title: "Python 3.13: What's New and Why You Should Upgrade", date: "Jun 15, 2026", comments: 42, color: "#3776AB" },
  { category: "JavaScript", title: "Understanding JavaScript Promises: A Complete Guide", date: "Jun 12, 2026", comments: 35, color: "#F7DF1E" },
  { category: "Web Development", title: "Building Responsive Layouts with CSS Grid", date: "Jun 8, 2026", comments: 28, color: "#00D4FF" },
  { category: "DevOps", title: "5 Error Handling Best Practices in Production", date: "May 25, 2026", comments: 23, color: "#10B981" },
  { category: "AI & ML", title: "Getting Started with Machine Learning in Python", date: "May 20, 2026", comments: 31, color: "#FF6584" },
  { category: "Database", title: "SQL vs NoSQL: Choosing the Right Database for Your Project", date: "May 15, 2026", comments: 19, color: "#336791" },
  { category: "Career Tips", title: "The Next 3 Years in Tech: What Could Change by 2029?", date: "May 30, 2026", comments: 29, color: "#F59E0B" },
  { category: "News", title: "How Elon Musk Became the World's First Trillionaire", date: "Jun 12, 2026", comments: 17, color: "#6C63FF" },
];

/* ─── Quiz Data ─── */

type QuizQuestion = {
  question: string;
  options: string[];
  correct: number;
};

const quizCategories = [
  { id: "python", name: "Python", icon: Terminal, desc: "Test your Python knowledge", color: "#3776AB", questions: 5 },
  { id: "javascript", name: "JavaScript", icon: Code2, desc: "JavaScript fundamentals", color: "#F7DF1E", questions: 5 },
  { id: "web", name: "Web Dev", icon: Globe, desc: "HTML, CSS & responsive design", color: "#00D4FF", questions: 5 },
  { id: "dsa", name: "DSA", icon: Layers, desc: "Data structures & algorithms", color: "#FF6584", questions: 5 },
  { id: "ai", name: "AI & ML", icon: Brain, desc: "Artificial intelligence & ML", color: "#7C3AED", questions: 5 },
];

const quizQuestions: Record<string, QuizQuestion[]> = {
  python: [
    { question: "What is the output of print(type([]))?", options: ["<class 'tuple'>", "<class 'dict'>", "<class 'list'>", "<class 'array'>"], correct: 2 },
    { question: "Which keyword is used to define a function in Python?", options: ["func", "define", "function", "def"], correct: 3 },
    { question: "What does the len() function return for a string?", options: ["Number of words", "Number of characters", "Memory size", "Hash value"], correct: 1 },
    { question: "Which of the following is NOT a Python data type?", options: ["List", "Dictionary", "Array", "Tuple"], correct: 2 },
    { question: "What will print(2 ** 3) output?", options: ["5", "6", "8", "9"], correct: 2 },
  ],
  javascript: [
    { question: "Which keyword declares a constant in JavaScript?", options: ["let", "var", "const", "static"], correct: 2 },
    { question: "What does typeof null return in JavaScript?", options: ["null", "undefined", "object", "boolean"], correct: 2 },
    { question: "Which method adds an element to the end of an array?", options: ["push()", "pop()", "shift()", "unshift()"], correct: 0 },
    { question: "What is the correct way to write a JS comment?", options: ["# comment", "// comment", "<!-- comment -->", "' comment"], correct: 1 },
    { question: "What will console.log(0.1 + 0.2 === 0.3) output?", options: ["true", "false", "undefined", "NaN"], correct: 1 },
  ],
  web: [
    { question: "What does CSS stand for?", options: ["Computer Style Sheets", "Cascading Style Sheets", "Creative Style System", "Colorful Style Sheets"], correct: 1 },
    { question: "Which HTML tag links an external CSS file?", options: ["<style>", "<css>", "<link>", "<script>"], correct: 2 },
    { question: "Which CSS property changes the background color?", options: ["color", "bgcolor", "background-color", "background"], correct: 2 },
    { question: "Which HTML element is the largest heading?", options: ["<heading>", "<h6>", "<head>", "<h1>"], correct: 3 },
    { question: "What does display: flex do?", options: ["Creates a grid layout", "Creates a flex container", "Hides the element", "Adds spacing between items"], correct: 1 },
  ],
  dsa: [
    { question: "What is the time complexity of binary search?", options: ["O(n)", "O(log n)", "O(n\u00B2)", "O(1)"], correct: 1 },
    { question: "Which data structure uses LIFO principle?", options: ["Queue", "Stack", "Array", "Tree"], correct: 1 },
    { question: "What is the worst-case time complexity of quicksort?", options: ["O(n log n)", "O(n)", "O(n\u00B2)", "O(log n)"], correct: 2 },
    { question: "Which data structure is used for BFS traversal?", options: ["Stack", "Queue", "Priority Queue", "Hash Table"], correct: 1 },
    { question: "What does FIFO stand for?", options: ["First In, First Out", "Fast Input, Fast Output", "First In, Final Out", "File Input Output"], correct: 0 },
  ],
  ai: [
    { question: "What does AI stand for?", options: ["Automated Interface", "Artificial Intelligence", "Advanced Integration", "Algorithmic Input"], correct: 1 },
    { question: "Which Python library is most commonly used for machine learning?", options: ["NumPy", "Pandas", "scikit-learn", "Matplotlib"], correct: 2 },
    { question: "What type of learning uses labeled training data?", options: ["Unsupervised learning", "Supervised learning", "Reinforcement learning", "Transfer learning"], correct: 1 },
    { question: "What activation function is commonly used in neural networks?", options: ["Sigmoid", "ReLU", "Tanh", "All of the above"], correct: 3 },
    { question: "What does NLP stand for?", options: ["Natural Language Processing", "Neural Language Programming", "Non-Linear Processing", "Network Link Protocol"], correct: 0 },
  ],
};

const testimonials = [
  { name: "Sarah Chen", role: "Frontend Developer", quote: "Dark Code's project-based approach helped me land my first dev role in just 4 months. The interactive quizzes and real-world projects made all the difference.", rating: 5 },
  { name: "James Mwangi", role: "CS Student", quote: "I tried multiple platforms before Dark Code. The structured learning paths and AI-powered feedback kept me motivated when other sites lost me.", rating: 5 },
  { name: "Priya Sharma", role: "Career Switcher", quote: "Transitioned from marketing to software development. Dark Code's guided roadmap and community support made the impossible feel achievable.", rating: 5 },
];

const collections = [
  { title: "GitHub 30 Days 30 Topics Full Note", views: 20, gradient: "linear-gradient(135deg, #6C63FF, #7C3AED)" },
  { title: "5 Most Powerful Python Libraries", views: 5, gradient: "linear-gradient(135deg, #00D4FF, #6C63FF)" },
];

const footerLearn = ["Programming Courses", "Developer Skills", "Coding Games", "Practice Quizzes", "PDF Resources", "Learning Roadmaps"];
const footerSupport = ["Contact Us", "About Dark Code", "Privacy Policy", "Terms of Service"];

/* ═══════════════════════════════════════════════════════════════
   MAIN
   ═══════════════════════════════════════════════════════════════ */
export default function DarkCodeLanding() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showFloatingCta, setShowFloatingCta] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 50);
      setShowFloatingCta(y > 600);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden" style={{ backgroundColor: C.bg, color: C.text, fontFamily: "'Inter', system-ui, sans-serif" }}>
      <Particles />
      <ScrollProgressBar />
      <Navbar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} scrolled={scrolled} />
      <HeroSection />
      <EnterpriseTrustBar />
      <SectionGrid icon={GraduationCap} label="Learn" title="Build Your" highlight="Knowledge" subtitle="Structured learning paths, resources, and references to take you from zero to confident developer." items={allLearn.slice(0, 3)} allHref="#" />
      <SectionGrid icon={Zap} label="Practice" title="Sharpen Your" highlight="Skills" subtitle="Put your knowledge to the test — build projects, solve quizzes, ace interviews, and explore visual collections." items={allPractice.slice(0, 3)} allHref="#" />
      <SectionGrid icon={Rocket} label="Career & Tools" title="Launch Your" highlight="Career" subtitle="Everything you need to go from developer to professional — tools, tracking, and guidance in one place." items={allCareer.slice(0, 3)} allHref="#" />
      <TestimonialsSection />
      <BlogSection />
      <QuizSection />
      <CollectionsSection />
      <WhatsAppSection />
      <FounderCredit />
      <FooterSection />
      <FloatingCta visible={showFloatingCta} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PARTICLES
   ═══════════════════════════════════════════════════════════════ */
function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let w = window.innerWidth;
    let h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;

    const particles: { x: number; y: number; vx: number; vy: number; r: number; a: number }[] = [];
    const count = Math.min(80, Math.floor((w * h) / 20000));

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.5 + 0.5,
        a: Math.random() * 0.4 + 0.1,
      });
    }

    function draw(ctx: CanvasRenderingContext2D) {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(108, 99, 255, ${p.a})`;
        ctx.fill();
      }
      ctx.strokeStyle = "rgba(108, 99, 255, 0.04)";
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(() => draw(ctx));
    }
    draw(ctx);

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
    };
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-0" />;
}

/* ═══════════════════════════════════════════════════════════════
   SCROLL PROGRESS BAR
   ═══════════════════════════════════════════════════════════════ */
function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? (window.scrollY / h) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="pointer-events-none fixed top-0 left-0 z-[60] h-[2px] w-full">
      <motion.div className="h-full" style={{ background: "linear-gradient(90deg, #6C63FF, #00D4FF, #7C3AED)" }}
        animate={{ width: `${progress}%` }} transition={{ duration: 0.1 }} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   LIVE LEARNER COUNTER
   ═══════════════════════════════════════════════════════════════ */
function LiveLearnerCount() {
  const [count, setCount] = useState(247);
  useEffect(() => {
    const timer = setInterval(() => setCount(c => c + Math.floor(Math.random() * 5) - 1), 4000);
    return () => clearInterval(timer);
  }, []);
  return <span className="font-bold">{count.toLocaleString()}</span>;
}

/* ═══════════════════════════════════════════════════════════════
   LIVE TERMINAL
   ═══════════════════════════════════════════════════════════════ */
const terminalSnippets = [
  [
    "<span class=\"terminal-prompt\">$</span> python learn.py",
    "<span style=\"color:rgba(255,255,255,0.5)\">Loading your personalized path...</span>",
    "<span style=\"color:rgba(255,255,255,0.5)\">Ready!</span>",
    "",
    "<span class=\"terminal-keyword\">def</span> <span class=\"terminal-function\">master_python</span>():",
    "    skills = [<span class=\"terminal-string\">'web'</span>, <span class=\"terminal-string\">'dsa'</span>, <span class=\"terminal-string\">'ai'</span>]",
    "    <span class=\"terminal-keyword\">for</span> s <span class=\"terminal-keyword\">in</span> skills:",
    "        print(<span class=\"terminal-string\">f'→ {s}'</span>)",
    "",
    "<span class=\"terminal-prompt\">&gt;&gt;&gt;</span> master_python()",
    "<span class=\"terminal-output\">→ web</span>",
    "<span class=\"terminal-output\">→ dsa</span>",
    "<span class=\"terminal-output\">→ ai</span>",
    "<span class=\"terminal-comment\">// Skills mastered!</span>",
  ],
  [
    "<span class=\"terminal-prompt\">$</span> npm run dev",
    "<span style=\"color:rgba(255,255,255,0.5)\">Starting Dark Code platform...</span>",
    "<span style=\"color:rgba(255,255,255,0.5)\">✓ Server ready on port 3000</span>",
    "",
    "<span class=\"terminal-keyword\">import</span> { buildProjects } <span class=\"terminal-keyword\">from</span> <span class=\"terminal-string\">'@darkcode/curriculum'</span>",
    "",
    "<span class=\"terminal-keyword\">const</span> projects = <span class=\"terminal-keyword\">await</span> buildProjects({",
    "  level: <span class=\"terminal-string\">'intermediate'</span>,",
    "  stack: [<span class=\"terminal-string\">'React'</span>, <span class=\"terminal-string\">'Node'</span>, <span class=\"terminal-string\">'Postgres'</span>],",
    "})",
    "",
    "<span class=\"terminal-comment\">// Building 8 real-world projects...</span>",
    "<span class=\"terminal-output\">→ Portfolio site</span>",
    "<span class=\"terminal-output\">→ API backend</span>",
    "<span class=\"terminal-output\">→ 6 more completed</span>",
  ],
  [
    "<span class=\"terminal-prompt\">$</span> git push origin main",
    "<span style=\"color:rgba(255,255,255,0.5)\">Pushing to darkcode-platform...</span>",
    "",
    "<span class=\"terminal-keyword\">function</span> <span class=\"terminal-function\">solveDSA</span>(problem: Problem): Solution {",
    "  <span class=\"terminal-keyword\">const</span> approach = analyze(problem.type);",
    "  <span class=\"terminal-keyword\">const</span> result = optimize(approach);",
    "  <span class=\"terminal-keyword\">return</span> {",
    "    complexity: <span class=\"terminal-string\">'O(n log n)'</span>,",
    "    passed: <span class=\"terminal-keyword\">true</span>,",
    "  };",
    "}",
    "",
    "<span class=\"terminal-comment\">// Test results: 15/15 passed</span>",
    "<span class=\"terminal-prompt\">$</span> <span class=\"terminal-cursor-inline\">█</span>",
  ],
];

function LiveTerminal() {
  const [snippetIdx, setSnippetIdx] = useState(0);
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const snippet = terminalSnippets[snippetIdx];

  useEffect(() => {
    if (visibleLines.length >= snippet.length) {
      const t = setTimeout(() => {
        setSnippetIdx((snippetIdx + 1) % terminalSnippets.length);
        setVisibleLines([]);
      }, 4000);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setVisibleLines(prev => [...prev, snippet[prev.length]]), 100 + Math.random() * 150);
    return () => clearTimeout(t);
  }, [snippetIdx, visibleLines, snippet]);

  return (
    <div className="terminal">
      <div className="terminal-header">
        <div className="terminal-dot red" />
        <div className="terminal-dot yellow" />
        <div className="terminal-dot green" />
        <span className="terminal-title">bash — darkcode</span>
      </div>
      <div className="terminal-body">
        {visibleLines.map((line, i) => (
          <div key={i} dangerouslySetInnerHTML={{ __html: line }} />
        ))}
        {visibleLines.length < snippet.length && <span className="terminal-cursor" />}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   3D TILT CARD WRAPPER
   ═══════════════════════════════════════════════════════════════ */
function TiltCard({ children, className, style, ...rest }: { children: React.ReactNode; className?: string; style?: React.CSSProperties; [key: string]: any }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glow, setGlow] = useState({ x: 50, y: 50 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({ x: -(y - 0.5) * 12, y: (x - 0.5) * 12 });
    setGlow({ x: x * 100, y: y * 100 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setTilt({ x: 0, y: 0 }); }}
      animate={{ rotateX: tilt.x, rotateY: tilt.y }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className={className}
      style={{ ...style, perspective: "1000px", transformStyle: "preserve-3d" } as React.CSSProperties}
      {...rest}
    >
      {children}
      {hovered && (
        <div className="pointer-events-none absolute inset-0 rounded-2xl" style={{ background: `radial-gradient(circle at ${glow.x}% ${glow.y}%, rgba(108,99,255,0.1), transparent 60%)`, zIndex: 1 }} />
      )}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   NAVBAR
   ═══════════════════════════════════════════════════════════════ */
function Navbar({ mobileOpen, setMobileOpen, scrolled }: { mobileOpen: boolean; setMobileOpen: (v: boolean) => void; scrolled: boolean }) {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: easeInOut }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        backgroundColor: scrolled ? "rgba(10,10,15,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(24px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(24px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
      }}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
        <a href="#" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg" style={{ background: gradPrimary, boxShadow: "0 4px 12px rgba(108,99,255,0.3)" }}>
            <span className="text-sm font-bold text-white">DC</span>
          </div>
          <span className="text-lg font-bold tracking-tight">
            Dark <span className="gradient-text-primary">Code</span>
          </span>
        </a>

        <div className="hidden items-center gap-0.5 md:flex">
          {navLinks.map((l) =>
            l.href.startsWith("/") ? (
              <Link key={l.label} to={l.href}
                className="rounded-lg px-3.5 py-2 text-sm font-medium transition-colors" style={{ color: C.muted }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = C.text; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = C.muted; }}
              >{l.label}</Link>
            ) : (
              <a key={l.label} href={l.href}
                className="rounded-lg px-3.5 py-2 text-sm font-medium transition-colors" style={{ color: C.muted }}
                onMouseEnter={(e) => { e.currentTarget.style.color = C.text; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = C.muted; }}
              >{l.label}</a>
            )
          )}
          <button onClick={() => setSearchOpen(!searchOpen)} className="ml-2 flex h-9 w-9 items-center justify-center rounded-xl transition-colors" style={{ color: C.muted }}
            onMouseEnter={(e) => { e.currentTarget.style.color = C.primary; e.currentTarget.style.backgroundColor = "rgba(108,99,255,0.08)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = C.muted; e.currentTarget.style.backgroundColor = "transparent"; }}>
            <Search size={17} />
          </button>
          <a href="#" className="ml-2 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5" style={{ background: gradPrimary, boxShadow: "0 4px 16px rgba(108,99,255,0.3)" }}>
            <LogIn size={15} /> Login
          </a>
        </div>

        <button onClick={() => setMobileOpen(!mobileOpen)} className="flex h-10 w-10 items-center justify-center rounded-xl border md:hidden" style={{ borderColor: "rgba(108,99,255,0.3)", backgroundColor: "rgba(108,99,255,0.08)" }}>
          {mobileOpen ? <X size={20} style={{ color: C.primary }} /> : <Menu size={20} style={{ color: C.primary }} />}
        </button>
      </div>

      {searchOpen && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="hidden border-t px-5 py-4 md:block" style={{ borderColor: "rgba(255,255,255,0.06)", backgroundColor: "rgba(10,10,15,0.95)" }}>
          <div className="mx-auto flex max-w-2xl items-center gap-3 rounded-xl border px-4 py-2" style={{ borderColor: "rgba(108,99,255,0.3)", backgroundColor: "rgba(255,255,255,0.03)" }}>
            <Search size={18} style={{ color: C.muted }} />
            <input type="text" placeholder="Search courses, topics..." className="flex-1 bg-transparent text-sm outline-none" style={{ color: C.text }} autoFocus />
            <span className="rounded-lg px-3 py-1 text-xs font-medium" style={{ backgroundColor: "rgba(108,99,255,0.15)", color: C.primary }}>Search</span>
          </div>
        </motion.div>
      )}

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden border-t px-5 md:hidden" style={{ backgroundColor: "rgba(10,10,15,0.98)", backdropFilter: "blur(24px)", borderColor: "rgba(255,255,255,0.06)" }}>
            <div className="py-4">
              {navLinks.map((l) =>
                l.href.startsWith("/") ? (
                  <Link key={l.label} to={l.href} className="block rounded-lg px-4 py-3 text-sm font-medium" style={{ color: C.muted }}>{l.label}</Link>
                ) : (
                  <a key={l.label} href={l.href} className="block rounded-lg px-4 py-3 text-sm font-medium" style={{ color: C.muted }}>{l.label}</a>
                )
              )}
              <div className="my-3 flex items-center gap-3 rounded-xl border px-4 py-2" style={{ borderColor: "rgba(255,255,255,0.1)", backgroundColor: "rgba(255,255,255,0.03)" }}>
                <Search size={16} style={{ color: C.muted }} />
                <input type="text" placeholder="Search courses..." className="flex-1 bg-transparent text-sm outline-none" style={{ color: C.text }} />
              </div>
              <a href="#" className="mt-3 flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white" style={{ background: gradPrimary }}>
                <LogIn size={16} /> Login
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

/* ═══════════════════════════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════════════════════════ */
function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (heroRef.current) {
      const rect = heroRef.current.getBoundingClientRect();
      setMousePos({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      });
    }
  }, []);

  return (
    <section ref={heroRef} onMouseMove={handleMouseMove}
      className="relative z-10 min-h-screen overflow-hidden pt-32 pb-16 dot-grid">
      {/* Animated Mesh Gradient Blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
        <div className="blob blob-4" />
        {/* Programming Stickers */}
        <div className="sticker sticker-1">{`{ }`}</div>
        <div className="sticker sticker-2">{`</>`}</div>
        <div className="sticker sticker-3">{"//"}</div>
        <div className="sticker sticker-4">{"=>"}</div>
        <div className="sticker sticker-5">{"() =>"}</div>
        <div className="sticker sticker-6">{"const"}</div>
        <div className="sticker sticker-7">{"#!"}</div>
      </div>

      {/* Mouse-follow ambient glow */}
      <div className="pointer-events-none absolute inset-0 transition-opacity duration-500 opacity-60 hidden lg:block"
        style={{ background: `radial-gradient(600px circle at ${mousePos.x}% ${mousePos.y}%, rgba(108,99,255,0.08), transparent 60%)` }} />

      <div className="container relative z-10 mx-auto max-w-6xl px-5">
        <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex-1 text-center lg:text-left">
            {/* Live learners badge */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.05 }}
              className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold lg:mx-0"
              style={{ color: "#10B981", borderColor: "rgba(16,185,129,0.2)", backgroundColor: "rgba(16,185,129,0.08)" }}>
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
              </span>
              <LiveLearnerCount /> learners coding now
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }}
              className="mb-4 text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Learn to code with{" "}
              <span className="gradient-text">real projects</span>
              <br />not just videos.
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
              className="mx-auto mb-7 max-w-xl text-base leading-relaxed sm:text-lg lg:mx-0" style={{ color: C.muted }}>
              Learn programming through interactive courses, fun coding games, and skill-building quizzes. Whether you&apos;re a complete beginner or levelling up, Dark Code makes your coding journey fast, effective, and enjoyable.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.45 }}
              className="mb-8 flex flex-col items-center gap-3 sm:flex-row lg:items-start">
              <a href="#"
                className="group btn-shine inline-flex items-center gap-2.5 rounded-full px-8 py-3.5 text-base font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl active:scale-[0.98]"
                style={{ background: gradPrimary, boxShadow: "0 8px 28px rgba(108,99,255,0.35)" }}>
                <Play size={18} /> Start Learning Free <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
              </a>
              <a href="#"
                className="inline-flex items-center gap-2.5 rounded-full border px-8 py-3.5 text-base font-semibold transition-all duration-300 hover:-translate-y-1 hover:bg-white/5"
                style={{ borderColor: "rgba(255,255,255,0.15)", color: C.muted }}>
                <BookOpen size={18} /> Explore Courses
              </a>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.55 }}
              className="mx-auto mb-8 inline-flex items-center divide-x rounded-2xl border lg:mx-0"
              style={{ borderColor: "rgba(255,255,255,0.06)", backgroundColor: "rgba(255,255,255,0.02)" }}>
              {heroStats.map((s, i) => (
                <div key={i} className="flex flex-col items-center px-6 py-3">
                  <span className="text-xl font-black gradient-text-primary">{s.value}</span>
                  <span className="text-xs font-medium" style={{ color: C.muted }}>{s.label}</span>
                </div>
              ))}
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.65 }}
              className="mx-auto flex flex-wrap items-center justify-center gap-3 lg:justify-start lg:gap-4">
              <span className="text-xs font-medium uppercase tracking-wider" style={{ color: C.muted }}>Tech Stack</span>
              <div className="flex flex-wrap items-center gap-2">
                {techStack.map((tech, i) => {
                  const Icon = tech.icon;
                  return (
                    <span key={i} className="relative inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-medium transition-all hover:-translate-y-0.5"
                      style={{ borderColor: `${tech.color}30`, backgroundColor: `${tech.color}10`, color: tech.color }}
                      onMouseEnter={() => setHoveredTech(tech.name)}
                      onMouseLeave={() => setHoveredTech(null)}>
                      <Icon size={13} />
                      {tech.name}
                      {hoveredTech === tech.name && (
                        <span className="absolute -top-8 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-md border px-2 py-1 text-[0.6rem] font-normal shadow-xl"
                          style={{ backgroundColor: "#0A0A0F", borderColor: `${tech.color}40`, color: tech.color }}>
                          {tech.use}
                        </span>
                      )}
                    </span>
                  );
                })}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-5 inline-flex items-center gap-1.5 text-xs" style={{ color: C.muted }}>
              <Globe size={13} style={{ color: C.primary }} />
              <span>Used in <strong className="gradient-text-primary">30+ countries</strong> across 4 continents</span>
            </motion.div>
          </div>

          {/* Live Terminal */}
          <motion.div initial={{ opacity: 0, scale: 0.9, x: 20 }} animate={{ opacity: 1, scale: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
            className="w-full max-w-md flex-shrink-0">
            <LiveTerminal />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION GRID (reusable for Learn / Practice / Career)
   ═══════════════════════════════════════════════════════════════ */
function SectionGrid({ icon, label, title, highlight, subtitle, items, allHref }: {
  icon: React.ElementType; label: string; title: string; highlight: string; subtitle: string;
  items: { icon: React.ElementType; title: string; desc: string; href: string; cta: string }[];
  allHref: string;
}) {
  const SectionIcon = icon;
  return (
    <section className="relative z-10 overflow-hidden border-t py-20 sm:py-28 dot-grid-subtle" style={{ backgroundColor: "rgba(255,255,255,0.01)", borderColor: "rgba(255,255,255,0.05)" }}>
      <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse at 30% 20%, rgba(108,99,255,0.04) 0%, transparent 55%)" }} />
      <div className="container relative z-10 mx-auto max-w-6xl px-5">
        <div className="mb-14 text-center">
          <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[0.7rem] font-bold uppercase tracking-[2px]" style={{ color: C.primary, borderColor: `${C.primary}40`, backgroundColor: `${C.primary}15` }}>
            <SectionIcon size={14} /> {label}
          </div>
          <h2 className="mb-3 text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
            {title}{" "}
            <span className="gradient-text">{highlight}</span>
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed sm:text-base" style={{ color: C.muted }}>{subtitle}</p>
        </div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => {
            const ItemIcon = item.icon;
            return (
              <TiltCard key={i}>
                <motion.a href={item.href}
                  variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeInOut } } }}
                  className="group relative block overflow-hidden rounded-2xl border p-6 transition-all duration-500 hover:-translate-y-1 border-glow"
                  style={{ backgroundColor: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.06)" }}>
                  <div className="pointer-events-none absolute -inset-20 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{ background: `radial-gradient(circle, ${C.primary}15 0%, transparent 70%)` }} />
                  <div className="relative z-10">
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3"
                      style={{ backgroundColor: `${C.primary}12`, color: C.primary }}>
                      <ItemIcon size={22} />
                    </div>
                    <h3 className="mb-2 text-base font-bold">{item.title}</h3>
                    <p className="mb-4 text-sm leading-relaxed" style={{ color: C.muted }}>{item.desc}</p>
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider transition-all group-hover:gap-2.5" style={{ color: C.primary }}>
                      {item.cta} <ArrowRight size={12} />
                    </span>
                  </div>
                </motion.a>
              </TiltCard>
            );
          })}
        </motion.div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-10 text-center">
          <a href={allHref} className="inline-flex items-center gap-2 rounded-full border px-6 py-2.5 text-sm font-semibold transition-all hover:-translate-y-0.5"
            style={{ borderColor: "rgba(255,255,255,0.1)", color: C.muted }}>
            View All {label} <ArrowRight size={14} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   TESTIMONIALS
   ═══════════════════════════════════════════════════════════════ */
function TestimonialsSection() {
  const duplicated = [...testimonials, ...testimonials, ...testimonials];
  return (
    <section className="relative z-10 overflow-hidden border-t py-20 sm:py-28 dot-grid-subtle" style={{ backgroundColor: "rgba(15,15,26,0.5)", borderColor: "rgba(255,255,255,0.05)" }}>
      <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(108,99,255,0.05) 0%, transparent 60%)" }} />
      <div className="mx-auto max-w-6xl px-5">
        <div className="mb-14 text-center">
          <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[0.7rem] font-bold uppercase tracking-[2px]" style={{ color: "#F59E0B", borderColor: "rgba(245,158,11,0.3)", backgroundColor: "rgba(245,158,11,0.1)" }}>
            <Quote size={14} /> Testimonials
          </div>
          <h2 className="mb-3 text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
            What Our{" "}
            <span className="gradient-text">Learners Say</span>
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-sm leading-relaxed sm:text-base" style={{ color: C.muted }}>
            Real stories from real developers who transformed their careers with Dark Code.
          </p>
        </div>

        <div className="testimonial-track">
          {duplicated.map((t, i) => (
            <div key={i}
              className="w-[320px] shrink-0 rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1"
              style={{ backgroundColor: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.06)" }}>
              <Quote size={24} style={{ color: `${C.primary}25` }} className="mb-3" />
              <p className="mb-4 text-sm leading-relaxed" style={{ color: C.muted }}>&ldquo;{t.quote}&rdquo;</p>
              <div className="mb-3 flex gap-1">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={14} style={{ color: "#F59E0B", fill: "#F59E0B" }} />
                ))}
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white" style={{ background: gradPrimary }}>
                  {t.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <p className="text-sm font-bold">{t.name}</p>
                  <p className="text-xs" style={{ color: C.muted }}>{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   BLOG
   ═══════════════════════════════════════════════════════════════ */
function BlogSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const filtered = activeCategory === "All" ? blogPosts : blogPosts.filter(p => p.category === activeCategory);
  return (
    <section className="relative z-10 overflow-hidden border-t py-20 sm:py-28 dot-grid-subtle" style={{ backgroundColor: "rgba(255,255,255,0.01)", borderColor: "rgba(255,255,255,0.05)" }}>
      <div className="container mx-auto max-w-6xl px-5">
        <div className="mb-10 text-center">
          <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[0.7rem] font-bold uppercase tracking-[2px]" style={{ color: C.accent, borderColor: `${C.accent}40`, backgroundColor: `${C.accent}15` }}>
            <BookOpen size={14} /> From the Blog
          </div>
          <h2 className="mb-3 text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
            Latest Articles &{" "}
            <span className="gradient-text">Tutorials</span>
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-sm leading-relaxed sm:text-base" style={{ color: C.muted }}>
            Deep dives, tutorials, and insights from the Dark Code team — level up your knowledge.
          </p>
        </div>

        <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
          {blogCategories.map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className="rounded-full px-4 py-1.5 text-xs font-semibold transition-all"
              style={{
                backgroundColor: activeCategory === cat ? `${C.primary}20` : "rgba(255,255,255,0.04)",
                color: activeCategory === cat ? C.primary : C.muted,
                border: `1px solid ${activeCategory === cat ? `${C.primary}50` : "rgba(255,255,255,0.08)"}`,
              }}>
              {cat}
            </button>
          ))}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post, i) => {
            const bgGrad = `linear-gradient(135deg, ${post.color}, ${post.color}aa)`;
            return (
              <motion.div key={i} layout initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="group overflow-hidden rounded-2xl border transition-all duration-500 hover:-translate-y-1"
                style={{ backgroundColor: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.06)" }}>
                <div className="relative aspect-[16/9] overflow-hidden" style={{ background: bgGrad }}>
                  <div className="absolute inset-0 bg-black/30 transition-opacity duration-500 group-hover:opacity-20" />
                  <div className="absolute inset-0 flex items-center justify-center"><BookOpen size={48} className="text-white/40" /></div>
                  <span className="absolute top-3 left-3 rounded-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider" style={{ backgroundColor: "rgba(0,0,0,0.5)", color: C.text, backdropFilter: "blur(4px)" }}>{post.category}</span>
                </div>
                <div className="p-5 text-center">
                  <div className="mb-3 flex items-center justify-center gap-3 text-xs" style={{ color: C.muted }}>
                    <span className="inline-flex items-center gap-1"><Clock size={12} />{post.date}</span>
                    <span className="inline-flex items-center gap-1"><MessageCircle size={12} />{post.comments}</span>
                  </div>
                  <h3 className="mb-4 text-base font-bold leading-snug">{post.title}</h3>
                  <a href="#" className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider transition-all hover:gap-2" style={{ color: post.color }}>
                    Read <ArrowRight size={12} />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <a href="#" className="inline-flex items-center gap-2 rounded-full border px-6 py-2.5 text-sm font-semibold transition-all hover:-translate-y-0.5"
            style={{ borderColor: "rgba(255,255,255,0.1)", color: C.muted }}>
            All Posts <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   VISUAL COLLECTIONS
   ═══════════════════════════════════════════════════════════════ */
function CollectionsSection() {
  return (
    <section className="relative z-10 overflow-hidden border-t py-20 sm:py-28 dot-grid" style={{ backgroundColor: "#050508", borderColor: "rgba(255,255,255,0.05)" }}>
      <div className="container mx-auto max-w-6xl px-5">
        <div className="mb-14 text-center">
          <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[0.7rem] font-bold uppercase tracking-[2px]" style={{ color: C.secondary, borderColor: `${C.secondary}40`, backgroundColor: `${C.secondary}15` }}>
            <Image size={14} /> Visual Collections
          </div>
          <h2 className="mb-3 text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
            Latest Post{" "}
            <span className="gradient-text">Collections</span>
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-sm leading-relaxed sm:text-base" style={{ color: C.muted }}>
            Curated image collections, cheat sheets, and visual references for developers.
          </p>
        </div>

        <div className="mx-auto grid max-w-3xl gap-6 sm:grid-cols-2">
          {collections.map((col, i) => (
            <motion.a key={i} href="#" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-2xl border transition-all duration-500 hover:-translate-y-1"
              style={{ backgroundColor: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.06)" }}>
              <div className="flex aspect-[16/9] items-center justify-center" style={{ background: col.gradient }}><Image size={56} className="text-white/30" /></div>
              <div className="p-5">
                <h3 className="mb-3 text-base font-bold">{col.title}</h3>
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs" style={{ color: C.muted }}>
                    <Eye size={13} /> {col.views} views
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-bold transition-all group-hover:gap-1.5" style={{ color: C.primary }}>
                    View <ChevronRight size={12} />
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a href="#" className="inline-flex items-center gap-2 rounded-full border px-6 py-2.5 text-sm font-semibold transition-all hover:-translate-y-0.5"
            style={{ borderColor: "rgba(255,255,255,0.1)", color: C.muted }}>
            All Posts <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ANIMATED COUNTER
   ═══════════════════════════════════════════════════════════════ */
/* ═══════════════════════════════════════════════════════════════
   QUIZ SECTION
   ═══════════════════════════════════════════════════════════════ */
function QuizSection() {
  const [screen, setScreen] = useState<"categories" | "active" | "results">("categories");
  const [category, setCategory] = useState<string | null>(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<{ selected: number; correct: boolean }[]>([]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  useEffect(() => {
    if (screen !== "active" || selectedOption !== null) return;
    const timer = setInterval(() => {
      setTimeLeft((p) => {
        if (p <= 1) {
          clearInterval(timer);
          return 0;
        }
        return p - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [screen, currentQ, selectedOption]);

  const startQuiz = (catId: string) => {
    setCategory(catId);
    setCurrentQ(0);
    setScore(0);
    setAnswers([]);
    setTimeLeft(30);
    setSelectedOption(null);
    setScreen("active");
  };

  const handleAnswer = (selected: number) => {
    if (selectedOption !== null || !category) return;
    const qs = quizQuestions[category];
    if (!qs) return;
    const correct = selected === qs[currentQ].correct;
    setAnswers((a) => [...a, { selected, correct }]);
    setSelectedOption(selected);
    if (correct) setScore((s) => s + 1);
  };

  const goNext = () => {
    if (!category) return;
    const qs = quizQuestions[category];
    if (!qs) return;
    if (currentQ < qs.length - 1) {
      setCurrentQ((q) => q + 1);
      setTimeLeft(30);
      setSelectedOption(null);
    } else {
      setScreen("results");
    }
  };

  const restart = () => {
    setScreen("categories");
    setCategory(null);
  };

  /* ---- Category Selection ---- */
  if (screen === "categories") {
    return (
      <section className="relative z-10 overflow-hidden border-t py-20 sm:py-28 dot-grid" style={{ backgroundColor: "#050508", borderColor: "rgba(255,255,255,0.05)" }}>
        <div className="container mx-auto max-w-6xl px-5">
          <div className="mb-14 text-center">
            <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[0.7rem] font-bold uppercase tracking-[2px]" style={{ color: "#F59E0B", borderColor: "rgba(245,158,11,0.3)", backgroundColor: "rgba(245,158,11,0.1)" }}>
              <Target size={14} /> Knowledge Check
            </div>
            <h2 className="mb-3 text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
              Test Your{" "}
              <span className="gradient-text">Skills</span>
            </h2>
            <p className="mx-auto mt-2 max-w-lg text-sm leading-relaxed sm:text-base" style={{ color: C.muted }}>
              Choose a topic and challenge yourself with 5 questions. Each question has a 30-second timer.
            </p>
          </div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {quizCategories.map((cat) => {
              const CatIcon = cat.icon;
              return (
                <motion.button key={cat.id} onClick={() => startQuiz(cat.id)}
                  variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                  className="group relative overflow-hidden rounded-2xl border p-6 text-center transition-all duration-300 hover:-translate-y-1 border-glow"
                  style={{ backgroundColor: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.06)" }}>
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl transition-transform group-hover:scale-110"
                    style={{ backgroundColor: `${cat.color}20`, color: cat.color }}>
                    <CatIcon size={28} />
                  </div>
                  <h3 className="mb-1 text-base font-bold">{cat.name}</h3>
                  <p className="mb-3 text-xs" style={{ color: C.muted }}>{cat.desc}</p>
                  <span className="text-xs font-semibold" style={{ color: cat.color }}>{cat.questions} Questions</span>
                </motion.button>
              );
            })}
          </motion.div>
        </div>
      </section>
    );
  }

  /* ---- Active Quiz ---- */
  if (screen === "active" && category) {
    const qs = quizQuestions[category];
    if (!qs || !qs[currentQ]) return null;
    const question = qs[currentQ];
    const cat = quizCategories.find((c) => c.id === category);
    const isTimeout = timeLeft === 0 && selectedOption === null;
    const showResult = selectedOption !== null || isTimeout;

    return (
      <section className="relative z-10 overflow-hidden border-t py-20 sm:py-28 dot-grid" style={{ backgroundColor: "#050508", borderColor: "rgba(255,255,255,0.05)" }}>
        <div className="container mx-auto max-w-3xl px-5">
          {/* Header: category badge + progress + timer */}
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="rounded-full px-3 py-1 text-xs font-bold" style={{ backgroundColor: `${cat?.color}20`, color: cat?.color }}>
                {cat?.name}
              </span>
              <span className="text-xs font-medium" style={{ color: C.muted }}>{currentQ + 1} / {qs.length}</span>
            </div>
            <div className={`flex items-center gap-2 text-sm font-bold ${timeLeft <= 5 ? "animate-pulse" : ""}`} style={{ color: timeLeft <= 5 ? "#FF6584" : C.muted }}>
              <Clock size={16} />
              {timeLeft}s
            </div>
          </div>

          {/* Progress bar */}
          <div className="mb-8 h-1.5 w-full overflow-hidden rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.06)" }}>
            <motion.div className="h-full rounded-full" style={{ background: gradPrimary }}
              initial={{ width: "0%" }}
              animate={{ width: `${((currentQ + 1) / qs.length) * 100}%` }}
              transition={{ duration: 0.4 }} />
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={currentQ} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
              <div className="mb-6 rounded-2xl border p-6 sm:p-8" style={{ backgroundColor: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.06)" }}>
                <p className="mb-6 text-lg font-bold leading-relaxed">{question.question}</p>

                {isTimeout && (
                  <div className="mb-6 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-center text-sm font-semibold" style={{ color: "#FF6584" }}>
                    Time&apos;s up! The correct answer is highlighted below.
                  </div>
                )}

                <div className="grid gap-3">
                  {question.options.map((opt, i) => {
                    let borderColor = "rgba(255,255,255,0.1)";
                    let bgColor = "rgba(255,255,255,0.02)";
                    let txtColor = C.text;
                    let opacity: number | undefined;

                    if (showResult) {
                      if (i === question.correct) {
                        borderColor = "#10B981";
                        bgColor = "rgba(16,185,129,0.1)";
                        txtColor = "#10B981";
                      } else if (i === selectedOption) {
                        borderColor = "#FF6584";
                        bgColor = "rgba(255,101,132,0.1)";
                        txtColor = "#FF6584";
                      } else {
                        opacity = 0.35;
                      }
                    }

                    return (
                      <button key={i} onClick={() => handleAnswer(i)} disabled={showResult}
                        className="flex items-center gap-3 rounded-xl border p-4 text-left text-sm font-medium transition-all"
                        style={{ borderColor, backgroundColor: bgColor, color: txtColor, opacity }}>
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold"
                          style={{ backgroundColor: "rgba(255,255,255,0.05)" }}>
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span className="flex-1">{opt}</span>
                        {showResult && i === question.correct && <CheckCircle size={18} style={{ color: "#10B981" }} className="shrink-0" />}
                        {showResult && i === selectedOption && i !== question.correct && <XCircle size={18} style={{ color: "#FF6584" }} className="shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {showResult && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-center gap-3">
                  <button onClick={goNext}
                    className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5"
                    style={{ background: gradPrimary, boxShadow: "0 4px 16px rgba(108,99,255,0.3)" }}>
                    {currentQ < qs.length - 1 ? "Next Question" : "See Results"} <ArrowRight size={15} />
                  </button>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Score mini-display */}
          <div className="mt-6 flex items-center justify-center gap-2 text-sm" style={{ color: C.muted }}>
            <Award size={16} style={{ color: C.primary }} />
            Score: {score} / {answers.length || currentQ}
          </div>
        </div>
      </section>
    );
  }

  /* ---- Results ---- */
  if (screen === "results" && category) {
    const qs = quizQuestions[category];
    if (!qs) return null;
    const total = qs.length;
    const percentage = Math.round((score / total) * 100);
    const cat = quizCategories.find((c) => c.id === category);
    const grade = percentage >= 80 ? "Expert" : percentage >= 60 ? "Intermediate" : "Beginner";
    const gradeColor = percentage >= 80 ? "#10B981" : percentage >= 60 ? "#F59E0B" : "#FF6584";

    return (
      <section className="relative z-10 overflow-hidden border-t py-20 sm:py-28 dot-grid" style={{ backgroundColor: "#050508", borderColor: "rgba(255,255,255,0.05)" }}>
        <div className="container mx-auto max-w-2xl px-5">
          <div className="rounded-2xl border p-8 text-center sm:p-12" style={{ backgroundColor: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.06)" }}>
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-2xl" style={{ backgroundColor: `${gradeColor}20` }}>
              {percentage >= 80 ? <Award size={40} style={{ color: gradeColor }} /> : <Target size={40} style={{ color: gradeColor }} />}
            </motion.div>

            <h3 className="mb-1 text-2xl font-bold">{grade}</h3>
            <p className="mb-6 text-sm" style={{ color: C.muted }}>{score}/{total} correct &mdash; {cat?.name || "Quiz"}</p>

            <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { icon: CheckCircle, value: score, label: "Correct", color: "#10B981" },
                { icon: XCircle, value: total - score, label: "Wrong", color: "#FF6584" },
                { icon: BarChart3, value: `${percentage}%`, label: "Accuracy", color: C.primary },
                { icon: Zap, value: `+${score * 10}`, label: "XP Earned", color: "#F59E0B" },
              ].map((s, i) => {
                const SI = s.icon;
                return (
                  <div key={i} className="rounded-xl border p-4" style={{ borderColor: "rgba(255,255,255,0.06)", backgroundColor: "rgba(255,255,255,0.02)" }}>
                    <SI size={20} style={{ color: s.color }} className="mx-auto mb-1" />
                    <p className="text-lg font-bold" style={{ color: s.color }}>{s.value}</p>
                    <p className="text-xs" style={{ color: C.muted }}>{s.label}</p>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button onClick={restart}
                className="inline-flex items-center gap-2 rounded-full border px-6 py-2.5 text-sm font-semibold transition-all hover:-translate-y-0.5"
                style={{ borderColor: "rgba(255,255,255,0.1)", color: C.muted }}>
                <RefreshCw size={14} /> Try Another Topic
              </button>
              <button onClick={() => category && startQuiz(category)}
                className="inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5"
                style={{ background: gradPrimary, boxShadow: "0 4px 16px rgba(108,99,255,0.3)" }}>
                <RefreshCw size={14} /> Retake Quiz
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return null;
}

/* ═══════════════════════════════════════════════════════════════
   WHATSAPP CONTACT
   ═══════════════════════════════════════════════════════════════ */
function WhatsAppSection() {
  return (
    <section className="relative z-10 overflow-hidden border-y py-20 sm:py-24 dot-grid-subtle" style={{ backgroundColor: "rgba(37,211,102,0.02)", borderColor: "rgba(255,255,255,0.05)" }}>
      <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(37,211,102,0.05) 0%, transparent 60%)" }} />
      <div className="container relative z-10 mx-auto max-w-3xl px-5 text-center">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
          className="rounded-2xl border p-8 sm:p-12" style={{ backgroundColor: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.06)" }}>
          <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 200 }}
            className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl" style={{ backgroundColor: "rgba(37,211,102,0.15)" }}>
            <MessageCircle size={32} style={{ color: "#25d366" }} />
          </motion.div>
          <h2 className="mb-3 text-2xl font-extrabold tracking-tight sm:text-3xl">
            Have Any <span className="gradient-text">Questions?</span>
          </h2>
          <p className="mx-auto mb-6 max-w-md text-sm leading-relaxed" style={{ color: C.muted }}>
            Get instant support, suggestions, or report any issues directly through WhatsApp
          </p>
          <a href="https://wa.me/8801780366380" target="_blank" rel="noopener noreferrer"
            className="group mx-auto inline-flex items-center gap-2.5 rounded-full px-8 py-3.5 text-base font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            style={{ background: "linear-gradient(135deg, #25D366, #128C7E)", boxShadow: "0 8px 28px rgba(37,211,102,0.35)" }}>
            <MessageCircle size={20} /> Message us on WhatsApp <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
          </a>
          <p className="mt-4 text-xs" style={{ color: C.muted }}>Typically reply in minutes</p>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ENTERPRISE TRUST BAR
   ═══════════════════════════════════════════════════════════════ */
function EnterpriseTrustBar() {
  return (
    <section className="relative z-10 border-t border-b px-5 py-10 dot-grid-subtle" style={{ backgroundColor: "rgba(255,255,255,0.01)", borderColor: "rgba(255,255,255,0.04)" }}>
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          <p className="text-xs font-medium uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.25)" }}>
            Trusted by engineers from
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
            {["Google", "Amazon", "Microsoft", "Meta", "Spotify", "Stripe"].map((name, i) => (
              <div key={i} className="flex items-center gap-2 opacity-40 transition-opacity hover:opacity-70">
                <div className="flex h-7 w-7 items-center justify-center rounded-md" style={{ backgroundColor: "rgba(108,99,255,0.1)" }}>
                  <Code2 size={14} style={{ color: C.primary }} />
                </div>
                <span className="text-xs font-bold tracking-tight" style={{ color: "rgba(255,255,255,0.5)" }}>{name}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-4 sm:mt-4" style={{ color: "rgba(255,255,255,0.15)" }}>
          <span className="flex items-center gap-1.5 text-[0.6rem] font-medium uppercase tracking-wider">
            <BarChart3 size={10} style={{ color: C.primary }} />
            <span className="gradient-text-primary font-bold">10K+</span> projects completed
          </span>
          <span className="hidden h-3 w-px sm:block" style={{ backgroundColor: "rgba(255,255,255,0.08)" }} />
          <span className="flex items-center gap-1.5 text-[0.6rem] font-medium uppercase tracking-wider">
            <Clock size={10} style={{ color: C.primary }} />
            <span className="gradient-text-primary font-bold">52+</span> hours of content
          </span>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   FLOATING CTA
   ═══════════════════════════════════════════════════════════════ */
function FloatingCta({ visible }: { visible: boolean }) {
  return (
    <motion.a href="#"
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 20, scale: visible ? 1 : 0.9 }}
      transition={{ duration: 0.3, ease: easeInOut }}
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 rounded-full px-5 py-3 text-sm font-semibold text-white shadow-2xl transition-all duration-300 hover:-translate-y-1"
      style={{ background: gradPrimary, boxShadow: "0 8px 28px rgba(108,99,255,0.4)" }}>
      <Play size={16} /> Start Free
    </motion.a>
  );
}

/* ═══════════════════════════════════════════════════════════════
   FOUNDER CREDIT (one-line)
   ═══════════════════════════════════════════════════════════════ */
function FounderCredit() {
  return (
    <section className="relative z-10 border-t px-5 py-8" style={{ backgroundColor: "rgba(15,15,26,0.3)", borderColor: "rgba(255,255,255,0.05)" }}>
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="text-sm" style={{ color: C.muted }}>
            Built by developers, for developers{" "}
            <span style={{ color: C.accent }}>&mdash;</span>{" "}
            <Link to="/about" className="inline-flex items-center gap-1.5 font-semibold transition-colors" style={{ color: C.primary }}>
              Meet the team <ArrowRight size={13} />
            </Link>
          </p>
          <div className="flex items-center gap-3 text-xs" style={{ color: C.muted }}>
            <span className="inline-flex items-center gap-1.5">
              <Users size={13} style={{ color: C.primary }} />{" "}
              <span className="font-semibold gradient-text-primary">MD. Santo Sarkar</span>
              &mdash; CEO & Founder
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════════════════════════ */
function FooterSection() {
  return (
    <footer className="relative z-10" style={{ backgroundColor: "#050508" }}>
      <div className="border-t px-5 py-16 sm:py-24" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
        <div className="container mx-auto max-w-6xl">
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Link to="/" className="mb-4 inline-flex items-center gap-2.5 text-xl font-bold">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg" style={{ background: gradPrimary, boxShadow: "0 4px 12px rgba(108,99,255,0.3)" }}>
                  <span className="text-sm font-bold text-white">DC</span>
                </div>
                Dark <span className="gradient-text-primary">Code</span>
              </Link>
              <p className="mb-6 max-w-xs text-sm leading-relaxed" style={{ color: C.muted }}>
                Your all-in-one platform to master programming, sharpen developer skills, and land your dream tech career.
              </p>
              <div className="mb-6 flex flex-wrap gap-2">
                {[{ num: "10K+", label: "Learners" }, { num: "50+", label: "Courses" }, { num: "98%", label: "Success" }].map((s, i) => (
                  <div key={i} className="flex flex-col items-center rounded-xl border px-4 py-2.5 text-xs transition-all hover:-translate-y-0.5"
                    style={{ borderColor: "rgba(255,255,255,0.06)", backgroundColor: "rgba(255,255,255,0.02)" }}>
                    <span className="text-sm font-bold gradient-text-primary">{s.num}</span>
                    <span style={{ color: C.muted }}>{s.label}</span>
                  </div>
                ))}
              </div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-[0.6rem] font-medium uppercase tracking-widest"
                style={{ borderColor: "rgba(108,99,255,0.15)", backgroundColor: "rgba(108,99,255,0.04)", color: "rgba(108,99,255,0.7)" }}>
                <Code2 size={11} /> 2.4M+ lines of code written
              </div>
              <div className="flex gap-2.5">
                {[ExternalLink, Briefcase, MessageCircle, Mail].map((Icon, i) => (
                  <a key={i} href="#" className="flex h-9 w-9 items-center justify-center rounded-xl border text-sm transition-all hover:-translate-y-0.5 hover:shadow-lg"
                    style={{ borderColor: "rgba(255,255,255,0.1)", color: C.muted }}>
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            <div className="lg:col-span-2">
              <h4 className="mb-5 flex items-center gap-2 text-[0.7rem] font-bold uppercase tracking-[2px]" style={{ color: "rgba(255,255,255,0.35)" }}>
                <span className="inline-block h-2.5 w-1 rounded-full" style={{ backgroundColor: C.primary }} /> Learn
              </h4>
              <ul className="space-y-2.5">
                {footerLearn.map((link) => (
                  <li key={link}><a href="#" className="text-sm transition-colors hover:translate-x-0.5 inline-block" style={{ color: C.muted }}>{link}</a></li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h4 className="mb-5 flex items-center gap-2 text-[0.7rem] font-bold uppercase tracking-[2px]" style={{ color: "rgba(255,255,255,0.35)" }}>
                <span className="inline-block h-2.5 w-1 rounded-full" style={{ backgroundColor: C.accent }} /> Support
              </h4>
              <ul className="space-y-2.5">
                {footerSupport.map((link) => (
                  <li key={link}>
                    {link === "About Dark Code" ? (
                      <Link to="/about" className="text-sm transition-colors hover:translate-x-0.5 inline-block" style={{ color: C.muted }}>{link}</Link>
                    ) : (
                      <a href="#" className="text-sm transition-colors hover:translate-x-0.5 inline-block" style={{ color: C.muted }}>{link}</a>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-4">
              <h4 className="mb-5 flex items-center gap-2 text-[0.7rem] font-bold uppercase tracking-[2px]" style={{ color: "rgba(255,255,255,0.35)" }}>
                <span className="inline-block h-2.5 w-1 rounded-full" style={{ backgroundColor: C.secondary }} /> Contact
              </h4>
              <ul className="space-y-3.5">
                <li className="flex items-start gap-3 text-sm" style={{ color: C.muted }}>
                  <Globe size={15} style={{ color: C.primary }} className="mt-0.5 shrink-0" /> Bangladesh
                </li>
                <li className="flex items-start gap-3 text-sm" style={{ color: C.muted }}>
                  <Phone size={15} style={{ color: C.primary }} className="mt-0.5 shrink-0" /> +8801780-366380
                </li>
                <li className="flex items-start gap-3 text-sm" style={{ color: C.muted }}>
                  <Mail size={15} style={{ color: C.primary }} className="mt-0.5 shrink-0" /> darkcode276@gmail.com
                </li>
                <li className="flex items-start gap-3 text-sm" style={{ color: C.muted }}>
                  <Clock size={15} style={{ color: C.primary }} className="mt-0.5 shrink-0" /> 24/7 Support
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t px-5 py-6" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col items-center justify-between gap-3 text-center text-xs sm:flex-row sm:text-left" style={{ color: "rgba(161,161,170,0.5)" }}>
            <p>&copy; {new Date().getFullYear()} Dark Code. All rights reserved.</p>
            <p className="inline-flex items-center gap-1">
              Built with <span style={{ color: C.accent }}>&hearts;</span> Dark Code
            </p>
            <div className="flex items-center gap-3">
              <a href="#" style={{ color: "rgba(161,161,170,0.5)" }} className="transition-colors hover:text-white">Privacy</a>
              <span className="opacity-50">&middot;</span>
              <a href="#" style={{ color: "rgba(161,161,170,0.5)" }} className="transition-colors hover:text-white">Terms</a>
              <span className="opacity-50">&middot;</span>
              <a href="#" style={{ color: "rgba(161,161,170,0.5)" }} className="transition-colors hover:text-white">Contact</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
