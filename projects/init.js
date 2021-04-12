/**
 * DO NOT MODIFY THIS FILE
 *
 * Configure the API and call the profile
 * @type {TimeTrackerApi}
 */
const api = new TimeTrackerApi(api_key_projects, api_url);

// Load the reports after the DOM has loaded
window.addEventListener('DOMContentLoaded',() => new Projects(api, company_id));
