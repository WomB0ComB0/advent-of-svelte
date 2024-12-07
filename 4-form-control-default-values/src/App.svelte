<script lang="ts">
  let wishList: string = [
		'DJI PHANTOM 4 RTK',
		'Apple Vision Pro',
		'iPhone 16 Pro Max with Swarovski Crystals case'
  ].join('\n')
</script>

<form onsubmit={(e: SubmitEvent) => {
  e.preventDefault()
  alert('Sending your wish list to the North Pole...')
}}>
	<p>Dear Santa,</p>
	<p>This Christmas I would like:</p>
	
	<textarea defaultValue="a lump of coal">{wishList}</textarea>

	<input type="reset" value="start over">
	<button>send</button>
</form>

<style>
	:global(*) {
		font-family: 'Comic Sans MS';
	}
	
	textarea {
		width: 100%;
		height: 200px;
		resize: none;
		margin: 0 0 1em 0;
	}
</style>