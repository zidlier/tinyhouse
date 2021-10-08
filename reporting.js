TINY_HOUSE.reporting = (function () {

	var functions = {}

	
	var generateReport = function (data) {

		let length_unit = 'ft'

		let {
            input_height,
            input_width,
            input_length,
            input_thk,
            input_truss_panel_spacing,
            input_truss_height,
            input_truss_offset,
            input_vertical_truss_width,
            input_roof_angle,
            // input-risk-category,
            // input-exposure-category,
            // input-stories,
            // input-site-address,
            // input-dead-load,
            // input-live-load,
            // input-dead-load-roof,
            // input-live-load-roof,
            // material-dropdown,
            // material-dropdown-2,
            // material-dropdown-3,
            // material-dropdown-b,
            // material-dropdown-2b,
            // material-dropdown-3b,
            // material-slider,
        } = data

		let num_stories = data['input-stories']

		let struc_height = (num_stories > 2) ? `<tr><td>Storey Height</td>	<td>${input_height} ${length_unit}</td> </tr>` : `<tr><td>Eave Height</td>	<td>${input_height} ${length_unit}</td> </tr>`


		let input_parameters = `
		<h3 class="ui header">Structure Data</h3>
		<table class="ui celled table">
			<thead>
				<tr><th>Parameter</th>	<th>Value</th> </tr>
			</thead>
			<tbody>
				${struc_height}
				<tr><td>Structure Length</td>	<td>${input_length} ${length_unit}</td> </tr>
				<tr><td>Structure Width</td>	<td>${input_width} ${length_unit}</td> </tr>
				<tr><td>Roof Apex Height</td>	<td>${input_truss_height} ${length_unit}</td> </tr>
				<tr><td>Truss Spacing</td>	<td>${input_truss_panel_spacing} ${length_unit}</td> </tr>
			</tbody>
		</table>

		<h3 class="ui header">Site Data</h3>
		<table class="ui celled table">
			<thead>
				<tr><th>Parameter</th>	<th>Value</th> </tr>
			</thead>
			<tbody>
				<tr><td>Site Address</td>	<td>${data['input-site-address']}</td> </tr>
				<tr><td>Risk Category</td>	<td>${data['input-risk-category']}</td> </tr>
				<tr><td>Exposure Category</td>	<td>${data['input-exposure-category']}</td> </tr>
			</tbody>
		</table>
		`


		

		jQuery('#results-content').html(input_parameters)



	}

	functions.generateReport = generateReport
	



	
	return functions;

})();