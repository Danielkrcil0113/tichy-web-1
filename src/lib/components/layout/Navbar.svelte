<script lang="ts">
  import { resolve } from '$app/paths';
  import { slide } from 'svelte/transition';

  let isMenuOpen = $state(false);
  let activeHash = $state('');

  const links = [
    { label: 'Domů', href: '/#domu', hash: '#domu' },
    { label: 'Online vs Ruční odhad', href: '/#online-rucni-odhad', hash: '#online-rucni-odhad' },
    { label: 'Reference', href: '/#reference', hash: '#reference' },
    { label: 'FAQ', href: '/#faq', hash: '#faq' }
  ] as const;

  function closeMenu() {
    isMenuOpen = false;
  }

  function scrollToHash(hash: string) {
    window.setTimeout(() => {
      document.querySelector(hash)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }, 50);
  }

  function handleNavClick(event: MouseEvent, hash: string) {
    closeMenu();

    if (typeof window === 'undefined') return;

    if (window.location.pathname === '/') {
      event.preventDefault();

      if (window.location.hash !== hash) {
        history.pushState(null, '', hash);
      }

      scrollToHash(hash);
    }
  }

  function handleEstimateClick(event: MouseEvent) {
    closeMenu();

    if (typeof window === 'undefined') return;

    if (window.location.pathname === '/') {
      event.preventDefault();

      window.dispatchEvent(new CustomEvent('start-new-estimate'));

      window.setTimeout(() => {
        document.querySelector('#lead-form')?.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }, 50);
    }
  }

  $effect(() => {
    const sections = links
      .map((link) => document.querySelector(link.hash))
      .filter(Boolean) as HTMLElement[];

    function updateActiveSection() {
      let current = '';

      for (const section of sections) {
        const rect = section.getBoundingClientRect();

        if (rect.top <= 140 && rect.bottom >= 140) {
          current = `#${section.id}`;
          break;
        }
      }

      activeHash = current;
    }

    updateActiveSection();

    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection);

    return () => {
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', updateActiveSection);
    };
  });
</script>

<svelte:head>
  <style>
    html {
      scroll-behavior: smooth;
    }

    section {
      scroll-margin-top: 110px;
    }
  </style>
</svelte:head>

<nav class="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl transition-all">
  <div class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
    <a
      href={resolve('/')}
      class="flex items-center gap-3 rounded-2xl outline-none transition-transform duration-300 hover:scale-[1.03] focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
      aria-label="Zpět na hlavní stránku"
    >
      <img
        src="/logo.jpeg"
        alt="Odhad Nemovitosti"
        class="h-14 w-auto rounded-2xl object-contain shadow-md shadow-black/20 sm:h-16"
      />
    </a>

    <div class="hidden items-center gap-3 md:flex lg:gap-6">
      {#each links as link (link.href)}
        <a
          href={resolve(link.href)}
          onclick={(event) => handleNavClick(event, link.hash)}
          class={`group relative rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 ${
            activeHash === link.hash
              ? 'text-white'
              : 'text-slate-300 hover:bg-white/5 hover:text-white'
          }`}
        >
          {link.label}

          <span
            class={`absolute inset-x-4 -bottom-1 h-0.5 origin-left rounded-full bg-indigo-500 transition-transform duration-300 ${
              activeHash === link.hash ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
            }`}
          ></span>
        </a>
      {/each}

      <a
        href={resolve('/#lead-form')}
        onclick={handleEstimateClick}
        class="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-indigo-500 hover:shadow-xl hover:shadow-indigo-600/30"
      >
        Chci odhad zdarma
      </a>
    </div>

    <button
      type="button"
      class="rounded-xl border border-white/10 bg-white/5 p-2.5 text-slate-200 transition-colors duration-200 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-950 md:hidden"
      onclick={() => (isMenuOpen = !isMenuOpen)}
      aria-label={isMenuOpen ? 'Zavřít menu' : 'Otevřít menu'}
      aria-expanded={isMenuOpen}
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

  {#if isMenuOpen}
    <div
      transition:slide={{ duration: 300 }}
      class="absolute left-0 top-full w-full border-b border-white/10 bg-slate-950/95 shadow-2xl backdrop-blur-xl md:hidden"
    >
      <div class="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-6">
        <div class="flex flex-col gap-1">
          {#each links as link (link.href)}
            <a
              href={resolve(link.href)}
              onclick={(event) => handleNavClick(event, link.hash)}
              class={`rounded-xl px-4 py-3 text-base font-medium transition-colors duration-200 ${
                activeHash === link.hash
                  ? 'bg-white/10 text-white'
                  : 'text-slate-200 hover:bg-white/5 hover:text-white'
              }`}
            >
              {link.label}
            </a>
          {/each}
        </div>

        <div class="mt-4 border-t border-white/10 pt-6">
          <a
            href={resolve('/#lead-form')}
            class="block w-full rounded-xl bg-indigo-600 px-4 py-3.5 text-center text-sm font-bold text-white shadow-md shadow-indigo-600/20 transition-colors duration-200 hover:bg-indigo-500"
            onclick={handleEstimateClick}
          >
            Chci odhad zdarma
          </a>
        </div>
      </div>
    </div>
  {/if}
</nav>