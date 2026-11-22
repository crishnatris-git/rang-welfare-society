import React, { useEffect, useRef, useState } from 'react';
import { Facebook } from 'lucide-react';

declare global {
  interface Window {
    FB?: {
      XFBML: {
        parse: (node?: HTMLElement | null) => void;
      };
    };
  }
}

interface FacebookPagePluginProps {
  pageUrl: string;
  pageName?: string;
  height?: number;
  variant?: 'footer' | 'light';
}

const FB_SDK_ID = 'facebook-jssdk';
const FB_SDK_SRC = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v21.0';

let sdkPromise: Promise<boolean> | null = null;

function ensureFbRoot() {
  if (typeof document === 'undefined') return;
  if (!document.getElementById('fb-root')) {
    const root = document.createElement('div');
    root.id = 'fb-root';
    document.body.prepend(root);
  }
}

function loadFacebookSdkOnce(): Promise<boolean> {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return Promise.resolve(false);
  }
  if (window.FB?.XFBML) {
    return Promise.resolve(true);
  }
  if (sdkPromise) {
    return sdkPromise;
  }

  ensureFbRoot();

  sdkPromise = new Promise<boolean>((resolve) => {
    const existing = document.getElementById(FB_SDK_ID) as HTMLScriptElement | null;
    if (existing) {
      if (window.FB?.XFBML) {
        resolve(true);
        return;
      }
      existing.addEventListener('load', () => resolve(Boolean(window.FB?.XFBML)), { once: true });
      existing.addEventListener('error', () => resolve(false), { once: true });
      return;
    }

    const script = document.createElement('script');
    script.id = FB_SDK_ID;
    script.src = FB_SDK_SRC;
    script.async = true;
    script.defer = true;
    script.crossOrigin = 'anonymous';
    script.onload = () => resolve(Boolean(window.FB?.XFBML));
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

  return sdkPromise;
}

export function FacebookPagePlugin({
  pageUrl,
  pageName = 'Rang Welfare Society',
  height = 460,
  variant = 'footer',
}: FacebookPagePluginProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [pluginWidth, setPluginWidth] = useState<number>(440);
  const [pluginStatus, setPluginStatus] = useState<'loading' | 'loaded' | 'fallback'>('loading');

  // Compute an adaptive width strictly within Meta's supported 180–500px range
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const measured = Math.floor(wrapper.getBoundingClientRect().width);
    if (measured > 0) {
      setPluginWidth(Math.min(500, Math.max(180, measured)));
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    let observer: MutationObserver | null = null;
    let fallbackTimer: number | null = null;

    const markLoadedIfIframeReady = () => {
      const container = containerRef.current;
      if (!container) return false;
      const iframe = container.querySelector('iframe');
      if (iframe && iframe.getBoundingClientRect().height > 120) {
        if (!cancelled) setPluginStatus('loaded');
        return true;
      }
      return false;
    };

    const init = async () => {
      const loaded = await loadFacebookSdkOnce();
      if (cancelled) return;

      if (!loaded || !window.FB?.XFBML) {
        setPluginStatus('fallback');
        return;
      }

      if (containerRef.current) {
        try {
          window.FB.XFBML.parse(containerRef.current);
        } catch {
          setPluginStatus('fallback');
          return;
        }

        if (!markLoadedIfIframeReady()) {
          observer = new MutationObserver(() => {
            if (markLoadedIfIframeReady() && observer) {
              observer.disconnect();
            }
          });
          observer.observe(containerRef.current, {
            childList: true,
            subtree: true,
            attributes: true,
          });
        }
      }

      fallbackTimer = window.setTimeout(() => {
        if (cancelled) return;
        if (!markLoadedIfIframeReady()) {
          setPluginStatus('fallback');
        }
      }, 6000);
    };

    init();

    return () => {
      cancelled = true;
      if (observer) observer.disconnect();
      if (fallbackTimer !== null) window.clearTimeout(fallbackTimer);
    };
  }, [pageUrl, pluginWidth]);

  const isFooter = variant === 'footer';

  return (
    <div ref={wrapperRef} className="w-full max-w-[500px] min-w-0">
      <div
        ref={containerRef}
        className={`w-full overflow-hidden rounded-sm border ${
          isFooter
            ? 'border-[#D8B268]/30 bg-[#0F2C1E]/85'
            : 'border-[#E4DCC9] bg-[#FDFBF6]'
        } ${pluginStatus === 'fallback' ? 'hidden' : 'min-h-[220px] flex items-center justify-center'}`}
      >
        <div
          className="fb-page w-full"
          data-href={pageUrl}
          data-tabs="timeline"
          data-width={String(pluginWidth)}
          data-height={String(height)}
          data-small-header="false"
          data-adapt-container-width="true"
          data-hide-cover="false"
          data-show-facepile="true"
          data-lazy="true"
        >
          <blockquote cite={pageUrl} className="fb-xfbml-parse-ignore p-5 text-left">
            <p className={`text-xs ${isFooter ? 'text-[#D1C9B8]' : 'text-[#4A524C]'}`}>
              Loading official Facebook feed…
            </p>
            <a
              href={pageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`mt-1.5 inline-block text-xs font-medium underline underline-offset-4 ${
                isFooter ? 'text-[#D8B268]' : 'text-[#143A28]'
              }`}
            >
              {pageName} on Facebook
            </a>
          </blockquote>
        </div>
      </div>

      {pluginStatus === 'fallback' && (
        <div
          className={`rounded-sm border p-4 ${
            isFooter
              ? 'bg-[#0F2C1E]/90 border-[#D8B268]/30 text-[#E6DFCF]'
              : 'bg-[#FDFBF6] border-[#E4DCC9] text-[#1C241E]'
          }`}
        >
          <div className="flex items-start gap-3">
            <div
              className={`w-8 h-8 rounded-sm flex items-center justify-center shrink-0 mt-0.5 ${
                isFooter
                  ? 'bg-[#143A28] border border-[#D8B268]/40 text-[#D8B268]'
                  : 'bg-[#143A28] text-[#E3C17A]'
              }`}
            >
              <Facebook className="w-4 h-4" aria-hidden="true" />
            </div>
            <p
              className={`text-xs leading-relaxed ${
                isFooter ? 'text-[#D6CEBC]' : 'text-[#4A524C]'
              }`}
            >
              Stay connected with Rang Welfare Society. Visit our official Facebook Page for the latest updates.
            </p>
          </div>
        </div>
      )}

      <div className="mt-2.5">
        <a
          href={pageUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit Rang Welfare Society official Facebook Page (opens in a new tab)"
          className={`inline-flex items-center gap-1 text-xs font-medium transition-colors ${
            isFooter
              ? 'text-[#D8B268] hover:text-[#F9F6EF] underline decoration-[#D8B268]/40 underline-offset-4'
              : 'text-[#143A28] hover:text-[#8E6520] underline underline-offset-4'
          }`}
        >
          <span>Visit our Facebook Page ↗</span>
        </a>
      </div>
    </div>
  );
}
