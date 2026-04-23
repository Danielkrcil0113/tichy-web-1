<script lang="ts">
  import { onMount } from 'svelte';
  import { slide } from 'svelte/transition';
  import { resolve } from '$app/paths';

  let isMenuOpen = $state(false);
  let activeSection = $state('vykup-form');

  const navLinks = [
    { label: 'Výhody', href: '/vykup#vyhody', id: 'vyhody' },
    { label: 'Postup', href: '/vykup#jak-to-funguje', id: 'jak-to-funguje' },
    { label: 'Poptávka', href: '/vykup#vykup-form', id: 'vykup-form' }
  ] as const;

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
        rootMargin: '-20% 0px -55% 0px',
        threshold: [0.25, 0.4, 0.6]
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
      title: 'Rychlé řešení',
      description: 'Ozvu se obratem a navrhnu nejvhodnější další krok.',
      icon: 'M12 6v6l4 2.5M21 12a9 9 0 11-18 0 9 9 0 0118 0Z'
    },
    {
      title: 'Diskrétní postup',
      description: 'Bez veřejné inzerce, zbytečných prohlídek a zdržování.',
      icon: 'M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 0h10.5A2.25 2.25 0 0120 12.75v6A2.25 2.25 0 0117.75 21h-11.5A2.25 2.25 0 014 18.75v-6A2.25 2.25 0 016.25 10.5Z'
    },
    {
      title: 'Bezpečný převod',
      description: 'Smlouvy, úschova i administrativa bez starostí.',
      icon: 'M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z'
    }
  ] as const;

  const steps = [
    {
      number: '01',
      title: 'Krátká konzultace',
      description: 'Řeknete mi základní informace o nemovitosti a situaci.'
    },
    {
      number: '02',
      title: 'Návrh řešení',
      description: 'Doporučím nejrychlejší a nejbezpečnější postup.'
    },
    {
      number: '03',
      title: 'Dokončení',
      description: 'Po dohodě zajistím převod i potřebnou administrativu.'
    }
  ] as const;

  const stats = [
    { value: '24 h', label: 'první reakce' },
    { value: '100 %', label: 'diskrétnost' },
    { value: 'A–Z', label: 'servis' }
  ] as const;
</script>

<svelte:head>
  <style>
    html {
      scroll-behavior: smooth;
    }
  </style>
</svelte:head>

<nav class="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 shadow-sm backdrop-blur-xl transition-all">
  <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
    <a
      href={resolve('/')}
      class="flex items-center gap-3 outline-none transition-transform hover:scale-[1.02] focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
      aria-label="Zpět na hlavní stránku"
    >
      <img
        src="/logo.jpeg"
        alt="Nejlepší odhady nemovitostí"
        class="h-12 w-auto rounded-xl border border-slate-200 bg-white p-1 shadow-sm object-contain sm:h-14"
      />
    </a>

    <div class="hidden items-center gap-2 md:flex lg:gap-4">
      {#each navLinks as link (link.id)}
        <a
          href={resolve(link.href)}
          class={`rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 ${
            activeSection === link.id
              ? 'bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200'
              : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          {link.label}
        </a>
      {/each}

      <div class="ml-2 flex items-center gap-3">
        <a
          href={resolve('/')}
          class="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900"
        >
          Hlavní stránka
        </a>
        <a
          href={resolve('/vykup#vykup-form')}
          class="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-md shadow-indigo-600/20 transition-all hover:-translate-y-0.5 hover:bg-indigo-500"
        >
          Nezávazná poptávka
        </a>
      </div>
    </div>

    <button
      type="button"
      class="rounded-xl border border-slate-200 bg-white p-2 text-slate-700 transition-colors hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 md:hidden"
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
      transition:slide={{ duration: 250 }}
      class="absolute left-0 top-full w-full border-b border-slate-200 bg-white/95 shadow-xl backdrop-blur-xl md:hidden"
    >
      <div class="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 sm:px-6">
        <div class="flex flex-col gap-1">
          {#each navLinks as link (link.id)}
            <a
              href={resolve(link.href)}
              class={`block rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                activeSection === link.id
                  ? 'bg-indigo-50 text-indigo-700'
                  : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
              }`}
              onclick={handleNavClick}
            >
              {link.label}
            </a>
          {/each}
        </div>

        <div class="mt-4 flex flex-col gap-3 border-t border-slate-200 pt-5">
          <a
            href={resolve('/')}
            class="block w-full rounded-xl border border-slate-200 px-4 py-3.5 text-center text-sm font-bold text-slate-700 transition-colors hover:bg-slate-50"
            onclick={handleNavClick}
          >
            Hlavní stránka
          </a>
          <a
            href={resolve('/vykup#vykup-form')}
            class="block w-full rounded-xl bg-indigo-600 px-4 py-3.5 text-center text-sm font-bold text-white transition-colors hover:bg-indigo-500"
            onclick={handleNavClick}
          >
            Nezávazná poptávka
          </a>
        </div>
      </div>
    </div>
  {/if}
</nav>

<section id="vykup" class="relative overflow-hidden bg-slate-950 py-14 sm:py-18">
  <div class="absolute inset-x-0 -top-48 -z-10 transform-gpu overflow-hidden blur-3xl">
    <div class="relative left-1/2 aspect-[1155/678] w-[34rem] max-w-none -translate-x-1/2 rotate-[18deg] bg-gradient-to-tr from-indigo-500/20 via-sky-400/10 to-white/5 opacity-70 sm:w-[72rem]"></div>
  </div>
  <div class="absolute -left-20 top-16 -z-10 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl"></div>
  <div class="absolute bottom-0 right-0 -z-10 h-80 w-80 rounded-full bg-sky-500/10 blur-3xl"></div>

  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div class="grid gap-8 lg:grid-cols-12 lg:items-center">
      <div class="lg:col-span-6">
        <div class="inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-white/5 px-4 py-1.5 text-sm font-semibold text-indigo-300 backdrop-blur-md">
          <span class="relative flex h-2.5 w-2.5">
            <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75"></span>
            <span class="relative inline-flex h-2.5 w-2.5 rounded-full bg-indigo-400"></span>
          </span>
          Výkup nemovitostí
        </div>

        <h2 class="mt-5 max-w-3xl text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl lg:leading-[1.08]">
          Prodejte nemovitost
          <span class="bg-gradient-to-r from-indigo-400 via-indigo-300 to-sky-300 bg-clip-text text-transparent">
            rychle a bez zbytečných průtahů
          </span>
        </h2>

        <p class="mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
          Diskrétní řešení, rychlá reakce a bezpečný postup od prvního kontaktu až po převod.
        </p>

        <div class="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href={resolve('/vykup#vykup-form')}
            class="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-7 py-3.5 text-sm font-bold text-slate-900 shadow-xl shadow-black/10 transition-all duration-300 hover:-translate-y-1 hover:bg-indigo-50 sm:text-base"
          >
            Nezávazně poptat výkup
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </a>

          <a
            href="tel:+420777000000"
            class="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-7 py-3.5 text-sm font-bold text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/10 sm:text-base"
          >
            Zavolat hned
          </a>
        </div>

        <div class="mt-8 grid max-w-2xl grid-cols-3 gap-3">
          {#each stats as stat (stat.label)}
            <div class="rounded-2xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur-md">
              <p class="text-xl font-extrabold text-white sm:text-2xl">{stat.value}</p>
              <p class="mt-1 text-xs text-slate-400 sm:text-sm">{stat.label}</p>
            </div>
          {/each}
        </div>
      </div>

      <div class="lg:col-span-6">
        <div
          id="vykup-form"
          class="scroll-mt-28 overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-2xl shadow-black/10 backdrop-blur-xl"
        >
          <div class="border-b border-white/10 px-5 py-5 sm:px-8">
            <h3 class="text-xl font-extrabold text-white sm:text-2xl">Nezávazná poptávka</h3>
            <p class="mt-2 text-sm text-slate-400">
              Vyplňte pár údajů a ozvu se vám co nejdříve.
            </p>
          </div>

          <form class="grid grid-cols-1 gap-4 p-5 sm:p-8 md:grid-cols-2">
            <div>
              <label for="name" class="mb-2 block text-sm font-semibold text-slate-300">
                Jméno a příjmení
              </label>
              <input
                id="name"
                type="text"
                placeholder="Jan Novák"
                class="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-indigo-400/40 focus:ring-2 focus:ring-indigo-400/20"
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
                class="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-indigo-400/40 focus:ring-2 focus:ring-indigo-400/20"
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
                class="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-indigo-400/40 focus:ring-2 focus:ring-indigo-400/20"
              />
            </div>

            <div>
              <label for="type" class="mb-2 block text-sm font-semibold text-slate-300">
                Typ nemovitosti
              </label>
              <select
                id="type"
                class="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none transition focus:border-indigo-400/40 focus:ring-2 focus:ring-indigo-400/20"
              >
                <option>Byt</option>
                <option>Dům</option>
                <option>Pozemek</option>
                <option>Komerční objekt</option>
                <option>Jiné</option>
              </select>
            </div>

            <div class="md:col-span-2">
              <label for="location" class="mb-2 block text-sm font-semibold text-slate-300">
                Lokalita
              </label>
              <input
                id="location"
                type="text"
                placeholder="Např. Praha, Brno, Beroun..."
                class="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-indigo-400/40 focus:ring-2 focus:ring-indigo-400/20"
              />
            </div>

            <div class="md:col-span-2">
              <label for="message" class="mb-2 block text-sm font-semibold text-slate-300">
                Stručný popis situace
              </label>
              <textarea
                id="message"
                rows="4"
                placeholder="Napište stručně, co potřebujete řešit..."
                class="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-indigo-400/40 focus:ring-2 focus:ring-indigo-400/20"
              ></textarea>
            </div>

            <div class="md:col-span-2">
              <label class="flex items-start gap-3 rounded-2xl border border-white/10 bg-slate-900/40 p-4">
                <input type="checkbox" class="mt-1 h-4 w-4 rounded border-white/20 bg-slate-900 text-indigo-500" />
                <span class="text-sm leading-7 text-slate-400">
                  Souhlasím se zpracováním osobních údajů za účelem zpětného kontaktování.
                </span>
              </label>
            </div>

            <div class="md:col-span-2 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p class="text-sm text-slate-500">
                Odesláním formuláře nevzniká žádný závazek.
              </p>

              <button
                type="submit"
                class="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-7 py-3.5 text-base font-bold text-slate-900 shadow-xl shadow-black/10 transition-all duration-300 hover:-translate-y-1 hover:bg-indigo-50"
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

    <div id="vyhody" class="mt-12 grid scroll-mt-28 grid-cols-1 gap-4 lg:mt-16 lg:grid-cols-3">
      {#each benefits as benefit (benefit.title)}
        <article class="group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/5 p-6 shadow-xl shadow-black/10 backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:border-indigo-400/20 hover:shadow-2xl hover:shadow-indigo-500/10">
          <div class="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-indigo-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>

          <div class="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-indigo-400 text-white shadow-lg shadow-indigo-900/20 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
            <svg class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d={benefit.icon} />
            </svg>
          </div>

          <div class="relative z-10 mt-6">
            <h3 class="text-xl font-extrabold text-white">{benefit.title}</h3>
            <p class="mt-3 text-sm leading-7 text-slate-400 sm:text-base">{benefit.description}</p>
          </div>
        </article>
      {/each}
    </div>

    <div
      id="jak-to-funguje"
      class="mt-12 scroll-mt-28 rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/10 backdrop-blur-xl sm:p-8 lg:mt-16"
    >
      <div class="max-w-3xl">
        <p class="text-sm font-bold uppercase tracking-[0.22em] text-indigo-300">Jak to probíhá</p>
        <h3 class="mt-3 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
          Tři jednoduché kroky
        </h3>
      </div>

      <div class="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-3">
        {#each steps as step (step.number)}
          <div class="rounded-[1.5rem] border border-white/10 bg-slate-900/50 p-6 transition-all duration-300 hover:border-indigo-400/20 hover:bg-white/5">
            <span class="text-xs font-bold tracking-[0.25em] text-slate-500">{step.number}</span>
            <h4 class="mt-4 text-xl font-extrabold text-white">{step.title}</h4>
            <p class="mt-3 text-sm leading-7 text-slate-400 sm:text-base">{step.description}</p>
          </div>
        {/each}
      </div>
    </div>

    <div class="mt-12 rounded-[2rem] border border-white/10 bg-gradient-to-r from-indigo-600/15 via-white/5 to-sky-500/10 px-6 py-6 shadow-2xl shadow-black/10 sm:px-8 sm:py-8 lg:mt-16">
      <div class="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div class="max-w-3xl">
          <p class="text-sm font-bold uppercase tracking-[0.22em] text-indigo-300">
            Rychlé a bezpečné řešení
          </p>
          <h3 class="mt-3 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
            Chcete vědět, jaký postup je pro vás nejlepší?
          </h3>
        </div>

        <div class="flex flex-col gap-3 sm:flex-row">
          <a
            href={resolve('/vykup#vykup-form')}
            class="inline-flex items-center justify-center rounded-2xl bg-white px-7 py-3.5 text-base font-bold text-slate-900 shadow-xl shadow-black/10 transition-all duration-300 hover:-translate-y-1 hover:bg-indigo-50"
          >
            Vyplnit poptávku
          </a>

          <a
            href="tel:+420777000000"
            class="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-7 py-3.5 text-base font-bold text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/10"
          >
            Zavolat hned
          </a>
        </div>
      </div>
    </div>
  </div>
</section>