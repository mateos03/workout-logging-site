<script lang="ts">
  const { data, form } = $props();
</script>

<div class="">
  <div class="py-5 border-b flex justify-between items-center">
    <div class="text-3xl">Public Exercises</div>
    <a href="/admin/exercise/new" class="border rounded-lg p-1.5 bg-green-800">New Exercise</a>
  </div>
  {#each data.exercises as exercise}
    <div class="text-2xl pt-2">{exercise.name}</div>
    <div class="py-4 pt-3 border-b flex justify-start items-center w-full gap-x-3">
      <a href="/admin/exercise/edit/{exercise.id}" class="border rounded-md p-1 bg-slate-800 w-1/2 text-center text-lg">Edit</a>
      <form class="w-1/2" method="POST">
        <button name="exercise_id" value={exercise.id} class="bg-red-800 p-1 w-full rounded-md border text-lg">Delete</button>
      </form>
    </div>
  {/each}
</div>