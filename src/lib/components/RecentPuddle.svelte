<script lang="ts">
	export let puddle: {
		imageUrl: string;
		rating: string;
		userName: string;
		createdAt: string;
	} | null = null;
</script>

<div class="recent-puddle">
	<h3>Most Recent Puddle</h3>
	{#if puddle}
		<img src={puddle.imageUrl} alt="Recent Puddle" />
		<p>"{puddle.rating}" - {puddle.userName}</p>
		<p>Uploaded on: {new Date(puddle.createdAt).toLocaleString()}</p>
	{:else}
		<p>No puddles have been uploaded yet.</p>
	{/if}
</div>

<style>
	.recent-puddle {
		text-align: center;
		margin-top: 2rem;
	}

	img {
		max-width: 100%;
		border-radius: 8px;
	}
</style>
