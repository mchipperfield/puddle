<script lang="ts">
	import { db, storage } from '$lib/firebase';
	import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
	import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
	import { user } from '$lib/store';
	import { getIdTokenResult } from 'firebase/auth';

	let file: FileList;
	let loading = false;
	let message = '';
	let lastUpload: { imageUrl: string; rating: string } | null = null;

	async function uploadPuddle() {
		if (!file || file.length === 0) {
			message = 'Please select a file to upload.';
			return;
		}

		const currentUser = $user;
		if (!currentUser) {
			message = 'You must be logged in to upload.';
			return;
		}

		loading = true;
		message = 'Analyzing image...';
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
				loading = false;
				return;
			}

			message = 'Uploading...';
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
			lastUpload = { imageUrl: downloadURL, rating };
		} catch (error) {
			console.error('Upload error:', error);
			message = 'Upload failed. Please try again.';
		} finally {
			loading = false;
		}
	}
</script>

<div class="w3-card w3-round-large w3-padding">
	{#if lastUpload}
		<div class="w3-center w3-margin-bottom">
			<h4>Your new puddle!</h4>
			<img src={lastUpload.imageUrl} alt="Last uploaded puddle" class="w3-image w3-round-large" />
			<p>"{lastUpload.rating}"</p>
		</div>
	{/if}

	<div class="w3-center">
		<h3>Upload a Puddle</h3>
		<input type="file" bind:files={file} accept="image/*" class="w3-input w3-border w3-round-large" />
		<button on:click={uploadPuddle} disabled={loading} class="w3-button w3-blue w3-round-large w3-margin-top">
			{loading ? 'Uploading...' : 'Upload'}
		</button>
		{#if message}
			<p class="w3-text-grey w3-margin-top">{message}</p>
		{/if}
	</div>
</div>
