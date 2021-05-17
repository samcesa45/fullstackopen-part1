import { useState } from 'react';
import axios from 'axios';

export const useResources = (baseUrl) => {
	const [resources, setResources] = useState([]);

	const getAll = async () => {
		const request = await axios.get(baseUrl);
		setResources(request.data);
	};

	const create = async (resource) => {
		const response = await axios.post(baseUrl, resource);
		setResources([...resources, response.data]);
	};

	const remove = async (id) => {
		const response = await axios.delete(`${baseUrl}/${id}`);
		setResources(response.data);
	};

	const service = {
		getAll,
		create,
		remove,
	};

	return [resources, service];
};
