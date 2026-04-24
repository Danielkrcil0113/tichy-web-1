<script lang="ts">
  const valueItems = [
    'když chcete znát reálnou tržní hodnotu nemovitosti',
    'při rozhodování o prodeji nebo dalším postupu',
    'pro nastavení správné prodejní ceny',
    'při mimosoudní dohodě, například mezi spoluvlastníky nebo dědici'
  ];

  const expertItems = [
    'soudní řízení',
    'oficiální jednání s úřady',
    'případy, kdy je vyžadováno ocenění s razítkem znalce'
  ];
</script>

<section id="jak-to-funguje" class="relative overflow-hidden bg-slate-50">
  <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(15,23,42,0.08),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(100,116,139,0.12),transparent_32%)]"></div>

  <div class="relative mx-auto max-w-7xl px-6 py-20 lg:py-24">
    <div class="mx-auto max-w-3xl text-center animate-section-reveal">
      <span class="inline-flex rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white shadow-sm">
        Upozornění k odhadu nemovitosti
      </span>

      <h2 class="mt-6 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
        Praktický odhad pro vaše rozhodnutí
      </h2>

      <p class="mt-5 text-base leading-7 text-slate-600 sm:text-lg">
        Odhad tržní ceny připravujeme na základě detailní znalosti trhu,
        zkušeností z reálných prodejů a individuálního posouzení vaší nemovitosti.
      </p>
    </div>

    <div class="mt-14 overflow-hidden rounded-[2rem] border border-slate-300 bg-white p-6 shadow-xl shadow-slate-900/10 transition duration-500 hover:-translate-y-1 hover:shadow-2xl animate-section-reveal animation-delay-100 sm:p-8">
      <div class="grid gap-6 lg:grid-cols-[auto_1fr] lg:items-start">
        <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-lg">
          <svg class="h-6 w-6 animate-soft-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25 12 6l.75 5.25L18 12l-5.25.75L12 18l-.75-5.25L6 12l5.25-.75Z" />
          </svg>
        </div>

        <div>
          <p class="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Důležité upozornění
          </p>

          <h3 class="mt-2 text-2xl font-bold text-slate-950">
            Odhad připravujeme pečlivě, finální rozhodnutí je vždy na vás
          </h3>

          <p class="mt-4 leading-7 text-slate-600">
            Odhad je připravován s maximální pečlivostí a důrazem na přesnost.
            Přesto slouží jako odborné doporučení a vodítko, nikoliv jako závazné
            stanovení ceny.
          </p>

          <p class="mt-3 leading-7 text-slate-600">
            Konečné rozhodnutí o dalším postupu je vždy na vás.
          </p>
        </div>
      </div>
    </div>

    <div class="mt-8 grid gap-6 lg:grid-cols-3">
      <article class="group relative overflow-hidden rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-900/10 ring-1 ring-slate-300 transition duration-500 hover:-translate-y-2 hover:shadow-2xl animate-section-reveal animation-delay-200 sm:p-8 lg:col-span-3">
        <div class="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-slate-200/70 blur-3xl transition duration-500 group-hover:bg-slate-300"></div>

        <div class="relative grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div>
            <p class="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Co odhad znamená
            </p>

            <h3 class="mt-3 text-2xl font-bold text-slate-950">
              Kvalifikovaný podklad, ne znalecký posudek
            </h3>
          </div>

          <div class="space-y-4 text-base leading-7 text-slate-600">
            <p>
              Slouží jako kvalifikovaný a praktický podklad pro vaše rozhodování –
              zejména při zvažování prodeje, nastavení ceny nebo celkové strategie.
            </p>

            <p>
              Současně je důležité zmínit, že se nejedná o znalecký posudek
              ani formální ocenění s razítkem soudního znalce.
            </p>
          </div>
        </div>
      </article>

      <article class="group relative overflow-hidden rounded-[2rem] bg-slate-950 p-6 text-white shadow-2xl shadow-slate-900/30 ring-1 ring-slate-700 transition duration-500 hover:-translate-y-2 animate-section-reveal animation-delay-300 sm:p-8 lg:col-span-2">
        <div class="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-white/10 blur-3xl transition duration-500 group-hover:bg-white/20"></div>

        <div class="relative">
          <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-slate-950 shadow-lg transition duration-500 group-hover:scale-110 group-hover:rotate-6">
            <svg class="h-6 w-6 animate-soft-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </div>

          <h3 class="mt-6 text-2xl font-bold">
            Kdy vám odhad dává největší hodnotu
          </h3>

          <ul class="mt-6 grid gap-3 sm:grid-cols-2">
            {#each valueItems as item, index (item)}
              <li
                class="flex gap-3 rounded-2xl border border-white/20 bg-white/15 p-4 text-sm leading-6 text-slate-100 shadow-lg shadow-slate-950/10 backdrop-blur animate-section-reveal"
                style={`animation-delay: ${400 + index * 80}ms;`}
              >
                <span class="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white text-xs font-bold text-slate-950">
                  ✓
                </span>
                <span>{item}</span>
              </li>
            {/each}
          </ul>
        </div>
      </article>

      <article class="group relative overflow-hidden rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-900/10 ring-1 ring-slate-300 transition duration-500 hover:-translate-y-2 hover:shadow-2xl animate-section-reveal animation-delay-400 sm:p-8">
        <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 shadow-sm transition duration-500 group-hover:scale-110 group-hover:-rotate-6">
          <svg class="h-6 w-6 animate-soft-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m0 3.75h.008v.008H12v-.008ZM10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
          </svg>
        </div>

        <h3 class="mt-6 text-2xl font-bold text-slate-950">
          Kdy je potřeba znalecký posudek
        </h3>

        <p class="mt-4 leading-7 text-slate-600">
          V některých situacích může být ze zákona nebo ze strany institucí
          vyžadováno formální ocenění znalcem.
        </p>

        <ul class="mt-6 space-y-3">
          {#each expertItems as item (item)}
            <li class="flex gap-3 text-slate-600">
              <span class="mt-2 h-2 w-2 shrink-0 rounded-full bg-slate-400"></span>
              <span>{item}</span>
            </li>
          {/each}
        </ul>
      </article>
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
    0%, 100% {
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

  .animation-delay-400 {
    animation-delay: 400ms;
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