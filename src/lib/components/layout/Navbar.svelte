<script lang="ts">
  import { slide } from 'svelte/transition';

  let isMenuOpen = $state(false);

  const links = [
    { label: 'Jak to funguje', href: '#jak-to-funguje' },
    { label: 'Výhody', href: '#vyhody' },
    { label: 'Reference', href: '#reference' },
    { label: 'FAQ', href: '#faq' }
  ];

  function closeMenu() {
    isMenuOpen = false;
  }
</script>

<nav class="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl transition-all">
  <div class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
    <!-- Logo -->
    <a
      href="/"
      class="flex items-center gap-3 rounded-2xl outline-none transition-transform duration-300 hover:scale-[1.03] focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
      aria-label="Zpět na hlavní stránku"
    >
      <img
  src="/logo.jpeg"
  alt="Odhad Nemovitosti"
  class="h-14 w-auto rounded-2xl object-contain sm:h-16 shadow-md shadow-black/20"
/>
    </a>

    <!-- Desktop Menu -->
    <div class="hidden items-center gap-3 md:flex lg:gap-6">
      {#each links as link}
        <a
          href={link.href}
          class="rounded-xl px-4 py-2 text-sm font-medium text-slate-300 transition-all duration-200 hover:bg-white/5 hover:text-white"
        >
          {link.label}
        </a>
      {/each}


      <div class="ml-2 flex items-center gap-3">
        <a
          href="/vykup"
          class="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-slate-200 backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/10 hover:text-white"
        >
          Výkup nemovitostí
        </a>
        <a
          href="#lead-form"
          class="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-indigo-500 hover:shadow-xl hover:shadow-indigo-600/30"
        >
          Chci odhad zdarma
        </a>
      </div>
    </div>

    <!-- Mobile Menu Button -->
    <button
      type="button"
      class="rounded-xl border border-white/10 bg-white/5 p-2.5 text-slate-200 transition-colors duration-200 hover:bg-white/10 md:hidden focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-950"
      onclick={() => (isMenuOpen = !isMenuOpen)}
      aria-label="Otevřít menu"
    >
      <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        {#if isMenuOpen}
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        {:else}
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        {/if}
      </svg>
    </button>
  </div>

  <!-- Mobile Menu Dropdown -->
  {#if isMenuOpen}
    <div
      transition:slide={{ duration: 300 }}
      class="absolute left-0 top-full w-full border-b border-white/10 bg-slate-950/95 shadow-2xl backdrop-blur-xl md:hidden"
    >
      <div class="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-6">
        <div class="flex flex-col gap-1">
          {#each links as link}
            <a
              href={link.href}
              class="block rounded-xl px-4 py-3 text-base font-medium text-slate-200 transition-colors duration-200 hover:bg-white/5 hover:text-white"
              onclick={closeMenu}
            >
              {link.label}
            </a>
          {/each}
        </div>

        <div class="mt-4 flex flex-col gap-3 border-t border-white/10 pt-6">
          <a
            href="/vykup"
            class="block w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-center text-sm font-bold text-slate-200 transition-all duration-200 hover:bg-white/10"
            onclick={closeMenu}
          >
            Výkup nemovitostí
          </a>
          <a
            href="#lead-form"
            class="block w-full rounded-xl bg-indigo-600 px-4 py-3.5 text-center text-sm font-bold text-white shadow-md shadow-indigo-600/20 transition-colors duration-200 hover:bg-indigo-500"
            onclick={closeMenu}
          >
            Chci odhad zdarma
          </a>
        </div>
      </div>
    </div>
  {/if}
</nav>