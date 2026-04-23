<script lang="ts">
  const faqs = [
    {
      q: 'Je odhad opravdu zdarma a nezávazný?',
      a: 'Ano. Odhad ceny nemovitosti od nás získáte zdarma a bez jakýchkoliv závazků. Slouží jako orientační přehled o aktuální tržní hodnotě – je jen na vás, jestli se rozhodnete pokračovat dál.'
    },
    {
      q: 'Jak rychle dostanu výsledek?',
      a: 'Ve většině případů se vám ozveme do 24 hodin. Pokud bude potřeba doplnit pár detailů, můžeme vás krátce kontaktovat a odhad upřesnit.'
    },
    {
      q: 'Co když nemám všechny informace nebo fotky?',
      a: 'Nevadí. Vyplňte jen to, co víte. Čím více informací zadáte (např. fotografie nebo stav nemovitosti), tím přesnější odhad vám dokážeme připravit.'
    },
    {
      q: 'Jak přesný je tento odhad?',
      a: 'Jedná se o orientační tržní odhad na základě dostupných dat a zkušeností. Pro běžné rozhodování (prodej, pronájem) je velmi užitečný. Pro oficiální účely (např. banka, soud) je potřeba znalecký posudek.'
    }
  ];
</script>

<section id="faq" class="bg-white">
  <div class="mx-auto max-w-5xl px-6 py-20">
    <div class="max-w-2xl">
      <h2 class="text-3xl font-bold tracking-tight text-slate-900">
        Časté dotazy
      </h2>
      <p class="mt-4 text-slate-600">
        Možná vás napadá totéž, co ostatní. Tady jsou odpovědi na nejčastější otázky před odesláním formuláře.
      </p>
    </div>

    <div class="mt-10 space-y-4">
      {#each faqs as item}
        <div class="rounded-3xl border border-slate-200 bg-slate-50 p-6 transition hover:bg-white hover:shadow-sm">
          <h3 class="text-lg font-semibold text-slate-900">{item.q}</h3>
          <p class="mt-3 leading-7 text-slate-600">{item.a}</p>
        </div>
      {/each}
    </div>
  </div>
</section>