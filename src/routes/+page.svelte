<script lang="ts">
  import type { PageProps } from './$types';
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';

  import Navbar from '$lib/components/layout/Navbar.svelte';
  import Hero from '$lib/components/sections/Hero.svelte';
  import Benefits from '$lib/components/sections/Benefits.svelte';
  import Process from '$lib/components/sections/Process.svelte';
  import LeadForm from '$lib/components/sections/LeadForm.svelte';
  import Testimonials from '$lib/components/sections/Testimonials.svelte';
  import FAQ from '$lib/components/sections/FAQ.svelte';
  import CTA from '$lib/components/sections/CTA.svelte';

  let { form }: PageProps = $props();

  let isLoading = $state(true);

  onMount(() => {
    const timer = setTimeout(() => {
      isLoading = false;
    }, 4000);

    return () => clearTimeout(timer);
  });
</script>

<svelte:head>
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
    class="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#11223A]"
    out:fade={{ duration: 800 }}
  >
    <div class="relative flex flex-col items-center px-4">
      <img
        src="/logo.jpeg"
        alt="Načítání..."
        class="h-32 w-auto animate-pulse object-contain drop-shadow-2xl md:h-48"
      />

      <div class="mt-12 h-[3px] w-48 overflow-hidden rounded-full bg-white/10 md:w-64">
        <div class="animate-sweep h-full w-full rounded-full bg-white/80"></div>
      </div>
    </div>
  </div>
{/if}

<div class={`bg-white text-slate-900 ${isLoading ? 'h-screen overflow-hidden' : ''}`}>
  <Navbar />
  <Hero />
  <LeadForm {form} />
  <Benefits />

  <Testimonials />
  <FAQ />
  <Process />
  <CTA />
</div>