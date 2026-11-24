import React, { useRef, useState } from 'react';
import { LINKS, EXPERIENCE, EDUCATION, PUBLICATIONS, PROJECTS, SKILLS, LEADERSHIP, SONGS } from './content';

const WEIGHTS = [300, 400, 500, 600, 700, 800, 900];
const pad = (n) => String(n).padStart(2, '0');

// ─── Bars ─────────────────────────────────────────────────────────────────────

function Bar({ position }) {
  return (
    <div className={`bar bar-${position}`}>
      <a href="#top">Rayansh Singh</a>
      <span className="bar-mid">
        <mark>Washington, D.C.</mark>
      </span>
      {position === 'top' ? (
        <nav className="bar-nav">
          <a href="#about">About</a>
          <a href="#work">Work</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </nav>
      ) : (
        <a href={LINKS.email}>singhr26@msu.edu</a>
      )}
    </div>
  );
}

// ─── Art deco divider ─────────────────────────────────────────────────────────

function DecoDivider() {
  return (
    <div className="deco" role="separator" aria-hidden="true">
      <span className="deco-line"/>
      <svg className="deco-mark" viewBox="0 0 160 28" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M0 14H38M48 14H62M98 14H112M122 14H160"/>
        <path d="M80 1L99 14L80 27L61 14Z"/>
        <path d="M80 7L90 14L80 21L70 14Z" fill="currentColor"/>
        <path d="M43 9.5L47.5 14L43 18.5L38.5 14Z" fill="currentColor"/>
        <path d="M117 9.5L121.5 14L117 18.5L112.5 14Z" fill="currentColor"/>
      </svg>
      <span className="deco-line"/>
    </div>
  );
}

// ─── Project figure (headline metric in hollow type) ───────────────────────

function Figure({ project }) {
  return (
    <div className="figure" role="img" aria-label={`${project.name}: ${project.metrics[0]}`}>
      <div className="figure-big" aria-hidden="true">{project.figure}</div>
      <div className="figure-stack" aria-hidden="true">{project.stack}</div>
    </div>
  );
}

// ─── Project write-up ────────────────────────────────────────────────────────

function ProjectText({ project, index }) {
  return (
    <div className="project-text">
      <div className="l">
        <span>{pad(index + 1)} · {project.name}</span>
      </div>
      <p className="project-desc">{project.desc}</p>
      <div className="project-meta">
        <div className="small">
          <div className="small-head">Key metrics:</div>
          {project.metrics.map((m) => <div key={m} className="hang">{m}</div>)}
        </div>
        <div className="small">
          <div className="small-head">Links:</div>
          <div className="hang"><a href={project.link} target="_blank" rel="noopener noreferrer">{project.linkLabel || 'Source on GitHub'} ↗</a></div>
          {project.webLink && (
            <div className="hang"><a href={project.webLink} target="_blank" rel="noopener noreferrer">Live demo ↗</a></div>
          )}
        </div>
      </div>
      {project.problem && (
        <details className="project-more">
          <summary>The problem &amp; what I learned</summary>
          <p>{project.problem}</p>
          {project.learned.map((item) => <div key={item} className="hang">{item}</div>)}
        </details>
      )}
    </div>
  );
}

// ─── Experience write-up ──────────────────────────────────────────────────────

const EXP_PARTS = [
  ['The problem', 'problem'],
  ['My solution', 'solution'],
  ['Outcome', 'outcome'],
  ['What I learnt', 'learned'],
];

function ExperiencePanel({ exp, onClose }) {
  return (
    <div id="exp-panel" className="exp-panel" role="region" aria-label={`${exp.company} write-up`}>
      <div className="l exp-l">
        <span>{exp.company}</span>
        <button type="button" className="exp-close" onClick={onClose}>Close ×</button>
      </div>
      <div className="exp-role">{exp.role}{exp.location ? ` · ${exp.location}` : ''}</div>
      <div className="role-period exp-period">{exp.period}</div>
      {exp.items.map((item, n) => (
        <div key={n} className="exp-item">
          {exp.items.length > 1 && <div className="exp-n">{n + 1} / {exp.items.length}</div>}
          <dl className="exp-parts">
            {EXP_PARTS.map(([label, key]) => (
              <div key={key}>
                <dt>{label}</dt>
                <dd>{item[key]}</dd>
              </div>
            ))}
          </dl>
        </div>
      ))}
      {exp.tags.length > 0 && <div className="role-tags">{exp.tags.join(' · ')}</div>}
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function App() {
  const railRef = useRef(null);
  const scrollRail = (dir) => {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.querySelector('.project-card');
    rail.scrollBy({ left: dir * (card ? card.offsetWidth + 14 : 400), behavior: 'smooth' });
  };
  const [openExp, setOpenExp] = useState(null);

  return (
    <div className="page" id="top">
      <div className="frame">
        <Bar position="top"/>

        <main className="inner">
          <h1 className="hero">Rayansh Singh</h1>
          <DecoDivider/>

          {/* About */}
          <section id="about" className="g">
            <div className="c4 about-text">
              <div className="l">About</div>
              <p>
                I'm an engineer and researcher interested in fast, reliable AI.
              </p>
              <p>My work spans:</p>
              <ul className="deco-list">
                <li><strong>LLM calibration:</strong> studied how uncertainty estimates interact with downstream risk controllers.</li>
                <li><strong>ML infra:</strong> LLM serving, retrieval systems, and production agentic AI applications used by 2,500+ people.</li>
                <li><strong>Agent reliability:</strong> investigated how quantization breaks multi-turn tool-calling.</li>
              </ul>
              <p>
                I'm also interested in GPU programming and AI numerics, especially how precision and kernel choices affect inference and model behavior.
              </p>
              <p>
                If any of this overlaps with what you're working on, say hi :)
              </p>
            </div>
            <div className="c2 stack">
              <div>
                <div className="l">Research</div>
                <div className="t14">
                  {PUBLICATIONS.map((pub) => (
                    <div key={pub.title} className="hang pub">
                      <div className="small-head">{pub.venue}, {pub.role.toLowerCase()}:</div>
                      <em>{pub.title}</em>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="l">Currently</div>
                <p className="t14">
                  AI Engineer (Analyst) at FI Consulting in Arlington, VA.<br/>
                  Forward Deployed to Freddie Mac in McLean, VA. 
                </p>
              </div>
              <div>
                <div className="l">Off hours</div>
                <p className="t14">
                  Playing tennis, grabbing coffee, taking photographs, learning something new, or working on my next project.
                </p>
              </div>
            </div>
          </section>

          {/* Manifesto */}
          <section className="manifesto">
            <div className="pills">
              <a className="pill" href={LINKS.github} target="_blank" rel="noopener noreferrer">GitHub</a>
              <a className="pill" href={LINKS.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a className="pill pill-solid" href={LINKS.email}>Get in touch</a>
            </div>
          </section>

          {/* Work overview */}
          <section id="work" className="g">
            <div className="c4">
              <div className="l">Experience, 2023 – Present · select a company</div>
              <div className="weights">
                {EXPERIENCE.map((exp, i) => (
                  <button
                    key={i}
                    type="button"
                    style={{ fontWeight: WEIGHTS[i] }}
                    aria-expanded={openExp === i}
                    aria-controls="exp-panel"
                    onClick={() => setOpenExp(openExp === i ? null : i)}
                  >
                    {exp.short} <i>’{exp.year}</i>
                  </button>
                ))}
              </div>
            </div>
            {openExp !== null && (
              <div className="c2">
                <ExperiencePanel exp={EXPERIENCE[openExp]} onClose={() => setOpenExp(null)}/>
              </div>
            )}
            <div className={openExp !== null ? 'side-wide' : 'c2 stack'}>
              <div>
                <div className="l">Skills</div>
                <div className="skills">
                  {SKILLS.map((g) => (
                    <div key={g.label} className="skill-group">
                      <div className="small-head">{g.label}</div>
                      <div>{g.items.join(', ')}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="l">Leadership</div>
                <div className="small">
                  {LEADERSHIP.map((item) => (
                    <div key={item.role} className="leader">
                      <div className="small-head">{item.role}, {item.period}</div>
                      <div>{item.org}. {item.note}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Projects */}
          <section id="projects" className="projects">
            <div className="l projects-l">
              <span>Selected projects &amp; papers</span>
              <span className="rail-nav">
                <button type="button" aria-label="Previous projects" onClick={() => scrollRail(-1)}>←</button>
                <button type="button" aria-label="Next projects" onClick={() => scrollRail(1)}>→</button>
              </span>
            </div>
            <div className="rail" ref={railRef} tabIndex={0} role="region" aria-label="Selected projects, scroll horizontally">
              {PROJECTS.map((project, index) => (
                <article key={project.name} className="project-card">
                  <Figure project={project}/>
                  <ProjectText project={project} index={index}/>
                </article>
              ))}
            </div>
          </section>

          {/* Coda */}
          <section id="contact" className="coda">
            <div className="coda-inner">
              <div className="small-head">On rotation:</div>
              <div>
                {SONGS.map((s, i) => (
                  <React.Fragment key={s.title}>
                    <a
                      href={`https://www.youtube.com/results?search_query=${encodeURIComponent(`${s.title} ${s.artist}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >{s.title}</a> <i>({s.artist})</i>{i < SONGS.length - 1 ? ' · ' : ''}
                  </React.Fragment>
                ))}
              </div>
              <div className="small-head" style={{ marginTop: 40 }}>Education:</div>
              <div>{EDUCATION.school}, {EDUCATION.degree}, {EDUCATION.date}</div>
              <div className="small-head" style={{ marginTop: 40 }}>Say hello:</div>
              <div>
                <a href={LINKS.email}>singhr26@msu.edu</a> · <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a> · <a href={LINKS.github} target="_blank" rel="noopener noreferrer">GitHub</a>
              </div>
              <p className="credit">
                Design inspired by template D400 from <a href="https://cargo.site" target="_blank" rel="noopener noreferrer">Cargo</a>.
              </p>
            </div>
          </section>
        </main>

        <Bar position="bottom"/>
      </div>
    </div>
  );
}
