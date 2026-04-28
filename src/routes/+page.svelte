<script lang="ts">
  import type { PageProps } from './$types';
  import { onMount } from 'svelte';
  import { fade, fly, scale } from 'svelte/transition';

  import Navbar from '$lib/components/layout/Navbar.svelte';
  import Hero from '$lib/components/sections/Hero.svelte';
  import Benefits from '$lib/components/sections/Benefits.svelte';
  import Process from '$lib/components/sections/Process.svelte';
  import Testimonials from '$lib/components/sections/Testimonials.svelte';
  import FAQ from '$lib/components/sections/FAQ.svelte';
  import CTA from '$lib/components/sections/CTA.svelte';
  import LeadWidget from '$lib/components/sections/LeadWidget.svelte';

  interface FormResult {
    success?: boolean;
    message?: string;
    errors?: Record<string, string[]>;
    values?: Record<string, string | number | boolean | null | undefined>;
  }

  interface CustomPageData {
    form?: FormResult;
    [key: string]: unknown;
  }

  let { data, form }: { data: CustomPageData & PageProps['data']; form?: FormResult } = $props();

  let isLoading = $state(true);
  let showHelpBox = $state(false);
  let helpBoxClosed = $state(false);

  const siteUrl = 'https://www.nejlepsiodhadnemovitosti.cz';
  const siteName = 'Nejlepší Odhad';

  const phoneNumber = '+420 602 447 432';
  const phoneNumberHref = '+420602447432';
  const email = 'info@nejlepsiodhadnemovitosti.cz';
  const availabilityText = 'Po–Pá 9:00–18:00';

  const seoTitle = 'Odhad nemovitosti zdarma | Ústecký kraj, Praha a Středočeský kraj';
  const seoDescription =
    'Zjistěte reálnou tržní cenu bytu, domu nebo pozemku. Ruční odhad nemovitosti zdarma pro Ústecký kraj, Prahu a Středočeský kraj.';

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    '@id': `${siteUrl}/#business`,
    name: siteName,
    legalName: 'Jan Tichý',
    url: `${siteUrl}/`,
    logo: `${siteUrl}/logo.jpeg`,
    image: `${siteUrl}/og-image.jpg`,
    description:
      'Ruční odhad tržní ceny nemovitosti zdarma pro byty, domy a pozemky v Ústeckém kraji, Praze a Středočeském kraji.',
    telephone: phoneNumberHref,
    email,
    priceRange: '0 Kč',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Muchova 2888/2',
      addressLocality: 'Ústí nad Labem',
      postalCode: '400 11',
      addressCountry: 'CZ'
    },
    areaServed: [
      {
        '@type': 'AdministrativeArea',
        name: 'Ústecký kraj'
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Středočeský kraj'
      },
      {
        '@type': 'City',
        name: 'Praha'
      },
      {
        '@type': 'City',
        name: 'Ústí nad Labem'
      },
      {
        '@type': 'City',
        name: 'Teplice'
      },
      {
        '@type': 'City',
        name: 'Děčín'
      },
      {
        '@type': 'City',
        name: 'Litoměřice'
      },
      {
        '@type': 'City',
        name: 'Most'
      },
      {
        '@type': 'City',
        name: 'Chomutov'
      },
      {
        '@type': 'City',
        name: 'Louny'
      },
      {
        '@type': 'City',
        name: 'Kladno'
      },
      {
        '@type': 'City',
        name: 'Mělník'
      },
      {
        '@type': 'City',
        name: 'Beroun'
      },
      {
        '@type': 'City',
        name: 'Mladá Boleslav'
      },
      {
        '@type': 'City',
        name: 'Praha-východ'
      },
      {
        '@type': 'City',
        name: 'Praha-západ'
      }
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00'
      }
    ],
    makesOffer: [
      {
        '@type': 'Offer',
        name: 'Odhad nemovitosti zdarma',
        price: '0',
        priceCurrency: 'CZK',
        itemOffered: {
          '@type': 'Service',
          name: 'Ruční odhad tržní ceny nemovitosti',
          areaServed: ['Ústecký kraj', 'Praha', 'Středočeský kraj']
        }
      }
    ]
  };

  const structuredDataHtml =
    '<script type="application/ld+json">' +
    JSON.stringify(structuredData).replace(/</g, '\\u003c') +
    '</' +
    'script>';

  onMount(() => {
    let idleTimer: number | undefined;

    const showHelp = () => {
      if (!helpBoxClosed && !isLoading) {
        showHelpBox = true;
      }
    };

    const resetIdleTimer = () => {
      if (idleTimer) {
        window.clearTimeout(idleTimer);
      }

      idleTimer = window.setTimeout(() => {
        showHelp();
      }, 60000);
    };

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const viewportHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      const scrollProgress = (scrollTop + viewportHeight) / documentHeight;

      if (scrollProgress >= 0.75) {
        showHelp();
      }

      resetIdleTimer();
    };

    const handleUserActivity = () => {
      resetIdleTimer();
    };

    const loadingTimer = window.setTimeout(() => {
      isLoading = false;
      resetIdleTimer();
    }, 2500);

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('click', handleUserActivity);
    window.addEventListener('keydown', handleUserActivity);
    window.addEventListener('touchstart', handleUserActivity, { passive: true });

    return () => {
      window.clearTimeout(loadingTimer);

      if (idleTimer) {
        window.clearTimeout(idleTimer);
      }

      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('click', handleUserActivity);
      window.removeEventListener('keydown', handleUserActivity);
      window.removeEventListener('touchstart', handleUserActivity);
    };
  });

  function closeHelpBox() {
    helpBoxClosed = true;
    showHelpBox = false;
  }
</script>

<svelte:head>
  <title>{seoTitle}</title>

  <meta name="description" content={seoDescription} />
  <meta name="robots" content="index, follow, max-image-preview:large" />
  <meta name="author" content={siteName} />
  <meta name="theme-color" content="#11223A" />

  <link rel="canonical" href={`${siteUrl}/`} />

  <meta property="og:type" content="website" />
  <meta property="og:locale" content="cs_CZ" />
  <meta property="og:site_name" content={siteName} />
  <meta property="og:title" content={seoTitle} />
  <meta property="og:description" content={seoDescription} />
  <meta property="og:url" content={`${siteUrl}/`} />
  <meta property="og:image" content={`${siteUrl}/og-image.jpg`} />
  <meta property="og:image:alt" content="Odhad nemovitosti zdarma - Nejlepší Odhad" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={seoTitle} />
  <meta name="twitter:description" content={seoDescription} />
  <meta name="twitter:image" content={`${siteUrl}/og-image.jpg`} />

  {@html structuredDataHtml}

  <style>
    @keyframes sweep {
      0% {
        transform: translateX(-100%);
      }

      100% {
        transform: translateX(100%);
      }
    }

    @keyframes phone-ring {
      0%,
      100% {
        transform: rotate(0deg);
      }

      10% {
        transform: rotate(-12deg);
      }

      20% {
        transform: rotate(12deg);
      }

      30% {
        transform: rotate(-8deg);
      }

      40% {
        transform: rotate(8deg);
      }

      50% {
        transform: rotate(0deg);
      }
    }

    @keyframes soft-pulse {
      0%,
      100% {
        transform: scale(1);
        opacity: 0.85;
      }

      50% {
        transform: scale(1.25);
        opacity: 0.35;
      }
    }

    @keyframes shine {
      0% {
        transform: translateX(-120%) skewX(-18deg);
      }

      100% {
        transform: translateX(220%) skewX(-18deg);
      }
    }

    .animate-sweep {
      animation: sweep 1.5s infinite linear;
    }

    .animate-phone-ring {
      transform-origin: center;
      animation: phone-ring 2.4s ease-in-out infinite;
    }

    .animate-soft-pulse {
      animation: soft-pulse 2s ease-in-out infinite;
    }

    .animate-shine {
      animation: shine 3.2s ease-in-out infinite;
    }
  </style>
</svelte:head>

{#if isLoading}
  <div
    class="fixed inset-0 z-100 flex flex-col items-center justify-center bg-[#11223A]"
    out:fade={{ duration: 600 }}
  >
    <div class="relative flex flex-col items-center px-4">
      <img
        src="/logo.jpeg"
        alt="Nejlepší Odhad - odhad nemovitosti zdarma"
        class="h-32 w-auto animate-pulse object-contain drop-shadow-2xl md:h-48"
      />

      <div class="mt-12 h-0.75 w-48 overflow-hidden rounded-full bg-white/10 md:w-64">
        <div class="animate-sweep h-full w-full rounded-full bg-white/80"></div>
      </div>
    </div>
  </div>
{/if}

<div class={`bg-white text-slate-900 ${isLoading ? 'h-screen overflow-hidden' : ''}`}>
  <Navbar />
  <Hero />

  <LeadWidget form={form || data.form} />

  <Benefits />
  <Testimonials />
  <FAQ />
  <Process />
  <CTA />
</div>

{#if showHelpBox && !isLoading}
  <div
    class="fixed bottom-4 right-4 z-50 w-[calc(100%-2rem)] max-w-sm sm:bottom-6 sm:right-6"
    in:fly={{ y: 34, x: 14, duration: 520 }}
    out:fade={{ duration: 220 }}
  >
    <div class="pointer-events-none absolute -inset-4 rounded-[2rem] bg-indigo-500/20 blur-2xl"></div>

    <div
      class="relative overflow-hidden rounded-[1.75rem] border border-white/70 bg-white/95 p-5 shadow-2xl shadow-slate-900/20 ring-1 ring-slate-200/70 backdrop-blur-xl"
      in:scale={{ start: 0.96, duration: 420 }}
    >
      <div class="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-indigo-500/10 blur-2xl"></div>
      <div class="pointer-events-none absolute -bottom-20 -left-20 h-44 w-44 rounded-full bg-sky-400/10 blur-2xl"></div>

      <button
        type="button"
        class="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-lg font-bold text-slate-500 transition hover:bg-slate-200 hover:text-slate-950"
        aria-label="Zavřít nápovědu"
        onclick={closeHelpBox}
      >
        ×
      </button>

      <div class="relative pr-8">
        <div class="flex items-center gap-4">
          <div class="relative">
            <span class="animate-soft-pulse absolute inset-0 rounded-2xl bg-slate-400/25"></span>

            <div class="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-800 text-white shadow-xl shadow-slate-950/20">
              <svg class="animate-phone-ring h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106a1.125 1.125 0 0 0-1.173.417l-.97 1.293a1.125 1.125 0 0 1-1.21.38 12.035 12.035 0 0 1-7.143-7.143 1.125 1.125 0 0 1 .38-1.21l1.293-.97a1.125 1.125 0 0 0 .417-1.173L6.963 3.102A1.125 1.125 0 0 0 5.872 2.25H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                />
              </svg>
            </div>
          </div>

          <div>
            <div class="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700 ring-1 ring-slate-200">
              <span class="relative flex h-2 w-2">
                <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-slate-500 opacity-60"></span>
                <span class="relative inline-flex h-2 w-2 rounded-full bg-slate-500"></span>
              </span>
              Telefonická pomoc
            </div>

            <p class="mt-2 text-xs font-black uppercase tracking-widest text-slate-400">
              {availabilityText}
            </p>
          </div>
        </div>

        <h3 class="mt-5 text-2xl font-black tracking-tight text-slate-950">
          Potřebujete poradit?
        </h3>

        <p class="mt-3 text-sm leading-6 text-slate-600">
          Rádi vám pomůžeme s odhadem, výběrem typu nemovitosti i dalším postupem.
          Telefonická pomoc je dostupná v pracovní době.
        </p>

        <a
          href={`tel:${phoneNumberHref}`}
          class="mt-5 flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-slate-100 px-5 py-4 text-slate-600 shadow-sm transition hover:bg-slate-200 hover:text-slate-950"
          aria-label={`Zavolat na telefon ${phoneNumber}`}
        >
          <span>
            <span class="block text-xs font-bold uppercase tracking-widest text-slate-400">
              Telefon Po–Pá 9–18
            </span>
            <span class="mt-0.5 block text-base font-black">
              {phoneNumber}
            </span>
          </span>

          <span class="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-200 text-slate-500">
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106a1.125 1.125 0 0 0-1.173.417l-.97 1.293a1.125 1.125 0 0 1-1.21.38 12.035 12.035 0 0 1-7.143-7.143 1.125 1.125 0 0 1 .38-1.21l1.293-.97a1.125 1.125 0 0 0 .417-1.173L6.963 3.102A1.125 1.125 0 0 0 5.872 2.25H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
              />
            </svg>
          </span>
        </a>

        <p class="mt-3 text-center text-xs font-medium text-slate-400">
          Bez závazků · rychlá domluva · lidský přístup
        </p>
      </div>
    </div>
  </div>
{/if}