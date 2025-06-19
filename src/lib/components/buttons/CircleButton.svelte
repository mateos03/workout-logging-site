<script>
  let { newMenuOpen, changeNewMenuOpen } = $props(); 
</script>

<button
  onclick={changeNewMenuOpen}
  class="w-16 h-16 rounded-full bg-sky-950 border-white border-1 text-white flex items-center justify-center transition-all duration-300"
  aria-label="Toggle menu"
>
  <div class="relative w-7 h-7">
    <!-- Vertical Line -->
    <div
      class="absolute left-1/2 top-0 w-0.75 h-full bg-white transform -translate-x-1/2 transition-transform duration-300"
      class:rotate-45={newMenuOpen}
    ></div>

    <!-- Horizontal Line -->
    <div
      class="absolute top-1/2 left-0 h-0.75 w-full bg-white transform -translate-y-1/2 transition-transform duration-300"
      class:rotate-45={newMenuOpen}
    ></div>
  </div>
</button>
