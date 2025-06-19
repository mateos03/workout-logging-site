<script lang="ts">
  import { enhance } from "$app/forms";
    import { goto } from "$app/navigation";

  const { data, form } = $props();
  const exercise = $state(data.exercise);

  let chosenTags: number[] = $state(data.exerciseTags.map((x) => x.tagId));
  let availableTags: number[] = $state(data.tags.map((x) => x.id));
  let selectedTag: number = $state(0);

  function filterTags(arr: number[]){
    return(data.tags.filter((x) => arr.includes(x.id)));
  }
</script>

<div class="">
  <div class="text-3xl border-b py-5">
    Edit Exercise
  </div>
  <form class="" method="POST" use:enhance={() => {
    return async ({result, update}) => {
      if(result.type === "redirect"){
        update();
        goto(result.location);
      } else {
        update();
      }
    }
  }}>
    <label class="text-2xl block pt-4 py-2" for="exercise_name_input">
      Name:
    </label>
    <input bind:value={exercise.name} class="bg-slate-800 rounded-md w-full text-xl" name="exercise_name" id="exercise_name_input"/>
    <label class="block pt-4 py-2 text-xl" for="exercise_description_input">
      Description:
    </label>
    <textarea bind:value={exercise.description} class="bg-slate-800 text-xl w-full rounded-md" name="exercise_description" id="exercise_description_input"></textarea>
    <div class="flex justify-between items-center py-4">
      <div class="text-2xl w-1/2">Exercise Tags: </div>
      <select bind:value={selectedTag} onchange={(event) => {
        if(Number(event.currentTarget.value) != 0) chosenTags.push(Number(event.currentTarget.value));
        selectedTag = 0;
      }} class="bg-slate-800 rounded-md w-1/2 text-lg">
        <option value={0}></option>
        {#each filterTags(availableTags).filter((x) => !chosenTags.includes(x.id)) as tag}
          <option value={tag.id}>{tag.name}</option>
        {/each}
      </select>
    </div>
    {#if filterTags(chosenTags).length != 0}
      {#each filterTags(chosenTags) as tag}
        <div class="flex items-center justify-start pb-3">
          <div class="text-xl w-1/4">{tag.name}</div>
          <input hidden name="exercise_tag_ids" value={tag.id}/>
          <button onclick={() => {availableTags.push(tag.id); chosenTags.splice(chosenTags.findIndex((x) => x == tag.id), 1)}} type="button" class="w-1/4 flex items-center justify-center border text-lg bg-red-800 mx-2 h-7 w-7 rounded-full font-bold">x</button>
        </div>
      {/each}
    {:else}
      <div class="text-red-500 text-lg">No Tags Chosen</div>
    {/if}
    <button class="border rounded-md p-2 text-2xl bg-green-800 mt-4 mb-2 w-full">Update Exercise</button>
    <p class="text-xl text-red-500">{form?.message ?? ""}</p>
    <a href="/admin/exercise" class="block border rounded-md p-2 text-2xl bg-slate-800 my-2 w-full text-center">Go Back</a>
  </form>
</div>