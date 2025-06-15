<script lang="ts">
 	import type { PageProps } from './$types';

  let { data }: PageProps = $props();
</script>

<div class="px-3 py-2">
  <div class="pt-2 pb-4 text-4xl text-center">Welcome :)</div>
  <div class="text-lg">
    This is a work in progress website for tracking workouts. Any questions or feedback? Send to mateosouto22@gmail.com
  </div>
  {#if !data.user}
  <div class="pt-8 pb-4 text-2xl text-center">First time?</div>
  <a
    class="bg-black text-white block border border-solid rounded-sm mx-25 py-2 mt-2 text-center text-3xl hover:bg-white hover:text-black transition-colors duration-200"
    href="/register"
  >Register</a>
  <div class="pt-8 pb-4 text-2xl text-center">Already have an account?</div>
  <a
    class="bg-black text-white block border border-solid rounded-sm mx-25 py-2 mt-2 text-center text-3xl hover:bg-white hover:text-black transition-colors duration-200"
    href="/login"
  >Login</a>
  {/if}
</div>