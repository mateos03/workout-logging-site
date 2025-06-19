<script lang="ts">
  import { capitalize } from "$lib";
  const links: string[] = ["exercise", "tag"];
</script>

<div class="">
  <div class="border-b text-4xl py-5 text-center">Admin Page</div>
  {#each links as link}
    <a href="/admin/{link}" class="text-3xl py-3 block text-center border rounded-lg mt-5 bg-slate-800">{capitalize(link)}s</a>
  {/each}
</div>