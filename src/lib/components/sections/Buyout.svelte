<script lang="ts">
  const benefits = [
    {
      title: 'Rychlé a konkrétní řešení',
      description:
        'Do 24 hodin vám navrhnu konkrétní postup. Bez zbytečných schůzek, bez mlžení — rovnou víte, na čem jste.',
      icon: 'M12 6v6l4 2.5M21 12a9 9 0 11-18 0 9 9 0 0118 0Z'
    },
    {
      title: 'Maximální diskrétnost',
      description:
        'Nemovitost není veřejně inzerována. Celý proces probíhá citlivě a bez nežádoucí pozornosti okolí.',
      icon: 'M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 0h10.5A2.25 2.25 0 0120 12.75v6A2.25 2.25 0 0117.75 21h-11.5A2.25 2.25 0 014 18.75v-6A2.25 2.25 0 016.25 10.5Z'
    },
    {
      title: 'Bezpečný průběh transakce',
      description:
        'Advokátní úschova, prověřené smlouvy a kompletní právní servis. Celý proces proběhne bezpečně a bez rizik.',
      icon: 'M9 12.75L11.25 15 15 9.75'
    }
  ];

  const situations = [
    {
      title: 'Potřebujete rychle získat finance',
      description:
        'Například kvůli nové nemovitosti, vyrovnání závazků nebo nečekané životní situaci.',
      icon: ''
    },
    {
      title: 'Nechcete řešit klasický prodej',
      description:
        'Bez focení, bez prohlídek, bez desítek zájemců. Jednoduché a přímé řešení.',
      icon: ''
    },
    {
      title: 'Řešíte složitější situaci',
      description:
        'Dědictví, rozvod, exekuce nebo právní komplikace. Pomohu vám najít funkční cestu ven.',
      icon: ''
    }
  ];

  const steps = [
    {
      number: '01',
      title: 'Rychlá konzultace',
      description:
        'Krátce si vyslechnu vaši situaci a zjistím základní informace o nemovitosti.'
    },
    {
      number: '02',
      title: 'Návrh řešení',
      description:
        'Navrhnu konkrétní postup — výkup, rychlý prodej nebo kombinaci obou variant.'
    },
    {
      number: '03',
      title: 'Realizace a převod',
      description:
        'Zajistím celý proces od smluv až po převod. Vy máte jistotu a klid.'
    }
  ];
</script>

<section id="vykup" class="relative overflow-hidden bg-slate-950 py-24 sm:py-32">

  <div class="mx-auto max-w-7xl px-6 lg:px-8">

    <!-- HERO -->
    <div class="max-w-3xl">
      <h2 class="text-4xl font-extrabold text-white sm:text-5xl">
        Rychlý výkup nemovitosti bez zbytečných komplikací
      </h2>

      <p class="mt-6 text-lg text-slate-400">
        Pokud potřebujete prodat nemovitost rychle, diskrétně a bez stresu,
        navrhnu vám řešení, které bude dávat smysl právě ve vaší situaci.
      </p>
    </div>

    <!-- BENEFITS -->
    <div class="mt-16 grid gap-6 lg:grid-cols-3">
      {#each benefits as benefit}
        <div class="rounded-2xl bg-white/5 p-8 border border-white/10">
          <h3 class="text-xl font-bold text-white">{benefit.title}</h3>
          <p class="mt-3 text-slate-400">{benefit.description}</p>
        </div>
      {/each}
    </div>

    <!-- SITUACE -->
    <div class="mt-20">
      <h3 class="text-3xl font-extrabold text-white">
        Kdy dává výkup největší smysl?
      </h3>

      <div class="mt-10 grid gap-6 lg:grid-cols-3">
        {#each situations as s}
          <div class="rounded-2xl bg-white/5 p-6 border border-white/10">
            <h4 class="text-lg font-bold text-white">{s.title}</h4>
            <p class="mt-2 text-slate-400">{s.description}</p>
          </div>
        {/each}
      </div>
    </div>

    <!-- PROCESS -->
    <div class="mt-20">
      <h3 class="text-3xl font-extrabold text-white">
        Jak probíhá spolupráce
      </h3>

      <div class="mt-10 grid gap-6 lg:grid-cols-3">
        {#each steps as step}
          <div class="rounded-2xl bg-white/5 p-6 border border-white/10">
            <p class="text-sm text-indigo-400">{step.number}</p>
            <h4 class="mt-2 text-lg font-bold text-white">{step.title}</h4>
            <p class="mt-2 text-slate-400">{step.description}</p>
          </div>
        {/each}
      </div>
    </div>

    <!-- CTA -->
    <div class="mt-20 rounded-2xl bg-indigo-600 p-10 text-center">
      <h3 class="text-3xl font-extrabold text-white">
        Chcete vědět, jaké máte možnosti?
      </h3>

      <p class="mt-4 text-indigo-100">
        Ozvěte se mi. Nezávazně probereme vaši situaci a navrhnu konkrétní řešení.
      </p>

      <a href="#kontakt" class="mt-6 inline-block rounded-xl bg-white px-6 py-3 font-bold text-slate-900">
        Nezávazná konzultace
      </a>
    </div>

  </div>
</section>