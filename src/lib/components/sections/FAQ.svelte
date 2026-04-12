<script lang="ts">
  const faqs = [
    {
      q: 'Je odhad zdarma opravdu nezávazný?',
      a: 'Ano, formulář slouží k nezávazné poptávce a prvnímu zhodnocení situace.'
    },
    {
      q: 'Jak rychle dostanu odpověď?',
      a: 'Záleží na procesu klienta, ale web je připravený na rychlé zpracování leadu.'
    },
    {
      q: 'Je možné přidat administraci?',
      a: 'Ano, další krok bude napojení na Supabase a jednoduchý interní přehled leadů.'
    },
    {
      q: 'Můžeme formulář upravit podle typu nemovitosti?',
      a: 'Ano, můžeme přidat podmíněná pole pro byty, domy, pozemky i komerční objekty.'
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
        Důležitá sekce pro snížení nejistoty před odesláním formuláře.
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