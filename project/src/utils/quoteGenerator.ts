import React, { useRef, useState } from 'react';
import { Download, Share2 } from 'lucide-react';
import { Quote } from '../types';
import { getGradientForMode } from '../utils/styleUtils';

const POSTER_IMAGES = [
	{
		label: 'Solid Black',
		value: 'solid-black',
		url: '',
	},
	{
		label: 'Classic Mountain',
		value: 'mountain',
		url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
	},
	{
		label: 'Golden Landscape',
		value: 'landscape',
		url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80',
	},
	{
		label: 'Dreamy Lake',
		value: 'lake',
		url: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80',
	},
	{
		label: 'Sunset Vista',
		value: 'sunset',
		url: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=800&q=80',
	},
	{
		label: 'Skyscraper City',
		value: 'city',
		url: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=800&q=80',
	},
	{
		label: 'Futuristic Computer',
		value: 'computer',
		url: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80',
	},
	{
		label: 'Neon Night',
		value: 'neon',
		url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
	},
	{
		label: 'Desert Road',
		value: 'desert',
		url: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80',
	},
];

interface QuoteDisplayProps {
	quote: Quote | null;
	bgType: string;
}

const QuoteDisplay: React.FC<QuoteDisplayProps> = ({ quote, bgType }) => {
	const quoteRef = useRef<HTMLDivElement>(null);
	const [copied, setCopied] = useState(false);

	if (!quote) {
		return (
			<div className="w-full max-w-md mx-auto rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center p-16">
				<p className="text-gray-500 text-center">
					Enter text above to generate your quote
				</p>
			</div>
		);
	}

	const handleDownload = async () => {
		if (!quoteRef.current) return;
		try {
			alert('In a complete implementation, this would download the quote as an image.');
		} catch (error) {
			console.error('Error downloading quote:', error);
		}
	};

	const handleShare = async () => {
		try {
			const { text } = quote;
			if (navigator.share) {
				await navigator.share({
					title: 'Quotify Poster',
					text: text,
					url: window.location.href
				});
			} else if (navigator.clipboard) {
				await navigator.clipboard.writeText(text);
				setCopied(true);
				setTimeout(() => setCopied(false), 2000);
				alert('Quote copied to clipboard!');
			} else {
				setCopied(true);
				setTimeout(() => setCopied(false), 2000);
				alert('Copy this quote: ' + text);
			}
		} catch (error) {
			console.error('Error sharing quote:', error);
		}
	};

	const { mode, text, emoji } = quote;
	const backgroundStyle = getGradientForMode(mode);
	const selectedBg = bgType === 'random'
		? POSTER_IMAGES[Math.floor(Math.random() * (POSTER_IMAGES.length - 1)) + 1] // skip solid-black for random
		: POSTER_IMAGES.find(bg => bg.value === bgType) || POSTER_IMAGES[0];

	return (
		<div className="w-full max-w-md mx-auto mb-8">
			<div
				ref={quoteRef}
				className={`quote-poster relative w-full aspect-square flex items-center justify-center`}
				style={selectedBg.value === 'solid-black' ? { background: '#000' } : { background: `url('${selectedBg.url}') center/cover no-repeat` }}
			>
				<div className="text-center relative z-10">
					<div className="w-16 h-1 bg-gray-200 mx-auto mb-8" />
					<p className="quote-text">{text}</p>
					{emoji && <p className="quote-emoji">{emoji}</p>}
					<div className="w-16 h-1 bg-gray-200 mx-auto mt-8" />
				</div>
			</div>
		</div>
	);
};

export default QuoteDisplay;
  }
