<script lang="ts">
  import { resolve } from '$app/paths';
  import { fade } from 'svelte/transition';

  type Status = 'new' | 'contacted' | 'in_progress' | 'done' | 'archived';

  interface Lead {
    id: string;
    created_at: string;
    property_type: string;
    purpose: string;
    city: string;
    area_m2: string;
    disposition: string;
    condition: string | null;
    elevator: string | null;
    full_name: string;
    email: string;
    phone: string;
    note: string | null;
    consent: boolean;
    image_count: number;
    admin_email_sent: boolean;
    customer_email_sent: boolean;
    email_error: string | null;
    status: Status;
    internal_note: string | null;
  }

  let { data } = $props();

  let leads = $derived(data.leads as Lead[]);
  let searchQuery = $state('');
  let statusFilter = $state<Status | ''>('');
  let expandedLeadId = $state<string | null>(null);

  const STATUS_CONFIG: Record<Status, { label: string; color: string }> = {
    new: { label: 'Nové', color: 'bg-blue-100 text-blue-700 border-blue-200' },
    contacted: { label: 'Kontaktováno', color: 'bg-purple-100 text-purple-700 border-purple-200' },
    in_progress: { label: 'V řešení', color: 'bg-amber-100 text-amber-700 border-amber-200' },
    done: { label: 'Hotovo', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
    archived: { label: 'Archiv', color: 'bg-slate-100 text-slate-600 border-slate-200' }
  };

  const STATUS_KEYS = Object.keys(STATUS_CONFIG) as Status[];

  const filteredLeads = $derived(
    leads.filter((lead) => {
      const q = searchQuery.toLowerCase();

      const matchesSearch =
        (lead.full_name ?? '').toLowerCase().includes(q) ||
        (lead.city ?? '').toLowerCase().includes(q) ||
        (lead.email ?? '').toLowerCase().includes(q) ||
        (lead.phone ?? '').toLowerCase().includes(q);

      const matchesStatus = statusFilter === '' || lead.status === statusFilter;

      return matchesSearch && matchesStatus;
    })
  );

  function getPropertyLabel(value: string) {
    if (value === 'byt') return 'Byt';
    if (value === 'dum') return 'Rodinný dům';
    if (value === 'ostatni') return 'Pozemek / Ostatní';
    return value || 'Neuvedeno';
  }

  function getPurposeLabel(value: string) {
    if (value === 'prodavam') return 'Prodávám nemovitost';
    if (value === 'kupuji') return 'Kupuji nemovitost';
    if (value === 'dedictvi') return 'Dědictví';
    if (value === 'sjm_rozvod') return 'Vypořádání SJM';
    if (value === 'jine') return 'Jiný důvod';
    return value || 'Neuvedeno';
  }

  function formatDate(value: string) {
    return new Intl.DateTimeFormat('cs-CZ', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(value));
  }
</script>

<section class="min-h-screen bg-slate-50 p-4 text-slate-900 md:p-8">
  <div class="mx-auto max-w-7xl">
    <header class="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
      <div>
        <p class="text-sm font-black uppercase tracking-widest text-indigo-600">
          Administrace
        </p>

        <h1 class="mt-2 text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
          Lead<span class="text-indigo-600">Manager</span>
        </h1>

        <p class="mt-2 font-medium text-slate-500">
          Správa poptávek z webu · celkem {leads.length}
        </p>
      </div>
    </header>

    <div class="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
      <input
        bind:value={searchQuery}
        placeholder="Hledat klienta, město, e-mail..."
        class="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm outline-none transition focus:border-indigo-500 md:col-span-2"
      />

      <select
        bind:value={statusFilter}
        class="rounded-2xl border border-slate-200 bg-white px-5 py-4 font-bold shadow-sm outline-none transition focus:border-indigo-500"
      >
        <option value="">Všechny stavy</option>

        {#each STATUS_KEYS as key (key)}
          <option value={key}>{STATUS_CONFIG[key].label}</option>
        {/each}
      </select>
    </div>

    <div class="space-y-4">
      {#each filteredLeads as lead (lead.id)}
        <article class="rounded-4xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-lg hover:shadow-slate-200/70">
          <div class="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <a href={resolve('/admin/leads/[id]', { id: lead.id })} class="block text-left">
              <h2 class="text-xl font-black text-slate-900">
                {lead.full_name || 'Bez jména'}
              </h2>

              <p class="mt-1 text-xs font-bold uppercase tracking-wider text-slate-400">
                {getPropertyLabel(lead.property_type)} · {lead.city || 'Bez lokality'} · {formatDate(lead.created_at)}
              </p>
            </a>

            <div class="flex flex-wrap items-center gap-2">
              <span class={`rounded-xl border px-4 py-2 text-[10px] font-black uppercase tracking-widest ${STATUS_CONFIG[lead.status]?.color ?? STATUS_CONFIG.new.color}`}>
                {STATUS_CONFIG[lead.status]?.label ?? 'Nové'}
              </span>

              <button
                type="button"
                onclick={() => (expandedLeadId = expandedLeadId === lead.id ? null : lead.id)}
                class="rounded-xl bg-slate-100 px-4 py-2 text-xs font-black uppercase text-slate-700 hover:bg-slate-200"
              >
                {expandedLeadId === lead.id ? 'Sbalit' : 'Rozbalit'}
              </button>

              <a
                href={resolve('/admin/leads/[id]', { id: lead.id })}
                class="rounded-xl bg-slate-900 px-4 py-2 text-xs font-black uppercase text-white hover:bg-indigo-600"
              >
                Detail
              </a>
            </div>
          </div>

          {#if expandedLeadId === lead.id}
            <div class="mt-5 grid gap-4 border-t border-slate-100 pt-5 md:grid-cols-4" in:fade>
              <div class="rounded-2xl bg-slate-50 p-4">
                <p class="text-[10px] font-black uppercase text-slate-400">Kontakt</p>
                <p class="mt-1 font-black">{lead.phone || '—'}</p>
                <p class="truncate text-sm text-slate-500">{lead.email || '—'}</p>
              </div>

              <div class="rounded-2xl bg-slate-50 p-4">
                <p class="text-[10px] font-black uppercase text-slate-400">Nemovitost</p>
                <p class="mt-1 font-black">{lead.disposition || '—'}, {lead.area_m2 || '—'} m²</p>
                <p class="text-sm text-slate-500">{getPurposeLabel(lead.purpose)}</p>
              </div>

              <div class="rounded-2xl bg-slate-50 p-4">
                <p class="text-[10px] font-black uppercase text-slate-400">Fotografie</p>
                <p class="mt-1 font-black">{lead.image_count ?? 0}</p>
                <p class="text-sm text-slate-500">přiložených souborů</p>
              </div>

              <div class="rounded-2xl bg-slate-50 p-4">
                <p class="text-[10px] font-black uppercase text-slate-400">E-maily</p>
                <p class="mt-1 text-sm font-bold">
                  Admin: {lead.admin_email_sent ? 'odeslán' : 'neodeslán'}
                </p>
                <p class="text-sm font-bold">
                  Klient: {lead.customer_email_sent ? 'odeslán' : 'neodeslán'}
                </p>
              </div>
            </div>
          {/if}
        </article>
      {:else}
        <div class="rounded-4xl border border-dashed border-slate-300 bg-white py-20 text-center">
          <p class="font-bold italic text-slate-400">
            Žádné poptávky k zobrazení.
          </p>
        </div>
      {/each}
    </div>
  </div>
</section>