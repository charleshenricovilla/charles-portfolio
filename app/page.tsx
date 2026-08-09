"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, FileText, Code, Award, Briefcase, MapPin, GraduationCap, Star, ChevronRight } from "lucide-react";

// --- SMART IMAGE FALLBACK COMPONENT ---
const ImageWithFallback = ({ src, alt, fallbackText, imgClass, containerClass }: any) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div className={`flex items-center justify-center bg-white/[0.02] ${containerClass}`}>
        <span className="text-zinc-500 font-mono text-sm text-center px-4">{fallbackText}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={imgClass}
      onError={() => setHasError(true)}
    />
  );
};

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("intro");
  const [eventIndex, setEventIndex] = useState(0);

  // Intersection Observer for the Scroll-Spy Navigation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -75% 0px", threshold: 0 } 
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  // Alternating Events Timer (Now loops through 3 events)
  useEffect(() => {
    const eventInterval = setInterval(() => {
      setEventIndex((prev) => (prev + 1) % notableEvents.length);
    }, 5000);
    return () => clearInterval(eventInterval);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navItems = [
    { id: "intro", label: "Intro" },
    { id: "apps", label: "Featured Works" },
    { id: "work", label: "Experience" },
    { id: "certs", label: "Certificates & Events" },
    { id: "extra", label: "Extracurricular" },
  ];

  // --- PREMIUM ANIMATIONS (Triggers on scroll up & down) ---
  const slideUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } 
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  // Data for Alternating Events
  const notableEvents = [
    {
      image: "/event-ateneo.jpg",
      badge: "1st Runner Up",
      title: "Ateneo MISA Case Competition (2025)",
      desc: "Secured a podium finish in a tech-field business case competition focusing on RCBC Bank. Proposed digital transformation strategies and financial tech solutions to solve real-world banking challenges."
    },
    {
      image: "/MLMI.JPG",
      badge: "Best Presentation",
      title: "MLMI 2026, Japan",
      desc: "Presented Explainable AI for Sugarcane Biotic Stress. Engineered a deep learning application to detect diseases with visual XAI heatmaps, earning the Best Presentation award."
    },
    {
      image: "/IPB_BP.JPEG",
      badge: "Best Software Presentation",
      title: "Institute of Plant Breeding (2025)",
      desc: "Awarded Best Software Presentation during the IPB internship for developing the IRIS machine learning chemometrics system, streamlining research workflows."
    }
  ];

  return (
    <div className="min-h-screen bg-[#030014] text-zinc-50 font-sans selection:bg-purple-500/30 pb-20 overflow-hidden relative">
      
      {/* --- AMBIENT BACKGROUND GLOWS --- */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-700/20 blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-700/20 blur-[120px] pointer-events-none" />
      <div className="fixed top-[40%] left-[50%] translate-x-[-50%] w-[60%] h-[20%] rounded-full bg-indigo-900/10 blur-[150px] pointer-events-none" />

      {/* --- FLOATING NAVIGATION BAR --- */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#030014]/60 backdrop-blur-xl border-b border-white/[0.05]">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between overflow-x-auto no-scrollbar">
          <div className="font-bold text-2xl tracking-tight hidden md:block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            CHV.
          </div>
          <ul className="flex items-center gap-2 mx-auto md:mx-0">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollToSection(item.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                    activeSection === item.id
                      ? "bg-white/10 text-white shadow-[0_0_15px_rgba(168,85,247,0.2)]"
                      : "text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.05]"
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 pt-32 relative z-10">
        
        {/* --- 1. INTRO SECTION --- */}
        <section id="intro" className="min-h-[85vh] flex flex-col justify-center py-10 scroll-mt-32">
          {/* NOTE: viewport={{ once: false, amount: 0.1 }} makes it animate every time you scroll! */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.1 }} variants={staggerContainer} className="flex flex-col-reverse md:flex-row items-center gap-16">
            
            <motion.div variants={slideUp} className="flex-1 space-y-8">
              {/* <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] text-sm text-zinc-300 backdrop-blur-md shadow-lg shadow-black/20">
                <GraduationCap size={16} className="text-purple-400" />
                <span>UP Los Baños (BS Computer Science, Class of 2026)</span>
              </div> */}
              
              <div className="space-y-4">
                <p className="text-blue-400 font-mono text-sm uppercase tracking-widest">Hi, I'm</p>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                  Charles Henrico <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-purple-600">Villa.</span>
                </h1>
                <p className="text-xl md:text-2xl font-medium text-zinc-400">
                  I engineer <span className="text-white">intelligent solutions</span> for the web.
                </p>
              </div>
              
              <p className="text-zinc-400 leading-relaxed max-w-xl text-sm md:text-base border-l-2 border-purple-500/50 pl-4">
                I build transparent, human-centered tech using advanced machine learning, deep learning, and explainable AI (XAI). By combining technical engineering with full-stack team leadership, I turn complex data into clear, impactful solutions.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                {["Machine Learning", "Data Science", "React / Next.js", "Python (CNNs)", "XAI", "UI/UX Design"].map(skill => (
                  <span key={skill} className="text-sm font-medium bg-white/[0.03] border border-white/[0.05] text-zinc-300 px-4 py-2 rounded-lg hover:border-purple-500/50 hover:bg-white/[0.08] transition-colors cursor-default">
                    {skill}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <a 
                  href="https://docs.google.com/document/d/1BTe7hL6sZwLTzc7ju7-PBCTgth3IhhSF-Tc0WZf3YYM/edit?usp=sharing" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] hover:-translate-y-1"
                >
                  <FileText size={20} /> View Resume
                </a>
                <a href="mailto:charleshenricovilla@gmail.com" className="flex items-center gap-2 bg-white/[0.03] hover:bg-white/[0.08] text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 border border-white/[0.08] hover:border-white/[0.2] hover:-translate-y-1">
                  <Mail size={20} /> Let's Talk
                </a>
              </div>
            </motion.div>

            {/* --- OVERLAPPING CUTOUT IMAGE --- */}
            <motion.div variants={slideUp} className="w-72 h-72 md:w-96 md:h-96 relative flex-shrink-0 flex items-end justify-center mt-12 md:mt-0">
              
              {/* Outer Ambient Glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-full blur-3xl opacity-40 animate-pulse"></div>
              
              {/* Solid Background Circle (Replaces the container box) */}
              <div className="absolute inset-x-2 top-8 bottom-0 rounded-full bg-gradient-to-br from-blue-600/80 to-purple-700/80 backdrop-blur-md shadow-2xl border border-white/20" />

              {/* Foreground Transparent Image overlapping the circle */}
              <div className="relative z-10 w-[115%] h-auto drop-shadow-[0_20px_30px_rgba(0,0,0,0.6)] pointer-events-none -mb-4">
                {/* Changed to profile-sablay.png assuming you removed the background */}
                <ImageWithFallback 
                  src="/profile-sablay.png" 
                  alt="Charles Sablay Pic" 
                  fallbackText="[Save as profile-sablay.png]" 
                  imgClass="w-full h-auto object-contain object-bottom scale-135" 
                  containerClass="w-full h-full aspect-square rounded-full"
                />
              </div>

            </motion.div>
          </motion.div>
        </section>

        {/* --- 2. FEATURED ENGINEERING WORKS --- */}
        <section id="apps" className="py-24 scroll-mt-24 relative">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.1 }} variants={staggerContainer}>
            
            <motion.div variants={slideUp} className="mb-12">
              <p className="text-purple-400 font-mono text-sm uppercase tracking-widest mb-2">My Portfolio</p>
              <h2 className="text-4xl md:text-5xl font-bold text-white flex items-center gap-4">
                Featured Works <div className="h-[1px] flex-1 bg-gradient-to-r from-white/20 to-transparent"></div>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: "Explainable AI for Sugarcane Biotic Stress",
                  tag: "Deep Learning • XAI",
                  desc: "Engineered a web application utilizing CNNs to detect biotic stress on sugarcane leaf images. Integrated Explainable AI (XAI) techniques to generate visual heatmaps for transparent, data-driven disease identification.",
                  image: "/XAI.png" 
                },
                {
                  title: "DMI Toronto Web Deployment",
                  tag: "Full Stack • Node.js • React",
                  desc: "Spearheaded a 5-person development team to deliver a full-stack platform for a Canadian non-profit church. Managed the end-to-end SDLC and translated client business requirements into technical specs.",
                  image: "/DMI.png"
                },
                {
                  title: "IRIS (Institute of Plant Breeding)",
                  tag: "Python • PySide6 • UI/UX",
                  desc: "Developed a modern, user-centric software interface for machine learning-based plant analysis. Democratized access to the Partial Least Squares (PLS) algorithm, allowing non-technical researchers to perform complex spectral analysis easily.",
                  image: "/IRIS.png"
                },
                {
                  title: "SpectroAC: ML Chemometrics System",
                  tag: "R Shiny • XGBoost • PLSR",
                  desc: "Engineered an interactive web application utilizing advanced machine learning algorithms to predict Amylose Content and Glycemic Index from spectral data. Features automated pipelines for rapid, non-destructive nutritional profiling.",
                  image: "/SpectroAC.png"
                },
                {
                  title: "AKAP Donation Drive Website",
                  tag: "Blockchain • Immutable Ledger",
                  desc: "Led the development of a secure React.js donation platform integrated with blockchain technology to create an immutable ledger for absolute financial transparency and tamper-proof tracking of charitable funds.",
                  image: "/AKAP.png"
                },
                {
                  title: "YSEC Alumni Relations Portal",
                  tag: "React.js • Database Management",
                  desc: "Designed and developed a robust React.js platform for the Young Software Engineers' Society to facilitate professional networking and database management between alumni and the organization.",
                  image: "/YSEC.png"
                }
              ].map((app, i) => (
                <motion.div key={i} variants={slideUp} whileHover={{ y: -8 }} className="bg-white/[0.02] border border-white/[0.05] rounded-2xl overflow-hidden group hover:bg-white/[0.04] hover:border-purple-500/30 transition-all duration-500 flex flex-col cursor-pointer backdrop-blur-sm relative shadow-2xl">
                  
                  {/* Subtle hover gradient inside card */}
                  <div className="absolute inset-0 bg-gradient-to-b from-purple-500/0 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div className="h-64 border-b border-white/[0.05] relative bg-[#0a0a14] overflow-hidden p-4">
                    <div className="w-full h-full rounded-xl overflow-hidden transform group-hover:scale-105 transition-transform duration-700 ease-out">
                      <ImageWithFallback 
                        src={app.image} 
                        alt={app.title} 
                        fallbackText={`[Upload ${app.image.replace('/', '')}]`} 
                        imgClass="w-full h-full object-cover object-top" 
                        containerClass="w-full h-full"
                      />
                    </div>
                  </div>

                  <div className="p-8 flex-1 flex flex-col relative z-10">
                    <p className="text-purple-400 font-mono text-xs mb-3 uppercase tracking-wider font-bold">{app.tag}</p>
                    <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all">{app.title}</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">{app.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* --- 3. WORK EXPERIENCE --- */}
        <section id="work" className="py-24 scroll-mt-24 relative">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.1 }} variants={staggerContainer}>
            
            <motion.div variants={slideUp} className="mb-12">
              <p className="text-blue-400 font-mono text-sm uppercase tracking-widest mb-2">My Journey</p>
              <h2 className="text-4xl md:text-5xl font-bold text-white flex items-center gap-4">
                Work Experience <div className="h-[1px] flex-1 bg-gradient-to-r from-white/20 to-transparent"></div>
              </h2>
            </motion.div>

            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-12 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">

              {[
                {
                  role: "Project Manager",
                  company: "DMI Toronto Web Deployment",
                  date: "Jan 2025 - Jun 2025",
                  logo: "/logo-dmi.png",
                  desc: "Spearheaded a 5-person development team to deliver a full-stack React/Node.js platform for a Canadian non-profit church. Managed the end-to-end SDLC, translated client business requirements into technical specifications, and ensured successful deployment within strict budget and timeline constraints."
                },
                {
                  role: "Full Stack Developer (Internship)",
                  company: "Institute of Plant Breeding",
                  date: "2025",
                  logo: "/logo-ipb.png",
                  desc: "Developed 'IRIS', a user-centric software interface using Python (PySide6) for machine learning-based plant analysis. Streamlined complex research workflows by replacing convoluted menus with a linear, step-by-step process."
                },
                {
                  role: "MyCode Instructor",
                  company: "Freelance / Educational",
                  date: "2023",
                  logo: "/logo-mycode.png",
                  desc: "Taught Python and web programming to beginners. Translated complex algorithmic logic into accessible, digestible lessons for students with no prior technical background."
                }
              ].map((job, i) => (
                <motion.div key={i} variants={slideUp} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  
                  {/* Timeline Dot */}
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/20 bg-[#0a0a14] group-hover:border-purple-500 group-hover:bg-purple-500/20 text-purple-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 transition-colors duration-300 z-10 relative left-7 md:left-0">
                    <Briefcase size={16} />
                  </div>
                  
                  {/* Job Card */}
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 md:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-sm hover:bg-white/[0.04] hover:border-white/10 transition-colors shadow-xl ml-14 md:ml-0">
                    <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center mb-4">
                      <div className="w-16 h-16 rounded-xl overflow-hidden border border-white/10 bg-white p-2 shrink-0">
                        <ImageWithFallback src={job.logo} alt={job.company} fallbackText="Logo" imgClass="w-full h-full object-contain" containerClass="w-full h-full" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">{job.role}</h3>
                        <p className="text-purple-400 font-medium text-sm">{job.company}</p>
                      </div>
                      <div className="sm:ml-auto text-xs font-mono text-zinc-500 bg-white/[0.05] px-3 py-1 rounded-full whitespace-nowrap">
                        {job.date}
                      </div>
                    </div>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                      {job.desc}
                    </p>
                  </div>
                </motion.div>
              ))}

            </div>
          </motion.div>
        </section>

        {/* --- 4. CERTIFICATES & EVENTS --- */}
        <section id="certs" className="py-24 scroll-mt-24 relative">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.1 }} variants={staggerContainer}>
            
            <motion.div variants={slideUp} className="mb-12">
              <p className="text-purple-400 font-mono text-sm uppercase tracking-widest mb-2">Recognition</p>
              <h2 className="text-4xl md:text-5xl font-bold text-white flex items-center gap-4">
                Certs & Events <div className="h-[1px] flex-1 bg-gradient-to-r from-white/20 to-transparent"></div>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Certs Column */}
              <div className="lg:col-span-5 space-y-4">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <FileText size={20} className="text-purple-400" /> Certifications
                </h3>
                {[
                  { name: "UI/UX Design & Design Principles", year: "2026", desc: "Alison Certification. Mastered user-centric methodologies, wireframing, and visual hierarchy." },
                  { name: "GoTyme AI in Fintech", year: "2025", desc: "Specialized knowledge in AI applications within digital banking trends and automation." },
                  { name: "Google Developer Certification", year: "2024", desc: "Validating proficiency in Google's developer ecosystem and modern cloud technologies." },
                  { name: "Prompt Engineering Masterclass", year: "2023", desc: "Advanced training in LLM interaction and prompt optimization for generative AI tasks." }
                ].map((cert, i) => (
                  <motion.div variants={slideUp} key={i} className="bg-white/[0.02] border border-white/[0.05] p-5 rounded-xl flex gap-4 items-start hover:bg-white/[0.05] hover:border-white/[0.1] transition-colors backdrop-blur-sm group">
                    <Award className="text-blue-500 flex-shrink-0 mt-1 group-hover:scale-110 transition-transform" size={20} />
                    <div>
                      <h4 className="font-bold text-zinc-100">{cert.name} <span className="text-zinc-500 font-normal text-xs ml-2 font-mono">[{cert.year}]</span></h4>
                      <p className="text-sm text-zinc-400 mt-2 leading-relaxed">{cert.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Alternating Events Column */}
              <motion.div variants={slideUp} className="lg:col-span-7 flex flex-col h-full">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <MapPin size={20} className="text-blue-400" /> Notable Events
                </h3>
                
                <div className="relative flex-1 min-h-[450px] bg-white/[0.02] border border-white/[0.05] rounded-2xl overflow-hidden shadow-2xl group hover:border-purple-500/30 transition-colors backdrop-blur-sm">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={eventIndex}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      className="absolute inset-0 flex flex-col"
                    >
                      <div className="h-3/5 border-b border-white/[0.05] relative overflow-hidden bg-[#0a0a14]">
                        <div className="w-full h-full">
                          <ImageWithFallback 
                            src={notableEvents[eventIndex].image} 
                            alt={notableEvents[eventIndex].title} 
                            fallbackText={`[Upload ${notableEvents[eventIndex].image.replace('/', '')}]`} 
                            imgClass="w-full h-full object-cover" 
                            containerClass="w-full h-full"
                          />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a14] via-transparent to-transparent"></div>
                        <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold px-4 py-2 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                          {notableEvents[eventIndex].badge}
                        </div>
                      </div>

                      <div className="p-8 flex-1 flex flex-col justify-center">
                        <h4 className="text-2xl font-bold text-white mb-3">
                          {notableEvents[eventIndex].title}
                        </h4>
                        <p className="text-base text-zinc-400 leading-relaxed">
                          {notableEvents[eventIndex].desc}
                        </p>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                  
                  {/* Slider dots indicator */}
                  <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-3 z-10">
                    {notableEvents.map((_, idx) => (
                      <button 
                        key={idx} 
                        onClick={() => setEventIndex(idx)}
                        className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${idx === eventIndex ? 'bg-purple-500 w-8' : 'bg-white/20 hover:bg-white/40'}`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* --- 5. EXTRACURRICULAR --- */}
        <section id="extra" className="py-24 scroll-mt-24 relative">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.1 }} variants={staggerContainer}>
            
            <motion.div variants={slideUp} className="mb-12">
              <p className="text-blue-400 font-mono text-sm uppercase tracking-widest mb-2">Beyond Code</p>
              <h2 className="text-4xl md:text-5xl font-bold text-white flex items-center gap-4">
                Leadership <div className="h-[1px] flex-1 bg-gradient-to-r from-white/20 to-transparent"></div>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  role: "Co-Head of External Affairs",
                  org: "Alpha Sigma",
                  year: "2025",
                  desc: "Directed strategic partnerships and negotiated collaborations expanding the organization's educational and community reach."
                },
                {
                  role: "Master of Initiation",
                  org: "Alpha Sigma",
                  year: "2024",
                  desc: "Spearheaded the recruitment process, managing the end-to-end talent acquisition pipeline and safety protocols."
                },
                {
                  role: "Recruitment & Event Host",
                  org: "YSES",
                  year: "2024-2025",
                  desc: "Executed onboarding processes for new members and served as Master of Ceremonies for major events."
                },
                {
                  role: "Finance Officer-in-Charge",
                  org: "Umalohokan Inc.",
                  year: "2023",
                  desc: "Oversaw total financial operations, budget allocation, fund management, ensuring fiscal responsibility."
                },
                {
                  role: "Cast & Resident Member",
                  org: "Theatrical Productions",
                  year: "2022-Pres",
                  desc: "Balanced rigorous academics with rehearsals for 'Alimpuyo', 'K-Town', and 'Mayo Uno', demonstrating high discipline."
                },
                {
                  role: "Audience Development Com.",
                  org: "Pilipinas Game Ka Na Ba",
                  year: "2024",
                  desc: "Coordinated logistics and engagement strategies for a large-scale event, handling crowd management."
                }
              ].map((item, i) => (
                <motion.div variants={slideUp} key={i} whileHover={{ y: -5 }} className="bg-white/[0.02] border border-white/[0.05] p-6 rounded-2xl hover:bg-white/[0.05] hover:border-white/[0.1] transition-all duration-300 backdrop-blur-sm group relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-purple-500/10 to-transparent rounded-bl-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <h4 className="font-bold text-white text-lg">{item.role}</h4>
                  <p className="text-blue-400 text-sm font-medium mb-4 flex items-center gap-2">
                    {item.org} <span className="text-zinc-600 text-xs font-mono">[{item.year}]</span>
                  </p>
                  <p className="text-zinc-400 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-white/10 mt-12 bg-black/20 backdrop-blur-lg">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-center items-center text-sm text-zinc-500">
          <p>© 2026 Charles Henrico Villa. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}