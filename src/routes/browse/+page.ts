import { db } from '$lib/firebase';
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const puddlesCollection = collection(db, 'puddles');
	const q = query(puddlesCollection, orderBy('createdAt', 'desc'), limit(20));
	const querySnapshot = await getDocs(q);

	const puddles = querySnapshot.docs.map((doc) => {
		const data = doc.data();
		return {
			id: doc.id,
			imageUrl: data.imageUrl,
			rating: data.rating,
			userName: data.userName,
			createdAt: data.createdAt.toDate().toISOString()
		};
	});

	return {
		puddles
	};
};
