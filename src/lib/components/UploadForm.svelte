<script lang="ts">
	import { db, storage } from '$lib/firebase';
	import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
	import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
	import { user } from '$lib/store';

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

			// Analyze the image first
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

			await addDoc(collection(db, 'puddles'), {
				imageUrl: downloadURL,
				userId: currentUser.uid,
				userName: currentUser.displayName,
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

<div class="upload-form">
	{#if lastUpload}
		<div class="last-upload">
			<h4>Your new puddle!</h4>
			<img src={lastUpload.imageUrl} alt="Last uploaded puddle" />
			<p>"{lastUpload.rating}"</p>
		</div>
	{/if}

	<h3>Upload a Puddle</h3>
	<input type="file" bind:files={file} accept="image/*" />
	<button on:click={uploadPuddle} disabled={loading}>
		{loading ? 'Uploading...' : 'Upload'}
	</button>
	{#if message}
		<p>{message}</p>
	{/if}
</div>

<style>
	.upload-form {
		text-align: center;
		margin-top: 2rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		align-items: center;
	}

	.last-upload {
		margin-top: 2rem;
		border: 1px solid #ccc;
		padding: 1rem;
		border-radius: 8px;
	}

	.last-upload img {
		max-width: 100%;
		border-radius: 8px;
	}
</style>
