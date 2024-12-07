<script lang="ts">
  import { icons } from './Component.svelte'

  const pick = (array: any[]) => array[Math.floor(Math.random() * array.length)]
</script>

<svg preserveAspectRatio="xMidYMid slice" viewBox="0 0 360 360">
	{#each { length: 10 }, x}
		{#each { length: 10 }, y}
			<g transform="translate({x * 36},{y * 36})">
				{@render pick(icons)()}
			</g>
		{/each}
	{/each}
</svg>

<style>
	svg {
		width: 100%;
		height: 100%;
		background: radial-gradient(at center, white, hsl(220, 100%, 90%));
	}
</style>