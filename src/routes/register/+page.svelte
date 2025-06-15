<script lang='ts'>
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
</script>

<div class="">
  <h1 class="text-3xl text-center pt-4">Register</h1>
  <form method="post" action="?/register" use:enhance>
    <label class="block text-xl py-3">
      Username
      <input
        name="username"
        class="mt-1 w-full py-2 bg-slate-800 text-white border border-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </label>
    <label class="block text-xl py-3">
      Password
      <input
        type="password"
        name="password"
        class="mt-1 w-full py-2 bg-slate-800 text-white border border-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </label>
    <div class="justify-between items-center flex ">
      <button class="bg-blue-800 text-white px-6 py-2 rounded-md"
      >Register</button>
      <a href="/login">Login instead? Click here</a>
    </div>
  </form>
  <p style='color: red'>{form?.message ?? ''}</p>
</div>