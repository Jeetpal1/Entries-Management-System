/**
 * A class that handles anything to do with the Reports view
 */
class Track
{
	constructor(api, company_id)
	{
		this.start_button = undefined;
		this.stop_button = undefined;
		this.track_form = undefined;

		// Update the timer immediately, then trigger the callback every second to update the clock
		this.updateTimer();
		setInterval(this.updateTimer,1000);

		this.api = api;
		this.company_id = company_id;

		// INSERT YOUR CODE BELOW THIS LINE
	}

	updateTimer()
	{
		//console.log('----- updateTimer -----'); // disabled. too noisy
		// INSERT YOUR CODE BELOW THIS LINE
	}

	/////////////////////////////////////////////
	//
	// EVENTS
	//
	/////////////////////////////////////////////

	start(event)
	{
		console.log('----- start -----', event);
		// INSERT YOUR CODE BELOW THIS LINE
	}

	stop(event)
	{
		console.log('----- stop -----', event);
		// INSERT YOUR CODE BELOW THIS LINE
	}


	/////////////////////////////////////////////
	//
	// PROJECTS
	//
	/////////////////////////////////////////////


	loadProjects()
	{
		console.log('----- loadProjects -----');
		// INSERT YOUR CODE BELOW THIS LINE
	}

	fillProjectsWithResponse(xhr_response)
	{
		console.log('----- fillProjectsWithResponse -----', xhr_response);
		// INSERT YOUR CODE BELOW THIS LINE
	}
}
