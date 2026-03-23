import React, { useEffect, useMemo, useRef, useState } from 'react';
import photoManifest from './photo-manifest.json';
import photoCaptions from './photo-captions.json';

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
  const [photos, setPhotos] = useState(() => (
    (photoManifest || []).map((fname, i) => ({
      id: `${fname}-${i}`,
      src: `/${fname}`,
      alt: fname.replace(/\.[^.]+$/, ''),
      caption: (photoCaptions && photoCaptions[fname]) || ''
    }))
  ));
  const [lightboxSrc, setLightboxSrc] = useState('');
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const [isDragging, setIsDragging] = useState(false);
  const [expandedProject, setExpandedProject] = useState(null);

  const lightboxOpen = Boolean(lightboxSrc);

  const projectCards = useMemo(
    () => [
      {
        num: 'Project 01',
        title: 'Distributed AI Agent Orchestrator',
        desc: 'Task-orchestration engine coordinating 50+ concurrent AI agents via Redis-backed state machines. Lua scripts ensure atomicity in task-claiming; incremental LangGraph checkpoints cut mean recovery time from ~70s to ~8s.',
        stack: 'Python · Redis · LangGraph · Lua · FastAPI · React',
        cta: 'GitHub ↗',
        website: 'Website ↗',
        link: 'https://github.com/ray-singh/Sentinel-Node-Orchestrator',
        web_link: 'https://sentinel-indol-nine.vercel.app/',
        problem: 'Coordinating dozens of AI agents concurrently without causing deadlocks, lost updates, or cascading failures. Traditional queue systems struggled with agents claiming tasks only to fail mid-execution, requiring complex rollback mechanisms.',
        metrics: ['70s → 8s mean recovery time (11x faster)', '50+ concurrent agents stable', 'Lua atomicity: 0% race condition incidents', '<50ms task-claim latency at peak load'],
        lessons: ['Lua script atomicity is essential when Redis is your source of truth', 'Incremental checkpoints beat full-state snapshots for large agent systems', 'Separating task claiming from execution prevents orphaned work']
      },
      {
        num: 'Project 02',
        title: 'Real-Time Market Analytics System',
        desc: '5-microservice Kafka architecture ingesting 50K+ financial events/hour at sub-200ms latency. TimescaleDB with hypertables achieves <80ms query latency on 100K+ records. Exposes 20+ technical indicators via REST and WebSocket.',
        stack: 'Python · Kafka · FastAPI · TimescaleDB · PostgreSQL · Docker',
        cta: 'GitHub ↗',
        delay: '.1s',
        link: 'https://github.com/ray-singh/analytics-api',
        problem: 'Ingesting and analyzing market data with sub-second latency while maintaining analytical accuracy across historical and real-time queries. Naive databases couldn\'t handle time-series volume.',
        metrics: ['50K+ events/hour ingest', '<200ms end-to-end latency', '<80ms query latency on 100K+ historical records', '20+ technical indicators exposed'],
        lessons: ['TimescaleDB hypertables compress time-series by 10x vs traditional tables', 'Kafka partitioning by symbol reduces hot partitions in high-frequency scenarios', 'WebSocket is critical for real-time dashboards; REST alone leaves money on the table']
      },
      {
        num: 'Project 03',
        title: 'Regime-Adaptive Statistical Arbitrage',
        desc: 'Market regime detection using Hidden Markov Models to shift statistical arbitrage strategies dynamically. Built with a modular pipeline for real-time signal generation and backtesting.',
        stack: 'HMM · PyArrow · NumPy · Flask · React',
        cta: 'GitHub ↗',
        website: 'Website ↗',
        delay: '.2s',
        link: 'https://github.com/ray-singh/regime-adaptive-stat-arb',
        web_link: 'https://regime-pairs.vercel.app/',
        problem: 'Traditional statistical arbitrage strategies assume markets are stationary; that relationships between assets remain constant. In reality, markets shift between distinct regimes (bull markets, crashes, volatile periods). A pairs trading strategy that works in calm conditions fails spectacularly during volatile regimes. Single-regime strategies leave money on the table or blow up capital.',
        metrics: ['4 distinct market regimes detected via unsupervised HMM', '35% Sharpe ratio improvement in regime-aware backtest vs static strategy', '<150ms inference latency for real-time regime prediction'],
        lessons: ['Hidden Markov Models elegantly capture regime transitions with minimal parameters', 'Backtesting must penalize regime-transition costs; paper profits vanish with slippage', 'Regime memory (lookback window) matters more than model complexity']
      },
      {
        num: 'Project 04',
        title: 'Autonomous Banking Assistant',
        desc: 'Full-stack system powered by a LangGraph-based AI Agent with 11 specialized tools for automating SQL generation and bank statement analysis, achieving 93% task completion on an internal held-out benchmark of 150 real-world queries. Grew weekly active users from 5 to 60+ by implementing a RAG pipeline with PGVector for semantic transaction search and context-aware interaction.',
        stack: 'Next.js · TypeScript · OpenAI API · PostgreSQL · DrizzleORM · Clerk · LangGraph · PGVector',
        cta: 'GitHub ↗',
        website: 'Website ↗',
        delay: '.3s',
        link: 'https://github.com/ray-singh/FinMind',
        web_link: 'https://finmind-seven.vercel.app/',
        problem: 'Non-technical users struggle to query banking data; SQL requires expertise. Natural language queries are ambiguous—users don\'t know if they want transactions, balances, or forecasts. LLMs hallucinate; banking demands accuracy.',
        metrics: ['93% task completion on 150-query benchmark', 'WAU growth: 5 → 60+ users in 8 weeks', '<5s response latency for complex queries', '11 specialized tools (balance, forecast, anomaly, etc.)'],
        lessons: ['Tool calling is more reliable than zero-shot SQL generation; agents learn which tool fits each query', 'PGVector semantic search (RAG) catches ambiguous references; "recent transfers" is now unambiguous', 'User feedback loops (logging rejections) drive rapid iteration on tool definitions']
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
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        setLightboxSrc('');
        setLightboxIndex(-1);
      } else if (e.key === 'ArrowLeft' && photos.length && lightboxIndex >= 0) {
        const prev = (lightboxIndex - 1 + photos.length) % photos.length;
        setLightboxIndex(prev);
        setLightboxSrc(photos[prev].src);
      } else if (e.key === 'ArrowRight' && photos.length && lightboxIndex >= 0) {
        const next = (lightboxIndex + 1) % photos.length;
        setLightboxIndex(next);
        setLightboxSrc(photos[next].src);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [photos, lightboxIndex]);

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
        onClick={(e) => { if (e.target.id === 'lightbox') { setLightboxSrc(''); setLightboxIndex(-1); } }}
      >
        <button
          id="lightbox-prev"
          className="lightbox-arrow"
          aria-label="Previous"
          onClick={(e) => {
            e.stopPropagation();
            if (photos.length && lightboxIndex >= 0) {
              const prev = (lightboxIndex - 1 + photos.length) % photos.length;
              setLightboxIndex(prev);
              setLightboxSrc(photos[prev].src);
            }
          }}
        >
          ‹
        </button>

        <span id="lightbox-close" onClick={() => { setLightboxSrc(''); setLightboxIndex(-1); }}>Close ✕</span>
        <img id="lightbox-img" src={lightboxSrc || ''} alt="" />

        <button
          id="lightbox-next"
          className="lightbox-arrow"
          aria-label="Next"
          onClick={(e) => {
            e.stopPropagation();
            if (photos.length && lightboxIndex >= 0) {
              const next = (lightboxIndex + 1) % photos.length;
              setLightboxIndex(next);
              setLightboxSrc(photos[next].src);
            }
          }}
        >
          ›
        </button>
      </div>

      {/* Nav */}
      <nav>
        <span className="nav-name"><em>Rayansh Singh</em></span>
        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#experience">Experience</a></li>
          <li><a href="#projects">Work</a></li>
          <li><a href="#skills">Skills</a></li>
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
              <p>I enjoy building real time data pipelines, backend systems, scalable APIs, and distributed systems. I care about writing code that is both efficient and understandable; systems that are as thoughtful as they are fast. I value clarity over cleverness, and robustness over quick wins.</p>
              <p>My research focuses on probabilistic AI and its applications in complex adaptive systems, such as financial markets. I'm drawn to markets because they are high noise, high stakes environments where things rarely behave as expected. To me, their unpredictability is exactly what makes them worth studying.</p>
              <p>Outside of engineering, I play tennis (badly), travel, and take photographs. Photography taught me that engineering and art aren't opposites; both require obsessive attention, pattern recognition, and a balance of technical skill with intuition. The best systems feel effortless because someone spent weeks making them simple.</p>
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
                <li>Improving out-of-distribution generalization across 7 benchmark datasets by building a Bayesian-LLM pipeline that generates informative priors for logistic regression models.</li>
              </ul>
              <div className="exp-tags">
                <span className="tag">PyMC</span><span className="tag">scikit-learn</span>
                <span className="tag">SciPy</span><span className="tag">OpenAI</span>
                <span className="tag">Bayesian ML</span>
                <span className="tag">Deep Learning</span>
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
              <div className="exp-period">May - Aug 2024</div>
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

          <div className="exp-item reveal">
            <div className="exp-meta">
              <div className="exp-company">Michigan State University</div>
              <div className="exp-period">Aug - Dec 2023</div>
            </div>
            <div className="exp-content">
              <div className="exp-role">Undergraduate Teaching Assistant</div>
              <ul className="exp-bullets">
                <li>Tutored 200+ students in pre-calculus and trigonometry, designing and implementing strategies that improved understanding and mastery of key concepts.</li>
                <li>Boosted 15 students' average exam scores to 89% through biweekly review sessions and clear explanations of mathematical concepts.</li>
              </ul>
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
              onClick={() => setExpandedProject(expandedProject?.num === project.num ? null : project)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setExpandedProject(expandedProject?.num === project.num ? null : project); }}
            >
              <div className="project-inner">
                <div className="project-num">{project.num}</div>
                <div className="project-title">{project.title}</div>
                <div className="project-desc">{project.desc}</div>
                <div className="project-stack">{project.stack}</div>
                <a href={project.link} className="project-link" target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                  {project.cta}
                </a>
                {project.website && project.web_link ? (
                  <a
                    href={project.web_link}
                    className="project-link project-website"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {project.website}
                  </a>
                ) : project.website ? (
                  <span className="project-link project-website">{project.website}</span>
                ) : null}
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

      {/* Project Modal Overlay */}
      {expandedProject && (
        <div
          className="project-modal-overlay"
          onClick={() => setExpandedProject(null)}
          onKeyDown={(e) => { if (e.key === 'Escape') setExpandedProject(null); }}
          role="button"
          tabIndex={0}
        >
          <div
            className="project-modal"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-label={`Details for ${expandedProject.title}`}
          >
            <button
              className="modal-close"
              onClick={() => setExpandedProject(null)}
              aria-label="Close modal"
            >
              ✕
            </button>
            <div className="modal-header">
              <div className="modal-num">{expandedProject.num}</div>
              <h2 className="modal-title">{expandedProject.title}</h2>
            </div>
            <div className="modal-content">
              <div className="modal-section">
                <h3 className="modal-section-title">The Problem</h3>
                <p className="modal-section-text">{expandedProject.problem}</p>
              </div>
              <div className="modal-section">
                <h3 className="modal-section-title">Key Metrics</h3>
                <ul className="modal-metrics">
                  {expandedProject.metrics.map((metric, i) => (
                    <li key={i}>{metric}</li>
                  ))}
                </ul>
              </div>
              <div className="modal-section">
                <h3 className="modal-section-title">What I Learned</h3>
                <ul className="modal-lessons">
                  {expandedProject.lessons.map((lesson, i) => (
                    <li key={i}>{lesson}</li>
                  ))}
                </ul>
              </div>
              <div className="modal-footer">
                <a href={expandedProject.link} className="modal-cta" target="_blank" rel="noopener noreferrer">
                  View on GitHub ↗
                </a>
                <button
                  type="button"
                  className="modal-close-bottom"
                  onClick={() => setExpandedProject(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer>
        <span className="footer-name"><em>Rayansh Singh</em> - MSU Computer Science</span>
        <ul className="footer-links">
          <li><a href="https://github.com/ray-singh" target="_blank" rel="noopener noreferrer">GitHub</a></li>
          <li><a href="https://www.linkedin.com/in/rayansh-singh" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
          <li><a href="#resume" target="_blank" rel="noopener noreferrer">Resume</a></li>
          <li><a href="mailto:singhr26@msu.edu">Email</a></li>
        </ul>
      </footer>
    </>
  );
}