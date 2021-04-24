/**
 * A class that handles anything to do with the Projects view
 */
//Person C: Projects: Jashandeep S. Bains
class Projects {

	/**
	 * Constructs the Projects class
	 * @param {string} api The API object to be used
	 * @param {string} company_id The company_id for the class
	 * @param {function} this.loadProjects() calls the loadProjects function
	 * @param {object} form form from the DOM
	 * @param {function} this.hideForm() calls the hideForm function
	 * @param {object} new_project_button projectButtom from the DOM
	 * @param {object} submit_button submittionButton from the DOM
	 */
	constructor(api, company_id)
	{
		this.project_form = undefined;

		this.api = api;
		this.company_id = company_id;

		// INSERT YOUR CODE BELOW THIS LINE

    this.loadProjects();

		this.form = document.getElementById('project_form');

	  this.hideForm();

		this.new_project_button = document.getElementById('new_project_button');

		new_project_button.addEventListener('click', this.showCreateForm.bind(this));

		this.submit_button = document.getElementById('submit_button');

    submit_button.addEventListener('click',this.handleFormSubmit.bind(this));

	}

	/////////////////////////////////////////////
	//
	// PROJECTS
	/////////////////////////////////////////////
	//

	/**
	 * Makes a request to the API to get list of all projects
	 * It then pass the fillProjectsWithResponse function as a success handler
	 * and uses the xhr response as parameter
	 */
	loadProjects()
	{
		console.log('----- loadProjects -----');
		// INSERT YOUR CODE BELOW THIS LINE
		this.api.makeRequest('GET','companies/' + this.company_id + '/projects',{}, this.fillProjectsWithResponse.bind(this));

	}

	/**
	 * fills the project table and uses createProjectRow function for creating each row
	 * @param {object} result - response from the API call
	 * @param {object} listOfProjects - an array for all the projects
	 * @param {object} eachProject - An empty object for each project to put it in array
	 * @param {object} p - An object for each project to put it in array
	 * @param {function} this.createProjectRow(p) - function to create each row with a parameter p which is each project object
	 */
	fillProjectsWithResponse(xhr_response)
	{
	  console.log('----- fillProjectsWithResponse -----', xhr_response);
		// INSERT YOUR CODE BELOW THIS LINE
		let result  = xhr_response;

    let listOfProjects = new Array();

    let eachProject = {};

	 for (let key in result) {
			let p = result[key];
			listOfProjects.push(p);
		  this.createProjectRow(p);
		}

	}

	/**
	 * creates a new row with all the data in the project table
	 * title when clicked show the edit form
	 * delete when clicked deletes the row from table and delete project from server
	 * @param {object} projects_table - to access the project table from DOM
	 * @param {object} project_tbody - to access the project table body from DOM
	 * @param {object} tableRow - creates an empty row into the project table body
	 * @param {object} project_id - creates ID cell into the row
	 * @param {object} title - creates title cell into the row
	 * @param {object} titleLink - creates a link element in html to make title clickable
	 * @param {object} num_entries - creates num_entries cell into the row
	 * @param {object} deleteB - creates cell for deleteButton into the row
   * @param {object} deleteButton - creates a link element in html to make deleteButton clickable
	 * @param {function} this.showEditForm() - function to show the edit form
	 * @param {function} this.handleDelete() - function to delete a table row and project
	 */
	createProjectRow(project)
	{
		console.log('----- createProjectRow -----', project);
		// INSERT YOUR CODE BELOW THIS LINE

		let projects_table = document.getElementById('projects_table');
		let project_tbody = projects_table.tBodies[0];

		let tableRow = document.createElement('tr');
		tableRow.id = 'project_' + project.project_id ;
		this.projectID = project.project_id;

		let project_id = document.createElement('td');
		project_id.id = 'project_id';
		project_id.textContent = project.project_id;
    tableRow.append(project_id);

		let title = document.createElement('td');
		title.id = 'title';
		tableRow.append(title);

    let titleLink = document.createElement('a');
		titleLink.href = '#';
		titleLink.classList.add('edit_link');
    titleLink.textContent = project.title;
		titleLink.addEventListener('click', this.showEditForm.bind(this,project));
		title.append(titleLink);

		let num_entries = document.createElement('td');
		num_entries.id = 'entries';
    num_entries.textContent = project.num_entries;
    tableRow.append(num_entries);

	  let deleteB = document.createElement('td');
		deleteB.id = 'deleteB';
		let deleteButton = document.createElement('a');
		deleteButton.href = '#';
		deleteButton.classList.add('delete_link');
		deleteButton.textContent = 'Delete';
		deleteButton.addEventListener('click', this.handleDelete.bind(this,project));
		deleteB.append(deleteButton);
    tableRow.append(deleteB);

		project_tbody.append(tableRow);
	}

	/////////////////////////////////////////////
	//
	// FORMS
	//
	/////////////////////////////////////////////

	/**
	 * showCreateForm shows the empty form to create a new project with empty fields
   */
	showCreateForm(event)
	{
		console.log('----- showCreateForm -----', event);
		// INSERT YOUR CODE BELOW THIS LINE
		this.form.title.value = null;
		this.form.form_project_id.value = 0;
		this.form.style.display='block';
		this.form.submit_button.value = 'Create Project';

	}

	/**
	 * showEditForm shows the form to edit the project which is clicked with its values in fields
	 */
	showEditForm(event)
	{
		console.log('----- showEditForm -----', event);
		// INSERT YOUR CODE BELOW THIS LINE
		this.form.title.value = event.title;
		this.form.form_project_id.value = event.project_id;
		this.form.style.display='block';
		this.form.submit_button.value = 'Edit Project';

	}

	/**
	 * hideForm hides the form
	 */
	hideForm()
	{
		console.log('----- hideForm -----');
		// INSERT YOUR CODE BELOW THIS LINE
		// console.log(this.form);
		 this.form.style.display='none';

	}

	/**
	 * handleFormSubmit handles the form when submitted and makes the api call
	 * if our form is in create mode then it use createNewProject to create a new project
	 * and if it is in edit mode it use updateProject function to submit an edit request
	 * @param {function} preventDefault - prevents the page from reloading (preventing the default)
 	 * @param {String} reqTitle - title which is in the field of our form
 	 * @param {object} para - object with a property title and with a value of reqTitle
 	 * @param {String} a - api
 	 * @param {function} createNewProject - creates a new project in our project table
 	 * @param {function} updateProject - updates a new project in our project table
	 */
	handleFormSubmit(event)
	{
		console.log('----- handleFormSubmit -----', event);
		// INSERT YOUR CODE BELOW THIS LINE

	  	event.preventDefault();

      let reqTitle = this.form.title.value;
      let para = {
				title: reqTitle
			};

      let a = this.api;

			if(this.form.form_project_id.value == 0){
         a.makeRequest('Post', 'projects/', para, this.createNewProject.bind(this));
	  	}
			else {
        a.makeRequest('Patch', `projects/${this.form.form_project_id.value}`, para, this.updateProject.bind(this));
			}
	}

	/////////////////////////////////////////////
	//
	// CREATE / EDIT
	//
	/////////////////////////////////////////////

	/**
	 * createNewProject creates a new project row into our table
	 * using createProjectRow function with the response form the xhr as a parameter
	 * and then hiding the form
 	 * @param {function} this.createProjectRow(xhr_response) - function to create a new row using the response
	 */
	 createNewProject(xhr_response)
	{
		console.log('----- createNewProject -----', xhr_response);
		// INSERT YOUR CODE BELOW THIS LINE

    this.createProjectRow(xhr_response);

		this.form.style.display='none';
	}

	/**
	 * updateProject updates a project row with the values form xhr responce
	 * and then hiding the form
	 * @param {object} reply - response from the API call
	 * @param {object} rowToEdit - getting the row which is to be edited fromDOM
	 * @param {object} projects_table - to access the project table from DOM
	 * @param {object} project_tbody - to access the project table body from DOM
	 * @param {object} project_id - to access the project project_id body from DOM
   * @param {object} title - to access the project title from DOM
   * @param {object} num_entries - to access the project num_entries from DOM
	 */
	updateProject(xhr_response)
	{
		console.log('----- updateProject -----', xhr_response);
		// INSERT YOUR CODE BELOW THIS LINE
		let reply = xhr_response;

		let rowToEdit = document.getElementById(`project_${reply.project_id}`);

		let projects_table = document.getElementById('projects_table');
		let project_tbody = projects_table.tBodies[0];

		let project_id = document.getElementById('project_id');
		project_id.textContent = reply.project_id;

		let title = document.getElementById('title');
		let titleText = title.getElementsByClassName("edit_link");
		titleText[0].textContent =  reply.title;

		let num_entries = document.getElementById('entries');
		num_entries.textContent = reply.num_entries;

		this.form.style.display='none';
	}

	/////////////////////////////////////////////
	//
	// DELETE
	//
	/////////////////////////////////////////////

	/**
	 * handleDelete deletes the project from the server
	 */
	handleDelete(event)
	{
		console.log('----- handleDelete -----', event);
		// INSERT YOUR CODE BELOW THIS LINE
		this.api.makeRequest('Delete','projects/' + event.project_id ,{}, this.updateFromDelete.bind(this));
	}

	/**
	 * updateFromDelete deletes the project from the table
	 * @param {object} rep - response from the API call
	 * @param {object} rowToDelete -  to access the project row from DOM which is to be deleted
   * @param {function} remove - function to remove that row
	 */
	updateFromDelete(xhr_response)
	{
		console.log('----- updateFromDelete -----', xhr_response);
		// INSERT YOUR CODE BELOW THIS LINE
		let rep = xhr_response;
		let rowToDelete = document.getElementById(`project_${rep.project_id}`);
		rowToDelete.remove();
	}

}
