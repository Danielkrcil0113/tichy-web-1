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

  const phoneNumber = '+420 602 447 432';
  const phoneHref = 'tel:+420602447432';
  const availabilityText = 'Po–Pá 9:00–18:00';

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
  <title>Nejlepší Odhad | Odhad nemovitosti zdarma</title>

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
        alt="Logo"
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
            <span class="animate-soft-pulse absolute inset-0 rounded-2xl bg-indigo-500/30"></span>

            <div class="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-xl shadow-slate-950/25">
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
            <div class="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 ring-1 ring-emerald-200">
              <span class="relative flex h-2 w-2">
                <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-70"></span>
                <span class="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
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
          Zavolejte nám v pracovní době.
        </p>

        <a
          href={phoneHref}
          class="group relative mt-5 flex w-full items-center justify-between overflow-hidden rounded-2xl bg-slate-950 px-5 py-4 text-white shadow-xl shadow-slate-950/20 transition hover:-translate-y-0.5 hover:bg-indigo-600"
        >
          <span class="animate-shine pointer-events-none absolute inset-y-0 left-0 w-16 bg-white/20"></span>

          <span>
            <span class="block text-xs font-bold uppercase tracking-widest text-white/60">
              Zavolat Po–Pá 9–18
            </span>
            <span class="mt-0.5 block text-base font-black">
              {phoneNumber}
            </span>
          </span>

          <span class="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 transition group-hover:translate-x-1 group-hover:bg-white/20">
            →
          </span>
        </a>

        <p class="mt-3 text-center text-xs font-medium text-slate-400">
          Bez závazků · rychlá domluva · lidský přístup
        </p>
      </div>
    </div>
  </div>
{/if}