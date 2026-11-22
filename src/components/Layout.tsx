import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  ChevronDown,
  Menu,
  X,
  Search,
  Mail,
  Phone,
  MapPin,
  Shield,
  ArrowUpRight,
} from 'lucide-react';
import { ASSETS } from '../data/assets';
import { SOCIETY_CONTACT } from '../data/societyData';
import { FacebookPagePlugin } from './FacebookPagePlugin';

interface NavSubItem {
  label: string;
  to: string;
  desc?: string;
}

interface NavGroup {
  label: string;
  to: string;
  children?: NavSubItem[];
}

const NAV_GROUPS: NavGroup[] = [
  { label: 'Home', to: '/' },
  {
    label: 'The Society',
    to: '/society',
    children: [
      { label: 'About RWS', to: '/society', desc: 'Institutional profile & mandate' },
      { label: 'Official Messages', to: '/society/messages', desc: 'Hon’ble MLAs, DC & Chairmen' },
      { label: 'Leadership & Governance', to: '/society/governance', desc: 'Bye-laws, objectives & terms' },
      { label: 'Silver Jubilee (2001–2026)', to: '/society/silver-jubilee', desc: '25 years of service & unity' },
    ],
  },
  {
    label: 'Rang: 9 Colours',
    to: '/rang',
    children: [
      { label: 'Village & Nine Clans', to: '/rang', desc: 'Origins, lineages & 9 clans' },
      { label: 'Silver Jubilee Monolith', to: '/rang/monolith', desc: 'One Stone, Nine Faces, 25 Bands' },
      { label: 'Landscape Gazetteer', to: '/rang/landscape', desc: 'Kameng sites, streams & Myodi' },
      { label: 'Heritage & 25 Years', to: '/heritage/25-years', desc: 'Evolution, timeline & agreements' },
    ],
  },
  {
    label: 'People',
    to: '/people',
    children: [
      { label: 'Founders & Panchayat', to: '/people', desc: 'ASMs, GPCs, Gaon Burahs & Youth' },
      { label: 'The First in Rang', to: '/people/firsts', desc: 'Pioneers & Roll of Honour' },
      { label: 'Two Pillars of Rang', to: '/people/two-pillars', desc: 'Lt. Mama Kocho & Lt. Tado Tamar' },
      {
        label: 'Our People in Service',
        to: '/people/in-service',
        desc: '55 Members Across 15 Government Departments & Organisations',
      },
      { label: 'SHGs & Helping Hand', to: '/community/shg', desc: 'Women SHGs & Seppa volunteers' },
    ],
  },
  {
    label: 'Voices',
    to: '/voices',
    children: [
      { label: 'Articles & Memoirs', to: '/voices', desc: '11 essays, memoirs & perspectives' },
      { label: 'Poems', to: '/voices/poems', desc: 'Verse from Rang’s sons & daughters' },
      { label: 'Folktales', to: '/voices/folktales', desc: 'The Legend of Nyokum Yullo' },
      { label: 'Nyishi Riddles & Games', to: '/voices/creativity', desc: '13 Niitam riddles & recitation' },
    ],
  },
  { label: 'Vision 2047', to: '/vision-2047' },
  {
    label: 'Media',
    to: '/media/gallery',
    children: [
      { label: 'Photo Gallery', to: '/media/gallery', desc: 'Historical & community archive' },
      { label: 'Publications & PDFs', to: '/media/publications', desc: 'Silver Jubilee Souvenir library' },
      { label: 'Newsroom & Notices', to: '/media/newsroom', desc: 'Official announcements' },
      { label: 'Events & Conferences', to: '/media/events', desc: 'Programmes & gatherings' },
    ],
  },
  {
    label: 'Connect',
    to: '/contact',
    children: [
      { label: 'Contact RWS', to: '/contact', desc: 'Office address & archival notes' },
      { label: 'Contribute to Archive', to: '/contribute', desc: 'Submit memories, photos & texts' },
    ],
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [quickQuery, setQuickQuery] = useState('');
  const navRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
    setSearchOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = quickQuery.trim();
    navigate(q ? `/search?q=${encodeURIComponent(q)}` : '/search');
    setQuickQuery('');
    setSearchOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F9F6EF] text-[#1F2421]">
      {/* Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#143A28] focus:text-[#F9F6EF] focus:rounded-sm"
      >
        Skip to main content
      </a>

      {/* Institutional Header */}
      <header
        ref={navRef}
        className="sticky top-0 z-40 bg-[#F9F6EF]/95 backdrop-blur-md border-b border-[#E2D9C4]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-16 sm:h-[72px] flex items-center justify-between gap-3">
            {/* Brand Mark */}
            <Link
              to="/"
              className="flex items-center gap-2.5 sm:gap-3 shrink-0 group focus:outline-none"
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden border border-[#B88A3E]/60 shrink-0 bg-[#143A28] shadow-xs">
                <img
                  src={ASSETS.logos.rwsOfficial}
                  alt="Rang Welfare Society Official Logo"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover scale-[1.04]"
                />
              </div>
              <div className="leading-tight">
                <span className="block font-serif text-[15px] sm:text-base font-semibold text-[#143A28] tracking-tight whitespace-nowrap group-hover:text-[#2D6A4F] transition-colors">
                  Rang Welfare Society
                </span>
                <span className="block text-[10px] sm:text-[11px] uppercase tracking-[0.14em] text-[#7A6434] font-medium whitespace-nowrap">
                  Rang · The 9 Colours
                </span>
              </div>
            </Link>

            {/* Desktop Primary Nav */}
            <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-0.5">
              {NAV_GROUPS.map((group) => {
                const isOpen = openDropdown === group.label;
                if (!group.children) {
                  return (
                    <NavLink
                      key={group.label}
                      to={group.to}
                      end={group.to === '/'}
                      className={({ isActive }) =>
                        `px-3 py-2 text-[13px] font-medium whitespace-nowrap shrink-0 transition-colors rounded-sm ${
                          isActive
                            ? 'text-[#143A28] bg-[#EDE6D4]'
                            : 'text-[#313833] hover:text-[#143A28] hover:bg-[#F2ECE0]'
                        }`
                      }
                    >
                      {group.label}
                    </NavLink>
                  );
                }

                return (
                  <div
                    key={group.label}
                    className="relative"
                    onMouseEnter={() => setOpenDropdown(group.label)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenDropdown(isOpen ? null : group.label)}
                      className={`inline-flex items-center gap-1 px-3 py-2 text-[13px] font-medium whitespace-nowrap shrink-0 rounded-sm transition-colors cursor-pointer ${
                        isOpen
                          ? 'text-[#143A28] bg-[#EDE6D4]'
                          : 'text-[#313833] hover:text-[#143A28] hover:bg-[#F2ECE0]'
                      }`}
                    >
                      <span>{group.label}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 text-[#7A6434] transition-transform ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="absolute left-0 top-full pt-1.5 w-64 z-50">
                        <div className="bg-[#FDFBF6] border border-[#DED4BD] rounded-sm shadow-lg py-2">
                          {group.children.map((item) => (
                            <Link
                              key={item.to}
                              to={item.to}
                              className="block px-4 py-2.5 hover:bg-[#F2ECE0] transition-colors"
                            >
                              <span className="block text-sm font-medium text-[#143A28]">
                                {item.label}
                              </span>
                              {item.desc && (
                                <span className="block text-xs text-[#646B62] mt-0.5">
                                  {item.desc}
                                </span>
                              )}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Right Utility Controls */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setSearchOpen((v) => !v)}
                aria-label="Search Rang archive"
                className="inline-flex items-center gap-1.5 px-2.5 py-2 text-xs font-medium text-[#143A28] hover:bg-[#EDE6D4] rounded-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Search className="w-4 h-4" />
                <span className="hidden xl:inline">Search</span>
              </button>

              <Link
                to="/admin"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#C8BC9F] text-xs font-medium text-[#143A28] hover:bg-[#143A28] hover:text-[#F9F6EF] hover:border-[#143A28] rounded-sm transition-colors whitespace-nowrap shrink-0"
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Admin</span>
              </Link>

              <button
                type="button"
                onClick={() => setMobileOpen((v) => !v)}
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                className="lg:hidden p-2 text-[#143A28] hover:bg-[#EDE6D4] rounded-sm transition-colors cursor-pointer"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Expandable Quick Search Bar */}
        {searchOpen && (
          <div className="border-t border-[#E2D9C4] bg-[#F2ECE0]">
            <div className="max-w-3xl mx-auto px-4 py-3">
              <form onSubmit={handleQuickSearch} className="flex items-center gap-2">
                <Search className="w-4 h-4 text-[#5A6058] shrink-0" />
                <input
                  type="search"
                  value={quickQuery}
                  onChange={(e) => setQuickQuery(e.target.value)}
                  placeholder="Search clans, pioneers, articles, Nyishi riddles, Kameng sites, Vision 2047..."
                  autoFocus
                  className="w-full bg-transparent text-sm text-[#1F2421] placeholder:text-[#6B7169] focus:outline-none py-1"
                />
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#143A28] text-[#F9F6EF] text-xs font-medium rounded-sm hover:bg-[#1B4332] whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Search Archive
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Mobile Drawer */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-[#E2D9C4] bg-[#FDFBF6] max-h-[80vh] overflow-y-auto">
            <div className="px-4 py-4 space-y-1">
              {NAV_GROUPS.map((group) => {
                if (!group.children) {
                  return (
                    <Link
                      key={group.label}
                      to={group.to}
                      className="block px-3 py-2.5 text-sm font-medium text-[#143A28] hover:bg-[#F2ECE0] rounded-sm"
                    >
                      {group.label}
                    </Link>
                  );
                }
                const expanded = mobileExpanded === group.label;
                return (
                  <div key={group.label} className="border-b border-[#EFE8D8] last:border-b-0 pb-1">
                    <button
                      type="button"
                      onClick={() => setMobileExpanded(expanded ? null : group.label)}
                      className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium text-[#143A28] hover:bg-[#F2ECE0] rounded-sm cursor-pointer"
                    >
                      <span>{group.label}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#7A6434] transition-transform ${
                          expanded ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {expanded && (
                      <div className="pl-4 pb-2 space-y-1">
                        {group.children.map((sub) => (
                          <Link
                            key={sub.to}
                            to={sub.to}
                            className="block px-3 py-2 text-sm text-[#414742] hover:text-[#143A28] hover:bg-[#F2ECE0] rounded-sm"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

              <div className="pt-3 flex items-center gap-2 border-t border-[#E2D9C4]">
                <Link
                  to="/search"
                  className="flex-1 text-center px-3 py-2 border border-[#C8BC9F] text-xs font-medium text-[#143A28] rounded-sm"
                >
                  Full Archive Search
                </Link>
                <Link
                  to="/admin"
                  className="flex-1 text-center px-3 py-2 bg-[#143A28] text-[#F9F6EF] text-xs font-medium rounded-sm"
                >
                  Admin Portal
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main id="main-content" className="flex-1">
        {children}
      </main>

      {/* Institutional Heritage Footer */}
      <footer className="bg-[#123323] text-[#E6DFCF] border-t-2 border-[#B88A3E]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
            {/* Identity Column */}
            <div className="lg:col-span-5 min-w-0 space-y-5">
              <div className="flex items-center gap-3.5">
                <div className="w-14 h-14 rounded-full overflow-hidden border border-[#B88A3E]/60 shrink-0 bg-[#0F2C1E] shadow-sm">
                  <img
                    src={ASSETS.logos.rwsOfficial}
                    alt="Rang Welfare Society Official Logo"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover scale-[1.04]"
                  />
                </div>
                <div>
                  <h2 className="font-serif text-xl text-[#F9F6EF] font-semibold">
                    {SOCIETY_CONTACT.organization}
                  </h2>
                  <p className="text-xs uppercase tracking-[0.18em] text-[#D8B268] mt-0.5">
                    {SOCIETY_CONTACT.tagline}
                  </p>
                </div>
              </div>

              <p className="text-sm text-[#D1C9B8] leading-relaxed max-w-md">
                Official digital heritage archive and institutional platform of Rang Village—nine clans
                living together as one collective soul in Seppa Circle, East Kameng District, Arunachal Pradesh.
              </p>

              <div className="space-y-2 text-xs text-[#D1C9B8]">
                <p className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#D8B268] shrink-0 mt-0.5" />
                  <span>{SOCIETY_CONTACT.officeAddress}</span>
                </p>
                <p className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#D8B268] shrink-0" />
                  <a
                    href={`mailto:${SOCIETY_CONTACT.email}`}
                    className="hover:text-[#F9F6EF] underline underline-offset-2"
                  >
                    {SOCIETY_CONTACT.email}
                  </a>
                </p>
                <p className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#D8B268] shrink-0" />
                  <span className="tabular-nums">{SOCIETY_CONTACT.phone}</span>
                </p>
              </div>

              {/* Live Facebook Timeline Feed */}
              <div className="pt-4 border-t border-white/10 space-y-3">
                <h3 className="text-xs uppercase tracking-[0.16em] text-[#D8B268] font-semibold">
                  Latest from Rang Welfare Society on Facebook
                </h3>
                <FacebookPagePlugin
                  pageUrl={SOCIETY_CONTACT.facebookUrl}
                  pageName="Rang Welfare Society"
                  height={460}
                  variant="footer"
                />
              </div>
            </div>

            {/* Archive Links */}
            <div className="lg:col-span-2 space-y-3">
              <h3 className="text-xs uppercase tracking-[0.16em] text-[#D8B268] font-semibold">
                Heritage & Clans
              </h3>
              <ul className="space-y-2 text-sm text-[#D6CEBC]">
                <li>
                  <Link to="/rang" className="hover:text-[#F9F6EF] transition-colors">
                    Rang — The 9 Colours
                  </Link>
                </li>
                <li>
                  <Link to="/rang/monolith" className="hover:text-[#F9F6EF] transition-colors">
                    Silver Jubilee Monolith
                  </Link>
                </li>
                <li>
                  <Link to="/rang/landscape" className="hover:text-[#F9F6EF] transition-colors">
                    Landscape Gazetteer
                  </Link>
                </li>
                <li>
                  <Link to="/heritage/genesis" className="hover:text-[#F9F6EF] transition-colors">
                    Evolution of RWS
                  </Link>
                </li>
                <li>
                  <Link to="/heritage/25-years" className="hover:text-[#F9F6EF] transition-colors">
                    25 Years of Services
                  </Link>
                </li>
              </ul>
            </div>

            {/* People & Voices */}
            <div className="lg:col-span-2 space-y-3">
              <h3 className="text-xs uppercase tracking-[0.16em] text-[#D8B268] font-semibold">
                People & Voices
              </h3>
              <ul className="space-y-2 text-sm text-[#D6CEBC]">
                <li>
                  <Link to="/people" className="hover:text-[#F9F6EF] transition-colors">
                    Founders & Pioneers
                  </Link>
                </li>
                <li>
                  <Link to="/people/firsts" className="hover:text-[#F9F6EF] transition-colors">
                    The First in Rang
                  </Link>
                </li>
                <li>
                  <Link to="/people/two-pillars" className="hover:text-[#F9F6EF] transition-colors">
                    Two Pillars of Rang
                  </Link>
                </li>
                <li>
                  <Link to="/people/in-service" className="hover:text-[#F9F6EF] transition-colors">
                    Our People in Service
                  </Link>
                </li>
                <li>
                  <Link to="/voices" className="hover:text-[#F9F6EF] transition-colors">
                    Community Voices
                  </Link>
                </li>
                <li>
                  <Link to="/voices/creativity" className="hover:text-[#F9F6EF] transition-colors">
                    Nyishi Riddles
                  </Link>
                </li>
              </ul>
            </div>

            {/* Institutional */}
            <div className="lg:col-span-3 space-y-3">
              <h3 className="text-xs uppercase tracking-[0.16em] text-[#D8B268] font-semibold">
                Society & Future
              </h3>
              <ul className="space-y-2 text-sm text-[#D6CEBC]">
                <li>
                  <Link to="/vision-2047" className="hover:text-[#F9F6EF] transition-colors">
                    Rang Vision 2047 & Sankalps
                  </Link>
                </li>
                <li>
                  <Link to="/community/shg" className="hover:text-[#F9F6EF] transition-colors">
                    Rang Self-Help Groups
                  </Link>
                </li>
                <li>
                  <Link to="/community/helping-hand" className="hover:text-[#F9F6EF] transition-colors">
                    Rang Helping Hand
                  </Link>
                </li>
                <li>
                  <Link to="/media/publications" className="hover:text-[#F9F6EF] transition-colors">
                    Souvenir PDF Publications
                  </Link>
                </li>
                <li>
                  <Link to="/contribute" className="hover:text-[#F9F6EF] transition-colors">
                    Contribute to Village Archive
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin"
                    className="inline-flex items-center gap-1 text-[#D8B268] hover:text-[#F9F6EF] transition-colors"
                  >
                    <span>RWS Admin Portal</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#B9B2A2]">
            <p>
              © {new Date().getFullYear()} Rang Welfare Society (RWS), Village Rang, Seppa, East Kameng, Arunachal Pradesh.
            </p>
            <p className="text-[#D8B268]/90">
              Silver Jubilee Commemorative Digital Archive · Nine Clans. One Rang. One Future.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
