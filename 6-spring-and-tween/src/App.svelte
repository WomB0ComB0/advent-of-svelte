<script>
	import { Spring } from 'svelte/motion';
	import Santa from './Santa.svelte';

	let coords = new Spring({ x: 100, y: 100 });
	let size = new Spring(1);
	let spin = new Spring(0);

	let rotate = $derived(spin.current * 360 + (coords.target.x - coords.current.x) * 0.1);
</script>

<svg
	role="presentation"
	onmousemove={(e) => {
		coords.target = { x: e.clientX, y: e.clientY };
	}}
	onmousedown={(e) => {
		spin.target += 1;
		size.target = 2;
	}}
	onmouseup={(e) => {
		size.target = 1;
	}}
>
	<g transform="translate({coords.current.x},{coords.current.y})">
		<g transform="scale({size.current}) rotate({rotate})">
			<Santa />
		</g>
	</g>
</svg>

<style>
	svg {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
	}
</style>