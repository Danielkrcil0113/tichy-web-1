<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { untrack } from 'svelte';
  import LeadForm from './LeadForm.svelte';

  let { form } = $props();

  let selectedType = $state<string | null>(
    untrack(() => (form?.values?.property_type ? String(form.values.property_type) : null))
  );

  const propertyTypes = [
    {
      id: 'byt',
      title: 'Byt',
      subtitle: 'Bytová jednotka',
      description: 'Ideální pro ocenění bytu před prodejem, koupí, dědictvím nebo vypořádáním.',
      badge: 'Nejčastější volba',
      features: ['výtah', 'dispozice', 'stav bytu', 'lokalita'],
      icon: 'apartment'
    },
    {
      id: 'dum',
      title: 'Rodinný dům',
      subtitle: 'Dům, vila nebo chata',
      description: 'Oceníme rodinný dům včetně pozemku, zahrady, technického stavu a lokality.',
      badge: 'Včetně zahrady',
      features: ['pozemek', 'zahrada', 'stav domu', 'garáž'],
      icon: 'house'
    },
    {
      id: 'ostatni',
      title: 'Pozemek / Jiné',
      subtitle: 'Pozemky a ostatní typy',
      description: 'Pro stavební parcely, zahrady, garáže, komerční prostory nebo jiné nemovitosti.',
      badge: 'Individuální posouzení',
      features: ['pozemek', 'sítě', 'přístup', 'využití'],
      icon: 'land'
    }
  ];

  function selectType(type: string) {
    selectedType = type;
  }

  function handleReset() {
    selectedType = null;

    if (form) {
      form.errors = undefined;
      form.message = undefined;
    }
  }
</script>

<section id="lead-form" class="relative overflow-hidden bg-slate-50 py-16 sm:py-24 lg:py-32">
  <div class="pointer-events-none absolute inset-0">
    <div class="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-indigo-200/30 blur-3xl"></div>
    <div class="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-slate-300/30 blur-3xl"></div>
  </div>

  <div class="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
    {#if !selectedType && !form?.success}
      <div in:fade={{ duration: 400 }} class="mx-auto mb-10 max-w-3xl text-center sm:mb-12">
        <span class="inline-flex items-center rounded-full bg-indigo-50 px-4 py-2 text-xs font-bold uppercase tracking-wide text-indigo-700 ring-1 ring-indigo-100 sm:text-sm">
          Odhad nemovitosti zdarma
        </span>

        <h2 class="mt-6 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
          Co budeme oceňovat?
        </h2>

        <p class="mt-4 text-base leading-7 text-slate-500 sm:mt-5 sm:text-lg sm:leading-8">
          Vyberte typ nemovitosti a my vás provedeme krátkým formulářem. Zabere to přibližně 2 minuty.
        </p>
      </div>

      <div in:fade={{ duration: 400, delay: 100 }} class="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-3">
        {#each propertyTypes as item, index (item.id)}
          <button
            type="button"
            onclick={() => selectType(item.id)}
            aria-label={`Chci ocenit: ${item.title}`}
            in:fly={{ y: 16, duration: 350, delay: 80 * index }}
            class="group relative overflow-hidden rounded-3xl bg-white p-5 text-left shadow-xl shadow-slate-200/60 ring-1 ring-slate-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-100 hover:ring-indigo-500 active:scale-[0.98] sm:rounded-4xl sm:p-7"
          >
            <div class="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-indigo-50 transition-transform duration-300 group-hover:scale-125"></div>

            <div class="relative">
              <div class="mb-5 flex items-start justify-between gap-4 sm:mb-6">
                <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 transition-all duration-300 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white sm:h-16 sm:w-16">
                  {#if item.icon === 'apartment'}
                    <svg class="h-7 w-7 sm:h-8 sm:w-8" fill="none" viewBox="0 0 24 24" stroke-width="1.7" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M3 21h18M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16M9 7h2m-2 4h2m-2 4h2m4-8h2m-2 4h2m-2 4h2" />
                    </svg>
                  {:else if item.icon === 'house'}
                    <svg class="h-7 w-7 sm:h-8 sm:w-8" fill="none" viewBox="0 0 24 24" stroke-width="1.7" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M3 10.5 12 3l9 7.5M5 9.5V21h14V9.5M9 21v-7h6v7" />
                    </svg>
                  {:else}
                    <svg class="h-7 w-7 sm:h-8 sm:w-8" fill="none" viewBox="0 0 24 24" stroke-width="1.7" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
                    </svg>
                  {/if}
                </div>

                <span class="rounded-full bg-slate-50 px-3 py-1 text-xs font-bold text-slate-500 ring-1 ring-slate-100">
                  {item.badge}
                </span>
              </div>

              <p class="text-xs font-bold uppercase tracking-wide text-indigo-600 sm:text-sm">
                {item.subtitle}
              </p>

              <h3 class="mt-2 text-2xl font-extrabold text-slate-900 sm:text-2xl">
                {item.title}
              </h3>

              <p class="mt-3 text-sm leading-6 text-slate-500">
                {item.description}
              </p>

              <div class="mt-5 flex gap-2 overflow-x-auto pb-2 sm:mt-6 sm:flex-wrap sm:overflow-visible sm:pb-0">
                {#each item.features as feature (feature)}
                  <span class="shrink-0 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                    {feature}
                  </span>
                {/each}
              </div>

              <div class="mt-7 flex items-center justify-between border-t border-slate-100 pt-5 sm:mt-8">
                <span class="text-sm font-bold text-slate-900">
                  Vybrat
                </span>

                <span class="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-white transition-all duration-300 group-hover:translate-x-1 group-hover:bg-indigo-600">
                  <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </span>
              </div>
            </div>
          </button>
        {/each}
      </div>

      <div in:fade={{ duration: 400, delay: 250 }} class="mx-auto mt-8 grid max-w-4xl gap-3 rounded-3xl bg-white/80 p-4 text-sm text-slate-600 shadow-lg shadow-slate-200/40 ring-1 ring-slate-100 backdrop-blur sm:mt-10 sm:grid-cols-3">
        <div class="flex items-center gap-3">
          <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
            ✓
          </span>
          <span>Odhad zdarma</span>
        </div>

        <div class="flex items-center gap-3">
          <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
            ✓
          </span>
          <span>Nezávazně</span>
        </div>

        <div class="flex items-center gap-3">
          <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
            ✓
          </span>
          <span>Rychlé vyplnění</span>
        </div>
      </div>

      <div class="fixed bottom-4 left-0 right-0 z-10 px-4 md:hidden">
        <div class="rounded-2xl bg-white/90 p-3 text-center text-sm font-semibold text-slate-600 shadow-lg ring-1 ring-slate-200 backdrop-blur">
          Vyberte typ nemovitosti 👆
        </div>
      </div>
    {:else}
      <div in:fade={{ duration: 400, delay: 100 }}>
        <LeadForm {form} property_type={selectedType || 'byt'} onBack={handleReset} />
      </div>
    {/if}
  </div>
</section>