/* ------ INPUT FUNCTIONS TO DISPLAY CERTAIN RESULTS -------- */

//this will build your file format, extract the data and load the data
SkyCivAutoDesigner.input_variables = {
	project_name: {
		type: "text",
		label: "Project Name",
		run_change: false, //true by default
	},
	eave_height: {
		type: "number",
		label: "Column Height, H",
		units: "m",
		default: 9
	},
	structure_width: {
		type: "number",
		label: "Width, B",
		units: "m",
		default: 15
	},
	structure_length : {
		type: "number",
		label: "Length, L",
		units: "m",
		default: 20
	},
	max_truss_height : {
		type: "number",
		label: "Max. truss height",
		units: "m",
		default: 4
	},
	min_truss_height : {
		type: "number",
		label: "Min. truss height",
		units: "m",
		default: 3
	},
	min_frame_spacing : {
		type: "number",
		label: "Min. frame spacing",
		units: "m",
		default: 6
	},
	column_section: {
		type: "section",
		label: "Column Section",
		default: "W14x808"
	},
	beam_section: {
		type: "section",
		label: "Beam Section",
		default: "W14x808"
	},	
	purlin_section: {
		type: "section",
		label: "Purlin Section",
		default: "W14x808"
	},
	code: {
		type: "text",
		label: "Design Code",
		default: "AISC_360-16_LRFD"
	},
	max_UR: {
		type: "number",
		label: "Max. Utility Ratio",
		default: 0.90
	},

	roof_dead_load : {
		type: "number",
		label: "Roof Dead Load",
		units: "kPa",
		default: 1.0
	},
	roof_live_load : {
		type: "number",
		label: "Roof Live Load",
		units: "kPa",
		default: 0.75
	},
	site_address: {
		type: "text",
		label: "Project Address",
		default: "Sydney NSW, Australia",
		button: true
	}
}

var wind_speed;
var model_cases = [];
var model_cases_repaired = [];
var test_model = {};
var model_cases_parameters = [];
var wind_load_cases = [];
var wind_model_cases = [];
var wind_result = [];

var weight_cases = [];

var distributed_loads_cases = [];

var warehouse_functions = {};


function generateModelCases() {
	
	var input_values = SkyCivAutoDesigner.getData();
	jQuery('#generate-model-cases-btn').addClass('loading');

	// STRUCTURE DETAIL
	var structure_width = parseFloat(input_values.structure_width);
	var structure_height = parseFloat(input_values.eave_height);
	var structure_length = parseFloat(input_values.structure_length);
	var max_truss_height = parseFloat(input_values.max_truss_height);
	var min_truss_height = parseFloat(input_values.min_truss_height);
	var min_frame_spacing = parseFloat(input_values.min_frame_spacing);

	// MEMBER DETAIL
	var column_section = input_values.column_section;
	var beam_section = input_values.beam_section;
	var purlin_section = input_values.purlin_section;
	var code = input_values.code;
	var max_UR = parseFloat(input_values.max_UR);

	// LOADS
	var roof_dead_load = parseFloat(input_values.roof_dead_load);
	var roof_live_load = parseFloat(input_values.roof_live_load);
	var site_address = input_values.site_address;

	var pitch_angle = Math.atan(min_truss_height/(0.5*structure_width))*(180/Math.PI)
	if (pitch_angle < 10) {
		min_truss_height = Math.tan(10*(Math.PI/180))*0.5*structure_width;
		jQuery("#min_truss_height").val(min_truss_height);
	}

	
	// renderAssembly(SKYCIV.structure.parametric.init({
	// 	assembly_obj: portal_frame
	// }));

	model_cases = [];
	model_cases_parameters  = [];
	wind_load_cases = [];
	wind_model_cases = [];
	wind_result = [];

	var minimum_frame_spacing = min_frame_spacing; //in m
	var max_number_of_span =  Math.ceil(structure_length/minimum_frame_spacing);

	var increment_on_pitch = 0.5; // in m
	var number_of_increment_pitch = Math.floor((max_truss_height-min_truss_height)/increment_on_pitch);

	var max_spacing_of_purlin = 0.6; // in m, center to center
	
	


	// PATRICK SAMPLE
	wind_model_cases.push({'roof_mean_height': max_truss_height+structure_height, 'pitch_angle': Math.atan(max_truss_height/(0.5*structure_width))*(180/Math.PI)});

	



	for(var j=1; j <= Math.ceil(max_number_of_span); j++) {
		var portal_frame = {
			"id": 1,
			"title": "Portal Frame",
			"variables": {
				"eave_to_ridge_height": { "value": min_truss_height, "type": "float", "units": "length" },
				"building_width": { "value": structure_width, "type": "float", "units": "length" },
				"building_length": { "value": structure_length, "type": "float", "units": "length" },
				"column_height": { "value": structure_height, "type": "float", "units": "length" },
				"number_of_trusses": { "value": 2, "type": "integer" },
				"number_of_panels": { "value": 4, "type": "integer" },
				"truss_style": { "value": "cross", "type": "truss_style" }
			},
			"steps": [
				// MEMBER 1 - BEAM 1
				{
					cad_type: "cad_line",
					type: "points",
					points: [
						{x : 0, y: "~~column_height~~", z: 0},
						{x : "~~building_width*0.5~~", y: "~~column_height + eave_to_ridge_height~~", z: 0}
					],
					segments: "~~number_of_trusses~~",
					section_id: 2
				},
				// MEMBER 2 - BEAM 2
				{
					cad_type: "cad_line",
					type: "points",
					points: [
						{x : "~~building_width~~", y: "~~column_height~~", z: 0},
						{x : "~~building_width*0.5~~", y: "~~column_height + eave_to_ridge_height~~", z: 0}
					],
					segments: "~~number_of_trusses~~",
					section_id: 2
				},
				// MEMBER 3 - COLUMN 1
				{
					cad_type: "cad_line",
					type: "points",
					points: [
						{x : 0, y: 0, z: 0},
						{x : 0, y: "~~column_height~~", z: 0}
					],
					segments: 1,
					section_id: 1
				},
				// MEMBER 4 - COLUMN 4
				{
					cad_type: "cad_line",
					type: "points",
					points: [
						{x : "~~building_width~~", y: 0, z: 0},
						{x : "~~building_width~~", y: "~~column_height~~", z: 0}
					],
					segments: 1,
					section_id: 5
				},
				{
					cad_type: "cad_repeat",
					type: "startend",
					repetitions: "~~number_of_trusses~~",
					ref_ids: ["1","2"],
					start_pt: {x: 0, y: 0, z: 0},
					end_pt: {x: 0, y: 0, z: "~~building_length~~"},
				},
				{
					cad_type: "cad_repeat",
					type: "startend",
					repetitions: "~~number_of_trusses~~",
					ref_ids: ["3","4"],
					start_pt: {x: 0, y: 0, z: 0},
					end_pt: {x: 0, y: 0, z: "~~building_length~~"},
				},
	
				{
					cad_type: "cad_line",
					type: "vector",
					ref_pt : {x : 0, y: "~~column_height~~", z: 0},
					vector: [0,0,1],
					length:  "~~building_length~~",
					segments: "~~number_of_trusses~~",
					section_id: 2
				},
				{
					cad_type: "cad_line",
					type: "points",
					points: [
						{x : "~~building_width~~", y: "~~column_height~~", z: 0},
						{x : "~~building_width~~", y: "~~column_height~~", z:  "~~building_length~~"}  
					],
					segments: "~~number_of_trusses~~",
					section_id: 2
				},
				{
					cad_type: "cad_line",
					type: "points",
					points: [
						{x : "~~building_width*0.5~~", y: "~~column_height+eave_to_ridge_height~~", z: 0},
						{x : "~~building_width*0.5~~", y: "~~column_height+eave_to_ridge_height~~", z:  "~~building_length~~"}  
					],
					segments: "~~number_of_trusses~~",
					section_id: 2
				}
			]
		};

		var assembly_object = {}; //core assembly object
		assembly_object = portal_frame;
		assembly_object.variables["number_of_trusses"].value = j;
		var column_beam_assembly = assembly_object.steps
		
		for (var k = 0; k <= number_of_increment_pitch; k++) {
			assembly_object.variables["eave_to_ridge_height"].value = (k*increment_on_pitch >= max_truss_height-min_truss_height) ? max_truss_height : min_truss_height+k*increment_on_pitch;
		
			var roof_mean_height = assembly_object.variables["eave_to_ridge_height"].value*0.5+structure_height;
			pitch_angle = Math.atan(assembly_object.variables["eave_to_ridge_height"].value/(0.5*structure_width))*(180/Math.PI);
			// if (j==1) wind_model_cases.push({'roof_mean_height': roof_mean_height, 'pitch_angle': pitch_angle});

			var length_of_half_truss = Math.pow(assembly_object.variables["eave_to_ridge_height"].value*assembly_object.variables["eave_to_ridge_height"].value + (0.5*structure_width)* (0.5*structure_width),0.5);
			var number_of_purlin = Math.ceil(length_of_half_truss/max_spacing_of_purlin);
			var current_spacing_purlin = length_of_half_truss/number_of_purlin;
			
			var purlin_array = [];
			
			function addPurlintoMember(memberid,percent, section_id) {
				purlin_array.push({
					cad_type: "cad_line",
					type: "vector",
					ref_pt : {cad_id : memberid, cad_perc: percent},
					vector: [0,0,1],
					segments: "~~number_of_trusses~~",
					length: "~~building_length~~",
					section_id: section_id
				});
			}

			for (var g = 1; g < number_of_purlin; g++) {
				var percentage = (g/number_of_purlin)*100;
				addPurlintoMember("1",percentage,3);
				addPurlintoMember("2",percentage,4);
			}

			assembly_object.steps = [...column_beam_assembly,...purlin_array];

			// INITIALIZE PARAMETRIC MODEL
			var s3d_model = SKYCIV.structure.parametric.init({
				assembly_obj: assembly_object
			});

			// INITIALIZE MATERIAL
			s3d_model.materials["1"] = {
				"name": "Structural Steel",
				"elasticity_modulus": 199950,
				"density": 7850,
				"poissons_ratio": 0.3,
				"yield_strength": 260,
				"ultimate_strength": 410,
				"class": "steel"
			}


			// INITIALIZE SUPPORT
			var fixed_node = [];
			var support_obj = {};
			for (var node in s3d_model.nodes) {
				if (s3d_model.nodes[node].y == 0) fixed_node.push({ "node": parseFloat(node), "restraint_code": "FFFFFF", "tx": 0, "ty": 0, "tz": 0, "rx": 0, "ry": 0, "rz": 0 })
			}
				
			for (var m =0; m < fixed_node.length; m++) {
				var support_node_val = fixed_node[m];
				var support_key = String(fixed_node.indexOf(support_node_val)+1);
				support_obj[support_key] =  fixed_node[m];
			}
			s3d_model.supports = support_obj;

			// INITIALIZE SECTION
			// column - windward
			s3d_model.sections = {};

			s3d_model.sections["1"] = {
				"load_section": [
					"American",
					"AISC",
					getSectionType(column_section),
					column_section
				],
				"material_id":1
			}
			// column - leeward
			s3d_model.sections["5"] = s3d_model.sections["1"]
		
			// beam
			s3d_model.sections["2"] = {
				"load_section": [
					"American",
					"AISC",
					getSectionType(beam_section),
					beam_section
				],
				"material_id":1
			}

			// purlin - in member 1
			s3d_model.sections["3"] = {
				"load_section": [
					"American",
					"AISC",
					getSectionType(purlin_section),
					purlin_section
				],
				"material_id":1
			}
			// purlin - in member 2
			s3d_model.sections["4"] = s3d_model.sections["3"];

			// INITIALIZE OFFSET AND ANGLE OF PURLIN


			// INITIALIZE LOADS
			// SELFWEIGHT
			s3d_model.self_weight = {};
			s3d_model.self_weight["1"] = { "LG": "SW1", "x": 0, "y": -1, "z": 0 };

			// ROOF LOADS
			var purlin_dl = roof_dead_load*current_spacing_purlin;
			var purlin_ll = roof_live_load*current_spacing_purlin;

			var purlin_loads = [];

			function addLoadToPurlin (load, loadgroup) {
				for (var mem_id in s3d_model.members) {
					if (s3d_model.members[mem_id].section_id == 3 || s3d_model.members[mem_id].section_id == 4) purlin_loads.push({
						"member": mem_id,
						"x_mag_A": 0,
						"y_mag_A": -load,
						"z_mag_A": 0,
						"x_mag_B": 0,
						"y_mag_B": -load,
						"z_mag_B": 0,
						"position_A": 0,
						"position_B": 100,
						"load_group": loadgroup,
						"axes": "global"
					})
				}
			}
			

			addLoadToPurlin(purlin_dl,"SDL");
			addLoadToPurlin(purlin_ll,"LL");

			distributed_loads_cases.push([...purlin_loads]);
			// WIND LOAD

			
			// s3d_model.distributed_loads = {};
			// for (var m =0; m < purlin_loads.length; m++) {
			// 	var load_val = purlin_loads[m];
			// 	var load_key = String(purlin_loads.indexOf(load_val)+1);
			// 	s3d_model.distributed_loads[load_key] = purlin_loads[m]
			// }

			// CREATE LOAD GROUP
			s3d_model.load_combinations ={
				"1": {
					"SW1": 1.4,
					"DL": 1.4,
					"LL": 0,
					"WL1": 0,
					"WL2": 0,
					"name": "1.4D"
				},
				"2": {
					"SW1": 1.2,
					"DL": 1.2,
					"LL": 1.6,
					"WL1": 0,
					"WL2": 0,
					"name": "1.2D + 1.6L"
				},
				"3": {
					"SW1": 1.2,
					"DL": 1.2,
					"LL": 0,
					"WL1": 1.6,
					"WL2": 0,
					"name": "1.2D + 1.6WL1"
				},
				"4": {
					"SW1": 1.2,
					"DL": 1.2,
					"LL": 0,
					"WL1": 0,
					"WL2": 1.6,
					"name": "1.2D + 1.6WL2"
				}
			}

			
			// INITIALIZE LOAD CASES
			s3d_model.load_cases["AISC"] = {
				"SW1": "Dead: dead",
				"DL": "Dead: dead",
				"LL": "Live: live",
				"WL1": "Wind: wind",
				"WL2": "Wind: wind"
			}


			model_cases_parameters.push({"span": assembly_object.variables["number_of_trusses"].value,"truss_height": assembly_object.variables["eave_to_ridge_height"].value, "roof_mean_height": roof_mean_height, "pitch_angle": pitch_angle})
			model_cases.push(s3d_model);

			renderAssembly(s3d_model);

		}
	}
	

	console.log(model_cases_parameters)
	generateModelCaseTable();

	if (wind_result.length == 0) generateWindLoadcases(site_address,structure_length,structure_width, wind_model_cases);

	// jQuery('#add-wind-load-btn').addClass('loading');

}

function addWindLoadToPurlin(model_case,id,load, loadgroup, section) {
	for (var mem_id in model_case.members) {
		if (model_case.members[mem_id].section_id == section) distributed_loads_cases[id].push({
			"member": mem_id,
			"x_mag_A": 0,
			"y_mag_A": load,
			"z_mag_A": 0,
			"x_mag_B": 0,
			"y_mag_B": load,
			"z_mag_B": 0,
			"position_A": 0,
			"position_B": 100,
			"load_group": loadgroup,
			"axes": "local"
		})
	}
}

function addWindLoadToColumn (model_case,id,load, loadgroup, section) {
	
	for (var mem_id in model_case.members) {
		if (model_case.members[mem_id].section_id == section) distributed_loads_cases[id].push({
			"member": mem_id,
			"x_mag_A": load,
			"y_mag_A": 0,
			"z_mag_A": 0,
			"x_mag_B": load,
			"y_mag_B": 0,
			"z_mag_B": 0,
			"position_A": 0,
			"position_B": 100,
			"load_group": loadgroup,
			"axes": "global"
		})
	}
}


function generateWindLoadcases(site,length, width, cases) {

	for (var i = 0; i < cases.length; i++) {
		var this_case = cases[i];

		var wind_api_object = {
			"auth": {
				"username": "patrick@skyciv.com",
				"key": "LVBZgXsQgMcqykLB8EfYaIeHqdyaitYKqkXNZuGKH0RLAYIrvtCTdP8rzmLtCq2H"
			},
			"functions": [
				{
					"function": "wind.getWindSpeed",
					"arguments": {
						design_code: "as1170", 
						project_address: site, 
						ari: "200",
		
						sls_and_uls: false, //requires below information
						country: "australia", 
						design_working_life: "25_years", 
						importance_level: "3",
		
						terrain_data: true,
						wind_source_direction: "E",
						terrain_category: "CAT2",
						topo_image: false
					}
				},
				{
					"function": "wind.getPressures",
					"arguments": {
						"design_code": "as1170",
						"structure_type": "closed", //closed, partially_enclosed, cladding
						"roof_profile": "gable", //hip, monoslope
						"building_dimensions": {
							"length": length,
							"width": width,
							"height": this_case.roof_mean_height,
							"roof_angle": this_case.pitch_angle
						}
					}
				}
			]
		}
	
		skyciv.request(wind_api_object, function (res) {
			console.log(res);

			if (res.response.status == 0) {
				var wind_load_arr  = res.response.data.pressures;
				console.log(res.response.data.pressures)
				
				var dump_obj = {
					"windward_wall": {'pos': null, 'neg': null},
					"leeward_wall": {'pos': null, 'neg': null},
					"roof_windward": {'pos': null, 'neg': null},
					"roof_leeward": {'pos': null, 'neg': null},
				}

				for (var f=0; f<wind_load_arr.length; f++) {
					if (wind_load_arr[f].surface == "roof_windward" && wind_load_arr[f].dirn == "along_L") {
						dump_obj.roof_windward.pos = wind_load_arr[f].pos_Cpi/1000;
						dump_obj.roof_windward.neg = wind_load_arr[f].neg_Cpi/1000;
					} else if (wind_load_arr[f].surface == "roof_leeward" && wind_load_arr[f].dirn == "along_L") {
						dump_obj.roof_leeward.pos = wind_load_arr[f].pos_Cpi/1000;
						dump_obj.roof_leeward.neg = wind_load_arr[f].neg_Cpi/1000;
					} else if (wind_load_arr[f].surface == "windward_wall" && wind_load_arr[f].dirn == "along_L") {
						dump_obj.windward_wall.pos = wind_load_arr[f].pos_Cpi/1000;
						dump_obj.windward_wall.neg = wind_load_arr[f].neg_Cpi/1000;
					} else if (wind_load_arr[f].surface == "leeward_wall" && wind_load_arr[f].dirn == "along_L") {
						dump_obj.leeward_wall.pos = wind_load_arr[f].pos_Cpi/1000;
						dump_obj.leeward_wall.neg = wind_load_arr[f].neg_Cpi/1000;
					}
				}

				wind_result.push(dump_obj);

				var message = `Wind Load Pressure returned from API. You can now add wind load to model cases <br><br>
					<center><div><button class="positive ui mini button" onClick="addDistributedLoadOnMembers()" id="add-wind-load-btn">Add Wind Load</button></div></center>
					`;	
			} else {
				var message = `<center><div>An error occured in Wind API</div></center>
					`;
			}
			
			jQuery('#generate-model-cases-btn').removeClass('loading');
			SKYCIV_UTILS.alert(message)	
			
		})
	}

	
	console.log(wind_result);
	// jQuery('#add-wind-load-btn').removeClass('loading');
}


function addDistributedLoadOnMembers () {
	
	
	for (var r = 0; r < model_cases.length; r++) {
		
		var j = (r%wind_result.length);
		var wind_res_dump = wind_result[j];

		// roof_windward
		addWindLoadToPurlin(model_cases[r], r, wind_res_dump.roof_windward.pos,"WL1",3);
		addWindLoadToPurlin(model_cases[r], r, wind_res_dump.roof_windward.neg,"WL2",3);
		
		// roof_leeward
		addWindLoadToPurlin(model_cases[r], r, wind_res_dump.roof_leeward.pos,"WL1",4);
		addWindLoadToPurlin(model_cases[r], r, wind_res_dump.roof_leeward.neg,"WL2",4);
		
		// windward_wall
		addWindLoadToColumn(model_cases[r], r, wind_res_dump.windward_wall.pos,"WL1",1);
		addWindLoadToColumn(model_cases[r], r, wind_res_dump.windward_wall.neg,"WL2",1);
		
		// leeward_wall
		addWindLoadToColumn(model_cases[r], r, -wind_res_dump.leeward_wall.pos,"WL1",5);
		addWindLoadToColumn(model_cases[r], r, -wind_res_dump.leeward_wall.neg,"WL2",5);

		model_cases[r].distributed_loads = {};
		console.log(distributed_loads_cases[r]);

		for (var m =0; m < distributed_loads_cases[r].length; m++) {
			var dist_load_case = distributed_loads_cases[r];
			var load_val = dist_load_case[m];
			var load_key = String(dist_load_case.indexOf(load_val)+1);
			model_cases[r].distributed_loads[load_key] = load_val;
		}
		
	}

	jQuery('#add-wind-load-btn').addClass('negative').removeClass('positive');

}

function animateCases(speed) {
	var timer_speed = 300;
	if (speed == "fast") timer_speed = 100;
	if (speed == "medium") timer_speed = 300;
	if (speed == "slow") timer_speed = 500;

	var model_case_id = 0;
	var animate_loop = setInterval(function(){ 

		var this_model = model_cases[model_case_id];
		if (!this_model) clearInterval(animate_loop);
		renderAssembly(this_model);
		model_case_id++;

	}, timer_speed);
}


function renderAssembly(obj) {
	SkyCivAutoDesigner.model_data = obj; //active model data
	SkyCivAutoDesigner.viewer.model.set(obj);
	SkyCivAutoDesigner.viewer.model.buildStructure();
	SkyCivAutoDesigner.viewer.render();
	SkyCivAutoDesigner.viewer.resize();
}



function changeBuildingLengthorWidth(key) {

	switch (getContext()) {
		case "gable_roof":
			var length = "building_length";
			var width = "building_width";
			break;
		case "rect_truss":
			var length = "truss_length";
			var width = "truss_width";
			break;
		case "multi_level_building":
			var length = "structure_depth";
			var width = "structure_width";
			break;
	};

	var cur_obj = eval(getContext());

	cur_obj.variables[eval(key)].value = jQuery("#building_" + key + " input").val()

	viewer.model.set(SKYCIV.structure.parametric.init({
		assembly_obj: cur_obj
	}));

	viewer.model.buildStructure();
	viewer.render();

	viewer.resize();

}


//everytime input field changes. For instance, Build your model and update the renderer.
function updateModelData() {

	//change model_data here
	var current_data = SkyCivAutoDesigner.getData();

	// STRUCTURE DETAIL
	var structure_width = parseFloat(current_data.structure_width);
	var structure_height = parseFloat(current_data.eave_height);
	var structure_length = parseFloat(current_data.structure_length);
	var max_truss_height = parseFloat(current_data.max_truss_height);
	var min_truss_height = parseFloat(current_data.min_truss_height);

	// MEMBER DETAIL
	var column_section = current_data.column_section;
	var beam_section = current_data.beam_section;
	var purlin_section = current_data.purlin_section;
	var code = current_data.code;
	var max_UR = parseFloat(current_data.max_UR);

	// LOADS
	var roof_dead_load = parseFloat(current_data.roof_dead_load);
	var roof_live_load = parseFloat(current_data.code);
	var site_address = current_data.site_address;

	var pitch_angle = Math.atan(min_truss_height/(0.5*structure_width))*(180/Math.PI)
	if (pitch_angle < 10) min_truss_height = Math.tan(10*(Math.PI/180))*0.5*structure_width;

		
	var portal_frame = {
		"id": 1,
		"title": "Portal Frame",
		"variables": {
			"eave_to_ridge_height": { "value": min_truss_height, "type": "float", "units": "length" },
			"building_width": { "value": structure_width, "type": "float", "units": "length" },
			"building_length": { "value": structure_length, "type": "float", "units": "length" },
			"column_height": { "value": structure_height, "type": "float", "units": "length" },
			"number_of_trusses": { "value": 3, "type": "integer" },
			"number_of_panels": { "value": 4, "type": "integer" },
			"truss_style": { "value": "cross", "type": "truss_style" }
		},
		"steps": [
			// MEMBER 1 - BEAM 1
			{
				cad_type: "cad_line",
				type: "points",
				points: [
					{x : 0, y: "~~column_height~~", z: 0},
					{x : "~~building_width*0.5~~", y: "~~column_height + eave_to_ridge_height~~", z: 0}
				],
				segments: "~~number_of_trusses~~",
				section_id: 2
			},
			// MEMBER 2 - BEAM 2
			{
				cad_type: "cad_line",
				type: "points",
				points: [
					{x : "~~building_width~~", y: "~~column_height~~", z: 0},
					{x : "~~building_width*0.5~~", y: "~~column_height + eave_to_ridge_height~~", z: 0}
				],
				segments: "~~number_of_trusses~~",
				section_id: 2
			},
			// MEMBER 3 - COLUMN 1
			{
				cad_type: "cad_line",
				type: "points",
				points: [
					{x : 0, y: 0, z: 0},
					{x : 0, y: "~~column_height~~", z: 0}
				],
				segments: 1,
				section_id: 1
			},
			// MEMBER 4 - COLUMN 4
			{
				cad_type: "cad_line",
				type: "points",
				points: [
					{x : "~~building_width~~", y: 0, z: 0},
					{x : "~~building_width~~", y: "~~column_height~~", z: 0}
				],
				segments: 1,
				section_id: 1
			},
			{
				cad_type: "cad_repeat",
				type: "startend",
				repetitions: "~~number_of_trusses~~",
				ref_ids: ["1","2"],
				start_pt: {x: 0, y: 0, z: 0},
				end_pt: {x: 0, y: 0, z: "~~building_length~~"},
			},
			{
				cad_type: "cad_repeat",
				type: "startend",
				repetitions: "~~number_of_trusses~~",
				ref_ids: ["3","4"],
				start_pt: {x: 0, y: 0, z: 0},
				end_pt: {x: 0, y: 0, z: "~~building_length~~"},
			},

			{
				cad_type: "cad_line",
				type: "vector",
				ref_pt : {x : 0, y: "~~column_height~~", z: 0},
				vector: [0,0,1],
				length:  "~~building_length~~",
				segments: "~~number_of_trusses~~",
				section_id: 2
			},
			{
				cad_type: "cad_line",
				type: "points",
				points: [
					{x : "~~building_width~~", y: "~~column_height~~", z: 0},
					{x : "~~building_width~~", y: "~~column_height~~", z:  "~~building_length~~"}  
				],
				segments: "~~number_of_trusses~~",
				section_id: 2
			},
			{
				cad_type: "cad_line",
				type: "points",
				points: [
					{x : "~~building_width*0.5~~", y: "~~column_height+eave_to_ridge_height~~", z: 0},
					{x : "~~building_width*0.5~~", y: "~~column_height+eave_to_ridge_height~~", z:  "~~building_length~~"}  
				],
				segments: "~~number_of_trusses~~",
				section_id: 2
			}

		]
	};

	function addPurlintoMember(memberid,percent) {
		portal_frame.steps.push({
			cad_type: "cad_line",
			type: "vector",
			ref_pt : {cad_id : memberid, cad_perc: percent},
			vector: [0,0,1],
			segments: "~~number_of_trusses~~",
			length: "~~building_length~~",
			section_id: 3
		});
	}

	var max_spacing_of_purlin = 0.6; // in m, center to center
	var number_of_purlin = Math.ceil(Math.pow(min_truss_height*min_truss_height + (0.5*structure_width)* (0.5*structure_width),0.5)/max_spacing_of_purlin);
	
	for (var g = 1; g < number_of_purlin; g++) {
		var percentage = (g/number_of_purlin)*100;
		addPurlintoMember("1",percentage);
		addPurlintoMember("2",percentage);
	}
	
	var render_model = SKYCIV.structure.parametric.init({
		assembly_obj: portal_frame
	});

	render_model.sections["1"] = {
		"load_section": [
			"American",
			"AISC",
			getSectionType(column_section),
			column_section
		],
		"material_id":1
	}

	render_model.sections["2"] = {
		"load_section": [
			"American",
			"AISC",
			getSectionType(beam_section),
			beam_section
		],
		"material_id":1
	}

	test_model = render_model;
	renderAssembly(render_model);

}

function getSectionType (section) {
	var section_lib = SkyCivAutoDesigner.section_library["AISC"]
	for (var section_type in section_lib) {
		var section_list = section_lib[section_type];

		for (var i=0; i< section_list.length;i++ ) {

			// if (section_list.indexOf(section)) {
			// 	var result = section_type;
			// 	break;
			// }
			if (section === section_list[i]) {
				var result = section_type;
				break;
			}
		}
	}
	return result;
}

//main solve
function runSolve(callback) {

	//do whatever you need with your data
	var options = SkyCivAutoDesigner.options;
	
	//do something with data - like call API
	//can use skyciv resource:

	//change model_data here
	var current_data = SkyCivAutoDesigner.getData();
	var code = current_data.code;

	for (var i = 0; i < model_cases; i++) {

		var title = 'span_'+model_cases_parameters.span+ '_trussheight_'+ model_cases_parameters.truss_height;

		var solve_api_object = {
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
						"design_code": code,
						"s3d_model": model_cases[i] //model_data
					}
				}
				
			]
		}
		
		skyciv.request(solve_api_object, function (res) {
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


//main solve
function getAISCSections(callback) {

	//do whatever you need with your data
	var options = SkyCivAutoDesigner.options;
	
	//do something with data - like call API
	//can use skyciv resource:

	var api_object = {
		"auth": options.auth,
		"functions": [
			{
				'function': "S3D.SB.getLibraryTree",
				'arguments': {
					'section_map': ["American", "AISC", "W shapes"]
				},
			},
		]
	}

	skyciv.request(api_object, function (res) {
		console.log(JSON.stringify(res.response.data))
		console.log(res.response.msg); // do something with response
		postProcess(res);

		//store session id for faster loading
		options.auth.session_id = res.response.session_id;
		SkyCivAutoDesigner.options = options;
	});
}

function getWindSpeed(address) {

	var api_object = {
		"auth": {
			"username": "patrick@skyciv.com",
			"key": "LVBZgXsQgMcqykLB8EfYaIeHqdyaitYKqkXNZuGKH0RLAYIrvtCTdP8rzmLtCq2H"
		},
		"functions": [
			{
				"function": "wind.getWindSpeed",
				"arguments": {

					design_code: "as1170", 
					project_address: address, 
					ari: "200",

					sls_and_uls: false, //requires below information
					country: "australia", 
					design_working_life: "25_years", 
					importance_level: "3",

					terrain_data: true,
					wind_source_direction: "E",
					terrain_category: "CAT2",
					topo_image: true
				}
			}
		]
	}

	skyciv.request(api_object, function (res) {
		extractWindSpeed(res.response);
	})

}



function getWindPressure(address, buildinglength, buildingwidth,buildingheight) {

	var api_object = {
		"auth": {
			"username": "patrick@skyciv.com",
			"key": "LVBZgXsQgMcqykLB8EfYaIeHqdyaitYKqkXNZuGKH0RLAYIrvtCTdP8rzmLtCq2H"
		},
		"functions": [
			{
				"function": "wind.getWindSpeed",
				"arguments": {
					design_code: "as1170", 
					project_address: address, 
					ari: "200",

					sls_and_uls: false, //requires below information
					country: "australia", 
					design_working_life: "25_years", 
					importance_level: "3",

					terrain_data: true,
					wind_source_direction: "E",
					terrain_category: "CAT2",
					topo_image: false
				}
			},
			{
				"function": "wind.getPressures",
				"arguments": {
					"design_code": "as1170",
					"structure_type": "closed", //closed, partially_enclosed, cladding
					"roof_profile": "gable", //hip, monoslope
					"building_dimensions": {
						"length": buildinglength,
						"width": buildingwidth,
						"height": buildingheight,
						"roof_angle": 10
					}
				}
			}
		]
	}

	skyciv.request(api_object, function (res) {
		extractWindSpeed(res.response);
	})

}

function extractWindSpeed (response) {
	console.log(response);
	if (response.status == 0) {
		// var res = response.data;
		// wind_speed = res.wind_speed.basic_wind_spd;
	}
}

function extractWindPressure (response) {
	if (response.status == 0) {
		console.log(response);
		var res = response.data;
		wind_speed = res.wind_speed.basic_wind_spd;
	}
}

function testSolveModelCase (obj, id) {
	console.log('Clicked Case '+ parseFloat(id+1));
	
	var caseid = '#case-'+String(id+1);
	var case2_id = '#case2-'+String(id+1);

	jQuery(caseid).addClass('loading');

	var api_object = {
		"auth": {
			"username": "patrick@skyciv.com",
			"key": "LVBZgXsQgMcqykLB8EfYaIeHqdyaitYKqkXNZuGKH0RLAYIrvtCTdP8rzmLtCq2H"
		},
		functions: [
            {
                'function': 'S3D.session.start', // starting a session
                "arguments": {
					"keep_open": false
				}
            },
            {
                'function': 'S3D.model.set', // Setting the model
                'arguments': {
                    's3d_model': obj
                }
			},
			{
                'function': 'S3D.model.repair', // Setting the model
                'arguments': {
					's3d_model': obj,
					'checks': ['unused_nodes', 'large_structure', 'merge_nodes', 'zero_members', 'continuous_to_normal_members', 'intersect_members', 'default_section', 'force_plate_mesh']
                }
			},
			{
                'function': 'S3D.model.get', // Get current input
			},
            {
                'function': "S3D.model.solve", // Running an analysis
                'arguments': {
                    analysis_type: 'linear', //linear, nonlinear, buckling
                    repair_model: true
                },
			}
        ]
	}

	
	skyciv.request(api_object, function (res) {
		console.log(res);
		jQuery(caseid).removeClass('loading');

		var weight = 0;
		debugger
		var current_model_data = res.functions[3].data;
		model_cases_repaired[id] = current_model_data;
		var number_of_nodes = getObjectLength(current_model_data.nodes)


		var loads_data = res.functions[4].data;

		for (var load_id in loads_data) {
			var this_load = loads_data[load_id];
			if (this_load.name == 'SW1'){
				var rxn_obj = this_load.reactions;
				for (var sup_id in rxn_obj) {
					weight += rxn_obj[sup_id].Fy;
				}
			}
		}

		var mass = (weight*1000)/9.81;

		weight_cases[id] = mass;
		editRowValueResultsTable(id+1, 4, mass.toFixed(2));
		editRowValueResultsTable(id+1, 5, number_of_nodes);
		
		if (res.response.status == 0) {
			jQuery(caseid).addClass('green disabled');
			jQuery(case2_id).removeClass('disabled');
		}
		
	})
}

function testDesignCheck (obj, id)  {
	console.log('Clicked Case '+ parseFloat(id+1));
	
	var case2_id = '#case2-'+String(id+1);

	jQuery(case2_id).addClass('loading');

	var api_object = {
		"auth": {
			"username": "patrick@skyciv.com",
			"key": "LVBZgXsQgMcqykLB8EfYaIeHqdyaitYKqkXNZuGKH0RLAYIrvtCTdP8rzmLtCq2H"
		},
		functions: [
			{
				'function': "S3D.session.start",
				'arguments': {},
			},
			{
				'function': "S3D.member_design.passFailCheck",
				'arguments': {
					'design_code': "AISC_360-16_LRFD", // "AISC_360-16_LRFD", 
					's3d_model': obj,
					'single_result': false
				},
			}
        ]
	}

	
	skyciv.request(api_object, function (res) {
		console.log(res);
		debugger
		jQuery(case2_id).removeClass('loading');

		var design_check_data = res.functions[1].data;
		
		var mem_prop = generateMemberProperties(obj);

		var UR_area_length = 0;
		var fail_count = 0;
		
		for (var i = 0; i < design_check_data.length; i++) {
			

			var this_design_check_member_data = design_check_data[i];

			var this_member_id = this_design_check_member_data.member;
			var this_result = this_design_check_member_data.result;
			var this_ratio = this_design_check_member_data.ratio;
			var this_length = mem_prop[this_member_id].member_length;
			var this_area = mem_prop[this_member_id].member_area;

			if (this_result == "FAIL") fail_count++
			
			UR_area_length += this_ratio*this_area*this_length
			
		}

		var UR = UR_area_length/weight_cases[id]

		editRowValueResultsTable(id+1, 6, UR.toFixed(3));

		var final_color_button = (fail_count > 0) ? 'red' : 'green';
		// jQuery(caseid).removeClass('loading');
		// Query(caseid).removeClass('yellow');

	
		if (res.response.status == 0) {
			jQuery(case2_id).addClass(final_color_button);
			jQuery(case2_id).addClass('disabled');
		}
	})
}


function generateModelCaseTable () {
	var model_case_table = [];

	var table_header = ["","Case", "Span", "th, m", "W, kgs", "Connections", "UR"];
	
	model_case_table.push(table_header);


	for (var i = 0; i < model_cases_parameters.length; i++) {

		var case_label = 'Case '+String(i+1);
		var case_id = 'case-'+String(i+1);
		var case2_id = 'case2-'+String(i+1);
		var this_case_btn = '<i class="calculator icon" id='+case_id +' onClick="testSolveModelCase(model_cases['+i+'],'+i+')"></i> <i class="check circle icon disabled" id='+case2_id +' onClick="testDesignCheck(model_cases_repaired['+i+'],'+i+')"></i>';
		
		// var this_case_btn = '<i class="check circle icon solve-case" id="'+case_id +'"></i> <i class="calculator icon disabled check-case-design" id="'+case2_id +'" ></i>';
		
		
		// var this_case_btn = '<i class="check circle icon" id='+case_id +' ></i>';
		var this_span = model_cases_parameters[i].span;
		var this_th = model_cases_parameters[i].truss_height;
		var row_content = [this_case_btn,case_id, this_span, this_th, "", "", ""];

		model_case_table.push(row_content);

		// initiate jquery

		// jQuery(case_id).click(function () {
		// 	testSolveModelCase(model_case[i], i);
		// 	console.log(case_id)
		// })
	
		// jQuery(case2_id).click(function () {
		// 	testDesignCheck(model_cases_repaired[i], i);
		// 	console.log(case2_id)
		// })
	}
	
	SkyCivAutoDesigner.tabulateOptimizerResults(model_case_table);

	// jQuery("#results-table-optimitizer tbody").on('click', 'td', function() {
	// 	var content = jQuery(this).html();
	// 	content = content.split('-');
	// 	var id = parseFloat(content[1])-1;
	// 	console.log(id);
	// 	testDesignCheck(model_cases_repaired[id], id);
	// });

	// jQuery(".solve-case").each(function() {
	// 	// RUN VALIDATION CHECK ON NODE
	// 	var caseid = jQuery(this).attr("id");
	// 	var id = caseid.split('-');

	// 	jQuery(caseid).click(function () {
	// 		testSolveModelCase(model_case[id], id);
	// 		console.log(case_id)
	// 	})
	// });

}

function editRowValueResultsTable( rowId, colNum, changedValue) {
	// var id = '#'+tableId;
	// jQuery(id).find('tr').eq(rowId).find('td').eq(colNum).html(changedValue);
	jQuery("#results-table-optimitizer").find('tr').eq(rowId).find('td').eq(colNum).html(changedValue)
};

function getObjectLength(obj) {
	var size = 0, key;
	for (key in obj) {
		if (obj.hasOwnProperty(key)) size++;
	}
	return size;
};

function generateMemberProperties (obj) {
	var members = obj.members;
	var nodes = obj.nodes;
	var sections = obj.sections;

	var result = {}

	for (var memid in members) {
		var nodeA = members[memid].node_A;
		var nodeB = members[memid].node_B;
		var section_id = members[memid].section_id

		var xA = nodes[nodeA].x;
		var yA = nodes[nodeA].y;
		var zA = nodes[nodeA].z;
		var xB = nodes[nodeB].x;
		var yB = nodes[nodeB].y;
		var zB = nodes[nodeB].z;
		
		var member_length = Math.pow((xB-xA)*(xB-xA) + (yB-yA)*(yB-yA) + (zB-zA)*(zB-zA),0.5);
		var member_area = sections[section_id].area;

		result[memid] = {'member_length': member_length, 'member_area': member_area }
	}

	console.log(result)
	return result;
}