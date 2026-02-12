import { GoogleGenerativeAI } from '@google/generative-ai';
import { GEMINI_API_KEY } from '$env/static/private';
import type { RequestHandler } from './$types';
import { error, json } from '@sveltejs/kit';

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-flash-latest' });

const ratings = [
	'Fetch my submarine',
	'Puddle or loch?',
	'That is a puddle',
	'Barely a splash...',
	"That's no puddle"
];

async function fileToGenerativePart(file: File) {
	return {
		inlineData: {
			data: Buffer.from(await file.arrayBuffer()).toString('base64'),
			mimeType: file.type
		}
	};
}

export const POST: RequestHandler = async ({ request }) => {
	const formData = await request.formData();
	const file = formData.get('image') as File;

	if (!file) {
		throw error(400, 'No image file found');
	}

	const imagePart = await fileToGenerativePart(file);

	const prompt = `You are a puddle connoisseur. Rate the impressiveness of the puddle in the image by choosing one of the following ratings: "${ratings.slice(0, -1).join('", "')}". If the image does not contain a puddle or any body of water, you must respond with "${ratings[ratings.length - 1]}".`;

	try {
		const result = await model.generateContent([prompt, imagePart]);
		const response = result.response;
		const text = response.text();

		let selectedRating = ratings[ratings.length - 1]; // Default to "That's no puddle"
		for (const rating of ratings) {
			if (text.includes(rating)) {
				selectedRating = rating;
				break;
			}
		}

		return json({ rating: selectedRating });
	} catch (e) {
		console.error(e);
		throw error(500, 'Error analyzing image with Gemini');
	}
};

