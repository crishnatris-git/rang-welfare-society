import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, X, ChevronLeft, ImageOff } from 'lucide-react';
import { ASSETS } from '../data/assets';

export function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);
  return null;
}

export function OrnamentalDivider({
  dark = false,
  className = '',
}: {
  dark?: boolean;
  className?: string;
}) {
  return (
    <div className={`flex items-center justify-center gap-4 my-8 ${className}`} aria-hidden="true">
      <div
        className={`h-px flex-1 max-w-[140px] ${
          dark ? 'bg-gradient-to-r from-transparent to-[#B88A3E]/70' : 'bg-gradient-to-r from-transparent to-[#B88A3E]/60'
        }`}
      />
      <div className="w-2 h-2 rotate-45 border border-[#B88A3E] bg-[#B88A3E]/25 shrink-0" />
      <div
        className={`h-px flex-1 max-w-[140px] ${
          dark ? 'bg-gradient-to-l from-transparent to-[#B88A3E]/70' : 'bg-gradient-to-l from-transparent to-[#B88A3E]/60'
        }`}
      />
    </div>
  );
}

interface EditorialImageProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  caption?: string;
  objectPosition?: string;
  onClick?: () => void;
}

export function EditorialImage({
  src,
  alt,
  className = '',
  imgClassName = 'w-full h-full object-cover',
  caption,
  objectPosition = 'object-center',
  onClick,
}: EditorialImageProps) {
  const [failed, setFailed] = useState(false);

  return (
    <figure className={className}>
      <div
        onClick={onClick}
        className={`relative overflow-hidden bg-[#EAE3D2] ${
          onClick ? 'cursor-zoom-in group' : ''
        } w-full h-full`}
      >
        {failed ? (
          <div className="w-full h-full min-h-[160px] flex flex-col items-center justify-center p-6 text-center text-[#5A6058]">
            <ImageOff className="w-6 h-6 mb-2 opacity-60" />
            <span className="text-xs font-medium">{alt}</span>
          </div>
        ) : (
          <img
            src={src}
            alt={alt}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => setFailed(true)}
            className={`${imgClassName} ${objectPosition} ${
              onClick ? 'transition-transform duration-500 group-hover:scale-[1.03]' : ''
            }`}
          />
        )}
      </div>
      {caption && (
        <figcaption className="mt-2.5 text-xs text-[#5A6058] leading-relaxed font-sans">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

interface BreadcrumbItem {
  label: string;
  to?: string;
}

interface PageHeaderProps {
  kicker: string;
  title: string;
  subtitle?: string;
  breadcrumbs: BreadcrumbItem[];
  backgroundImage?: string;
  children?: React.ReactNode;
}

export function PageHeader({
  kicker,
  title,
  subtitle,
  breadcrumbs,
  backgroundImage = ASSETS.landscapes.heroRangHills,
  children,
}: PageHeaderProps) {
  return (
    <section className="relative bg-[#143A28] text-[#F9F6EF] overflow-hidden border-b border-[#B88A3E]/30">
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={backgroundImage}
          alt=""
          aria-hidden="true"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-28 animate-hero-kenburns"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0E2A1C]/88 via-[#143A28]/82 to-[#143A28]/96" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-12 sm:pt-14 sm:pb-16">
        <nav aria-label="Breadcrumb" className="mb-5">
          <ol className="flex flex-wrap items-center gap-1.5 text-xs text-[#D6CEBC]">
            <li>
              <Link to="/" className="hover:text-[#F9F6EF] transition-colors">
                Home
              </Link>
            </li>
            {breadcrumbs.map((crumb, i) => (
              <li key={i} className="inline-flex items-center gap-1.5">
                <ChevronRight className="w-3.5 h-3.5 text-[#B88A3E]/80 shrink-0" />
                {crumb.to ? (
                  <Link to={crumb.to} className="hover:text-[#F9F6EF] transition-colors">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-[#F9F6EF] font-medium">{crumb.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        <p className="text-xs uppercase tracking-[0.18em] text-[#D8B268] font-medium mb-3">
          {kicker}
        </p>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#F9F6EF] max-w-4xl leading-[1.15]">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 text-base sm:text-lg text-[#E4DEC9] max-w-3xl leading-relaxed font-normal">
            {subtitle}
          </p>
        )}
        {children && <div className="mt-7">{children}</div>}
      </div>
    </section>
  );
}

export interface LightboxItem {
  url: string;
  title: string;
  caption?: string;
  category?: string;
}

export function Lightbox({
  items,
  index,
  onClose,
  onNavigate,
}: {
  items: LightboxItem[];
  index: number | null;
  onClose: () => void;
  onNavigate: (nextIndex: number) => void;
}) {
  useEffect(() => {
    if (index === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNavigate((index + 1) % items.length);
      if (e.key === 'ArrowLeft') onNavigate((index - 1 + items.length) % items.length);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [index, items.length, onClose, onNavigate]);

  if (index === null || !items[index]) return null;
  const current = items[index];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={current.title}
      className="fixed inset-0 z-50 bg-[#0B1E14]/95 flex flex-col items-center justify-center p-4 sm:p-8"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close lightbox"
        className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2.5 text-[#F9F6EF] bg-white/10 hover:bg-white/20 rounded-sm transition-colors cursor-pointer"
      >
        <X className="w-5 h-5" />
      </button>

      {items.length > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onNavigate((index - 1 + items.length) % items.length);
            }}
            aria-label="Previous image"
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 p-2.5 text-[#F9F6EF] bg-white/10 hover:bg-white/20 rounded-sm transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onNavigate((index + 1) % items.length);
            }}
            aria-label="Next image"
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 p-2.5 text-[#F9F6EF] bg-white/10 hover:bg-white/20 rounded-sm transition-colors cursor-pointer"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      <div
        className="max-w-5xl w-full flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={current.url}
          alt={current.title}
          referrerPolicy="no-referrer"
          className="max-h-[72vh] w-auto object-contain rounded-sm shadow-2xl border border-white/10"
        />
        <div className="mt-4 text-center max-w-2xl">
          {current.category && (
            <p className="text-xs uppercase tracking-[0.16em] text-[#D8B268] mb-1">
              {current.category} · {index + 1} / {items.length}
            </p>
          )}
          <h3 className="font-serif text-lg sm:text-xl text-[#F9F6EF]">{current.title}</h3>
          {current.caption && (
            <p className="mt-1.5 text-sm text-[#D6CEBC] leading-relaxed">{current.caption}</p>
          )}
        </div>
      </div>
    </div>
  );
}
