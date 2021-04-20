/**
 * @var api_url
 * @type {string}
 * The URL that points to the main API path. All commands use this primary URL
 */
let api_url = 'https://acs2909.lusciousorange.com/t-api/';

/**
 * API KEYS
 * @type {string}
 * The three API keys for the three segments of the project. You must replace these YOUR KEYS for your respective roles.
 * @todo: clear these
 */
let api_key_time_tracking = 'bqyrkt6-g1yc5684fkdwh3q0-v2bsc78'; // PERSON A
let api_key_reports       = 'qc1pg27-hsfxy9kqdc1z38r1-3810bd0'; // PERSON B
let api_key_projects      = ''; // PERSON C


/**
 * @var {int} company_id
 * Your company ID, you must replace this is your value once you know your company ID
 */
let company_id = 41;


/**
 * PROFILE CALL
 * This profile call must remain here as the first thing that happens in the config. It uses your API key to get the
 * profile of who is currently working.
 *
 * The code below will use your personal API key set in my_api_key.js
 * DO NOT MODIFY THIS CODE
 */
let current_api_key = my_api_key || api_key_time_tracking || api_key_reports || api_key_projects;
let my_api = new TimeTrackerApi(current_api_key, api_url);
my_api.makeRequest('GET','acs/profile', {}, saveUserID);
my_api = null;


/**
 * A function to save the user ID of the provide profile object
 * @param {object} profile_object
 */
function saveUserID(profile_object)
{
	console.log('----- saveUserID -----', profile_object);
	// INSERT YOUR CODE BELOW THIS LINE
	this.user_id = profile_object.user_id;
}


/**
 * A method that shows an error message on the screen
 * @param {object} error_details
 */
function showError(error_details)
{
	console.error('----- showError -----', error_details);
	// INSERT YOUR CODE BELOW THIS LINE
}

/////////////////////////////////////////////
//
// TIME UTILITY FUNCTIONS
// These are functions provided to you as a
// courtesy to help with the build process.
//
/////////////////////////////////////////////

/**
 * A utility function that accepts a number of seconds and returns a formatted time with hours minutes and seconds.
 * @param {int} seconds
 * @returns {string} A time in the format of h:mm:ss
 */
function convertSecondsToHoursMinutesSeconds(seconds)
{
	let hours = Math.floor(seconds/3600);
	seconds -= hours*3600; // remove the hours seconds from the calculations

	let minutes = Math.floor(seconds / 60);
	seconds -= minutes*60; // remove the hours seconds from the calculations

	return hours + ':' + pad2Digits(minutes) + ":" + pad2Digits(seconds);
}

/**
 * Converts a timestamp integer into a string formatted as YYYY-MM-DD hh:mm:ss
 * @param {int} timestamp
 * @returns {string}
 */
function convertTimestampToDateFormat(timestamp)
{
	let d = new Date( parseInt(timestamp));

	return d.getFullYear() + '-' + pad2Digits(d.getMonth() + 1) + '-' + pad2Digits(d.getDate())
		+ ' ' + pad2Digits(d.getHours()) + ':' + pad2Digits(d.getMinutes()) + ':' + pad2Digits(d.getSeconds());

}


/**
 * A function to pad numbers to 2 digits
 * @param number
 * @return {string|*}
 */
function pad2Digits(number)
{
	return (number < 10 ? '0' + number : number);
}
