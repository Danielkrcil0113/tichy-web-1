<script lang="ts">
  const onlineItems = [
    'nemusí zohlednit aktuální stav nemovitosti',
    'nepozná atmosféru domu, bytu ani okolí',
    'může přehlédnout detaily, které cenu zvyšují',
    'nepracuje vždy s aktuální poptávkou kupujících'
  ];
</script>

<section id="vyhody" class="relative overflow-hidden bg-white">
  <div class="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-slate-100 to-transparent"></div>

  <div class="relative mx-auto max-w-7xl px-6 py-20 lg:py-24">
    <div class="mx-auto max-w-3xl text-center animate-fade-up">
      <span class="inline-flex rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">
        Ruční odhad vs. online odhad
      </span>

      <h2 class="mt-6 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
        Když nejde jen o orientační číslo
      </h2>

      <p class="mt-5 text-base leading-7 text-slate-600 sm:text-lg">
        Online odhad může být dobrý první krok. Pokud se ale podle ceny chcete opravdu rozhodovat,
        vyplatí se podívat na nemovitost detailněji a v souvislostech.
      </p>
    </div>

    <div class="mt-14 grid gap-6 lg:grid-cols-2">
      <article class="group relative overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-50 p-6 shadow-sm transition duration-500 hover:-translate-y-2 hover:bg-white hover:shadow-2xl sm:p-8 animate-fade-up animation-delay-100">
        <div class="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-slate-300/30 blur-3xl transition duration-500 group-hover:bg-slate-400/40"></div>

        <div class="relative mb-6 flex items-center justify-between gap-4">
          <div>
            <p class="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Rychlá orientace
            </p>
            <h3 class="mt-2 text-2xl font-bold text-slate-950">
              Online odhad
            </h3>
          </div>

          <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-200 text-slate-700 transition duration-500 group-hover:rotate-6 group-hover:scale-110">
            <svg class="h-7 w-7 animate-soft-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
        </div>

        <p class="relative leading-7 text-slate-600">
          Online nástroje většinou vycházejí z dostupných dat, jako je lokalita,
          velikost nebo typ nemovitosti. Díky tomu umí rychle ukázat přibližný směr.
        </p>

        <div class="relative mt-8 rounded-3xl bg-white p-5 shadow-sm transition duration-500 group-hover:shadow-md">
          <p class="font-semibold text-slate-950">
            Je ale dobré počítat s tím, že online odhad:
          </p>

          <ul class="mt-4 space-y-3">
            {#each onlineItems as item, index (item)}
              <li
                class="flex gap-3 text-slate-600 animate-fade-up"
                style={`animation-delay: ${200 + index * 80}ms;`}
              >
                <span class="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-slate-400 transition duration-300 group-hover:scale-125"></span>
                <span>{item}</span>
              </li>
            {/each}
          </ul>
        </div>

        <p class="relative mt-7 leading-7 text-slate-600">
          Proto je vhodný hlavně jako základní orientace, ne jako finální rozhodnutí
          o prodejní ceně.
        </p>
      </article>

      <article class="group relative overflow-hidden rounded-[2rem] bg-slate-950 p-6 text-white shadow-2xl shadow-slate-900/20 transition duration-500 hover:-translate-y-2 hover:shadow-slate-900/30 sm:p-8 animate-fade-up animation-delay-200">
        <div class="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10 blur-3xl transition duration-500 group-hover:bg-white/20"></div>
        <div class="absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-white/10 blur-3xl transition duration-500 group-hover:bg-white/20"></div>

        <div class="relative">
          <div class="mb-6 flex items-center justify-between gap-4">
            <div>
              <p class="text-sm font-semibold uppercase tracking-wide text-white/60">
                Osobní posouzení
              </p>
              <h3 class="mt-2 text-2xl font-bold text-white">
                Ruční odhad
              </h3>
            </div>

            <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-slate-950 transition duration-500 group-hover:-rotate-6 group-hover:scale-110">
              <svg class="h-7 w-7 animate-soft-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>

          <p class="leading-7 text-slate-300">
            U ručního odhadu se na nemovitost díváme komplexně. Zohledňujeme její stav,
            dispozici, lokalitu, potenciál i aktuální situaci na trhu.
          </p>

          <p class="mt-5 leading-7 text-slate-300">
            Důležité pro nás není jen určit cenu, ale vysvětlit, proč právě taková cena
            dává v danou chvíli smysl.
          </p>

          <div class="mt-8 rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur transition duration-500 group-hover:border-white/20 group-hover:bg-white/15">
            <p class="text-xl font-bold leading-8 text-white">
              Dostanete jasnější podklad pro rozhodnutí.
            </p>
            <p class="mt-3 leading-7 text-slate-300">
              Ať už prodej teprve zvažujete, nebo chcete znát reálnou hodnotu své nemovitosti.
            </p>
          </div>
        </div>
      </article>
    </div>

    <div class="mt-8 rounded-[2rem] border border-slate-200 bg-slate-950 p-6 text-center text-white shadow-xl transition duration-500 hover:-translate-y-1 hover:shadow-2xl sm:p-8 animate-fade-up animation-delay-300">
      <p class="text-sm font-semibold uppercase tracking-wide text-white/60">
        Shrnutí
      </p>

      <h3 class="mt-3 text-2xl font-bold">
        Online odhad pomůže s orientací. Ruční odhad vám dá větší jistotu.
      </h3>

      <p class="mx-auto mt-4 max-w-2xl leading-7 text-slate-300">
        Právě jistota v ceně často rozhoduje o tom, jak úspěšný bude celý prodej.
      </p>
    </div>
  </div>
</section>

<style>
  @keyframes fade-up {
    from {
      opacity: 0;
      transform: translateY(22px);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes soft-pulse {
    0%, 100% {
      transform: scale(1);
      opacity: 1;
    }

    50% {
      transform: scale(1.08);
      opacity: 0.85;
    }
  }

  .animate-fade-up {
    opacity: 0;
    animation: fade-up 0.7s ease forwards;
  }

  .animate-soft-pulse {
    animation: soft-pulse 2.2s ease-in-out infinite;
  }

  .animation-delay-100 {
    animation-delay: 100ms;
  }

  .animation-delay-200 {
    animation-delay: 200ms;
  }

  .animation-delay-300 {
    animation-delay: 300ms;
  }

  @media (prefers-reduced-motion: reduce) {
    .animate-fade-up,
    .animate-soft-pulse {
      animation: none;
      opacity: 1;
    }

    .group {
      transition: none;
    }
  }
</style>