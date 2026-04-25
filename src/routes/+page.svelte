<script lang="ts">
  import type { PageProps } from './$types';
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';

  import Navbar from '$lib/components/layout/Navbar.svelte';
  import Hero from '$lib/components/sections/Hero.svelte';
  import Benefits from '$lib/components/sections/Benefits.svelte';
  import Process from '$lib/components/sections/Process.svelte';
  import Testimonials from '$lib/components/sections/Testimonials.svelte';
  import FAQ from '$lib/components/sections/FAQ.svelte';
  import CTA from '$lib/components/sections/CTA.svelte';
  import LeadWidget from '$lib/components/sections/LeadWidget.svelte';

  // Definujeme rozhraní pro data z formuláře
  interface FormResult {
    success?: boolean;
    message?: string;
    errors?: Record<string, string[]>;
    values?: Record<string, string | number | boolean | null | undefined>;
  }

  // Definujeme přesnější typ pro PageData, abychom se vyhnuli 'any' u data.form
  interface CustomPageData {
    form?: FormResult;
    [key: string]: unknown;
  }

  // Rozšíříme PageProps o naše upravené datové struktury
  let { data, form }: { data: CustomPageData & PageProps['data'], form?: FormResult } = $props();

  let isLoading = $state(true);
  let showHelpBox = $state(false);
  let helpBoxClosed = $state(false);

  const phoneNumber = '+420602447432';
  const phoneHref = 'tel:+420 602 447 432';

  onMount(() => {
    // Simulace loaderu
    const timer = setTimeout(() => {
      isLoading = false;
    }, 2500);

    const handleScroll = () => {
      if (window.scrollY > 500 && !helpBoxClosed) {
        showHelpBox = true;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
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
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }
    .animate-sweep {
      animation: sweep 1.5s infinite linear;
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
  
  <!-- LeadWidget nyní dostává form buď z akce (form) nebo z loadu (data.form) bez varování ESLintu -->
  <LeadWidget form={form || data.form} />
  
  <Benefits />
  <Testimonials />
  <FAQ />
  <Process />
  <CTA />
</div>

{#if showHelpBox && !isLoading}
  <div
    class="fixed bottom-5 right-5 z-50 w-[calc(100%-2.5rem)] max-w-sm overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-2xl shadow-slate-900/20"
    in:fly={{ y: 24, duration: 450 }}
    out:fade={{ duration: 250 }}
  >
    <button
      type="button"
      class="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-slate-200 hover:text-slate-900"
      aria-label="Zavřít nápovědu"
      onclick={closeHelpBox}
    >
      ×
    </button>

    <div class="pr-8">
      <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-lg">
        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106a1.125 1.125 0 0 0-1.173.417l-.97 1.293a1.125 1.125 0 0 1-1.21.38 12.035 12.035 0 0 1-7.143-7.143 1.125 1.125 0 0 1 .38-1.21l1.293-.97a1.125 1.125 0 0 0 .417-1.173L6.963 3.102A1.125 1.125 0 0 0 5.872 2.25H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
        </svg>
      </div>

      <p class="mt-4 text-sm font-semibold uppercase tracking-wide text-slate-500">
        Potřebujete poradit?
      </p>

      <h3 class="mt-1 text-xl font-bold text-slate-950">
        Chcete pomoc? Zavolejte nám.
      </h3>

      <p class="mt-3 text-sm leading-6 text-slate-600">
        Rádi vám pomůžeme s odhadem i dalším postupem.
      </p>

      <a
        href={phoneHref}
        class="mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-slate-800"
      >
        Zavolat {phoneNumber}
      </a>
    </div>
  </div>
{/if}