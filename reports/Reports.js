/**
 * A class that handles anything to do with the Reports view
 */
class Reports {

	constructor(api, company_id) {
		// Must filled via the API calls
		this.projects = undefined;
		this.users = undefined;


		this.api = api;
		this.company_id = company_id;

		// INSERT YOUR CODE BELOW THIS LINE
		this.loadProjects();
		this.loadUsers();

		document.getElementById('reports_filter_form').addEventListener('change', (event) => {
			if (event.target.id == 'project_id') {
				this.handleProjectChange(event);
			}
			if (event.target.id == 'user_id') {
				this.handleUserChange(event);
			}
		});

	}

	/////////////////////////////////////////////
	//
	// PROJECTS
	//
	/////////////////////////////////////////////


	loadProjects() {
		console.log('----- loadProjects -----');
		// INSERT YOUR CODE BELOW THIS LINE
		let pathForProjects = `companies/${this.company_id}/projects`;
		api.makeRequest('GET', pathForProjects, {}, this.fillProjectsWithResponse.bind(this));
	}

	fillProjectsWithResponse(xhr_response) {
		console.log('----- fillProjectsWithResponse -----', xhr_response);
		// INSERT YOUR CODE BELOW THIS LINE
		let projectList = document.getElementById('project_id');
		for (let project in xhr_response) {
			projectList.insertAdjacentHTML('beforeend', `<option value="${xhr_response[project].project_id}">${xhr_response[project].title}</option>`);

		}
		this.projects = xhr_response;

	}

	handleProjectChange(event) {
		console.log('----- handleProjectChange -----', event);
		// INSERT YOUR CODE BELOW THIS LINE

		let valueOfProjectOption = event.target.value;
		let tbody = document.querySelector('#results tbody').rows;
		let userSelectForm = document.getElementById('user_id');

		if (valueOfProjectOption == 'default') {
			for (let row in tbody) {
				if (tbody[row].tagName == 'TR') {
					if (userSelectForm.value != 'default') {
						if (tbody[row].dataset.userId == userSelectForm.value) {
							tbody[row].hidden = false;
						}
						else {
							tbody[row].hidden = true;
						}

					}
					else {
						tbody[row].hidden = false;
					}
				}
			}
		}
		else {
			for (let row in tbody) {
				if (userSelectForm.value == 'default' && tbody[row].tagName == 'TR') {
					if (valueOfProjectOption == tbody[row].dataset.projectId) {
						tbody[row].hidden = false;
					}
					else {
						tbody[row].hidden = true;
					}
				}
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

	loadUsers() {
		console.log('----- loadUsers -----');
		// INSERT YOUR CODE BELOW THIS LINE
		let pathForUsers = `companies/${this.company_id}/users`;
		api.makeRequest('GET', pathForUsers, {}, this.fillUsersWithResponse.bind(this));
		setTimeout(() => {
			if (this.users != undefined && this.projects != undefined) {
				this.loadTimeEntries();
			}
		}, 2000);
	}

	fillUsersWithResponse(xhr_response) {
		console.log('----- fillUsersWithResponse -----', xhr_response);
		// INSERT YOUR CODE BELOW THIS LINE
		let userList = document.getElementById('user_id');
		for (let user in xhr_response) {
			userList.insertAdjacentHTML('beforeend', `<option value="${xhr_response[user].user_id}">${xhr_response[user].first_name} ${xhr_response[user].last_name}</option>`);
		}
		this.users = xhr_response;

	}

	handleUserChange(event) {
		console.log('----- handleUserChange -----', event);
		// INSERT YOUR CODE BELOW THIS LINE

		let valueOfUserOption = event.target.value;
		let tbody = document.querySelector('#results tbody').rows;
		let projectSelectForm = document.getElementById('project_id');

		if (valueOfUserOption == 'default') {
			for (let row in tbody) {
				if (tbody[row].tagName == 'TR') {
					if (projectSelectForm.value != 'default') {
						if (tbody[row].dataset.projectId == projectSelectForm.value) {
							tbody[row].hidden = false;
						}
						else {
							tbody[row].hidden = true;
						}

					}
					else {
						tbody[row].hidden = false;
					}
				}
			}
		}
		else {
			for (let row in tbody) {
				if (projectSelectForm.value == 'default' && tbody[row].tagName == 'TR') {
					if (valueOfUserOption == tbody[row].dataset.userId) {
						tbody[row].hidden = false;
					}
					else {
						tbody[row].hidden = true;
					}
				}
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

	loadTimeEntries() {
		console.log('----- loadTimeEntries -----');
		// INSERT YOUR CODE BELOW THIS LINE
		for (let project in this.projects) {
			let pathForEntries = `projects/${this.projects[project].project_id}/entries`;
			api.makeRequest('GET', pathForEntries, {}, this.fillTimeEntriesWithResponse.bind(this));
		}

	}

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
			tableBody.insertAdjacentHTML('afterbegin', `
			<tr data-project-id="${xhr_response[entry].project_id}" data-user-id="${xhr_response[entry].user_id}">
				<td>${xhr_response[entry].description}</td>
				<td>${this.projects[xhr_response[entry].project_id].title}</td>
				<td>${this.users[xhr_response[entry].user_id].first_name} ${this.users[xhr_response[entry].user_id].last_name}</td>
				<td>${formattedTime}</td>
				<td>${this.dateString(startDate)}</td>
			</tr>
			`);
		}
	}

	dateString(date) {
		var months = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

		return months[date.getMonth() + 1] + ' ' + date.getDate() + ', ' + date.getFullYear();
	}
}