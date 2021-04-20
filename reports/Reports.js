/**
 * A class that handles anything to do with the Reports view
 */
//Person B: Reports, Jeetpal Singh (3124275) 
class Reports {
	/**
	 * creates Reports
	 * @param {TimeTrackerApi} api TimeTrackerApi object
	 * @param {int} company_id company id
	 */
	constructor(api, company_id) {
		// Must filled via the API calls
		this.projects = undefined;
		this.users = undefined;


		this.api = api;
		this.company_id = company_id;

		// INSERT YOUR CODE BELOW THIS LINE

		//calling loadProjects() and loadUsers() to get fill the list of projects and users in form 'reports_filter_form'
		this.loadProjects();
		this.loadUsers();

		//creating eventlistener for any change in form 'reports_filter_form'
		document.getElementById('reports_filter_form').addEventListener('change', (event) => {
			if (event.target.id == 'project_id') {
				//calling event handler if user changed 'project_id' select tag
				this.handleProjectChange(event);
			}
			if (event.target.id == 'user_id') {
				//calling event handler if user changed 'user_id' select tag
				this.handleUserChange(event);
			}
		});

	}

	/////////////////////////////////////////////
	//
	// PROJECTS
	//
	/////////////////////////////////////////////

	/**
	 * This makes an api request to get list of projects in specified company
	 */
	loadProjects() {
		console.log('----- loadProjects -----');
		// INSERT YOUR CODE BELOW THIS LINE

		//storing path of api for list of projects (mentioned in API REFERENCE tab on website)
		let pathForProjects = `companies/${this.company_id}/projects`;

		//creating GET request using TimeTrackerApi class object, also passing callback function
		api.makeRequest('GET', pathForProjects, {}, this.fillProjectsWithResponse.bind(this));
	}

	/**
	 * It fills the list of projects with response in select form (project_id)
	 * @param {object} xhr_response The response from api which is list of prjects
	 */
	fillProjectsWithResponse(xhr_response) {
		console.log('----- fillProjectsWithResponse -----', xhr_response);
		// INSERT YOUR CODE BELOW THIS LINE

		//storing select tag with id 'project_id' in projectList
		let projectList = document.getElementById('project_id');

		//it fills the list of projects in select tag with id 'project_id'
		for (let project in xhr_response) {
			projectList.insertAdjacentHTML('beforeend', `<option value="${xhr_response[project].project_id}">${xhr_response[project].title}</option>`);

		}

		//saving response in this.projects
		this.projects = xhr_response;

	}

	/**
	 * This handles the change in select tag ('user_id') 
	 * @param {object} event an event object due to change in 'user_id'
	 */
	handleProjectChange(event) {
		console.log('----- handleProjectChange -----', event);
		// INSERT YOUR CODE BELOW THIS LINE

		//getting the selected value in the project form
		let valueOfProjectOption = event.target.value;

		//navigating to the body of the table and storing its rows in tbody
		let tbody = document.querySelector('#results tbody').rows;

		//storing select tag with ID 'user_id' in userSelectForm
		let userSelectForm = document.getElementById('user_id');

		//deciding whether the selected value in project form is default or not
		if (valueOfProjectOption == 'default') {
			//looping over the rows of the table
			for (let row in tbody) {
				if (tbody[row].tagName == 'TR') {
					//deciding whether the selected value in user form is default or not
					if (userSelectForm.value != 'default') {
						//only show the time entries that matches selected options in both forms (project and user)
						if (tbody[row].dataset.userId == userSelectForm.value) {
							tbody[row].hidden = false;
						}
						else {
							tbody[row].hidden = true;
						}

					}
					//means the selected option in user form is default means show all the time entries
					else {
						tbody[row].hidden = false;
					}
				}
			}
		}
		//means the selected value in project form is not default
		else {
			//looping over each time entry or row in the table 
			for (let row in tbody) {
				//if selected option is user form is default then do not worry about user form and show the time entries that matches the selected option of project form
				if (userSelectForm.value == 'default' && tbody[row].tagName == 'TR') {
					if (valueOfProjectOption == tbody[row].dataset.projectId) {
						tbody[row].hidden = false;
					}
					else {
						tbody[row].hidden = true;
					}
				}
				//only show the time entries that matches with the selected options in both project and user form
				else {
					if (tbody[row].tagName == 'TR') {
						if (valueOfProjectOption == tbody[row].dataset.projectId && userSelectForm.value == tbody[row].dataset.userId) {
							tbody[row].hidden = false;
						}
						else {
							tbody[row].hidden = true;
						}
					}
				}
			}
		}
	}


	/////////////////////////////////////////////
	//
	// USERS
	//
	/////////////////////////////////////////////

	/**
	 * This makes an api request to get list of users in specified company
	 */
	loadUsers() {
		console.log('----- loadUsers -----');
		// INSERT YOUR CODE BELOW THIS LINE

		//storing path of api for list of users (mentioned in API REFERENCE tab on website)
		let pathForUsers = `companies/${this.company_id}/users`;

		//creating GET request using TimeTrackerApi class object, also passing callback function
		api.makeRequest('GET', pathForUsers, {}, this.fillUsersWithResponse.bind(this));

		//calling loatTimeEntries() when list of users and projects are added successfully
		setTimeout(() => {
			if (this.users != undefined && this.projects != undefined) {
				this.loadTimeEntries();
			}
		}, 1000);
	}

	/**
	 * It fills the users with response in select form (user_id)
	 * @param {object} xhr_response The response from api which is list of users
	 */
	fillUsersWithResponse(xhr_response) {
		console.log('----- fillUsersWithResponse -----', xhr_response);
		// INSERT YOUR CODE BELOW THIS LINE

		//storing select tag with id 'user_id' in projectList
		let userList = document.getElementById('user_id');

		//it fills the list of users in select tag with id 'user_id'
		for (let user in xhr_response) {
			userList.insertAdjacentHTML('beforeend', `<option value="${xhr_response[user].user_id}">${xhr_response[user].first_name} ${xhr_response[user].last_name}</option>`);
		}

		//saving response in this.users
		this.users = xhr_response;

	}

	/**
	 * This handles the change in select tag 'project_id' 
	 * @param {object} event an event object due to change in form 'reports_filter_form'
	 */
	handleUserChange(event) {
		console.log('----- handleUserChange -----', event);
		// INSERT YOUR CODE BELOW THIS LINE

		//getting the selected value in the user form
		let valueOfUserOption = event.target.value;

		//navigating to the body of the table and storing its rows in tbody
		let tbody = document.querySelector('#results tbody').rows;

		//storing select tag with ID 'project_id' in projectSelectForm
		let projectSelectForm = document.getElementById('project_id');

		//deciding whether the selected value in user form is default or not
		if (valueOfUserOption == 'default') {
			//looping over the rows of the table
			for (let row in tbody) {
				if (tbody[row].tagName == 'TR') {
					//deciding whether the selected value in project form is default or not
					if (projectSelectForm.value != 'default') {
						//only show the time entries that matches selected options in both forms (project and user)
						if (tbody[row].dataset.projectId == projectSelectForm.value) {
							tbody[row].hidden = false;
						}
						else {
							tbody[row].hidden = true;
						}

					}
					//means the selected option in project form is default means show all the time entries					
					else {
						tbody[row].hidden = false;
					}
				}
			}
		}
		//means the selected value in user form is not default
		else {
			//looping over each time entry or row in the table 
			for (let row in tbody) {
				//if selected option is project form is default then do not worry about project form and show the time entries that matches the selected option of user form
				if (projectSelectForm.value == 'default' && tbody[row].tagName == 'TR') {
					if (valueOfUserOption == tbody[row].dataset.userId) {
						tbody[row].hidden = false;
					}
					else {
						tbody[row].hidden = true;
					}
				}
				//only show the time entries that matches with the selected options in both project and user form
				else {
					if (tbody[row].tagName == 'TR') {
						if (valueOfUserOption == tbody[row].dataset.userId && projectSelectForm.value == tbody[row].dataset.projectId) {
							tbody[row].hidden = false;
						}
						else {
							tbody[row].hidden = true;
						}
					}
				}
			}
		}
	}

	/////////////////////////////////////////////
	//
	// TIME ENTRIES
	//
	/////////////////////////////////////////////

	/**
	 * This makes an api request to get list of time entries
	 */
	loadTimeEntries() {
		console.log('----- loadTimeEntries -----');
		// INSERT YOUR CODE BELOW THIS LINE
		if (this.users != undefined && this.users != undefined) {
			let pathForEntries = `companies/${this.company_id}/entries`;
			//making an api request and passing pathForEntries as a path for API reference and fillTimeEntriesWithResponse as a callback function
			//note I am using .bind(this) to bind body of callback function to this class
			api.makeRequest('GET', pathForEntries, {}, this.fillTimeEntriesWithResponse.bind(this));
		}
	}

	/**
	 * This fills the time entries with the response from API server in table
	 * @param {object} xhr_response 
	 */
	fillTimeEntriesWithResponse(xhr_response) {
		console.log('----- fillTimeEntriesWithResponse -----', xhr_response);
		// INSERT YOUR CODE BELOW THIS LINE

		let tableBody = document.querySelector('#results tbody');

		// to go through every entries in the entry list and to insert required data in table cells
		for (let entry in xhr_response) {

			//to get total number of seconds in between the start and end date, I am using Date objects
			let startDate = new Date(xhr_response[entry].start_time);
			let endDate = new Date(xhr_response[entry].end_time);
			let totalSeconds = (endDate.getTime() - startDate.getTime()) / 1000;

			// to get total number of seconds in hours:munites:seconds format, I am using convertSecondsToHoursMinutesSeconds() that is in config.js
			let formattedTime = convertSecondsToHoursMinutesSeconds(totalSeconds);

			//inserting html in tableBody using afterbegin which helps to enter most recent time entry on the top
			tableBody.insertAdjacentHTML('afterbegin', `
			<tr data-project-id="${xhr_response[entry].project_id}" data-user-id="${xhr_response[entry].user_id}">
				<td>${xhr_response[entry].description}</td>
				<td>${this.projects[xhr_response[entry].project_id].title}</td>
				<td>${this.users[xhr_response[entry].user_id].first_name} ${this.users[xhr_response[entry].user_id].last_name}</td>
				<td>${formattedTime}</td>
				<td>${this.dateString(startDate.getFullYear() + '-' + (pad2Digits(startDate.getMonth() + 1)) + '-' + pad2Digits(startDate.getDate()) + ' ' + pad2Digits(startDate.getHours()) + ':' + pad2Digits(startDate.getMinutes()))}</td>
			</tr>
			`);//I used get methods to get different components of 'startDate' Date object and also used pad2Digits() to make the numbers two digits padded
		}
	}

	/**
	 * It formats the given string into date and time abbreviation
	 * @param {string} date The start date with time of a time entry
	 * @returns {string} the formatted start date with time abbreviation 
	 */
	dateString(date) {
		var months = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
		var year = date.substr(0, 4);
		var month = date.substr(5, 2);
		var day = date.substr(8, 2);

		//I am also formatting time since it is mentioned on the final project sheet (that is last point of "Filling the table")
		var time = date.substr(11);
		return months[parseInt(month)] + ' ' + day + ', ' + year + '  ' + time;
	}
}