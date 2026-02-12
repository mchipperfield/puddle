<script lang="ts">
	export let puddle: {
		imageUrl: string;
		rating: string;
		userName: string;
		createdAt: string;
	} | null = null;
</script>

<div class="w3-card-4 w3-round-large w3-center w3-theme-l1">
	<header class="w3-container w3-theme">
		<h2>Latest Puddle</h2>
	</header>
	<div class="w3-container w3-padding w3-white">
		{#if puddle}
			<div>
				<img
					src={puddle.imageUrl}
					alt="Recent Puddle"
					class="w3-image w3-round-large"
					style="max-height: 400px; object-fit: cover;"
				/>
				<div class="w3-margin-top">
					<p class="w3-large w3-serif">
						<i>"{puddle.rating}"</i><br />
					<span class="w3-opacity">
						Uploaded by {puddle.userName}
						on {new Date(puddle.createdAt).toLocaleDateString('en-GB')}
					</span>
					</p>
				</div>
			</div>
		{:else}
			<p>No puddles have been uploaded yet.</p>
		{/if}
	</div>
</div>
