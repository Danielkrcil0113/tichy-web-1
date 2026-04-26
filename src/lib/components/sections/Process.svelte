<script lang="ts">
  const onlineItems = [
    'skutečný stav nemovitosti',
    'atmosféru místa',
    'detaily, které ovlivňují cenu',
    'aktuální zájem kupujících'
  ];

  const manualItems = [
    'stav nemovitosti',
    'potenciál prodeje',
    'lokalitu a okolí',
    'aktuální situaci na trhu'
  ];
</script>
<section id="online-rucni-odhad" class="relative overflow-hidden bg-slate-50">
  <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(15,23,42,0.08),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(79,70,229,0.12),transparent_32%)]"></div>

  <div class="relative mx-auto max-w-7xl px-6 py-20 lg:py-24">
    <div class="mx-auto max-w-3xl text-center animate-section-reveal">
      <span class="inline-flex rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white shadow-sm">
        Ruční odhad vs. online odhad
      </span>

      <h2 class="mt-6 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
        Rychlé číslo, nebo jistota při rozhodování?
      </h2>

      <p class="mt-5 text-base leading-7 text-slate-600 sm:text-lg">
        Možná už jste si online odhad zkoušeli. Je to rychlé a jednoduché.
        Rozdíl ale poznáte ve chvíli, kdy se podle něj máte opravdu rozhodnout.
      </p>
    </div>

    <div class="mt-14 grid gap-6 lg:grid-cols-2">
      <article class="group relative overflow-hidden rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-200 transition duration-500 hover:-translate-y-2 hover:shadow-2xl animate-section-reveal animation-delay-100 sm:p-8">
        <div class="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-slate-200/70 blur-3xl transition duration-500 group-hover:bg-slate-300"></div>

        <div class="relative">
          <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 transition duration-500 group-hover:scale-110 group-hover:-rotate-6">
            <svg class="h-6 w-6 animate-soft-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3.75h16.5v16.5H3.75z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9M7.5 12h9M7.5 15.75h5.25" />
            </svg>
          </div>

          <p class="mt-6 text-sm font-semibold uppercase tracking-wide text-slate-500">
            Online odhad
          </p>

          <h3 class="mt-3 text-2xl font-bold text-slate-950">
            Rychlá orientace podle dat
          </h3>

          <p class="mt-4 leading-7 text-slate-600">
            Online nástroje pracují hlavně s daty – lokalita, velikost,
            typ nemovitosti a obecné porovnání podobných nabídek.
          </p>

          <div class="mt-6 rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-100">
            <p class="text-sm font-bold text-slate-950">
              Nevidí ale to podstatné:
            </p>

            <ul class="mt-4 space-y-3">
              {#each onlineItems as item (item)}
                <li class="flex gap-3 text-sm leading-6 text-slate-600">
                  <span class="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-200 text-xs font-bold text-slate-600">
                    ×
                  </span>
                  <span>{item}</span>
                </li>
              {/each}
            </ul>
          </div>

          <p class="mt-6 leading-7 text-slate-600">
            Výsledkem je orientační číslo, které může být dobrý začátek,
            ale ne finální odpověď.
          </p>
        </div>
      </article>

      <article class="group relative overflow-hidden rounded-[2rem] bg-slate-950 p-6 text-white shadow-2xl shadow-slate-900/20 transition duration-500 hover:-translate-y-2 animate-section-reveal animation-delay-200 sm:p-8">
        <div class="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-indigo-500/20 blur-3xl transition duration-500 group-hover:bg-indigo-500/30"></div>

        <div class="relative">
          <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-slate-950 transition duration-500 group-hover:scale-110 group-hover:rotate-6">
            <svg class="h-6 w-6 animate-soft-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </div>

          <p class="mt-6 text-sm font-semibold uppercase tracking-wide text-indigo-200">
            Ruční odhad
          </p>

          <h3 class="mt-3 text-2xl font-bold">
            Zkušenost, kontext a reálný trh
          </h3>

          <p class="mt-4 leading-7 text-slate-300">
            Ruční odhad je o zkušenosti a kontextu. Díváme se na vaši
            nemovitost jako celek – ne jen jako na řádek v tabulce.
          </p>

          <div class="mt-6 rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur">
            <p class="text-sm font-bold text-white">
              Posuzujeme hlavně:
            </p>

            <ul class="mt-4 grid gap-3 sm:grid-cols-2">
              {#each manualItems as item (item)}
                <li class="flex gap-3 rounded-xl bg-white/10 p-3 text-sm leading-6 text-slate-200">
                  <span class="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white text-xs font-bold text-slate-950">
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              {/each}
            </ul>
          </div>

          <div class="mt-6 rounded-2xl bg-white p-5 text-slate-950">
            <p class="text-lg font-bold">
              Neříkáme jen číslo.
            </p>

            <p class="mt-2 leading-7 text-slate-700">
              Říkáme vám, za kolik má smysl prodávat a proč.
            </p>
          </div>
        </div>
      </article>
    </div>

    <div class="mt-8 overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm transition duration-500 hover:-translate-y-1 hover:shadow-xl animate-section-reveal animation-delay-300 sm:p-8">
      <div class="grid gap-6 lg:grid-cols-[auto_1fr] lg:items-start">
        <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-white">
          <svg class="h-6 w-6 animate-soft-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25 12 6l.75 5.25L18 12l-5.25.75L12 18l-.75-5.25L6 12l5.25-.75Z" />
          </svg>
        </div>

        <div>
          <p class="text-sm font-semibold uppercase tracking-wide text-indigo-600">
            Shrnutí
          </p>

          <h3 class="mt-2 text-2xl font-bold text-slate-950">
            Online odhad vám dá rychlou orientaci. Ruční odhad vám dá jistotu.
          </h3>

          <p class="mt-4 leading-7 text-slate-600">
            A právě ta dělá při prodeji největší rozdíl. Když se rozhodujete
            o nemovitosti, nejde jen o odhadovanou částku – jde o správnou
            strategii, reálný pohled na trh a jistotu, že neprodáváte zbytečně
            pod cenou.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  @keyframes section-reveal {
    from {
      opacity: 0;
      transform: translateY(26px) scale(0.98);
    }

    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @keyframes soft-pulse {
    0%,
    100% {
      transform: scale(1);
      opacity: 1;
    }

    50% {
      transform: scale(1.08);
      opacity: 0.82;
    }
  }

  .animate-section-reveal {
    opacity: 0;
    animation: section-reveal 0.7s ease forwards;
  }

  .animate-soft-pulse {
    animation: soft-pulse 2.4s ease-in-out infinite;
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
    .animate-section-reveal,
    .animate-soft-pulse {
      animation: none;
      opacity: 1;
    }

    .group {
      transition: none;
    }
  }
</style>