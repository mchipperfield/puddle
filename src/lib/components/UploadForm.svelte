<script lang="ts">
	import { db, storage, auth } from '$lib/firebase';
	import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
	import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
	import { user } from '$lib/store';
	import { getIdTokenResult, signOut } from 'firebase/auth';

	let file: FileList;
	let loading = false;
	let message = '';
	let messageColor = 'w3-text-grey';
	let lastUpload: { imageUrl: string; rating: string } | null = null;

	async function uploadPuddle() {
		if (!file || file.length === 0) {
			message = 'Please select a file to upload.';
			messageColor = 'w3-text-amber';
			return;
		}

		const currentUser = $user;
		if (!currentUser) {
			message = 'You must be logged in to upload.';
			messageColor = 'w3-text-amber';
			return;
		}

		loading = true;
		message = 'Analyzing image...';
		messageColor = 'w3-text-white';
		lastUpload = null;

		try {
			const selectedFile = file[0];

			const formData = new FormData();
			formData.append('image', selectedFile);

			const response = await fetch('/api/analyze-puddle', {
				method: 'POST',
				body: formData
			});

			if (!response.ok) {
				throw new Error('Failed to analyze image.');
			}

			const { rating } = await response.json();

			if (rating === "That's no puddle") {
				message = "This doesn't look like a puddle. Please try another image.";
				messageColor = 'w3-text-amber';
				loading = false;
				return;
			}

			message = 'Uploading...';
			messageColor = 'w3-text-white';
			const filePath = `puddles/${currentUser.uid}/${selectedFile.name}`;
			const storageRef = ref(storage, filePath);

			const snapshot = await uploadBytes(storageRef, selectedFile);
			const downloadURL = await getDownloadURL(snapshot.ref);

			let userName: string | undefined;
			try {
				const idTokenResult = await getIdTokenResult(currentUser, true);
				userName = (idTokenResult.claims.given_name as string) || currentUser.displayName?.split(' ')[0];
			} catch (error) {
				console.error('Error getting ID token, falling back to display name', error);
				userName = currentUser.displayName?.split(' ')[0];
			}

			await addDoc(collection(db, 'puddles'), {
				imageUrl: downloadURL,
				userId: currentUser.uid,
				userName: userName,
				createdAt: serverTimestamp(),
				rating: rating
			});

			message = 'Puddle uploaded successfully!';
			messageColor = 'w3-text-white';
			lastUpload = { imageUrl: downloadURL, rating };
		} catch (error) {
			console.error('Upload error:', error);
			message = 'Upload failed. Please try again.';
			messageColor = 'w3-text-amber';
		} finally {
			loading = false;
		}
	}
</script>

<div class="w3-card-4 w3-round-large">
	{#if lastUpload}
		<div class="w3-center w3-white w3-margin-bottom">
			<h3 class="w3-container w3-theme">Your new puddle!</h3>
			<img
				src={lastUpload.imageUrl}
				alt="Last uploaded puddle"
				class="w3-image w3-round-large"
				style="max-height: 300px; object-fit: cover;"
			/>
			<p class="w3-serif"><q>{lastUpload.rating}</q></p>
		</div>
	{/if}

	<div class="w3-center w3-white w3-margin-bottom">
		<header class="w3-container w3-theme w3-round">
			<h3 >Upload a Puddle</h3>
		</header>
		<form class="w3-container w3-padding">
		<input
			type="file"
			bind:files={file}
			accept="image/*"
			class="w3-input w3-border w3-padding w3-round-large"
		/>
		<div class="w3-bar w3-margin-top" style="display: flex; justify-content: center; gap: 1rem;">
			<button
				on:click={uploadPuddle}
				disabled={loading}
				class="w3-button w3-theme-action w3-round-large w3-bar-item"
			>
				{loading ? 'Uploading...' : 'Upload'}
			</button>
			<button
				on:click={() => signOut(auth)}
				class="w3-button w3-red w3-round-large w3-bar-item"
			>
				Sign out
			</button>
		</div>
		</form>
		{#if message}
			<p class="{messageColor} w3-margin-top">{message}</p>
		{/if}
	</div>
</div>
