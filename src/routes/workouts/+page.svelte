<script lang="ts">
  import { formatTimestamp } from '$lib';

  const { data } = $props();

  function findTagName(tagId: number | null){
    if(tagId != null){
      return data.tags.find((tag) => tag.id == tagId)!.name;
    } else { return "No Tag" }
  }
</script>

<div class="">
  <div class="text-4xl py-5 text-center border-b">Workouts</div>
  {#each data.workouts as workout}
    <a href="/workouts/{workout.id}" class="block border rounded-md my-5 p-3 py-4 bg-slate-800 { workout.finished ? "border-white" : "border-yellow-500 border-2" }">
      <div class="flex justify-between items-center">
        <div class="text-2xl">{formatTimestamp(workout.created)}</div>
        <div class="text-2xl">{ findTagName(workout.tagId) }</div>
      </div>
      <div class="flex justify-between items-center mt-2">
        <div class="text-2xl">{workout.created.toLocaleString("en-US", { weekday: "long" })}</div>
        <div class="text-xl"> 
          {#if workout.finished}
            <span class="text-yellow-500">In progress</span>
          {:else}
            <span class="text-slate-400">Finished</span>
          {/if}
        </div>
      </div>
    </a>
  {/each}
</div>