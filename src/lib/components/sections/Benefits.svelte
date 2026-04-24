<script lang="ts">
  const onlineItems = [
    'skutečný stav nemovitosti',
    'atmosféru místa',
    'detaily, které ovlivňují cenu',
    'aktuální zájem kupujících'
  ];
</script>

<section id="vyhody" class="relative overflow-hidden bg-white">
  <div class="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-slate-100 to-transparent"></div>

  <div class="relative mx-auto max-w-7xl px-6 py-20 lg:py-24">
    <div class="mx-auto max-w-3xl text-center">
      <span class="inline-flex rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">
        Ruční odhad vs. online odhad
      </span>

      <h2 class="mt-6 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
        Rychlé číslo nestačí, když se podle něj máte opravdu rozhodnout
      </h2>

      <p class="mt-5 text-base leading-7 text-slate-600 sm:text-lg">
        Možná už jste si online odhad zkoušeli. Je to rychlé a jednoduché.
        Rozdíl ale poznáte ve chvíli, kdy se podle něj máte opravdu rozhodnout.
      </p>
    </div>

    <div class="mt-14 grid gap-6 lg:grid-cols-2">
      <article class="rounded-[2rem] border border-slate-200 bg-slate-50 p-6 sm:p-8">
        <div class="mb-6 flex items-center justify-between gap-4">
          <div>
            <p class="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Automatický výpočet
            </p>
            <h3 class="mt-2 text-2xl font-bold text-slate-950">
              Online odhad
            </h3>
          </div>

          <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-200 text-slate-700">
            <svg class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
        </div>

        <p class="leading-7 text-slate-600">
          Online nástroje pracují hlavně s daty – lokalita, velikost, typ nemovitosti.
        </p>

        <div class="mt-8 rounded-3xl bg-white p-5 shadow-sm">
          <p class="font-semibold text-slate-950">
            Nevidí ale to podstatné:
          </p>

          <ul class="mt-4 space-y-3">
            {#each onlineItems as item (item)}
              <li class="flex gap-3 text-slate-600">
                <span class="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-slate-400"></span>
                <span>{item}</span>
              </li>
            {/each}
          </ul>
        </div>

        <p class="mt-7 leading-7 text-slate-600">
          Výsledkem je orientační číslo, které může být dobrý začátek,
          ale ne finální odpověď.
        </p>
      </article>

      <article class="relative overflow-hidden rounded-[2rem] bg-slate-950 p-6 text-white shadow-2xl shadow-slate-900/20 sm:p-8">
        <div class="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10 blur-3xl"></div>
        <div class="absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-white/10 blur-3xl"></div>

        <div class="relative">
          <div class="mb-6 flex items-center justify-between gap-4">
            <div>
              <p class="text-sm font-semibold uppercase tracking-wide text-white/60">
                Zkušenost a kontext
              </p>
              <h3 class="mt-2 text-2xl font-bold text-white">
                Ruční odhad
              </h3>
            </div>

            <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-slate-950">
              <svg class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>

          <p class="leading-7 text-slate-300">
            Ruční odhad je o zkušenosti a kontextu.
          </p>

          <p class="mt-5 leading-7 text-slate-300">
            Díváme se na vaši nemovitost jako celek – její stav, potenciál,
            lokalitu i aktuální situaci na trhu.
          </p>

          <div class="mt-8 rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur">
            <p class="text-xl font-bold leading-8 text-white">
              Neříkáme jen číslo.
            </p>
            <p class="mt-3 leading-7 text-slate-300">
              Říkáme vám, za kolik má smysl prodávat a proč.
            </p>
          </div>
        </div>
      </article>
    </div>

    <div class="mt-8 rounded-[2rem] border border-slate-200 bg-slate-950 p-6 text-center text-white shadow-xl sm:p-8">
      <p class="text-sm font-semibold uppercase tracking-wide text-white/60">
        Shrnutí
      </p>

      <h3 class="mt-3 text-2xl font-bold">
        Online odhad vám dá rychlou orientaci. Ruční odhad vám dá jistotu.
      </h3>

      <p class="mx-auto mt-4 max-w-2xl leading-7 text-slate-300">
        A právě ta dělá při prodeji největší rozdíl.
      </p>
    </div>
  </div>
</section>