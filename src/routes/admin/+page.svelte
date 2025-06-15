<script lang="ts">
  import { enhance } from "$app/forms";

  let { data, form } = $props();
</script>

<div class="">
  <div>
    Add Public Workout_Tag
    <form method="POST" action="?/add_workout_tag" use:enhance>
      <label>
        Workout_Tag Name:
        <input type="text" name="name" class="bg-slate-600">
      </label>
      <button class="border rounded-md p-2 px-4 bg-slate-600">Add</button>
      <p class="text-red-500">{form?.message ?? ""}</p>
    </form>
  </div>
  <div>
    Add Public Tag
    <form method="POST" action="?/add_tag" use:enhance>
      <label>
        Tag Name:
        <input type="text" name="name" class="bg-slate-600">
      </label>
      <button class="border rounded-md p-2 px-4 bg-slate-600">Add</button>
    </form>
  </div>
  <div>
    Add Public Exercise
    <form method="POST" action="?/add_exercise" use:enhance>
      <label>
        Exercise Name:
        <input type="text" name="name" class="bg-slate-600">
      </label>
      <label>
        Exercise Description:
        <input type="text" name="description" class="bg-slate-600">
      </label>
      <label for="exercise_tags">Tags:</label>
      {#each data.tags as tag}
        <label for={tag.id.toString()}>{tag.name}</label>
        <input id={tag.id.toString()} type="checkbox" name="tag[]" value={tag.id}/>
      {/each}
      <button class="border rounded-md p-2 px-4 bg-slate-600">Add</button>
    </form>
  </div>
</div>