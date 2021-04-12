/**
 * A class that handles anything to do with the Reports view
 */
class Reports {

	constructor(api, company_id)
	{
		// Must filled via the API calls
		this.projects = undefined;
		this.users = undefined;

		this.api = api;
		this.company_id = company_id;

		// INSERT YOUR CODE BELOW THIS LINE
		if(this.projects!=undefined&&this.users!=undefined)
		{
			loadProjects();
		}
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
		api.makeRequest('GET','acs/profile', {}, this.fillProjectsWithResponse);
	}

	fillProjectsWithResponse(xhr_response)
	{
		console.log('----- fillProjectsWithResponse -----', xhr_response);
		// INSERT YOUR CODE BELOW THIS LINE
		let tableBody = document.getElementById("results");
		tableBody.insertAdjacentText('afterbegin','sdfjlkdsajvsdiovjawlekngflkwenr');
		
		/*for(let project in xhr_response){

		}*/
	}

	handleProjectChange(event)
	{
		console.log('----- handleProjectChange -----', event);
		// INSERT YOUR CODE BELOW THIS LINE
	}


	/////////////////////////////////////////////
	//
	// USERS
	//
	/////////////////////////////////////////////

	loadUsers()
	{
		console.log('----- loadUsers -----');
		// INSERT YOUR CODE BELOW THIS LINE
	}

	fillUsersWithResponse(xhr_response)
	{
		console.log('----- fillUsersWithResponse -----', xhr_response);
		// INSERT YOUR CODE BELOW THIS LINE
	}

	handleUserChange(event)
	{
		console.log('----- handleUserChange -----', event);
		// INSERT YOUR CODE BELOW THIS LINE
	}

	/////////////////////////////////////////////
	//
	// TIME ENTRIES
	//
	/////////////////////////////////////////////

	loadTimeEntries()
	{
		console.log('----- loadTimeEntries -----');
		// INSERT YOUR CODE BELOW THIS LINE
	}

	fillTimeEntriesWithResponse(xhr_response)
	{
		console.log('----- fillTimeEntriesWithResponse -----', xhr_response);
		// INSERT YOUR CODE BELOW THIS LINE
	}

	dateString(date)
	{
		var months = ['','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
		var year = date.substr(0,4);
		var month = date.substr(5,2);
		var day = date.substr(8,2);

		return months[parseInt(month)] + ' ' + day + ', ' + year;

	}

}
