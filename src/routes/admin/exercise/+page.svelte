<script lang="ts">
  const { data, form } = $props();
</script>

<div class="">
  <div class="py-5 border-b flex justify-between items-center">
    <div class="text-3xl">Public Exercises</div>
    <a href="/admin/exercise/new" class="border rounded-lg p-1.5 bg-green-800">New Exercise</a>
  </div>
  {#each data.exercises as exercise}
    <div class="py-3 border-b flex justify-between items-center">
      <div class="text-xl w-1/3">{exercise.name}</div>
      <a href="/admin/exercise/{exercise.id}" class="border rounded-md p-1 bg-slate-800 w-1/3">Edit</a>
      <form>
        <button formaction="?/delete_exercise" class="bg-red-800 p-1 w-1/3 rounded-md border">Delete</button>
      </form>
    </div>
  {/each}
</div>