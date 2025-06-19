<script lang="ts">
  import { enhance } from '$app/forms';
  import { confirmDelete } from '$lib';

  const { data, form } = $props();

  let changeSelected: { change: boolean, selected: number } = $state({ change: false, selected: 0 });
  let newTagMenuOpen: boolean = $state(false);
  let addTagButtonVisible: boolean = $state(true);
  let searchInput: string = $state("");

  function handleChangeTagClick(tagId: number){
    if(changeSelected.selected == tagId){
      changeSelected.change = !changeSelected.change;
    } else {
      changeSelected = { change: true, selected: tagId }
    }
  }

  function changeAddTagVisibility(){
    newTagMenuOpen = !newTagMenuOpen;
    addTagButtonVisible = !addTagButtonVisible;
    if(form){
      form.add_tag_message = ""
    }
  }
</script>

<div class="">
  <div class="py-5 border-b items-center flex justify-between">
    <div class="text-3xl">Tags</div>
    {#if addTagButtonVisible}
      <button class="text-xl border rounded-md p-1 bg-green-800" onclick={() => changeAddTagVisibility()}>Add +</button>
    {:else}
      <button class="invisible p-1 text-xl border">Placeholder</button>
    {/if}
  </div>
  {#if newTagMenuOpen}
    <form class="py-3 border-b" method="POST" use:enhance>
      <label class="text-xl mb-2 block" for="tag-name-input">New Tag Name:</label>
      <div class="flex items-center justify-end gap-x-2">
        <input id="tag-name-input" class="bg-slate-600 rounded-md w-1/2" type="text" name="tag_name"/>
        <button type="submit" formaction="?/add_tag" class="p-1 border rounded-md bg-green-800 w-1/4 text-lg">Add</button>
        <button class="p-1 border rounded-md bg-red-800 w-1/4 text-lg" onclick={() => changeAddTagVisibility()} type="button">Cancel</button>
      </div>
      <p class="text-red-500">{form?.add_tag_message ?? ""}</p>
    </form>
  {/if}
  <div class="border-b">
    <input bind:value={searchInput} placeholder="Search..." class="bg-slate-800 rounded-full px-5 w-full my-2 text-lg"/>
  </div>
  <div>
    {#each data.tags.filter((tag) => tag.name.toLowerCase().includes(searchInput.toLowerCase())) as tag}
      <form method="POST" class="py-3 border-b" use:enhance={() => {
        return async ({result, update}) => {
          if(result.type === "success"){
            update();
            changeSelected.change = false;
          } else {
            update();
          }
        }
      }}>
        {#if changeSelected.selected == tag.id && changeSelected.change}
          <input type="text" name="tag_name" value={tag.name} class="h-9 bg-slate-800 text-2xl p-0 px-1 rounded-sm w-full"/>
          <div class="flex items-center justify-between gap-x-3 py-1 pt-2">
            <button formaction="?/change_tag_name" name="tag_id" value={tag.id} class="w-1/2 text-lg border rounded-md p-1 py-1.5 bg-green-800">Confirm</button>
            <button type="button" onclick={() => {
              changeSelected.change = false;
              if(form){
                form.change_tag_name_message = "";
              }
            }} class="w-1/2 text-lg border rounded-md bg-red-800 p-1 py-1.5">Cancel</button>
          </div>
          <p class="text-red-500">{form?.change_tag_name_message ?? ""}</p>
        {:else}
          <div class="text-2xl h-9">{tag.name}</div>
          <div class="flex items-center justify-between gap-x-3 py-1 pt-2">
            <button type="button" class="w-1/2 text-lg border rounded-md p-1 py-1.5 bg-slate-800" onclick={() => handleChangeTagClick(tag.id)}>Change Name</button>
            <button formaction="?/delete_tag" name="tag_id" value={tag.id} onclick={(event) => confirmDelete(event, `Are you sure you want to delete ${tag.name}`)} class="w-1/2 text-lg border rounded-md bg-red-800 p-1 py-1.5">Delete</button>
          </div>
        {/if}
      </form>
    {/each}
  </div>
</div>