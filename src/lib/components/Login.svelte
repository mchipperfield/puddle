<script lang="ts">
    import { user } from '$lib/store';
    import { auth } from '$lib/firebase';
    import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

    async function login() {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider);
    }
</script>

{#if !$user}
	<div on:click={login} class="google-btn">
		<div class="google-icon-wrapper">
			<img
				class="google-icon"
				src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
				alt="Google sign-in"
			/>
		</div>
		<p class="btn-text"><b>Sign in with Google</b></p>
	</div>
{/if}

<style>
	.google-btn {
		width: 100%;
		max-width: 240px;
		height: 42px;
		background-color: #4285f4;
		border-radius: 2px;
		box-shadow:
			0 3px 4px 0 rgba(0, 0, 0, 0.25);
		cursor: pointer;
		display: flex;
		margin: 0 auto;
	}
	.google-icon-wrapper {
		width: 40px;
		height: 100%;
		border-radius: 2px;
		background-color: #fff;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.google-icon {
		width: 18px;
		height: 18px;
	}
	.btn-text {
		color: #fff;
		font-size: 14px;
		letter-spacing: 0.2px;
		font-family: 'Roboto', sans-serif;
		margin: auto;
	}
	.google-btn:hover {
		box-shadow:
			0 0 6px #4285f4;
	}
	.google-btn:active {
		background: #1669f2;
	}
</style>