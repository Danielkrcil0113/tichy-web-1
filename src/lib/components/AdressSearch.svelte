<script lang="ts">
  type AddressSuggestion = {
    display_name: string;
    lat: string;
    lon: string;
    place_id: number;
  };

  let { 
    city = $bindable(''), 
    error = '' 
  } = $props();

  let addressSuggestions = $state<AddressSuggestion[]>([]);
  let showAddressSuggestions = $state(false);
  let isAddressLoading = $state(false);
  let debounceTimer: ReturnType<typeof setTimeout> | null = null;

  async function fetchAddressSuggestions(query: string) {
    if (!query || query.trim().length < 3) {
      addressSuggestions = [];
      showAddressSuggestions = false;
      return;
    }

    isAddressLoading = true;

    try {
      const url = `https://nominatim.openstreetmap.org/search?format=jsonv2&addressdetails=1&countrycodes=cz&limit=5&q=${encodeURIComponent(query)}`;
      const response = await fetch(url, { headers: { Accept: 'application/json' } });

      if (!response.ok) throw new Error('Nepodařilo se načíst adresy.');

      const data: AddressSuggestion[] = await response.json();
      addressSuggestions = data;
      showAddressSuggestions = data.length > 0;
    } catch (err) {
      console.error(err);
      addressSuggestions = [];
      showAddressSuggestions = false;
    } finally {
      isAddressLoading = false;
    }
  }

  function onAddressInput(event: Event) {
    const target = event.target as HTMLInputElement;
    city = target.value; // Hodnotu rovnou synchronizujeme s naší jedinou proměnnou city

    if (debounceTimer) clearTimeout(debounceTimer);

    debounceTimer = setTimeout(() => {
      fetchAddressSuggestions(city);
    }, 350);
  }

  function selectAddress(suggestion: AddressSuggestion) {
    city = suggestion.display_name;
    showAddressSuggestions = false;
    addressSuggestions = [];
  }

  function hideSuggestionsLater() {
    setTimeout(() => {
      showAddressSuggestions = false;
    }, 150);
  }
</script>

<div class="relative">
  <label for="city_search" class="mb-1.5 block text-sm font-bold text-slate-700">
    Přesná adresa nebo lokalita *
  </label>

  <!-- Používáme jen 'value={city}', o update se stará 'oninput' -->
  <input
    id="city_search"
    type="text"
    value={city}
    oninput={onAddressInput}
    onfocus={() => addressSuggestions.length > 0 && (showAddressSuggestions = true)}
    onblur={hideSuggestionsLater}
    autocomplete="off"
    placeholder="Např. Praha 4, Chodov, Květinová 12"
    class={`block w-full rounded-xl border-2 px-4 py-3.5 text-slate-900 transition-all hover:bg-slate-200/50 focus:border-indigo-500 focus:bg-white focus:ring-0 ${
      error ? 'border-rose-300 bg-rose-50' : 'border-transparent bg-slate-100'
    }`}
  />

  {#if isAddressLoading}
    <p class="mt-2 text-xs text-slate-500">Vyhledávám adresy...</p>
  {/if}

  {#if showAddressSuggestions && addressSuggestions.length > 0}
    <div class="absolute z-20 mt-2 max-h-72 w-full overflow-auto rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl">
      {#each addressSuggestions as suggestion (suggestion.place_id)}
        <button
          type="button"
          onclick={() => selectAddress(suggestion)}
          aria-label={`Vybrat adresu ${suggestion.display_name}`}
          class="block w-full rounded-xl px-3 py-3 text-left transition hover:bg-slate-50"
        >
          <div class="text-sm font-semibold text-slate-800">
            {suggestion.display_name}
          </div>
        </button>
      {/each}
    </div>
  {/if}

  {#if error}
    <p class="mt-2 text-sm font-medium text-rose-500">{error}</p>
  {/if}
</div>