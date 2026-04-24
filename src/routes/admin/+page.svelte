<script lang="ts">
  import { fade, fly } from 'svelte/transition';

  type Status = 'new' | 'contacted' | 'in_progress' | 'done' | 'archived';
  type PropertyType = 'byt' | 'dum' | 'pozemek' | 'komercni';
  type Purpose = 'prodej' | 'pronajem' | 'odhad';

  interface Lead {
    id: string;
    full_name: string;
    email: string;
    phone: string;
    city: string;
    property_type: PropertyType;
    purpose: Purpose;
    area_m2: string;
    disposition: string;
    condition: string;
    note: string;
    created_at: string;
    status: Status;
    photos: { id: string; path: string }[];
    internal_note: string;
  }

  const PROPERTY_TYPES: Record<PropertyType, string> = {
    byt: 'Byt',
    dum: 'Dům',
    pozemek: 'Pozemek',
    komercni: 'Komerční'
  };

  const PURPOSES: Record<Purpose, string> = {
    prodej: 'Plánuje prodej',
    pronajem: 'Chce pronajmout',
    odhad: 'Jen orientační odhad'
  };

  const CONDITIONS: Record<string, string> = {
    novostavba: 'Novostavba / perfektní',
    po_rekonstrukci: 'Po rekonstrukci',
    dobry_stav: 'Dobrý stav',
    puvodni_stav: 'Původní stav'
  };

  const STATUS_CONFIG: Record<Status, { label: string; color: string }> = {
    new: { label: 'Nové', color: 'bg-blue-100 text-blue-700 border-blue-200' },
    contacted: { label: 'Kontaktováno', color: 'bg-purple-100 text-purple-700 border-purple-200' },
    in_progress: { label: 'V řešení', color: 'bg-amber-100 text-amber-700 border-amber-200' },
    done: { label: 'Hotovo', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
    archived: { label: 'Archiv', color: 'bg-slate-100 text-slate-600 border-slate-200' }
  };

  const STATUS_KEYS = Object.keys(STATUS_CONFIG) as Status[];

  let leads = $state<Lead[]>([
    {
      id: 'L-001',
      full_name: 'Jan Novák',
      email: 'jan.novak@email.cz',
      phone: '+420 777 123 456',
      city: 'Praha 4, Chodov',
      property_type: 'byt',
      purpose: 'prodej',
      area_m2: '68',
      disposition: '3+kk',
      condition: 'po_rekonstrukci',
      note: 'Rychlé jednání preferováno.',
      created_at: new Date().toISOString(),
      status: 'new',
      photos: [{ id: 'p1', path: 'obývací pokoj.jpg' }],
      internal_note: ''
    },
    {
      id: 'L-002',
      full_name: 'Marie Svobodová',
      email: 'marie@seznam.cz',
      phone: '+420 602 111 222',
      city: 'Brno, Líšeň',
      property_type: 'dum',
      purpose: 'odhad',
      area_m2: '120',
      disposition: '4+1',
      condition: 'dobry_stav',
      note: 'Zatím jen orientační cena.',
      created_at: new Date().toISOString(),
      status: 'contacted',
      photos: [],
      internal_note: ''
    }
  ]);

  let searchQuery = $state('');
  let statusFilter = $state<Status | ''>('');
  let activeLeadId = $state<string | null>(null);
  let expandedLeadId = $state<string | null>(null);

  const filteredLeads = $derived(
    leads.filter((lead) => {
      const q = searchQuery.toLowerCase();

      const matchesSearch =
        lead.full_name.toLowerCase().includes(q) ||
        lead.city.toLowerCase().includes(q) ||
        lead.email.toLowerCase().includes(q) ||
        lead.phone.toLowerCase().includes(q);

      const matchesStatus = statusFilter === '' || lead.status === statusFilter;

      return matchesSearch && matchesStatus;
    })
  );

  const activeLead = $derived(leads.find((lead) => lead.id === activeLeadId) ?? null);

  function updateStatus(id: string, status: Status) {
    leads = leads.map((lead) => (lead.id === id ? { ...lead, status } : lead));
  }

  function updateNote(id: string, note: string) {
    leads = leads.map((lead) => (lead.id === id ? { ...lead, internal_note: note } : lead));
  }

  function deleteLead(id: string) {
    leads = leads.filter((lead) => lead.id !== id);
    activeLeadId = null;
  }

  function addDemoLead() {
    const id = `L-${String(leads.length + 1).padStart(3, '0')}`;

    leads = [
      {
        id,
        full_name: 'Testovací klient',
        email: 'test@email.cz',
        phone: '+420 700 000 000',
        city: 'Plzeň',
        property_type: 'byt',
        purpose: 'prodej',
        area_m2: '75',
        disposition: '3+1',
        condition: 'dobry_stav',
        note: 'Toto je ukázková poptávka pro testování.',
        created_at: new Date().toISOString(),
        status: 'new',
        photos: [{ id: `${id}-photo`, path: 'test-fotka.jpg' }],
        internal_note: ''
      },
      ...leads
    ];
  }

  function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString('cs-CZ');
  }
</script>

<div class="min-h-screen bg-slate-50 p-4 text-slate-900 md:p-8">
  <div class="mx-auto max-w-6xl">
    {#if !activeLeadId}
      <div in:fade>
        <header class="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 class="text-3xl font-black uppercase italic">
              Lead<span class="text-indigo-600">Manager</span>
            </h1>
            <p class="font-medium text-slate-500">Správa poptávek z webu</p>
          </div>

          <button
            onclick={addDemoLead}
            class="rounded-2xl bg-indigo-600 px-6 py-4 text-sm font-black uppercase tracking-widest text-white shadow-lg hover:bg-indigo-700"
          >
            + Přidat testovací lead
          </button>
        </header>

        <div class="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <input
            bind:value={searchQuery}
            placeholder="Hledat klienta, město, e-mail..."
            class="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm outline-none focus:border-indigo-500 md:col-span-2"
          />

          <select
            bind:value={statusFilter}
            class="rounded-2xl border border-slate-200 bg-white px-5 py-4 font-bold shadow-sm outline-none focus:border-indigo-500"
          >
            <option value="">Všechny stavy</option>
            {#each STATUS_KEYS as key (key)}
              <option value={key}>{STATUS_CONFIG[key].label}</option>
            {/each}
          </select>
        </div>

        <div class="space-y-4">
          {#each filteredLeads as lead (lead.id)}
            <div class="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
              <div class="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <button onclick={() => (activeLeadId = lead.id)} class="text-left">
                  <h3 class="text-lg font-black">{lead.full_name}</h3>
                  <p class="text-xs font-bold uppercase tracking-wider text-slate-400">
                    {PROPERTY_TYPES[lead.property_type]} • {lead.city} • {formatDate(lead.created_at)}
                  </p>
                </button>

                <div class="flex flex-wrap items-center gap-2">
                  <span class={`rounded-xl border px-4 py-2 text-[10px] font-black uppercase tracking-widest ${STATUS_CONFIG[lead.status].color}`}>
                    {STATUS_CONFIG[lead.status].label}
                  </span>

                  <button
                    onclick={() => (expandedLeadId = expandedLeadId === lead.id ? null : lead.id)}
                    class="rounded-xl bg-slate-100 px-4 py-2 text-xs font-black uppercase"
                  >
                    {expandedLeadId === lead.id ? 'Sbalit' : 'Rozbalit'}
                  </button>
                </div>
              </div>

              {#if expandedLeadId === lead.id}
                <div class="mt-5 grid gap-4 border-t border-slate-100 pt-5 md:grid-cols-3" in:fade>
                  <div class="rounded-2xl bg-slate-50 p-4">
                    <p class="text-[10px] font-black uppercase text-slate-400">Kontakt</p>
                    <p class="font-black">{lead.phone}</p>
                    <p class="truncate text-sm text-slate-500">{lead.email}</p>
                  </div>

                  <div class="rounded-2xl bg-slate-50 p-4">
                    <p class="text-[10px] font-black uppercase text-slate-400">Nemovitost</p>
                    <p class="font-black">{lead.disposition}, {lead.area_m2} m²</p>
                    <p class="text-sm text-slate-500">{PURPOSES[lead.purpose]}</p>
                  </div>

                  <div class="rounded-2xl bg-slate-50 p-4">
                    <p class="text-[10px] font-black uppercase text-slate-400">Stav</p>
                    <select
                      value={lead.status}
                      onchange={(event) => updateStatus(lead.id, event.currentTarget.value as Status)}
                      class="mt-2 w-full rounded-xl border border-slate-200 bg-white p-3 font-bold"
                    >
                      {#each STATUS_KEYS as key (key)}
                        <option value={key}>{STATUS_CONFIG[key].label}</option>
                      {/each}
                    </select>
                  </div>
                </div>
              {/if}
            </div>
          {:else}
            <div class="rounded-[2rem] border border-dashed border-slate-300 bg-white py-20 text-center">
              <p class="font-bold italic text-slate-400">Žádné poptávky k zobrazení.</p>
            </div>
          {/each}
        </div>
      </div>
    {:else if activeLead}
      <div in:fly={{ y: 20, duration: 300 }}>
        <button
          onclick={() => (activeLeadId = null)}
          class="mb-6 font-black uppercase tracking-widest text-slate-400 hover:text-indigo-600"
        >
          ← Zpět
        </button>

        <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div class="space-y-6 lg:col-span-2">
            <div class="rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-xl">
              <div class="mb-8 flex justify-between gap-4">
                <div>
                  <h2 class="text-4xl font-black">{activeLead.full_name}</h2>
                  <p class="text-xs font-bold uppercase tracking-widest text-slate-400">{activeLead.id}</p>
                </div>

                <span class={`h-fit rounded-xl border px-5 py-2 text-xs font-black uppercase tracking-widest ${STATUS_CONFIG[activeLead.status].color}`}>
                  {STATUS_CONFIG[activeLead.status].label}
                </span>
              </div>

              <div class="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
                <div class="box">
                  <p>Plocha</p>
                  <strong>{activeLead.area_m2} m²</strong>
                </div>

                <div class="box">
                  <p>Dispozice</p>
                  <strong>{activeLead.disposition}</strong>
                </div>

                <div class="box">
                  <p>Město</p>
                  <strong>{activeLead.city}</strong>
                </div>

                <div class="box">
                  <p>Stav</p>
                  <strong>{CONDITIONS[activeLead.condition]}</strong>
                </div>
              </div>

              <div class="rounded-2xl bg-indigo-50 p-6">
                <p class="mb-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Poznámka klienta
                </p>
                <p class="italic">„{activeLead.note || 'Bez poznámky.'}“</p>
              </div>
            </div>

            <div class="rounded-[2rem] border border-slate-200 bg-white p-8">
              <h3 class="mb-4 text-xl font-black italic">Interní poznámka</h3>

              <textarea
                value={activeLead.internal_note}
                oninput={(event) => updateNote(activeLead.id, event.currentTarget.value)}
                placeholder="Sem si napiš poznámku k leadu..."
                class="min-h-32 w-full rounded-2xl border border-slate-200 bg-slate-50 p-5 outline-none focus:border-indigo-500"
              ></textarea>
            </div>

            <div class="rounded-[2rem] border border-slate-200 bg-white p-8">
              <h3 class="mb-4 text-xl font-black italic">Přílohy</h3>

              {#if activeLead.photos.length > 0}
                <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
                  {#each activeLead.photos as photo (photo.id)}
                    <div class="flex aspect-square items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 p-3 text-center text-xs font-black uppercase text-slate-400">
                      {photo.path}
                    </div>
                  {/each}
                </div>
              {:else}
                <p class="rounded-2xl bg-slate-50 p-8 text-center font-bold text-slate-400">
                  Žádné přílohy.
                </p>
              {/if}
            </div>
          </div>

          <div class="space-y-6">
            <div class="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-lg">
              <h3 class="mb-6 text-xl font-black italic">Kontakt</h3>

              <a href={`tel:${activeLead.phone}`} class="contact-card">
                <span>Telefon</span>
                <strong>{activeLead.phone}</strong>
              </a>

              <a href={`mailto:${activeLead.email}`} class="contact-card mt-3">
                <span>E-mail</span>
                <strong>{activeLead.email}</strong>
              </a>
            </div>

            <div class="rounded-[2.5rem] bg-slate-900 p-8 text-white shadow-2xl">
              <h3 class="mb-6 text-xl font-black italic">Zpracování</h3>

              <div class="grid gap-2">
                {#each STATUS_KEYS as key (key)}
                  <button
                    onclick={() => updateStatus(activeLead.id, key)}
                    class={`rounded-2xl border-2 px-5 py-4 text-left text-[10px] font-black uppercase tracking-widest ${
                      activeLead.status === key
                        ? 'border-indigo-400 bg-indigo-600 text-white'
                        : 'border-slate-700 bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {STATUS_CONFIG[key].label}
                  </button>
                {/each}
              </div>
            </div>

            <button
              onclick={() => deleteLead(activeLead.id)}
              class="w-full rounded-2xl bg-red-600 px-5 py-4 font-black uppercase tracking-widest text-white"
            >
              Smazat lead
            </button>
          </div>
        </div>
      </div>
    {/if}
  </div>
</div>

<style>
  :global(body) {
    margin: 0;
    background: #f8fafc;
  }

  .box {
    border-radius: 1rem;
    border: 1px solid #f1f5f9;
    background: #f8fafc;
    padding: 1rem;
    text-align: center;
  }

  .box p {
    margin-bottom: 0.25rem;
    font-size: 0.6rem;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: #94a3b8;
  }

  .box strong {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .contact-card {
    display: block;
    border-radius: 1rem;
    border: 1px solid #f1f5f9;
    background: #f8fafc;
    padding: 1rem;
    transition: 0.2s;
  }

  .contact-card:hover {
    background: #4f46e5;
    color: white;
  }

  .contact-card span {
    display: block;
    font-size: 0.6rem;
    font-weight: 900;
    text-transform: uppercase;
    opacity: 0.6;
  }

  .contact-card strong {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>