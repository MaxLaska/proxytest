
    
(function (atjs) {

	// Save the main function in a different variable, to be called later
	// ahem, "cheap inheritance"


	atjs.parentStart = atjs.start;

	atjs.start = function (params) {
		atjs.parentStart(params);   // Let awesometable load up as normal

		// Set up things as you need them to be set up, using the params object
        // You can edit the <script> content to pass information to that params object
        
	};

	atjs.parentUpdate = atjs.update;

	atjs.update = function () {
		atjs.parentUpdate();  // calls the default handler

		// Do whatever else you need to do here.
	};

	atjs.controllers.didChange = function (id) {
		// Lets you know if content of the controllers have changed
		// No need to call the default handler
	}


}(this.atjs));