TINY_HOUSE.reporting = (function () {

	var functions = {}

	function prettyPrint(val) {
		val = parseFloat(val)
		if (isNaN(val)) return
		return val.toFixed(3);
	}

	var generateReport = function () {

		// let length_unit = 'ft'

		// let {
		// 	input_height,
		// 	input_width,
		// 	input_length,
		// 	input_thk,
		// 	input_truss_panel_spacing,
		// 	input_truss_height,
		// 	input_truss_offset,
		// 	input_vertical_truss_width,
		// 	input_roof_angle,
		// 	// input-risk-category,
		// 	// input-exposure-category,
		// 	// input-stories,
		// 	// input-site-address,
		// 	// input-dead-load,
		// 	// input-live-load,
		// 	// input-dead-load-roof,
		// 	// input-live-load-roof,
		// 	// material-dropdown,
		// 	// material-dropdown-2,
		// 	// material-dropdown-3,
		// 	// material-dropdown-b,
		// 	// material-dropdown-2b,
		// 	// material-dropdown-3b,
		// 	// material-slider,
		// } = data

		// let num_stories = data['input-stories']

		// let struc_height = (num_stories > 2) ? `<tr><td>Storey Height</td>	<td>${input_height} ${length_unit}</td> </tr>` : `<tr><td>Eave Height</td>	<td>${input_height} ${length_unit}</td> </tr>`


		// let input_parameters = `
		// <h3 class="ui header">Structure Data</h3>
		// <table class="ui celled table center aligned">
		// 	<thead>
		// 		<tr><th>Parameter</th>	<th>Value</th> </tr>
		// 	</thead>
		// 	<tbody>
		// 		${struc_height}
		// 		<tr><td>Structure Length</td>	<td>${input_length} ${length_unit}</td> </tr>
		// 		<tr><td>Structure Width</td>	<td>${input_width} ${length_unit}</td> </tr>
		// 		<tr><td>Roof Apex Height</td>	<td>${input_truss_height} ${length_unit}</td> </tr>
		// 		<tr><td>Truss Spacing</td>	<td>${input_truss_panel_spacing} ${length_unit}</td> </tr>
		// 	</tbody>
		// </table>

		// <h3 class="ui header">Site Data</h3>
		// <table class="ui celled table center aligned">
		// 	<thead>
		// 		<tr><th>Parameter</th>	<th>Value</th> </tr>
		// 	</thead>
		// 	<tbody>
		// 		<tr><td>Site Address</td>	<td>${data['input-site-address']}</td> </tr>
		// 		<tr><td>Risk Category</td>	<td>${data['input-risk-category']}</td> </tr>
		// 		<tr><td>Exposure Category</td>	<td>${data['input-exposure-category']}</td> </tr>
		// 	</tbody>
		// </table>
		// `



		input_parameters = functions.processOptimizerResult()

		input_parameters +=`
		<div>
		<button id="snow-report-btn" class="ui blue compact button">Snow Report</button>
		<button id="wind-report-btn" class="ui blue compact button">Wind Report</button>
		</div>
		`

		jQuery('#snow-report-btn').click(function(){
			window.open(TINY_HOUSE.analysis.getSnowReport(), 'window name', 'window settings');
			return false;
		});


		jQuery('#wind-report-btn').click(function(){
			window.open(TINY_HOUSE.analysis.getWindReport(), 'window name', 'window settings');
			return false;
		});



		jQuery('#results-content').html(input_parameters)

	}

	functions.generateReport = generateReport


	functions.processOptimizerResult = function () {
		let optimizer_res = TINY_HOUSE.analysis.getOptimizerResults()
		let current_section = TINY_HOUSE.analysis.getCurrentSections()
		let location = ['Wall', 'Truss', 'Purlin' ]
		

		function resultTable(val){
			let pass = `<i class="large check circle green middle aligned icon"></i>`
			let failed =  `<i class="large remove red middle aligned icon"></i>`
			let result
			if(val >= 1){
				result = failed
			} else {
				result  = pass
			}

			return result

		}
		let table_content = ``

		for (let i = 0; i < optimizer_res.length; i++) {
			let this_res = optimizer_res[i]

			let {section_height, max_UR_ratio} = this_res
			let this_section = current_section[i]
			let this_section_name = this_section[3]
			table_content += `<tr>	<td>${location[i]}</td>	<td>${this_section_name}</td> <td>${section_height}</td> <td>${prettyPrint(max_UR_ratio)}</td> <td>${resultTable(max_UR_ratio)}</td> </tr>`

		}

		let result_table = `
		<h3 class="ui header">Section Optimization</h3>
		<table class="ui celled table center aligned">
			<thead>
				<tr><th>Location</th>	<th>Original Section</th> 	<th>Optimized Section</th>	<th>Utitlity Ratio (UR)</th> <th>Remarks</th> </tr>
			</thead>
			<tbody>
				${table_content}
			</tbody>
		</table>

		`

		return result_table
	}



	functions.processMemberDesignResults = function (result) {

		return

		let table_content = ``

		let {
			critical,
			failed_members,
			passed_members
		} = result.summary

		let total_passed_members = Object.keys(passed_members).length
		let total_failed_members = Object.keys(failed_members).length

		table_content += `<p>`

		table_content += `${total_passed_members} passed the design check while ${total_failed_members} members failed. `

		if (total_failed_members > 0) {
			table_content += `Failed members are: `

			for (let i = 0; i < failed_members.length; i++) {
				let id = failed_members[i]
				table_content += (i < failed_members.length - 1) ? `${id}, ` : `and ${id}. `
			}

			// table_content += `<br><br>Critical `

		}

		table_content += `</p>`

		jQuery('#results-content').html(table_content)

	}



	return functions;

})();