<script lang="ts">
  let showAll = $state(false);

  const faqs = [
    {
      q: 'Kolik mě odhad stojí?',
      a: 'Odhad tržní ceny od nás máte zdarma.',
      featured: true
    },
    {
      q: 'Zavazuje mě to k něčemu?',
      a: 'Ne. Odhad je nezávazný a je jen na vás, jak s ním naložíte.',
      featured: true
    },
    {
      q: 'Proč si neudělat online odhad?',
      a: 'Online odhad je rychlý, ale pracuje s průměry. My se na vaši nemovitost díváme konkrétně – v kontextu trhu, lokality a aktuální poptávky. Díky tomu vám dokážeme říct nejen číslo, ale i to, jak ho skutečně dosáhnout.'
    },
    {
      q: 'V čem je váš odhad jiný?',
      a: 'Nejde jen o číslo. Díváme se na stav nemovitosti, její potenciál, aktuální trh i chování kupujících – a také na situaci, pro kterou odhad potřebujete. Výsledkem je odhad, podle kterého se dá opravdu prodávat – ne jen orientovat.'
    },
    {
      q: 'Proč zrovna vy?',
      a: 'Jsme tým 7 specialistů s více než 100 lety zkušeností v realitách a financích. Podíleli jsme se na prodeji více než 900 nemovitostí. Každý obchod nás naučil něco nového – a právě tyhle zkušenosti dnes přenášíme k vám.'
    },
    {
      q: 'Kde odhady zajišťujete?',
      a: 'Odhad vám připravíme po celé České republice. Nejvíce zkušeností máme z Prahy a Středočeského kraje. Dlouhodobě se v těchto lokalitách pohybujeme, známe jejich specifika a máme přehled o reálných prodejích. Díky tomu dokážeme být v těchto oblastech opravdu přesní.'
    },
    {
      q: 'Proč děláte odhad zdarma?',
      a: 'Je to součást naší práce. Věříme, že když uvidíte, jak přemýšlíme a jak k odhadu přistupujeme, bude vám to dávat smysl i do budoucna. Kvalitním odhadem naše společná cesta často teprve začíná.'
    },
    {
      q: 'Na co se dá odhad využít?',
      a: 'Odhad není jen pro prodej. Můžete ho využít například při rozhodování o prodeji, rozdělení majetku, dědictví nebo orientaci na trhu. Jednoduše kdykoliv potřebujete mít jasno v hodnotě nemovitosti.'
    },
    {
      q: 'Má smysl prodávat nemovitost bez realitky, když znám cenu?',
      a: 'Ano, možné to je. Zároveň ale víme, že největší chyby vznikají při špatném nastavení ceny nebo při vyjednávání. To vás může ve výsledku stát víc než samotná provize. Naší rolí je vás tímto procesem provést a pomoci vám dosáhnout co nejlepšího výsledku.'
    },
    {
      q: 'Co se stane po odeslání poptávky?',
      a: 'Ozveme se vám a domluvíme si další postup. Většinou následuje osobní setkání, kde si nemovitost projdeme, uděláme základní fotodokumentaci, přeměříme dispozice a probereme všechna specifika. Díky tomu můžeme připravit odhad opravdu na míru.'
    },
    {
      q: 'Proč je součástí odhadu osobní prohlídka?',
      a: 'Protože detaily rozhodují. Fotky a popisy jsou dobrý začátek, ale osobní návštěva nám umožní vidět věci, které z dat ani fotografií nepoznáte.'
    }
  ];

  let visibleFaqs = $derived(showAll ? faqs : faqs.slice(0, 4));
</script>

<section id="faq" class="relative overflow-hidden bg-slate-950">
  <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.13),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(148,163,184,0.2),transparent_34%)]"></div>

  <div class="relative mx-auto max-w-6xl px-6 py-20 lg:py-24">
    <div class="mx-auto max-w-3xl text-center">
      <span class="inline-flex rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-medium text-white/80">
        FAQ – odhad nemovitosti
      </span>

      <h2 class="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl">
        Časté dotazy před odhadem nemovitosti
      </h2>
    </div>

    <div class="mt-14 grid gap-4 sm:grid-cols-2 lg:gap-5">
      {#each visibleFaqs as item, index (item.q)}
        <article
          class={`group relative overflow-hidden rounded-3xl border p-6 shadow-2xl backdrop-blur transition duration-500 animate-faq-card ${
            item.featured
              ? 'border-white bg-white text-slate-950'
              : 'border-white/10 bg-white/[0.06] text-white'
          }`}
          style={`animation-delay: ${index * 70}ms`}
        >
          {#if item.featured}
            <div class="mb-3 text-xs font-semibold">Nejčastější dotaz</div>
          {/if}

          <h3 class="text-lg font-semibold">{item.q}</h3>
          <p class="mt-3 text-sm opacity-80">{item.a}</p>
        </article>
      {/each}
    </div>

    {#if faqs.length > 4}
      <div class="mt-10 flex justify-center">
        <button
          on:click={() => (showAll = !showAll)}
          class="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:scale-105"
        >
          {showAll ? 'Zobrazit méně' : `Zobrazit dalších ${faqs.length - 4}`}
        </button>
      </div>
    {/if}
  </div>
</section>

<style>
  @keyframes faq-card {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-faq-card {
    opacity: 0;
    animation: faq-card 0.5s ease forwards;
  }
</style>