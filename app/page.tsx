"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, FileText, Code, Award, Briefcase, MapPin, GraduationCap, Star } from "lucide-react";

// --- SMART IMAGE FALLBACK COMPONENT ---
const ImageWithFallback = ({ src, alt, fallbackText, imgClass, containerClass }: any) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div className={`flex items-center justify-center bg-zinc-800 ${containerClass}`}>
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

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navItems = [
    { id: "intro", label: "Intro" },
    { id: "apps", label: "Featured Works" },
    { id: "work", label: "Work Experience" },
    { id: "certs", label: "Certificates & Events" },
    { id: "extra", label: "Extracurricular" },
  ];

  // --- UPGRADED ANIMATIONS ---
const slideUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } 
  };
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-blue-500/30 pb-20 overflow-hidden">
      
      {/* --- FLOATING NAVIGATION BAR --- */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between overflow-x-auto no-scrollbar">
          <div className="font-bold text-xl tracking-tight hidden md:block">CHV.</div>
          <ul className="flex items-center gap-1 md:gap-2 mx-auto md:mx-0">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollToSection(item.id)}
                  className={`px-3 md:px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                    activeSection === item.id
                      ? "bg-blue-600/10 text-blue-400"
                      : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 pt-28">
        
        {/* --- 1. INTRO SECTION --- */}
        <section id="intro" className="min-h-[85vh] flex flex-col justify-center py-10 scroll-mt-24">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="flex flex-col-reverse md:flex-row items-center gap-12">
            
            <motion.div variants={slideUp} className="flex-1 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-sm text-zinc-300">
                <GraduationCap size={16} className="text-blue-400" />
                <span>UP Los Baños (BS Computer Science, Class of 2026)</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-zinc-100">
                Charles Henrico Villa
              </h1>
              
              <p className="text-xl md:text-2xl font-medium text-zinc-400">
                Bridging the gap between <span className="text-blue-400">Deep Learning</span>, <span className="text-blue-400">Full-Stack Dev</span>, and <span className="text-blue-400">UI/UX</span>.
              </p>
              
              <p className="text-zinc-400 leading-relaxed max-w-lg">
                I build intelligent, accessible, and user-centric digital solutions. From training CNNs for agricultural biotic stress to deploying secure React architectures and optimizing UI/UX workflows, my character is defined by a passion for creating impactful, data-driven software.
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {["React / Next.js", "Python (CNNs)", "Node.js", "MongoDB & SQL", "Tailwind CSS", "UI/UX Design"].map(skill => (
                  <span key={skill} className="text-xs font-mono bg-zinc-900 text-zinc-300 px-3 py-1.5 rounded border border-zinc-800">{skill}</span>
                ))}
              </div>

              <div className="flex flex-wrap gap-4 pt-6">
                <a 
                  href="https://docs.google.com/document/d/1BTe7hL6sZwLTzc7ju7-PBCTgth3IhhSF-Tc0WZf3YYM/edit?usp=sharing" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-lg shadow-blue-500/20"
                >
                  <FileText size={20} /> View Resume
                </a>
                <a href="mailto:charleshenricovilla@gmail.com" className="flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 px-6 py-3 rounded-lg font-medium transition-colors border border-zinc-800">
                  <Mail size={20} /> Email Me
                </a>
              </div>
            </motion.div>

            {/* Sablay / Profile Picture with smooth fade */}
            <motion.div variants={slideUp} className="w-64 h-64 md:w-80 md:h-80 relative flex-shrink-0">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-emerald-400 rounded-full blur-2xl opacity-20 animate-pulse"></div>
              <div className="relative w-full h-full rounded-full border-4 border-zinc-900 shadow-2xl overflow-hidden bg-zinc-800">
                <ImageWithFallback 
                  src="/profile-sablay.jpg" 
                  alt="Charles Sablay Pic" 
                  fallbackText="[Upload profile-sablay.jpg]" 
                  imgClass="w-full h-full object-cover" 
                  containerClass="w-full h-full"
                />
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* --- 2. FEATURED ENGINEERING WORKS --- */}
        <section id="apps" className="py-24 scroll-mt-24 border-t border-zinc-900">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
            <motion.div variants={slideUp} className="flex items-center gap-3 mb-10">
              <Code className="text-blue-400" size={28} />
              <h2 className="text-3xl font-bold">Featured Engineering Works</h2>
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
                <motion.div key={i} variants={slideUp} className="bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden group hover:border-zinc-600 transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-2xl hover:shadow-zinc-900/50 flex flex-col cursor-pointer">
                  
                  {/* Image Container with Zoom effect */}
                  <div className="h-56 border-b border-zinc-800 relative bg-zinc-800 overflow-hidden">
                    <div className="w-full h-full transform group-hover:scale-105 transition-transform duration-700 ease-in-out">
                      <ImageWithFallback 
                        src={app.image} 
                        alt={app.title} 
                        fallbackText={`[Upload ${app.image.replace('/', '')}]`} 
                        imgClass="w-full h-full object-cover object-top" 
                        containerClass="w-full h-full"
                      />
                    </div>
                  </div>

                  <div className="p-8 flex-1 flex flex-col">
                    <p className="text-blue-400 font-mono text-xs mb-3 uppercase tracking-wider">{app.tag}</p>
                    <h3 className="text-2xl font-bold mb-4 text-zinc-100 group-hover:text-blue-400 transition-colors">{app.title}</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">{app.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* --- 3. WORK EXPERIENCE --- */}
        <section id="work" className="py-24 scroll-mt-24 border-t border-zinc-900">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
            <motion.div variants={slideUp} className="flex items-center gap-3 mb-10">
              <Briefcase className="text-blue-400" size={28} />
              <h2 className="text-3xl font-bold">Work Experience</h2>
            </motion.div>

            <div className="space-y-6">
              
              {/* Job 1 */}
              <motion.div variants={slideUp} className="flex flex-col md:flex-row gap-6 bg-zinc-900/50 border border-zinc-800 p-6 md:p-8 rounded-2xl hover:bg-zinc-900 transition-colors">
                <div className="w-24 h-24 rounded-xl flex-shrink-0 overflow-hidden border border-zinc-700 bg-zinc-800">
                   <ImageWithFallback src="/logo-dmi.png" alt="DMI Logo" fallbackText="[DMI Logo]" imgClass="w-full h-full object-contain bg-white p-2" containerClass="w-full h-full" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-zinc-100">Project Manager</h3>
                  <p className="text-blue-400 font-medium mb-4">DMI Toronto Web Deployment <span className="text-zinc-500 ml-2 text-sm">(Jan 2025 - Feb 2025)</span></p>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    Spearheaded a 5-person development team to deliver a full-stack React/Node.js platform for a Canadian non-profit church. Managed the end-to-end SDLC, translated client business requirements into technical specifications, and ensured successful deployment within strict budget and timeline constraints.
                  </p>
                </div>
              </motion.div>

              {/* Job 2 */}
              <motion.div variants={slideUp} className="flex flex-col md:flex-row gap-6 bg-zinc-900/50 border border-zinc-800 p-6 md:p-8 rounded-2xl hover:bg-zinc-900 transition-colors">
                <div className="w-24 h-24 rounded-xl flex-shrink-0 overflow-hidden border border-zinc-700 bg-zinc-800">
                   <ImageWithFallback src="/logo-ipb.png" alt="IPB Logo" fallbackText="[IPB Logo]" imgClass="w-full h-full object-contain bg-white p-2" containerClass="w-full h-full" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-zinc-100">Full Stack Developer (Internship)</h3>
                  <p className="text-blue-400 font-medium mb-4">Institute of Plant Breeding <span className="text-zinc-500 ml-2 text-sm">(2025)</span></p>
                  <ul className="list-disc list-inside text-zinc-400 text-sm leading-relaxed space-y-2">
                    <li><strong className="text-zinc-200">Modern UI/UX:</strong> Developed "IRIS" (Instantaneous Regression & Inference from Spectra), a user-centric software interface using Python (PySide6) for machine learning-based plant analysis.</li>
                    <li><strong className="text-zinc-200">Workflow Optimization:</strong> Streamlined complex research workflows by replacing convoluted menus with a linear, step-by-step process.</li>
                    <li><strong className="text-zinc-200">Accessibility:</strong> Democratized access to the Partial Least Squares (PLS) algorithm for non-technical researchers.</li>
                  </ul>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* --- 4. CERTIFICATES & EVENTS --- */}
        <section id="certs" className="py-24 scroll-mt-24 border-t border-zinc-900">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
            <motion.div variants={slideUp} className="flex items-center gap-3 mb-10">
              <Award className="text-blue-400" size={28} />
              <h2 className="text-3xl font-bold">Certificates & Events</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Certs Column */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-zinc-200 mb-6 flex items-center gap-2">
                  <FileText size={20} className="text-zinc-500" /> Professional Certifications
                </h3>
                {[
                  { name: "UI/UX Design & Design Principles", year: "2026", desc: "Alison Certification. Mastered user-centric methodologies, wireframing, and visual hierarchy." },
                  { name: "GoTyme AI in Fintech", year: "2025", desc: "Specialized knowledge in AI applications within digital banking trends and automation." },
                  { name: "Google Developer Certification", year: "2024", desc: "Validating proficiency in Google's developer ecosystem and modern cloud technologies." },
                  { name: "Prompt Engineering Masterclass", year: "2023", desc: "Advanced training in LLM interaction and prompt optimization for generative AI tasks." }
                ].map((cert, i) => (
                  <motion.div variants={slideUp} key={i} className="bg-zinc-900 border border-zinc-800 p-5 rounded-xl flex gap-4 items-start hover:border-zinc-700 transition-colors">
                    <Award className="text-blue-500 flex-shrink-0 mt-1" size={20} />
                    <div>
                      <h4 className="font-bold text-zinc-100">{cert.name} <span className="text-zinc-500 font-normal text-sm ml-1">({cert.year})</span></h4>
                      <p className="text-xs text-zinc-400 mt-1 leading-relaxed">{cert.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Events Column */}
              <motion.div variants={slideUp}>
                <h3 className="text-xl font-bold text-zinc-200 mb-6 flex items-center gap-2">
                  <MapPin size={20} className="text-zinc-500" /> Notable Events
                </h3>
                <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden group hover:border-zinc-700 transition-colors relative shadow-lg">
                  
                  <div className="h-56 border-b border-zinc-800 relative overflow-hidden bg-zinc-800">
                    <div className="w-full h-full transform group-hover:scale-105 transition-transform duration-700 ease-in-out">
                      <ImageWithFallback 
                        src="/event-ateneo.jpg" 
                        alt="Ateneo MISA" 
                        fallbackText="[Upload event-ateneo.jpg]" 
                        imgClass="w-full h-full object-cover" 
                        containerClass="w-full h-full"
                      />
                    </div>
                    <div className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">1st Runner Up</div>
                  </div>

                  <div className="p-6">
                    <h4 className="text-xl font-bold text-zinc-100 mb-2">Ateneo MISA Case Competition <span className="text-zinc-500 text-base font-normal">(2025)</span></h4>
                    <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                      Secured a podium finish in a tech-field business case competition focusing on RCBC Bank. Proposed digital transformation strategies and financial tech solutions to solve real-world banking challenges.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* --- 5. EXTRACURRICULAR --- */}
        <section id="extra" className="py-24 scroll-mt-24 border-t border-zinc-900">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
            <motion.div variants={slideUp} className="flex items-center gap-3 mb-10">
              <Star className="text-blue-400" size={28} />
              <h2 className="text-3xl font-bold">Leadership & Extracurricular</h2>
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
                  org: "Young Software Engineers' Society",
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
                  year: "2022-Present",
                  desc: "Balanced rigorous academics with rehearsals for 'Alimpuyo', 'K-Town', and 'Mayo Uno', demonstrating high discipline."
                },
                {
                  role: "Audience Development Com.",
                  org: "Pilipinas Game Ka Na Ba",
                  year: "2024",
                  desc: "Coordinated logistics and engagement strategies for a large-scale event, handling crowd management."
                }
              ].map((item, i) => (
                <motion.div variants={slideUp} key={i} className="bg-zinc-900/30 border border-zinc-800/80 p-6 rounded-xl hover:bg-zinc-900 hover:border-zinc-600 hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-lg">
                  <h4 className="font-bold text-zinc-100">{item.role}</h4>
                  <p className="text-blue-400 text-sm font-medium mb-3">{item.org} <span className="text-zinc-500 text-xs ml-1">({item.year})</span></p>
                  <p className="text-zinc-400 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="max-w-5xl mx-auto px-6 mt-12 border-t border-zinc-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-zinc-600">
        <p>© 2026 Charles Henrico Villa. All rights reserved.</p>
        <div className="flex gap-4">
          <p>Built with React & Framer Motion</p>
        </div>
      </footer>
    </div>
  );
}