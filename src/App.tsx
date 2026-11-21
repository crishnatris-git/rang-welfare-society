import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { ErrorBoundary } from './components/ErrorBoundary';
import { AuthProvider } from './context/AuthContext';
import { Layout } from './components/Layout';
import { ScrollToTop } from './components/EditorialUI';
import { HomePage } from './pages/HomePage';
import { SocietyPage } from './pages/SocietyPage';
import { RangEncyclopediaPage } from './pages/RangEncyclopediaPage';
import { MonolithPage } from './pages/MonolithPage';
import { HeritagePage } from './pages/HeritagePage';
import { PeoplePioneersPage } from './pages/PeoplePioneersPage';
import { CommunityDevPage } from './pages/CommunityDevPage';
import { CommunityVoicesPage } from './pages/CommunityVoicesPage';
import { Vision2047Page } from './pages/Vision2047Page';
import { MediaHubPage } from './pages/MediaHubPage';
import { SearchPage } from './pages/SearchPage';
import { ContactContributePage } from './pages/ContactContributePage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';

function NotFoundPage() {
  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
      <p className="text-xs uppercase tracking-[0.18em] text-[#8E6520] font-medium">
        Archive Record Not Found
      </p>
      <h1 className="mt-3 font-serif text-4xl text-[#143A28] font-semibold">
        Page Not Found
      </h1>
      <p className="mt-4 text-base text-[#4A524C] leading-relaxed">
        The requested section of the Rang Welfare Society digital archive could not be located. Return to the homepage or search the complete village archive.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          to="/"
          className="px-5 py-3 bg-[#143A28] text-[#F9F6EF] text-xs font-semibold uppercase tracking-[0.14em] rounded-sm hover:bg-[#1B4332] transition-colors"
        >
          Return Home
        </Link>
        <Link
          to="/search"
          className="px-5 py-3 bg-[#F2ECE0] text-[#143A28] border border-[#D8CEB8] text-xs font-semibold uppercase tracking-[0.14em] rounded-sm hover:border-[#B88A3E] transition-colors"
        >
          Search Archive
        </Link>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />

              {/* The Society */}
              <Route path="/society" element={<SocietyPage section="about" />} />
              <Route path="/society/messages" element={<SocietyPage section="messages" />} />
              <Route path="/society/leadership" element={<SocietyPage section="governance" />} />
              <Route path="/society/governance" element={<SocietyPage section="governance" />} />
              <Route path="/society/silver-jubilee" element={<SocietyPage section="jubilee" />} />

              {/* Rang: The 9 Colours */}
              <Route path="/rang" element={<RangEncyclopediaPage mode="overview" />} />
              <Route path="/rang/clans" element={<RangEncyclopediaPage mode="overview" />} />
              <Route path="/rang/clans/:slug" element={<RangEncyclopediaPage mode="clan-detail" />} />
              <Route path="/rang/monolith" element={<MonolithPage />} />
              <Route path="/rang/landscape" element={<RangEncyclopediaPage mode="landscape" />} />

              {/* Heritage & History */}
              <Route path="/heritage" element={<HeritagePage mode="25-years" />} />
              <Route path="/heritage/25-years" element={<HeritagePage mode="25-years" />} />
              <Route path="/heritage/genesis" element={<HeritagePage mode="genesis" />} />
              <Route path="/heritage/agreements" element={<HeritagePage mode="agreements" />} />

              {/* People & Pioneers */}
              <Route path="/people" element={<PeoplePioneersPage mode="pioneers" />} />
              <Route path="/people/firsts" element={<PeoplePioneersPage mode="firsts" />} />
              <Route path="/people/two-pillars" element={<PeoplePioneersPage mode="two-pillars" />} />

              {/* Community & Development */}
              <Route path="/community/shg" element={<CommunityDevPage mode="shg" />} />
              <Route path="/community/helping-hand" element={<CommunityDevPage mode="helping-hand" />} />
              <Route path="/community/development" element={<CommunityDevPage mode="development" />} />

              {/* Community Voices */}
              <Route path="/voices" element={<CommunityVoicesPage mode="articles" />} />
              <Route path="/voices/poems" element={<CommunityVoicesPage mode="poems" />} />
              <Route path="/voices/folktales" element={<CommunityVoicesPage mode="folktales" />} />
              <Route path="/voices/creativity" element={<CommunityVoicesPage mode="creativity" />} />
              <Route path="/voices/:slug" element={<CommunityVoicesPage mode="article-detail" />} />

              {/* Vision 2047 */}
              <Route path="/vision-2047" element={<Vision2047Page />} />

              {/* Media Hub */}
              <Route path="/media/gallery" element={<MediaHubPage mode="gallery" />} />
              <Route path="/media/publications" element={<MediaHubPage mode="publications" />} />
              <Route path="/media/newsroom" element={<MediaHubPage mode="newsroom" />} />
              <Route path="/media/events" element={<MediaHubPage mode="events" />} />

              {/* Search, Connect & Admin */}
              <Route path="/search" element={<SearchPage />} />
              <Route path="/contact" element={<ContactContributePage mode="contact" />} />
              <Route path="/contribute" element={<ContactContributePage mode="contribute" />} />
              <Route path="/admin" element={<AdminDashboardPage />} />

              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </AuthProvider>
    </ErrorBoundary>
  );
}
