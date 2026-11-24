export const LINKS = {
  github: 'https://github.com/ray-singh',
  linkedin: 'https://www.linkedin.com/in/rayansh-singh',
  email: 'mailto:singhr26@msu.edu',
};

export const EXPERIENCE = [
  {
    company: 'FI Consulting',
    short: 'FI Consulting',
    year: '26',
    role: 'AI Engineer (Analyst)',
    location: 'Arlington, VA',
    period: 'Oct 2026 – Present',
    items: [
      {
      problem: 'The company wanted to build AI-first software and agentic systems powered by local LLMs, but had no shared process or training for either.',
      solution: 'Partnering with the CTO to design an AI-first software development lifecycle and a company-wide technical workshop on building agentic systems with local LLMs.',
      outcome: 'In progress. I started in October 2026 and both pieces are still being developed.',
      learned: 'Teaching a workflow forces every implicit step to become explicit, and that turns out to be most of the work.',
      },
    ],
    tags: [],
  },
  {
    company: 'Delta Dental',
    short: 'Delta Dental',
    year: '26',
    role: 'AI Engineering Intern',
    location: 'Okemos, MI',
    period: 'May – Sep 2026',
    items: [
      {
        problem: 'Knowledge was spread across 300+ SAS assets, and finding the right one could take days.',
        solution: 'Built an enterprise RAG platform with LangGraph, FastAPI, Oracle Vector DB, and LLMs for natural-language search over those assets.',
        outcome: '2,500+ users got natural-language access, and multi-day discovery dropped to sub-2-second retrieval. Retrieval precision reached 94% on an analyst-curated evaluation set.',
        learned: 'Retrieval quality is decided by the evaluation set. Building one with analysts and measuring against it did more for precision than swapping models.',
      },
      {
        problem: 'An 11-person team was limited by how much credential verification they could handle.',
        solution: 'Co-developed an autonomous credential verification workflow with Azure AI Foundry, tool-calling agents, and Playwright.',
        outcome: 'The team absorbed 30% more volume.',
        learned: 'Agents that drive a browser fail in small ways, so the workflow needs checks and a clear path back to a person.',
      },
    ],
    tags: ['LangGraph', 'FastAPI', 'Oracle Vector DB', 'Azure AI Foundry', 'Playwright', 'Python'],
  },
  {
    company: 'MSU Federal Credit Union',
    short: 'MSUFCU',
    year: '26',
    role: 'Student Software Engineer, University Capstone',
    period: 'Jan – May 2026',
    items: [
      {
        problem: 'A 6-person capstone team building a blockchain-settled P2P payments app needed a reproducible environment.',
        solution: 'Owned the infrastructure layer and delivered a containerized 4-service Docker environment with automated CI/CD.',
        outcome: 'The whole stack ran in containers with automated CI/CD.',
        learned: 'Setting up CI/CD early makes every later change cheaper to ship.',
      },
      {
        problem: 'Ethereum settlement state had to stay consistent with the application database.',
        solution: 'Implemented an event-driven reconciliation layer in Python that synchronizes Ethereum settlement state with Postgres.',
        outcome: 'The schema stays consistent across async transaction states.',
        learned: 'Chain state and database state are two sources of truth, so the schema has to model every in-between state instead of assuming transactions are atomic.',
      },
    ],
    tags: ['Flask', 'React', 'Docker', 'Web3.py', 'Firebase', 'GitHub Actions'],
  },
  {
    company: 'Human Augmentation & AI Lab',
    short: 'HAAIL',
    year: '26',
    role: 'Machine Learning Researcher',
    location: 'East Lansing, MI',
    period: 'Jan – Aug 2026',
    items: [
      {
      problem: 'Risk-aware decision systems need to know when an LLM\'s confidence can be trusted. Testing that across 80K+ headlines and 9 open-weight models was slow.',
      solution: 'Evaluated calibrated LLM confidence for risk-aware decision systems, and optimized the inference pipeline with quantization, vLLM, and data parallelism across multiple CUDA GPUs.',
      outcome: 'A 3× speedup in LLM experiments, which made it practical to run the full set of models and headlines.',
      learned: 'Inference throughput limits how many questions you can ask. A faster pipeline meant more experiments, and that mattered more than any single result.',
      },
    ],
    tags: ['vLLM', 'PyTorch', 'CUDA', 'Quantization', 'Open-weight LLMs'],
  },
  {
    company: 'Delta Dental',
    short: 'Delta Dental',
    year: '25',
    role: 'Software Engineering Intern',
    period: 'May – Dec 2025',
    items: [
      {
        problem: 'Dental plan modifications were processed by hand and took about 1.5 hours each.',
        solution: 'Architected a full-stack platform for plan modifications.',
        outcome: 'Processing time fell 98% (1.5 hours to 45 seconds) for 150+ internal users.',
        learned: 'Automating a manual process starts with writing down what the people doing it actually do.',
      },
      {
        problem: 'The REST API behind the platform made redundant database calls.',
        solution: 'Refactored a Java REST API with cache invalidation logic.',
        outcome: 'Redundant database calls dropped 60%.',
        learned: 'Caching is easy to add and hard to invalidate. Most of the gain came from deciding when cached data stops being true.',
      },
      {
        problem: 'QA was slow.',
        solution: 'Integrated automated smoke tests into CI/CD with Testim.io.',
        outcome: 'QA time dropped 35%.',
        learned: 'Smoke tests earn their keep by being few, fast, and run on every change.',
      },
    ],
    tags: ['Angular', 'TypeScript', 'Node.js', 'Java', 'MongoDB', 'Testim.io'],
  },
  {
    company: 'Deloitte Consulting',
    short: 'Deloitte',
    year: '24',
    role: 'Data Engineering Intern',
    location: 'Delhi, India',
    period: 'May – Aug 2024',
    items: [
      {
      problem: 'More than 500K records a week had to be ingested and transformed reliably, without someone running it by hand.',
      solution: 'Constructed an ETL pipeline with AWS Glue and PySpark for automated ingestion and transformation.',
      outcome: 'Automated handling of 500K+ records per week.',
      learned: 'My first look at data work at scale. Pipelines are mostly about the messy cases, not the happy path.',
      },
    ],
    tags: ['AWS Glue', 'PySpark', 'ETL'],
  },
  {
    company: 'Michigan State University',
    short: 'MSU',
    year: '23',
    role: 'Undergraduate Teaching Assistant',
    period: 'Aug – Dec 2023',
    items: [
      {
      problem: 'Students in pre-calculus and trigonometry needed support beyond lectures.',
      solution: 'Tutored 200+ students and ran biweekly review sessions.',
      outcome: 'The average exam score of 15 students rose to 89%.',
      learned: 'Explaining something well means finding where the other person\'s mental model breaks. I still use that when writing docs and papers.',
      },
    ],
    tags: [],
  },
];

export const EDUCATION = {
  school: 'Michigan State University',
  degree: 'B.S. Computer Science, Minor in Applied Math',
  detail: 'GPA 3.81/4.0',
  date: 'August 2026',
};

export const PUBLICATIONS = [
  { venue: 'ACM ICAIF ’26', role: 'First author', title: 'Ordinal Gates, Cardinal Bets: Matching LLM Confidence to The Financial Decision Operator' },
  { venue: 'NeurIPS ’26 SLM-Agents Workshop', role: 'Sole author', title: 'Same Quantization, Different Failure Modes: Multi-Turn Tool-Calling in Small Language Models' },
];

// Each project carries a "figure": the headline metric shown in hollow type above its write-up.
export const PROJECTS = [
  {
    name: 'Ordinal Gates, Cardinal Bets: Matching LLM Confidence to the Financial Decision Operator',
    stack: 'ACM ICAIF ’26 · First author',
    desc: 'A study of how LLM confidence scores behave once a financial decision operator consumes them. Rank-based gates ignore score magnitude, so monotone recalibration cannot change them. Position sizing uses magnitude, so a confidence map and its fitted exposure scale have to be matched. Tested on FactSet news for Nasdaq-100 equities with nine open-weight LLMs, fitting on 2021 and evaluating out-of-sample on 2022–2023.',
    problem: 'Confidence scores are usually calibrated and evaluated on their own. In a financial system they feed an operator that turns them into a decision, so swapping the model, the elicitation method, or the calibration map can silently break a risk controller fitted to the old scores.',
    learned: [
      'Monotone recalibration cannot change a coverage-matched, rank-based gate, so ordinal operators need discrimination, not calibrated magnitude.',
      'Position sizing consumes score magnitude, so confidence maps and fitted exposure scales are coupled and not portable on their own.',
      'Confidence transformations should be evaluated together with the downstream controllers that consume them.',
    ],
    metrics: [
      'Matching each map with its scale: +9.2pp/yr ensemble CER (p < 0.001)',
      'Scale transfer lowered CER in 8 of 9 models',
      'Mismatch ran a raw system at up to 2.8× its intended risk',
      'Gain falls to +1.6pp/yr under an adaptive-volatility controller',
    ],
    link: 'https://arxiv.org/pdf/2609.00187v2',
    linkLabel: 'Paper on arXiv',
    figure: '+9.2pp',
  },
  {
    name: 'Same Quantization, Different Failures: Multi-Turn Tool-Calling in Small Language Models',
    stack: 'NeurIPS ’26 SLM-Agents Workshop · Sole author',
    desc: 'An evaluation of six small open-weight models (1–4B) at four GGUF precisions (F16, Q8_0, Q5_K_M, Q4_K_M) on the multi-turn portion of BFCL v4. The significant results hold for xLAM-2-3B and Qwen3-1.7B. The main contribution is a reusable diagnostic: per-call, per-trajectory, and silent-failure rates read together, with a floor and format check.',
    problem: 'Post-training quantization is common when tool-calling models run locally, but its effect on small models\' multi-turn behavior is not well understood. Aggregate accuracy also hides which failure mode grows.',
    learned: [
      'xLAM-2-3B\'s per-call success rate stays stable while Qwen3-1.7B\'s wrong-argument rate rises from 20.8% to 26.9%, so the same quantization step fails in different ways.',
      'Four of the six models sit at a full-precision floor or are output-format-limited, so a floor and format check is needed to separate a quantization effect from a ceiling.',
      'Silent failures, trajectories with no runtime error that still miss the target end state, need their own metric.',
    ],
    metrics: [
      '6 models × 4 GGUF precisions on BFCL v4 multi-turn',
      'xLAM-2-3B at Q4_K_M: 58.00% → 51.75% task accuracy',
      'Qwen3-1.7B at Q4_K_M: 14.50% → 8.75% task accuracy',
      'Both significant (paired McNemar, Bonferroni)',
    ],
    link: 'https://github.com/ray-singh/slm-agents-paper/blob/main/paper.pdf',
    linkLabel: 'Paper (PDF on GitHub)',
    figure: '58→52%',
  },
  {
    name: 'OpenBB CME Data Provider',
    stack: 'Python · Pydantic · asyncio · pytest',
    desc: 'An open-source pull request to OpenBB that adds a CME data provider. It was closed without merging because its target branch was deleted. Automated metadata discovery and asynchronous REST ingestion give access to 3,700+ instruments. Pooled HTTP sessions and a cache fallback keep it reliable, backed by 45 unit and integration tests across the API, metadata, and provider components.',
    metrics: ['3,700+ instruments', 'Async REST ingestion', '45 unit + integration tests', 'PR closed unmerged (target branch deleted)'],
    link: 'https://github.com/ray-singh',
    linkLabel: 'GitHub profile',
    figure: '3,700+',
  },
  {
    name: 'Adaptive Multi-Tenant LLM Inference Server',
    stack: 'C++ · llama.cpp · gRPC · Redis · Docker · Kubernetes · CMake',
    desc: 'A C++ LLM inference server on llama.cpp with continuous batching and KV-cache reuse, increasing throughput by 27% over FIFO scheduling at 16 concurrent sequences on Apple Silicon. Rate limiting, priority scheduling, and request deadlines are distributed across horizontally scaled workers via Redis. It exposes an OpenAI-compatible REST API and a gRPC service.',
    problem: 'Most open-source inference servers are Python-heavy, which puts interpreter overhead on the critical path. FIFO scheduling makes it worse: one long generation blocks every short request behind it, and there is no notion of per-tenant fairness. In a shared environment, one runaway client can saturate the server while everyone else queues.',
    learned: [
      'Continuous batching with a shared KV cache removes the GPU idle time caused by padding in static batches, and the gains compound as concurrency rises.',
      'Redis token buckets give distributed rate limiting with negligible overhead. Without them, fairness across nodes means a central bottleneck or inconsistent limits.',
      'Serving REST and gRPC from one binary forces a single canonical API model, which prevents interface drift.',
    ],
    metrics: ['27% throughput vs FIFO', '16 concurrent sequences on Apple Silicon', '3-tier priority scheduling', 'OpenAI-compatible REST + gRPC', 'Kubernetes autoscaling'],
    link: 'https://github.com/ray-singh/Adaptive-Multi-Tenant-Inference-Server',
    figure: '+27%',
  },
  {
    name: 'Distributed AI Agent Orchestrator',
    stack: 'Python · Redis · LangGraph · Lua · React · FastAPI',
    desc: 'A Redis-backed task orchestration engine that coordinates 50+ concurrent AI agents through durable task state machines. Lua scripts for atomic task-claiming and automated task reassignment reduced mean failure-recovery time from ~70 seconds to 8 seconds.',
    problem: 'Coordinating dozens of AI agents concurrently without deadlocks, lost updates, or cascading failures. Traditional queues struggled when agents claimed tasks and failed mid-execution, which required complex rollback.',
    learned: [
      'Lua script atomicity is essential when Redis is the source of truth.',
      'Incremental checkpoints beat full-state snapshots for large agent systems.',
      'Separating task claiming from execution prevents orphaned work.',
    ],
    metrics: ['70s → 8s recovery time', '50+ concurrent agents', '0% race conditions', '<50ms task-claim latency'],
    link: 'https://github.com/ray-singh/Sentinel-Node-Orchestrator',
    webLink: 'https://sentinel-indol-nine.vercel.app/',
    figure: '8s',
  },
  {
    name: 'BTC Volatility Forecasting',
    stack: 'PyTorch · LightGBM · FastAPI · GCP',
    desc: "A volatility forecaster and liquidity shock detector built on 50+ Level-2 orderbook features (OFI, spread, depth imbalances) that price history alone can't see. LightGBM beat HAR-RV by 45% RMSE and was tested against Transformers and TCNs with full MLflow tracking. Served from GCP Cloud Run at ~8k req/sec with a Streamlit dashboard for live inference and feature ablation.",
    problem: 'HAR-RV is built entirely on price history, so it is blind to liquidity crises forming in the orderbook before price moves. Crypto markets are also non-stationary, so naive train/test splits leak the future into training and make everything look better than it is.',
    learned: [
      'Orderbook features outpredict price-derived signals. Microstructure sees pressure before price reacts.',
      'One model can jointly optimize regression and classification without degrading either, as long as the tasks share signal.',
      'Strict chronological holdouts are non-negotiable in financial ML. Random splits produce optimistic metrics.',
    ],
    metrics: ['45% RMSE vs HAR-RV', '0.94 AUROC · 0.88 AUPRC', '~8k req/sec · p99 < 0.52ms', '50+ microstructure features', '5 architectures benchmarked'],
    link: 'https://github.com/ray-singh/Volatility-Forecasting',
    webLink: 'https://volcast-streamlit-3988143537.us-central1.run.app/',
    figure: '−45%',
  },
  {
    name: 'Regime-Adaptive Stat Arb',
    stack: 'HMM · NumPy · Flask · React',
    desc: 'A trading-pair discovery engine over 200 assets that uses Hidden Markov Models to segment 4 market regimes. A vectorized NumPy pre-filter tests 22.5k pairs (85% compute reduction), evaluation runs in batched ThreadPoolExecutor workers, and 3-tier caching (LRU, TTL pickle, MD5-keyed Parquet) brings the React + Flask dashboard to sub-1s runtime.',
    problem: 'Traditional statistical arbitrage assumes relationships between assets stay constant. Markets actually shift between regimes (bull runs, crashes, volatile periods), and a pairs strategy that works in calm conditions can fail badly in volatile ones.',
    learned: [
      'Vectorized NumPy pre-filters shrink the cointegration search space by 87% (22.5k to 3k pairs).',
      'Multi-tier caching is essential for sub-second repeated queries.',
      'Batched ThreadPoolExecutor parallelization beats naive threading on I/O-bound filtering.',
    ],
    metrics: ['200+ assets tested', '22.5k → 3k filtered pairs', '85% compute cost reduction', '~10min → sub-1s runtime', '4 regimes detected'],
    link: 'https://github.com/ray-singh/regime-adaptive-stat-arb',
    webLink: 'https://regime-pairs.vercel.app/',
    figure: '4',
  },
  {
    name: 'Personal Finance Agent',
    stack: 'Next.js · LangGraph · OpenAI · pgvector',
    desc: 'A LangGraph agent with 14 tools for SQL generation, anomaly detection, and vector memory. A RAG pipeline with OpenAI embeddings and pgvector powers semantic transaction search, context-aware chat, and persistent memory. It passes 96% of a 100-query real-world benchmark and grew from 5 to 60+ weekly active users.',
    problem: "Personal finance apps lack assistants that understand transaction context. Users need both semantic search ('show me unusual spending') and structured queries ('total by category'), with continuity across sessions.",
    learned: [
      'pgvector outperforms naive text search by 4x on financial queries.',
      'Composing tools in LangGraph beats monolithic agents for finance use cases.',
      'Persistent memory turns one-off queries into multi-turn insights.',
    ],
    metrics: ['96% benchmark pass rate', '14 specialized tools', '5 → 60 weekly users', '<3s semantic search'],
    link: 'https://github.com/ray-singh/FinMind',
    webLink: 'https://finmind-seven.vercel.app/',
    figure: '96%',
  },
];

export const SKILLS = [
  { label: 'Languages', items: ['Python', 'C / C++', 'JavaScript', 'TypeScript', 'SQL'] },
  { label: 'AI / ML', items: ['PyTorch', 'Hugging Face', 'vLLM', 'scikit-learn', 'llama.cpp', 'LangGraph', 'LangChain', 'RAG'] },
  { label: 'Systems & Data', items: ['FastAPI', 'Flask', 'Node.js', 'gRPC', 'Redis', 'Oracle', 'PostgreSQL', 'MongoDB', 'PySpark', 'React', 'Next.js'] },
  { label: 'Cloud & Infrastructure', items: ['Docker', 'AWS', 'Azure AI Foundry', 'GCP', 'Git', 'CI/CD'] },
];

export const LEADERSHIP = [
  { role: 'Resident Assistant', org: 'Michigan State University', period: '2026', note: 'Live-in advisor for 40+ residents, running monthly wellness and community programming with a team of 16 RAs.' },
  { role: 'Executive Board Member', org: 'Google Developer Groups, MSU', period: '2024–25', note: 'Organized workshops and speaker events on cloud and AI/ML reaching 100+ students per semester, and mentored underclassmen on portfolio projects.' },
];

export const SONGS = [
  { title: 'How to Disappear', artist: 'Lana Del Rey' },
  { title: 'Hello, Goodbye', artist: 'The Beatles' },
  { title: 'Cobra', artist: 'Geese' },
  { title: 'Belinda Says', artist: 'Alvvays' },
  { title: 'i finally understand', artist: 'Charli XCX' },
  { title: 'minipops 67', artist: 'Aphex Twin' },
  { title: 'Nights', artist: 'Frank Ocean' },
  { title: 'Meat Grinder', artist: 'Madvillain' },
  { title: 'Someone Great', artist: 'LCD Soundsystem' },
  { title: 'Theme from New York, New York', artist: 'Frank Sinatra' },
];
