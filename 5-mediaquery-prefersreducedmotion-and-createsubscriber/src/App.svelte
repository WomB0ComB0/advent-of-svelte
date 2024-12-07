<script>
	import { MediaQuery } from 'svelte/reactivity';
	import { prefersReducedMotion } from 'svelte/motion';
	import { scale, fade } from 'svelte/transition';
	import { elasticOut } from 'svelte/easing';

	const large = new MediaQuery('min-width: 640px');

	const intro = $derived(
		prefersReducedMotion.current ? { start: 1 } : { start: 0.3, easing: elasticOut }
	);
</script>

{#if large.current}
	<svg viewBox="-12 -12 60 60" in:scale={intro} out:fade>
		<path fill="#FDD888" d="M33 31c0 2.2-1.8 4-4 4H7c-2.2 0-4-1.8-4-4V14c0-2.2 1.8-4 4-4h22c2.2 0 4 1.8 4 4v17z"/>
		<path fill="#FDD888" d="M36 11c0 2.2-1.8 4-4 4H4c-2.2 0-4-1.8-4-4s1.8-4 4-4h28c2.2 0 4 1.8 4 4z"/>
		<path fill="#FCAB40" d="M3 15h30v2H3z"/>
		<path fill="#DA2F47" d="M19 3h-2c-1.657 0-3 1.343-3 3v29h8V6c0-1.656-1.343-3-3-3z"/>
		<path fill="#DA2F47" d="M16 7c1.1 0 1.263-.516.361-1.147L9.639 1.147c-.902-.631-2.085-.366-2.631.589L4.992 5.264C4.446 6.219 4.9 7 6 7h10zm4 0c-1.1 0-1.263-.516-.361-1.147l6.723-4.706c.901-.631 2.085-.366 2.631.589l2.016 3.527C31.554 6.219 31.1 7 30 7H20z"/>
	</svg>
{/if}

<style>
	:root {
		overflow: hidden;
	}
	
	svg {
		width: 100%;
		height: 100%;
	}
</style>