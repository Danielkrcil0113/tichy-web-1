<script lang="ts">
  const items = [
    {
      title: 'Reálná data z katastru',
      text: 'Nevaříme z vody. Pracujeme s cenovými mapami a skutečnými prodejními cenami ve vašem okolí, nejen s těmi nabídkovými.'
    },
    {
      title: 'Znalost lokálního trhu',
      text: 'Známe specifika jednotlivých lokalit, výhody vašeho okolí i plány rozvoje, které budoucí cenu nemovitosti ovlivňují.'
    },
    {
      title: 'Diskrétnost a bezpečnost',
      text: 'Odhad vás k ničemu nezavazuje. Záleží jen na vás, jak s informací o ceně naložíte. Vaše data jsou u nás vždy v bezpečí.'
    }
  ];
</script>

<section id="vyhody" class="bg-white">
  <div class="mx-auto max-w-7xl px-6 py-20">
    <div class="max-w-2xl">
      <h2 class="text-3xl font-bold tracking-tight text-slate-900">
        Proč si nechat zpracovat odhad od nás?
      </h2>
      <p class="mt-4 text-slate-600">
        Nespoléháme na robotické automaty. Každou nemovitost posuzuje náš zkušený specialista individuálně.
      </p>
    </div>

    <div class="mt-10 grid gap-6 md:grid-cols-3">
      {#each items as item}
        <div class="group rounded-3xl border border-slate-200 bg-slate-50 p-6 transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-xl">
          <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600">
             <!-- Zde můžeš doplnit SVG ikony, pro teď jednoduchý designový čtverec -->
             <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path></svg>
          </div>
          <h3 class="text-xl font-semibold text-slate-900">{item.title}</h3>
          <p class="mt-3 leading-7 text-slate-600">{item.text}</p>
        </div>
      {/each}
    </div>
  </div>
</section>