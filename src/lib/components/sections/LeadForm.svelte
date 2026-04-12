<script lang="ts">
  import { fade, fly } from 'svelte/transition';

  type FormShape =
    | {
        success?: boolean;
        message?: string;
        errors?: Record<string, string[]>;
        values?: Record<string, string | number | boolean | null | undefined>;
      }
    | null
    | undefined;

  type AddressSuggestion = {
    display_name: string;
    lat: string;
    lon: string;
    place_id: number;
  };

  let { form }: { form: FormShape } = $props();

  const initial = form?.values || {};

  let step = $state(1);
  const totalSteps = 4;

  let property_type = $state(String(initial.property_type ?? 'byt'));
  let purpose = $state(String(initial.purpose ?? 'prodej'));

  // Adresa / lokalita
  let city = $state(String(initial.city ?? ''));
  let address_query = $state(String(initial.city ?? ''));
  let addressSuggestions = $state<AddressSuggestion[]>([]);
  let showAddressSuggestions = $state(false);
  let isAddressLoading = $state(false);
  let selectedAddress = $state<AddressSuggestion | null>(null);

  let area_m2 = $state(String(initial.area_m2 ?? ''));
  let disposition = $state(String(initial.disposition ?? ''));
  let condition = $state(String(initial.condition ?? ''));
  let full_name = $state(String(initial.full_name ?? ''));
  let email = $state(String(initial.email ?? ''));
  let phone = $state(String(initial.phone ?? ''));
  let note = $state(String(initial.note ?? ''));
  let consent = $state(Boolean(initial.consent ?? false));

  // --- NAHRÁVÁNÍ FOTOGRAFIÍ ---
  let fileInput: HTMLInputElement;
  let selectedFiles = $state<File[]>([]);
  let fileError = $state('');

  function updateNativeInput() {
    if (!fileInput) return;
    const dt = new DataTransfer();
    selectedFiles.forEach((file) => dt.items.add(file));
    fileInput.files = dt.files;
  }

  function handleFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;

    const newFiles = Array.from(input.files);
    if (selectedFiles.length + newFiles.length > 10) {
      fileError = 'Můžete nahrát maximálně 10 fotografií.';
      const allowed = 10 - selectedFiles.length;
      selectedFiles = [...selectedFiles, ...newFiles.slice(0, allowed)];
    } else {
      fileError = '';
      selectedFiles = [...selectedFiles, ...newFiles];
    }
    updateNativeInput();
  }

  function removeFile(index: number) {
    selectedFiles = selectedFiles.filter((_, i) => i !== index);
    if (selectedFiles.length <= 10) fileError = '';
    updateNativeInput();
  }
  // ---------------------------

  let localErrors = $state<Record<string, string>>({});

  const dispositionOptionsByType: Record<string, string[]> = {
    byt: ['1+kk', '1+1', '2+kk', '2+1', '3+kk', '3+1', '4+kk', '4+1', '5+kk', '5+1', '6+ a více', 'atypické'],
    dum: ['2+kk', '3+kk', '3+1', '4+kk', '4+1', '5+kk', '5+1', '6+ a více', 'bungalov', 'patrový', 'řadový', 'dvougenerační'],
    pozemek: ['stavební', 'zahrada', 'orná půda', 'rekreační', 'komerční', 'ostatní'],
    komercni: ['kanceláře', 'obchodní prostor', 'sklad', 'výroba', 'ordinace', 'restaurace', 'ubytování', 'ostatní']
  };

  function getDispositionOptions() {
    return dispositionOptionsByType[property_type] ?? [];
  }

  $effect(() => {
    const options = getDispositionOptions();
    if (disposition && !options.includes(disposition)) {
      disposition = '';
    }
  });

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
      const response = await fetch(url, {
        headers: {
          Accept: 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Nepodařilo se načíst adresy.');
      }

      const data: AddressSuggestion[] = await response.json();
      addressSuggestions = data;
      showAddressSuggestions = data.length > 0;
    } catch (error) {
      console.error(error);
      addressSuggestions = [];
      showAddressSuggestions = false;
    } finally {
      isAddressLoading = false;
    }
  }

  function onAddressInput(event: Event) {
    const target = event.target as HTMLInputElement;
    address_query = target.value;
    city = target.value;
    selectedAddress = null;

    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      fetchAddressSuggestions(address_query);
    }, 350);
  }

  function selectAddress(suggestion: AddressSuggestion) {
    selectedAddress = suggestion;
    address_query = suggestion.display_name;
    city = suggestion.display_name;
    showAddressSuggestions = false;
    addressSuggestions = [];
  }

  function hideSuggestionsLater() {
    setTimeout(() => {
      showAddressSuggestions = false;
    }, 150);
  }

  function validateStep(currentStep: number): boolean {
    localErrors = {};
    let isValid = true;

    if (currentStep === 1) {
      if (!property_type) {
        localErrors.property_type = 'Vyberte typ nemovitosti.';
        isValid = false;
      }
      if (!purpose) {
        localErrors.purpose = 'Vyberte účel odhadu.';
        isValid = false;
      }
    } else if (currentStep === 2) {
      if (!city || city.trim().length < 3) {
        localErrors.city = 'Zadejte prosím adresu nebo lokalitu.';
        isValid = false;
      }
      if (!area_m2 || Number(area_m2) <= 0) {
        localErrors.area_m2 = 'Zadejte prosím platnou užitnou plochu.';
        isValid = false;
      }
      if (!disposition) {
        localErrors.disposition = 'Vyberte prosím možnost z nabídky.';
        isValid = false;
      }
    } else if (currentStep === 3) {
      if (!full_name || full_name.trim().length < 2) {
        localErrors.full_name = 'Zadejte prosím své jméno a příjmení.';
        isValid = false;
      }
      if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
        localErrors.email = 'Zadejte prosím platnou e-mailovou adresu.';
        isValid = false;
      }
      if (!phone || phone.trim().length < 9) {
        localErrors.phone = 'Zadejte prosím platné telefonní číslo.';
        isValid = false;
      }
    }

    return isValid;
  }

  function nextStep() {
    if (validateStep(step)) {
      if (step < totalSteps) step += 1;
    }
  }

  function prevStep() {
    if (step > 1) step -= 1;
  }

  function getError(field: string): string | undefined {
    return localErrors[field] || (form?.errors && form.errors[field] ? form.errors[field][0] : undefined);
  }
</script>

<section id="lead-form" class="relative overflow-hidden bg-slate-50 py-24 sm:py-32">
  <div class="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
    <div class="relative overflow-hidden rounded-[2.5rem] bg-white p-6 shadow-2xl shadow-slate-200/50 ring-1 ring-slate-100 sm:p-12">
      <div class="text-center md:text-left">
        <h2 class="text-3xl font-extrabold tracking-tight text-slate-900">
          Zadejte parametry pro ocenění
        </h2>
        <p class="mt-2 text-base text-slate-500">
          Zabere to jen 2 minuty. Vaše údaje jsou u nás v bezpečí.
        </p>
      </div>

      <div class="mb-10 mt-8">
        <div class="flex items-center justify-between">
          {#each Array(totalSteps) as _, i}
            <div class="flex flex-col items-center gap-2">
              <div class="flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition-colors duration-300 {step >= i + 1 ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400'}">
                {i + 1}
              </div>
            </div>
            {#if i < totalSteps - 1}
              <div class="mx-2 h-[2px] flex-1 transition-colors duration-300 {step > i + 1 ? 'bg-indigo-600' : 'bg-slate-100'}"></div>
            {/if}
          {/each}
        </div>
        <div class="mt-3 flex justify-between px-1 text-xs font-medium text-slate-400">
          <span class={step >= 1 ? 'text-indigo-600' : ''}>Základ</span>
          <span class="{step >= 2 ? 'text-indigo-600' : ''} ml-2">Detaily</span>
          <span class="{step >= 3 ? 'text-indigo-600' : ''} mr-2">Kontakt</span>
          <span class={step >= 4 ? 'text-indigo-600' : ''}>Dokončení</span>
        </div>
      </div>

      {#if form?.success}
        <div in:fade class="mb-8 flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-emerald-800">
          <svg class="h-6 w-6 flex-shrink-0 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
          <span class="font-medium">Děkujeme za důvěru! Vaši poptávku jsme přijali a brzy se vám ozveme s výsledkem.</span>
        </div>
      {/if}

      {#if form?.message && !form?.success}
        <div in:fade class="mb-8 flex items-center gap-3 rounded-2xl border border-rose-200 bg-rose-50 p-5 text-rose-700">
          <svg class="h-6 w-6 flex-shrink-0 text-rose-600" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3Z" /></svg>
          <span class="font-medium">Některá políčka je potřeba ještě upravit. Zkontrolujte prosím formulář.</span>
        </div>
      {/if}

      <form method="POST" enctype="multipart/form-data" class="min-h-[320px]">
        {#if step === 1}
          <div in:fly={{ x: 20, duration: 400, delay: 100 }} class="space-y-8">
            <div>
              <label for="property_type" class="mb-4 block text-sm font-bold uppercase tracking-wide text-slate-800">1. Co budeme oceňovat?</label>
              <div class="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {#each [
                  {id: 'byt', label: 'Byt', icon: 'M3 21h18M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16M9 7h2m-2 4h2m-2 4h2m4-8h2m-2 4h2m-2 4h2'},
                  {id: 'dum', label: 'Dům', icon: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10'},
                  {id: 'pozemek', label: 'Pozemek', icon: 'M4 4h16v16H4z M4 10h16 M10 4v16'},
                  {id: 'komercni', label: 'Komerční', icon: 'M3 21h18M5 21V7l7-4 7 4v14M9 11h6 M9 15h6'}
                ] as type}
                  <button
                    type="button"
                    onclick={() => property_type = type.id}
                    class="group flex flex-col items-center gap-3 rounded-2xl border-2 p-4 transition-all duration-200 {property_type === type.id ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-sm' : 'border-slate-100 bg-white text-slate-600 hover:border-indigo-200 hover:bg-slate-50'}"
                  >
                    <svg class="h-7 w-7 {property_type === type.id ? 'text-indigo-600' : 'text-slate-400 group-hover:text-indigo-500'}" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" d={type.icon} />
                    </svg>
                    <span class="text-sm font-semibold">{type.label}</span>
                  </button>
                {/each}
              </div>
              <input type="hidden" id="property_type" name="property_type" value={property_type} />
              {#if getError('property_type')}<p class="mt-2 text-sm font-medium text-rose-500">{getError('property_type')}</p>{/if}
            </div>

            <div>
              <label for="purpose" class="mb-4 block text-sm font-bold uppercase tracking-wide text-slate-800">2. Z jakého důvodu odhad potřebujete?</label>
              <div class="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {#each [{id: 'prodej', label: 'Plánuji prodej'}, {id: 'pronajem', label: 'Chci pronajmout'}, {id: 'odhad', label: 'Jen pro zajímavost'}] as p}
                  <button
                    type="button"
                    onclick={() => purpose = p.id}
                    class="rounded-xl border-2 p-3 text-center text-sm font-semibold transition-all duration-200 {purpose === p.id ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-sm' : 'border-slate-100 bg-white text-slate-600 hover:border-indigo-200 hover:bg-slate-50'}"
                  >
                    {p.label}
                  </button>
                {/each}
              </div>
              <input type="hidden" id="purpose" name="purpose" value={purpose} />
              {#if getError('purpose')}<p class="mt-2 text-sm font-medium text-rose-500">{getError('purpose')}</p>{/if}
            </div>
          </div>
        {/if}

        {#if step === 2}
          <div in:fly={{ x: 20, duration: 400, delay: 100 }} class="grid gap-5 md:grid-cols-2">
            <div class="relative md:col-span-2">
              <label for="city_search" class="mb-1.5 block text-sm font-bold text-slate-700">Přesná adresa nebo lokalita *</label>

              <input
                id="city_search"
                type="text"
                value={address_query}
                oninput={onAddressInput}
                onfocus={() => addressSuggestions.length > 0 && (showAddressSuggestions = true)}
                onblur={hideSuggestionsLater}
                autocomplete="off"
                placeholder="Např. Praha 4, Chodov, Květinová 12"
                class="block w-full rounded-xl border-2 {getError('city') ? 'border-rose-300 bg-rose-50' : 'border-transparent bg-slate-100'} px-4 py-3.5 text-slate-900 transition-all hover:bg-slate-200/50 focus:border-indigo-500 focus:bg-white focus:ring-0"
              />

              <input type="hidden" id="city" name="city" value={city} />

              {#if isAddressLoading}
                <p class="mt-2 text-xs text-slate-500">Vyhledávám adresy...</p>
              {/if}

              {#if showAddressSuggestions && addressSuggestions.length > 0}
                <div class="absolute z-20 mt-2 max-h-72 w-full overflow-auto rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl">
                  {#each addressSuggestions as suggestion}
                    <button
                      type="button"
                      onclick={() => selectAddress(suggestion)}
                      class="block w-full rounded-xl px-3 py-3 text-left transition hover:bg-slate-50"
                    >
                      <div class="text-sm font-semibold text-slate-800">
                        {suggestion.display_name}
                      </div>
                    </button>
                  {/each}
                </div>
              {/if}

              {#if getError('city')}<p class="mt-2 text-sm font-medium text-rose-500">{getError('city')}</p>{/if}
            </div>

            <div>
              <label for="area_m2" class="mb-1.5 block text-sm font-bold text-slate-700">Užitná plocha (v m²) *</label>
              <input
                id="area_m2"
                name="area_m2"
                type="number"
                bind:value={area_m2}
                placeholder="Např. 68"
                class="block w-full rounded-xl border-2 {getError('area_m2') ? 'border-rose-300 bg-rose-50' : 'border-transparent bg-slate-100'} px-4 py-3.5 text-slate-900 transition-all hover:bg-slate-200/50 focus:border-indigo-500 focus:bg-white focus:ring-0"
              />
              {#if getError('area_m2')}<p class="mt-2 text-sm font-medium text-rose-500">{getError('area_m2')}</p>{/if}
            </div>

            <div>
              <label for="disposition" class="mb-1.5 block text-sm font-bold text-slate-700">
                {property_type === 'pozemek' ? 'Typ pozemku' : 'Dispozice'} *
              </label>
              <select
                id="disposition"
                name="disposition"
                bind:value={disposition}
                class="block w-full rounded-xl border-2 {getError('disposition') ? 'border-rose-300 bg-rose-50' : 'border-transparent bg-slate-100'} px-4 py-3.5 text-slate-900 transition-all hover:bg-slate-200/50 focus:border-indigo-500 focus:bg-white focus:ring-0"
              >
                <option value="">
                  {property_type === 'pozemek' ? 'Vyberte typ pozemku...' : 'Vyberte dispozici...'}
                </option>
                {#each getDispositionOptions() as option}
                  <option value={option}>{option}</option>
                {/each}
              </select>
              {#if getError('disposition')}<p class="mt-2 text-sm font-medium text-rose-500">{getError('disposition')}</p>{/if}
            </div>

            <div>
              <label for="condition" class="mb-1.5 block text-sm font-bold text-slate-700">Aktuální stav</label>
              <select
                id="condition"
                name="condition"
                bind:value={condition}
                class="block w-full rounded-xl border-2 border-transparent bg-slate-100 px-4 py-3.5 text-slate-900 transition-all hover:bg-slate-200/50 focus:border-indigo-500 focus:bg-white focus:ring-0"
              >
                <option value="">Zvolte z možností...</option>
                <option value="novostavba">Novostavba / Perfektní stav</option>
                <option value="po_rekonstrukci">Po kompletní rekonstrukci</option>
                <option value="dobry_stav">Dobrý stav (udržované)</option>
                <option value="puvodni_stav">Původní stav (před rekonstrukcí)</option>
              </select>
            </div>
          </div>
        {/if}

        {#if step === 3}
          <div in:fly={{ x: 20, duration: 400, delay: 100 }} class="grid gap-5 md:grid-cols-2">
            <div class="md:col-span-2">
              <label for="full_name" class="mb-1.5 block text-sm font-bold text-slate-700">Vaše jméno a příjmení *</label>
              <input
                id="full_name"
                name="full_name"
                bind:value={full_name}
                placeholder="Např. Jan Novák"
                class="block w-full rounded-xl border-2 {getError('full_name') ? 'border-rose-300 bg-rose-50' : 'border-transparent bg-slate-100'} px-4 py-3.5 text-slate-900 transition-all hover:bg-slate-200/50 focus:border-indigo-500 focus:bg-white focus:ring-0"
              />
              {#if getError('full_name')}<p class="mt-2 text-sm font-medium text-rose-500">{getError('full_name')}</p>{/if}
            </div>

            <div>
              <label for="email" class="mb-1.5 block text-sm font-bold text-slate-700">E-mailová adresa *</label>
              <input
                id="email"
                name="email"
                type="email"
                bind:value={email}
                placeholder="vas@email.cz (kam zašleme odhad)"
                class="block w-full rounded-xl border-2 {getError('email') ? 'border-rose-300 bg-rose-50' : 'border-transparent bg-slate-100'} px-4 py-3.5 text-slate-900 transition-all hover:bg-slate-200/50 focus:border-indigo-500 focus:bg-white focus:ring-0"
              />
              {#if getError('email')}<p class="mt-2 text-sm font-medium text-rose-500">{getError('email')}</p>{/if}
            </div>

            <div>
              <label for="phone" class="mb-1.5 block text-sm font-bold text-slate-700">Telefonní číslo *</label>
              <input
                id="phone"
                name="phone"
                bind:value={phone}
                placeholder="+420 (pro případné doplňující dotazy)"
                class="block w-full rounded-xl border-2 {getError('phone') ? 'border-rose-300 bg-rose-50' : 'border-transparent bg-slate-100'} px-4 py-3.5 text-slate-900 transition-all hover:bg-slate-200/50 focus:border-indigo-500 focus:bg-white focus:ring-0"
              />
              {#if getError('phone')}<p class="mt-2 text-sm font-medium text-rose-500">{getError('phone')}</p>{/if}
            </div>
          </div>
        {/if}

        {#if step === 4}
          <div in:fly={{ x: 20, duration: 400, delay: 100 }} class="space-y-6">
            <div>
              <label class="mb-1.5 block text-sm font-bold text-slate-700">Fotografie nemovitosti (nepovinné, max 10)</label>
              <div class="mt-2 flex justify-center rounded-xl border-2 border-dashed border-slate-300 px-6 py-8 transition-colors hover:bg-slate-50">
                <div class="text-center">
                  <svg class="mx-auto h-10 w-10 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>
                  <div class="mt-4 flex justify-center text-sm leading-6 text-slate-600">
                    <label for="images" class="relative cursor-pointer rounded-md bg-transparent font-semibold text-indigo-600 focus-within:outline-none hover:text-indigo-500">
                      <span>Vybrat fotky z PC nebo mobilu</span>
                      <input id="images" name="images" type="file" multiple accept="image/jpeg, image/png, image/webp" class="sr-only" onchange={handleFileChange} bind:this={fileInput}>
                    </label>
                  </div>
                  <p class="mt-1 text-xs leading-5 text-slate-500">PNG, JPG, WEBP</p>
                </div>
              </div>

              {#if fileError}
                <p class="mt-2 text-sm font-medium text-rose-500">{fileError}</p>
              {/if}

              {#if selectedFiles.length > 0}
                <div class="mt-4 grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-5">
                  {#each selectedFiles as file, index}
                    <div class="group relative aspect-square overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
                      <img src={URL.createObjectURL(file)} alt="Náhled" class="h-full w-full object-cover" />
                      <button type="button" onclick={() => removeFile(index)} class="absolute right-1.5 top-1.5 rounded-full bg-slate-900/70 p-1.5 text-white opacity-0 backdrop-blur-sm transition-opacity hover:bg-rose-600 group-hover:opacity-100">
                        <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                      </button>
                    </div>
                  {/each}
                </div>
                <p class="mt-2 text-xs font-medium text-slate-500">Vybráno {selectedFiles.length} / 10</p>
              {/if}
            </div>

            <div>
              <label for="note" class="mb-1.5 block text-sm font-bold text-slate-700">Chcete nám k nemovitosti ještě něco upřesnit?</label>
              <textarea
                id="note"
                name="note"
                bind:value={note}
                rows="4"
                placeholder="Např. k bytu patří garáž, dům má novou střechu, pozemek je ve svahu..."
                class="block w-full rounded-xl border-2 border-transparent bg-slate-100 px-4 py-3.5 text-slate-900 transition-all hover:bg-slate-200/50 focus:border-indigo-500 focus:bg-white focus:ring-0"
              ></textarea>
            </div>

            <div class="rounded-2xl bg-indigo-50/50 p-5 ring-1 {getError('consent') ? 'ring-rose-300' : 'ring-indigo-100'}">
              <div class="flex items-start gap-3">
                <div class="flex h-6 items-center">
                  <input
                    id="consent"
                    name="consent"
                    type="checkbox"
                    bind:checked={consent}
                    class="h-5 w-5 rounded border-indigo-200 text-indigo-600 focus:ring-indigo-600"
                  />
                </div>
                <label for="consent" class="text-sm leading-6 text-slate-700">
                  Rozumím a souhlasím se <a href="#" class="font-semibold text-indigo-600 underline decoration-indigo-200 underline-offset-2 hover:text-indigo-800">zpracováním údajů</a> pro vypracování posouzení tržní ceny. *
                </label>
              </div>
              {#if getError('consent')}<p class="mt-2 pl-8 text-sm font-medium text-rose-500">{getError('consent')}</p>{/if}
            </div>
          </div>
        {/if}

        <div class="mt-12 flex items-center justify-between border-t border-slate-100 pt-6">
          <button
            type="button"
            onclick={prevStep}
            class="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-bold text-slate-500 transition-all hover:bg-slate-100 hover:text-slate-900 {step === 1 ? 'invisible' : 'visible'}"
          >
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" /></svg>
            Zpět
          </button>

          {#if step < totalSteps}
            <button
              type="button"
              onclick={nextStep}
              class="flex items-center gap-2 rounded-xl bg-slate-900 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-slate-900/20 transition-all active:translate-y-0 hover:-translate-y-0.5 hover:bg-indigo-600 hover:shadow-indigo-600/25"
            >
              Pokračovat k dalšímu kroku
              <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
            </button>
          {:else}
            <button
              type="submit"
              class="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-8 py-4 text-base font-bold text-white shadow-xl shadow-indigo-600/30 transition-all active:translate-y-0 hover:-translate-y-0.5 hover:bg-indigo-500 sm:w-auto"
            >
              Odeslat k bezplatnému ocenění
              <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
            </button>
          {/if}
        </div>
      </form>
    </div>
  </div>
</section>