import {
	IExecuteFunctions,
	IHttpRequestOptions,
	IHttpRequestMethods,
	IDataObject,
	NodeApiError,
} from "n8n-workflow";

// Accepts "foo" or "foo.domo.com" or "https://foo.domo.com" and always returns "https://foo.domo.com"
export function normalizeDomoDomain(domain: string): string {
	if (!domain || domain.trim() === '') {
		throw new Error('Domain is required and cannot be empty');
	}
	let d = domain.trim();
	if (d.startsWith('http://')) d = d.replace(/^http:\/\//, '');
	if (d.startsWith('https://')) d = d.replace(/^https:\/\//, '');
	if (d.endsWith('/')) d = d.slice(0, -1);
	if (!d.endsWith('.domo.com')) {
		d = `${d}.domo.com`;
	}
	return `https://${d}`;
}

export function parseResponse(responseData: any): any {
	if (typeof responseData === 'string') {
		try {
			return JSON.parse(responseData);
		} catch (error) {
			return responseData;
		}
	}
	return responseData;
}

/**
 * Make an authenticated API request to Domo
 */
export async function domoApiRequest(
	this: IExecuteFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body: IDataObject = {},
	qs: IDataObject = {},
	headers: IDataObject = {},
): Promise<any> {
	const credentials = await this.getCredentials('domoTokenApi');

	const options: IHttpRequestOptions = {
		method,
		body,
		qs,
		url: `${credentials.domain}${endpoint}`,
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'X-DOMO-DEVELOPER-TOKEN': credentials.apiToken,
			...headers,
		},
		json: true,
	};

	try {
		const response = await this.helpers.httpRequest(options);
		return parseResponse(response);
	} catch (error) {
		throw new NodeApiError(this.getNode(), error);
	}
}

/**
 * Get all items from a paginated Domo API endpoint
 */
export async function getAllItemsFromApi(
	this: IExecuteFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body: IDataObject = {},
	qs: IDataObject = {},
	headers: IDataObject = {},
): Promise<any[]> {
	const allItems: any[] = [];
	let hasMore = true;
	let offset = 0;
	const limit = qs.limit ? parseInt(qs.limit as string, 10) : 50;

	while (hasMore) {
		const queryParams = {
			...qs,
			offset,
			limit,
		};

		try {
			const response = await domoApiRequest.call(
				this,
				method,
				endpoint,
				body,
				queryParams,
				headers,
			);

			// Handle different response structures
			let items: any[] = [];
			if (Array.isArray(response)) {
				items = response;
			} else if (response && Array.isArray(response.data)) {
				items = response.data;
			} else if (response && Array.isArray(response.items)) {
				items = response.items;
			} else if (response) {
				// If response is a single item, wrap it in an array
				items = [response];
			}

			allItems.push(...items);

			// Check if there are more items
			if (items.length < limit) {
				hasMore = false;
			} else {
				offset += limit;
				// Additional check for explicit pagination indicators
				if (response && typeof response === 'object') {
					if (response.hasMore === false || response.has_more === false) {
						hasMore = false;
					}
					if (response.nextOffset !== undefined) {
						offset = response.nextOffset;
					}
				}
			}
		} catch (error) {
			if (error instanceof NodeApiError) {
				// If we get a 404 or similar error and we already have items,
				// it might mean we've reached the end
				if (allItems.length > 0 && (error.httpCode === '404' || error.httpCode === '400')) {
					break;
				}
			}
			throw error;
		}
	}

	return allItems;
}

/**
 * Get a single page of items from Domo API
 */
export async function getItemsFromApi(
	this: IExecuteFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body: IDataObject = {},
	qs: IDataObject = {},
	headers: IDataObject = {},
): Promise<any[]> {
	const response = await domoApiRequest.call(this, method, endpoint, body, qs, headers);

	// Handle different response structures
	if (Array.isArray(response)) {
		return response;
	} else if (response && Array.isArray(response.data)) {
		return response.data;
	} else if (response && Array.isArray(response.items)) {
		return response.items;
	} else if (response) {
		// If response is a single item, wrap it in an array
		return [response];
	}

	return [];
}
