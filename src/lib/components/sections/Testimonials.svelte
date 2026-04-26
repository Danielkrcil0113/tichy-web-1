<script lang="ts">
  interface Testimonial {
    name: string;
    role: string;
    text: string;
    rating: number;
  }

  const stars = [1, 2, 3, 4, 5];

  const testimonials: Testimonial[] = [
    {
      name: 'Martin Kovář',
      role: 'Prodej bytu 3+1',
      rating: 4.5,
      text: 'Potřebovali jsme znát hodnotu bytu kvůli dědictví. Odhad jsme dostali bleskově a celý tým nám navíc poskytl skvělou strategii pro náš další postup, abychom neprodělali.'
    },
    {
      name: 'rodina Novotná',
      role: 'Prodej rodinného domu',
      rating: 5,
      text: 'Díky profesionální analýze tohoto týmu jsme zjistili, že můžeme náš dům prodat o neuvěřitelných půl milionu dráž, než jsme si původně mysleli. Naprostá spokojenost.'
    },
    {
      name: 'Petr Dvořák',
      role: 'Orientační odhad pozemku',
      rating: 5,
      text: 'Ocenění proběhlo rychle, precizně a zcela zdarma. Skvělá komunikace celého týmu, žádný tlak, jen špičkové know-how. Rozhodně doporučuji všem!'
    }
  ];

  function getStarFill(rating: number, star: number) {
    if (rating >= star) return 'full';
    if (rating >= star - 0.5) return 'half';
    return 'empty';
  }
</script>

<section id="reference" class="relative overflow-hidden bg-slate-950 py-24 sm:py-28">
  <div class="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl">
    <div class="relative left-1/2 aspect-[1155/678] w-[34rem] max-w-none -translate-x-1/2 rotate-[18deg] bg-gradient-to-tr from-indigo-500/20 via-sky-400/10 to-white/5 opacity-70 sm:w-[72rem]"></div>
  </div>

  <div class="mx-auto max-w-7xl px-6 lg:px-8">
    <div class="max-w-3xl">
      <div class="inline-flex items-center rounded-full border border-indigo-400/20 bg-white/5 px-4 py-1.5 text-sm font-semibold text-indigo-300 backdrop-blur-md">
        Reference klientů
      </div>

      <h2 class="mt-6 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
        Výsledky našeho týmu
        <span class="bg-gradient-to-r from-indigo-400 via-indigo-300 to-sky-300 bg-clip-text text-transparent">
          mluví za vše
        </span>
      </h2>

      <p class="mt-5 max-w-2xl text-lg leading-8 text-slate-400">
        Přečtěte si zkušenosti klientů.
      </p>
    </div>

    <div class="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {#each testimonials as item (item.name)}
        <article class="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-7 shadow-xl backdrop-blur-md transition-all hover:-translate-y-2">
          <div class="relative z-10">
            <div class="mb-5 flex items-center gap-1 text-amber-400" aria-label={`${item.rating} z 5 hvězdiček`}>
              {#each stars as star (star)}
                {@const fill = getStarFill(item.rating, star)}

                {#if fill === 'full'}
                  <svg
                    class="h-5 w-5 -translate-y-px"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81H7.03a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                {:else if fill === 'half'}
                  <span class="relative inline-block h-5 w-5 -translate-y-px">
                    <svg
                      class="absolute inset-0 h-5 w-5 text-slate-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81H7.03a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>

                    <span class="absolute inset-0 w-1/2 overflow-hidden text-amber-400">
                      <svg
                        class="h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81H7.03a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </span>
                  </span>
                {:else}
                  <svg
                    class="h-5 w-5 -translate-y-px text-slate-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81H7.03a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                {/if}
              {/each}

              <span class="ml-2 text-sm font-bold text-slate-300">
                {item.rating.toFixed(1)}
              </span>
            </div>

            <p class="text-base leading-8 text-slate-300">
              „{item.text}“
            </p>

            <div class="mt-8 flex items-center gap-4">
              <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500 font-bold text-white">
                {item.name.charAt(0).toUpperCase()}
              </div>

              <div>
                <div class="font-semibold text-white">{item.name}</div>
                <div class="text-sm text-slate-400">{item.role}</div>
              </div>
            </div>
          </div>
        </article>
      {/each}
    </div>
  </div>
</section>