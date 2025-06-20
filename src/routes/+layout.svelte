<script lang="ts">
	import '../app.css';
	import { scale, slide } from 'svelte/transition';
	import MenuButton from '$lib/components/buttons/MenuButton.svelte';
  import CircleButton from '$lib/components/buttons/CircleButton.svelte';
	
	let menuOpen: boolean = $state(false);
	let newMenuOpen: boolean = $state(false);
	let loggedIn: boolean = $state(false);
	
	let menuLinks: { name: string, link: string }[] = [
		{ name: 'Home', link: '' },
		{ name: 'My Workouts', link: 'workouts' },
		{ name: 'Exercises', link: 'exercises' },
		{ name: 'Tags', link: 'tags' },
		{ name: 'Calendar', link: 'calendar' },
		{ name: 'About', link: 'about' }
	];
	
	let { children, data } = $props();
	
	$effect(() => {
		loggedIn = data.user ? true : false;
	});
	
	function clickOutsideMenu(node: Node) {
		function handleClickOutsideMenu(event: Event) {
			if (node.contains(event.target as Node)) {
				menuOpen = false;
			}
		}
	
		$effect(() => {
			node.addEventListener('click', handleClickOutsideMenu);
	
			return () => {
				node.removeEventListener('click', handleClickOutsideMenu);
			};
		});
	}
</script>

{#if loggedIn}
	<div class="bg-gray-900 min-h-screen text-white">
		<div use:clickOutsideMenu class="absolute size-full"></div>
		<div class="py-4 px-4 bg-slate-950 flex items-center justify-between border-b border-solid border-white">
			<MenuButton {menuOpen} changeMenuOpen={() => menuOpen = !menuOpen}></MenuButton>
			<a href="/profile" onclick={() => menuOpen = false}>
				<img src="/profile.png" alt="Profile button" class="h-10 w-auto relative">
			</a>
		</div>

		{#if menuOpen}
			<div class="bg-slate-950 absolute w-full z-100">
				{#each menuLinks as menuLink}
					<div transition:slide|global class="text-2xl border-b border-solid border-white">
						<a href="/{menuLink.link}" onclick={() => menuOpen = !menuOpen} class="size-full px-4 py-3 block">
							{menuLink.name}
						</a>
					</div>
				{/each}
			</div>
		{/if}
		{#if newMenuOpen}
			<div class="absolute w-full bottom-0 z-98">
				<div transition:scale class="border border-white rounded-4xl bg-slate-950 m-5 origin-bottom-right">
					<form method="POST" action="/api/create-workout">
						<button class="block border-b w-full text-3xl text-left p-3 px-5">New Workout</button>
					</form>
					<button class="block border-b w-full text-3xl text-left p-3 px-5">Add Calories</button>
					<button class="block w-full text-3xl text-left p-3 px-5">Add bodyweight</button>
				</div>
			</div>
		{/if}
		<div class="relative z-50 px-5">
			{@render children()}
		</div>
		<div class="absolute z-99 right-0 bottom-0 m-5">
			<CircleButton {newMenuOpen} changeNewMenuOpen={() => newMenuOpen = !newMenuOpen}/>
		</div>
	</div>
{:else}
	<div class="bg-gray-900 min-h-screen text-white">
		<div use:clickOutsideMenu class="absolute size-full"></div>
		<div class="py-4 px-4 bg-slate-950 flex items-center justify-between border-b border-solid border-white">
			<MenuButton {menuOpen} changeMenuOpen={() => menuOpen = !menuOpen}></MenuButton>
			<a href="/login" onclick={() => menuOpen = false}>
				<img src="/login.png" alt="Login button" class="h-10 w-auto relative">
			</a>
		</div>

		{#if menuOpen}
			<div class="bg-slate-950 absolute w-full z-100">
				{#each menuLinks as menuLink}
					<div transition:slide|global class="text-2xl border-b border-solid border-white">
						<a href="/{menuLink.link}" onclick={() => menuOpen = !menuOpen} class="size-full px-4 py-3 block">
							{menuLink.name}
						</a>
					</div>
				{/each}
			</div>
		{/if}

		<div class="relative z-50 px-5">
			{@render children()}
		</div>
	</div>
{/if}
