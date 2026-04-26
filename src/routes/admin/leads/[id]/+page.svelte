<script lang="ts">
  import { resolve } from '$app/paths';
  import { fade, fly } from 'svelte/transition';

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

  let { data, form } = $props();

  let lead = $derived(data.lead as Lead);

  const STATUS_CONFIG: Record<Status, { label: string; color: string }> = {
    new: { label: 'Nové', color: 'bg-blue-100 text-blue-700 border-blue-200' },
    contacted: { label: 'Kontaktováno', color: 'bg-purple-100 text-purple-700 border-purple-200' },
    in_progress: { label: 'V řešení', color: 'bg-amber-100 text-amber-700 border-amber-200' },
    done: { label: 'Hotovo', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
    archived: { label: 'Archiv', color: 'bg-slate-100 text-slate-600 border-slate-200' }
  };

  const STATUS_KEYS = Object.keys(STATUS_CONFIG) as Status[];

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

  function getConditionLabel(value: string | null) {
    if (value === 'novostavba') return 'Novostavba / perfektní stav';
    if (value === 'po_rekonstrukci') return 'Po kompletní rekonstrukci';
    if (value === 'dobry_stav') return 'Dobrý stav';
    if (value === 'puvodni_stav') return 'Původní stav';
    return value || 'Neuvedeno';
  }

  function getElevatorLabel(value: string | null) {
    if (value === 'ano') return 'Ano';
    if (value === 'ne') return 'Ne';
    if (value === 'nevim') return 'Nevím';
    return value || 'Nerelevantní';
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
    <a
      href={resolve('/admin')}
      class="mb-6 inline-flex font-black uppercase tracking-widest text-slate-400 transition hover:text-indigo-600"
    >
      ← Zpět na leady
    </a>

    {#if form?.message}
      <div
        in:fade
        class={`mb-6 rounded-2xl p-4 text-sm font-bold ${
          form?.success ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
        }`}
      >
        {form.message}
      </div>
    {/if}

    <div in:fly={{ y: 20, duration: 300 }} class="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <div class="space-y-6 lg:col-span-2">
        <div class="rounded-[2.5rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70 md:p-8">
          <div class="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-start">
            <div>
              <p class="text-xs font-black uppercase tracking-widest text-indigo-600">
                Detail poptávky
              </p>

              <h1 class="mt-2 text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
                {lead.full_name || 'Bez jména'}
              </h1>

              <p class="mt-2 text-sm font-bold uppercase tracking-widest text-slate-400">
                {formatDate(lead.created_at)} · ID {lead.id}
              </p>
            </div>

            <span class={`h-fit rounded-xl border px-5 py-2 text-xs font-black uppercase tracking-widest ${STATUS_CONFIG[lead.status]?.color ?? STATUS_CONFIG.new.color}`}>
              {STATUS_CONFIG[lead.status]?.label ?? 'Nové'}
            </span>
          </div>

          <div class="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            <div class="box">
              <p>Typ</p>
              <strong>{getPropertyLabel(lead.property_type)}</strong>
            </div>

            <div class="box">
              <p>Účel</p>
              <strong>{getPurposeLabel(lead.purpose)}</strong>
            </div>

            <div class="box">
              <p>Plocha</p>
              <strong>{lead.area_m2 || '—'} m²</strong>
            </div>

            <div class="box">
              <p>Fotky</p>
              <strong>{lead.image_count ?? 0}</strong>
            </div>
          </div>

          <div class="grid gap-4 md:grid-cols-2">
            <div class="rounded-2xl bg-slate-50 p-5">
              <p class="text-xs font-black uppercase tracking-widest text-slate-400">
                Lokalita
              </p>
              <p class="mt-2 text-lg font-black">{lead.city || '—'}</p>
            </div>

            <div class="rounded-2xl bg-slate-50 p-5">
              <p class="text-xs font-black uppercase tracking-widest text-slate-400">
                Dispozice / typ
              </p>
              <p class="mt-2 text-lg font-black">{lead.disposition || '—'}</p>
            </div>

            <div class="rounded-2xl bg-slate-50 p-5">
              <p class="text-xs font-black uppercase tracking-widest text-slate-400">
                Stav
              </p>
              <p class="mt-2 text-lg font-black">{getConditionLabel(lead.condition)}</p>
            </div>

            <div class="rounded-2xl bg-slate-50 p-5">
              <p class="text-xs font-black uppercase tracking-widest text-slate-400">
                Výtah
              </p>
              <p class="mt-2 text-lg font-black">{getElevatorLabel(lead.elevator)}</p>
            </div>
          </div>

          <div class="mt-6 rounded-2xl bg-indigo-50 p-6">
            <p class="mb-2 text-[10px] font-black uppercase tracking-widest text-indigo-600">
              Poznámka klienta
            </p>
            <p class="whitespace-pre-wrap leading-7 text-slate-700">
              {lead.note || 'Bez poznámky.'}
            </p>
          </div>

          {#if lead.email_error}
            <div class="mt-6 rounded-2xl bg-rose-50 p-5 text-sm text-rose-700">
              <p class="font-black">Chyba e-mailu</p>
              <p class="mt-1">{lead.email_error}</p>
            </div>
          {/if}
        </div>

        <form method="POST" action="?/updateLead" class="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <h2 class="mb-5 text-xl font-black italic">
            Zpracování leadu
          </h2>

          <div class="grid gap-5 md:grid-cols-2">
            <div>
              <label for="status" class="mb-2 block text-xs font-black uppercase tracking-widest text-slate-400">
                Stav
              </label>

              <select
                id="status"
                name="status"
                class="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 font-bold outline-none focus:border-indigo-500"
              >
                {#each STATUS_KEYS as key (key)}
                  <option value={key} selected={lead.status === key}>
                    {STATUS_CONFIG[key].label}
                  </option>
                {/each}
              </select>
            </div>

            <div>
              <label class="mb-2 block text-xs font-black uppercase tracking-widest text-slate-400">
                E-mail
              </label>

              <div class="rounded-2xl bg-slate-50 px-4 py-3 text-sm font-bold text-slate-600">
                Admin: {lead.admin_email_sent ? 'odeslán' : 'neodeslán'} · Klient: {lead.customer_email_sent ? 'odeslán' : 'neodeslán'}
              </div>
            </div>
          </div>

          <div class="mt-5">
            <label for="internal_note" class="mb-2 block text-xs font-black uppercase tracking-widest text-slate-400">
              Interní poznámka
            </label>

            <textarea
              id="internal_note"
              name="internal_note"
              rows="5"
              class="w-full rounded-2xl border border-slate-200 bg-slate-50 p-5 outline-none focus:border-indigo-500"
              placeholder="Sem si napiš poznámku k leadu..."
            >{lead.internal_note || ''}</textarea>
          </div>

          <button
            type="submit"
            class="mt-5 rounded-2xl bg-indigo-600 px-6 py-4 text-sm font-black uppercase tracking-widest text-white shadow-lg shadow-indigo-600/20 hover:bg-indigo-500"
          >
            Uložit změny
          </button>
        </form>
      </div>

      <aside class="space-y-6">
        <div class="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/60 md:p-8">
          <h2 class="mb-6 text-xl font-black italic">
            Kontakt
          </h2>

          <a href={`tel:${lead.phone}`} class="contact-card">
            <span>Telefon</span>
            <strong>{lead.phone || '—'}</strong>
          </a>

          <a href={`mailto:${lead.email}`} class="contact-card mt-3">
            <span>E-mail</span>
            <strong>{lead.email || '—'}</strong>
          </a>
        </div>

        <div class="rounded-[2.5rem] bg-slate-900 p-6 text-white shadow-2xl shadow-slate-300/70 md:p-8">
          <h2 class="mb-6 text-xl font-black italic">
            Rychlá kontrola
          </h2>

          <div class="space-y-3 text-sm">
            <div class="flex justify-between gap-4 border-b border-white/10 pb-3">
              <span class="text-slate-400">Souhlas GDPR</span>
              <strong>{lead.consent ? 'Ano' : 'Ne'}</strong>
            </div>

            <div class="flex justify-between gap-4 border-b border-white/10 pb-3">
              <span class="text-slate-400">Fotografie</span>
              <strong>{lead.image_count ?? 0}</strong>
            </div>

            <div class="flex justify-between gap-4 border-b border-white/10 pb-3">
              <span class="text-slate-400">Admin e-mail</span>
              <strong>{lead.admin_email_sent ? 'Ano' : 'Ne'}</strong>
            </div>

            <div class="flex justify-between gap-4">
              <span class="text-slate-400">Klient e-mail</span>
              <strong>{lead.customer_email_sent ? 'Ano' : 'Ne'}</strong>
            </div>
          </div>
        </div>

        <form method="POST" action="?/deleteLead">
          <button
            type="submit"
            class="w-full rounded-2xl bg-red-600 px-5 py-4 font-black uppercase tracking-widest text-white hover:bg-red-500"
          >
            Smazat lead
          </button>
        </form>
      </aside>
    </div>
  </div>
</section>

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
    color: #0f172a;
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