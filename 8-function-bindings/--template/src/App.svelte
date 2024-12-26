<script lang="ts">
  const ONE_DAY: number = 24 * 60 * 60 * 1000;
  
  let min: string = '2024-12-01' as const;
  let max: string = '2024-12-24' as const;
  let christmas: Date = new Date('2024-12-25')

  let date: Date = $state(new Date())
  let remaining: number = $derived(christmas.getTime() - date.getTime())
</script>


<div>
  <input 
    type="date"
    min={min}
    max={max}
    bind:value={
      () => {
        return date.toISOString().slice(0, 10)
      },
      (value) => {
        if (value < min) value = min;
        if (value > max) value = max;
        date = new Date(value);
      }
    }
  />
  <p>{remaining} {remaining === 1 ? 'day' : 'days'} to go until Christmas!</p>
</div>

<style>
	div {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background: radial-gradient(at center, green, darkgreen);	
		color: Canvas;
		font-size: min(2em, 4vw);
	}

	input {
		font: inherit;
		font-size: 2em;
		border-radius: 0.2em;
		padding: 0 0.2em;
		border: none;
		background: Canvas;
		color: CanvasText;
	}
</style>