<script>
	let { data } = $props();
</script>

<div>
	<header>
		<h1>{data.user.greeting}</h1>
		<img
			alt="{data.user.firstname} {data.user.lastname} avatar"
			src={data.user.avatar}
		/>
	</header>

	<p>This reactive User object was transported across the network!</p>

	<label>
		<input bind:value={data.user.firstname} />
		first name
	</label>

	<label>
		<input bind:value={data.user.lastname} />
		last name
	</label>
</div>

<style>
	div {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.5;
		gap: 0.5em;
	}

	header {
		display: flex;
		gap: 1em;
	}

	img {
		width: 4em;
		aspect-ratio: 1;
	}
</style>
