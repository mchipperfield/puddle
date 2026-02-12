<script lang="ts">
	import { db, storage } from '$lib/firebase';
	import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
	import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
	import { user } from '$lib/store';

	let file: FileList;
	let loading = false;
	let message = '';

	const ratings = [
		'A fine specimen.',
		'Could be better.',
		'Truly remarkable.',
		'An average puddle.',
		'Magnificent!'
	];

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
		message = 'Uploading...';

		try {
			const selectedFile = file[0];
			const filePath = `puddles/${currentUser.uid}/${selectedFile.name}`;
			const storageRef = ref(storage, filePath);

			const snapshot = await uploadBytes(storageRef, selectedFile);
			const downloadURL = await getDownloadURL(snapshot.ref);

			const randomRating = ratings[Math.floor(Math.random() * ratings.length)];

			await addDoc(collection(db, 'puddles'), {
				imageUrl: downloadURL,
				userId: currentUser.uid,
				userName: currentUser.displayName,
				createdAt: serverTimestamp(),
				rating: randomRating
			});

			message = 'Puddle uploaded successfully!';
		} catch (error) {
			console.error('Upload error:', error);
			message = 'Upload failed. Please try again.';
		} finally {
			loading = false;
		}
	}
</script>

<div class="upload-form">
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
</style>
