<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	let puddles = data.puddles;
	let ratings = [...new Set(data.puddles.map((p) => p.rating))];
	let selectedRating = '';

	$: {
		if (selectedRating) {
			puddles = data.puddles.filter((p) => p.rating === selectedRating);
		} else {
			puddles = data.puddles;
		}
	}
</script>
<div class="w3-card">
    <header class="w3-theme w3-container">
        <h2 class="w3-center ">Browse Puddles</h2>
    </header>
	

	<div class="w3-bar w3-white w3-center w3-padding">
		<div class="w3-dropdown-hover">
			<button class="w3-button w3-theme-d2">{selectedRating || 'Filter by rating'}</button>
			<div class="w3-dropdown-content w3-bar-block w3-card-4">
				<button class="w3-bar-item w3-button" on:click={() => (selectedRating = '')}>All</button>
				{#each ratings as rating}
					<button class="w3-bar-item w3-button" on:click={() => (selectedRating = rating)}
						>{rating}</button
					>
				{/each}
			</div>
		</div>
	</div>

	<div class="w3-row-padding">
		{#each puddles as puddle}
			<div class="w3-col l3 m6 s12 w3-margin-bottom">
				<div class="w3-card-4">
					<img class="w3-image"src={puddle.imageUrl} alt="A puddle" style="width:100%;" />
					<div class="w3-container w3-center w3-padding w3-white">
						<p class="w3-serif"><i>"{puddle.rating}"</i></p>
						<p class="w3-opacity">
							Uploaded by {puddle.userName} on {new Date(puddle.createdAt).toLocaleDateString(
								'en-GB'
							)}
						</p>
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>