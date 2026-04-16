<script lang="ts">
  const testimonials = [
    {
      name: 'Martin Kovář',
      role: 'Prodej bytu 3+1',
      text: 'Potřebovali jsme znát hodnotu bytu kvůli dědictví. Odhad jsme dostali bleskově a celý tým nám navíc poskytl skvělou strategii pro náš další postup, abychom neprodělali.'
    },
    {
      name: 'rodina Novotná',
      role: 'Prodej rodinného domu',
      text: 'Díky profesionální analýze tohoto týmu jsme zjistili, že můžeme náš dům prodat o neuvěřitelných půl milionu dráž, než jsme si původně mysleli. Naprostá spokojenost.'
    },
    {
      name: 'Petr Dvořák',
      role: 'Orientační odhad pozemku',
      text: 'Ocenění proběhlo rychle, precizně a zcela zdarma. Skvělá komunikace celého týmu, žádný tlak, jen špičkové know-how. Rozhodně doporučuji všem!'
    }
  ];
</script>

<section id="reference" class="relative overflow-hidden bg-slate-950 py-24 sm:py-28">
  <!-- Background effects -->
  <div class="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl">
    <div class="relative left-1/2 aspect-[1155/678] w-[34rem] max-w-none -translate-x-1/2 rotate-[18deg] bg-gradient-to-tr from-indigo-500/20 via-sky-400/10 to-white/5 opacity-70 sm:w-[72rem]"></div>
  </div>
  <div class="absolute -left-16 top-24 -z-10 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl"></div>
  <div class="absolute bottom-0 right-0 -z-10 h-96 w-96 rounded-full bg-sky-500/10 blur-3xl"></div>

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
        Přečtěte si, jak náš tým expertů pomohl majitelům nemovitostí odhalit skutečnou hodnotu,
        maximalizovat zisk a prodat bez starostí.
      </p>
    </div>

    <div class="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {#each testimonials as item}
        <article class="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-7 shadow-xl shadow-black/20 backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:border-indigo-400/25 hover:bg-white/[0.07] hover:shadow-2xl hover:shadow-indigo-500/10">
          <!-- Glow / gradient overlay -->
          <div class="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-indigo-500/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
          <div class="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-indigo-400/10 blur-3xl opacity-0 transition duration-500 group-hover:opacity-100"></div>
          <div class="absolute -bottom-10 -left-10 h-28 w-28 rounded-full bg-sky-400/10 blur-3xl opacity-0 transition duration-500 group-hover:opacity-100"></div>

          <div class="relative z-10">
            <div class="mb-5 flex items-center gap-1 text-amber-400 transition duration-300 group-hover:scale-105 group-hover:text-amber-300">
              {#each Array(5) as _, i}
                <svg
                  class="h-5 w-5 transition-transform duration-300"
                  class:translate-y-[-1px]={true}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81H7.03a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              {/each}
            </div>

            <p class="text-base leading-8 text-slate-300 transition-colors duration-300 group-hover:text-slate-200">
              „{item.text}“
            </p>

            <div class="mt-8 flex items-center gap-4">
              <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-sky-400 text-sm font-bold text-white shadow-lg shadow-indigo-900/20 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                {item.name.charAt(0).toUpperCase()}
              </div>

              <div>
                <div class="font-semibold text-white transition-colors duration-300 group-hover:text-indigo-200">
                  {item.name}
                </div>
                <div class="text-sm text-slate-400 transition-colors duration-300 group-hover:text-slate-300">
                  {item.role}
                </div>
              </div>
            </div>

            <div class="mt-6 h-[3px] w-14 rounded-full bg-gradient-to-r from-indigo-500 to-sky-400 transition-all duration-500 group-hover:w-24"></div>
          </div>
        </article>
      {/each}
    </div>
  </div>
</section>