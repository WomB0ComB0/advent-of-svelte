<!-- npx sv migrate app-state -->

<script>
  import * as store from 'svelte/store';
  let count = 0;
  const countStore = store.writable(count);
</script>

<button on:click={() => countStore.update((c) => c + 1)}>
  count is {countStore}
</button>
wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww