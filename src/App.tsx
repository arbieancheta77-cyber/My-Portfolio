import { useEffect, useState, type SVGProps } from 'react';
import { createPortal } from 'react-dom';
import type { Session } from '@supabase/supabase-js';
import { supabase } from './supabase';
import { AddButton, EditModal, ItemActions, LoginModal, fileName, type Item } from './Admin';

type IconProps = SVGProps<SVGSVGElement>;

const ArrowUpRight = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

const ArrowRight = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
    <path d="M5 12h14m-5-5 5 5-5 5" />
  </svg>
);

const Menu = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
    <path d="M4 8h16M4 16h16" />
  </svg>
);

const Close = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
    <path d="m6 6 12 12M18 6 6 18" />
  </svg>
);

const Check = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
    <path d="m5 12 4 4L19 7" />
  </svg>
);

const WorkflowIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" {...props}>
    <rect x="3" y="3" width="6" height="6" rx="1.5" />
    <rect x="15" y="15" width="6" height="6" rx="1.5" />
    <path d="M9 6h3a4 4 0 0 1 4 4v5M15 18h-3a4 4 0 0 1-4-4V9" />
  </svg>
);

const projects = [
  {
    id: '01',
    platform: 'n8n',
    category: 'AI workflows',
    title: 'Lead qualification engine',
    description:
      'An intelligent inbound system that enriches, scores, and routes every lead before your team opens their inbox.',
    result: '18 hrs saved / week',
    tools: ['n8n', 'OpenAI', 'HubSpot'],
    accent: '#ff6b35',
    nodes: ['form', 'enrich', 'score', 'route'],
    images: [] as string[],
    documentation: [] as string[],
  },
  {
    id: '02',
    platform: 'Make',
    category: 'Operations',
    title: 'Client onboarding autopilot',
    description:
      'From signed proposal to a ready-to-go workspace, with zero copying, chasing, or status-checking.',
    result: '92% faster setup',
    tools: ['Make', 'Notion', 'Slack'],
    accent: '#ff6b35',
    nodes: ['sign', 'create', 'notify', 'track'],
    images: [] as string[],
    documentation: [] as string[],
  },
  {
    id: '03',
    platform: 'Zapier',
    category: 'Data pipelines',
    title: 'Daily revenue command center',
    description:
      'A resilient pipeline that unifies transactions, ad spend, and CRM data into one live source of truth.',
    result: '6 sources unified',
    tools: ['Zapier', 'Postgres', 'Metabase'],
    accent: '#ff6b35',
    nodes: ['sync', 'clean', 'merge', 'report'],
    images: [] as string[],
    documentation: [] as string[],
  },
  {
    id: '04',
    platform: 'UiPath',
    category: 'AI workflows',
    title: 'Support response copilot',
    description:
      'Classifies customer requests, drafts on-brand replies, and escalates sensitive tickets to a human.',
    result: '64% auto-resolved',
    tools: ['UiPath', 'Claude', 'Intercom'],
    accent: '#ff6b35',
    nodes: ['listen', 'classify', 'draft', 'resolve'],
    images: [] as string[],
    documentation: [] as string[],
  },
];

const profile = {
  firstName: 'Arbie',
  lastName: 'Ancheta',
  role: 'Automation Engineer',
  tagline: 'I design dependable automation systems that return time to growing teams and keep operations moving.',
  photo: '',
  availability: 'Available for projects',
  aboutTitle: 'Systems that work quietly and reliably.',
  aboutText:
    'I’m an automation engineer focused on turning manual, fragmented processes into clear systems people can trust. I work across operations, sales, support, and reporting.',
  systemsShipped: '48+',
  hoursReturned: '2.4k',
  corePlatforms: '4',
  highlights: [
    'Production-ready workflows with thoughtful error handling',
    'Clear documentation and handoff for your team',
    'Human checkpoints where judgment still matters',
  ],
};

const services = [
  {
    number: '01',
    title: 'Workflow automation',
    description: 'Reliable multi-step systems that remove repetitive work across your day-to-day operations.',
    tools: 'n8n · Make · Zapier',
    images: [] as string[],
  },
  {
    number: '02',
    title: 'AI integration',
    description: 'Practical AI workflows for qualification, support, content, and intelligent decision-making.',
    tools: 'OpenAI · Claude · APIs',
    images: [] as string[],
  },
  {
    number: '03',
    title: 'RPA development',
    description: 'Robotic process automation for rules-based, high-volume tasks across enterprise systems.',
    tools: 'UiPath · Data · Webhooks',
    images: [] as string[],
  },
];

const certifications = [
  {
    issuer: 'n8n',
    title: 'n8n Advanced Automation',
    detail: 'Complex workflows, error handling, and production architecture',
    year: '2025',
    accent: '#ff6b35',
    image: '',
    tags: [] as string[],
    ongoing: false,
  },
  {
    issuer: 'Make',
    title: 'Make Advanced',
    detail: 'Scenario design, data structures, and scalable operations',
    year: '2024',
    accent: '#ff6b35',
    image: '',
    tags: [] as string[],
    ongoing: false,
  },
  {
    issuer: 'UiPath',
    title: 'Automation Developer',
    detail: 'Robotic process automation and enterprise orchestration',
    year: '2024',
    accent: '#ff6b35',
    image: '',
    tags: [] as string[],
    ongoing: false,
  },
  {
    issuer: 'Zapier',
    title: 'Zapier Automation Specialist',
    detail: 'Multi-step Zaps, interfaces, tables, and business logic',
    year: '2023',
    accent: '#ff6b35',
    image: '',
    tags: [] as string[],
    ongoing: false,
  },
];

const skillGroups = [
  {
    title: 'Automation platforms',
    skills: ['n8n', 'Make', 'Zapier', 'UiPath'],
  },
  {
    title: 'AI and data',
    skills: ['OpenAI', 'Claude', 'PostgreSQL', 'API integration'],
  },
  {
    title: 'Business systems',
    skills: ['HubSpot', 'Notion', 'Slack', 'Google Workspace'],
  },
  {
    title: 'Core capabilities',
    skills: ['Workflow design', 'Process mapping', 'Webhooks', 'Error handling'],
  },
];

const experience = [
  {
    period: '2023—Present',
    role: 'Independent Automation Engineer',
    company: 'Freelance and consulting',
    description:
      'Designing and building end-to-end automation systems for growing teams across sales, operations, support, and reporting.',
    tags: [] as string[],
    ongoing: true,
  },
  {
    period: '2021—2023',
    role: 'Automation Specialist',
    company: 'Business operations',
    description:
      'Improved internal workflows by connecting business tools, removing manual data entry, and creating reliable reporting pipelines.',
    tags: [] as string[],
    ongoing: false,
  },
  {
    period: '2019—2021',
    role: 'RPA Developer',
    company: 'Enterprise projects',
    description:
      'Built and maintained robotic process automations for repetitive, rules-based workflows and high-volume operational tasks.',
    tags: [] as string[],
    ongoing: false,
  },
];

const contactLinks = [
  {
    label: 'LinkedIn',
    value: 'Arbie Ancheta',
    href: 'https://www.linkedin.com/in/arbie-ancheta/',
  },
  {
    label: 'Upwork',
    value: 'View freelance profile',
    href: 'https://www.upwork.com/',
  },
  {
    label: 'OnlineJobs.ph',
    value: 'View professional profile',
    href: 'https://www.onlinejobs.ph/',
  },
  {
    label: 'Email',
    value: 'arbie.ancheta@gmail.com',
    href: 'mailto:arbie.ancheta@gmail.com',
  },
  {
    label: 'Discord',
    value: '@arbieancheta',
    href: 'https://discord.com/',
  },
  {
    label: 'Phone',
    value: '+63 900 000 0000',
    href: 'tel:+639000000000',
  },
];

const gallery = [{ image: '', caption: '' }];

const theme = { accentColor: '#ff6b35', darkColor: '#101114', lightColor: '#eef0f2' };

// Built-in content; replaced by the Supabase row once you post your first edit.
const defaultContent = { profile, theme, services, projects, certifications, skillGroups, experience, contactLinks, gallery };
type Content = typeof defaultContent;
type Singleton = 'profile' | 'theme';
type ListSection = Exclude<keyof Content, Singleton>;
type Editing = { section: Singleton } | { section: ListSection; index: number };

// A new post starts as an empty copy of the section's first default item.
const blankItem = (section: ListSection): Item =>
  Object.fromEntries(
    Object.entries(defaultContent[section][0]).map(([key, value]) => [
      key,
      key === 'id' ? crypto.randomUUID() : key === 'accent' ? value : Array.isArray(value) ? [] : typeof value === 'boolean' ? false : '',
    ]),
  );

function WorkflowVisual({ project }: { project: (typeof projects)[number] }) {
  return (
    <div className="workflow-canvas">
      <div className="canvas-grid" />
      <div className="absolute inset-x-6 bottom-6 top-6 flex items-center justify-between">
        {project.nodes.map((node, index) => (
          <div key={node} className="relative z-10 flex items-center">
            {index < project.nodes.length - 1 && <span className="node-line" />}
            <span
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-paper/15 bg-ink shadow-xl"
              style={index === 0 ? { borderColor: 'var(--color-accent)', color: 'var(--color-accent)' } : undefined}
            >
              {index === project.nodes.length - 1 ? (
                <Check className="h-4 w-4 text-accent" />
              ) : (
                <span className="h-2 w-2 rounded-full bg-paper/55" />
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectImages({ images, title, imageClass = 'h-[245px]' }: { images: string[]; title: string; imageClass?: string }) {
  const [index, setIndex] = useState(0);
  const [full, setFull] = useState(false);
  const i = index % images.length; // images can shrink while editing
  const step = (d: number) => setIndex((i + d + images.length) % images.length);
  const navButton = 'flex h-9 w-9 items-center justify-center rounded-full bg-ink/60 text-paper backdrop-blur transition hover:bg-ink';

  useEffect(() => {
    if (!full) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation(); // close only full view, not the project details behind it
        setFull(false);
      }
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey, true);
    return () => window.removeEventListener('keydown', onKey, true);
  });

  const controls = images.length > 1 && (
    <>
      <button type="button" aria-label="Previous image" onClick={() => step(-1)} className={`${navButton} absolute left-3 top-1/2 -translate-y-1/2`}>
        <ArrowRight className="h-4 w-4 rotate-180" />
      </button>
      <button type="button" aria-label="Next image" onClick={() => step(1)} className={`${navButton} absolute right-3 top-1/2 -translate-y-1/2`}>
        <ArrowRight className="h-4 w-4" />
      </button>
      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
        {images.map((src, n) => (
          <button key={src} type="button" aria-label={`Show image ${n + 1}`} onClick={() => setIndex(n)} className={`h-2 rounded-full transition-all ${n === i ? 'w-5 bg-paper' : 'w-2 bg-paper/45'}`} />
        ))}
      </div>
    </>
  );

  return (
    <div className="workflow-canvas">
      <img src={images[i]} alt={`${title} screenshot ${i + 1}`} className={`${imageClass} w-full object-cover`} />
      <button type="button" aria-label="View full size" onClick={() => setFull(true)} className={`${navButton} absolute right-3 top-3`}>
        <ArrowUpRight className="h-4 w-4" />
      </button>
      {controls}
      {/* portal: card's backdrop-filter/transform would trap a fixed overlay */}
      {full && createPortal(
        <div role="dialog" aria-modal="true" aria-label={`${title} images`} onClick={() => setFull(false)} className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/90 p-4 md:p-10">
          <div className="relative flex h-full w-full items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <img src={images[i]} alt={`${title} screenshot ${i + 1}`} className="max-h-full max-w-full rounded-2xl object-contain" />
            <button type="button" aria-label="Close full view" onClick={() => setFull(false)} className={`${navButton} absolute right-3 top-3`}>
              <Close className="h-4 w-4" />
            </button>
            {controls}
          </div>
        </div>,
        document.body,
      )}
    </div>
  );
}

// Office files can't render in an iframe directly, so they go through Microsoft's public viewer.
const docSrc = (url: string) =>
  /\.(docx?|pptx?|xlsx?)$/i.test(url) ? `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(url)}` : url;

function DocsViewer({ project, onClose }: { project: (typeof projects)[number]; onClose: () => void }) {
  const [index, setIndex] = useState(0);
  const url = project.documentation[index];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return createPortal(
    <div role="dialog" aria-modal="true" aria-label={`${project.title} documentation`} onClick={onClose} className="fixed inset-0 z-[60] flex items-end justify-center bg-ink/70 p-0 backdrop-blur-sm md:items-center md:p-8">
      <div onClick={(e) => e.stopPropagation()} className="flex h-[92vh] w-full max-w-[1000px] flex-col gap-4 rounded-t-[28px] bg-paper p-4 text-ink md:rounded-[28px] md:p-6">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="font-mono text-xs uppercase tracking-[.16em] text-accent">Documentation</p>
            <h3 className="truncate text-2xl font-semibold tracking-[-.04em]">{project.title}</h3>
          </div>
          <div className="flex shrink-0 gap-2">
            <a href={url} target="_blank" rel="noreferrer" className="flex h-10 items-center rounded-full border border-ink/15 px-4 text-sm font-semibold transition hover:bg-ink hover:text-paper">
              Open
            </a>
            <button type="button" aria-label="Close documentation" onClick={onClose} className="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-paper transition hover:bg-accent hover:text-ink">
              <Close className="h-5 w-5" />
            </button>
          </div>
        </div>
        {project.documentation.length > 1 && (
          <div className="flex flex-wrap gap-2">
            {project.documentation.map((doc, n) => (
              <button key={doc} type="button" onClick={() => setIndex(n)} className={`max-w-[240px] truncate rounded-full border px-3 py-1.5 text-sm ${n === index ? 'border-ink bg-ink text-paper' : 'border-ink/15'}`}>
                {fileName(doc)}
              </button>
            ))}
          </div>
        )}
        {/\.(png|jpe?g|gif|webp|svg)$/i.test(url) ? (
          <img src={url} alt={fileName(url)} className="min-h-0 flex-1 rounded-2xl object-contain" />
        ) : (
          <iframe key={url} src={docSrc(url)} title={fileName(url)} className="min-h-0 w-full flex-1 rounded-2xl border border-ink/10 bg-white" />
        )}
      </div>
    </div>,
    document.body,
  );
}

function ProjectDetails({ project, onClose }: { project: (typeof projects)[number]; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return createPortal(
    <div role="dialog" aria-modal="true" aria-label={project.title} onClick={onClose} className="fixed inset-0 z-[60] flex items-end justify-center bg-ink/70 p-0 backdrop-blur-sm md:items-center md:p-8">
      <div onClick={(e) => e.stopPropagation()} className="modal-scroll relative max-h-[92vh] w-full max-w-[900px] overflow-y-auto rounded-t-[28px] bg-paper p-4 text-ink md:rounded-[28px] md:p-6">
        {project.images.length ? (
          <ProjectImages images={project.images} title={project.title} imageClass="h-[260px] md:h-[440px]" />
        ) : (
          <WorkflowVisual project={project} />
        )}
        <div className="px-2 pb-4 pt-7 md:px-4">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm font-semibold text-ink/50">
              {project.platform} · {project.category}
            </p>
            <span className="rounded-full bg-ink/5 px-3 py-1.5 text-xs font-medium">{project.result}</span>
          </div>
          <h3 className="text-3xl font-semibold tracking-[-.045em] md:text-5xl">{project.title}</h3>
          <p className="mt-4 max-w-[680px] leading-relaxed text-ink/65">{project.description}</p>
          {project.nodes.length > 0 && (
            <div className="mt-8">
              <p className="mb-3 font-mono text-xs uppercase tracking-[.16em] text-accent">Workflow</p>
              <ol className="flex flex-wrap items-center gap-2">
                {project.nodes.map((node, n) => (
                  <li key={node} className="flex items-center gap-2">
                    <span className="rounded-full border border-ink/15 px-3 py-1.5 text-sm font-medium capitalize">{node}</span>
                    {n < project.nodes.length - 1 && <ArrowRight className="h-4 w-4 text-ink/35" />}
                  </li>
                ))}
              </ol>
            </div>
          )}
          <div className="mt-8">
            <p className="mb-3 font-mono text-xs uppercase tracking-[.16em] text-accent">Tools</p>
            <div className="flex flex-wrap gap-2">
              {project.tools.map((tool) => (
                <span key={tool} className="rounded-md border border-ink/10 px-2.5 py-1.5 font-mono text-xs text-ink/60">
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
        <button type="button" aria-label="Close project" onClick={onClose} className="absolute left-7 top-7 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-paper text-ink shadow transition hover:bg-ink hover:text-paper md:left-9 md:top-9">
          <Close className="h-5 w-5" />
        </button>
      </div>
    </div>,
    document.body,
  );
}

export default function App() {
  const [activeFilter, setActiveFilter] = useState('All platforms');
  const [menuOpen, setMenuOpen] = useState(false);
  const [openProject, setOpenProject] = useState<(typeof projects)[number] | null>(null);
  const [openDocs, setOpenDocs] = useState<(typeof projects)[number] | null>(null);
  const [content, setContent] = useState<Content>(defaultContent);
  const [session, setSession] = useState<Session | null>(null);
  const [loginOpen, setLoginOpen] = useState(false);
  const [editing, setEditing] = useState<Editing | null>(null);
  const isAdmin = !!session;
  const { profile, theme, services, projects, certifications, skillGroups, experience, contactLinks } = content;
  const filters = ['All platforms', ...new Set(projects.map((project) => project.platform))];

  useEffect(() => {
    if (!supabase) return;
    supabase
      .from('site_content')
      .select('data')
      .eq('id', 'main')
      .maybeSingle()
      .then(({ data }) => data && setContent({ ...defaultContent, ...data.data }));
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data } = supabase.auth.onAuthStateChange((_event, nextSession) => setSession(nextSession));
    return () => data.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const root = document.documentElement.style;
    root.setProperty('--color-accent', theme.accentColor);
    root.setProperty('--color-ink', theme.darkColor);
    root.setProperty('--color-paper', theme.lightColor);
  }, [theme]);

  const save = async (next: Content) => {
    const { error } = await supabase!.from('site_content').upsert({ id: 'main', data: next });
    if (error) throw error;
    setContent(next);
    setEditing(null);
  };

  const saveItem = (item: Item) => {
    if (!editing) return Promise.resolve();
    if (!('index' in editing)) return save({ ...content, [editing.section]: item });
    const list: Item[] = [...content[editing.section]];
    if (editing.index === -1) list.push(item);
    else list[editing.index] = item;
    return save({ ...content, [editing.section]: list });
  };

  const removeItem = (section: ListSection, index: number) =>
    save({ ...content, [section]: content[section].filter((_, i) => i !== index) }).catch((e) => window.alert(e.message));

  const actions = (section: ListSection, index: number) =>
    isAdmin && <ItemActions onEdit={() => setEditing({ section, index })} onDelete={() => removeItem(section, index)} />;
  const addButton = (section: ListSection) => isAdmin && <AddButton onClick={() => setEditing({ section, index: -1 })} />;
  const editProfile = isAdmin && <ItemActions onEdit={() => setEditing({ section: 'profile' })} />;

  const editingValue: Item | null = !editing
    ? null
    : !('index' in editing)
      ? content[editing.section]
      : editing.index === -1
        ? blankItem(editing.section)
        : { ...blankItem(editing.section), ...content[editing.section][editing.index] };

  const visibleProjects =
    activeFilter === 'All platforms'
      ? projects
      : projects.filter((project) => project.platform === activeFilter);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="portfolio-shell min-h-screen overflow-hidden text-ink">
      <header className="glass-nav fixed inset-x-0 top-0 z-50 border-b border-paper/50">
        <div className="mx-auto flex h-[72px] max-w-[1400px] items-center justify-between px-5 md:px-8">
          <a href="#top" className="flex items-center gap-3" onClick={closeMenu}>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-accent">
              <WorkflowIcon className="h-[18px] w-[18px]" />
            </span>
            <span className="text-[17px] font-bold uppercase tracking-[-.04em]">
              {profile.firstName} {profile.lastName}
            </span>
          </a>

          <nav className="hidden items-center gap-9 text-sm font-medium md:flex">
            <a className="nav-link" href="#work">Work</a>
            <a className="nav-link" href="#skills">Skills</a>
            <a className="nav-link" href="#experience">Experience</a>
            <a className="nav-link" href="#certifications">Credentials</a>
          </nav>

          <a
            href="#contact"
            className="hidden items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-paper transition hover:bg-ink md:flex"
          >
            Start a project <ArrowUpRight className="h-4 w-4" />
          </a>
          <button
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((open) => !open)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 md:hidden"
          >
            {menuOpen ? <Close className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        {menuOpen && (
          <div className="border-t border-ink/10 bg-paper p-5 md:hidden">
            <nav className="flex flex-col text-2xl font-semibold">
              {['work', 'skills', 'experience', 'certifications'].map((item) => (
                <a key={item} href={`#${item}`} onClick={closeMenu} className="border-b border-ink/10 py-4 capitalize">
                  {item}
                </a>
              ))}
              <a href="#contact" onClick={closeMenu} className="mt-5 rounded-full bg-ink px-5 py-4 text-center text-base text-paper">
                Start a project
              </a>
            </nav>
          </div>
        )}
      </header>

      <main id="top">
        <section className="relative mx-auto max-w-[1400px] px-5 pb-20 pt-28 md:px-8 md:pb-24 md:pt-36">
          <div className="grid gap-6 lg:grid-cols-[1.08fr_.92fr]">
            <div className="glass-panel relative flex min-h-[500px] flex-col justify-center rounded-[28px] border border-paper/55 p-7 md:p-12 lg:p-16">
              {editProfile}
              <p className="mb-5 font-mono text-xs uppercase tracking-[.16em] text-accent">Hi there — I’m</p>
              <h1 className="text-[clamp(4rem,8vw,7.5rem)] font-semibold leading-[.82] tracking-[-.075em]">
                {profile.firstName}
                <span className="block">{profile.lastName}.</span>
              </h1>
              <p className="mt-7 w-fit rounded-full bg-ink px-4 py-2 text-sm font-semibold text-paper">
                {profile.role}
              </p>
              <p className="mt-7 max-w-[620px] text-lg leading-relaxed text-ink/58 md:text-xl">
                {profile.tagline}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#contact" className="flex items-center gap-2 rounded-full bg-accent px-6 py-4 text-sm font-bold transition hover:bg-accent">
                  Start a project <ArrowUpRight className="h-4 w-4" />
                </a>
                <a href="#work" className="group flex items-center gap-3 rounded-full border border-ink/15 px-6 py-4 text-sm font-bold transition hover:border-ink/40">
                  View my work <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </a>
              </div>
            </div>

            <div className="glass-dark relative flex min-h-[500px] items-center justify-center overflow-hidden rounded-[28px] p-8 text-paper">
              <div className="profile-grid absolute inset-0 opacity-40" />
              <div className="hero-orbit pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-paper/10">
                <div className="absolute bottom-[82px] right-[62px] h-3 w-3 rounded-full bg-accent" />
              </div>
              <div className="profile-photo-frame relative z-10 flex h-64 w-64 items-center justify-center overflow-hidden rounded-[28px] md:h-80 md:w-80">
                {profile.photo ? (
                  <img src={profile.photo} alt={`${profile.firstName} ${profile.lastName}`} className="h-full w-full object-cover" />
                ) : (
                  <span className="text-7xl font-semibold tracking-[-.09em] text-paper/85">
                    {profile.firstName[0]}
                    {profile.lastName[0]}
                  </span>
                )}
              </div>
              {profile.availability && (
                <span className="absolute right-6 top-6 rounded-full border border-accent/30 bg-accent/10 px-3 py-2 font-mono text-[10px] uppercase tracking-[.12em] text-accent">
                  {profile.availability}
                </span>
              )}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1400px] px-5 py-20 md:px-8 md:py-24">
          <div className="mb-12 text-center">
            <p className="font-mono text-xs uppercase tracking-[.16em] text-accent">Services</p>
            <h2 className="mt-3 text-5xl font-semibold tracking-[-.055em] md:text-6xl">What I do</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {services.map((service, index) => (
              <article key={index} className="glass-panel hover-card group relative overflow-hidden rounded-[24px] border border-paper/55 p-5">
                {actions('services', index)}
                {service.images?.length ? (
                  <ProjectImages images={service.images} title={service.title} imageClass="h-52" />
                ) : (
                  <div className="workflow-canvas flex min-h-52 items-end p-6">
                    <div className="canvas-grid" />
                    <span className="relative font-mono text-5xl text-accent">{service.number}</span>
                    <WorkflowIcon className="absolute right-6 top-6 h-10 w-10 text-paper/25 transition group-hover:text-accent" />
                  </div>
                )}
                <h3 className="mt-6 text-2xl font-semibold tracking-[-.04em]">{service.title}</h3>
                <p className="mt-3 leading-relaxed text-ink/55">{service.description}</p>
                <p className="mt-6 font-mono text-[10px] uppercase tracking-[.1em] text-ink/40">{service.tools}</p>
              </article>
            ))}
          </div>
          {addButton('services')}
        </section>

        {/* Temporarily hidden: about section */}
        <section id="about" hidden className="mx-auto max-w-[1400px] px-5 py-20 md:px-8 md:py-28">
          <div className="grid items-center gap-8 lg:grid-cols-[.92fr_1.08fr] lg:gap-16">
            <div className="glass-dark relative min-h-[500px] overflow-hidden rounded-[28px] p-8 text-paper">
              <div className="profile-grid absolute inset-0 opacity-50" />
              <div className="relative flex h-full min-h-[436px] flex-col justify-between">
                <span className="font-mono text-xs uppercase tracking-[.14em] text-accent">Profile / 2025</span>
                <div>
                  <strong className="block text-7xl font-semibold tracking-[-.07em]">{profile.systemsShipped}</strong>
                  <p className="mt-2 text-paper/45">Automation systems shipped</p>
                </div>
                <div className="grid grid-cols-2 gap-5 border-t border-paper/15 pt-6">
                  <div>
                    <strong className="text-3xl tracking-[-.05em]">{profile.hoursReturned}</strong>
                    <span className="mt-1 block text-xs text-paper/40">Hours returned</span>
                  </div>
                  <div>
                    <strong className="text-3xl tracking-[-.05em]">{profile.corePlatforms}</strong>
                    <span className="mt-1 block text-xs text-paper/40">Core platforms</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative lg:py-10">
              {editProfile}
              <p className="font-mono text-xs uppercase tracking-[.16em] text-accent">About me</p>
              {/* Temporarily hidden: about title
              <h2 className="mt-4 text-5xl font-semibold leading-[.95] tracking-[-.06em] md:text-7xl">
                {profile.aboutTitle}
              </h2>
              */}
              <p className="mt-7 max-w-[650px] text-lg leading-relaxed text-ink/58">
                {profile.aboutText}
              </p>
              <div className="mt-8 space-y-4">
                {profile.highlights.map((item) => (
                  <div key={item} className="flex items-center gap-4 border-b border-ink/10 pb-4">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent">
                      <Check className="h-4 w-4" />
                    </span>
                    <p className="font-medium">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="work" className="mx-auto max-w-[1400px] px-5 py-20 md:px-8 md:py-28">
          <div className="mb-14 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div>
              <p className="mb-3 font-mono text-xs uppercase tracking-[.16em] text-accent">Portfolio</p>
              <h2 className="max-w-[750px] text-5xl font-semibold leading-[.98] tracking-[-.055em] md:text-7xl">
                Selected work
              </h2>
            </div>
            <div className="flex max-w-full gap-2 overflow-x-auto pb-2">
              {filters.map((filter) => (
                <button
                  type="button"
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`shrink-0 rounded-full border px-4 py-2.5 text-xs font-semibold transition ${
                    activeFilter === filter
                      ? 'border-ink bg-ink text-paper'
                      : 'border-ink/15 hover:border-ink/40'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {visibleProjects.map((project) => (
              <article key={project.id} className="glass-panel hover-card group relative flex min-h-[560px] flex-col rounded-[28px] border border-paper/55 p-5 md:p-7">
                {actions('projects', projects.indexOf(project))}
                {project.images.length ? (
                  <ProjectImages images={project.images} title={project.title} />
                ) : (
                  <WorkflowVisual project={project} />
                )}
                <div className="flex flex-1 flex-col pt-7">
                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-sm font-semibold text-ink/50">{project.platform}</p>
                    <span className="rounded-full bg-paper/75 px-3 py-1.5 text-xs font-medium">
                      {project.result}
                    </span>
                  </div>
                  <h3 className="text-3xl font-semibold tracking-[-.045em] md:text-4xl">{project.title}</h3>
                  <p className="mt-4 max-w-[520px] leading-relaxed text-ink/58">{project.description}</p>
                  <div className="mt-auto flex items-end justify-between pt-7">
                    <div className="flex flex-wrap gap-2">
                      {project.tools.map((tool) => (
                        <span key={tool} className="rounded-md border border-ink/10 px-2.5 py-1.5 font-mono text-[10px] text-ink/55">
                          {tool}
                        </span>
                      ))}
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      {project.documentation?.length ? (
                        <button type="button" onClick={() => setOpenDocs(project)} className="h-11 rounded-full border border-ink/15 px-4 text-sm font-semibold transition hover:bg-ink hover:text-paper">
                          View documentation
                        </button>
                      ) : (
                        isAdmin && (
                          <button type="button" onClick={() => setEditing({ section: 'projects', index: projects.indexOf(project) })} className="h-11 rounded-full border-2 border-dashed border-ink/25 px-4 text-sm font-semibold transition hover:border-accent">
                            + Add documentation
                          </button>
                        )
                      )}
                      <button type="button" aria-label={`View ${project.title}`} onClick={() => setOpenProject(project)} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ink/15 transition group-hover:rotate-45 group-hover:bg-ink group-hover:text-paper">
                        <ArrowUpRight className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
          {addButton('projects')}
          {openProject && <ProjectDetails project={openProject} onClose={() => setOpenProject(null)} />}
          {openDocs && <DocsViewer project={openDocs} onClose={() => setOpenDocs(null)} />}
        </section>

        <section id="skills" className="mx-auto max-w-[1400px] px-5 py-20 md:px-8 md:py-28">
          <div className="mb-12 text-center">
            <p className="font-mono text-xs uppercase tracking-[.16em] text-accent">Toolkit</p>
            <h2 className="mt-3 text-5xl font-semibold tracking-[-.055em] md:text-6xl">Skills</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {skillGroups.map((group, index) => (
              <article key={index} className="glass-panel hover-card relative min-h-64 rounded-[22px] border border-paper/55 p-6">
                {actions('skillGroups', index)}
                <div className="flex items-start justify-between">
                  <WorkflowIcon className="h-8 w-8 text-accent" />
                  <span className="font-mono text-xs text-ink/30">0{index + 1}</span>
                </div>
                <h3 className="mt-10 text-xl font-semibold tracking-[-.03em]">{group.title}</h3>
                <div className="mt-5 flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span key={skill} className="rounded-full border border-ink/10 bg-paper/35 px-3 py-2 text-xs text-ink/60">
                      {skill}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
          {addButton('skillGroups')}
        </section>

        <section id="experience" className="border-y border-paper/50 bg-paper/15 backdrop-blur-sm">
          <div className="mx-auto grid max-w-[1400px] gap-12 px-5 py-24 md:px-8 md:py-32 lg:grid-cols-[.7fr_1.3fr]">
            <div>
              <h2 className="text-5xl font-semibold leading-[.98] tracking-[-.055em] md:text-7xl">Experience</h2>
              <p className="mt-6 max-w-[390px] text-lg leading-relaxed text-ink/55">
                Practical experience building automations for real business workflows.
              </p>
            </div>
            <div className="border-t border-ink/15">
              {experience.map((item, index) => (
                <article key={index} className="relative grid gap-4 border-b border-ink/15 py-8 md:grid-cols-[150px_1fr] md:gap-8">
                  {actions('experience', index)}
                  <div className="flex flex-wrap items-start gap-2 md:flex-col">
                    <p className="text-sm font-semibold text-ink/45">{item.period}</p>
                    {item.ongoing && <span className="w-fit rounded-full border border-accent/40 bg-accent/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[.12em] text-accent">Ongoing</span>}
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold tracking-[-.035em]">{item.role}</h3>
                    <p className="mt-1 font-medium text-accent">{item.company}</p>
                    <p className="mt-4 max-w-[620px] leading-relaxed text-ink/55">{item.description}</p>
                    {!!item.tags?.length && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {item.tags.map((tag) => (
                          <span key={tag} className="rounded-full border border-ink/10 bg-paper/35 px-3 py-1.5 text-xs text-ink/60">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </article>
              ))}
              {addButton('experience')}
            </div>
          </div>
        </section>

        <section id="certifications" className="border-y border-paper/50 bg-paper/15 backdrop-blur-sm">
          <div className="mx-auto max-w-[1400px] px-5 py-24 md:px-8 md:py-32">
            <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <h2 className="text-5xl font-semibold leading-[.98] tracking-[-.055em] md:text-7xl">
                  Certifications
                </h2>
              </div>
              <p className="max-w-[390px] text-lg leading-relaxed text-ink/55">
                Platform-certified across the tools I use to design, build, and maintain production automations.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {certifications.map((certification, index) => (
                <article
                  key={index}
                  className="glass-panel hover-card cert-card group relative overflow-hidden rounded-[24px] border border-paper/55 p-6 md:p-8"
                >
                  {actions('certifications', index)}
                  <div className="certificate-preview workflow-canvas">
                    <div className="canvas-grid" />
                    {certification.image ? (
                      <img
                        src={certification.image}
                        alt={`${certification.title} certificate`}
                        className="relative h-full w-full object-cover"
                      />
                    ) : (
                      <div className="relative flex h-full flex-col items-center justify-center gap-4 text-center">
                        <span
                          className="flex h-14 w-14 items-center justify-center rounded-2xl border"
                          style={{ borderColor: 'var(--color-accent)', color: 'var(--color-accent)' }}
                        >
                          <Check className="h-6 w-6" />
                        </span>
                        <span className="text-sm font-medium text-paper/55">Certificate image</span>
                      </div>
                    )}
                  </div>
                  <div className="mt-7 flex items-start justify-between gap-5">
                    <div>
                      <p className="text-sm font-semibold text-accent">{certification.issuer}</p>
                      <h3 className="mt-2 text-2xl font-semibold tracking-[-.04em] md:text-3xl">{certification.title}</h3>
                    </div>
                    <div className="flex shrink-0 flex-col items-end gap-2">
                      <span className="text-sm text-ink/40">{certification.year}</span>
                      {certification.ongoing && <span className="w-fit rounded-full border border-accent/40 bg-accent/10 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[.12em] text-accent">Ongoing</span>}
                    </div>
                  </div>
                  <p className="mt-3 max-w-[480px] leading-relaxed text-ink/50">{certification.detail}</p>
                  {!!certification.tags?.length && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {certification.tags.map((tag) => (
                        <span key={tag} className="rounded-full border border-ink/10 bg-paper/35 px-3 py-1.5 text-xs text-ink/60">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </article>
              ))}
            </div>
            {addButton('certifications')}
          </div>
        </section>

        <section id="contact" className="px-3 pb-3 pt-20 md:pt-28">
          <div className="relative overflow-hidden rounded-[30px] bg-accent px-5 py-16 text-ink md:px-12 md:py-20">
            <div className="absolute -right-28 -top-52 h-[520px] w-[520px] rounded-full border border-ink/10" />
            <div className="absolute -right-8 -top-32 h-[320px] w-[320px] rounded-full border border-ink/10" />
            <div className="relative mx-auto max-w-[1300px] text-center">
              <p className="font-mono text-xs uppercase tracking-[.16em]">Have a project in mind?</p>
              <h2 className="mx-auto mt-4 max-w-[900px] text-[clamp(3.3rem,6vw,6rem)] font-semibold leading-[.9] tracking-[-.07em]">
                Let’s build something that works better.
              </h2>
              <p className="mx-auto mt-7 max-w-[600px] text-lg leading-relaxed text-ink/65">
                Tell me what is slowing your team down. I’ll help turn it into a clear, dependable automation system.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <a href="mailto:arbie.ancheta@gmail.com" className="flex items-center gap-2 rounded-full bg-ink px-6 py-4 text-sm font-bold text-paper">
                  Start a project <ArrowUpRight className="h-4 w-4" />
                </a>
                <a href="#work" className="flex items-center gap-2 rounded-full border border-ink/20 bg-paper/35 px-6 py-4 text-sm font-bold">
                  View my work <ArrowRight className="h-4 w-4" />
                </a>
              </div>
              <div className="mt-14 grid gap-3 text-left sm:grid-cols-2 lg:grid-cols-3">
                {contactLinks.map((contact, index) => (
                  <div key={index} className="relative">
                    {actions('contactLinks', index)}
                    <a
                      href={contact.href}
                      target={contact.href.startsWith('http') ? '_blank' : undefined}
                      rel={contact.href.startsWith('http') ? 'noreferrer' : undefined}
                      className="group flex min-h-28 flex-col justify-between rounded-[20px] bg-ink p-5 text-paper transition hover:-translate-y-1"
                    >
                      <div className="flex items-start justify-between">
                        <span className="font-semibold">{contact.label}</span>
                        <ArrowUpRight className="h-5 w-5 text-accent transition group-hover:rotate-45" />
                      </div>
                      <span className="mt-6 break-all text-sm text-paper/50">{contact.value}</span>
                    </a>
                  </div>
                ))}
              </div>
              {addButton('contactLinks')}
            </div>
          </div>
        </section>
      </main>

      <footer className="mx-auto flex max-w-[1400px] flex-col gap-5 px-5 py-9 text-xs text-ink/45 md:flex-row md:items-center md:justify-between md:px-8">
        <p>© 2025 Arbie Ancheta. Built with intention.</p>
        <div className="flex gap-6">
          <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" className="hover:text-ink">LinkedIn</a>
          <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-ink">GitHub</a>
          <a href="mailto:arbie.ancheta@gmail.com" className="hover:text-ink">Email</a>
          {isAdmin ? (
            <button type="button" onClick={() => supabase?.auth.signOut()} className="hover:text-ink">Log out</button>
          ) : (
            <button type="button" onClick={() => setLoginOpen(true)} className="hover:text-ink">Admin</button>
          )}
        </div>
      </footer>

      {isAdmin && (
        <div className="fixed bottom-4 left-4 z-50 flex gap-2">
          <p className="rounded-full bg-ink px-4 py-2 text-xs font-bold text-accent shadow-lg">Editing mode</p>
          <button type="button" onClick={() => setEditing({ section: 'theme' })} className="rounded-full bg-ink px-4 py-2 text-xs font-bold text-paper shadow-lg hover:bg-accent hover:text-ink">
            Colors
          </button>
        </div>
      )}
      {loginOpen && <LoginModal onClose={() => setLoginOpen(false)} />}
      {editing && editingValue && (
        <EditModal
          key={JSON.stringify(editing)}
          title={editing.section === 'profile' ? 'Edit profile' : editing.section === 'theme' ? 'Color scheme' : 'index' in editing && editing.index === -1 ? 'New post' : 'Edit post'}
          value={editingValue}
          onSave={saveItem}
          onClose={() => setEditing(null)}
        />
      )}
    </div>
  );
}
