<script lang="ts">
  import { enhance } from '$app/forms';

  const { data, form } = $props();

  let changeSelected: { change: boolean, selected: number } = $state({ change: false, selected: 0 });
  let newTagMenuOpen: boolean = $state(false);
  let addTagButtonVisible: boolean = $state(true);

  function handleChangeTagClick(tagId: number){
    if(changeSelected.selected == tagId){
      changeSelected.change = !changeSelected.change;
    } else {
      changeSelected = { change: true, selected: tagId }
    }
  }

  function confirmDelete(event: Event, tagName: string){
    if(!confirm(`Are you sure you want to delete tag ${tagName}?`)){
      event.preventDefault();
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
    <div class="text-3xl">Public Tags</div>
    {#if addTagButtonVisible}
      <button class="text-xl border rounded-md p-1 bg-green-800" onclick={() => changeAddTagVisibility()}>Add +</button>
    {:else}
      <button class="invisible p-1 text-xl border">Placeholder</button>
    {/if}
  </div>
  {#if newTagMenuOpen}
    <form class="py-3 border-b" method="POST" use:enhance={() => {
      return async ({ result, update }) => {
        if(result.type === "success"){
          update();
          changeAddTagVisibility();
        } else {
          update();
        }
      }
    }}>
      <label class="text-xl mb-2 block" for="tag-name-input">New Tag Name:</label>
      <div class="flex items-center justify-end gap-x-2">
        <input id="tag-name-input" class="bg-slate-600 rounded-md w-1/2" type="text" name="tag_name"/>
        <button type="submit" formaction="?/add_tag" class="p-1 border rounded-md bg-green-800 w-1/4 text-lg">Add</button>
        <button class="p-1 border rounded-md bg-red-800 w-1/4 text-lg" onclick={() => changeAddTagVisibility()} type="button">Cancel</button>
      </div>
      <p class="text-red-500">{form?.add_tag_message ?? ""}</p>
    </form>
  {/if}
  <div>
    {#each data.tags as tag}
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
          <div class="flex items-center">
            <input type="text" name="tag_name" value={tag.name} class="w-1/3 bg-slate-600 text-xl p-0 rounded-sm"/>
            <button formaction="?/change_tag_name" name="tag_id" value={tag.id} class="w-1/3 border rounded-md p-1 bg-green-800 mx-2">Confirm</button>
            <button type="button" onclick={() => {
              changeSelected.change = false;
              if(form){
                form.change_tag_name_message = "";
              }
            }} class="w-1/3 border rounded-md bg-red-800 p-1">Cancel</button>
          </div>
          <p class="text-red-500">{form?.change_tag_name_message ?? ""}</p>
        {:else}
          <div class="flex items-center">
            <div class="text-xl w-1/3">{tag.name}</div>
            <button type="button" class="w-1/3 border rounded-md p-1 bg-slate-800 mx-2" onclick={() => handleChangeTagClick(tag.id)}>Change Name</button>
            <button formaction="?/delete_tag" name="tag_id" value={tag.id} onclick={(event) => confirmDelete(event, tag.name)} class="w-1/3 border rounded-md bg-red-800 p-1">Delete</button>
          </div>
        {/if}
      </form>
    {/each}
  </div>
</div>