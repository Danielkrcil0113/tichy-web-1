<script lang="ts">
  const rotatingWords = ['tržní cenu', 'reálnou hodnotu', 'prodejní potenciál', 'správnou strategii'];

  const analysisSteps = [
    { title: 'Lokalita a okolí', description: 'Posuzujeme atraktivitu místa a okolí.' },
    { title: 'Stav nemovitosti', description: 'Bereme v úvahu dispozici, stav i potenciál.' },
    { title: 'Prodej dle katastru', description: 'Porovnáváme s reálnými prodeji na trhu.' },
    { title: 'Doporučená strategie', description: 'Doporučíme cenu a další možný postup.' }
  ];

  let activeWordIndex = $state(0);
  let activeStepIndex = $state(0);
  let progress = $state(0);

  $effect(() => {
    const wordInterval = window.setInterval(() => {
      activeWordIndex = (activeWordIndex + 1) % rotatingWords.length;
    }, 3600);

    const stepInterval = window.setInterval(() => {
      activeStepIndex = (activeStepIndex + 1) % analysisSteps.length;
    }, 3200);

    const progressInterval = window.setInterval(() => {
      progress = progress >= 100 ? 0 : progress + 1;
    }, 140);

    return () => {
      window.clearInterval(wordInterval);
      window.clearInterval(stepInterval);
      window.clearInterval(progressInterval);
    };
  });

  function scrollToSection(id: string) {
    document.querySelector(id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
</script>

<section class="hero-section relative overflow-hidden bg-slate-950 text-white">
  <div class="absolute inset-0">
    <div class="absolute left-1/2 top-[-20rem] h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-indigo-500/15 blur-3xl"></div>
    <div class="absolute bottom-[-20rem] right-[-12rem] h-[34rem] w-[34rem] rounded-full bg-sky-400/10 blur-3xl"></div>
  </div>

  <div class="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:90px_90px] opacity-20"></div>

  <div class="relative mx-auto max-w-7xl px-4 pb-16 pt-16 sm:px-6 sm:pb-20 sm:pt-20 md:pb-24 md:pt-28 lg:px-8">
    <div class="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
      <div class="animate-hero-in text-center sm:text-left">
        <div class="inline-flex max-w-full items-center gap-3 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-medium text-slate-100 shadow-lg shadow-black/10 backdrop-blur">
          <span class="relative flex h-2.5 w-2.5 shrink-0">
            <span class="absolute inline-flex h-full w-full animate-slow-ping rounded-full bg-emerald-400 opacity-70"></span>
            <span class="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400"></span>
          </span>
          <span class="truncate">Odhad zdarma a bez závazků</span>
        </div>

        <h1 class="mx-auto mt-7 max-w-4xl text-balance text-4xl font-black tracking-tight text-white sm:mx-0 sm:text-5xl lg:text-6xl">
          <span class="block">Zjistěte</span>

          <span class="word-line block min-h-[1.25em] py-1 sm:inline-block sm:min-w-[10.5ch] sm:align-bottom">
            <span class="word-wrapper">
              {#key activeWordIndex}
                <span class="word-animated">
                  {rotatingWords[activeWordIndex]}
                </span>
              {/key}
            </span>
          </span>

          <span class="block sm:inline">své nemovitosti.</span>
        </h1>

        <p class="mx-auto mt-6 max-w-2xl text-pretty text-base leading-7 text-slate-200 sm:mx-0 sm:text-lg sm:leading-8">
          Připravíme pro vás srozumitelný odhad tržní ceny podle stavu nemovitosti,
          lokality, aktuální poptávky a reálných prodejů v okolí.
        </p>

        <div class="mt-9 flex flex-col gap-4 sm:flex-row">
          <button
            type="button"
            onclick={() => scrollToSection('#lead-form')}
            class="group inline-flex w-full items-center justify-center rounded-2xl bg-white px-7 py-4 text-base font-bold text-slate-950 shadow-2xl shadow-white/10 transition duration-300 hover:-translate-y-1 hover:bg-slate-100 active:scale-[0.98] sm:w-auto"
          >
            Chci odhad zdarma
            <span class="ml-2 inline-block transition duration-300 group-hover:translate-x-1">→</span>
          </button>

          <button
            type="button"
            onclick={() => scrollToSection('#jak-to-funguje')}
            class="inline-flex w-full items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-7 py-4 text-base font-bold text-white shadow-lg shadow-black/10 backdrop-blur transition duration-300 hover:-translate-y-1 hover:bg-white/10 active:scale-[0.98] sm:w-auto"
          >
            Informace k odhadu
          </button>
        </div>

        <div class="mt-10 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3">
          <div class="rounded-3xl border border-white/10 bg-white/10 p-5 text-center shadow-lg shadow-black/10 backdrop-blur sm:text-left">
            <div class="text-3xl font-black text-white">2 min</div>
            <div class="mt-1 text-sm text-slate-200">rychlé zadání</div>
          </div>

          <div class="rounded-3xl border border-white/10 bg-white/10 p-5 text-center shadow-lg shadow-black/10 backdrop-blur sm:text-left">
            <div class="text-3xl font-black text-white">900+</div>
            <div class="mt-1 text-sm text-slate-200">zkušeností z prodejů</div>
          </div>

          <div class="rounded-3xl border border-white/10 bg-white/10 p-5 text-center shadow-lg shadow-black/10 backdrop-blur sm:text-left">
            <div class="text-3xl font-black text-white">0 Kč</div>
            <div class="mt-1 text-sm text-slate-200">bez závazků</div>
          </div>
        </div>
      </div>

      <div class="relative animate-hero-card">
        <div class="absolute -inset-6 rounded-[3rem] bg-gradient-to-tr from-indigo-500/15 via-sky-400/10 to-white/10 blur-2xl"></div>

        <div class="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/95 p-5 shadow-2xl shadow-black/30 backdrop-blur-xl sm:rounded-[2.5rem] sm:p-8">
          <div class="mb-8 flex items-start justify-between gap-6">
            <div>
              <p class="text-sm font-semibold uppercase tracking-wide text-slate-300">
                Průběh odhadu
              </p>
              <h2 class="mt-2 text-2xl font-black text-white">
                Co při ocenění sledujeme
              </h2>
            </div>

            <div class="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-sm font-bold text-emerald-300">
              aktivní
            </div>
          </div>

          <div class="rounded-3xl border border-white/10 bg-slate-950 p-5">
            <div class="mb-4 flex items-center justify-between gap-4">
              <span class="text-sm font-semibold text-slate-200">
                Aktuálně: {analysisSteps[activeStepIndex].title}
              </span>
              <span class="text-sm font-bold text-indigo-200">{progress}%</span>
            </div>

            <div class="h-2.5 overflow-hidden rounded-full bg-white/10">
              <div
                class="h-full rounded-full bg-indigo-400 transition-all duration-500 ease-out"
                style={`width: ${progress}%`}
              ></div>
            </div>
          </div>

          <div class="mt-6 space-y-3">
            {#each analysisSteps as item, index (item.title)}
              <div
                class={`flex items-center gap-4 rounded-2xl border p-4 transition duration-700 ${
                  index === activeStepIndex
                    ? 'border-indigo-300/40 bg-indigo-500/15'
                    : 'border-white/10 bg-white/5'
                }`}
              >
                <div
                  class={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-black transition duration-700 ${
                    index <= activeStepIndex
                      ? 'bg-white text-slate-950'
                      : 'bg-white/10 text-slate-200'
                  }`}
                >
                  {index + 1}
                </div>

                <div>
                  <div class="font-semibold text-white">{item.title}</div>
                  <p class="mt-1 text-sm leading-6 text-slate-300">
                    {item.description}
                  </p>
                </div>
              </div>
            {/each}
          </div>

          <button
            type="button"
            onclick={() => scrollToSection('#lead-form')}
            class="mt-7 block w-full rounded-2xl bg-indigo-600 px-5 py-4 text-center font-bold text-white shadow-xl shadow-indigo-600/25 transition duration-300 hover:-translate-y-1 hover:bg-indigo-500 active:scale-[0.98]"
          >
            Začít odhad zdarma
          </button>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .hero-section {
    color-scheme: dark;
    forced-color-adjust: none;
  }

  .hero-section,
  .hero-section * {
    -webkit-text-fill-color: currentColor;
  }

  .word-line {
    line-height: 1.08;
  }

  .word-wrapper {
    position: relative;
    display: inline-block;
    max-width: 100%;
    overflow: hidden;
    vertical-align: bottom;
  }

  .word-animated {
    display: inline-block;
    animation: word-reveal 3.6s ease-in-out;
    background: linear-gradient(90deg, #c7d2fe, #7dd3fc, #ffffff);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    -webkit-text-fill-color: transparent;
    filter: drop-shadow(0 0 8px rgba(99, 102, 241, 0.35));
  }

  @keyframes hero-in {
    from {
      opacity: 0;
      transform: translateY(24px);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes hero-card {
    from {
      opacity: 0;
      transform: translateY(28px) scale(0.98);
    }

    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @keyframes word-reveal {
    0% {
      opacity: 0;
      transform: translateY(100%);
      filter: blur(6px);
    }

    15% {
      opacity: 1;
      transform: translateY(0);
      filter: blur(0);
    }

    78% {
      opacity: 1;
      transform: translateY(0);
      filter: blur(0);
    }

    100% {
      opacity: 0;
      transform: translateY(-100%);
      filter: blur(6px);
    }
  }

  @keyframes slow-ping {
    0% {
      transform: scale(1);
      opacity: 0.7;
    }

    75%,
    100% {
      transform: scale(2.2);
      opacity: 0;
    }
  }

  .animate-hero-in {
    animation: hero-in 0.8s ease forwards;
  }

  .animate-hero-card {
    opacity: 0;
    animation: hero-card 0.9s ease 0.15s forwards;
  }

  .animate-slow-ping {
    animation: slow-ping 2.8s cubic-bezier(0, 0, 0.2, 1) infinite;
  }

  @media (max-width: 639px) {
    .word-line {
      width: 100%;
    }

    .word-wrapper {
      width: 100%;
      text-align: center;
    }

    .word-animated {
      max-width: 100%;
      white-space: normal;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .animate-hero-in,
    .animate-hero-card,
    .animate-slow-ping,
    .word-animated {
      animation: none;
      opacity: 1;
      transform: none;
      filter: none;
    }

    .word-animated {
      background: none;
      color: #c7d2fe;
      -webkit-text-fill-color: currentColor;
    }
  }
</style>