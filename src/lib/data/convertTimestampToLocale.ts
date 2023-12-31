export default function convertTimestampToLocale(timestamp: string) {
	// Parse the timestamp string
	const date = new Date(timestamp);

	// Convert to locale-specific date and time format
	const options: Intl.DateTimeFormatOptions = {
		weekday: 'long',
		year: 'numeric',
		month: 'short',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
		hour12: true
	};

	return new Intl.DateTimeFormat('en-US', options).format(date);
}
