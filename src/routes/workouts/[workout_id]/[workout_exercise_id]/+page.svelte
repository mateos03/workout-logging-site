<script lang="ts">
  import { enhance } from '$app/forms';
  import { confirmDelete } from '$lib';

  let { data, form } = $props();

  let originalSets = $state(data.sets.map((sets) => ({ ...sets })));
  let allSets = $state(data.sets);
  let setNumber = $derived<number>(allSets.length);
  let editSets = $state<boolean>(false);

  $effect(() => {
    allSets = data.sets;
    originalSets = (data.sets.map((sets) => ({ ...sets })));
  });

  //Remove up or down for the bottom and top set
</script>

<div>
  <div class="flex items-center justify-start border-b">
    <a href={"/workouts/" + data.workoutId} class="block mr-3" aria-label="Move Back">
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white">
        <polyline points="16 20 7 12 16 4" />
      </svg>
    </a>
    <div class="text-4xl py-5">{data.exerciseName}</div>
    <button class="text-2xl border-2 border-green-700 rounded-md p-1.5 bg-green-900 ml-auto">Finish</button>
  </div>
  {#if allSets.length != 0}
    {#if editSets}
      <div class="border-b pt-3 pb-1">
        <div class="border-b border-slate-500 pb-3 text-3xl text-center flex items-center justify-start">
          <div class="w-1/3">Set</div>
          <div class="w-1/3">Weight</div>
          <div class="w-1/3">Reps</div>
        </div>
        {#each allSets as set, i}
          <form method="POST" use:enhance>
            <div class="flex justify-start items-center py-2 gap-x-3 text-4xl text-center {set.setNumber != 0 ? "border-t border-slate-500" : ""}">
              <div class="w-1/3">{i + 1}</div>
              <input class="w-1/3 bg-slate-800 rounded-sm p-1 text-4xl text-center" type="text" bind:value={set.weight}>
              <input class="w-1/3 bg-slate-800 rounded-sm p-1 text-4xl text-center" type="text" bind:value={set.reps}/>
            </div>
            <div class="flex justify-start items-center w-full mb-2 gap-x-3">
              {#if set.weight != originalSets.find((x) => x.id == set.id)?.weight || set.reps != originalSets.find((x) => x.id == set.id)?.reps}
                <button class="bg-green-900 border-2 border-green-800 w-1/2 rounded-md text-2xl p-1">Save</button>
                <button type="button" class="w-1/2 p-1 border-2 border-slate-700 bg-slate-800 rounded-md text-2xl" onclick={() => {
                  set.weight = originalSets[i].weight;
                  set.reps = originalSets[i].reps;
                }}>Cancel</button>
              {:else}
                <div class="flex justify-start items-center w-1/2 gap-x-2">
                  <input hidden name="set_id" value={set.id}>
                  <input hidden name="set_number" value={i}/>
                  <button formaction="?/move_set_up" class="w-1/2 p-1.5 border-2 border-slate-700 bg-slate-800 rounded-md text-xl flex items-center justify-center" aria-label="Up">
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white">
                      <polyline points="4 17 12 7 20 17" />
                    </svg>
                  </button>
                  <button formaction="?/move_set_down" class="w-1/2 p-1.5 border-2 border-slate-700 bg-slate-800 rounded-md text-xl flex items-center justify-center" aria-label="Down">
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white">
                      <polyline points="4 7 12 18 20 7" />
                    </svg>
                  </button>              
                </div>
                <button class="w-1/2 p-1 border-2 border-red-800 bg-red-900 rounded-md text-2xl">Delete</button>
              {/if}
            </div>
          </form>
        {/each}
      </div>
    {:else}
      <div class="border-b pt-3 pb-1">
        <div class="border-b border-slate-500 pb-3 text-3xl text-center flex items-center justify-start">
          <div class="w-1/3">Set</div>
          <div class="w-1/3">Weight</div>
          <div class="w-1/3">Reps</div>
        </div>
        {#each allSets as set, i}
          <div class="flex justify-start items-center py-2 text-4xl text-center {set.setNumber != 0 ? "border-t border-slate-500" : ""}">
            <div class="w-1/3">{i + 1}</div>
            <div class="w-1/3">{set.weight}</div>
            <div class="w-1/3">{set.reps}</div>
          </div>
        {/each}
      </div>
      <form method="POST" action="?/new_set" class="py-4 border-b" use:enhance>
        <div class="flex items-center gap-x-5 text-3xl pb-4">
          <label class="w-1/2" for="weight-input">Weight:</label>
          <label class="w-1/2" for="reps-input">Reps:</label>
        </div>
        <div class="flex items-center gap-x-5 pb-3">
          <input type="number" class="w-1/2 bg-slate-800 rounded-sm text-4xl p-1" id="weight-input" name="set_weight"/>
          <input type="number" class="w-1/2 bg-slate-800 rounded-sm text-4xl p-1" id="reps-input" name="set_reps"/>
        </div>
        <input hidden value={setNumber} name="set_number"/>
        <button class="border-2 border-green-700 p-4 text-3xl w-full bg-green-900 rounded-md">Submit Set</button>
        <p style='color: red'>{form?.message ?? ''}</p>
      </form>
    {/if}
  {:else}
    <div class="py-3 border-b text-3xl">No Sets Registered</div>
    <form method="POST" action="?/new_set" class="py-4 border-b" use:enhance>
      <div class="flex items-center gap-x-5 text-3xl pb-4">
        <label class="w-1/2" for="weight-input">Weight:</label>
        <label class="w-1/2" for="reps-input">Reps:</label>
      </div>
      <div class="flex items-center gap-x-5 pb-3">
        <input type="number" class="w-1/2 bg-slate-800 rounded-sm text-4xl p-1" id="weight-input" name="set_weight"/>
        <input type="number" class="w-1/2 bg-slate-800 rounded-sm text-4xl p-1" id="reps-input" name="set_reps"/>
      </div>
      <input hidden value={setNumber} name="set_number"/>
      <button class="border-2 border-green-700 p-4 text-3xl w-full bg-green-900 rounded-md">Submit Set</button>
      <p style='color: red'>{form?.message ?? ''}</p>
    </form>
  {/if}
  <div class="flex items-center justify-between gap-x-3 mt-3">
    <button onclick={() => editSets = !editSets} class="border-2 p-2 w-1/2 rounded-md text-2xl bg-slate-800 border-slate-700">{editSets ? "Done" : "Edit Sets"}</button>
    <form method="POST" use:enhance action="?/delete_exercise" class="border-2 rounded-md text-2xl p-2 w-1/2 text-center bg-red-900 border-red-800">
      <button class="size-full" onclick={(event) => confirmDelete(event, "Are you sure you want to delete this exercise from the workout?")}>Delete</button>
    </form>
  </div>
  <p style='color: red'>{form?.message_delete ?? ''}</p>
</div>