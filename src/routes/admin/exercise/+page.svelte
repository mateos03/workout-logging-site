<script lang="ts">
  import { confirmDelete } from '$lib';

  const { data } = $props();

  let searchInput = $state("")
</script>

<div class="">
  <div class="py-5 border-b flex justify-between items-center">
    <div class="text-3xl">Public Exercises</div>
    <a href="/admin/exercise/new" class="border rounded-lg p-1.5 bg-green-800">New Exercise</a>
  </div>
  <div class="border-b">
    <input bind:value={searchInput} placeholder="Search..." class="bg-slate-800 rounded-full px-5 w-full my-2 text-lg"/>
  </div>
  {#each data.exercises.filter((exercise) => exercise.name.toLowerCase().includes(searchInput.toLowerCase())) as exercise}
    <div class="text-2xl pt-2">{exercise.name}</div>
    <div class="py-4 pt-3 border-b flex justify-start items-center w-full gap-x-3">
      <a href="/admin/exercise/edit/{exercise.id}" class="border rounded-md p-1 bg-slate-800 w-1/2 text-center text-lg">Edit</a>
      <form class="w-1/2" method="POST">
        <button name="exercise_id" value={exercise.id} class="bg-red-800 p-1 w-full rounded-md border text-lg" onclick={(event) => confirmDelete(event, `Are you sure you want to delete ${exercise.name}`)}>Delete</button>
      </form>
    </div>
  {/each}
</div>