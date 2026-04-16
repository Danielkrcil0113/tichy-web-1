<script lang="ts">
  import './layout.css';

  let { children } = $props();
</script>

<svelte:head>
  <!-- Základní SEO -->
  <title>Nejlepší odhady nemovitostí</title>

  <meta
    name="description"
    content="Zjistěte reálnou hodnotu vaší nemovitosti rychle, přesně a bez závazků. Nejlepší odhady nemovitostí na jednom místě."
  />

  <meta
    name="keywords"
    content="odhad nemovitosti, odhad bytu, odhad domu, odhad pozemku, cena nemovitosti, ocenění nemovitosti"
  />

  <meta name="author" content="Nejlepší odhady nemovitostí" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />

  <!-- Favicon -->
  <link rel="icon" href="/logo.jpeg" />
  <link rel="apple-touch-icon" href="/logo.jpeg" />

  <!-- Open Graph (Facebook, WhatsApp, Messenger...) -->
  <meta property="og:title" content="Nejlepší odhady nemovitostí" />

  <meta
    property="og:description"
    content="Zjistěte reálnou hodnotu vaší nemovitosti rychle, přesně a bez závazků."
  />

  <meta property="og:image" content="https://tichy-web-1.vercel.app/logo.jpeg" />

  <meta property="og:url" content="https://tichy-web-1.vercel.app" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Nejlepší odhady nemovitostí" />
  <meta property="og:locale" content="cs_CZ" />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Nejlepší odhady nemovitostí" />

  <meta
    name="twitter:description"
    content="Zjistěte reálnou hodnotu vaší nemovitosti rychle a bez závazků."
  />

  <meta name="twitter:image" content="https://tichy-web-1.vercel.app/logo.jpeg" />

  <!-- Theme -->
  <meta name="theme-color" content="#ffffff" />
</svelte:head>

{@render children()}