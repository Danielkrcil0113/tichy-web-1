<script lang="ts">
  let { form } = $props();
</script>

<section class="min-h-screen bg-slate-950 px-4 py-10 text-white">
  <div class="mx-auto max-w-sm rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl">
    <h1 class="text-2xl font-bold">Admin přihlášení</h1>
    <p class="mt-2 text-sm text-slate-400">
      Pošlu ti přihlašovací odkaz na e-mail.
    </p>

    <form method="POST" class="mt-6 space-y-4">
      <input
        name="email"
        type="email"
        placeholder="tvuj@email.cz"
        class="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3"
      />

      <button
        type="submit"
        class="w-full rounded-2xl bg-indigo-600 px-4 py-3 font-semibold text-white"
      >
        Poslat magic link
      </button>
    </form>

    {#if form?.message}
      <p class="mt-4 text-sm text-rose-300">{form.message}</p>
    {/if}

    {#if form?.success}
      <p class="mt-4 text-sm text-emerald-300">Odkaz byl odeslaný.</p>
    {/if}
  </div>
</section>