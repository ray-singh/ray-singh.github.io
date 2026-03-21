import React, { useEffect, useMemo, useRef, useState } from 'react';

function readImageAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function App() {
  const cursorRef = useRef(null);
  const [photos, setPhotos] = useState([]);
  const [lightboxSrc, setLightboxSrc] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const lightboxOpen = Boolean(lightboxSrc);

  const projectCards = useMemo(
    () => [
      {
        num: 'Project 01',
        title: 'Distributed AI Agent Orchestrator',
        desc: 'Task-orchestration engine coordinating 50+ concurrent AI agents via Redis-backed state machines. Lua scripts ensure atomicity in task-claiming; incremental LangGraph checkpoints cut mean recovery time from ~70s to ~8s.',
        stack: 'Python · Redis · LangGraph · Lua · FastAPI · React',
        cta: 'GitHub ↗'
      },
      {
        num: 'Project 02',
        title: 'Real-Time Market Analytics System',
        desc: '5-microservice Kafka architecture ingesting 50K+ financial events/hour at sub-200ms latency. TimescaleDB with hypertables achieves <80ms query latency on 100K+ records. Exposes 20+ technical indicators via REST and WebSocket.',
        stack: 'Python · Kafka · FastAPI · TimescaleDB · PostgreSQL · Docker',
        cta: 'GitHub ↗',
        delay: '.1s'
      },
      {
        num: 'Project 03',
        title: 'Regime-Adaptive Statistical Arbitrage',
        desc: 'Market regime detection using Hidden Markov Models to shift statistical arbitrage strategies dynamically. Built with a modular pipeline for real-time signal generation and backtesting.',
        stack: 'HMM · PyArrow · NumPy · Flask · React',
        cta: 'View Project ↗',
        delay: '.2s'
      },
      {
        num: 'Project 04',
        title: 'Autonomous Banking Assistant',
        desc: 'Full-stack system powered by a LangGraph-based AI Agent with 11 specialized tools for automating SQL generation and bank statement analysis, achieving 93% task completion on an internal held-out benchmark of 150 real-world queries. Grew weekly active users from 5 to 60+ by implementing a RAG pipeline with PGVector for semantic transaction search and context-aware interaction.',
        stack: 'Next.js · TypeScript · OpenAI API · PostgreSQL · DrizzleORM · Clerk · LangGraph · PGVector',
        cta: 'GitHub ↗',
        delay: '.3s'
      }
    ],
    []
  );

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const handleMove = (event) => {
      cursor.style.left = `${event.clientX}px`;
      cursor.style.top = `${event.clientY}px`;
    };

    document.addEventListener('mousemove', handleMove);

    const selector = 'a, button, .project-card, .photo-masonry-item, .photo-upload-zone, #lightbox-close';
    const hoverables = Array.from(document.querySelectorAll(selector));
    const enter = () => cursor.classList.add('hovering');
    const leave = () => cursor.classList.remove('hovering');

    hoverables.forEach((el) => {
      el.addEventListener('mouseenter', enter);
      el.addEventListener('mouseleave', leave);
    });

    return () => {
      document.removeEventListener('mousemove', handleMove);
      hoverables.forEach((el) => {
        el.removeEventListener('mouseenter', enter);
        el.removeEventListener('mouseleave', leave);
      });
    };
  }, [photos.length, lightboxOpen]);

  useEffect(() => {
    const revealEls = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    revealEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [photos.length]);

  useEffect(() => {
    const onKeyDown = (e) => { if (e.key === 'Escape') setLightboxSrc(''); };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  const handleFiles = async (fileList) => {
    const files = Array.from(fileList || []).filter((f) => f.type.startsWith('image/'));
    if (!files.length) return;
    const loaded = await Promise.all(
      files.map(async (file) => {
        const src = await readImageAsDataUrl(file);
        return {
          id: `${file.name}-${file.lastModified}-${Math.random().toString(36).slice(2, 8)}`,
          src,
          alt: file.name.replace(/\.[^.]+$/, '')
        };
      })
    );
    setPhotos((prev) => [...prev, ...loaded]);
  };

  const onInputChange = async (e) => { await handleFiles(e.target.files); e.target.value = ''; };
  const onDrop = async (e) => { e.preventDefault(); setIsDragging(false); await handleFiles(e.dataTransfer.files); };

  return (
    <>
      <div id="cursor" ref={cursorRef} />

      {/* Lightbox */}
      <div
        id="lightbox"
        className={lightboxOpen ? 'open' : ''}
        onClick={(e) => { if (e.target.id === 'lightbox') setLightboxSrc(''); }}
      >
        <span id="lightbox-close" onClick={() => setLightboxSrc('')}>Close ✕</span>
        <img id="lightbox-img" src={lightboxSrc || ''} alt="" />
      </div>

      {/* Nav */}
      <nav>
        <span className="nav-name"><em>Rayansh Singh</em></span>
        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#experience">Experience</a></li>
          <li><a href="#projects">Work</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#photography">Lens</a></li>
        </ul>
      </nav>

      {/* Hero — full magazine cover */}
      <section id="hero">
        <div className="hero-content">
          <div className="hero-left">
            <p className="hero-eyebrow">Computer Science · Applied Mathematics · Cognitive Science</p>
            <h1 className="hero-name">
              From data to decisions,<br />with <em>clarity & care</em>
            </h1>
            <p className="hero-tagline">
              I'm drawn to projects where theory meets practice, and the real test
              is whether the system can handle unpredictability.
            </p>
          </div>

          <div className="hero-right">
            <div className="hero-meta">
              East Lansing, MI<br />
              Michigan State University
            </div>
            <a href="#projects" className="hero-cta">
              View Work
              <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                <path d="M8.5 1L13 5M13 5L8.5 9M13 5H1" stroke="currentColor" strokeWidth="1" />
              </svg>
            </a>
          </div>
        </div>

        {/* Magazine bottom bar */}
        <div className="hero-bar">
          <span className="hero-bar-label">Portfolio - 2026</span>
          <span className="hero-bar-scroll">Scroll to explore</span>
        </div>
      </section>

      {/* About */}
      <section id="about">
        <div className="section-header reveal">
          <span className="section-num" aria-hidden="true">01</span>
          <h2 className="section-title">About <em>Me</em></h2>
        </div>
        <div className="about-grid">
          <div className="about-left reveal">
            <img src="/profile.jpg" alt="A photo of me" className="about-profile" />
            <ul className="about-facts">
              <li><span>Minor</span><span>Applied Math</span></li>
              <li><span>Focus</span><span>ML / AI Systems</span></li>
              <li><span>Research</span><span>Human Augmentation and Artificial Intelligence Lab</span></li>
              <li><span>Roles</span><span>Research Assistant, Resident Assistant, Google Developer Groups</span></li>
            </ul>
            <div className="about-links" style={{ marginTop: '2rem' }}>
              <a href="https://github.com/ray-singh" className="link-pill">GitHub ↗</a>
              <a href="https://www.linkedin.com/in/rayansh-singh" className="link-pill">LinkedIn ↗</a>
            </div>
          </div>

          <div className="about-right reveal" style={{ transitionDelay: '.15s' }}>
            <div className="about-body">
              <p>Hello! I'm a 4th Year Computer Science student at Michigan State University. I build systems that make complex, data-driven tasks more intuitive by combining technical depth with human-centered design.</p>
              <p>My background is in software engineering and machine learning. I enjoy building real time data pipelines, backend systems, scalable APIs, and distributed systems. I care about writing code that is both efficient and understandable; systems that are as thoughtful as they are fast. I value clarity over cleverness, and robustness over quick wins.</p>
              <p>My research focuses on probabilistic AI and its applications in complex adaptive systems, such as financial markets. I'm drawn to markets because they are high noise, high stakes environments where things rarely behave as expected. To me, their unpredictability is exactly what makes them worth studying.</p>
              <p>Outside of engineering, I'm a novice tennis player. I enjoy traveling, photography, art, music, and a good hike. Photography, like engineering, is an exercise in attention. It sharpens my eye for detail, helping me notice patterns and small moments that often make the biggest difference. A small collage of moments I've captured is at the bottom of this page :)</p>
            </div>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section id="experience">
        <div className="section-header reveal">
          <span className="section-num" aria-hidden="true">02</span>
          <h2 className="section-title"><em>Experience</em></h2>
        </div>
        <div className="exp-list">

          <div className="exp-item reveal">
            <div className="exp-meta">
              <div className="exp-company">MSU HAAIL</div>
              <div className="exp-period">Jan 2026 – Present</div>
            </div>
            <div className="exp-content">
              <div className="exp-role">Undergraduate Research Assistant</div>
              <ul className="exp-bullets">
                <li>Improved out-of-distribution generalization by 20–55% across 7 benchmark datasets by building a Bayesian-LLM pipeline that generates informative priors for logistic regression models.</li>
              </ul>
              <div className="exp-tags">
                <span className="tag">PyMC</span><span className="tag">scikit-learn</span>
                <span className="tag">SciPy</span><span className="tag">OpenAI</span>
                <span className="tag">Bayesian ML</span>
              </div>
            </div>
          </div>

          <div className="exp-item reveal">
            <div className="exp-meta">
              <div className="exp-company">Delta Dental</div>
              <div className="exp-period">May – Dec 2025</div>
            </div>
            <div className="exp-content">
              <div className="exp-role">Software Engineering Intern</div>
              <ul className="exp-bullets">
                <li>Eliminated 98% of manual processing time — from 1.5 hrs to 45 seconds — for dental plan modifications by architecting a full-stack platform serving 150+ internal users.</li>
                <li>Cut redundant database calls by 60% by refactoring a Java REST API with cache invalidation logic.</li>
                <li>Expedited manual QA time by 35% by integrating an automated smoke test suite into the CI/CD pipeline via Testim.io.</li>
              </ul>
              <div className="exp-tags">
                <span className="tag">Angular</span><span className="tag">TypeScript</span>
                <span className="tag">Node.js</span><span className="tag">Java</span>
                <span className="tag">MongoDB</span><span className="tag">Testim.io</span>
              </div>
            </div>
          </div>

          <div className="exp-item reveal">
            <div className="exp-meta">
              <div className="exp-company">Deloitte Consulting</div>
              <div className="exp-period">May – Aug 2024</div>
            </div>
            <div className="exp-content">
              <div className="exp-role">Data Engineering Intern</div>
              <ul className="exp-bullets">
                <li>Unified 80% of fragmented multi-source client datasets via schema normalization and dimensional modeling across a scalable data architecture.</li>
                <li>Automated ingestion of 500K+ records/week with an ETL pipeline built on AWS Glue and PySpark, cutting manual data handoff across two teams.</li>
                <li>Enhanced a demand-forecasting dashboard with Flask and scikit-learn, contributing directly to a ~$350K client engagement.</li>
              </ul>
              <div className="exp-tags">
                <span className="tag">AWS Glue</span><span className="tag">PySpark</span>
                <span className="tag">Flask</span><span className="tag">scikit-learn</span>
                <span className="tag">ETL</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects">
        <div className="section-header reveal">
          <span className="section-num" aria-hidden="true">03</span>
          <h2 className="section-title">Selected <em>Work</em></h2>
        </div>
        <div className="projects-grid">
          {projectCards.map((project) => (
            <div
              key={project.num}
              className="project-card reveal"
              style={project.delay ? { transitionDelay: project.delay } : undefined}
            >
              <div className="project-inner">
                <div className="project-num">{project.num}</div>
                <div className="project-title">{project.title}</div>
                <div className="project-desc">{project.desc}</div>
                <div className="project-stack">{project.stack}</div>
                <a href="#" className="project-link">{project.cta}</a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills — full-bleed dark section */}
      <section id="skills">
        <div className="section-header reveal">
          <span className="section-num" aria-hidden="true">04</span>
          <h2 className="section-title"><em>Toolkit</em></h2>
        </div>
        <div className="skills-grid">
          <div className="skill-group reveal">
            <div className="skill-group-label">ML / AI</div>
            <ul className="skill-list">
              <li>PyTorch</li>
              <li>HuggingFace</li>
              <li>LangChain / LangGraph</li>
              <li>PyMC</li>
              <li>scikit-learn</li>
              <li>NumPy / Pandas</li>
            </ul>
          </div>
          <div className="skill-group reveal" style={{ transitionDelay: '.1s' }}>
            <div className="skill-group-label">Languages</div>
            <ul className="skill-list">
              <li>Python</li>
              <li>C / C++</li>
              <li>Java</li>
              <li>TypeScript</li>
              <li>JavaScript</li>
              <li>SQL</li>
            </ul>
          </div>
          <div className="skill-group reveal" style={{ transitionDelay: '.2s' }}>
            <div className="skill-group-label">Full Stack</div>
            <ul className="skill-list">
              <li>React / Next.js</li>
              <li>Angular / Vue.js</li>
              <li>FastAPI / Flask</li>
              <li>Node.js</li>
              <li>PostgreSQL / MongoDB</li>
              <li>Redis</li>
            </ul>
          </div>
          <div className="skill-group reveal" style={{ transitionDelay: '.3s' }}>
            <div className="skill-group-label">Infrastructure</div>
            <ul className="skill-list">
              <li>Docker</li>
              <li>AWS / GCP</li>
              <li>Kafka</li>
              <li>Git</li>
              <li>CI/CD</li>
              <li>Jupyter</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Photography */}
      <section id="photography">
        <div className="section-header reveal">
          <span className="section-num" aria-hidden="true">05</span>
          <h2 className="section-title">Through the <em>Lens</em></h2>
        </div>

        <p className="photo-note reveal">
          Landscapes, light, and quiet human moments — collected along the way.
        </p>

        {photos.length === 0 && (
          <div
            className="photo-upload-zone reveal"
            id="upload-zone"
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={onDrop}
            style={isDragging ? { borderColor: 'var(--accent)' } : undefined}
          >
            <input type="file" id="photo-input" accept="image/*" multiple onChange={onInputChange} />
            <div className="upload-label">
              <span>Drop photographs here</span>
              Click to select images from your device
            </div>
          </div>
        )}

        <div className="photo-masonry" id="photo-masonry">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="photo-masonry-item"
              onClick={() => setLightboxSrc(photo.src)}
            >
              <img src={photo.src} alt={photo.alt} loading="lazy" />
              <div className="photo-caption">{photo.alt}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer>
        <span className="footer-name"><em>Rayansh Singh</em> — MSU Computer Science</span>
        <ul className="footer-links">
          <li><a href="#">GitHub</a></li>
          <li><a href="#">LinkedIn</a></li>
          <li><a href="#">Resume</a></li>
          <li><a href="mailto:your@email.com">Email</a></li>
        </ul>
      </footer>
    </>
  );
}