<script lang="ts">
  import { fade } from 'svelte/transition';
  import { untrack } from 'svelte';
  import LeadForm from './LeadForm.svelte';

  let { form } = $props();

  // Použití untrack zamezí Svelte 5 warningu 'state_referenced_locally'
  let selectedType = $state<string | null>(
    untrack(() => form?.values?.property_type ? String(form.values.property_type) : null)
  );

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

<section id="lead-form" class="relative overflow-hidden bg-slate-50 py-24 sm:py-32">
  <div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
    
    {#if !selectedType && !form?.success}
      <div in:fade={{ duration: 400 }} class="text-center md:text-left mb-12">
        <h2 class="text-4xl font-extrabold tracking-tight text-slate-900">
          Co budeme oceňovat?
        </h2>
        <p class="mt-4 text-lg text-slate-500">
          Vyberte typ nemovitosti pro začátek odhadu zdarma. Zabere to jen 2 minuty.
        </p>
      </div>

      <div in:fade={{ duration: 400, delay: 100 }} class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Vyměněno rounded-[2rem] za rounded-4xl -->
        <button 
          type="button" 
          onclick={() => selectType('byt')}
          aria-label="Chci ocenit byt"
          class="group relative bg-white p-8 rounded-4xl shadow-xl shadow-slate-200/50 ring-1 ring-slate-100 hover:ring-indigo-600 transition-all text-left overflow-hidden hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-100"
        >
          <div class="bg-indigo-50 text-indigo-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110">
            <svg class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 21h18M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16M9 7h2m-2 4h2m-2 4h2m4-8h2m-2 4h2m-2 4h2" />
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-slate-900 mb-2">Byt</h3>
          <p class="text-slate-500 text-sm leading-relaxed">Chci zjistit aktuální tržní cenu bytové jednotky.</p>
        </button>

        <button 
          type="button" 
          onclick={() => selectType('dum')}
          aria-label="Chci ocenit rodinný dům"
          class="group relative bg-white p-8 rounded-4xl shadow-xl shadow-slate-200/50 ring-1 ring-slate-100 hover:ring-indigo-600 transition-all text-left overflow-hidden hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-100"
        >
          <div class="bg-indigo-50 text-indigo-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110">
            <svg class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10" />
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-slate-900 mb-2">Rodinný dům</h3>
          <p class="text-slate-500 text-sm leading-relaxed">Chci ocenit rodinný dům, vilu nebo chatu.</p>
        </button>

        <button 
          type="button" 
          onclick={() => selectType('ostatni')}
          aria-label="Chci ocenit pozemek nebo jiné"
          class="group relative bg-white p-8 rounded-4xl shadow-xl shadow-slate-200/50 ring-1 ring-slate-100 hover:ring-indigo-600 transition-all text-left overflow-hidden hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-100"
        >
          <div class="bg-indigo-50 text-indigo-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110">
            <svg class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-slate-900 mb-2">Pozemek / Jiné</h3>
          <p class="text-slate-500 text-sm leading-relaxed">Stavební parcely, komerční prostory, garáže a další.</p>
        </button>

      </div>
    {:else}
      <div in:fade={{ duration: 400, delay: 100 }}>
        <!-- Doplněn OR operátor, aby byl TypeScript spokojen -->
        <LeadForm {form} property_type={selectedType || 'byt'} onBack={handleReset} />
      </div>
    {/if}

  </div>
</section>