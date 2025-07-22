<script lang="ts">
  import { enhance } from '$app/forms';
    import { confirmDelete } from '$lib';

  let { data, form } = $props();

  let setNumber = $state<number>(data.sets.length);
</script>

<div>
  <div class="flex items-center justify-between border-b">
    <div class="text-4xl py-5">{data.exerciseName}</div>
    <button class="text-2xl border-2 border-green-700 rounded-md p-1.5 bg-green-900">Finish</button>
  </div>
  {#if data.sets.length != 0}
    <div class="border-b pt-3 pb-1">
      <div class="border-b border-slate-500 pb-3 text-3xl text-center flex items-center justify-start">
        <div class="w-1/3">Set</div>
        <div class="w-1/3">Weight</div>
        <div class="w-1/3">Reps</div>
      </div>
      {#each data.sets as sets}
        <div class="flex justify-start items-center py-2 text-4xl text-center {sets.setNumber != 1 ? "border-t border-slate-500" : ""}">
          <div class="w-1/3">{sets.setNumber}</div>
          <div class="w-1/3">{sets.weight}</div>
          <div class="w-1/3">{sets.reps}</div>
        </div>
      {/each}
    </div>
  {:else}
    <div class="py-3 border-b text-3xl">No Sets Registered</div>
  {/if}
  <form method="POST" action="?/new_set" class="py-4 border-b" use:enhance>
    <div class="flex items-center gap-x-5 text-3xl pb-4">
      <label class="w-1/2" for="weight-input">Weight:</label>
      <label class="w-1/2" for="reps-input">Reps:</label>
    </div>
    <div class="flex items-center gap-x-5 pb-3">
      <input type="number" class="w-1/2 bg-slate-800 rounded-sm text-4xl p-1" id="weight-input" name="set_weight"/>
      <input type="number" class="w-1/2 bg-slate-800 rounded-sm text-4xl p-1" id="reps-input" name="set_reps"/>
    </div>
    <input hidden value={setNumber+1} name="set_number"/>
    <button class="border-2 border-green-700 p-4 text-3xl w-full bg-green-900 rounded-md">Submit Set</button>
    <p style='color: red'>{form?.message ?? ''}</p>
  </form>
  <div class="flex items-center justify-between gap-x-3 mt-4">
    <button class="border-2 p-2 w-1/2 rounded-md text-2xl bg-slate-800 border-slate-700">Edit Sets</button>
    <form method="POST" use:enhance action="?/delete_exercise" class="border-2 rounded-md text-2xl p-2 w-1/2 text-center bg-red-900 border-red-800">
      <button class="size-full" onclick={(event) => confirmDelete(event, "Are you sure you want to delete this exercise from the workout?")}>Delete</button>
    </form>
  </div>
  <p style='color: red'>{form?.message_delete ?? ''}</p>
</div>