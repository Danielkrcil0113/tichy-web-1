<script lang="ts">
  // Načtení Tailwind stylů z vedlejšího souboru
  import './layout.css';

  // Svelte 5 syntaxe pro přijetí obsahu (podstránek)
  let { children } = $props();
</script>

<!-- Zde se vykreslí obsah tvých +page.svelte souborů -->
{@render children()}