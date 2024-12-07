<script>
	import FlakyComponent from './FlakyComponent.svelte';
</script>

<svelte:boundary>
	<FlakyComponent />
  {#snippet failed(error, reset)}
    <p>
      {error.message}
    </p>
    <button on:click={reset}>
      try again
    </button>
  {/snippet}
</svelte:boundary>
