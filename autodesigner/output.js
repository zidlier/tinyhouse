/* ------ OUTPUT FUNCTIONS TO DISPLAY CERTAIN RESULTS -------- */

//main results

var input_param = SkyCivAutoDesigner.getData();

//main solve
function solveModelCases(callback) {

	//do whatever you need with your data
	var options = SkyCivAutoDesigner.options;
	
	for (var i = 0; i < model_cases; i++) {

		var title = 'span_'+model_cases_parameters.span+ '_trussheight_'+ model_cases_parameters.truss_height;

		var api_object = {
			"auth": {
				"username": "patrick@skyciv.com",
				"key": "LVBZgXsQgMcqykLB8EfYaIeHqdyaitYKqkXNZuGKH0RLAYIrvtCTdP8rzmLtCq2H"
			},
			"functions": [
				{
					"function": "S3D.session.start",
					"arguments": {
						"keep_open": true
					}
				},
				{
					"function": "S3D.model.set",
					"arguments": {
						"s3d_model": model_cases[i]
					}
				},
				{
					"function": "S3D.model.solve",
					"arguments": {
						"analysis_type": "buckling", //linear, nonlinear, buckling
						"repair_model": true
					}
				},
				{
					"function": "S3D.results.getAnalysisReport",
					"arguments": {
						"analysis_type": "buckling", //linear, nonlinear, buckling
						"repair_model": true,
						"sections": {
							"bom": true
						}
					}
				},
				{
					"function": "S3D.member_design.getInput",
					"arguments": {
						"design_code": input_param.code,
						"s3d_model": model_cases[i] //model_data
					}
				}
				
			]
		}
		
		skyciv.request(api_object, function (res) {

			console.log(res)
			console.log(res.response.msg); // do something with response
			SkyCivAutoDesigner.updateStatus(res.response.msg, "grey");
			postProcess(res);
	
			//store session id for faster loading
			options.auth.session_id = res.response.session_id;
			SkyCivAutoDesigner.options = options;
		
		});
	}


	


}


function postProcess(data) {

	jQuery("#run-btn").removeClass("loading");

	var max_buckling = 0.989;

	// var results = ["Check", "Result"];
	// results.push("Buckling", max_buckling, "positive");
	// results.push("Deflection Limit", max_buckling, "positive");

	var results = [];

	var table_header = ["Case", "span", "th, m", "W, kgs", "Connections", "UR"];
	results.push(table_header)

	results.push(["<i class=check circle icon></i>","1", "2", "3.5", "10180", "43", "0.6"])

	SkyCivAutoDesigner.tabulateOptimizerResults(results);


}

