import React, { useEffect, useState, useMemo, useCallback } from 'react';
import photoManifest from './photo-manifest.json';
import photoCaptions from './photo-captions.json';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function readImageAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function useLayoutState() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const update = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      const colW = 400;
      const s = mobile
        ? Math.min(1, (window.innerHeight - 24) / 852, (window.innerWidth - 24) / 393)
        : Math.min(1, (window.innerHeight - 48) / 852, (colW - 24) / 393);
      setScale(Math.max(0.45, s));
    };
    update();
    window.addEventListener('resize', update, { passive: true });
    return () => window.removeEventListener('resize', update);
  }, []);
  return { isMobile, scale };
}

function useTime() {
  const fmt = () => {
    const d = new Date();
    return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
      .replace(' AM', '').replace(' PM', '');
  };
  const [time, setTime] = useState(fmt);
  useEffect(() => {
    const t = setInterval(() => setTime(fmt()), 15000);
    return () => clearInterval(t);
  }, []);
  return time;
}

function LockScreen({ isUnlocking }) {
  const time = useTime();
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  return (
    <div className={`lock-screen${isUnlocking ? ' unlocking' : ''}`}>
      <DynamicIsland/>
      <StatusBar/>
      <div className="lock-time-area">
        <div className="lock-time">{time}</div>
        <div className="lock-date">{dateStr}</div>
      </div>
      <div className="lock-identity">
        <div className="lock-name">Rayansh Singh</div>
        <div className="lock-location">
          <svg width="10" height="13" viewBox="0 0 10 13" fill="currentColor">
            <path d="M5 0C2.794 0 1 1.794 1 4c0 3 4 9 4 9s4-6 4-9c0-2.206-1.794-4-4-4zm0 5.5A1.5 1.5 0 1 1 5 2.5a1.5 1.5 0 0 1 0 3z"/>
          </svg>
          East Lansing, MI
        </div>
      </div>
      <div className="lock-spacer"/>
      <div className="lock-unlock-hint">
        <svg width="22" height="13" viewBox="0 0 22 13" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 11L11 2L20 11"/>
        </svg>
        <span>Swipe up to unlock</span>
      </div>
    </div>
  );
}

// ─── Icon images ──────────────────────────────────────────────────────────────

function AppIconImage({ id }) {
  // Real Apple system app icons extracted from macOS
  if (id === 'notes')    return <img src="/icons/notes.png"    alt="" style={{ width:'100%', height:'100%', display:'block' }}/>;
  if (id === 'settings') return <img src="/icons/settings.png" alt="" style={{ width:'100%', height:'100%', display:'block' }}/>;
  if (id === 'photos')   return <img src="/icons/photos.png"   alt="" style={{ width:'100%', height:'100%', display:'block' }}/>;
  if (id === 'mail')     return <img src="/icons/mail.png"     alt="" style={{ width:'100%', height:'100%', display:'block' }}/>;
  if (id === 'music')    return <img src="/icons/music.png"    alt="" style={{ width:'100%', height:'100%', display:'block' }}/>;
  if (id === 'writings') return (
    <div style={{ background: 'linear-gradient(145deg,#F59E0B,#D97706)', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg viewBox="0 0 32 32" fill="none" style={{ width: '72%', height: '72%' }}>
        <rect x="6" y="4" width="13" height="24" rx="2" fill="white" opacity="0.3"/>
        <rect x="9" y="3" width="13" height="24" rx="2" fill="white" opacity="0.55"/>
        <rect x="12" y="2" width="13" height="24" rx="2" fill="white" opacity="0.9"/>
        <rect x="14" y="7" width="7" height="1.5" rx="0.75" fill="#D97706" opacity="0.8"/>
        <rect x="14" y="11" width="5" height="1.5" rx="0.75" fill="#D97706" opacity="0.6"/>
      </svg>
    </div>
  );

  // Calendar: keep custom SVG so it shows the live date
  if (id === 'calendar') {
    const now = new Date();
    const day = now.getDate();
    const month = now.toLocaleString('en-US', { month: 'short' }).toUpperCase();
    return (
      <div style={{ background: 'white', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ background: '#FF3B30', color: 'white', textAlign: 'center', fontSize: '9px', fontWeight: '700', letterSpacing: '0.8px', padding: '5px 0 3px', fontFamily: '-apple-system,system-ui' }}>{month}</div>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: '200', color: '#1C1C1E', fontFamily: '-apple-system,system-ui', lineHeight: 1 }}>{day}</div>
      </div>
    );
  }

  // Files: no macOS equivalent for iOS Files app, keep custom blue folder
  if (id === 'files') return (
    <div style={{ background: 'linear-gradient(145deg,#5AC8FA,#007AFF)', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg viewBox="0 0 32 32" fill="none" style={{ width: '78%', height: '78%' }}>
        <path d="M3 11C3 9 4.2 8 6 8L13 8L15 11L26 11C28 11 29 12.5 29 14L29 24C29 26 27.5 27 26 27L6 27C4.2 27 3 25.8 3 24Z" fill="white" opacity="0.35"/>
        <path d="M2 14C2 12 3.2 11 5 11L12 11L14 14L27 14C28.5 14 30 15 30 17L30 25C30 27 28.5 28 27 28L5 28C3.2 28 2 26.8 2 25Z" fill="white" opacity="0.9"/>
      </svg>
    </div>
  );

  if (id === 'github') return (
    <div style={{ background: '#1C1C1E', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg viewBox="0 0 24 24" fill="white" style={{ width: '65%', height: '65%' }}>
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
      </svg>
    </div>
  );

  if (id === 'leadership') return <img src="/icons/podcasts.png" alt="" style={{ width:'100%', height:'100%', display:'block' }}/>;

  if (id === 'linkedin') return (
    <div style={{ background: '#0A66C2', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg viewBox="0 0 24 24" fill="white" style={{ width: '65%', height: '65%' }}>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    </div>
  );

  return null;
}

// ─── Data ──────────────────────────────────────────────────────────────────────

const APPS_GRID = [
  { id: 'notes',    name: 'About Me' },
  { id: 'calendar', name: 'Experience' },
  { id: 'files',    name: 'Projects' },
  { id: 'settings',    name: 'Skills' },
  { id: 'leadership', name: 'Leadership' },
  { id: 'music',      name: 'Music' },
  { id: 'writings', name: 'Writings' },
  { id: 'github',   name: 'GitHub',   href: 'https://github.com/ray-singh' },
  { id: 'linkedin', name: 'LinkedIn', href: 'https://www.linkedin.com/in/rayansh-singh' },
  { id: 'mail',     name: 'Mail',     href: 'mailto:singhr26@msu.edu' },
];

const SONGS = [
  { title: 'How to Disappear', artist: 'Lana Del Rey', duration: '4:26', color: '#9D4E6E', cover: '/covers/lana.jpg' },
  { title: 'Belinda Says', artist: 'Alvvays', duration: '3:25', color: '#4169A8', cover: '/covers/alvvays.jpg' },
  { title: 'Cobra', artist: 'Geese', duration: '4:28', color: '#2D5A27', cover: '/covers/geese.jpg' },
  { title: 'Nights', artist: 'Frank Ocean', duration: '5:07', color: '#4338CA', cover: '/covers/blonde.jpeg' },
  { title: 'Gosh', artist: 'Jamie xx', duration: '6:37', color: '#D97706', cover: '/covers/jamie.svg' },
  { title: "Gideon's Bible", artist: 'John Cale', duration: '3:48', color: '#4B5563', cover: '/covers/cale.jpg' },
  { title: 'detonate', artist: 'Charli XCX', duration: '2:17', color: '#4D7C0F', cover: '/covers/charli.png' },
  { title: 'Fashion Killa', artist: 'ASAP Rocky', duration: '3:36', color: '#7C3AED', cover: '/covers/asap.jpg' },
  { title: 'Dance Yrself Clean', artist: 'LCD Soundsystem', duration: '8:38', color: '#EA580C', cover: '/covers/lcd.jpg' },
  { title: 'Best to You', artist: 'Blood Orange', duration: '3:47', color: '#B91C1C', cover: '/covers/Freetown_Sound_Cover.jpg' },
  { title: 'Hot n Cold', artist: 'Katy Perry', duration: '3:22', color: '#1D4ED8', cover: '/covers/katy.png' },
];

const DOCK_APPS = [
  { id: 'notes',    name: 'About' },
  { id: 'calendar', name: 'Experience' },
  { id: 'files',    name: 'Projects' },
  { id: 'settings', name: 'Skills' },
];

const EXPERIENCE = [
  {
    company: 'Delta Dental',
    role: 'AI Engineering Intern',
    period: 'May 2026 – Present',
    color: '#FF9F0A',
    bullets: [
      'Shipping an agentic concierge for a BI team to navigate 300+ SAS files, paring vector-first retrieval with deterministic source validation to accelerate report discovery.',
      'Co-developed an autonomous verification system (Azure AI Foundry, FastAPI, Playwright MCP) projected to save $1.2M/year in vendor costs, replacing third-party dependency with in-house tools'
    ],
    tags: ['Azure OpenAI', 'Python', 'Node.js', 'Angular', 'LangGraph', 'Oracle DB'],
  },
  {
    company: 'MSU Federal Credit Union (University Capstone Team)',
    role: 'Student Software Engineer',
    period: 'Jan 2026 – May 2026',
    color: '#2ae920',
    bullets: [
      'Owned infrastructure layer for a 6-person team building a blockchain-settled P2P payments app, delivering fully containerized 4-service Docker environment with automated CI/CD.',
      'Implemented event-driven reconciliation layer (Python) to synchronize Ethereum settlement state with Postgres database, designing a schema that maintained consistency across async transaction states'
    ],
    tags: ['Flask', 'React.js', 'Docker', 'Web3.py', 'Docker', 'Firebase', 'GitHub Actions'],
  },
  {
    company: 'MSU HAAIL',
    role: 'Undergraduate Research Assistant',
    period: 'Jan 2026 – Present',
    color: '#007AFF',
    bullets: [
      'Reduced volatility forecast errors by up to 46% over econometric baselines by developing neural state-space model (PyTorch, PyMC, SciPy) for macro regime inference; targeting ICAIF 2026',
      'Improving out-of-distribution generalization across 7 benchmark datasets by building a Bayesian-LLM pipeline that generates informative priors for logistic regression models.'
    ],
    tags: ['PyMC', 'PyTOrch', 'scikit-learn', 'SciPy', 'OpenAI', 'Bayesian ML'],
  },
  {
    company: 'Delta Dental',
    role: 'Software Engineering Intern',
    period: 'May – Dec 2025',
    color: '#FF9F0A',
    bullets: [
      'Eliminated 98% of manual processing time — from 1.5 hrs to 45 seconds — for dental plan modifications by architecting a full-stack platform serving 150+ internal users.',
      'Cut redundant database calls by 60% by refactoring a Java REST API with cache invalidation logic.',
      'Expedited QA time by 35% by integrating automated smoke tests into CI/CD via Testim.io.',
    ],
    tags: ['Angular', 'TypeScript', 'Node.js', 'Java', 'MongoDB', 'Testim.io'],
  },
  {
    company: 'Deloitte Consulting',
    role: 'Data Engineering Intern',
    period: 'May – Aug 2024',
    color: '#34C759',
    bullets: [
      'Unified 80% of fragmented multi-source client datasets via schema normalization and dimensional modeling across a scalable data architecture.',
      'Automated ingestion of 500K+ records/week with an ETL pipeline built on AWS Glue and PySpark, cutting manual data handoff across two teams.',
      'Enhanced a demand-forecasting dashboard with Flask and scikit-learn, contributing directly to a ~$350K client engagement.',
    ],
    tags: ['AWS Glue', 'PySpark', 'Flask', 'scikit-learn', 'ETL'],
  },
  {
    company: 'Michigan State University',
    role: 'Undergraduate Teaching Assistant',
    period: 'Aug – Dec 2023',
    color: '#AF52DE',
    bullets: [
      'Tutored 200+ students in pre-calculus and trigonometry.',
      'Boosted 15 students\' average exam scores to 89% through biweekly review sessions.',
    ],
    tags: [],
  },
];

const PROJECTS = [
  {
    name: 'BTC Volatility Forecasting',
    type: 'PyTorch · LightGBM · FastAPI · GCP',
    color: '#FF375F',
    desc: 'Volatility forecaster and liquidity shock detector built on 50+ Level-2 orderbook features — OFI, spread, depth imbalances that price history alone can\'t see. LightGBM beat HAR-RV by 45% RMSE; tested against Transformers and TCNs with full MLflow tracking. Served from GCP Cloud Run at ~8k req/sec with a Streamlit dashboard for live inference and feature ablation.',
    problem: 'HAR-RV is built entirely on price history; it is blind to liquidity crises forming in the orderbook before price even moves. Crypto markets are also non-stationary by design, which means naive train/test splits leak the future into training data and make everything look better than it actually is.',
    learned: [
      'Orderbook features (OFI, spread, depth imbalance) outpredict price-derived signals — microstructure sees pressure before price reacts',
      'A single model can jointly optimize regression and classification without degrading either, as long as the tasks share signal',
      'Strict chronological holdouts are non-negotiable in financial ML — random splits produce deceptively optimistic metrics',
    ],
    metrics: ['45% RMSE vs HAR-RV baseline', '0.94 AUROC · 0.88 AUPRC', '~8k req/sec · p99 < 0.52ms', '50+ microstructure features', '5 architectures benchmarked'],
    link: 'https://github.com/ray-singh/Volatility-Forecasting',
    webLink: 'https://volcast-streamlit-3988143537.us-central1.run.app/',
  },
  {
    name: 'Sentinel Orchestrator',
    type: 'Python · Redis · LangGraph',
    color: '#FF9F0A',
    desc: 'Task-orchestration engine coordinating 50+ concurrent AI agents via Redis-backed state machines. Lua scripts ensure atomicity; incremental LangGraph checkpoints cut mean recovery time from ~70s to ~8s.',
    problem: 'Coordinating dozens of AI agents concurrently without causing deadlocks, lost updates, or cascading failures. Traditional queue systems struggled with agents claiming tasks only to fail mid-execution, requiring complex rollback mechanisms.',
    learned: ['Lua script atomicity is essential when Redis is your source of truth', 'Incremental checkpoints beat full-state snapshots for large agent systems', 'Separating task claiming from execution prevents orphaned work'],
    metrics: ['70s → 8s recovery time', '50+ concurrent agents', '0% race conditions', '<50ms task-claim latency'],
    link: 'https://github.com/ray-singh/Sentinel-Node-Orchestrator',
    webLink: 'https://sentinel-indol-nine.vercel.app/',
  },
  {
    name: 'Market Analytics',
    type: 'Kafka · TimescaleDB · FastAPI',
    color: '#34C759',
    desc: '5-microservice Kafka architecture ingesting 50K+ financial events/hour at sub-200ms latency. TimescaleDB hypertables achieve <80ms query latency on 100K+ records. Exposes 20+ technical indicators via REST and WebSocket.',
    problem: 'Ingesting and analyzing market data with sub-second latency while maintaining analytical accuracy across historical and real-time queries. Naive databases couldn\'t handle time-series volume.',
    metrics: ['50K+ events/hour', '<200ms end-to-end latency', '<80ms query time', '20+ indicators'],
    learned: ['TimescaleDB hypertables compress time-series by 10x vs traditional tables', 'Kafka partitioning by symbol reduces hot partitions in high-frequency scenarios', 'WebSocket is critical for real-time dashboards; REST alone leaves money on the table'],
    link: 'https://github.com/ray-singh/analytics-api',
  },
  {
    name: 'Regime-Adaptive Stat Arb',
    type: 'HMM · NumPy · Flask · React · ThreadPoolExecutor',
    color: '#007AFF',
    desc: 'Trading pair discovery engine over 200 assets using Hidden Markov Models to segment 4 market regimes. Tested 22.5k pairs via vectorized NumPy pre-filter (85% compute reduction), parallelized evaluation with batched ThreadPoolExecutor, and deployed 3-tier caching (LRU + TTL pickle + MD5-keyed Parquet) for sub-1s runtime on React+Flask dashboard.',
    problem: 'Traditional statistical arbitrage strategies assume markets are stationary; that relationships between assets remain constant. In reality, markets shift between distinct regimes (bull markets, crashes, volatile periods). A pairs trading strategy that works in calm conditions fails spectacularly during volatile regimes. Single-regime strategies leave money on the table or blow up capital.',
    learned: ['Vectorized NumPy pre-filters can reduce cointegration search space by 87% (22.5k → 3k pairs)', 'Multi-tier caching (LRU + TTL + persistence) is essential for sub-second repeated queries', 'Batched ThreadPoolExecutor parallelization beats naive threading on I/O-bound filtering'],
    metrics: ['200+ assets tested', '22.5k → 3k filtered pairs', '85% compute cost reduction', '~10min → sub-1s runtime', '4 regimes detected'],
    link: 'https://github.com/ray-singh/regime-adaptive-stat-arb',
    webLink: 'https://regime-pairs.vercel.app/',
  },
  {
    name: 'Personal Finance Agent',
    type: 'Next.js · LangGraph · OpenAI · pgvector',
    color: '#AF52DE',
    desc: 'LangGraph-based AI agent with 14 tools for SQL query generation, anomaly detection, and vector memory. RAG pipeline with OpenAI embeddings + pgvector for semantic transaction search, context-aware chat, and persistent agent memory. Achieved 96% pass rate on 100 real-world query benchmark; scaled from 5 to 60+ weekly active users.',
    problem: 'Personal finance apps lack intelligent assistants that understand transaction context and can execute complex queries. Users needed both semantic search (\'show me unusual spending\') and structured queries (\'aggregate transactions by category\'), combined with conversational continuity across sessions.',
    learned: ['Vector embeddings unlock semantic understanding; pgvector outperforms naive text search by 4x on financial queries', 'Tool composition in LangGraph beats monolithic agents for finance use cases', 'Persistent memory transforms one-off queries into multi-turn financial insights'],
    metrics: ['96% benchmark pass rate', '14 specialized tools', '5 → 60 users', '<3s semantic search latency'],
    link: 'https://github.com/ray-singh/FinMind',
    webLink: 'https://finmind-seven.vercel.app/',
  },
];

const SKILLS = [
  {
    label: 'ML / AI',
    emoji: '🧠',
    color: '#AF52DE',
    items: ['PyTorch', 'HuggingFace', 'LangChain / LangGraph', 'PyMC', 'scikit-learn', 'NumPy / Pandas'],
  },
  {
    label: 'Languages',
    emoji: '⌨️',
    color: '#007AFF',
    items: ['Python', 'C / C++', 'Java', 'TypeScript', 'JavaScript', 'SQL'],
  },
  {
    label: 'Full Stack',
    emoji: '🌐',
    color: '#34C759',
    items: ['React / Next.js', 'Angular / Vue.js', 'FastAPI / Flask', 'Node.js', 'PostgreSQL / MongoDB', 'Redis'],
  },
  {
    label: 'Infrastructure',
    emoji: '⚙️',
    color: '#FF9F0A',
    items: ['Docker', 'AWS / GCP', 'Kafka', 'Git', 'CI/CD', 'Jupyter'],
  },
];

const LEADERSHIP = [
  {
    role: 'Resident Assistant',
    org: 'Michigan State University',
    period: 'Jan 2026 – May 2026',
    color: '#18981D',
    bullets: [
      'Served as a live-in community advisor for 40+ residents, providing academic guidance, crisis response, and peer mentorship in a university residence hall.',
      'Planned and facilitated monthly programming events focused on wellness, community-building, and academic success.',
      'Collaborated with a team of 16 RAs and professional staff to maintain a safe and inclusive living environment across a ~400-person residence hall.',
    ],
  },
  {
    role: 'Executive Board Member',
    org: 'Google Developer Groups (MSU Chapter)',
    period: 'Aug 2024 – Dec 2025',
    color: '#4285F4',
    bullets: [
      'Organized technical workshops and speaker events on cloud computing, AI/ML, and modern development practices, reaching 100+ student attendees per semester.',
      'Mentored underclassmen through project ideation and implementation, helping members build portfolio projects using Google technologies.',
      'Coordinated with Google developer advocates to bring industry resources to the MSU developer community.',
    ],
  },
];

const BADGE_COUNTS = { calendar: EXPERIENCE.length, files: PROJECTS.length };

// ─── Shared chrome ─────────────────────────────────────────────────────────────

function StatusBar({ dark }) {
  const time = useTime();
  return (
    <div className={`ios-status-bar${dark ? ' dark' : ''}`}>
      <span className="ios-status-time">{time}</span>
      <div className="ios-status-icons">
        <svg width="18" height="13" viewBox="0 0 18 13" fill="currentColor">
          <rect x="0" y="9" width="3" height="4" rx="0.5"/>
          <rect x="4.5" y="6" width="3" height="7" rx="0.5"/>
          <rect x="9" y="3" width="3" height="10" rx="0.5"/>
          <rect x="13.5" y="0" width="3" height="13" rx="0.5"/>
        </svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor">
          <path d="M8 9a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"/>
          <path d="M8 5.5C6.12 5.5 4.42 6.31 3.24 7.62l1.29 1.29C5.37 7.9 6.6 7.2 8 7.2s2.63.7 3.47 1.71l1.29-1.29C11.58 6.31 9.88 5.5 8 5.5z"/>
          <path d="M8 2C5.08 2 2.44 3.17.63 5.1L1.9 6.37C3.32 4.82 5.55 3.8 8 3.8s4.68 1.02 6.1 2.57L15.37 5.1C13.56 3.17 10.92 2 8 2z"/>
        </svg>
        <svg width="27" height="13" viewBox="0 0 27 13" fill="currentColor">
          <rect x="0.5" y="0.5" width="21" height="12" rx="2.5" stroke="currentColor" strokeWidth="1" fill="none"/>
          <rect x="22" y="4" width="3" height="5" rx="1.5"/>
          <rect x="2" y="2" width="16" height="9" rx="1.5"/>
        </svg>
      </div>
    </div>
  );
}

function DynamicIsland() {
  return <div className="ios-dynamic-island"/>;
}

function NavBar({ title, onBack, backLabel = 'Home', action }) {
  return (
    <div className="ios-nav-bar">
      <button className="ios-back-btn" onClick={onBack}>
        <svg className="ios-back-chevron" width="11" height="18" viewBox="0 0 11 18" fill="none">
          <path d="M9.5 1.5L1.5 9L9.5 16.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span>{backLabel}</span>
      </button>
      <span className="ios-nav-title">{title}</span>
      <span style={{ width: 70 }}>{action}</span>
    </div>
  );
}

function AppIcon({ app, onTap, dock, active }) {
  const handleClick = () => {
    if (app.href) {
      window.open(app.href, '_blank', 'noopener,noreferrer');
    } else {
      onTap(app.id);
    }
  };
  const badge = !dock ? BADGE_COUNTS[app.id] : null;
  return (
    <button className={`ios-app-icon${dock ? ' dock' : ''}${active ? ' active' : ''}`} onClick={handleClick} aria-label={app.name}>
      <div className="ios-icon-wrap">
        <div className="ios-icon-shell">
          <AppIconImage id={app.id}/>
        </div>
        {badge != null && <span className="ios-badge">{badge}</span>}
      </div>
      {!dock && <span className="ios-icon-label">{app.name}</span>}
    </button>
  );
}

// ─── Home widget ──────────────────────────────────────────────────────────────

function HomeWidget() {
  return (
    <div className="home-widget">
      <div className="hw-main">
        <img src="/profile.jpg" alt="Rayansh" className="hw-avatar"/>
        <div className="hw-info">
          <div className="hw-name">Rayansh Singh</div>
          <div className="hw-school">Michigan State · CS '26</div>
          <div className="hw-location">
            <svg width="8" height="10" viewBox="0 0 10 13" fill="currentColor">
              <path d="M5 0C2.794 0 1 1.794 1 4c0 3 4 9 4 9s4-6 4-9c0-2.206-1.794-4-4-4zm0 5.5A1.5 1.5 0 1 1 5 2.5a1.5 1.5 0 0 1 0 3z"/>
            </svg>
            East Lansing, MI
          </div>
        </div>
      </div>
      <div className="hw-divider"/>
      <div className="hw-tagline">Interested in AI/ML systems & the infrastructure that powers them</div>
    </div>
  );
}

// ─── App screens ───────────────────────────────────────────────────────────────

function NotesApp({ onClose }) {
  return (
    <div className="ios-app notes-app">
      <DynamicIsland/>
      <StatusBar dark/>
      <NavBar title="Notes" onBack={onClose} backLabel="iCloud"/>
      <div className="ios-scroll-area notes-scroll">
        <h1 className="notes-title">About Me</h1>

        <div className="notes-body">
          <p>Hello! I’m Rayansh, a soon-to-be CS grad passionate about ML systems, tools, and infra. </p>
          <p>My work experience spans tech consulting, insurance, fintech, and research. Though domains and constraints may vary, I focus on finding a hard problem, understanding it well, and building solutions that last. In my current role as an AI Engineering Intern at Delta Dental, I’m developing an agentic license verification system projected to save ~$1M/yr in external vendor costs.</p>
          <p>Machine learning caught my eye because it felt like magic. As I learned more, the magic faded but my curiosity grew, eventually leading me to my role as an undergrad ML researcher. The question I find myself asking often is ‘how do we build systems capable of making decisions when the world is noisy and constantly changing?’.</p>
          <p>What excites me most is taking models out of notebooks or papers and turning them into intelligent systems that people can use reliably. Whether I'm building data pipelines, agentic applications, or ML infrastructure, I'm drawn to problems that require both careful thinking and practical execution.</p>
          <p>When I'm not working, I'm either playing tennis (badly), taking photographs, reading, or planning my next project. Outside of tech, I'm an art and music enthusiast. I firmly believe that art and engnineering are two sides of the same coin; both require obsessive attention, pattern recognition, and a balance of skill and inution. The best systems, paintings, and songs feel effortless because someone spent weeks making them simple.</p>
        </div>
      </div>
    </div>
  );
}

function CalendarApp({ onClose }) {
  const [expanded, setExpanded] = useState(null);
  return (
    <div className="ios-app cal-app">
      <DynamicIsland/>
      <StatusBar dark/>
      <NavBar title="Experience" onBack={onClose}/>
      <div className="ios-scroll-area">
        <div className="cal-header">
          <div className="cal-header-title">Career Timeline</div>
          <div className="cal-header-sub">2023 – Present · 4 roles</div>
        </div>
        <div className="cal-list">
          {EXPERIENCE.map((exp, i) => (
            <div key={i} className="cal-event" onClick={() => setExpanded(expanded === i ? null : i)}>
              <div className="cal-dot" style={{ background: exp.color }}/>
              <div className="cal-event-body">
                <div className="cal-company">{exp.company}</div>
                <div className="cal-role">{exp.role}</div>
                <div className="cal-period">{exp.period}</div>
                {expanded === i && (
                  <div className="cal-expanded">
                    <ul className="cal-bullets">
                      {exp.bullets.map((b, j) => <li key={j}>{b}</li>)}
                    </ul>
                    {exp.tags.length > 0 && (
                      <div className="cal-tags">
                        {exp.tags.map(t => (
                          <span key={t} className="cal-tag" style={{ color: exp.color, borderColor: `${exp.color}55` }}>{t}</span>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
              <span className="cal-chevron">{expanded === i ? '∨' : '›'}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FilesApp({ onClose }) {
  const [selected, setSelected] = useState(null);

  if (selected !== null) {
    const p = PROJECTS[selected];
    return (
      <div className="ios-app files-app">
        <DynamicIsland/>
        <StatusBar dark/>
        <NavBar title={p.name} onBack={() => setSelected(null)} backLabel="Projects"/>
        <div className="ios-scroll-area files-detail-scroll">
          <p className="files-detail-type">{p.type}</p>

          <div className="files-sections">
            <div className="files-section-card">
              <div className="files-section-heading">Description</div>
              <p className="files-section-body">{p.desc}</p>
            </div>

            <div className="files-section-card">
              <div className="files-section-heading">The Problem</div>
              <p className="files-section-body">{p.problem}</p>
            </div>

            <div className="files-section-card">
              <div className="files-section-heading">What I Learned</div>
              <ul className="files-learned-list">
                {p.learned.map((item, i) => (
                  <li key={i} className="files-learned-item">
                    <span className="files-learned-dot" style={{ background: p.color }}/>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="files-section-card">
              <div className="files-section-heading">Key Metrics</div>
              <div className="files-chips">
                {p.metrics.map((m, i) => (
                  <span key={i} className="files-chip" style={{ color: p.color, borderColor: `${p.color}44` }}>{m}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="files-actions">
            <a href={p.link} target="_blank" rel="noopener noreferrer" className="files-btn-primary" style={{ background: p.color }}>
              View on GitHub ↗
            </a>
            {p.webLink && (
              <a href={p.webLink} target="_blank" rel="noopener noreferrer" className="files-btn-secondary" style={{ borderColor: p.color, color: p.color }}>
                Live Demo ↗
              </a>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="ios-app files-app">
      <DynamicIsland/>
      <StatusBar dark/>
      <NavBar title="Projects" onBack={onClose}/>
      <div className="ios-scroll-area">
        <div className="files-section-label">Recents</div>
        <div className="files-grid">
          {PROJECTS.map((p, i) => (
            <button key={i} className="files-folder" onClick={() => setSelected(i)}>
              <div className="files-folder-icon" style={{ background: `${p.color}18` }}>
                <svg viewBox="0 0 48 48" fill="none" width="50" height="44">
                  <path d="M4 15C4 12 5.5 11 8 11L17 11L20 15L40 15C42 15 44 17 44 19L44 35C44 37 42 39 40 39L8 39C5.5 39 4 37.5 4 35Z" fill={p.color} fillOpacity="0.85"/>
                </svg>
              </div>
              <span className="files-folder-name">{p.name}</span>
              <span className="files-folder-sub">{p.type}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function SettingsApp({ onClose }) {
  const [expanded, setExpanded] = useState(null);
  return (
    <div className="ios-app settings-app">
      <DynamicIsland/>
      <StatusBar dark/>
      <NavBar title="Skills" onBack={onClose}/>
      <div className="ios-scroll-area">
        <div className="settings-profile-cell">
          <img src="/profile.jpg" alt="Rayansh" className="settings-avatar"/>
          <div className="settings-profile-info">
            <div className="settings-profile-name">Rayansh Singh</div>
            <div className="settings-profile-sub">MSU Computer Science · 2026</div>
          </div>
          <span className="settings-chevron">›</span>
        </div>

        <div className="settings-gap"/>

        <div className="settings-group">
          {SKILLS.map((group, i) => (
            <React.Fragment key={group.label}>
              <button className="settings-row" onClick={() => setExpanded(expanded === i ? null : i)}>
                <div className="settings-row-icon" style={{ background: group.color }}>
                  <span>{group.emoji}</span>
                </div>
                <span className="settings-row-label">{group.label}</span>
                <div className="settings-row-right">
                  <span className="settings-row-value">{group.items.length} skills</span>
                  <span className="settings-chevron" style={{ transform: expanded === i ? 'rotate(90deg)' : 'none', transition: 'transform .2s' }}>›</span>
                </div>
              </button>
              {expanded === i && (
                <div className="settings-expanded">
                  {group.items.map(skill => (
                    <div key={skill} className="settings-skill-row">
                      <div className="settings-skill-dot" style={{ background: group.color }}/>
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              )}
              {i < SKILLS.length - 1 && <div className="settings-separator"/>}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

function LeadershipApp({ onClose }) {
  const [expanded, setExpanded] = useState(null);
  return (
    <div className="ios-app cal-app">
      <DynamicIsland/>
      <StatusBar dark/>
      <NavBar title="Leadership" onBack={onClose}/>
      <div className="ios-scroll-area">
        <div className="cal-header">
          <div className="cal-header-title">Roles</div>
        </div>
        <div className="cal-list">
          {LEADERSHIP.map((item, i) => (
            <div key={i} className="cal-event" onClick={() => setExpanded(expanded === i ? null : i)}>
              <div className="cal-dot" style={{ background: item.color }}/>
              <div className="cal-event-body">
                <div className="cal-company">{item.org}</div>
                <div className="cal-role">{item.role}</div>
                <div className="cal-period">{item.period}</div>
                {expanded === i && (
                  <div className="cal-expanded">
                    <ul className="cal-bullets">
                      {item.bullets.map((b, j) => <li key={j}>{b}</li>)}
                    </ul>
                  </div>
                )}
              </div>
              <span className="cal-chevron">{expanded === i ? '∨' : '›'}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PhotosApp({ onClose, photos, onPhotoClick }) {
  return (
    <div className="ios-app photos-app">
      <DynamicIsland/>
      <StatusBar dark/>
      <NavBar title="Photos" onBack={onClose}/>
      <div className="ios-scroll-area">
        <div className="photos-section-title">Recents</div>
        {photos.length === 0 ? (
          <div className="photos-empty">
            <div className="photos-empty-icon">📷</div>
            <div className="photos-empty-text">No photos yet</div>
            <div className="photos-empty-sub">Drag and drop photos to add them</div>
          </div>
        ) : (
          <div className="photos-grid">
            {photos.map((photo, i) => (
              <button key={photo.id} className="photos-cell" onClick={() => onPhotoClick(photo.src, i)}>
                <img src={photo.src} alt={photo.alt} loading="lazy"/>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function MusicApp({ onClose }) {
  const [playing, setPlaying] = useState(null);
  return (
    <div className="ios-app music-app">
      <DynamicIsland/>
      <StatusBar/>
      <NavBar title="Favorites" onBack={onClose} backLabel="Library"/>
      <div className="ios-scroll-area music-scroll">
        <div className="music-header">
          <div className="music-header-art">
            {SONGS.slice(0, 4).map((s, i) => (
              <div key={i} className="music-art-quad" style={{ background: `linear-gradient(135deg, ${s.color}cc, ${s.color}66)`, overflow: 'hidden' }}>
                {s.cover && <img src={s.cover} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.target.style.display = 'none'; }}/>}
              </div>
            ))}
          </div>
          <div className="music-header-title">Favorites</div>
          <div className="music-header-sub">{SONGS.length} songs · personal mix</div>
          <div className="music-header-actions">
            <button className="music-play-btn" onClick={() => setPlaying(p => p === null ? 0 : null)}>
              <svg width="13" height="14" viewBox="0 0 13 14" fill="currentColor"><path d="M1 1.5l11 5.5-11 5.5z"/></svg>
              Play
            </button>
            <button className="music-shuffle-btn" onClick={() => setPlaying(Math.floor(Math.random() * SONGS.length))}>
              <svg width="16" height="12" viewBox="0 0 16 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M1 1h2.5l7 10H13M1 11h2.5l2.25-3.2M10.5 4.4L13 1M10.5 7.5L13 11"/></svg>
              Shuffle
            </button>
          </div>
        </div>

        <div className="music-list">
          {SONGS.map((song, i) => (
            <button key={i} className={`music-row${playing === i ? ' playing' : ''}`} onClick={() => {
              setPlaying(playing === i ? null : i);
              window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(song.title + ' ' + song.artist)}`, '_blank', 'noopener,noreferrer');
            }}>
              <div className="music-album-art" style={{ background: `linear-gradient(135deg, ${song.color}dd, ${song.color}66)` }}>
                {song.cover ? (
                  <img src={song.cover} alt={`${song.title} by ${song.artist}`} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }} onError={(e) => { e.target.style.display = 'none'; }}/>
                ) : null}
                {playing === i && (
                  <div className="music-playing-bars">
                    <span/><span/><span/>
                  </div>
                )}
              </div>
              <div className="music-song-body">
                <div className="music-song-title" style={{ color: playing === i ? '#FF2D55' : undefined }}>{song.title}</div>
                <div className="music-song-artist">{song.artist}</div>
              </div>
              <span className="music-song-duration">{song.duration}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function BooksApp({ onClose }) {
  return (
    <div className="ios-app books-app">
      <DynamicIsland/>
      <StatusBar dark/>
      <NavBar title="Reading List" onBack={onClose} backLabel="Library"/>
      <div className="ios-scroll-area">
        <div className="books-empty">
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none" className="books-empty-icon">
            <rect x="8" y="8" width="26" height="40" rx="3" fill="#F59E0B" opacity="0.85"/>
            <rect x="14" y="6" width="26" height="40" rx="3" fill="#F59E0B"/>
            <rect x="18" y="14" width="14" height="2" rx="1" fill="white" opacity="0.7"/>
            <rect x="18" y="19" width="10" height="2" rx="1" fill="white" opacity="0.5"/>
          </svg>
          <div className="books-empty-title">Reading List Empty</div>
          <div className="books-empty-sub">Check back soon — currently curating.</div>
        </div>
      </div>
    </div>
  );
}

// ─── Welcome panel (desktop, no app selected) ──────────────────────────────────

function WelcomePanel() {
  return (
    <div className="welcome-panel">
      <div className="welcome-inner">
        <img src="/profile.jpg" alt="Rayansh" className="welcome-avatar"/>
        <h1 className="welcome-name">Rayansh Singh</h1>
        <p className="welcome-role">Software Engineer · ML / AI Systems</p>
        <p className="welcome-school">Michigan State University · CS '26</p>
        <div className="welcome-links">
          <a href="https://github.com/ray-singh" className="welcome-link" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
          <a href="https://www.linkedin.com/in/rayansh-singh" className="welcome-link" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
          <a href="mailto:singhr26@msu.edu" className="welcome-link">Email ↗</a>
        </div>
        <p className="welcome-hint">← Select an app to explore</p>
      </div>
    </div>
  );
}

// ─── Main ──────────────────────────────────────────────────────────────────────

export default function App() {
  const { scale, isMobile } = useLayoutState();
  const [isLocked, setIsLocked] = useState(true);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [activeApp, setActiveApp] = useState(null);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      setIsUnlocking(true);
      setTimeout(() => { setIsLocked(false); setIsUnlocking(false); }, 580);
    }, 2000);
    return () => clearTimeout(t);
  }, []);
  const [photos, setPhotos] = useState(() =>
    (photoManifest || []).map((fname, i) => ({
      id: `${fname}-${i}`,
      src: `/${fname}`,
      alt: fname.replace(/\.[^.]+$/, ''),
      caption: (photoCaptions && photoCaptions[fname]) || '',
    }))
  );
  const [lightboxSrc, setLightboxSrc] = useState('');
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const [isDragging, setIsDragging] = useState(false);
  const lightboxOpen = Boolean(lightboxSrc);

  const openApp = useCallback((id) => {
    setIsClosing(false);
    setActiveApp(id);
  }, []);

  const closeApp = useCallback(() => {
    if (!activeApp) return;
    setIsClosing(true);
    setTimeout(() => { setActiveApp(null); setIsClosing(false); }, 310);
  }, [activeApp]);

  // Lightbox keyboard nav
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') { setLightboxSrc(''); setLightboxIndex(-1); }
      else if (e.key === 'ArrowLeft' && photos.length && lightboxIndex >= 0) {
        const prev = (lightboxIndex - 1 + photos.length) % photos.length;
        setLightboxIndex(prev); setLightboxSrc(photos[prev].src);
      } else if (e.key === 'ArrowRight' && photos.length && lightboxIndex >= 0) {
        const next = (lightboxIndex + 1) % photos.length;
        setLightboxIndex(next); setLightboxSrc(photos[next].src);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [photos, lightboxIndex]);

  // Photo drop zone (outside phone for desktop convenience)
  const handleFiles = useCallback(async (fileList) => {
    const files = Array.from(fileList || []).filter(f => f.type.startsWith('image/'));
    if (!files.length) return;
    const loaded = await Promise.all(files.map(async (file) => {
      const src = await readImageAsDataUrl(file);
      return { id: `${file.name}-${file.lastModified}`, src, alt: file.name.replace(/\.[^.]+$/, '') };
    }));
    setPhotos(prev => [...prev, ...loaded]);
  }, []);

  const renderAppContent = () => {
    const props = { onClose: closeApp };
    switch (activeApp) {
      case 'notes':    return <NotesApp {...props}/>;
      case 'calendar': return <CalendarApp {...props}/>;
      case 'files':    return <FilesApp {...props}/>;
      case 'settings':    return <SettingsApp {...props}/>;
      case 'leadership':  return <LeadershipApp {...props}/>;
      case 'music':       return <MusicApp {...props}/>;
      case 'writings':    return <BooksApp {...props}/>;
      case 'photos':   return <PhotosApp {...props} photos={photos} onPhotoClick={(src, i) => { setLightboxSrc(src); setLightboxIndex(i); }}/>;
      default: return null;
    }
  };

  const renderActiveApp = () => {
    const cls = `ios-app-screen${isClosing ? ' closing' : ''}`;
    return <div className={cls}>{renderAppContent()}</div>;
  };

  return (
    <div
      className={`page-bg${(activeApp && !isClosing && !isMobile) ? ' panel-open' : ''}`}
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={async (e) => { e.preventDefault(); setIsDragging(false); await handleFiles(e.dataTransfer.files); }}
    >
      {isDragging && <div className="drag-hint">Drop photos to add to gallery</div>}

      {/* Lightbox */}
      <div
        id="lightbox"
        className={lightboxOpen ? 'open' : ''}
        onClick={(e) => { if (e.target.id === 'lightbox') { setLightboxSrc(''); setLightboxIndex(-1); } }}
      >
        <button className="lb-arrow lb-prev" onClick={(e) => { e.stopPropagation(); if (!photos.length || lightboxIndex < 0) return; const prev = (lightboxIndex - 1 + photos.length) % photos.length; setLightboxIndex(prev); setLightboxSrc(photos[prev].src); }}>‹</button>
        <span className="lb-close" onClick={() => { setLightboxSrc(''); setLightboxIndex(-1); }}>✕</span>
        <img id="lightbox-img" src={lightboxSrc || ''} alt=""/>
        <button className="lb-arrow lb-next" onClick={(e) => { e.stopPropagation(); if (!photos.length || lightboxIndex < 0) return; const next = (lightboxIndex + 1) % photos.length; setLightboxIndex(next); setLightboxSrc(photos[next].src); }}>›</button>
      </div>

      {/* Left: Phone column */}
      <div className="layout-phone-col">
        <div className="iphone-positioner" style={{ transform: `scale(${scale})` }}>
          <div className="iphone-frame">
            <div className="btn-action"/>
            <div className="btn-vol-up"/>
            <div className="btn-vol-down"/>
            <div className="btn-power"/>

            <div className="iphone-screen">
              <div className={`home-screen${(activeApp && isMobile) ? ' obscured' : ''}`}>
                <div className="home-bg-blur"/>
                <DynamicIsland/>
                <StatusBar/>
                <div className="home-top-pad"/>
                <HomeWidget/>
                <div className="home-grid">
                  {APPS_GRID.map(app => (
                    <AppIcon key={app.id} app={app} onTap={openApp} active={!isMobile && activeApp === app.id}/>
                  ))}
                </div>
                <div className="home-spacer"/>
                <div className="home-page-dots">
                  <div className="home-page-dot active"/>
                  <div className="home-page-dot"/>
                  <div className="home-page-dot"/>
                </div>
                <div className="home-dock">
                  {DOCK_APPS.map(app => (
                    <AppIcon key={app.id} app={app} onTap={openApp} dock active={!isMobile && activeApp === app.id}/>
                  ))}
                </div>
              </div>

              {/* Mobile only: active app renders inside the phone */}
              {activeApp && isMobile && renderActiveApp()}

              {isLocked && <LockScreen isUnlocking={isUnlocking}/>}

              <div
                className="home-indicator"
                style={{ background: (activeApp && isMobile) ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.38)' }}
                onClick={isMobile ? closeApp : undefined}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Right: Content panel (desktop only) */}
      <div className="layout-content-col">
        {activeApp && (
          <div className={`panel-app-screen${isClosing ? ' closing' : ''}`}>
            {renderAppContent()}
          </div>
        )}
      </div>
    </div>
  );
}
