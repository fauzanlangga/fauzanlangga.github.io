import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Cpu,
  ExternalLink,
  Github,
  Instagram,
  Mail,
  Send,
  CheckCircle2,
  AlertCircle,
  Eye,
  X,
  Sparkles,
  Terminal,
  Loader2
} from 'lucide-react';

interface Experience {
  id: string;
  role: string;
  organization: string;
  period: string;
  description: string;
  tags: string[];
  type: 'cyber' | 'work' | 'organization' | 'education' | 'certification';
}

interface Project {
  id: string;
  title: string;
  category: 'cyber' | 'web' | 'content';
  categoryLabel: string;
  description: string;
  imageUrl: string;
  tags: string[];
  link?: string;
  linkType?: 'instagram' | 'github' | 'live';
  featured?: boolean;
}

export default function App() {
  // Initial experiences with BSSN Junior Penetration Tester and Cisco Networking Academy credentials
  const initialExperiences: Experience[] = [
    {
      id: 'exp-bssn',
      role: 'Junior Penetration Tester (Certified)',
      organization: 'National Cyber and Crypto Agency (BSSN)',
      period: 'Certified',
      description: 'Official national certification in cybersecurity from BSSN. Conducting web application penetration testing, vulnerability assessments, OWASP Top 10 security audits, and threat mitigation strategy planning.',
      tags: ['BSSN Certified', 'Penetration Testing', 'OWASP Top 10', 'Vulnerability Assessment', 'Ethical Hacking'],
      type: 'cyber'
    },
    {
      id: 'exp-cisco-cyberops',
      role: 'Cisco CyberOps Associate (Badge & Certified)',
      organization: 'Cisco Networking Academy',
      period: 'Issued: Sep 06, 2022',
      description: 'Mastery of Security Operations Center (SOC) procedures, real-time network traffic analysis, intrusion detection, applied cryptography, endpoint threat detection, and incident response.',
      tags: ['Cisco Verified', 'SOC Operations', 'Threat Detection', 'Incident Response', 'Network Intrusion'],
      type: 'cyber'
    },
    {
      id: 'exp-cisco-essentials',
      role: 'Cybersecurity Essentials (Badge & Certified)',
      organization: 'Cisco Networking Academy',
      period: 'Issued: Jan 16, 2022',
      description: 'Deep understanding of information security fundamentals, CIA Triad principles, malware defense, social engineering counter-measures, encryption standards, and digital privacy governance.',
      tags: ['Cisco Verified', 'CIA Triad', 'Malware Defense', 'Network Defense', 'Information Security'],
      type: 'cyber'
    },
    {
      id: 'exp-ndg-linux',
      role: 'Partner: NDG Linux Essentials (Certified)',
      organization: 'NDG & Cisco Networking Academy',
      period: 'Issued: Jul 07, 2021',
      description: 'Proficiency in Linux operating systems, kernel architecture, file permission management, user administration, CLI command-line mastery, and shell scripting essential for penetration testing.',
      tags: ['Linux OS', 'Bash Scripting', 'System Administration', 'File Permissions', 'CLI Mastery'],
      type: 'cyber'
    },
    {
      id: 'exp-cisco-intro',
      role: 'Introduction to Cybersecurity (Certified)',
      organization: 'Cisco Networking Academy',
      period: 'Issued: Jul 23, 2020',
      description: 'Comprehensive overview of the global cybersecurity landscape, emerging digital threats, risk mitigation techniques, and professional infosec ethics.',
      tags: ['Cisco Certified', 'Cyber Hygiene', 'Threat Landscape', 'Digital Ethics'],
      type: 'cyber'
    },
    {
      id: 'exp-1',
      role: 'Software Engineer & Content Creator',
      organization: 'Shiftmedia / Shift Farm',
      period: '2021 — Present',
      description: 'Engineering resilient secure-by-design software systems, managing cloud application architecture, and directing large-scale educational multimedia digital campaigns.',
      tags: ['Full-Stack', 'Secure Coding', 'UI/UX Architecture', 'Digital Media', 'Cyber Awareness'],
      type: 'work'
    },
    {
      id: 'exp-2',
      role: 'Minister of Communication & Information',
      organization: 'Student Executive Board (BEM) Universitas Sangga Buana',
      period: '2021 — 2022',
      description: 'Led the university media and communication division, overseeing institutional social media channels, press releases, digital public relations, and student brand strategy.',
      tags: ['Leadership', 'Media Relations', 'Information Security', 'Team Management'],
      type: 'organization'
    },
    {
      id: 'exp-3',
      role: 'Department Student Association President',
      organization: 'Informatics Student Association, Universitas Sangga Buana',
      period: '2019 — 2020',
      description: 'Directed all departmental work programs, represented student interests to the faculty board, and organized academic technology seminars and digital literacy workshops.',
      tags: ['Strategic Planning', 'Leadership', 'Event Organizing'],
      type: 'organization'
    },
    {
      id: 'exp-4',
      role: 'OIC Youth Delegation',
      organization: 'AYIMUN Cameroon',
      period: '2020',
      description: 'Selected international youth representative in Model United Nations simulation, engaging in diplomatic discourse and drafting resolutions on pressing global affairs.',
      tags: ['Diplomacy', 'Public Speaking', 'International Relations'],
      type: 'organization'
    },
    {
      id: 'exp-5',
      role: 'Front-End Development Trainee',
      organization: 'Skydu Academy',
      period: '2020',
      description: 'Intensive engineering training focused on modern responsive web development, DOM scripting, clean code practices, and RESTful API integration.',
      tags: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Web'],
      type: 'education'
    },
    {
      id: 'exp-6',
      role: 'Verified Professional Certifications',
      organization: 'Microsoft & BNSP / Professional Certification Authority',
      period: 'Certified',
      description: 'Holder of official Microsoft Office Specialist (MOS) and certified Junior Graphic Designer under national competence standardization frameworks.',
      tags: ['Microsoft Certified', 'Graphic Design', 'Visual Hierarchy'],
      type: 'certification'
    }
  ];

  const experiences: Experience[] = initialExperiences;

  // Filter projects
  const [projectFilter, setProjectFilter] = useState<'all' | 'cyber' | 'web' | 'content'>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Contact form state
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formFeedback, setFormFeedback] = useState('');

  // Theme toggle state: 'cyber' (default) or 'terminal' (high-contrast Terminal Red)
  const [theme, setTheme] = useState<'cyber' | 'terminal'>(() => {
    try {
      const saved = localStorage.getItem('langgard_theme');
      if (saved === 'terminal' || saved === 'cyber') return saved;
    } catch {
      // fallback
    }
    return 'cyber';
  });

  const isTerminal = theme === 'terminal';

  const toggleTheme = () => {
    setTheme(prev => {
      const next = prev === 'cyber' ? 'terminal' : 'cyber';
      try {
        localStorage.setItem('langgard_theme', next);
      } catch {
        // fallback
      }
      return next;
    });
  };

  useEffect(() => {
    if (isTerminal) {
      document.documentElement.classList.add('theme-terminal');
    } else {
      document.documentElement.classList.remove('theme-terminal');
    }
  }, [isTerminal]);


  // Projects data
  const projects: Project[] = [
    {
      id: 'p-pentest-lab',
      title: 'Web Application Penetration Testing & Security Audit',
      category: 'cyber',
      categoryLabel: 'Cyber Security · BSSN Standard',
      description: 'Comprehensive web security assessment covering OWASP Top 10 vulnerabilities (SQL Injection, XSS, Broken Authentication, IDOR). Identifying vulnerabilities, evaluating attack vectors, and formulating system hardening patches.',
      imageUrl: '/img/cyber_hero.jpg',
      tags: ['BSSN Certified', 'OWASP Top 10', 'Burp Suite', 'Vulnerability Assessment', 'Ethical Hacking'],
      featured: true
    },
    {
      id: 'p-genetik',
      title: 'Genetic Algorithm Course Scheduling System',
      category: 'web',
      categoryLabel: 'Algorithms & PHP',
      description: 'Intelligent heuristic optimization system using Genetic Algorithms to resolve complex timetabling constraints: lecturer overlaps, laboratory assignments, Friday prayer intervals, and room capacities.',
      imageUrl: '/img/cyber_interface.jpg',
      tags: ['PHP', 'CodeIgniter', 'Genetic Algorithm', 'Optimization'],
      link: 'https://github.com/fauzanlangga/penjadwalanAlgoritmaGenetika',
      linkType: 'github',
      featured: true
    },
    {
      id: 'p-plankton',
      title: 'Jakarta Bay Plankton Classification & Segmentation',
      category: 'cyber',
      categoryLabel: 'AI & Computer Vision',
      description: 'Deep Learning Computer Vision system utilizing convolutional U-Net architectures for semantic segmentation and taxonomy classification of micro-plankton specimens, trained on GPU HPC clusters.',
      imageUrl: '/img/cyber_interface.jpg',
      tags: ['Python', 'TensorFlow', 'U-Net', 'OpenCV', 'PBS Cluster'],
      link: 'https://github.com/fauzanlangga/klasifikasiPlankton',
      linkType: 'github'
    },
    {
      id: 'p-quotes-1',
      title: 'Content Quotes: Lesswaste Movement',
      category: 'content',
      categoryLabel: 'Social Campaign',
      description: 'Visual environmental awareness campaign focusing on plastic minimization and sustainable lifestyles with clean typography and persuasive messaging.',
      imageUrl: '/img/1.png',
      tags: ['Graphic Design', 'Copywriting', 'Instagram Carousel'],
      link: 'https://www.instagram.com/p/CXXYp2HPWlS/',
      linkType: 'instagram'
    },
    {
      id: 'p-plastic',
      title: 'Plastic Pollution Awareness Infographic',
      category: 'content',
      categoryLabel: 'Social Campaign',
      description: 'Detailed educational infographic explaining the lifecycle of single-use plastic waste, its hazard to marine ecosystems, and practical reduction alternatives.',
      imageUrl: '/img/slide 1.png',
      tags: ['Visual Infographic', 'Environmental Design', 'Campaign'],
      link: 'https://www.instagram.com/p/CSJyprHFmVY/',
      linkType: 'instagram'
    },
    {
      id: 'p-starterpack',
      title: 'Eco-Friendly Living Starter Pack',
      category: 'content',
      categoryLabel: 'Social Campaign',
      description: 'Actionable visual guide highlighting daily sustainable essentials (reusable tumblers, tote bags, metal straws) tailored for younger demographics.',
      imageUrl: '/img/starterkit1.jpg',
      tags: ['Creative Direction', 'Social Media', 'Illustration'],
      link: 'https://www.instagram.com/p/CYQ_Q8ZFCop/',
      linkType: 'instagram'
    },
    {
      id: 'p-water-day',
      title: 'World Water Monitoring Day',
      category: 'content',
      categoryLabel: 'Social Campaign',
      description: 'Commemorative digital campaign addressing global freshwater preservation, watershed quality monitoring, and conservation best practices.',
      imageUrl: '/img/1b.png',
      tags: ['Poster Design', 'Social Awareness', 'Digital Art'],
      link: 'https://www.instagram.com/p/CT8_1RBlvcX/',
      linkType: 'instagram'
    },
    {
      id: 'p-foodwaste',
      title: 'Food Waste Reduction Campaign',
      category: 'content',
      categoryLabel: 'Social Campaign',
      description: 'Statistical awareness posters providing step-by-step guidance on cutting domestic food waste and encouraging conscious consumption.',
      imageUrl: '/img/sampah makanan.jpg',
      tags: ['Graphic Art', 'Public Information', 'Food Waste'],
      link: 'https://www.instagram.com/p/CSjcRjfFOyj/',
      linkType: 'instagram'
    },
    {
      id: 'p-puzzle-lesswaste',
      title: 'Puzzle Feed Gamification — Lesswaste',
      category: 'content',
      categoryLabel: 'Instagram Grid',
      description: 'Seamless Instagram puzzle grid design engineered to maximize audience engagement and interactive community education.',
      imageUrl: '/img/1a.png',
      tags: ['Instagram Grid', 'Social Gamification', 'Graphic Design'],
      link: 'https://www.instagram.com/p/CT6-Wj0pkVw/',
      linkType: 'instagram'
    },
    {
      id: 'p-kurangi-sampah',
      title: 'Actionable Guide: Reducing Daily Waste',
      category: 'content',
      categoryLabel: 'Social Campaign',
      description: 'Practical visual blueprint for households to eliminate single-use disposables and initiate effective waste-sorting routines.',
      imageUrl: '/img/1 (2).png',
      tags: ['Actionable Guide', 'Environmental Campaign', 'Visual Poster'],
      link: 'https://www.instagram.com/p/CaET9iQvwOJ/',
      linkType: 'instagram'
    }
  ];

  const filteredProjects = projectFilter === 'all'
    ? projects
    : projects.filter(p => p.category === projectFilter);

  // Form submit handler with timeout protection & multi-header spreadsheet sync
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = formName.trim();
    const trimmedEmail = formEmail.trim();
    const trimmedMessage = formMessage.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      setFormStatus('error');
      setFormFeedback('Mohon lengkapi nama, email, dan pesan Anda sebelum mengirim.');
      return;
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setFormStatus('error');
      setFormFeedback('Format alamat email tidak valid. Pastikan contoh: nama@domain.com');
      return;
    }

    setFormStatus('loading');
    setFormFeedback('');

    const scriptURL = "https://script.google.com/macros/s/AKfycbyfMfW1bujvmfhY3l__mrv_FXd1c5iOkwMd3KNDhaStJRGhr1OH2pgHqNXh-2BNUk_C/exec";
    const now = new Date();
    const formattedTimestamp = now.toLocaleString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

    // Send multi-key compatibility aliases so it matches any Google Sheet header column
    const formData = new FormData();
    formData.append('nama', trimmedName);
    formData.append('Nama', trimmedName);
    formData.append('name', trimmedName);
    formData.append('Name', trimmedName);

    formData.append('email', trimmedEmail);
    formData.append('Email', trimmedEmail);

    formData.append('pesan', trimmedMessage);
    formData.append('Pesan', trimmedMessage);
    formData.append('message', trimmedMessage);
    formData.append('Message', trimmedMessage);

    formData.append('timestamp', formattedTimestamp);
    formData.append('Timestamp', formattedTimestamp);
    formData.append('tanggal', formattedTimestamp);
    formData.append('Tanggal', formattedTimestamp);

    try {
      const controller = new AbortController();
      // Google Apps Script cold-start can take up to 6-10 seconds
      const timeoutId = setTimeout(() => controller.abort(), 12000);

      await fetch(scriptURL, {
        method: 'POST',
        body: formData,
        mode: 'no-cors',
        signal: controller.signal
      });

      clearTimeout(timeoutId);
      setFormStatus('success');
      setFormFeedback(`Pesan Anda berhasil terkirim ke Google Spreadsheet Ahmad Fauzan Langga (${formattedTimestamp}). Terima kasih!`);
      setFormName('');
      setFormEmail('');
      setFormMessage('');
    } catch {
      setFormStatus('error');
      setFormFeedback('Koneksi ke endpoint formulir mengalami timeout atau kendala jaringan. Anda juga dapat mengirim pesan secara langsung melalui email ke fauzanlangga54@gmail.com.');
    }
  };

  return (
    <div className={`min-h-screen relative overflow-x-hidden font-sans transition-colors duration-300 ${
      isTerminal
        ? 'theme-terminal bg-black text-[#fff0f4] selection:bg-[#ff7597] selection:text-black'
        : 'bg-[#07090e] text-slate-100 selection:bg-cyan-500 selection:text-black'
    }`}>
      {/* Background Cyber Grid Lines with Smooth Panning Motion */}
      <div 
        className={`fixed inset-0 pointer-events-none z-0 transition-opacity duration-300 animate-cyber-grid ${
          isTerminal ? 'opacity-35' : 'opacity-25'
        }`}
        style={{
          backgroundImage: isTerminal
            ? `linear-gradient(to right, rgba(255, 117, 151, 0.12) 1px, transparent 1px),
               linear-gradient(to bottom, rgba(255, 117, 151, 0.12) 1px, transparent 1px)`
            : `linear-gradient(to right, rgba(0, 240, 255, 0.09) 1px, transparent 1px),
               linear-gradient(to bottom, rgba(0, 240, 255, 0.09) 1px, transparent 1px)`,
          backgroundSize: '48px 48px'
        }}
      />
      <div className={`fixed top-0 left-1/2 -translate-x-1/2 w-[900px] h-[350px] blur-3xl pointer-events-none z-0 transition-all duration-500 ${
        isTerminal
          ? 'bg-gradient-to-b from-[#ff7597]/15 via-rose-950/20 to-transparent'
          : 'bg-gradient-to-b from-cyan-500/10 via-indigo-500/5 to-transparent'
      }`} />

      {/* Top Bar Contract */}
      <header className={`sticky top-0 z-40 backdrop-blur-md border-b transition-colors duration-300 ${
        isTerminal
          ? 'bg-black/90 border-[#ff7597]/30 shadow-[0_4px_20px_rgba(255,117,151,0.08)]'
          : 'bg-[#07090e]/85 border-cyan-500/15'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3 sm:gap-6">
          {/* Zone 1: Brand Wordmark */}
          <a
            href="#home"
            className="flex items-center gap-2.5 text-base font-bold tracking-tight text-white whitespace-nowrap shrink-0 group"
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
              isTerminal
                ? 'bg-[#2b0014] border border-[#ff7597]/50 text-[#ff7597] group-hover:border-[#ff7597] group-hover:shadow-[0_0_12px_rgba(255,117,151,0.5)]'
                : 'bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 group-hover:border-cyan-400 group-hover:shadow-[0_0_12px_rgba(0,240,255,0.4)]'
            }`}>
              <span className={`font-mono text-[11px] font-black tracking-tighter ${isTerminal ? 'text-[#ff7597]' : 'text-cyan-400'}`}>AFL</span>
            </div>
            <span className="font-mono text-sm tracking-wide text-white font-bold">
              Lang<span className={isTerminal ? 'text-[#ff7597]' : 'text-cyan-400'}>gard</span>
            </span>
          </a>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-xs font-medium text-slate-400">
            <a
              href="#about"
              className={`transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8 ${
                isTerminal ? 'hover:text-[#ff7597]' : 'hover:text-cyan-400'
              }`}
            >
              About
            </a>
            <a
              href="#experience"
              className={`transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8 ${
                isTerminal ? 'hover:text-[#ff7597]' : 'hover:text-cyan-400'
              }`}
            >
              Experience & Cyber
            </a>
            <a
              href="#projects"
              className={`transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8 ${
                isTerminal ? 'hover:text-[#ff7597]' : 'hover:text-cyan-400'
              }`}
            >
              Projects & Research
            </a>
            <a
              href="#contact"
              className={`transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8 ${
                isTerminal ? 'hover:text-[#ff7597]' : 'hover:text-cyan-400'
              }`}
            >
              Contact
            </a>
          </nav>

          {/* Zone 3: Primary Action & Theme Toggle */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            {/* Theme Toggle Button */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={`Switch to ${isTerminal ? 'Cyber theme' : 'high-contrast Terminal Red theme'}`}
              className={`px-2.5 sm:px-3 py-1.5 text-xs font-mono font-medium rounded-lg border transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                isTerminal
                  ? 'bg-[#2b0014]/90 border-[#ff7597] text-[#ff7597] shadow-[0_0_12px_rgba(255,117,151,0.35)] hover:bg-[#3d001d]'
                  : 'bg-cyan-950/60 border-cyan-500/40 text-cyan-300 shadow-[0_0_10px_rgba(0,240,255,0.18)] hover:border-cyan-400 hover:bg-cyan-900/60'
              }`}
              title={isTerminal ? 'Active: Terminal Red (Click for Cyber Theme)' : 'Active: Cyber Theme (Click for Terminal Red)'}
            >
              <Terminal className={`w-3.5 h-3.5 ${isTerminal ? 'text-[#ff7597]' : 'text-cyan-400'}`} />
              <span className="hidden sm:inline font-semibold">
                {isTerminal ? 'Terminal Red' : 'Cyber Theme'}
              </span>
              <span
                className={`w-2 h-2 rounded-full transition-all ${
                  isTerminal
                    ? 'bg-[#ff7597] shadow-[0_0_6px_#ff7597] animate-pulse'
                    : 'bg-cyan-400 shadow-[0_0_6px_#00f0ff]'
                }`}
              />
            </button>

            <a
              href="#contact"
              className={`px-3 sm:px-4 py-2 text-xs font-medium font-mono rounded-lg transition-all duration-200 whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                isTerminal
                  ? 'text-[#ff7597] bg-[#2b0014]/90 hover:bg-[#3d001d] border border-[#ff7597]/50 hover:border-[#ff7597] hover:shadow-[0_0_15px_rgba(255,117,151,0.3)]'
                  : 'text-cyan-300 bg-cyan-950/60 hover:bg-cyan-900/60 border border-cyan-500/40 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(0,240,255,0.25)]'
              }`}
            >
              <Send className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Get in Touch</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-24">
        {/* HERO SECTION */}
        <section id="home" className="pt-4 lg:pt-10 scroll-mt-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            {/* Left Column: Typographic Hierarchy */}
            <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
              {/* Refined kicker with unboxed metadata */}
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 flex-wrap">
                <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                <span>Content Creator</span>
                <span className="text-slate-600" aria-hidden="true">·</span>
                <span>Software Engineer</span>
                <span className="text-slate-600" aria-hidden="true">·</span>
                <span className="text-indigo-400 font-semibold">Cyber Security Specialist (BSSN Certified)</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.15] text-white">
                Architecting Resilient Software, Cyber Defense & High-Impact Visuals.
              </h1>

              {/* Lead Copy */}
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
                Hello, I'm <strong className="text-white font-semibold">Ahmad Fauzan Langga</strong>. Bridging secure software engineering, penetration testing certified by the National Cyber and Crypto Agency (<em className="text-cyan-300 not-italic font-medium">BSSN Certified Junior Penetration Tester</em>), and creative digital communication.
              </p>

              {/* CTAs & Social Links */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#projects"
                  className="px-5 py-2.5 text-xs font-semibold font-mono text-black bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-all shadow-[0_0_18px_rgba(0,240,255,0.4)] flex items-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  <span>Explore Projects</span>
                </a>

                <a
                  href="https://github.com/fauzanlangga"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 text-xs font-mono rounded-lg border border-slate-700 bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-white transition flex items-center gap-2"
                >
                  <Github className="w-4 h-4 text-slate-300" />
                  <span>GitHub Profile</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                </a>

                <a
                  href="https://www.instagram.com/fauzanlangga/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 text-xs font-mono rounded-lg border border-slate-700 bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-white transition flex items-center gap-2"
                >
                  <Instagram className="w-4 h-4 text-pink-400" />
                  <span>Instagram</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                </a>
              </div>
            </div>

            {/* Right Column: Cyber Visual Card Container */}
            <div className="lg:col-span-5 flex items-center">
              <div className="w-full relative rounded-2xl border border-cyan-500/30 bg-[#0d1017]/90 p-5 shadow-[0_0_30px_rgba(0,240,255,0.08)] overflow-hidden">
                {/* Cyber Corner Decors */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-400" />
                <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyan-400" />
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-cyan-400" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-400" />

                <div className="space-y-4">
                  {/* Avatar + Identity */}
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <img
                        src="/img/fau.jpg"
                        alt="Ahmad Fauzan Langga"
                        className="w-16 h-16 rounded-xl object-cover border border-cyan-500/40 shadow-[0_0_12px_rgba(0,240,255,0.2)]"
                        onError={(e) => {
                          const target = e.currentTarget;
                          target.onerror = null;
                          target.src = '/img/cyber_hero.jpg';
                        }}
                      />
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-white tracking-wide">Ahmad Fauzan Langga</h2>
                      <p className="text-xs font-mono text-cyan-400 flex items-center gap-1.5">
                        <span>@fauzanlangga</span>
                        <span className="text-[10px] text-indigo-400 px-1.5 py-0.2 rounded bg-indigo-950/60 border border-indigo-500/30">
                          BSSN Certified
                        </span>
                      </p>
                      <p className="text-[11px] text-slate-400 mt-0.5">Content Creator · Software Engineer · Cyber Security</p>
                    </div>
                  </div>

                  {/* Terminal-like bio snippet */}
                  <div className="bg-[#05070a] border border-slate-800 rounded-xl p-3.5 font-mono text-xs text-slate-300 space-y-2">
                    <div className="flex items-center justify-between text-slate-500 text-[11px] border-b border-slate-800 pb-1.5">
                      <span>cyber_spec.json</span>
                      <span className="text-indigo-400">ACTIVE // PENTEST_READY</span>
                    </div>
                    <p className="text-slate-300">
                      <span className="text-cyan-400 font-semibold">Specialty:</span> Penetration Testing (BSSN) & Secure Architecture
                    </p>
                    <p className="text-slate-400 text-[11px]">
                      <span className="text-indigo-400 font-semibold">Competencies:</span> OWASP Top 10 · Vulnerability Assessment · Creative Direction
                    </p>
                    <div className="pt-1 flex flex-wrap gap-1.5 text-[10px] text-cyan-300">
                      <span className="px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30">BSSN Pentester</span>
                      <span className="px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30">OWASP Top 10</span>
                      <span className="px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30">Python / Bash</span>
                      <span className="px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30">React & CI</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Metric Strip Below Split */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl border border-indigo-500/30 bg-[#0d1017]/60">
              <span className="text-2xl font-bold font-mono text-indigo-400 tabular-nums">BSSN</span>
              <p className="text-xs text-slate-400 mt-1">Certified Junior Penetration Tester</p>
            </div>
            <div className="p-4 rounded-xl border border-cyan-500/30 bg-[#0d1017]/60">
              <span className="text-2xl font-bold font-mono text-cyan-400 tabular-nums">5+</span>
              <p className="text-xs text-slate-400 mt-1">Official Cisco NetAcad Credentials</p>
            </div>
            <div className="p-4 rounded-xl border border-slate-800 bg-[#0d1017]/60">
              <span className="text-2xl font-bold font-mono text-cyan-400 tabular-nums">4+</span>
              <p className="text-xs text-slate-400 mt-1">Years in Tech & Leadership</p>
            </div>
            <div className="p-4 rounded-xl border border-slate-800 bg-[#0d1017]/60">
              <span className="text-2xl font-bold font-mono text-cyan-400 tabular-nums">9+</span>
              <p className="text-xs text-slate-400 mt-1">Public Repositories on GitHub</p>
            </div>
          </div>
        </section>

        {/* ABOUT ME SECTION (Highlighting the 3 Pillars) */}
        <section id="about" className="space-y-6 scroll-mt-24">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
              <span>01. CORE PILLARS & PHILOSOPHY</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              About & Technical Focus
            </h2>
            <p className="text-xs text-slate-400 max-w-2xl">
              A distinctive synergy connecting resilient software engineering, certified cybersecurity defenses, and strategic multimedia storytelling.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-slate-300 leading-relaxed">
            {/* Pillar 1: Cyber Security */}
            <div className="p-6 rounded-2xl border border-indigo-500/30 bg-[#0d1017]/80 space-y-3 relative overflow-hidden">
              <div className="w-9 h-9 rounded-xl bg-indigo-950/70 border border-indigo-500/40 flex items-center justify-center text-indigo-400 mb-1">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-white">
                Cyber Security & Pentest
              </h3>
              <p className="text-xs text-slate-300">
                Holder of the official <strong>Junior Penetration Tester certification from BSSN</strong> (National Cyber and Crypto Agency). Specializing in vulnerability assessments, ethical exploitation, OWASP Top 10 web app testing, and defensive system hardening.
              </p>
              <div className="pt-2 text-[11px] font-mono text-indigo-400">
                BSSN Certified · OWASP Top 10 · AppSec
              </div>
            </div>

            {/* Pillar 2: Software Engineering */}
            <div className="p-6 rounded-2xl border border-cyan-500/30 bg-[#0d1017]/80 space-y-3">
              <div className="w-9 h-9 rounded-xl bg-cyan-950/70 border border-cyan-500/40 flex items-center justify-center text-cyan-400 mb-1">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-white">
                Software Engineering
              </h3>
              <p className="text-xs text-slate-300">
                Experienced in engineering modular web systems, genetic optimization algorithms, convolutional deep learning models (U-Net), and modern frontend architectures built with <em>Secure by Design</em> discipline.
              </p>
              <div className="pt-2 text-[11px] font-mono text-cyan-400">
                PHP · Python · React · Algorithms
              </div>
            </div>

            {/* Pillar 3: Content Creation */}
            <div className="p-6 rounded-2xl border border-indigo-500/30 bg-[#0d1017]/80 space-y-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-950/70 border border-indigo-500/40 flex items-center justify-center text-indigo-400 mb-1">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-white">
                Creative Content & Media
              </h3>
              <p className="text-xs text-slate-300">
                Content Creator at Shiftmedia (Shift Farm) and former university Minister of Communication & Information. Skilled in translating technical concepts, cyber safety, and environmental topics into engaging visual narratives.
              </p>
              <div className="pt-2 text-[11px] font-mono text-indigo-400">
                Creative Direction · Jr Graphic Designer
              </div>
            </div>
          </div>
        </section>

        {/* EXPERIENCE SECTION */}
        <section id="experience" className="space-y-6 scroll-mt-24">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
              <span>02. CAREER TRACK, CYBER & CREDENTIALS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Experience & Professional Certifications
            </h2>
            <p className="text-xs text-slate-400">
              Including official BSSN Junior Penetration Tester certification, verified Cisco NetAcad credentials, and leadership records.
            </p>
          </div>

          {/* Cisco Networking Academy & Credly Official Badges Showcase */}
          <div className="p-6 rounded-2xl border border-cyan-500/30 bg-[#0d1017]/90 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                  <ShieldCheck className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    Official Credly Digital Badges — Cisco Networking Academy
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Publicly verified digital credentials issued by Cisco on the Credly achievement platform
                  </p>
                </div>
              </div>
              <a
                href="https://www.credly.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-mono text-cyan-400 hover:text-cyan-300 px-2.5 py-1 rounded bg-cyan-950/60 border border-cyan-500/30 self-start sm:self-auto flex items-center gap-1.5 transition"
              >
                <span>CREDLY VERIFIED</span>
                <ExternalLink className="w-3 h-3 text-cyan-400" />
              </a>
            </div>

            {/* Credly Badges Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Badge 1: CyberOps Associate */}
              <div className="p-4 rounded-xl border border-cyan-500/30 bg-[#05070a] hover:border-cyan-400 transition-all space-y-3 flex flex-col justify-between group">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-cyan-950/70 text-cyan-300 border border-cyan-500/30">
                      CISCO BADGE
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">Sep 06, 2022</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <img
                      src="https://images.credly.com/images/53f37f83-04a1-4935-9b1e-21a99cc6e1b2/linkedin_thumb_CyberOpsAssoc.png"
                      alt="CyberOps Associate Badge"
                      className="w-14 h-14 object-contain rounded-lg shrink-0 group-hover:scale-105 transition-transform"
                    />
                    <div>
                      <h4 className="font-bold text-white text-sm group-hover:text-cyan-300 transition-colors">
                        CyberOps Associate
                      </h4>
                      <p className="text-[11px] text-slate-400">Cisco Networking Academy</p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    SOC operational protocols, network intrusion detection, threat intelligence, and digital forensic analysis.
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-500">ID: 5f990777</span>
                  <a
                    href="https://www.credly.com/badges/5f990777-8796-4ff3-8ff0-6abb284d880f"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1 text-xs font-mono text-cyan-300 bg-cyan-950/60 hover:bg-cyan-900/60 border border-cyan-500/40 rounded-lg flex items-center gap-1.5 transition"
                  >
                    <span>Verify Badge</span>
                    <ExternalLink className="w-3 h-3 text-cyan-400" />
                  </a>
                </div>
              </div>

              {/* Badge 2: Cybersecurity Essentials */}
              <div className="p-4 rounded-xl border border-cyan-500/30 bg-[#05070a] hover:border-cyan-400 transition-all space-y-3 flex flex-col justify-between group">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-cyan-950/70 text-cyan-300 border border-cyan-500/30">
                      CISCO BADGE
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">Jan 16, 2022</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <img
                      src="https://images.credly.com/images/054913b2-e271-49a2-a1a4-9bf1c1f9a404/linkedin_thumb_CyberEssentials.png"
                      alt="Cybersecurity Essentials Badge"
                      className="w-14 h-14 object-contain rounded-lg shrink-0 group-hover:scale-105 transition-transform"
                    />
                    <div>
                      <h4 className="font-bold text-white text-sm group-hover:text-cyan-300 transition-colors">
                        Cybersecurity Essentials
                      </h4>
                      <p className="text-[11px] text-slate-400">Cisco Networking Academy</p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    Defense mechanisms, confidentiality guarantees, cryptography, and vulnerability mitigation across modern systems.
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-500">ID: 602272d5</span>
                  <a
                    href="https://www.credly.com/badges/602272d5-f03d-4142-8f61-9e2ecc14cf83"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1 text-xs font-mono text-cyan-300 bg-cyan-950/60 hover:bg-cyan-900/60 border border-cyan-500/40 rounded-lg flex items-center gap-1.5 transition"
                  >
                    <span>Verify Badge</span>
                    <ExternalLink className="w-3 h-3 text-cyan-400" />
                  </a>
                </div>
              </div>

              {/* Badge 3: Learn-A-Thon 2020 */}
              <div className="p-4 rounded-xl border border-cyan-500/30 bg-[#05070a] hover:border-cyan-400 transition-all space-y-3 flex flex-col justify-between group">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-cyan-950/70 text-cyan-300 border border-cyan-500/30">
                      CISCO BADGE
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">Aug 13, 2020</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <img
                      src="https://images.credly.com/images/6f20f78c-c26c-4536-9d4c-4fb60cbe4044/linkedin_thumb_learnathon.png"
                      alt="Networking Academy Learn-A-Thon Badge"
                      className="w-14 h-14 object-contain rounded-lg shrink-0 group-hover:scale-105 transition-transform"
                    />
                    <div>
                      <h4 className="font-bold text-white text-sm group-hover:text-cyan-300 transition-colors">
                        Learn-A-Thon 2020
                      </h4>
                      <p className="text-[11px] text-slate-400">Cisco Networking Academy</p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    Global recognition for excellence in network infrastructure and foundational cybersecurity literacies.
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-500">ID: 7b85d11c</span>
                  <a
                    href="https://www.credly.com/badges/7b85d11c-0b54-4cfb-9ce0-4f953fdbea40"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1 text-xs font-mono text-cyan-300 bg-cyan-950/60 hover:bg-cyan-900/60 border border-cyan-500/40 rounded-lg flex items-center gap-1.5 transition"
                  >
                    <span>Verify Badge</span>
                    <ExternalLink className="w-3 h-3 text-cyan-400" />
                  </a>
                </div>
              </div>
            </div>

            {/* Partner Certificate Highlight */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
              <div className="p-3 rounded-xl border border-slate-800 bg-[#05070a]/80 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-indigo-400 font-semibold">CERTIFICATE</span>
                  <h5 className="font-bold text-white text-xs">Partner: NDG Linux Essentials</h5>
                  <p className="text-[11px] text-slate-400">Issued: Jul 07, 2021 · NDG & Cisco Academy</p>
                </div>
                <span className="text-[10px] font-mono text-slate-500">CLI & Linux</span>
              </div>

              <div className="p-3 rounded-xl border border-slate-800 bg-[#05070a]/80 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-cyan-400 font-semibold">CERTIFICATE</span>
                  <h5 className="font-bold text-white text-xs">Introduction to Cybersecurity</h5>
                  <p className="text-[11px] text-slate-400">Issued: Jul 23, 2020 · Cisco Academy</p>
                </div>
                <span className="text-[10px] font-mono text-slate-500">Cyber Hygiene</span>
              </div>
            </div>
          </div>

          {/* Timeline Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {experiences.map((exp) => (
              <div
                key={exp.id}
                className={`p-5 rounded-2xl border transition-all flex flex-col justify-between group ${
                  exp.type === 'cyber'
                    ? 'border-indigo-500/40 bg-indigo-950/15 hover:border-indigo-400'
                    : 'border-slate-800 hover:border-cyan-500/30 bg-[#0d1017]/70 hover:bg-[#0d1017]'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        {exp.type === 'cyber' && (
                          <ShieldCheck className="w-4 h-4 text-indigo-400 shrink-0" />
                        )}
                        <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                          {exp.role}
                        </h3>
                      </div>
                      <p className={`text-xs font-mono mt-0.5 ${exp.type === 'cyber' ? 'text-indigo-400 font-semibold' : 'text-cyan-400'}`}>
                        {exp.organization}
                      </p>
                    </div>
                    <div className="shrink-0">
                      <span className="text-[11px] font-mono text-slate-400">
                        {exp.period}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {exp.description}
                  </p>
                </div>

                {/* Unboxed Tags */}
                <div className="pt-4 mt-3 border-t border-slate-800/80 flex flex-wrap items-center gap-2 text-[11px] text-slate-400">
                  {exp.tags.map((tag, idx) => (
                    <React.Fragment key={tag}>
                      <span className={exp.type === 'cyber' ? 'text-indigo-300 font-mono' : 'text-slate-300'}>
                        {tag}
                      </span>
                      {idx < exp.tags.length - 1 && <span className="text-slate-600" aria-hidden="true">·</span>}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PROJECTS SHOWCASE SECTION */}
        <section id="projects" className="space-y-6 scroll-mt-24">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                <span>03. PORTFOLIO & RESEARCH</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Featured Projects & Research
              </h2>
            </div>

            {/* Interactive Filter Tabs */}
            <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-xl self-start sm:self-auto">
              <button
                onClick={() => setProjectFilter('all')}
                className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-colors ${
                  projectFilter === 'all'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setProjectFilter('cyber')}
                className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-colors ${
                  projectFilter === 'cyber'
                    ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Cyber & AI
              </button>
              <button
                onClick={() => setProjectFilter('web')}
                className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-colors ${
                  projectFilter === 'web'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Web & Algorithms
              </button>
              <button
                onClick={() => setProjectFilter('content')}
                className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-colors ${
                  projectFilter === 'content'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Design & Content
              </button>
            </div>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className={`group relative rounded-2xl border transition-all duration-300 ease-out overflow-hidden flex flex-col justify-between hover:-translate-y-1.5 cursor-pointer ${
                  project.category === 'cyber'
                    ? 'border-indigo-500/30 hover:border-indigo-400 hover:shadow-[0_0_30px_rgba(99,102,241,0.35)] bg-[#0d1017]/90 hover:bg-[#0e131d]'
                    : 'border-slate-800 hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(0,240,255,0.35)] bg-[#0d1017]/80 hover:bg-[#0c121e]'
                }`}
              >
                {/* Cyber Card Top Glow Hairline */}
                <div className={`absolute top-0 inset-x-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 ${
                  project.category === 'cyber'
                    ? 'bg-gradient-to-r from-transparent via-indigo-400 to-transparent'
                    : 'bg-gradient-to-r from-transparent via-cyan-400 to-transparent'
                }`} />

                <div>
                  {/* Image container */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-950 border-b border-slate-800">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        const target = e.currentTarget;
                        target.onerror = null;
                        target.src = '/img/cyber_hero.jpg';
                      }}
                    />
                    <div className="absolute top-3 left-3">
                      <span className={`text-[10px] font-mono font-semibold uppercase px-2 py-0.5 rounded backdrop-blur ${
                        project.category === 'cyber'
                          ? 'bg-indigo-950/80 text-indigo-300 border border-indigo-500/40'
                          : 'bg-black/75 text-cyan-300 border border-cyan-500/30'
                      }`}>
                        {project.categoryLabel}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-2">
                    <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* Footer with Unboxed Metadata & Safe External Links */}
                <div className="px-5 pb-5 pt-2 flex items-center justify-between border-t border-slate-800/80">
                  <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-slate-400">
                    <span>{project.tags[0]}</span>
                    <span className="text-slate-600">·</span>
                    <span>{project.tags[1] || 'Tech'}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>

                    {project.link ? (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1 text-xs font-mono text-cyan-400 hover:text-cyan-300 bg-cyan-950/40 hover:bg-cyan-900/60 border border-cyan-500/30 rounded-lg transition flex items-center gap-1"
                      >
                        {project.linkType === 'github' ? (
                          <>
                            <Github className="w-3.5 h-3.5" />
                            <span>Repo</span>
                          </>
                        ) : (
                          <>
                            <Instagram className="w-3.5 h-3.5" />
                            <span>Post</span>
                          </>
                        )}
                        <ExternalLink className="w-3 h-3 text-cyan-500" />
                      </a>
                    ) : (
                      <span className="text-[10px] font-mono text-indigo-400 px-2 py-0.5 rounded bg-indigo-950/40 border border-indigo-500/20">
                        BSSN Lab
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT FORM SECTION */}
        <section id="contact" className="space-y-6 scroll-mt-24">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
              <span>04. COLLABORATE & CONNECT</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Get in Touch
            </h2>
            <p className="text-xs text-slate-400">
              Available for penetration testing consultations, secure software engineering, and strategic tech communication projects.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Contact Details */}
            <div className="md:col-span-5 space-y-4">
              <div className="p-5 rounded-2xl border border-slate-800 bg-[#0d1017]/70 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 font-mono">Personal Email</span>
                    <p className="text-sm font-semibold text-white">fauzanlangga54@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                    <Instagram className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 font-mono">Official Instagram</span>
                    <a
                      href="https://www.instagram.com/fauzanlangga/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-cyan-300 hover:underline flex items-center gap-1"
                    >
                      @fauzanlangga
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                    <Github className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 font-mono">Source Repositories</span>
                    <a
                      href="https://github.com/fauzanlangga"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-cyan-300 hover:underline flex items-center gap-1"
                    >
                      github.com/fauzanlangga
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="md:col-span-7">
              <form
                onSubmit={handleContactSubmit}
                className={`p-6 rounded-2xl border bg-[#0d1017]/90 space-y-4 transition-colors ${
                  isTerminal ? 'border-[#ff7597]/30 shadow-[0_0_30px_rgba(255,117,151,0.06)]' : 'border-slate-800'
                }`}
              >
                {formStatus === 'success' && (
                  <div className="p-4 rounded-xl bg-indigo-950/70 border border-indigo-500/50 text-indigo-200 text-xs space-y-2 animate-in fade-in">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <p className="font-semibold text-white">Pesan Berhasil Terkirim!</p>
                        <p className="text-indigo-300/90 leading-relaxed">{formFeedback}</p>
                      </div>
                    </div>
                    <div className="pt-2 flex items-center justify-end">
                      <button
                        type="button"
                        onClick={() => setFormStatus('idle')}
                        className="text-[11px] font-mono text-indigo-300 hover:text-white underline underline-offset-2"
                      >
                        Kirim pesan lainnya &rarr;
                      </button>
                    </div>
                  </div>
                )}

                {formStatus === 'error' && (
                  <div className="p-4 rounded-xl bg-red-950/70 border border-red-500/50 text-red-200 text-xs space-y-3 animate-in fade-in">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <p className="font-semibold text-white">Pengiriman Pesan Terkendala</p>
                        <p className="text-red-300/90 leading-relaxed">{formFeedback}</p>
                      </div>
                    </div>
                    <div className="pt-1 flex items-center gap-2">
                      <a
                        href={`mailto:fauzanlangga54@gmail.com?subject=${encodeURIComponent(`Project Inquiry - ${formName || 'Portfolio Visitor'}`)}&body=${encodeURIComponent(formMessage || '')}`}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition ${
                          isTerminal 
                            ? 'bg-[#ff7597]/20 border border-[#ff7597]/40 text-[#ff7597] hover:bg-[#ff7597]/30'
                            : 'bg-cyan-950 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-900'
                        }`}
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>Kirim Langsung via Email Client</span>
                      </a>
                    </div>
                  </div>
                )}

                <div className="space-y-1.5">
                  <label htmlFor="contact-name" className={`text-xs font-mono ${isTerminal ? 'text-[#ff7597]' : 'text-slate-300'}`}>
                    Nama Lengkap / Full Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    placeholder="Masukkan nama lengkap Anda"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className={`w-full bg-[#05070a] border rounded-xl px-4 py-2.5 text-xs text-slate-100 placeholder-slate-600 focus:outline-none transition ${
                      isTerminal
                        ? 'border-[#ff7597]/30 focus:border-[#ff7597] focus:ring-1 focus:ring-[#ff7597]/30'
                        : 'border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30'
                    }`}
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-email" className={`text-xs font-mono ${isTerminal ? 'text-[#ff7597]' : 'text-slate-300'}`}>
                    Alamat Email / Email Address <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    placeholder="nama@perusahaan.com atau nama@email.com"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    className={`w-full bg-[#05070a] border rounded-xl px-4 py-2.5 text-xs text-slate-100 placeholder-slate-600 focus:outline-none transition ${
                      isTerminal
                        ? 'border-[#ff7597]/30 focus:border-[#ff7597] focus:ring-1 focus:ring-[#ff7597]/30'
                        : 'border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30'
                    }`}
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-message" className={`text-xs font-mono ${isTerminal ? 'text-[#ff7597]' : 'text-slate-300'}`}>
                    Pesan / Project Inquiry / Cybersecurity Scope <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    placeholder="Tuliskan detail kebutuhan konsultasi penetration testing, secure software engineering, atau kolaborasi konten..."
                    value={formMessage}
                    onChange={(e) => setFormMessage(e.target.value)}
                    className={`w-full bg-[#05070a] border rounded-xl px-4 py-2.5 text-xs text-slate-100 placeholder-slate-600 focus:outline-none transition resize-none ${
                      isTerminal
                        ? 'border-[#ff7597]/30 focus:border-[#ff7597] focus:ring-1 focus:ring-[#ff7597]/30'
                        : 'border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30'
                    }`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={formStatus === 'loading'}
                  className={`w-full py-3 font-bold font-mono text-xs rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed ${
                    isTerminal
                      ? 'bg-[#ff7597] hover:bg-[#ff8fa9] text-black shadow-[0_0_20px_rgba(255,117,151,0.35)]'
                      : 'bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-black shadow-[0_0_20px_rgba(0,240,255,0.3)]'
                  }`}
                >
                  {formStatus === 'loading' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Mengirim ke Google Spreadsheet...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Kirim Pesan Sekarang</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-800/80 bg-[#05070a] py-8 mt-24 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-slate-400">
            © {new Date().getFullYear()} Ahmad Fauzan Langga. Content Creator · Software Engineer · Cyber Security Specialist.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/fauzanlangga"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-cyan-400 transition"
            >
              GitHub
            </a>
            <a
              href="https://www.instagram.com/fauzanlangga/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-cyan-400 transition"
            >
              Instagram
            </a>
            <a
              href="mailto:fauzanlangga54@gmail.com"
              className="text-slate-400 hover:text-cyan-400 transition"
            >
              Email
            </a>
          </div>
        </div>
      </footer>


      {/* MODAL: Project Lightbox */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#0c0e15] border border-cyan-500/40 rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wide">
                  {selectedProject.categoryLabel}
                </span>
                <h3 className="text-lg font-bold text-white">{selectedProject.title}</h3>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="aspect-video w-full rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
              <img
                src={selectedProject.imageUrl}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.onerror = null;
                  target.src = '/img/cyber_hero.jpg';
                }}
              />
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {selectedProject.description}
            </p>

            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 pt-2 border-t border-slate-800">
              {selectedProject.tags.map((t, i) => (
                <React.Fragment key={t}>
                  <span className="text-cyan-300 font-mono">{t}</span>
                  {i < selectedProject.tags.length - 1 && <span className="text-slate-600">·</span>}
                </React.Fragment>
              ))}
            </div>

            {selectedProject.link && (
              <div className="pt-2 flex justify-end">
                <a
                  href={selectedProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-cyan-400 hover:bg-cyan-300 text-black font-mono font-bold text-xs rounded-lg transition flex items-center gap-2"
                >
                  <span>Open Direct Link</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
