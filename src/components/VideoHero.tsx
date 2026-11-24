import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useReducedMotion } from 'motion/react';
import { ArrowRight, Film, Maximize2, Pause, Play, Volume2, VolumeX } from 'lucide-react';
import { ASSETS } from '../data/assets';

export interface VideoHeroProps {
  /** Visual framing tailored to either the Home landing page or the Media Hub archive */
  variant?: 'home' | 'media';
  /** Optional override for the video source URL */
  src?: string;
  /** Optional poster image shown prior to first decoded frame */
  poster?: string;
  /** Optional section kicker */
  kicker?: string;
  /** Optional editorial heading */
  title?: string;
  /** Optional concise editorial summary */
  description?: string;
}

export function VideoHero({
  variant = 'home',
  src = ASSETS.videos.promotionalFilm,
  poster = ASSETS.landscapes.heroPosterRang,
  kicker = 'Official Promotional Film · Silver Jubilee 2026',
  title = 'Rang Welfare Society — Twenty-Five Years of Unity & Service',
  description = 'Watch the official Rang Welfare Society promotional film documenting Village Rang, its nine founding clans, living Nyishi heritage, and a quarter-century of organised community stewardship.',
}: VideoHeroProps) {
  const prefersReducedMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    setIsMuted(true);

    if (prefersReducedMotion) {
      video.pause();
      setIsPlaying(false);
      return;
    }

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          // Browsers that restrict autoplay keep the poster & native play controls ready
          setIsPlaying(false);
        });
    }
  }, [prefersReducedMotion, src]);

  const handleTogglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused || video.ended) {
      const p = video.play();
      if (p !== undefined) {
        p.catch(() => {
          setIsPlaying(false);
        });
      }
    } else {
      video.pause();
    }
  };

  const handleToggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    const nextMuted = !video.muted;
    video.muted = nextMuted;
    if (!nextMuted && video.volume === 0) {
      video.volume = 0.85;
    }
    setIsMuted(nextMuted);
  };

  const handleFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.requestFullscreen) {
      video.requestFullscreen().catch(() => {
        // Ignore if fullscreen is blocked by browser/iframe permissions
      });
    }
  };

  const isDark = variant === 'home';

  return (
    <section
      data-testid="video-hero"
      aria-labelledby="video-hero-heading"
      className={
        isDark
          ? 'py-16 sm:py-24 bg-[#0F2C1E] text-[#F9F6EF] border-b border-[#B88A3E]/30'
          : 'mb-14 pb-12 border-b border-[#D8CEB8]'
      }
    >
      <div className={isDark ? 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8' : ''}>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
          <div className="max-w-3xl">
            <p
              className={`text-xs uppercase tracking-[0.18em] font-semibold ${
                isDark ? 'text-[#E3C17A]' : 'text-[#8E6520]'
              }`}
            >
              {kicker}
            </p>
            <h2
              id="video-hero-heading"
              className={`mt-2 font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold leading-tight ${
                isDark ? 'text-[#F9F6EF]' : 'text-[#143A28]'
              }`}
            >
              {title}
            </h2>
            <p
              className={`mt-3 text-sm sm:text-base leading-relaxed max-w-2xl ${
                isDark ? 'text-[#DDD5C2]' : 'text-[#4A524C]'
              }`}
            >
              {description}
            </p>
          </div>

          {isDark && (
            <Link
              to="/media/gallery"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#E3C17A] hover:text-[#F9F6EF] transition-colors whitespace-nowrap shrink-0 self-start lg:self-end"
            >
              <span>Explore Media Hub</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>

        <div
          className={`rounded-sm overflow-hidden border ${
            isDark
              ? 'bg-[#091C12] border-[#B88A3E]/40 shadow-xl'
              : 'bg-[#0F2C1E] border-[#D8CEB8] shadow-sm'
          }`}
        >
          <div className="relative w-full aspect-video bg-[#081910]">
            {hasError ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-[#F9F6EF]">
                <Film className="w-10 h-10 text-[#E3C17A] mb-3" />
                <p className="font-serif text-lg font-semibold">
                  Promotional Video Currently Unavailable
                </p>
                <p className="mt-1.5 text-sm text-[#DDD5C2] max-w-md">
                  Unable to load the official Rang Welfare Society video stream. Please refresh the
                  page or open the direct MP4 file.
                </p>
                <a
                  href={src}
                  className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-[#B88A3E] text-[#0E2418] text-xs font-semibold uppercase tracking-[0.12em] rounded-sm hover:bg-[#C99B4E] transition-colors whitespace-nowrap shrink-0"
                >
                  Open Video File
                </a>
              </div>
            ) : (
              <video
                ref={videoRef}
                src={src}
                poster={poster}
                autoPlay={!prefersReducedMotion}
                muted
                loop
                playsInline
                controls
                preload="metadata"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onVolumeChange={(e) => {
                  const v = e.currentTarget;
                  setIsMuted(v.muted || v.volume === 0);
                }}
                onError={() => setHasError(true)}
                aria-label="Official Rang Welfare Society promotional video"
                className="w-full h-full object-cover block"
              >
                <source src={src} type="video/mp4" />
                Your browser does not support native HTML5 video playback.
              </video>
            )}
          </div>

          <div
            className={`px-4 sm:px-6 py-3.5 border-t flex flex-wrap items-center justify-between gap-3 ${
              isDark
                ? 'bg-[#123323] border-[#B88A3E]/25 text-[#DDD5C2]'
                : 'bg-[#143A28] border-[#B88A3E]/30 text-[#E6E0D0]'
            }`}
          >
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#DDD5C2]">
              <span className="font-medium text-[#F9F6EF]">Official RWS Film</span>
              <span aria-hidden="true" className="text-[#B88A3E]">
                ·
              </span>
              <span className="font-mono tabular-nums">1080p HD</span>
              <span aria-hidden="true" className="text-[#B88A3E]">
                ·
              </span>
              <span className="font-mono tabular-nums">06:44</span>
              <span aria-hidden="true" className="text-[#B88A3E] hidden sm:inline">
                ·
              </span>
              <span className="hidden sm:inline">
                {isMuted ? 'Muted for autoplay — click Unmute for audio' : 'Audio enabled'}
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={handleTogglePlay}
                disabled={hasError}
                aria-label={isPlaying ? 'Pause promotional video' : 'Play promotional video'}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#F9F6EF] bg-white/10 hover:bg-white/20 disabled:opacity-40 rounded-sm transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isPlaying ? 'Pause' : 'Play'}</span>
              </button>

              <button
                type="button"
                onClick={handleToggleMute}
                disabled={hasError}
                aria-label={isMuted ? 'Unmute promotional video audio' : 'Mute promotional video audio'}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-sm transition-colors cursor-pointer whitespace-nowrap shrink-0 disabled:opacity-40 ${
                  isMuted
                    ? 'bg-[#B88A3E] text-[#0E2418] hover:bg-[#C99B4E]'
                    : 'bg-white/10 text-[#F9F6EF] hover:bg-white/20'
                }`}
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                <span>{isMuted ? 'Unmute Audio' : 'Mute'}</span>
              </button>

              <button
                type="button"
                onClick={handleFullscreen}
                disabled={hasError}
                aria-label="Watch video in fullscreen"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#F9F6EF] bg-white/10 hover:bg-white/20 disabled:opacity-40 rounded-sm transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Fullscreen</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
