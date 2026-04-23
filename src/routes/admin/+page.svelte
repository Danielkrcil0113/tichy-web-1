<script lang="ts">
  import { resolve } from '$app/paths';

  let { data } = $props();

  function formatDate(value: string) {
    return new Date(value).toLocaleString('cs-CZ');
  }
</script>

<section class="min-h-screen bg-slate-100 px-3 py-4">
  <div class="mx-auto max-w-3xl">
    <div class="mb-4">
      <h1 class="text-2xl font-bold text-slate-900">Poptávky</h1>
      <p class="text-sm text-slate-500">Mobilní přehled formulářů</p>
    </div>

    <form method="GET" class="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-[1fr_auto_auto]">
      <input
        name="q"
        placeholder="Hledat jméno, e-mail, telefon, město"
        class="rounded-2xl border border-slate-200 bg-white px-4 py-3"
      />

      <select name="status" class="rounded-2xl border border-slate-200 bg-white px-4 py-3">
        <option value="">Všechny stavy</option>
        <option value="new">Nové</option>
        <option value="contacted">Kontaktováno</option>
        <option value="in_progress">V řešení</option>
        <option value="done">Hotovo</option>
        <option value="archived">Archiv</option>
      </select>

      <button class="rounded-2xl bg-slate-900 px-4 py-3 text-white">
        Filtrovat
      </button>
    </form>

    {#if data.error}
      <div class="mb-4 rounded-2xl bg-rose-50 p-4 text-rose-700">
        {data.error}
      </div>
    {/if}

    <div class="space-y-3">
      {#each data.leads as lead (lead.id)}
        <a
          href={resolve(`/admin/leads/${lead.id}` as `/admin/leads/${string}`)}
          class="block rounded-3xl border border-slate-200 bg-white p-4 shadow-sm"
        >
          <div class="flex items-start justify-between gap-3">
            <div>
              <p class="text-sm font-semibold text-slate-900">{lead.full_name || 'Bez jména'}</p>
              <p class="text-sm text-slate-500">{lead.email || 'bez e-mailu'}</p>
              <p class="text-sm text-slate-500">{lead.phone || 'bez telefonu'}</p>
            </div>

            <span class="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
              {lead.status}
            </span>
          </div>

          <div class="mt-3 flex flex-wrap gap-2 text-xs text-slate-500">
            <span class="rounded-full bg-slate-100 px-2 py-1">{lead.lead_type}</span>
            {#if lead.city}
              <span class="rounded-full bg-slate-100 px-2 py-1">{lead.city}</span>
            {/if}
            <span class="rounded-full bg-slate-100 px-2 py-1">{formatDate(lead.created_at)}</span>
          </div>
        </a>
      {/each}
    </div>
  </div>
</section>