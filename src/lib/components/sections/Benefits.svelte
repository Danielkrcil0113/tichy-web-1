<script lang="ts">
  const items = [
    {
      title: 'Odhalíme skrytý zisk',
      text: 'Pracujeme s přesnými daty z trhu, ze kterých náš tým dokáže vyčíst příležitosti k navýšení prodejní ceny. Známe reálné prodeje, nespokojíme se s průměrem.'
    },
    {
      title: 'Síla týmového know-how',
      text: 'Nespoléháme na jednotlivce. Sdílíme mezi sebou znalosti z vaší lokality, známe aktuální poptávku a plány rozvoje, které raketově zvyšují hodnotu vašeho bydlení.'
    },
    {
      title: 'Diskrétní a osobní přístup',
      text: 'Získáte naše společné expertní doporučení zcela nezávazně. Záleží jen na vás, jak s vítěznou strategií naložíte. Vaše data jsou u nás v bezpečí.'
    }
  ];
</script>

<section id="vyhody" class="bg-white">
  <div class="mx-auto max-w-7xl px-6 py-20">
    <div class="max-w-2xl">
      <h2 class="text-3xl font-bold tracking-tight text-slate-900">
        Proč svěřit ocenění právě našemu týmu?
      </h2>
      <p class="mt-4 text-slate-600">
        Nespoléháme na nepřesné algoritmy. Za každým odhadem stojí náš tým špičkových makléřů a analytiků, kteří společně pracují na tom, abyste prodali za co nejvíce.
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