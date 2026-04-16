<script lang="ts">
  import { onMount } from 'svelte';
  import { slide } from 'svelte/transition';

  let isMenuOpen = false;
  let activeSection = 'jak-to-funguje';

  const navLinks = [
    { label: 'Jak to funguje', href: '#jak-to-funguje', id: 'jak-to-funguje' },
    { label: 'Výhody', href: '#vyhody', id: 'vyhody' },
    { label: 'Poptávka', href: '#vykup-form', id: 'vykup-form' },
    { label: 'Kontakt', href: '#kontakt', id: 'kontakt' }
  ];

  function closeMenu() {
    isMenuOpen = false;
  }

  function handleNavClick() {
    closeMenu();
  }

  onMount(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.style.scrollBehavior = 'smooth';
    }

    const sections = navLinks
      .map((link) => document.getElementById(link.id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);

        if (visibleEntries.length > 0) {
          visibleEntries.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
          activeSection = visibleEntries[0].target.id;
        }
      },
      {
        root: null,
        rootMargin: '-25% 0px -55% 0px',
        threshold: [0.2, 0.35, 0.5, 0.7]
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
      document.documentElement.style.scrollBehavior = '';
    };
  });

  const benefits = [
    {
      title: 'Rychlé jednání',
      description:
        'Ozvu se obratem, vyhodnotím situaci a připravím konkrétní návrh řešení bez zbytečných průtahů.',
      icon: 'M12 6v6l4 2.5M21 12a9 9 0 11-18 0 9 9 0 0118 0Z'
    },
    {
      title: 'Diskrétnost',
      description:
        'Celý proces probíhá citlivě a bez veřejné inzerce. Ideální v situacích, kdy potřebujete soukromí a klid.',
      icon: 'M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 0h10.5A2.25 2.25 0 0120 12.75v6A2.25 2.25 0 0117.75 21h-11.5A2.25 2.25 0 014 18.75v-6A2.25 2.25 0 016.25 10.5Z'
    },
    {
      title: 'Právní jistota',
      description:
        'Zajistím bezpečný smluvní proces, advokátní úschovu i kompletní administrativu spojenou s převodem.',
      icon: 'M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z'
    }
  ];

  const situations = [
    {
      title: 'Potřebujete prodat rychle',
      description:
        'Například kvůli stěhování, rozvodu, dědictví, exekuci nebo finančnímu tlaku.',
      icon: 'M3 10.5 12 3l9 7.5M4.5 9.75V19.5A1.5 1.5 0 006 21h3.75v-6h4.5v6H18a1.5 1.5 0 001.5-1.5V9.75'
    },
    {
      title: 'Nemáte čas řešit inzerci',
      description:
        'Nechcete připravovat prezentaci, organizovat prohlídky ani jednat s desítkami zájemců.',
      icon: 'M15.75 6.75 18 9m0 0-2.25 2.25M18 9H9.75m6 8.25L13.5 15m0 0 2.25-2.25M13.5 15H21m-9.75-6h.008v.008h-.008V9Zm0 6h.008v.008h-.008V15Z'
    },
    {
      title: 'Nemovitost je v komplikovaném stavu',
      description:
        'Pomohu i v případě právní zátěže, technických problémů nebo složitější majetkové situace.',
      icon: 'M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0Zm-9 6h.008v.008H12v-.008Z'
    }
  ];

  const steps = [
    {
      number: '01',
      title: 'Kontakt a konzultace',
      description:
        'Krátce si řekneme vaši situaci, typ nemovitosti a to, jak rychle potřebujete věc řešit.'
    },
    {
      number: '02',
      title: 'Návrh řešení a ocenění',
      description:
        'Prověřím možnosti, odhadnu reálnou hodnotu a navrhnu vhodný postup výkupu nebo rychlého prodeje.'
    },
    {
      number: '03',
      title: 'Bezpečné dokončení',
      description:
        'Jakmile se domluvíme, zajistím smlouvy, úschovu i kompletní převod tak, aby vše proběhlo hladce.'
    }
  ];

  const stats = [
    { value: '24 h', label: 'první reakce' },
    { value: '100 %', label: 'diskrétní přístup' },
    { value: 'A–Z', label: 'kompletní servis' }
  ];
</script>

<svelte:head>
  <style>
    html {
      scroll-behavior: smooth;
    }
  </style>
</svelte:head>

<nav class="sticky top-0 z-50 border-b border-slate-200/10 bg-slate-950/80 backdrop-blur-xl transition-all">
  <div class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
    <a
      href="/"
      class="flex items-center gap-3 outline-none transition-transform hover:scale-105 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
      aria-label="Zpět na hlavní stránku"
    >
      <img src="/logo.jpeg" alt="Odhad Nemovitosti" class="h-10 w-auto rounded-md object-contain" />
    </a>

    <div class="hidden items-center gap-3 md:flex lg:gap-8">
      {#each navLinks as link}
        <a
          href={link.href}
          class={`rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 ${
            activeSection === link.id
              ? 'bg-indigo-500/15 text-white shadow-inner ring-1 ring-indigo-400/30'
              : 'text-slate-300 hover:bg-white/5 hover:text-white'
          }`}
        >
          {link.label}
        </a>
      {/each}

      <div class="ml-2 flex items-center gap-3">
        <a
          href="/"
          class="rounded-xl border border-white/10 px-4 py-2 text-sm font-medium text-slate-200 transition-colors hover:bg-white/5 hover:text-white"
        >
          Zpět na hlavní stránku
        </a>
        <a
          href="#vykup-form"
          class="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-md shadow-indigo-600/20 transition-all hover:-translate-y-0.5 hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-600/30"
        >
          Nezávazná poptávka
        </a>
      </div>
    </div>

    <button
      type="button"
      class="rounded-xl border border-white/10 bg-white/5 p-2 text-slate-200 transition-colors hover:bg-white/10 md:hidden focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-950"
      onclick={() => (isMenuOpen = !isMenuOpen)}
      aria-label="Otevřít menu"
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
      class="absolute left-0 top-full w-full border-b border-white/10 bg-slate-950/95 shadow-xl backdrop-blur-xl md:hidden"
    >
      <div class="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-6">
        <div class="flex flex-col gap-1">
          {#each navLinks as link}
            <a
              href={link.href}
              class={`block rounded-lg px-3 py-3 text-base font-medium transition-colors ${
                activeSection === link.id
                  ? 'bg-indigo-500/15 text-white ring-1 ring-indigo-400/30'
                  : 'text-slate-200 hover:bg-white/5 hover:text-white'
              }`}
              onclick={handleNavClick}
            >
              {link.label}
            </a>
          {/each}
        </div>

        <div class="mt-4 flex flex-col gap-3 border-t border-white/10 pt-6">
          <a
            href="/"
            class="block w-full rounded-xl border border-white/10 bg-transparent px-4 py-3.5 text-center text-sm font-bold text-slate-200 transition-colors hover:bg-white/5"
            onclick={handleNavClick}
          >
            Zpět na hlavní stránku
          </a>
          <a
            href="#vykup-form"
            class="block w-full rounded-xl bg-indigo-600 px-4 py-3.5 text-center text-sm font-bold text-white shadow-md shadow-indigo-600/20 transition-colors hover:bg-indigo-500"
            onclick={handleNavClick}
          >
            Nezávazná poptávka
          </a>
        </div>
      </div>
    </div>
  {/if}
</nav>

<section id="vykup" class="relative overflow-hidden bg-slate-950 py-24 sm:py-32">
  <div class="absolute inset-x-0 top-[-12rem] -z-10 transform-gpu overflow-hidden blur-3xl">
    <div class="relative left-1/2 aspect-[1155/678] w-[38rem] max-w-none -translate-x-1/2 rotate-[18deg] bg-gradient-to-tr from-indigo-500/20 via-sky-400/10 to-white/5 opacity-70 sm:w-[76rem]"></div>
  </div>
  <div class="absolute -left-20 top-20 -z-10 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl"></div>
  <div class="absolute bottom-0 right-0 -z-10 h-96 w-96 rounded-full bg-sky-500/10 blur-3xl"></div>

  <div class="mx-auto max-w-7xl px-6 lg:px-8">
    <div class="grid gap-10 lg:grid-cols-12 lg:items-center">
      <div class="lg:col-span-7">
        <div class="inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-white/5 px-4 py-1.5 text-sm font-semibold text-indigo-300 backdrop-blur-md">
          <span class="relative flex h-2.5 w-2.5">
            <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75"></span>
            <span class="relative inline-flex h-2.5 w-2.5 rounded-full bg-indigo-400"></span>
          </span>
          Výkup nemovitostí
        </div>

        <h2 class="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl lg:leading-[1.1]">
          Potřebujete prodat
          <span class="bg-gradient-to-r from-indigo-400 via-indigo-300 to-sky-300 bg-clip-text text-transparent">
            rychle, bezpečně a bez stresu?
          </span>
        </h2>

        <p class="mt-6 max-w-2xl text-lg leading-8 text-slate-400 sm:text-xl">
          Pomohu vám najít nejrychlejší a nejbezpečnější cestu k prodeji nemovitosti. Ať už řešíte časový tlak,
          složitou životní situaci nebo prostě nechcete absolvovat celý klasický prodejní proces, nastavím řešení na míru.
        </p>

        <div class="mt-10 flex flex-col gap-4 sm:flex-row">
          <a
            href="#vykup-form"
            class="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-8 py-4 text-base font-bold text-slate-900 shadow-xl shadow-black/10 transition-all duration-300 hover:-translate-y-1 hover:bg-indigo-50"
          >
            Nezávazně poptat výkup
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </a>

          <a
            href="#kontakt"
            class="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-8 py-4 text-base font-bold text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/10"
          >
            Chci konzultaci
          </a>
        </div>

        <div class="mt-10 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3">
          {#each stats as stat}
            <div class="rounded-[1.5rem] border border-white/10 bg-white/5 p-5 backdrop-blur-md">
              <p class="text-2xl font-extrabold text-white">{stat.value}</p>
              <p class="mt-1 text-sm text-slate-400">{stat.label}</p>
            </div>
          {/each}
        </div>
      </div>

      <div class="lg:col-span-5">
        <div class="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/20 backdrop-blur-xl">
          <div class="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-indigo-400/10 blur-3xl"></div>
          <div class="absolute -left-10 bottom-0 h-40 w-40 rounded-full bg-sky-400/10 blur-3xl"></div>

          <div class="relative z-10">
            <div class="inline-flex rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-emerald-300">
              Individuální řešení
            </div>

            <h3 class="mt-5 text-2xl font-extrabold text-white sm:text-3xl">
              Kdy je výkup nebo rychlý prodej správná volba?
            </h3>

            <div class="mt-8 space-y-4">
              {#each situations as item}
                <div class="group rounded-[1.5rem] border border-white/10 bg-slate-900/50 p-5 transition-all duration-300 hover:border-indigo-400/20 hover:bg-white/5">
                  <div class="flex items-start gap-4">
                    <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-indigo-400 text-white shadow-lg shadow-indigo-900/20 transition-transform duration-300 group-hover:scale-110">
                      <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d={item.icon} />
                      </svg>
                    </div>
                    <div>
                      <h4 class="text-lg font-bold text-white">{item.title}</h4>
                      <p class="mt-2 text-sm leading-7 text-slate-400">{item.description}</p>
                    </div>
                  </div>
                </div>
              {/each}
            </div>

            <div class="mt-8 rounded-[1.5rem] border border-indigo-400/15 bg-indigo-500/10 p-5">
              <p class="text-sm font-semibold leading-7 text-indigo-100">
                Každá situace je jiná. Proto nejdřív navrhnu vhodný postup a teprve potom doporučím nejrychlejší a
                nejbezpečnější variantu řešení.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="vyhody" class="mt-16 scroll-mt-28 grid grid-cols-1 gap-6 lg:mt-24 lg:grid-cols-3">
      {#each benefits as benefit}
        <article class="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-xl shadow-black/10 backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:border-indigo-400/20 hover:shadow-2xl hover:shadow-indigo-500/10">
          <div class="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-indigo-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>

          <div class="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-indigo-400 text-white shadow-lg shadow-indigo-900/20 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
            <svg class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d={benefit.icon} />
            </svg>
          </div>

          <div class="relative z-10 mt-8">
            <h3 class="text-2xl font-extrabold text-white">{benefit.title}</h3>
            <p class="mt-4 text-base leading-8 text-slate-400">{benefit.description}</p>
          </div>

          <div class="relative z-10 mt-8 h-[3px] w-14 rounded-full bg-gradient-to-r from-indigo-500 to-sky-400 transition-all duration-500 group-hover:w-24"></div>
        </article>
      {/each}
    </div>

    <div
      id="jak-to-funguje"
      class="mt-16 scroll-mt-28 rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/10 backdrop-blur-xl sm:p-10 lg:mt-24"
    >
      <div class="max-w-3xl">
        <p class="text-sm font-bold uppercase tracking-[0.22em] text-indigo-300">Jak probíhá spolupráce</p>
        <h3 class="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Jednoduchý proces, jasné kroky, bezpečný výsledek
        </h3>
        <p class="mt-4 text-lg leading-8 text-slate-400">
          Cílem je, abyste od začátku věděli, co se bude dít, kolik času to zabere a jak bude celý převod probíhat.
        </p>
      </div>

      <div class="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {#each steps as step}
          <div class="group relative rounded-[1.75rem] border border-white/10 bg-slate-900/50 p-7 transition-all duration-300 hover:border-indigo-400/20 hover:bg-white/5">
            <div class="flex items-center justify-between">
              <span class="text-sm font-bold tracking-[0.25em] text-slate-500">{step.number}</span>
              <div class="h-10 w-10 rounded-full bg-white/5"></div>
            </div>

            <h4 class="mt-8 text-2xl font-extrabold text-white">{step.title}</h4>
            <p class="mt-4 text-base leading-8 text-slate-400">{step.description}</p>
          </div>
        {/each}
      </div>
    </div>

    <div id="kontakt" class="mt-16 scroll-mt-28 grid gap-8 lg:mt-24 lg:grid-cols-12">
      <div class="lg:col-span-5">
        <div class="sticky top-28 rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-900 to-slate-900/80 p-8 shadow-2xl shadow-black/20">
          <p class="text-sm font-bold uppercase tracking-[0.22em] text-indigo-300">Nezávazná poptávka</p>
          <h3 class="mt-4 text-3xl font-extrabold tracking-tight text-white">
            Popište mi vaši situaci a navrhnu další postup
          </h3>

          <p class="mt-5 text-base leading-8 text-slate-400">
            Stačí pár základních informací. Ozvu se vám zpět a společně vyhodnotíme, zda je vhodnější výkup,
            rychlý prodej nebo jiná forma řešení.
          </p>

          <div class="mt-8 space-y-4">
            <div class="flex items-start gap-3">
              <div class="mt-1 h-2.5 w-2.5 rounded-full bg-indigo-400"></div>
              <p class="text-sm leading-7 text-slate-300">Bez veřejné inzerce a zbytečného čekání</p>
            </div>
            <div class="flex items-start gap-3">
              <div class="mt-1 h-2.5 w-2.5 rounded-full bg-indigo-400"></div>
              <p class="text-sm leading-7 text-slate-300">Citlivý přístup při složitějších životních situacích</p>
            </div>
            <div class="flex items-start gap-3">
              <div class="mt-1 h-2.5 w-2.5 rounded-full bg-indigo-400"></div>
              <p class="text-sm leading-7 text-slate-300">Kompletní právní a administrativní servis</p>
            </div>
          </div>

          <div class="mt-8 rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
            <p class="text-sm font-semibold text-white">Preferujete osobní kontakt?</p>
            <p class="mt-2 text-sm leading-7 text-slate-400">
              Zavolejte nebo napište a projdeme možnosti individuálně.
            </p>
          </div>
        </div>
      </div>

      <div class="lg:col-span-7">
        <div
          id="vykup-form"
          class="scroll-mt-28 overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-2xl shadow-black/10 backdrop-blur-xl"
        >
          <div class="border-b border-white/10 px-6 py-5 sm:px-8">
            <h3 class="text-2xl font-extrabold text-white">Poptávka výkupu / rychlého prodeje</h3>
            <p class="mt-2 text-sm text-slate-400">
              Vyplňte základní údaje a já se vám co nejdříve ozvu zpět.
            </p>
          </div>

          <form class="grid grid-cols-1 gap-5 p-6 sm:p-8 md:grid-cols-2">
            <div>
              <label for="name" class="mb-2 block text-sm font-semibold text-slate-300">
                Jméno a příjmení
              </label>
              <input
                id="name"
                type="text"
                placeholder="Jan Novák"
                class="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3.5 text-white outline-none transition placeholder:text-slate-500 focus:border-indigo-400/40 focus:ring-2 focus:ring-indigo-400/20"
              />
            </div>

            <div>
              <label for="phone" class="mb-2 block text-sm font-semibold text-slate-300">
                Telefon
              </label>
              <input
                id="phone"
                type="tel"
                placeholder="+420 777 000 000"
                class="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3.5 text-white outline-none transition placeholder:text-slate-500 focus:border-indigo-400/40 focus:ring-2 focus:ring-indigo-400/20"
              />
            </div>

            <div>
              <label for="email" class="mb-2 block text-sm font-semibold text-slate-300">
                E-mail
              </label>
              <input
                id="email"
                type="email"
                placeholder="vas@email.cz"
                class="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3.5 text-white outline-none transition placeholder:text-slate-500 focus:border-indigo-400/40 focus:ring-2 focus:ring-indigo-400/20"
              />
            </div>

            <div>
              <label for="type" class="mb-2 block text-sm font-semibold text-slate-300">
                Typ nemovitosti
              </label>
              <select
                id="type"
                class="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3.5 text-white outline-none transition focus:border-indigo-400/40 focus:ring-2 focus:ring-indigo-400/20"
              >
                <option>Byt</option>
                <option>Dům</option>
                <option>Vila</option>
                <option>Pozemek</option>
                <option>Komerční objekt</option>
                <option>Jiné</option>
              </select>
            </div>

            <div>
              <label for="location" class="mb-2 block text-sm font-semibold text-slate-300">
                Lokalita
              </label>
              <input
                id="location"
                type="text"
                placeholder="Např. Praha 4, Brno, Beroun..."
                class="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3.5 text-white outline-none transition placeholder:text-slate-500 focus:border-indigo-400/40 focus:ring-2 focus:ring-indigo-400/20"
              />
            </div>

            <div>
              <label for="timeline" class="mb-2 block text-sm font-semibold text-slate-300">
                Jak rychle potřebujete řešení?
              </label>
              <select
                id="timeline"
                class="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3.5 text-white outline-none transition focus:border-indigo-400/40 focus:ring-2 focus:ring-indigo-400/20"
              >
                <option>Co nejdříve</option>
                <option>Do 1 týdne</option>
                <option>Do 1 měsíce</option>
                <option>Jen zjišťuji možnosti</option>
              </select>
            </div>

            <div class="md:col-span-2">
              <label for="message" class="mb-2 block text-sm font-semibold text-slate-300">
                Popis situace
              </label>
              <textarea
                id="message"
                rows="6"
                placeholder="Stručně popište vaši situaci, stav nemovitosti nebo to, co aktuálně potřebujete vyřešit..."
                class="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3.5 text-white outline-none transition placeholder:text-slate-500 focus:border-indigo-400/40 focus:ring-2 focus:ring-indigo-400/20"
              ></textarea>
            </div>

            <div class="md:col-span-2">
              <label class="flex items-start gap-3 rounded-2xl border border-white/10 bg-slate-900/40 p-4">
                <input type="checkbox" class="mt-1 h-4 w-4 rounded border-white/20 bg-slate-900 text-indigo-500" />
                <span class="text-sm leading-7 text-slate-400">
                  Souhlasím se zpracováním osobních údajů za účelem zpětného kontaktování. Text si pak uprav podle svého reálného GDPR řešení.
                </span>
              </label>
            </div>

            <div class="md:col-span-2 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p class="text-sm text-slate-500">
                Odesláním formuláře nevzniká žádný závazek. Jde pouze o nezávaznou poptávku.
              </p>

              <button
                type="submit"
                class="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-7 py-4 text-base font-bold text-slate-900 shadow-xl shadow-black/10 transition-all duration-300 hover:-translate-y-1 hover:bg-indigo-50"
              >
                Odeslat poptávku
                <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div class="mt-16 rounded-[2rem] border border-white/10 bg-gradient-to-r from-indigo-600/15 via-white/5 to-sky-500/10 px-8 py-8 shadow-2xl shadow-black/10 sm:px-10 sm:py-10 lg:mt-24">
      <div class="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div class="max-w-3xl">
          <p class="text-sm font-bold uppercase tracking-[0.22em] text-indigo-300">
            Rychlé a bezpečné řešení
          </p>
          <h3 class="mt-3 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
            Potřebujete situaci vyřešit bez zbytečných průtahů?
          </h3>
          <p class="mt-4 text-base leading-7 text-slate-400 sm:text-lg">
            Ozvěte se mi a společně zvolíme nejlepší cestu. Diskrétně, profesionálně a s důrazem na bezpečný průběh celé transakce.
          </p>
        </div>

        <div class="flex flex-col gap-4 sm:flex-row">
          <a
            href="#vykup-form"
            class="inline-flex items-center justify-center rounded-2xl bg-white px-7 py-4 text-base font-bold text-slate-900 shadow-xl shadow-black/10 transition-all duration-300 hover:-translate-y-1 hover:bg-indigo-50"
          >
            Vyplnit poptávku
          </a>

          <a
            href="tel:+420777000000"
            class="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-7 py-4 text-base font-bold text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/10"
          >
            Zavolat hned
          </a>
        </div>
      </div>
    </div>
  </div>
</section>