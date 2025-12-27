<script lang="ts">
  import { enhance } from '$app/forms';
    import BigDialogBox from '$lib/components/dialogs/BigDialogBox.svelte';
  import NewExerciseDialog from '$lib/components/dialogs/BigDialogBox.svelte';

  const { data } = $props();
  let selectedTag = $state(data.workout.tagId ?? 0);
  let savedTag = $derived(data.workout.tagId ?? 0);
  let dialog = $state<HTMLDialogElement>();
  let workoutTagForm = $state<HTMLFormElement>();

  let exerciseNameSearch = $state<string>("");
  let selectedTagSearch = $state<number>(0);

  $effect(() => {
    selectedTag = data.workout.tagId ?? 0;
  });
</script>

<div class="">
  <div class="flex justify-between items-center border-b">
    <div class="text-4xl py-5">{data.workout.created.toLocaleString("en-US", { weekday: "long" })}</div>
    <form method="POST" action="?/change_workout_finished" use:enhance>
      <button name="workout_finished" value={(!data.workout.finished).toString()} class="text-2xl rounded-md p-1.5 px-2 {data.workout.finished ? "bg-slate-800" : "bg-green-800 border"}">{data.workout.finished ? "Finished ✓" : "Finish"}</button>
    </form>
  </div>
  {#if data.workout.finished}
    <div>Finished</div>
  {:else}
    <div class="border-b pb-4">
      <form bind:this={workoutTagForm} method="POST" action="?/change_workout_tag" class="flex justify-between items-center mt-4" use:enhance>
        <select name="workout_tag" bind:value={selectedTag} onchange={() => workoutTagForm?.requestSubmit()} class="text-2xl bg-slate-800 rounded-md w-full">
          <option value=0></option>
          {#each data.tags as tag}
            <option value={tag.id}>{tag.name} {tag.id == savedTag ? "✓" : ""}</option>
          {/each}
        </select>
      </form>
      <button onclick={() => dialog?.showModal()} class="border bg-green-800 rounded-md text-3xl w-full mt-4 py-2">New Exercise</button>
    </div>
    <BigDialogBox bind:dialog title="Search">
      <form method="POST" action="?/new_exercise" use:enhance>
        <input class="bg-slate-800 w-full rounded-md text-2xl pb-1 mb-2" placeholder="Exercise Name" bind:value={exerciseNameSearch}/>
        <div class="border-b pb-3 mb-1">
          <select class="bg-slate-800 w-full rounded-md text-2xl border-b" bind:value={selectedTagSearch}>
            <option value=0></option>
            {#each data.tags as tag}
              <option value={tag.id}>{tag.name}</option>
            {/each}
          </select>
        </div>
        {#each data.exercises
        .filter((exercise) => exercise.name.toLowerCase().includes(exerciseNameSearch.toLowerCase()))
        .filter((exercise) => data.exerciseTags.filter((exTag) => exTag.tagId == selectedTagSearch).map((exTag) => exTag.exerciseId).includes(exercise.id) || selectedTagSearch == 0) as exercise}
          <button value={exercise.id} name="exercise_id" class="text-2xl py-3 my-3 block border bg-slate-800 rounded-md p-2 w-full">{exercise.name}</button>
        {/each}
      </form>
    </BigDialogBox>
    <div>
      {#each data.workoutExercises as workoutExercise}
        <a class="block w-full py-4 text-3xl text-center border rounded-md mt-4 bg-slate-800" href="/workouts/{data.workoutId}/{String(workoutExercise.id)}">{workoutExercise.name}</a>
      {/each}
    </div>
  {/if}
</div>