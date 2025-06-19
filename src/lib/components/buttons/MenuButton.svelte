<script>
  let { menuOpen, changeMenuOpen } = $props();
</script>

<button
	onclick={changeMenuOpen}
	class="relative w-8 h-8 flex flex-col justify-center items-center group cursor-pointer"
	aria-label="Toggle menu"
>
	<!-- Top bar -->
	<span
		class="absolute h-0.5 w-6 bg-white transition-all duration-300 ease-in-out 
		translate-y-[-8px] group-[.open]:rotate-45 group-[.open]:translate-y-0"
		class:rotate-45={menuOpen}
		class:translate-y-0={menuOpen}
	></span>

	<!-- Middle bar -->
	<span
		class="h-0.5 w-6 bg-white transition-all duration-300 ease-in-out"
		class:opacity-0={menuOpen}
	></span>

	<!-- Bottom bar -->
	<span
		class="absolute h-0.5 w-6 bg-white transition-all duration-300 ease-in-out 
		translate-y-[8px] group-[.open]:-rotate-45 group-[.open]:translate-y-0"
		class:-rotate-45={menuOpen}
		class:translate-y-0={menuOpen}
	></span>
</button>