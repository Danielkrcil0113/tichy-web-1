<script lang="ts">
  import type { PageProps } from './$types';
import Navbar from '$lib/components/layout/Navbar.svelte';
  import Hero from '$lib/components/sections/Hero.svelte';
  import Benefits from '$lib/components/sections/Benefits.svelte';
  import Process from '$lib/components/sections/Process.svelte';
  import LeadForm from '$lib/components/sections/LeadForm.svelte';
  import Testimonials from '$lib/components/sections/Testimonials.svelte';
  import FAQ from '$lib/components/sections/FAQ.svelte';
  import CTA from '$lib/components/sections/CTA.svelte';
	import Buyout from '$lib/components/sections/Buyout.svelte';
  let { form }: PageProps = $props();
</script>

<svelte:head>
  <title>Odhad nemovitosti zdarma</title>
  <meta
    name="description"
    content="Zjistěte orientační cenu své nemovitosti zdarma a nezávazně."
  />
</svelte:head>

<div class="bg-white text-slate-900">
  <Navbar />
  <Hero />
<LeadForm form={form as any} />
<Benefits />
<Buyout/>
  <Process />
  <Testimonials />
  <FAQ />
  <CTA />
</div>