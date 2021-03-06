/**
 * A class that handles anything to do with the Reports view
 */
//Person A: Time Tracker: 
class Track {
    /**
     * Constructor for the Track. Initialize a new Track object.
     * @param {api} api object
     * @param {company_id} company id to use API
     */
    constructor(api, company_id) {
        this.start_button = undefined;
        this.stop_button = undefined;
        this.track_form = undefined;

        // Update the timer immediately, then trigger the callback every second to update the clock
        localStorage.removeItem("timer_timestamp");//unsetting the old timestamps before getting started
        this.updateTimer();
        //every second running updateTimer() function
        setInterval(this.updateTimer, 1000);

        //setting tracker properties with parameters
        this.api = api;
        //setting tracker properties with parameters
        this.company_id = company_id;

        this.loadProjects();
        //binding click events, using arrow function as we need 'this' value inside function
        document.getElementById("start_button").addEventListener("click", (e) => this.start(e));
        //binding click events, using arrow function as we need 'this' value inside function
        document.getElementById("stop_button").addEventListener("click", (e) => this.stop(e));
    }

    /**
     * After each time interval, this method is called to update the timer.
     */
    updateTimer() {
        //console.log('----- updateTimer -----'); // disabled. too noisy
        let timestamp = localStorage.getItem("timer_timestamp");
        //if the start button is not pressed, this value is undefined. No point of proceeding
        if (!timestamp) return;
        //updating the timer
        document.getElementById('counter').textContent = convertSecondsToHoursMinutesSeconds((new Date().getTime() - Number(timestamp)) / 1000);
    }

    /////////////////////////////////////////////
    //
    // EVENTS
    //
    /////////////////////////////////////////////

    /**
     * Calls on start button click
     * @param {event} javascript event object
     */
    start(event) {
        console.log('----- start -----', event);
        //hiding the start button
        event.target.classList.add('hide-element');
        //saving current timestamp to localstorage
        localStorage.setItem("timer_timestamp", new Date().getTime());
        //showing stop button
        document.getElementById("stop_button").classList.remove('hide-element')
    }

    /**
     * Calls on stop button click
     * @param {event} javascript event object
     */
    stop(event) {
        console.log('----- stop -----', event);
        let description = document.getElementById("description").value;
        let projectId = document.getElementById("project_id").value;

        //Only if the start button pressed timer_timestamp value is available, otherwise no point of going forward.
        if (!localStorage.getItem("timer_timestamp")) {
            showError({error_code:1, error_message: "Timer not started"});
            return;
        }

        //making sure the values are present before sending value to API
        if (description.trim() === "" || !projectId) {
            showError({error_code:2, error_message: "description and porject id are mandatory"});
            return;
        }

        this.api.makeRequest
        ("POST", "projects/entries", {
                //calling API to store data
                description: description,
                project_id: projectId,
                //uses user id directly
                user_id: localStorage.getItem("user_id"),
                //localstorage values are strings, need to get the number value using "Number" in order to pass it into convertTimestampToDateFormat
                start_time: convertTimestampToDateFormat(Number(localStorage.getItem("timer_timestamp"))),
                end_time: convertTimestampToDateFormat(new Date().getTime())
            }, function (xhr_response) {
                console.log(xhr_response);
                //as the response is success, clearing out the data and resets to default, and removes localstorage data
                event.target.classList.add("hide-element");
                document.getElementById("start_button").classList.remove("hide-element");
                localStorage.removeItem("timer_timestamp");
                document.getElementById("counter").textContent = "";
                document.getElementById("description").value = "";
                document.getElementById("project_id").selectedIndex = 0;
                document.getElementById("project_id").value = "";
            }
        )

    }


    /////////////////////////////////////////////
    //
    // PROJECTS
    //
    /////////////////////////////////////////////


    /**
     * Loads the project details to the project dropdown
     */
    loadProjects() {
        //loading the project details as per API specs
        this.api.makeRequest("GET", "companies/" + this.company_id + "/projects", {}, this.fillProjectsWithResponse);
    }

    /**
     * on success call to project api, this is called.
     * @param {xhr_response} XHR response received from ajax call
     */
    fillProjectsWithResponse(xhr_response) {
        let projectElement = document.getElementById("project_id");
        let option;
        for (let key in xhr_response) {
            //making sure property is not a prototype property
            if (!xhr_response.hasOwnProperty(key)) continue;
            option = document.createElement("option");
            option.value = xhr_response[key].project_id;
            option.text = xhr_response[key].title;
            //adding each option to the dropdown
            projectElement.add(option);
        }
    }

}
