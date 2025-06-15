<script lang="ts">
  let { red = false, extraClass = "", children, ...rest } = $props();
</script>

<button class="p-1 border rounded-md {red ? 'bg-red-800' : 'bg-green-800'} {extraClass}" {...rest}>
  {@render children()}  
</button>