<script lang="ts">
  let {dialog = $bindable(), title, children} = $props();
</script>

<dialog bind:this={dialog} class="" onclose={() => {}}>
  <div class="fixed size-full z-1 flex justify-center items-center text-white">
    <div class="border-2 w-4/5 h-3/4 p-6 pt-1 rounded-2xl bg-slate-900">
      <div class="flex items-center justify-center pt-3 pb-4">
        <div class="w-1/2 text-3xl">{title}</div>
        <button class="text-right w-1/2 text-4xl" onclick={() => dialog.close()}>x</button>
      </div>
      <div>{@render children()}</div>
    </div>
  </div>    
</dialog>

