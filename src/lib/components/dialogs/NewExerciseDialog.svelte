<script lang="ts">
  let {dialog = $bindable(), children} = $props();
</script>

<dialog bind:this={dialog} class="" onclose={() => {}}>
  <div class="fixed size-full z-1 flex justify-center items-center text-white">
    <div class="border-2 w-4/5 h-3/4 p-6 pt-1 rounded-2xl bg-slate-900">
      <button class="text-right w-full text-4xl" onclick={() => dialog.close()}>x</button>
      <div>{@render children()}</div>
    </div>
  </div>    
</dialog>

