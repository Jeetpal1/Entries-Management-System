/**
 * The class for managing connections to the API. It is provided to you as part of the larger infrastructure for working
 * with the app.
 *
 * DO NOT MODIFY THIS FILE
 */
class TimeTrackerApi {

	/**
	 * Constructs the API class
	 * @param {string} api_key The API key to be used for this connection
	 * @param {string} base_url The base URL for the API calls
	 */
	constructor(api_key, base_url) {
		this.api_key = api_key;
		this.base_url = base_url;

	}

	/**
	 * Makes a request to the API with a given method, path and callback
	 * @param {string} method - The name of the HTTP method that should be used for this request
	 * @param {string} path - The path for the URL call. This is appended to the API URL to create a complete URL calling path.
	 * @param {object} parameters - An object with parameters to be sent as part of the request
	 * @param {function|boolean} success_handler - A callback function that the caller can pass in to deal with the response from the request if it was successful.
	 */
	makeRequest(method, path, parameters = {}, success_handler = false) {
		console.log('----- makeRequest -----',
			{
				'method': method,
				'path': path,
				'handler': success_handler
			});

		// Create form data
		let formData = new FormData();
		// Add parameters
		for (let key in parameters) {
			formData.append(key, parameters[key]);
		}

		var xhr = new XMLHttpRequest();
		xhr.open(method.toUpperCase(), this.base_url + path);
		xhr.setRequestHeader('api-key', this.api_key);
		xhr.setRequestHeader('api-source', '2021-S')
		xhr.addEventListener('load', () => this.xhrRequestHander(xhr, success_handler));
		xhr.send(formData);

	}

	/**
	 * The callback method used as the event handler for when the XHR request has loaded. It requires the XHR request as
	 * well as an option callback method to be called if it's successful.
	 * @param {XMLHttpRequest} xhr The XHR request object
	 * @param {function|boolean} success_handler The callback function that should be called if the call was successful. This method
	 * should be prepared to accept a parameter which will be the response object from the XHR.
	 */
	xhrRequestHander(xhr, success_handler = false) {
		let response = JSON.parse(xhr.response);

		// Check for an error
		if (response.error_message !== undefined) {
			showError(response);
		}
		else if (typeof success_handler == "function") {
			success_handler(response);
		}

	}
}
