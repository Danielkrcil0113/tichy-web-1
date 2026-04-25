<script lang="ts">
  import AddressSearch from './../AdressSearch.svelte';
  import { enhance } from '$app/forms';
  import type { SubmitFunction } from '@sveltejs/kit';
  import { resolve } from '$app/paths';
  import { fade, fly } from 'svelte/transition';
  import { untrack } from 'svelte';

  type FormShape =
    | {
        success?: boolean;
        message?: string;
        errors?: Record<string, string[]>;
        values?: Record<string, string | number | boolean | null | undefined>;
      }
    | null
    | undefined;

  let {
    form,
    property_type,
    onBack
  }: {
    form: FormShape;
    property_type: string;
    onBack: () => void;
  } = $props();

  function getInit<T>(field: string, fallback: T): T {
    const value = form?.values?.[field];

    if (value == null) return fallback;

    if (typeof fallback === 'boolean') {
      return (value === 'true' || value === 'on' || value === '1' || value === true) as unknown as T;
    }

    return String(value) as unknown as T;
  }

  const totalSteps = 4;

  let step = $state(
    untrack(() => {
      const s = Number(form?.values?.current_step);
      return Number.isInteger(s) && s >= 1 && s <= totalSteps ? s : 1;
    })
  );

  let localSuccess = $state(false);
  let submittedSuccess = $derived(localSuccess || form?.success === true);

  let isSubmitting = $state(false);

  let purpose = $state(untrack(() => getInit<string>('purpose', 'prodavam')));
  let city = $state(untrack(() => getInit<string>('city', '')));
  let area_m2 = $state(untrack(() => getInit<string>('area_m2', '')));
  let disposition = $state(untrack(() => getInit<string>('disposition', '')));
  let condition = $state(untrack(() => getInit<string>('condition', '')));
  let elevator = $state(untrack(() => getInit<string>('elevator', '')));
  let full_name = $state(untrack(() => getInit<string>('full_name', '')));
  let email = $state(untrack(() => getInit<string>('email', '')));
  let phone = $state(untrack(() => getInit<string>('phone', '')));
  let note = $state(untrack(() => getInit<string>('note', '')));
  let consent = $state(untrack(() => getInit<boolean>('consent', false)));

  let fileInput = $state<HTMLInputElement | null>(null);
  let selectedFiles = $state<File[]>([]);
  let previewUrls = $state<string[]>([]);
  let fileError = $state('');

  let localErrors = $state<Record<string, string>>({});

  const purposeOptions = [
    {
      id: 'prodavam',
      label: 'Prodávám nemovitost',
      description: 'Chci znát reálnou tržní cenu před prodejem.'
    },
    {
      id: 'kupuji',
      label: 'Kupuji nemovitost',
      description: 'Chci ověřit, zda nabízená cena odpovídá trhu.'
    },
    {
      id: 'dedictvi',
      label: 'Dědictví',
      description: 'Potřebuji odhad pro dědické řízení nebo rozdělení majetku.'
    },
    {
      id: 'sjm_rozvod',
      label: 'Vypořádání SJM při rozvodu',
      description: 'Potřebuji cenu nemovitosti pro férové majetkové vypořádání.'
    },
    {
      id: 'jine',
      label: 'Jiný důvod',
      description: 'Například orientační odhad, refinancování nebo jiné účely.'
    }
  ];

  const dispositionOptionsByType: Record<string, string[]> = {
    byt: ['1+kk', '1+1', '2+kk', '2+1', '3+kk', '3+1', '4+kk', '4+1', '5+kk', '5+1', '6+ a více', 'atypické'],
    dum: ['2+kk', '3+kk', '3+1', '4+kk', '4+1', '5+kk', '5+1', '6+ a více', 'bungalov', 'patrový', 'řadový', 'dvougenerační'],
    ostatni: ['stavební pozemek', 'zahrada', 'orná půda', 'kanceláře', 'obchodní prostor', 'garáž', 'ostatní']
  };

  function getDispositionOptions() {
    return dispositionOptionsByType[property_type] ?? dispositionOptionsByType['ostatni'];
  }

  function getPhotoHint() {
    if (property_type === 'byt') {
      return 'U bytu doporučujeme přiložit fotky hlavních pokojů, kuchyně, koupelny, WC, chodby, výhledu z okna, případně balkonu, sklepa, společných prostor a výtahu.';
    }

    if (property_type === 'dum') {
      return 'U domu doporučujeme přiložit fotky exteriéru, zahrady, střechy, fasády, kuchyně, koupelny, pokojů, technické místnosti, sklepa, garáže a příjezdové cesty.';
    }

    return 'U pozemku doporučujeme přiložit fotky celého pozemku, příjezdové cesty, okolí, hranic pozemku, terénu a případných inženýrských sítí.';
  }

  const handleSubmit: SubmitFunction = () => {
    isSubmitting = true;

    return async ({ result, update }) => {
      isSubmitting = false;
      await update({ reset: false });

      if (result.type === 'success') {
        const data = result.data as FormShape;
        if (data?.success) localSuccess = true;
      }
    };
  };

  $effect(() => {
    const options = getDispositionOptions();

    if (disposition && !options.includes(disposition)) {
      untrack(() => {
        disposition = '';
      });
    }

    if (property_type !== 'byt' && elevator) {
      untrack(() => {
        elevator = '';
      });
    }
  });

  $effect(() => {
    const currentUrls = selectedFiles.map((file) => URL.createObjectURL(file));
    previewUrls = currentUrls;

    return () => currentUrls.forEach((url) => URL.revokeObjectURL(url));
  });

  $effect(() => {
    const submittedStep = Number(form?.values?.current_step);

    if (!form?.success && submittedStep >= 1 && submittedStep <= totalSteps) {
      untrack(() => {
        step = submittedStep;
      });
    }
  });

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
    const total = selectedFiles.length + newFiles.length;

    if (total > 10) {
      const allowed = 10 - selectedFiles.length;
      fileError = 'Můžete nahrát maximálně 10 fotografií.';
      selectedFiles = [...selectedFiles, ...newFiles.slice(0, Math.max(allowed, 0))];
    } else {
      fileError = '';
      selectedFiles = [...selectedFiles, ...newFiles];
    }

    updateNativeInput();
  }

  function removeFile(index: number) {
    selectedFiles = selectedFiles.filter((_, i) => i !== index);

    if (selectedFiles.length <= 10) {
      fileError = '';
    }

    updateNativeInput();
  }

  function validateStep(currentStep: number): boolean {
    localErrors = {};
    let isValid = true;

    if (currentStep === 1) {
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

      if (property_type === 'byt' && !elevator) {
        localErrors.elevator = 'Vyberte prosím, zda je v domě výtah.';
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
    } else if (currentStep === 4) {
      if (!consent) {
        localErrors.consent = 'Je potřeba souhlasit se zpracováním údajů.';
        isValid = false;
      }
    }

    return isValid;
  }

  function nextStep() {
    if (validateStep(step) && step < totalSteps) {
      step += 1;
    }
  }

  function prevStep() {
    if (step > 1) {
      step -= 1;
    }
  }

  function getError(field: string): string | undefined {
    return localErrors[field] || (form?.errors && form.errors[field] ? form.errors[field][0] : undefined);
  }

  const propertyTypeLabels: Record<string, string> = {
    byt: 'Byt',
    dum: 'Rodinný dům',
    ostatni: 'Pozemek / Ostatní'
  };
</script>

<div class="relative overflow-hidden rounded-4xl bg-white p-6 shadow-2xl shadow-slate-200/50 ring-1 ring-slate-100 sm:p-12">
  {#if submittedSuccess}
    <div
      in:fade
      class="flex min-h-80 flex-col items-center justify-center rounded-4xl border border-emerald-200 bg-emerald-50 p-8 text-center"
    >
      <div class="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg shadow-emerald-600/20">
        <svg class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
      </div>

      <h3 class="mt-6 text-2xl font-extrabold text-slate-900">
        Poptávka byla úspěšně odeslána
      </h3>

      <p class="mt-3 max-w-xl leading-7 text-slate-600">
        Děkujeme za důvěru. Vaše údaje jsme přijali a brzy se vám ozveme s dalším postupem.
      </p>
    </div>
  {:else}
    <div class="mb-8 flex items-center justify-between border-b border-slate-100 pb-5">
      <div class="flex items-center gap-3">
        <span class="text-sm font-semibold uppercase tracking-wide text-slate-500">Vybráno:</span>
        <span class="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3.5 py-1.5 text-sm font-bold text-indigo-700">
          {propertyTypeLabels[property_type] || 'Neznámý typ'}
        </span>
      </div>

      <button
        type="button"
        aria-label="Změnit typ nemovitosti"
        onclick={onBack}
        class="text-sm font-semibold text-slate-500 transition-colors hover:text-indigo-600"
      >
        &larr; Změnit typ
      </button>
    </div>

    <div class="mb-10">
      <div class="flex items-center justify-between">
        {#each Array.from({ length: totalSteps }, (_, index) => index + 1) as stepNumber (stepNumber)}
          <div class="flex flex-col items-center gap-2">
            <div
              class={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition-colors duration-300 ${
                step >= stepNumber ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400'
              }`}
            >
              {stepNumber}
            </div>
          </div>

          {#if stepNumber < totalSteps}
            <div class={`mx-2 h-0.5 flex-1 transition-colors duration-300 ${step > stepNumber ? 'bg-indigo-600' : 'bg-slate-100'}`}></div>
          {/if}
        {/each}
      </div>

      <div class="mt-3 flex justify-between px-1 text-xs font-medium text-slate-400">
        <span class={step >= 1 ? 'text-indigo-600' : ''}>Účel</span>
        <span class={`${step >= 2 ? 'text-indigo-600' : ''} ml-2`}>Detaily</span>
        <span class={`${step >= 3 ? 'text-indigo-600' : ''} mr-2`}>Kontakt</span>
        <span class={step >= 4 ? 'text-indigo-600' : ''}>Dokončení</span>
      </div>
    </div>

    {#if form?.message && !form?.success}
      <div in:fade class="mb-8 flex items-center gap-3 rounded-2xl border border-rose-200 bg-rose-50 p-5 text-rose-700">
        <svg class="h-6 w-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3Z"
          />
        </svg>

        <span class="font-medium">{form.message}</span>
      </div>
    {/if}

    <form method="POST" enctype="multipart/form-data" class="min-h-80" novalidate use:enhance={handleSubmit}>
      <input type="hidden" name="current_step" value={step} />
      <input type="hidden" name="property_type" value={property_type} />
      <input type="hidden" name="city" value={city} />
      <input type="hidden" name="area_m2" value={area_m2} />
      <input type="hidden" name="disposition" value={disposition} />
      <input type="hidden" name="condition" value={condition} />
      <input type="hidden" name="elevator" value={elevator} />
      <input type="hidden" name="full_name" value={full_name} />
      <input type="hidden" name="email" value={email} />
      <input type="hidden" name="phone" value={phone} />
      <input type="hidden" name="note" value={note} />

      {#if step === 1}
        <div in:fly={{ x: 20, duration: 400, delay: 100 }} class="space-y-8">
          <div>
            <label for="purpose_step" class="mb-4 block text-sm font-bold uppercase tracking-wide text-slate-800">
              Z jakého důvodu odhad potřebujete?
            </label>

            <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {#each purposeOptions as p (p.id)}
                <button
                  type="button"
                  aria-label={`Zvolit účel: ${p.label}`}
                  onclick={() => (purpose = p.id)}
                  class={`rounded-xl border-2 p-4 text-left text-sm font-semibold transition-all duration-200 ${
                    purpose === p.id
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-sm'
                      : 'border-slate-100 bg-white text-slate-600 hover:border-indigo-200 hover:bg-slate-50'
                  }`}
                >
                  <span class="block text-base">{p.label}</span>
                  <span class="mt-1 block text-xs font-medium leading-5 text-slate-500">
                    {p.description}
                  </span>
                </button>
              {/each}
            </div>

            <input type="hidden" name="purpose" value={purpose} />

            {#if getError('purpose')}
              <p class="mt-2 text-sm font-medium text-rose-500">{getError('purpose')}</p>
            {/if}
          </div>
        </div>
      {/if}

      {#if step === 2}
        <div in:fly={{ x: 20, duration: 400, delay: 100 }} class="grid gap-5 md:grid-cols-2">
          <div class="md:col-span-2">
            <AddressSearch bind:city error={getError('city')} />
          </div>

          <div>
            <label for="area_m2_visible" class="mb-1.5 block text-sm font-bold text-slate-700">
              Užitná plocha v m² *
            </label>

            <input
              id="area_m2_visible"
              type="number"
              bind:value={area_m2}
              placeholder="Např. 68"
              class={`block w-full rounded-xl border-2 px-4 py-3.5 text-slate-900 transition-all hover:bg-slate-200/50 focus:border-indigo-500 focus:bg-white focus:ring-0 ${
                getError('area_m2') ? 'border-rose-300 bg-rose-50' : 'border-transparent bg-slate-100'
              }`}
            />

            {#if getError('area_m2')}
              <p class="mt-2 text-sm font-medium text-rose-500">{getError('area_m2')}</p>
            {/if}
          </div>

          <div>
            <label for="disposition_visible" class="mb-1.5 block text-sm font-bold text-slate-700">
              {property_type === 'ostatni' ? 'Typ pozemku / prostoru' : 'Dispozice'} *
            </label>

            <select
              id="disposition_visible"
              bind:value={disposition}
              class={`block w-full rounded-xl border-2 px-4 py-3.5 text-slate-900 transition-all hover:bg-slate-200/50 focus:border-indigo-500 focus:bg-white focus:ring-0 ${
                getError('disposition') ? 'border-rose-300 bg-rose-50' : 'border-transparent bg-slate-100'
              }`}
            >
              <option value="">Vyberte možnost...</option>

              {#each getDispositionOptions() as option (option)}
                <option value={option}>{option}</option>
              {/each}
            </select>

            {#if getError('disposition')}
              <p class="mt-2 text-sm font-medium text-rose-500">{getError('disposition')}</p>
            {/if}
          </div>

          <div>
            <label for="condition_visible" class="mb-1.5 block text-sm font-bold text-slate-700">
              Aktuální stav
            </label>

            <select
              id="condition_visible"
              bind:value={condition}
              class="block w-full rounded-xl border-2 border-transparent bg-slate-100 px-4 py-3.5 text-slate-900 transition-all hover:bg-slate-200/50 focus:border-indigo-500 focus:bg-white focus:ring-0"
            >
              <option value="">Zvolte z možností...</option>
              <option value="novostavba">Novostavba / perfektní stav</option>
              <option value="po_rekonstrukci">Po kompletní rekonstrukci</option>
              <option value="dobry_stav">Dobrý stav, udržované</option>
              <option value="puvodni_stav">Původní stav, před rekonstrukcí</option>
            </select>
          </div>

          {#if property_type === 'byt'}
            <div>
              <label for="elevator_visible" class="mb-1.5 block text-sm font-bold text-slate-700">
                Je v domě výtah? *
              </label>

              <select
                id="elevator_visible"
                bind:value={elevator}
                class={`block w-full rounded-xl border-2 px-4 py-3.5 text-slate-900 transition-all hover:bg-slate-200/50 focus:border-indigo-500 focus:bg-white focus:ring-0 ${
                  getError('elevator') ? 'border-rose-300 bg-rose-50' : 'border-transparent bg-slate-100'
                }`}
              >
                <option value="">Vyberte možnost...</option>
                <option value="ano">Ano</option>
                <option value="ne">Ne</option>
                <option value="nevim">Nevím</option>
              </select>

              {#if getError('elevator')}
                <p class="mt-2 text-sm font-medium text-rose-500">{getError('elevator')}</p>
              {/if}
            </div>
          {/if}
        </div>
      {/if}

      {#if step === 3}
        <div in:fly={{ x: 20, duration: 400, delay: 100 }} class="grid gap-5 md:grid-cols-2">
          <div class="md:col-span-2">
            <label for="full_name_visible" class="mb-1.5 block text-sm font-bold text-slate-700">
              Vaše jméno a příjmení *
            </label>

            <input
              id="full_name_visible"
              bind:value={full_name}
              placeholder="Např. Jan Novák"
              class={`block w-full rounded-xl border-2 px-4 py-3.5 text-slate-900 transition-all hover:bg-slate-200/50 focus:border-indigo-500 focus:bg-white focus:ring-0 ${
                getError('full_name') ? 'border-rose-300 bg-rose-50' : 'border-transparent bg-slate-100'
              }`}
            />

            {#if getError('full_name')}
              <p class="mt-2 text-sm font-medium text-rose-500">{getError('full_name')}</p>
            {/if}
          </div>

          <div>
            <label for="email_visible" class="mb-1.5 block text-sm font-bold text-slate-700">
              E-mailová adresa *
            </label>

            <input
              id="email_visible"
              type="email"
              bind:value={email}
              placeholder="vas@email.cz"
              class={`block w-full rounded-xl border-2 px-4 py-3.5 text-slate-900 transition-all hover:bg-slate-200/50 focus:border-indigo-500 focus:bg-white focus:ring-0 ${
                getError('email') ? 'border-rose-300 bg-rose-50' : 'border-transparent bg-slate-100'
              }`}
            />

            {#if getError('email')}
              <p class="mt-2 text-sm font-medium text-rose-500">{getError('email')}</p>
            {/if}
          </div>

          <div>
            <label for="phone_visible" class="mb-1.5 block text-sm font-bold text-slate-700">
              Telefonní číslo *
            </label>

            <input
              id="phone_visible"
              bind:value={phone}
              placeholder="+420"
              class={`block w-full rounded-xl border-2 px-4 py-3.5 text-slate-900 transition-all hover:bg-slate-200/50 focus:border-indigo-500 focus:bg-white focus:ring-0 ${
                getError('phone') ? 'border-rose-300 bg-rose-50' : 'border-transparent bg-slate-100'
              }`}
            />

            {#if getError('phone')}
              <p class="mt-2 text-sm font-medium text-rose-500">{getError('phone')}</p>
            {/if}
          </div>
        </div>
      {/if}

      {#if step === 4}
        <div in:fly={{ x: 20, duration: 400, delay: 100 }} class="space-y-6">
          <div>
            <span class="mb-1.5 block text-sm font-bold text-slate-700">
              Fotografie nemovitosti
              <span class="font-medium text-slate-400">(nepovinné, max 10)</span>
            </span>

            <p class="mb-4 rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-600 ring-1 ring-slate-100">
              {getPhotoHint()}
            </p>

            <div class="mt-2 flex justify-center rounded-xl border-2 border-dashed border-slate-300 px-6 py-8 transition-colors hover:bg-slate-50">
              <div class="text-center">
                <svg class="mx-auto h-10 w-10 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5z"
                  />
                </svg>

                <div class="mt-4 flex justify-center text-sm leading-6 text-slate-600">
                  <label for="images" class="relative cursor-pointer rounded-md bg-transparent font-semibold text-indigo-600 hover:text-indigo-500">
                    <span>Vybrat fotky z PC nebo mobilu</span>

                    <input
                      id="images"
                      name="images"
                      type="file"
                      multiple
                      accept="image/jpeg, image/png, image/webp"
                      class="sr-only"
                      onchange={handleFileChange}
                      bind:this={fileInput}
                    />
                  </label>
                </div>

                <p class="mt-1 text-xs leading-5 text-slate-500">
                  PNG, JPG, WEBP
                </p>
              </div>
            </div>

            {#if fileError}
              <p class="mt-2 text-sm font-medium text-rose-500">{fileError}</p>
            {/if}

            {#if selectedFiles.length > 0}
              <div class="mt-4 grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-5">
                {#each previewUrls as previewUrl, index (index)}
                  <div class="group relative aspect-square overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
                    <img src={previewUrl} alt="Náhled" class="h-full w-full object-cover" />

                    <button
                      type="button"
                      onclick={() => removeFile(index)}
                      class="absolute right-1.5 top-1.5 rounded-full bg-slate-900/70 p-1.5 text-white opacity-0 backdrop-blur-sm transition-opacity hover:bg-rose-600 group-hover:opacity-100"
                      aria-label="Odstranit fotografii"
                    >
                      <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                {/each}
              </div>
            {/if}
          </div>

          <div>
            <label for="note_visible" class="mb-1.5 block text-sm font-bold text-slate-700">
              Chcete nám k nemovitosti ještě něco upřesnit?
            </label>

            <textarea
              id="note_visible"
              bind:value={note}
              rows="4"
              placeholder="Např. k bytu patří garáž, dům má novou střechu, pozemek má přípojky na hranici..."
              class="block w-full rounded-xl border-2 border-transparent bg-slate-100 px-4 py-3.5 text-slate-900 transition-all hover:bg-slate-200/50 focus:border-indigo-500 focus:bg-white focus:ring-0"
            ></textarea>
          </div>

          <div class={`rounded-2xl bg-indigo-50/50 p-5 ${getError('consent') ? 'ring-1 ring-rose-300' : 'ring-1 ring-indigo-100'}`}>
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
                Rozumím a souhlasím se
                <a
                  href={resolve('/gdpr')}
                  class="font-semibold text-indigo-600 underline decoration-indigo-200 underline-offset-2 hover:text-indigo-800"
                >
                  zpracováním údajů
                </a>
                pro vypracování posouzení tržní ceny. *
              </label>
            </div>

            {#if getError('consent')}
              <p class="mt-2 pl-8 text-sm font-medium text-rose-500">{getError('consent')}</p>
            {/if}
          </div>
        </div>
      {/if}

      <div class="mt-12 flex items-center justify-between border-t border-slate-100 pt-6">
        <button
          type="button"
          aria-label="Vrátit se o krok zpět"
          onclick={prevStep}
          class={`flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-bold text-slate-500 transition-all hover:bg-slate-100 hover:text-slate-900 ${
            step === 1 ? 'invisible' : 'visible'
          }`}
        >
          <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          Zpět
        </button>

        {#if step < totalSteps}
          <button
            type="button"
            aria-label="Pokračovat na další krok"
            onclick={nextStep}
            class="flex items-center gap-2 rounded-xl bg-slate-900 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-slate-900/20 transition-all hover:-translate-y-0.5 hover:bg-indigo-600 hover:shadow-indigo-600/25 active:translate-y-0"
          >
            Další krok

            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </button>
        {:else}
          <button
            type="submit"
            aria-label="Odeslat formulář k ocenění"
            disabled={isSubmitting}
            class="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-8 py-4 text-base font-bold text-white shadow-xl shadow-indigo-600/30 transition-all hover:-translate-y-0.5 hover:bg-indigo-500 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
          >
            {isSubmitting ? 'Odesílám...' : 'Odeslat k ocenění'}

            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </button>
        {/if}
      </div>
    </form>
  {/if}
</div>