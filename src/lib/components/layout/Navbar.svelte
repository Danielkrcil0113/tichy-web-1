<script lang="ts">
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

<nav class="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl">
  <div class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
    <a href="/" class="text-lg font-bold tracking-tight text-slate-900">
      Odhad<span class="text-slate-500">Nemovitosti</span>
    </a>

    <div class="hidden items-center gap-8 md:flex">
      {#each links as link}
        <a
          href={link.href}
          class="text-sm font-medium text-slate-600 transition hover:text-slate-900"
        >
          {link.label}
        </a>
      {/each}

      <a
        href="#lead-form"
        class="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
      >
        Chci odhad zdarma
      </a>
    </div>

    <button
      type="button"
      class="rounded-xl border border-slate-300 px-3 py-2 text-sm md:hidden"
      onclick={() => (isMenuOpen = !isMenuOpen)}
      aria-label="Otevřít menu"
    >
      Menu
    </button>
  </div>

  {#if isMenuOpen}
    <div class="border-t border-slate-200 bg-white md:hidden">
      <div class="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-4">
        {#each links as link}
          <a
            href={link.href}
            class="text-sm font-medium text-slate-700"
            onclick={closeMenu}
          >
            {link.label}
          </a>
        {/each}

        <a
          href="#lead-form"
          class="mt-2 rounded-2xl bg-slate-900 px-4 py-3 text-center text-sm font-medium text-white"
          onclick={closeMenu}
        >
          Chci odhad zdarma
        </a>
      </div>
    </div>
  {/if}
</nav>