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
		this.loadProjects();
		this.loadUsers();
		
		document.getElementById('project_id').addEventListener('change',this.handleProjectChange.bind(this));
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
		let pathForProjects = `companies/${this.company_id}/projects`;
		api.makeRequest('GET', pathForProjects, {}, this.fillProjectsWithResponse.bind(this));		
	}

	fillProjectsWithResponse(xhr_response)
	{
		console.log('----- fillProjectsWithResponse -----', xhr_response);
		// INSERT YOUR CODE BELOW THIS LINE
		let projectList = document.getElementById('project_id');
		for(let project in xhr_response){
			projectList.insertAdjacentHTML('beforeend',`<option value="${xhr_response[project].project_id}">${xhr_response[project].title}</option>`);
			
		}
		this.projects = xhr_response;
		
	}

	handleProjectChange(event)
	{
		console.log('----- handleProjectChange -----', event);
		// INSERT YOUR CODE BELOW THIS LINE
		
		
		let tbody = document.querySelector('#results tbody').rows;
		console.log(tbody)
		for (let row in tbody){
			if (tbody[row].id != event.currentTarget.options[event.currentTarget.selectedIndex].value){
				document.getElementById(`#${tbody[row].id}`).toggleId;  //you were here
			}
		}
		
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
		let pathForUsers = `companies/${this.company_id}/users`;
		api.makeRequest('GET', pathForUsers, {}, this.fillUsersWithResponse.bind(this));
		setTimeout(() => {if(this.users!=undefined && this.projects!=undefined){
			this.loadTimeEntries();
		}},2000);
	}

	fillUsersWithResponse(xhr_response)
	{
		console.log('----- fillUsersWithResponse -----', xhr_response);
		// INSERT YOUR CODE BELOW THIS LINE
		let userList = document.getElementById('user_id');
		for(let user in xhr_response){
			userList.insertAdjacentHTML('beforeend',`<option value="${xhr_response[user].user_id}">${xhr_response[user].first_name} ${xhr_response[user].last_name}</option>`);
		}
		this.users = xhr_response;
		
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
		for(let project in this.projects){
			let pathForEntries = `projects/${this.projects[project].project_id}/entries`;
			api.makeRequest('GET', pathForEntries, {}, this.fillTimeEntriesWithResponse.bind(this));
		}
		
	}

	fillTimeEntriesWithResponse(xhr_response)
	{
		console.log('----- fillTimeEntriesWithResponse -----', xhr_response);
		// INSERT YOUR CODE BELOW THIS LINE
		let tableBody = document.querySelector('#results tbody');

		// to go through every entries in the entry list and to insert required data in table cells
		for(let entry in xhr_response){

			//to get total number of seconds in between the start and end date, I am using Date objects
			let startDate = new Date(xhr_response[entry].start_time);
			let endDate = new Date(xhr_response[entry].end_time);
			let totalSeconds = (endDate.getTime()-startDate.getTime())/1000;

			// to get total number of seconds in hours:munites:seconds format, I am using convertSecondsToHoursMinutesSeconds() that is in config.js
			let formattedTime = convertSecondsToHoursMinutesSeconds(totalSeconds);
			tableBody.insertAdjacentHTML('afterbegin',`
			<tr id = "${xhr_response[entry].project_id}">
				<td>${xhr_response[entry].description}</td>
				<td>${this.projects[xhr_response[entry].project_id].title}</td>
				<td>${this.users[xhr_response[entry].user_id].first_name} ${this.users[xhr_response[entry].user_id].last_name}</td>
				<td>${formattedTime}</td>
				<td>${this.dateString(startDate)}</td>
			</tr>
			`);
		}
	}

	dateString(date)
	{
		var months = ['','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

		return months[date.getMonth()+1] + ' ' + date.getDate() + ', ' + date.getFullYear();
	}
}