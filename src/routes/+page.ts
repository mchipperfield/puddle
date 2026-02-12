import { db } from '$lib/firebase';
import { collection, query, orderBy, limit, getDocs, Timestamp } from 'firebase/firestore';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	const puddlesCollection = collection(db, 'puddles');
	const q = query(puddlesCollection, orderBy('createdAt', 'desc'), limit(1));

	const querySnapshot = await getDocs(q);
	let recentPuddle = null;

	if (!querySnapshot.empty) {
		const doc = querySnapshot.docs[0];
		const data = doc.data();
		recentPuddle = {
			id: doc.id,
			imageUrl: data.imageUrl,
			rating: data.rating,
			userName: data.userName,
			// Convert Firestore Timestamp to a serializable format (e.g., ISO string)
			createdAt: (data.createdAt as Timestamp).toDate().toISOString()
		};
	}

	return {
		recentPuddle
	};
};
