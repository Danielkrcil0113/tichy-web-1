<script lang="ts">
  const testimonials = [
    {
      name: 'Martin Kovář',
      role: 'Prodej bytu 3+1',
      text: 'Potřebovali jsme znát hodnotu bytu kvůli dědictví. Odhad jsme dostali bleskově a navíc nám velmi dobře poradili s dalším postupem.'
    },
    {
      name: 'rodina Novotná',
      role: 'Prodej rodinného domu',
      text: 'Díky profesionálnímu odhadu jsme zjistili, že můžeme náš dům prodat o půl milionu dráž, než jsme si původně mysleli. Naprostá spokojenost.'
    },
    {
      name: 'Petr Dvořák',
      role: 'Orientační odhad pozemku',
      text: 'Ocenění proběhlo rychle a zcela zdarma. Žádný tlak na podpis smlouvy, jen profesionální a velmi vstřícné jednání. Určitě doporučuji!'
    }
  ];
</script>

<section id="reference" class="bg-slate-50">
  <div class="mx-auto max-w-7xl px-6 py-20">
    <div class="max-w-2xl">
      <h2 class="text-3xl font-bold tracking-tight text-slate-900">
        Zkušenosti našich klientů
      </h2>
      <p class="mt-4 text-slate-600">
        Přečtěte si, jak náš odhad pomohl majitelům nemovitostí zorientovat se na trhu a prodat výhodněji.
      </p>
    </div>

    <div class="mt-10 grid gap-6 md:grid-cols-3">
      {#each testimonials as item}
        <article class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
          <div class="mb-4 text-sm text-amber-500">★★★★★</div>
          <p class="leading-7 text-slate-600">„{item.text}“</p>
          <div class="mt-6">
            <div class="font-semibold text-slate-900">{item.name}</div>
            <div class="text-sm text-slate-500">{item.role}</div>
          </div>
        </article>
      {/each}
    </div>
  </div>
</section>