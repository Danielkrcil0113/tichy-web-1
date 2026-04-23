<script lang="ts">
  import { resolve } from '$app/paths';

  let { data } = $props();
  let lead = $derived(data.lead);
</script>

<section class="min-h-screen bg-slate-100 px-3 py-4">
  <div class="mx-auto max-w-3xl space-y-4">
    <a href={resolve('/admin')} class="text-sm font-medium text-indigo-600">← Zpět</a>

    <div class="rounded-3xl bg-white p-5 shadow-sm">
      <h1 class="text-2xl font-bold text-slate-900">{lead.full_name || 'Bez jména'}</h1>
      <p class="mt-1 text-sm text-slate-500">{lead.lead_type} • {lead.status}</p>

      <div class="mt-5 grid gap-4">
        <div>
          <p class="text-xs font-semibold uppercase text-slate-400">E-mail</p>
          <a class="text-slate-900 underline" href={`mailto:${lead.email}`}>{lead.email || '—'}</a>
        </div>

        <div>
          <p class="text-xs font-semibold uppercase text-slate-400">Telefon</p>
          <a class="text-slate-900 underline" href={`tel:${lead.phone}`}>{lead.phone || '—'}</a>
        </div>

        <div>
          <p class="text-xs font-semibold uppercase text-slate-400">Město / lokalita</p>
          <p class="text-slate-900">{lead.city || '—'}</p>
        </div>

        <div>
          <p class="text-xs font-semibold uppercase text-slate-400">Zpráva</p>
          <p class="whitespace-pre-wrap text-slate-900">{lead.message || '—'}</p>
        </div>

        <div>
          <p class="text-xs font-semibold uppercase text-slate-400">Další data</p>
          <pre class="overflow-x-auto rounded-2xl bg-slate-100 p-3 text-xs text-slate-800">{JSON.stringify(lead.payload, null, 2)}</pre>
        </div>

        {#if lead.photos?.length}
          <div>
            <p class="mb-2 text-xs font-semibold uppercase text-slate-400">Fotky</p>
            <div class="grid grid-cols-2 gap-3">
              {#each lead.photos as photo, i (`${photo.path}-${i}`)}
                <div class="rounded-2xl bg-slate-100 p-2 text-xs text-slate-700">
                  {photo.path}
                </div>
              {/each}
            </div>
          </div>
        {/if}
      </div>

      <form method="POST" action="?/updateStatus" class="mt-6 flex flex-col gap-3 sm:flex-row">
        <select
          name="status"
          class="rounded-2xl border border-slate-200 bg-white px-4 py-3"
          value={lead.status}
        >
          <option value="new">Nové</option>
          <option value="contacted">Kontaktováno</option>
          <option value="in_progress">V řešení</option>
          <option value="done">Hotovo</option>
          <option value="archived">Archiv</option>
        </select>

        <button class="rounded-2xl bg-slate-900 px-4 py-3 text-white">
          Uložit stav
        </button>
      </form>
    </div>
  </div>
</section>