import { useState } from 'react';

export default function (type) {
	const [value, setValue] = useState('');

	const onChange = (event) => setValue(event.target.value);
	return {
		value,
		onChange,
		type,
	};
}
