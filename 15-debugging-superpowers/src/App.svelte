<script>
  import Butterfly from './Butterfly.svelte';
  
  let count = $state(0)
  let doubled = $derived(count * 2)
  let quadrupled = $derived(doubled * 2)
  let octupled = $derived(quadrupled * 2)
  
  const flap = () => count++;

  $effect(() => {
    $inspect.trace();

    if (octupled > 20) {
      alert('The flapping of the wings of a butterfly can be felt on the other side of the world.')
    }
  });
</script>

<Butterfly onflap={() => count++} />