jQuery('#generate-site-data-report-button').click(function(){

    if (SKYCIV_DESIGN.isFree() && CODE != 'is875') {
        
        // SKYCIV_UTILS.upgradePrompt('windLoad-fullReports');
        SKYCIV_UTILS.upgradePrompt('windLoad-standaloneGeneral');
        SKYCIV_UTILS.event({
            "software": SKYCIV_DESIGN.getSoftwareName(),
            "action": 'Upgrade Prompt - Site Report',
            "label": 'Site Report'
        });
    } else {
        jQuery(this).addClass("loading");
        SKYCIV_UTILS.event({
            "software": SKYCIV_DESIGN.getSoftwareName(),
            "action": "Generate Report Selected",
            "label": CODE
        });
    
        SKYCIV_DESIGN.generateWindLoadReport("wind-speed");
    }


    
});



SKYCIV_DESIGN.generateWindLoadReport = function(report_type) {

	jQuery("#generate-load-report-button").addClass("loading");

    
	var country = SKYCIV_DESIGN.site.getCurrentCountry();

	var input_obj = SKYCIV_DESIGN.generateInput();

	function addHeading(heading_text, do_not_break_page) {
		var css = '';
		if (!do_not_break_page) css += 'page-break-before:always;';
		if (css != '') css = ' style="' + css + '"';

		return '<div ' + css + ' class="ui horizontal divider">' + heading_text +'</div><br>';
	}

	function prettyPrint(val) {
		val = parseFloat(val)
		if (isNaN(val)) return
		return val.toFixed(3);
	}

	var content = '';
	
	if (typeof CURRENT_USER_DETAILS !== "undefined" && CURRENT_USER_DETAILS.company && CURRENT_USER_DETAILS.company.logo_url) {
		content += '<center><img src="'+ CURRENT_USER_DETAILS.company.logo_url +'" style="max-width:300px"></center><br>';
	}

	

	content += "<center><h1> SKYCIV LOAD CALCULATION REPORT </h1></center><br>";

	let unit_selected = jQuery('#project-units').dropdown('get value')
	if (CONTEXT == 's3d') unit_selected = (PARENT.settings.units.length == 'm' || PARENT.settings.units.length == 'mm') ? 'metric' : unit_selected

	var units = { 'imperial': 'Imperial', 'metric': 'Metric' }

	// PROJECT DETAILS
	content += addHeading("Project Details", true);
	content += '<table class="ui celled small compact table center aligned"><tbody>';
	content += "<tr><td><strong>Project Name: </strong></td><td>" + jQuery('#project-name').val() + '</td></tr>';
	content += "<tr><td><strong>Project Units: </strong></td><td>" + units[unit_selected] + '</td></tr>';
	content += "<tr><td><strong>Project ID: </strong></td><td>" + jQuery('#project-id').val() + '</td></tr>';
	content += "<tr><td><strong>Project Company: </strong></td><td>" + jQuery('#project-company').val() + '</td></tr>';
	content += "<tr><td><strong>Project Designer: </strong></td><td>" + jQuery('#project-designer').val() + '</td></tr>';
	content += "<tr><td><strong>Project Client: </strong></td><td>" + jQuery('#project-client').val() + '</td></tr>';
	content += "<tr><td><strong>Project Notes: </strong></td><td>" + jQuery('#project-notes').val() + '</td></tr>';
	content += "</tbody></table><br>";


	// SITE DETAILS
	content += addHeading("Site Details", true);

	content += '<table class="ui celled small compact table center aligned"><tbody>';
	content += "<tr><td><strong>Code Selected: </strong></td><td>" + CODE.toUpperCase() + '</td></tr>';
	
	if (CODE == 'asce7-10' || CODE == 'asce7-16' || CODE == 'nscp2015') {
		content += "<tr><td><strong>Risk Category: </strong></td><td>" + jQuery("#risk-category").dropdown("get text") + '</td></tr>';
		content += "<tr><td><strong>Exposure: </strong></td><td>" + jQuery("#exposure").dropdown("get text") + '</td></tr>';
		content += "<tr><td><strong>Site Location: </strong></td><td>" + jQuery("#project-address").val() + '</td></tr>';
		content += "<tr><td><strong>Site Wind Speed: </strong></td><td>" + jQuery("#wind-speed").val() + ' <span data-unit="speed"></span></td></tr>';
		content += "<tr><td><strong>Site Elevation: </strong></td><td>" + jQuery("#site-elevation").val() + ' <span data-unit="length"></span></td></tr>';
		if (CODE == 'asce7-16') {
			var elev = parseFloat(jQuery("#site-elevation").val());
			var ke = SKYCIV_DESIGN.site.topography.groundElevationFactorSolverASCE716(elev);
			content += "<tr><td><strong>Ground Elevation Factor K<sub>e</sub>: </strong></td><td>" +ke.toFixed(2) + '</td></tr>';
		}

		var snow_load_unit = (unit_selected == 'metric') ? ' <span data-unit="pressure"></span>' : ' <span data-unit="small-pressure"></span>'
		content += "<tr><td><strong>Ground Snow Load, p<sub>g</sub>: </strong></td><td>" + jQuery("#ground-snow-load").val() +snow_load_unit+'</td></tr>';
		
	} else if (CODE == 'as1170') {

		if (jQuery("#annual-recurrence-interval").closest('.field').hasClass('visible')) {
			content += "<tr><td><strong>Average Recurrence Interval: </strong></td><td>" + jQuery("#annual-recurrence-interval").dropdown("get text") + '</td></tr>';
			content += "<tr><td><strong>Site Wind Speed: </strong></td><td>" + jQuery("#wind-speed").val() + ' <span data-unit="small-speed"></span></td></td></tr>';
		} else {
			content += "<tr><td><strong>Design Working Life: </strong></td><td>" + jQuery("#as1170-design-working-life").dropdown("get text") + '</td></tr>';
			content += "<tr><td><strong>Importance Level: </strong></td><td>" + jQuery("#importance-level").dropdown("get text") + '</td></tr>';

			var sls_uls_obj = SKYCIV_DESIGN.site.getSLSULSAS1170();
			content += "<tr><td><strong>Service Limit State - Wind Speed: </strong></td><td>" + sls_uls_obj.service_wind_speed + '</td></tr>';
			content += "<tr><td><strong>Ultimate Limit State - Wind Speed: </strong></td><td>" + sls_uls_obj.ultimate_wind_speed + '</td></tr>';
			content += "<tr><td><strong>Site Wind Speed (adopted): </strong></td><td>" + jQuery("#wind-speed").val() + ' <span data-unit="small-speed"></span></td></tr>';
		} 
		
		content += "<tr><td><strong>Site Location: </strong></td><td>" + jQuery("#project-address").val() + ' </td></tr>';
		content += "<tr><td><strong>Site Elevation: </strong></td><td>" + jQuery("#site-elevation").val() + ' <span data-unit="length"></span></td></tr>';
		content += "<tr><td><strong>Wind Region: </strong></td><td>" + jQuery("#wind-region").dropdown("get text") + '</td></tr>';
		content += "<tr><td><strong>Lee Multiplier: </strong></td><td>" + jQuery("#lee-multiplier").val() + '</td></tr>';
		
		content += "<tr><td><strong>Terrain Category: </strong></td><td>" + jQuery("#terrain-category-as1170").dropdown("get text") + '</td></tr>';

		content += "<tr><td><strong>Ground Snow Load, s<sub>g</sub>: </strong></td><td>" + jQuery("#ground-snow-load").val() + ' <span data-unit="pressure"></span></td></tr>';
		content += "<tr><td><strong>Terrain Classification for Snow: </strong></td><td>" + jQuery("#snow-terrain-as1170").dropdown('get text') + ' </td></tr>';
		content += "<tr><td><strong>Snow Region: </strong></td><td>" + jQuery("#snow-region-as1170").dropdown('get text') + ' </td></tr>';
		
		jQuery('#as1170-design-working-life').closest('.field').hasClass('visible');

	} else if (CODE == 'en1991') {

		content += "<tr><td><strong>Site Location: </strong></td><td>" + jQuery("#project-address").val() + '</td></tr>';
		content += "<tr><td><strong>Site Wind Speed: </strong></td><td>" + jQuery("#wind-speed").val() + ' <span data-unit="small-speed"></span></td></tr>';
		content += "<tr><td><strong>Site Elevation: </strong></td><td>" + jQuery("#site-elevation").val() + ' <span data-unit="length"></span></td></tr>';
		content += "<tr><td><strong>Terrain Category: </strong></td><td>" + jQuery("#terrain-en1991").dropdown("get text") + '</td></tr>';
		if (country != 'United Kingdom' && country != 'Ireland') content += "<tr><td><strong>Wind Region: </strong></td><td>" + jQuery("#info-box").text() + '</td></tr>';
		
		if (country == 'United Kingdom' || country == 'Ireland' || country == 'Belgium' || country == 'France') {
			content += "<tr><td><strong>Season/Month: </strong></td><td>" + jQuery("#season-month-dropdown").dropdown("get text") + '</td></tr>';
		}

		if (country == 'United Kingdom' || country == 'Ireland') {
			let distance_shoreline = (jQuery("#distance-to-shoreline-uk-en1991").val() === '') ? 100 : jQuery("#distance-to-shoreline-uk-en1991").val()
			let distance_town = (jQuery("#distance-inside-town-uk-en1991").val() === '') ? 20 : jQuery("#distance-inside-town-uk-en1991").val()
			let h_dist = (jQuery("#displacement-height-uk-en1991").val() == '') ? 0 : jQuery("#displacement-height-uk-en1991").val()
			content += "<tr><td><strong>Distance upwind to shoreline: </strong></td><td>" + distance_shoreline + ' <span data-unit="distance"></span></td></tr>';
			content += "<tr><td><strong>Distance inside town terrain: </strong></td><td>" + distance_town + ' <span data-unit="distance"></span></td></tr>';
			content += "<tr><td><strong>Displacement Height, h<sub>dis</sub>: </strong></td><td>" + h_dist + ' <span data-unit="length"></span></td></tr>';
		}

	} else if (CODE == 'nbcc2015') {
		content += "<tr><td><strong>Recurrence Interval: </strong></td><td>" + jQuery("#recurrence-interval-nbcc2015").dropdown("get text") + '</td></tr>';
		content += "<tr><td><strong>Limit State: </strong></td><td>" + jQuery("#limit-state-nbcc2015").dropdown("get text") + '</td></tr>';
		content += "<tr><td><strong>Importance Category: </strong></td><td>" + jQuery("#importance-category-nbcc2015").dropdown("get text") + '</td></tr>';
		content += "<tr><td><strong>Site Location: </strong></td><td>" + jQuery("#project-address").val() + '</td></tr>';
		content += "<tr><td><strong>Hourly Wind Pressure: </strong></td><td>" + jQuery("#hourly-wind-pressure-nbcc2015").val() + ' <span data-unit="pressure"></span></td></tr>';
		content += "<tr><td><strong>Site Elevation: </strong></td><td>" + jQuery("#site-elevation").val() + ' <span data-unit="length"></span></td></tr>';
		content += "<tr><td><strong>Wind Region: </strong></td><td>" + jQuery("#wind-region").dropdown("get text") + '</td></tr>';
		content += "<tr><td><strong>Terrain Category: </strong></td><td>" + jQuery("#terrain-nbcc2015").dropdown("get text") + '</td></tr>';

		content += "<tr><td><strong>Ground Snow Load, S<sub>s</sub>: </strong></td><td>" + jQuery("#ground-snow-load").val() + ' <span data-unit="pressure"></span></td></tr>';
		content += "<tr><td><strong>Associated Rain Load, S<sub>r</sub>: </strong></td><td>" + jQuery("#snow-load-rain-nbcc2015").val() + ' <span data-unit="pressure"></span></td></tr>';
		
		content += "<tr><td><strong>Area Classification (for Snow - Cw parameters): </strong></td><td>" + jQuery("#snow-area-class-nbcc2015").dropdown("get text") + ' </td></tr>';
		
	} else if (CODE == 'is875') {
		content += "<tr><td><strong>Site Location: </strong></td><td>" + jQuery("#project-address").val() + '</td></tr>';
		content += "<tr><td><strong>Site Wind Speed: </strong></td><td>" + jQuery("#wind-speed").val() + ' <span data-unit="speed"></span></td></tr>';
		content += "<tr><td><strong>Site Elevation: </strong></td><td>" + jQuery("#site-elevation").val() + ' <span data-unit="length"></span></td></tr>';
		
		content += "<tr><td><strong>Terrain Category: </strong></td><td>" + jQuery("#terrain-category-is875").dropdown("get text") + '</td></tr>';
		content += "<tr><td><strong>Class of Structure: </strong></td><td>" + jQuery("#structure-class-is875").dropdown("get text") + '</td></tr>';
		content += "<tr><td><strong>Importance Category: </strong></td><td>" + jQuery("#importance-category-is875").dropdown("get text") + '</td></tr>';
	
	}
	
	content += "</tbody></table><br>";

	// MAP DATA 
	content += addHeading("Wind Speed Map", true);

	if (CODE == "as1170") {
		content += "<p>The following map has been defined as 50, 100, 150 and 200km smooth lines, set in from a smooth coastline, as per AS/NZS 1170.</p>";	
		content += "<p>Note: <br>Wind speed values are obtained from wind speed maps indicated on the reference code. Results from this tool may be conservative than the values indicated in the reference. Moreover, distance of the site location is also computed as reference in adopting the wind region. The discrepancy from the code is subject to the discretion of the user</p>";
	}
	
	if (CODE == "asce7-10" || CODE == "asce7-16") content += "<p>Inverse distance weighting (IDW) was used to interpolate the wind speed values between ASCE 7 wind contour with known values. The discrepancy from the code is subject to the discretion of the user.</p>";
	if (CODE == 'nscp2015') content += "<p>Inverse distance weighting (IDW) was used to interpolate the wind speed values between NSCP 2015 wind contours with known values. Note that some contours were extrapolated to provide accurate calculation of wind speeds. The discrepancy from the code is subject to the discretion of the user.</p>";

	if (CODE == 'en1991' && (country == 'United Kingdom' || country == 'Ireland')) content += "<p>Inverse distance weighting (IDW) method was used to interpolate the wind speed values between wind contours with known values (BS and IS National Annexes to EN 1991-1-4). The discrepancy from the code is subject to the discretion of the user.</p>";
	
	SKYCIV_UTILS.report.addHTML(content);
	SKYCIV_UTILS.report.addObject(jQuery("#map").parent());
	jQuery("#report-frame").find("#map").css('height', '400px');
	jQuery("#report-frame").find("#map").css('page-break-inside', 'avoid');

	
	if (SKYCIV_DESIGN.site.topography && SKYCIV_DESIGN.site.topography.getTopographyChart) {
		var chart_img = SKYCIV_DESIGN.site.topography.getTopographyChart(true);
		if (chart_img) {
			SKYCIV_UTILS.report.addHTML(addHeading("Topography and Terrain Data"));

			if (country == 'Belgium' || country == 'Poland' || country == 'United Kingdom' || country == 'Ireland' || country == 'France') {
				SKYCIV_UTILS.report.addHTML("<p>The following topography factors have been calculated based on the wind direction going to " + input_obj.site_data.wind_source_direction + " degrees from due North in a clockwise direction.</p>");
			} else {
				SKYCIV_UTILS.report.addHTML("<p>The following topography factors have been calculated based on the wind direction going to " + input_obj.site_data.wind_source_direction + ".</p>");
			}

			SKYCIV_UTILS.report.addObject(jQuery("#terrain-data-elevation-chart"));

			SKYCIV_UTILS.report.addHTML("<br><center><img style ='width: 90%;' src='" + chart_img + "'/></center>");
			SKYCIV_UTILS.report.addHTML("<p>Terrain has been detected and classed as " + jQuery("#topo").dropdown("get text") + ".</p>");
		}
	}


	var struc_selected = jQuery('#structure-dropdown').dropdown('get value')

	if (struc_selected == 'building') {
		if ((SKYCIV_DESIGN.results.getWindPressureObj() || SKYCIV_DESIGN.results.getSnowPressureObj()) && report_type == "all") {

			SKYCIV_UTILS.report.addHTML(addHeading("Structure Data"));
	
			var building_data = {
				'structure_type': jQuery('#structure-type').dropdown('get value'),
				'structure_level': SKYCIV_DESIGN.building.getBuildingEntryTable().getData(true),
				'enclosure': jQuery("#enclosure").dropdown('get value'),
				'building_length': parseFloat(jQuery("#building-length").val()),
				'building_width': jQuery("#building-width").val(),
				'parapet_height': jQuery("#parapet-height").val(),
				'number_of_building': jQuery("#number-of-building").val(),
				'roof_mean_height': jQuery("#roof-mean-height").val(),
				'reference_height': jQuery("#reference-height").val(),
				'wall_cladding_area': jQuery("#wall-cladding-area").val(),
				'roof_cladding_area': jQuery("#roof-cladding-area").val(),
				'wind_blockage': jQuery("#wind-blockage").dropdown('get text'),
				'wall_condition': jQuery("#wall-condition").dropdown('get text'),
				'action_combination_case': jQuery("#action-combination").dropdown('get text'),
				'wall_type': jQuery("#wall-type").dropdown('get text'),
				'ratio_of_opening_to_total_area': jQuery("#ratio-of-opening-to-total-area").val(),
				'cladding_type': jQuery("#cladding-type").val(),
				'roof_profile': jQuery("#roof-profile").dropdown('get text'),
				'roof_pitch_angle': jQuery("#roof-angle").val(),
				'euro_ground_to_top': jQuery("#ground-to-top-of-roof-height").val(),
				'flat_roof_profile_en1991': jQuery("#flat-roof-type").dropdown('get text'),
				'parapet_height_en1991': jQuery("#parapet-height-en1991").val(),
				'radius_of_curved_eaves_en1991': jQuery("#radius-of-curved-eaves-en1991").val(),
				'angle_of_mansard_eaves_en1991': jQuery("#angle-of-mansard-eaves-en1991").val(),
				
				'elevated_building': jQuery('#elevated-building').dropdown('get text'),
				// 'wall_area_en1991': wall_area_en1991,
				// 'roof_area_en1991': roof_area_en1991,
				'euro_natural_frequency': jQuery('#natural-frequency-en1991').val(),
				'euro_log_decrement_damping': jQuery('#logarithmic-decrement-damping-en1991').val(),
				'roof_solar_panel': {
					'solar_panel': jQuery('#roof-solarpanel').dropdown('get text'),
					'panel_length': jQuery('#roof-solarpanel-panel-length').val(),
					'panel_angle': jQuery('#roof-solarpanel-angle').val(),
					'parapet_height': jQuery('#parapet-height').val(),
					'effective_area': jQuery('#roof-solarpanel-effective-wind-area').val()
				},
				// IS875
				'solidity_ratio_is875': jQuery('#solidity-ratio-is875').val(),
				'wall_area_is875': jQuery('#wall-area-is875').val(),
				'roof_area_is875': jQuery('#roof-area-is875').val()
			};
	
			var structure_data = ''
			structure_data += '<table class="ui celled small compact table center aligned">';
			// HEADER
			structure_data += '			<thead>';
			structure_data += '			<tr>';
			structure_data += '			<th>Parameter</th>';
			structure_data += '			<th>Value</th>';
			structure_data += '			</tr>';
			structure_data += '			</thead>';
	
			// CONTENT
			structure_data += '			<tbody>';

			structure_data += '			<tr><td>Roof Profile</td>';
			structure_data += '			<td>'+building_data.roof_profile+'</td></tr>';
			structure_data += '			<tr><td>Building Length</td>';
			structure_data += '			<td>'+building_data.building_length+' <span data-unit="length"></span></td></tr>';
			structure_data += '			<tr><td>Building Width</td>';
			structure_data += '			<td>'+building_data.building_width+' <span data-unit="length"></span></td></tr>';
			structure_data += '			<tr><td>Roof Pitch Angle</td>';
			structure_data += '			<td>'+building_data.roof_pitch_angle+' &deg;</td></tr>';

			
			if (CODE == 'asce7-10' || CODE == 'asce7-16' || CODE == 'as1170' || CODE == 'nscp2015') {

				structure_data += '			<tr><td>Mean Roof Height</td>';
				structure_data += '			<td>'+building_data.roof_mean_height+' <span data-unit="length"></span></td></tr>';
	
			} else if (CODE == 'nbcc2015' || CODE == 'is875') {
			
				structure_data += '			<tr><td>Reference Height</td>';
				structure_data += '			<td>'+building_data.reference_height+' <span data-unit="length"></span></td></tr>';
	
			} else if (CODE == 'en1991') {
				
				structure_data += '			<tr><td>Ground to top of roof</td>';
				structure_data += '			<td>'+building_data.euro_ground_to_top+' <span data-unit="length"></span></td></tr>';
				
			} 
	
			structure_data += '		</tbody>';
			structure_data += '</table>';
	
			// Generate building data table
			SKYCIV_UTILS.report.addHTML(structure_data);
			SKYCIV_UTILS.report.addObject(jQuery("#figure-of-structure"));
	
	
			// WIND LOAD PARAMETERS
			// Generate building data table
			if (jQuery('#wind-load-checkbox').checkbox('is checked')) {
				
				var wind_load_parameters = ''
	
				wind_load_parameters += '<table class="ui celled small compact table center aligned">';
				// HEADER
				wind_load_parameters += '			<thead>';
				wind_load_parameters += '			<tr>';
				wind_load_parameters += '			<th>Parameter</th>';
				wind_load_parameters += '			<th>Value</th>';
				wind_load_parameters += '			</tr>';
				wind_load_parameters += '			</thead>';
	
				// CONTENT
				wind_load_parameters += '			<tbody>';

				wind_load_parameters += '			<tr><td>Structure Type</td>';
				wind_load_parameters += '			<td>'+jQuery('#structure-type').dropdown('get text')+'</td></tr>';

				if (CODE == 'asce7-10' || CODE == 'asce7-16' || CODE == 'nscp2015') {
	
					wind_load_parameters += '			<tr><td>Enclosure Classification</td>';
					wind_load_parameters += '			<td>'+jQuery("#enclosure").dropdown('get text'),+'</td></tr>';
	
					if (building_data.enclosure == 'open') {
						wind_load_parameters += '			<tr><td>Wind Blockage</td>';
						wind_load_parameters += '			<td>'+building_data.wind_blockage+'</td></tr>';
					}

					

					if (building_data.structure_type == 'building-cladding-asce7-16' || building_data.structure_type == 'building-cladding') {
						if (building_data.wall_cladding_area == '') building_data.wall_cladding_area = 10
						if (building_data.roof_cladding_area == '') building_data.roof_cladding_area = 10

						wind_load_parameters += '			<tr><td>Area of Wall Cladding</td>';
						wind_load_parameters += '			<td>'+building_data.wall_cladding_area+' <span data-unit="length"></span><sup>2</sup></td></td></tr>';
						wind_load_parameters += '			<tr><td>Area of Roof Cladding</td>';
						wind_load_parameters += '			<td>'+building_data.roof_cladding_area+' <span data-unit="length"></span><sup>2</sup></td></td></tr>';
					
						wind_load_parameters += '			<tr><td>Parapet Height, h<sub>p</sub></td>';
						wind_load_parameters += '			<td>'+(building_data.parapet_height)+' <span data-unit="length"></span></td></td></tr>';
					
						

						if (building_data.structure_type == 'building-cladding-asce7-16' && (jQuery('#roof-solarpanel').dropdown('get value') == 'yes')) {
							wind_load_parameters += '			<tr><td>Consider Rooftop Solar Panel?</td>';
							wind_load_parameters += '			<td>'+jQuery("#roof-solarpanel").dropdown('get text'),+'</td></tr>';
							
							wind_load_parameters += '			<tr><td>Roof Solar Panel Chord Length, L<sub>p</sub></td>';
							wind_load_parameters += '			<td>'+building_data.roof_solar_panel.panel_length+' <span data-unit="length"></span></td></tr>';


							wind_load_parameters += '			<tr><td>Angle of Solar Panel with roof surface, ω</td>';
							wind_load_parameters += '			<td>'+building_data.roof_solar_panel.panel_angle+' &deg;</td></tr>';
							
							wind_load_parameters += '			<tr><td>Solar Panel Effective Wind Area, A</td>';
							wind_load_parameters += '			<td>'+building_data.roof_solar_panel.effective_area+' <span data-unit="length"></span><sup>2</sup></td></td></tr>';

						}
					
					}
	
				} else if (CODE == 'as1170') {
	
					if (building_data.structure_type == 'as1170-openbuilding') {
						wind_load_parameters += '			<tr><td>Wind Blockage</td>';
						wind_load_parameters += '			<td>'+building_data.wind_blockage+'</td></tr>';
					} else {
						if (building_data.wall_type == 'permeable') var wall_type = 'windward wall permeable';
						if (building_data.wall_type == 'impermeable') var wall_type = 'windward wall not permeable';
			
						wind_load_parameters += '			<tr><td>Wall Condition</td>';
						wind_load_parameters += '			<td>'+building_data.wall_condition+' - ' +wall_type+'</td></tr>';
			
						wind_load_parameters += '			<tr><td>Action Combination Case</td>';
						wind_load_parameters += '			<td>'+building_data.action_combination_case+'</td></tr>';
						wind_load_parameters += '			<tr><td>Ratio of Dominant Opening to Total Open Area</td>';
						wind_load_parameters += '			<td>'+building_data.ratio_of_opening_to_total_area+'</td></tr>';
					}
	
					if (building_data.structure_type == 'as1170-cladding') {
						if (building_data.wall_cladding_area == '') building_data.wall_cladding_area = 10
						if (building_data.roof_cladding_area == '') building_data.roof_cladding_area = 10

						wind_load_parameters += '			<tr><td>Area of Wall Cladding</td>';
						wind_load_parameters += '			<td>'+building_data.wall_cladding_area+'</td></tr>';
						wind_load_parameters += '			<tr><td>Area of Roof Cladding</td>';
						wind_load_parameters += '			<td>'+building_data.roof_cladding_area+'</td></tr>';
	
						if (building_data.cladding_type == 'cladding-type-permeable') var cladding_type = 'Cladding is permeable';
						if (building_data.cladding_type == 'cladding-type-impermeable') var cladding_type = 'Cladding is not permeable';
	
						wind_load_parameters += '			<tr><td>Cladding Permeability</td>';
						wind_load_parameters += '			<td>'+cladding_type+'</td></tr>';
					}
	
				} else if (CODE == 'nbcc2015') {
					
					wind_load_parameters += '			<tr><td>Enclosure Classification</td>';
					wind_load_parameters += '			<td>'+jQuery("#enclosure").dropdown('get text'),+'</td></tr>';
	
					if (building_data.enclosure == 'open') {
						wind_load_parameters += '			<tr><td>Wind Blockage</td>';
						wind_load_parameters += '			<td>'+building_data.wind_blockage+'</td></tr>';
					}
	
					if (building_data.structure_type == 'nbcc2015-cladding') {
						if (building_data.wall_cladding_area == '') building_data.wall_cladding_area = 10
						if (building_data.roof_cladding_area == '') building_data.roof_cladding_area = 10
						
						wind_load_parameters += '			<tr><td>Area of Wall Cladding</td>';
						wind_load_parameters += '			<td>'+building_data.wall_cladding_area+'</td></tr>';
						wind_load_parameters += '			<tr><td>Area of Roof Cladding</td>';
						wind_load_parameters += '			<td>'+building_data.roof_cladding_area+'</td></tr>';
	
						wind_load_parameters += '			<tr><td>Cladding Pressure considered</td>';
						wind_load_parameters += '			<td>'+jQuery("#cladding-type-nbcc2015").dropdown('get text');+'</td></tr>';
					}
	
				} else if (CODE == 'en1991') {
					
					wind_load_parameters += '			<tr><td>Roof type (for flat roof)</td>';
					wind_load_parameters += '			<td>'+building_data.flat_roof_profile_en1991+'</td></tr>';
	
					if (building_data.roof_pitch_angle <= 5) {
						var flat_roof_type = jQuery('#flat-roof-type').dropdown('get value');
	
						if (flat_roof_type == 'sharp-eaves') {
						} else if (flat_roof_type == 'with-parapet') {
							wind_load_parameters += '			<tr><td>Parapet height</td>';
							wind_load_parameters += '			<td>'+jQuery('#parapet-height-en1991').val()+' <span data-unit="length"></span></td></tr>';
						} else if (flat_roof_type == 'curved-eaves') {
							wind_load_parameters += '			<tr><td>Radius of curved eaves</td>';
							wind_load_parameters += '			<td>'+jQuery('#radius-of-curved-eaves-en1991').val()+' <span data-unit="length"></span></td></tr>';
						} else if (flat_roof_type == 'mansard-eaves') {
							wind_load_parameters += '			<tr><td>Angle of mansard eaves</td>';
							wind_load_parameters += '			<td>'+jQuery('#angle-of-mansard-eaves-en1991').val()+' &deg;</td></tr>';
						}
					}
	
					if (building_data.structure_type == 'en1991-building') {
						
						if (country == 'United Kingdom' || country == 'Ireland') {
							if (building_data.euro_natural_frequency === '') building_data.euro_natural_frequency = 46/parseFloat(building_data.euro_ground_to_top)
							if (building_data.euro_log_decrement_damping === '') building_data.euro_log_decrement_damping = 0.05
				
							wind_load_parameters += '			<tr><td>Natural Frequency of structure, n</td>';
							wind_load_parameters += '			<td>'+building_data.euro_natural_frequency+' Hz</td></tr>';

							wind_load_parameters += '			<tr><td>Total Logarithmic Decrement of Damping, 𝛿</td>';
							wind_load_parameters += '			<td>'+building_data.euro_log_decrement_damping+'</td></tr>';
						}
						
					} else {
						wind_load_parameters += '			<tr><td>Wind Blockage</td>';
						wind_load_parameters += '			<td>'+building_data.wind_blockage+'</td></tr>';
					}

				} else if (CODE == 'is875') {

					wind_load_parameters += '			<tr><td>Enclosure Classification</td>';
					wind_load_parameters += '			<td>'+jQuery("#enclosure").dropdown('get text'),+'</td></tr>';

					wind_load_parameters += '			<tr><td>Wall Condition</td>';
					wind_load_parameters += '			<td>'+building_data.wall_condition+'</td></tr>';
		
					wind_load_parameters += '			<tr><td>Design Case for Combination Factor</td>';
					wind_load_parameters += '			<td>'+building_data.action_combination_case+'</td></tr>';

					wind_load_parameters += '			<tr><td>Solidity Ratio, Φ</td>';
					wind_load_parameters += '			<td>'+building_data.solidity_ratio_is875+'</td></tr>';

					if (building_data.wall_area_is875 == '') building_data.wall_area_is875 = 10
					if (building_data.roof_area_is875 == '') building_data.wall_area_is875 = 10

					wind_load_parameters += '			<tr><td>Area of Wall Component</td>';
					wind_load_parameters += '			<td>'+building_data.wall_area_is875+' <span data-unit="length"></span><sup>2</sup></td></tr>';

					wind_load_parameters += '			<tr><td>Area of Roof Component</td>';
					wind_load_parameters += '			<td>'+building_data.roof_area_is875+' <span data-unit="length"></span><sup>2</sup></td></tr>';
				}
	
				wind_load_parameters += '		</tbody>';
				wind_load_parameters += '</table>';
	
				SKYCIV_UTILS.report.addHTML(addHeading("Wind Input Parameters"));
	
				SKYCIV_UTILS.report.addHTML(wind_load_parameters);

				// Add building entry table
				var building_entry_table = '';
				building_entry_table += '<table class="ui celled small compact table center aligned" id="result-entry-table">';
				building_entry_table += '	<thead><tr>';
				building_entry_table += '			<th>Floor Level</th>';
				building_entry_table += '			<th>Floor Elevation <span data-unit="length"></span></th>';
				building_entry_table += '	</tr></thead>';
	
				building_entry_table += '	<tbody>';
	
				for (var j = 0; j < building_data.structure_level.length; j++) {
					building_entry_table += '		<tr>'
					building_entry_table += '		<td>'+ building_data.structure_level[j].floor_level +'</td>'
					building_entry_table += '		<td>'+ building_data.structure_level[j].floor_elevation +'</td>'
					building_entry_table += '		</tr>'
				}
				
				building_entry_table += '	</tbody>';
				building_entry_table += '</table>';
	
				var struc_type_with_entry_table = {
					'building-mwfrs': 'enclosed', 
					'building-mwfrs-asce7-16': 'enclosed', 
					'as1170-building': true, 
					'en1991-building': true, 
					'nbcc2015-building': true
				};
	
				if (struc_type_with_entry_table[building_data.structure_type] || struc_type_with_entry_table[building_data.structure_type] === 'enclosed') {
					if (building_data.enclosure != 'open') {
						SKYCIV_UTILS.report.addHTML(building_entry_table);
						jQuery("#report-frame #result-entry-table").css("width","50%").css('margin', 'auto');
					}
				}
	
				SKYCIV_UTILS.report.addObject(jQuery("#figure-of-structure"));
	
				if (building_data.structure_type == 'building-cladding-asce7-16' && (jQuery('#roof-solarpanel').dropdown('get value') == 'yes')) SKYCIV_UTILS.report.addObject(jQuery("#rooftop-solar-panel-figure-asce7-16"));
	
			}
	
			// Add figure of structure
			jQuery("#report-frame .building-figure").css("width","50%").css('margin', 'auto');
	
	
			// SNOW LOAD PARAMETERS
			if (jQuery('#snow-load-checkbox').checkbox('is checked')) {
	
				SKYCIV_UTILS.report.addHTML(addHeading("Snow Input Parameters"));
	
				var snow_load_parameters = ''
				snow_load_parameters += '<table class="ui celled small compact table center aligned">';
				// HEADER
				snow_load_parameters += '			<thead>';
				snow_load_parameters += '			<tr>';
				snow_load_parameters += '			<th>Parameter</th>';
				snow_load_parameters += '			<th>Value</th>';
				snow_load_parameters += '			</tr>';
				snow_load_parameters += '			</thead>';
	
				// CONTENT
				snow_load_parameters += '			<tbody>';
				if (CODE == 'asce7-10' || CODE == 'asce7-16') {
	
					snow_load_parameters += '			<tr><td>Terrain Category (for Snow Loads)</td>';
					snow_load_parameters += '			<td>'+jQuery('#snow-terrain-category').dropdown('get text')+'</td></tr>';
					snow_load_parameters += '			<tr><td>Exposure Condition of Roof</td>';
					snow_load_parameters += '			<td>'+jQuery('#snow-exposure-condition-roof').dropdown('get text')+'</td></tr>';
					snow_load_parameters += '			<tr><td>Thermal Condition</td>';
					snow_load_parameters += '			<td>'+jQuery('#snow-thermal-condition').dropdown('get text')+'</td></tr>';
					snow_load_parameters += '			<tr><td>Sloped Roof Condition</td>';
					snow_load_parameters += '			<td>'+jQuery('#snow-sloped-roof-condition').dropdown('get text')+'</td></tr>';
					
				} else if (CODE == 'as1170') {
					
					snow_load_parameters += '			<tr><td>Snow Exposure Category</td>';
					snow_load_parameters += '			<td>'+jQuery('#snow-exposure-category-as1170').dropdown('get text')+'</td></tr>';
	
				} else if (CODE == 'nbcc2015') {
	
					snow_load_parameters += '			<tr><td>Sloped Roof Condition</td>';
					snow_load_parameters += '			<td>'+jQuery('#snow-sloped-roof-condition-nbcc2015').dropdown('get text')+'</td></tr>';
	
				} else if (CODE == 'en1991') {
				
					snow_load_parameters += '			<tr><td>Design Situation</td>';
					snow_load_parameters += '			<td>'+jQuery('#design-situation-en1991').dropdown('get text')+'</td></tr>';
					snow_load_parameters += '			<tr><td>Topography for EN 1991-1-3 Snow Calculation</td>';
					snow_load_parameters += '			<td>'+jQuery('#snow-topography-en1991').dropdown('get text')+'</td></tr>';
					snow_load_parameters += '			<tr><td>Type of Snow</td>';
					snow_load_parameters += '			<td>'+jQuery('#snow-type-en1991').dropdown('get text')+'</td></tr>';
					
				} else if (CODE == 'is875') {

				}
	
				snow_load_parameters += '		</tbody>';
				snow_load_parameters += '</table>';
				
	
				// BUILDING ENTRY TABLE
				var snow_multiple_case_data = SKYCIV_DESIGN.snow.getSnowLoadMultipleCaseDataInput();
	
				var	snowname_obj = {
					// ASCE 7
					'symmetric_gable':  {'name': 'Symmetric Gable Roof', 'row_total': 1, 'image_src': 'snow_asce7/snow_gable_sym.png'},
					'asymmetric_gable': {'name': 'Asymmetric Gable Roof', 'row_total': 2, 'image_src': 'snow_asce7/snow_gable_asym.png'},
					'lower_roof': {'name':  'Drift on Lower Roof', 'row_total': 2, 'image_src': 'snow_asce7/snow_low_roof.png'},
					
					// AS1170
					'unbalanced_duopitched': {'name': 'Drift on duopitch roof', 'row_total': 2, 'image_src': 'snow_as1170/alpine_duopitch.jpg'},
					'unbalanced_monopitched':  {'name': 'Drift on monopitch roof', 'row_total': 1, 'image_src': 'snow_as1170/alpine_monopitch.jpg'},
					'drifting_sheltered': {'name':  'Drift on sheltered roof', 'row_total': 5, 'image_src': 'snow_as1170/alpine_drifting_sheltered_roof.jpg'},
					'drifting_lower_upper':  {'name':  'Drift on lower and adjacent roof', 'row_total': 6, 'image_src': 'snow_as1170/alpine_drifting_lower_upper.jpg'},
					'drifting_projection_obstruction':   {'name':  'Drift on projections and obstruction', 'row_total': 2, 'image_src': 'snow_as1170/alpine_obstructed_roof.jpg'},
					'obstructed_sloping_roof_subalpine_parapet':  {'name': 'Drift on obstructed roof with parapet', 'row_total': 2, 'image_src': 'snow_as1170/subalpine_obstructed_sloping_roof_parapet.jpg'},
					'obstructed_sloping_roof_subalpine_abutting': {'name': 'Drift on obstructed roof with abutting' , 'row_total': 1, 'image_src': 'snow_as1170/subalpine_obstructed_sloping_roof_abutting.jpg'},
					'drifting_lower_roof_subalpine': {'name':  'Drifting on lower roof for sub-alpine', 'row_total': 3, 'image_src': 'snow_as1170/subalpine_drifting_upper_lower.jpg'},
	
					// NBCC 2015
					'multilevel_roof_case1':  {'name':  'Multi-level Roofs - Case 1', 'row_total': 6, 'image_src': 'snow_nbcc2015/multilevel_case1.png'},
					'multilevel_roof_case2': {'name':  'Multi-level Roofs - Case 2' , 'row_total': 6, 'image_src': 'snow_nbcc2015/multilevel_case2.png'},
					'multilevel_roof_case3': {'name':  'Multi-level Roofs - Case 3' , 'row_total': 6, 'image_src': 'snow_nbcc2015/multilevel_case3.png'},
					'areas_adjacent_to_roof_projections': {'name':  'Areas Adjacent to Roof Projections', 'row_total': 4, 'image_src': 'snow_nbcc2015/projection.png'},
					'gable_roof':  {'name':  'Gable Roofs', 'row_total': 3, 'image_src': 'snow_nbcc2015/gable.png'},
	
					// EN1991
					'unbalanced_duopitched_en1991':  {'name':  'Drift on duopitch roof', 'row_total': 2, 'image_src': 'snow_en1991/duopitch.jpg'},
					'unbalanced_monopitched_en1991':  {'name':  'Drift on monopitch roof', 'row_total': 1, 'image_src': 'snow_en1991/monopitch.jpg'},
					'abuttting_and_close_to_taller_construction_en1991':  {'name':  'Drift on roof abutting to taller construction works', 'row_total': 5, 'image_src': 'snow_en1991/abutting_to_taller.jpg'},
					'drifting_projection_obstruction_en1991':  {'name':  'Drift on projections and obstruction', 'row_total': 2, 'image_src': 'snow_en1991/obstructed_roof.jpg'},
					'abuttting_and_close_to_taller_construction_annexB_en1991':  {'name':  'Drift on roof abutting to taller construction works', 'row_total': 4, 'image_src': 'snow_en1991/abutting_to_taller_UK.jpg'}
				
				};
				
	
				if (jQuery('#unbalanced-snow-load-dropdown').dropdown('get value') == "balance-unbalance") {
	
					function generateSnowLoadMultipleCaseInputData (snowcase, obj, index) {
	
						var row_total = snowname_obj[snowcase].row_total;
	
						if ((snowcase == 'multilevel_roof_case1' || snowcase == 'multilevel_roof_case2' || snowcase == 'multilevel_roof_case3')) {
							if (obj.height_of_parapet_hp.sliding ==  "no-sliding") row_total = row_total+1;
						}
						
						snow_load_parameters += '	<tr>';
	
						snow_load_parameters += '	<td rowspan="'+row_total+'">';
						snow_load_parameters += 'Case '+ (index+1) + ' - ' + snowname_obj[snowcase].name + '<br><br>'+ obj.snow_case_remarks;
						snow_load_parameters += '	</td>';
			
						snow_load_parameters += '	<td rowspan="'+row_total+'">';
						snow_load_parameters += '<img class="ui snow rectangular medium image snow-multiple-case-input centered center aligned" src="' + SKYCIV_DESIGN.getImgSrc(snowname_obj[snowcase].image_src) + '">';
						snow_load_parameters += '	</td>';
	
						if (snowcase == 'symmetric_gable') {
							snow_load_parameters += '		<td>Upwind Length, w</td> 		<td>' + parseFloat(obj.horizontal_dist_eave_to_ridge_W_upwind_symmetric).toFixed(2) + ' <span data-unit="length"></span> </td>';
							snow_load_parameters += '	</tr>';
						} else if (snowcase == 'asymmetric_gable') {
							snow_load_parameters += '		<td>Upwind Length, w</td> 		<td>' + parseFloat(obj.horizontal_dist_eave_to_ridge_W_upwind).toFixed(2) + ' <span data-unit="length"></span> </td>';
							snow_load_parameters += '	</tr>';
	
							snow_load_parameters += '		<tr><td>Downwind Length, w<sub>d</sub></td> 		<td>' + parseFloat(obj.horizontal_dist_eave_to_ridge_W_downwind).toFixed(2) + ' <span data-unit="length"></span> </td></tr>';
						} else if (snowcase == 'lower_roof') {
							snow_load_parameters += '		<td>Length of Upper Roof, L<sub>u</sub></td> 		<td>' + parseFloat(obj.length_of_roof_upwind_lu).toFixed(2) + ' <span data-unit="length"></span> </td>';
							snow_load_parameters += '	</tr>';
				
							snow_load_parameters += '		<tr><td>Height difference between upper and lower roof, h<sub>r</sub></td> 		<td>' + parseFloat(obj.height_diff_bet_upper_lower_roof_hr).toFixed(2) + ' <span data-unit="length"></span> </td></tr>';
						}  else if (snowcase == "unbalanced_duopitched") {
							snow_load_parameters += '		<td>Roof Pitch Angle 1, θ<sub>1</sub></td> 		<td>' + parseFloat(obj.roof_pitch_angle1_duopitch).toFixed(2) + ' &deg </td>';
							snow_load_parameters += '	</tr>';
							
							snow_load_parameters += '		<tr><td>Roof Pitch Angle 2, θ<sub>2</sub></td> 		<td>' + parseFloat(obj.roof_pitch_angle2_duopitch).toFixed(2) + ' &deg </td></tr>';
						} else if (snowcase == "unbalanced_monopitched") {
	
							snow_load_parameters += '		<td>Roof Pitch Angle, θ<sub>1</sub></td> 		<td>' + parseFloat(obj.roof_pitch_angle_monopitch).toFixed(2) + ' &deg </td>';
							snow_load_parameters += '	</tr>';
	
						} else if (snowcase == "drifting_sheltered") {
							snow_load_parameters += '		<td>Roof Pitch Angle 1, θ<sub>1</sub></td> 		<td>' + parseFloat(obj.roof_pitch_angle1).toFixed(2) + ' &deg </td>';
							snow_load_parameters += '	</tr>';
	
							snow_load_parameters += '		<tr><td>Roof Pitch Angle 2, θ<sub>2</sub></td> 		<td>' + parseFloat(obj.roof_pitch_angle2).toFixed(2) + ' &deg </td></tr>';
							snow_load_parameters += '		<tr><td>l<sub>1</sub></td> 		<td>' + parseFloat(obj.l1).toFixed(2) + ' <span data-unit="length"></span> </td></tr>';
							snow_load_parameters += '		<tr><td>l<sub>2</sub></td> 		<td>' + parseFloat(obj.l2).toFixed(2) + ' <span data-unit="length"></span> </td></tr>';
							snow_load_parameters += '		<tr><td>h<sub>d</sub></td> 		<td>' + parseFloat(obj.hd).toFixed(2) + ' <span data-unit="length"></span> </td></tr>';						
						} else if (snowcase == "drifting_lower_upper") {
							snow_load_parameters += '		<td>Roof Pitch Angle 1, θ<sub>1</sub></td> 		<td>' + parseFloat(obj.roof_pitch_angle1).toFixed(2) + ' &deg </td>';
							snow_load_parameters += '	</tr>';
	
							snow_load_parameters += '		<tr><td>Roof Pitch Angle 2, θ<sub>2</sub></td> 		<td>' + parseFloat(obj.roof_pitch_angle2).toFixed(2) + ' &deg </td></tr>';					
							snow_load_parameters += '		<tr><td>l<sub>1</sub></td> 		<td>' + parseFloat(obj.l1).toFixed(2) + ' <span data-unit="length"></span> </td></tr>';
							snow_load_parameters += '		<tr><td>l<sub>2</sub></td> 		<td>' + parseFloat(obj.l2).toFixed(2) + ' <span data-unit="length"></span> </td></tr>';
							snow_load_parameters += '		<tr><td>h<sub>d</sub></td> 		<td>' + parseFloat(obj.hd).toFixed(2) + ' <span data-unit="length"></span> </td></tr>';
							snow_load_parameters += '		<tr><td>h<sub>r</sub></td> 		<td>' + parseFloat(obj.hr).toFixed(2) + ' <span data-unit="length"></span> </td></tr>';
						} else if (snowcase == "drifting_projection_obstruction") {
							snow_load_parameters += '		<td>Roof Pitch Angle 1, θ<sub>1</sub></td> 		<td>' + parseFloat(obj.roof_pitch_angle1).toFixed(2) + ' &deg </td>';
							snow_load_parameters += '	</tr>';
	
							snow_load_parameters += '		<tr><td>h</td> 		<td>' + parseFloat(obj.h).toFixed(2) + ' <span data-unit="length"></span> </td></tr>';
						} else if (snowcase == "obstructed_sloping_roof_subalpine_parapet") {
							snow_load_parameters += '		<td>Roof Pitch Angle 1, θ<sub>1</sub></td> 		<td>' + parseFloat(obj.roof_pitch_angle1).toFixed(2) + ' &deg </td>';
							snow_load_parameters += '	</tr>';
	
							snow_load_parameters += '		<tr><td>Height of parapet, h<sub>p</sub></td> 		<td>' + parseFloat(obj.hp).toFixed(2) + ' <span data-unit="length"></span> </td></tr>';						
						} else if (snowcase == "obstructed_sloping_roof_subalpine_abutting") {
							snow_load_parameters += '		<td>Roof Pitch Angle 1, θ<sub>1</sub></td> 		<td>' + parseFloat(obj.roof_pitch_angle1).toFixed(2) + ' &deg </td>';
							snow_load_parameters += '	</tr>';
						} else if (snowcase == "drifting_lower_roof_subalpine") {
							snow_load_parameters += '		<td>Roof Pitch Angle 1, θ<sub>1</sub></td> 		<td>' + parseFloat(obj.roof_pitch_angle1).toFixed(2) + ' &deg </td>';
							snow_load_parameters += '	</tr>';
	
							snow_load_parameters += '		<tr><td>Roof Pitch Angle 2, θ<sub>2</sub></td> 		<td>' + parseFloat(obj.roof_pitch_angle2).toFixed(2) + ' &deg </td></tr>';
							snow_load_parameters += '		<tr><td>Height difference of upper and lower roof, h<sub>d</sub></td> 		<td>' + parseFloat(obj.hd).toFixed(2) + ' <span data-unit="length"></span> </td></tr>';
						} else if (snowcase == 'multilevel_roof_case1' || snowcase == 'multilevel_roof_case2' || snowcase == 'multilevel_roof_case3') {
							if (snowcase == 'multilevel_roof_case1') {
								snow_load_parameters += '		<td>Length of the upper roof, l<sub>s</sub></td> 		<td>' + parseFloat(obj.upper_roof_length_ls).toFixed(2) + ' &deg </td>';
								snow_load_parameters += '	</tr>';
								
								snow_load_parameters += '		<tr><td>Width of the upper roof, w<sub>s</sub></td> 		<td>' + parseFloat(obj.upper_roof_width_ws).toFixed(2) + ' &deg </td></tr>';
							} else {
								snow_load_parameters += '		<td>Length of the source area on lower roof, l<sub>s</sub></td> 		<td>' + parseFloat(obj.upper_roof_length_ls).toFixed(2) + ' &deg </td>';
								snow_load_parameters += '	</tr>';
								
								snow_load_parameters += '		<tr><td>Width of the source area on lower roof, w<sub>s</sub></td> 		<td>' + parseFloat(obj.upper_roof_width_ws).toFixed(2) + ' &deg </td></tr>';
							}
								
							snow_load_parameters += '		<tr><td>Height difference between upper and lower roof, h</td> 		<td>' + parseFloat(obj.height_difference_h).toFixed(2) + ' &deg </td></tr>';
							snow_load_parameters += '		<tr><td>Roof Pitch Angle of Lower Roof, α</td> 		<td>' + parseFloat(obj.roof_angle_lower_alpha).toFixed(2) + ' &deg </td></tr>';
							snow_load_parameters += '		<tr><td>Horizontal gap between roofs, a</td> 		<td>' + parseFloat(obj.roof_gap_a).toFixed(2) + ' <span data-unit="length"></span> </td></tr>';
							
							if (obj.height_of_parapet_hp.sliding ==  "no-sliding") snow_load_parameters += '		<tr><td>Height of parapet, hp</td> 		<td>' + parseFloat(obj.height_of_parapet_hp).toFixed(2) + ' <span data-unit="length"></span> </td></tr>';
						} else if (snowcase == 'areas_adjacent_to_roof_projections') {
							snow_load_parameters += '		<td>Height of projection, h</td> 		<td>' + parseFloat(obj.height_of_projection).toFixed(2) + ' &deg </td>';
							snow_load_parameters += '	</tr>';
							
							snow_load_parameters += '		<tr><td>Longest horizontal dimension of projection, l<sub>0</sub></td> 		<td>' + parseFloat(obj.longest_horizontal_dim_l0).toFixed(2) + ' &deg </td></tr>';
							snow_load_parameters += '		<tr><td>Larger dimension of roof, l</td> 		<td>' + parseFloat(obj.upper_roof_length_ls).toFixed(2) + ' &deg </td></tr>';
							snow_load_parameters += '		<tr><td>Smaller dimension of roof, w</td> 		<td>' + parseFloat(obj.upper_roof_width_ws).toFixed(2) + ' <span data-unit="length"></span> </td></tr>';
						} else if (snowcase == 'gable_roof') {
							snow_load_parameters += '		<td>Roof Pitch Angle, α</td> 		<td>' + parseFloat(obj.roof_pitch_angle).toFixed(2) + ' &deg </td>';
							snow_load_parameters += '	</tr>';
	
							snow_load_parameters += '		<tr><td>Larger dimension of roof, l</td> 		<td>' + parseFloat(obj.upper_roof_length_ls).toFixed(2) + ' &deg </td></tr>';
							snow_load_parameters += '		<tr><td>Smaller dimension of roof, w</td> 		<td>' + parseFloat(obj.upper_roof_width_ws).toFixed(2) + ' <span data-unit="length"></span> </td></tr>';
											
						} else if (snowcase == 'unbalanced_duopitched_en1991') {
	
							snow_load_parameters += '		<td>Roof Pitch Angle 1, θ<sub>1</sub></td> 		<td>' + parseFloat(obj.roof_pitch_angle1_duopitch).toFixed(2) + ' &deg </td>';
							snow_load_parameters += '	</tr>';
							
							snow_load_parameters += '		<tr><td>Roof Pitch Angle 2, θ<sub>2</sub></td> 		<td>' + parseFloat(obj.roof_pitch_angle2_duopitch).toFixed(2) + ' &deg </td></tr>';
							
						} else if (snowcase == 'unbalanced_monopitched_en1991') {
	
							snow_load_parameters += '		<td>Roof Pitch Angle, θ<sub>1</sub></td> 		<td>' + parseFloat(obj.roof_pitch_angle_monopitch).toFixed(2) + ' &deg </td>';
							snow_load_parameters += '	</tr>';
							
						} else if (snowcase == 'abuttting_and_close_to_taller_construction_en1991') {
	
							snow_load_parameters += '		<td>Length of upper roof, b<sub>1</sub></td> 		<td>' + parseFloat(obj.b1).toFixed(2) + ' &deg </td>';
							snow_load_parameters += '	</tr>';
							
							snow_load_parameters += '		<tr><td>Length of lower roof, b<sub>2</sub></td> 		<td>' + parseFloat(obj.b2).toFixed(2) + ' &deg </td></tr>';
							snow_load_parameters += '		<tr><td>Height difference of upper and lower roof, h</td> 		<td>' + parseFloat(obj.h).toFixed(2) + ' &deg </td></tr>';
							snow_load_parameters += '		<tr><td>Roof Pitch Angle 1, θ<sub>1</sub></td> 		<td>' + parseFloat(obj.roof_pitch_angle1).toFixed(2) + ' &deg </td></tr>';
							snow_load_parameters += '		<tr><td>Roof Pitch Angle 2, θ<sub>2</sub></td> 		<td>' + parseFloat(obj.roof_pitch_angle2).toFixed(2) + ' &deg </td></tr>';
							
						} else if (snowcase == 'drifting_projection_obstruction_en1991') {
							
	
							snow_load_parameters += '		<td>Height of projection, h</td> 		<td>' + parseFloat(obj.h).toFixed(2) + ' &deg </td>';
							snow_load_parameters += '	</tr>';
							
							snow_load_parameters += '		<tr><td>Roof Pitch Angle 1, θ<sub>1</sub></td> 		<td>' + parseFloat(obj.roof_pitch_angle1).toFixed(2) + ' &deg </td></tr>';
							
						} else if (snowcase == 'abuttting_and_close_to_taller_construction_annexB_en1991') {
							
							snow_load_parameters += '		<td>Length of upper roof, b<sub>1</sub></td> 		<td>' + parseFloat(obj.b1).toFixed(2) + ' &deg </td>';
							snow_load_parameters += '	</tr>';
							
							snow_load_parameters += '		<tr><td>Length of lower roof, b<sub>2</sub></td> 		<td>' + parseFloat(obj.b2).toFixed(2) + ' &deg </td></tr>';
							snow_load_parameters += '		<tr><td>Height difference of upper and lower roof, h</td> 		<td>' + parseFloat(obj.h).toFixed(2) + ' &deg </td></tr>';
							snow_load_parameters += '		<tr><td>Roof Pitch Angle 1, θ</td> 		<td>' + parseFloat(obj.roof_pitch_angle).toFixed(2) + ' &deg </td></tr>';
						}
	
						
					}
	
					
					for (var i = 0; i < snow_multiple_case_data.length; i++) {
	
						if (i == 0) {
							// HEADER
							snow_load_parameters += '<table class="ui celled small compact table center aligned">';
							snow_load_parameters += '	<thead><tr>';
							snow_load_parameters += '		<th>Case</th>';
							snow_load_parameters += '		<th>Figure</th>';
							snow_load_parameters += '		<th colspan="2">Parameters</th>';
							snow_load_parameters += '	</tr></thead>';
						
							// CONTENT
							snow_load_parameters += '	<tbody>';
						}
						
						let this_obj = snow_multiple_case_data[i];
						let this_load_case = snow_multiple_case_data[i].snow_case_type
						let this_index = i;
	
						if (CODE == 'en1991') this_load_case = this_load_case + '_en1991'
						
						generateSnowLoadMultipleCaseInputData(this_load_case, this_obj, this_index);
	
						if (i == snow_multiple_case_data.length-1) {
							snow_load_parameters += '	</tbody>';
							snow_load_parameters += '</table>';
						}
	
					}
	
					
				}
	
	
				// Generate building data table
				SKYCIV_UTILS.report.addHTML(snow_load_parameters);
	
			}
		 
			// SKYCIV_UTILS.report.addObject(jQuery("#structure-data"));
	
			//design results tab
			if (jQuery('#wind-load-checkbox').checkbox('is checked')) {
				SKYCIV_UTILS.report.addHTML(addHeading("Wind Pressure Results"));
				SKYCIV_UTILS.report.addObject(jQuery("#wind-load-results .form.grid.wind-load"));
			}
	
			if (jQuery('#snow-load-checkbox').checkbox('is checked')) {
				SKYCIV_UTILS.report.addHTML(addHeading("Snow Pressure Results"));
				SKYCIV_UTILS.report.addObject(jQuery("#snow-load-results .form.snow-load"));
			}
			
	
			jQuery("#report-frame").find(".entry-table input").css('text-align', 'center');
			jQuery("#report-frame .s3d-only, #report-frame .free-hidden").hide();
			jQuery("#report-frame .result-image-containers").css("float", "left").css("display", "inline-block").css("width", "400px");
			jQuery("#report-frame .result-image-containers img").css("width", "80%");
	
		}
	} else if (struc_selected == 'freestandingwall') {

		if (report_type == "all") {
			SKYCIV_UTILS.report.addHTML(addHeading("Structure Data"));

			let frestandingwall = {
				'ground_to_top': jQuery('#ground-to-top-freestandingwall').val(),
				'wall_width': jQuery('#wall-width-freestandingwall').val(),
				'wall_height': jQuery('#wall-height-freestandingwall').val(),
				'ratio_of_solid_area_to_gross': jQuery('#ratio-of-solid-area-gross-area-freestandingwall').val(),
				'length_of_return_corner': jQuery('#return-corner-length-freestandingwall').val()
			}
	
			var structure_data = ''
			structure_data += '<table class="ui celled small compact table center aligned">';
			// HEADER
			structure_data += '			<thead>';
			structure_data += '			<tr>';
			structure_data += '			<th>Parameter</th>';
			structure_data += '			<th>Value</th>';
			structure_data += '			</tr>';
			structure_data += '			</thead>';
	
			// CONTENT
			structure_data += '			<tbody>';
			if (CODE == 'asce7-10' || CODE == 'asce7-16' ) {
	
				structure_data += '			<tr><td>Ground to Top of Wall/Sign, h</td>';
				structure_data += '			<td>'+frestandingwall.ground_to_top+' <span data-unit="length"></span></td></tr>';
				structure_data += '			<tr><td>Wall/Sign Horizontal Dimension, B</td>';
				structure_data += '			<td>'+frestandingwall.wall_width+' <span data-unit="length"></span></td></tr>';
				structure_data += '			<tr><td>Wall/Sign Vertical Dimension, s</td>';
				structure_data += '			<td>'+frestandingwall.wall_height+' <span data-unit="length"></span></td></tr>';
				structure_data += '			<tr><td>Ratio of Solid Area to Gross Area, Ɛ</td>';
				structure_data += '			<td>'+frestandingwall.ratio_of_solid_area_to_gross+'</td></tr>';
				structure_data += '			<tr><td>Length of return corner, L<sub>r</sub></td>';
				structure_data += '			<td>'+frestandingwall.length_of_return_corner+' <span data-unit="length"></span></td></tr>';
	
			}
	
			structure_data += '		</tbody>';
			structure_data += '</table>';
	
			// Generate building data table
			SKYCIV_UTILS.report.addHTML(structure_data);
			SKYCIV_UTILS.report.addObject(jQuery("#figure-of-structure"));
	
			// WIND LOAD PARAMETERS
			// Generate building data table
			if (jQuery('#wind-load-checkbox').checkbox('is checked')) {
				
				var wind_load_parameters = ''
	
				wind_load_parameters += '<table class="ui celled small compact table center aligned">';
				// HEADER
				wind_load_parameters += '			<thead>';
				wind_load_parameters += '			<tr>';
				wind_load_parameters += '			<th>Parameter</th>';
				wind_load_parameters += '			<th>Value</th>';
				wind_load_parameters += '			</tr>';
				wind_load_parameters += '			</thead>';
	
				// CONTENT
				wind_load_parameters += '			<tbody>';

				if (CODE == 'asce7-10' || CODE == 'asce7-16' || CODE == 'nscp2015') {
					wind_load_parameters += '			<tr><td>Structure Type</td>';
					wind_load_parameters += '			<td>'+jQuery('#structure-type').dropdown('get text')+'</td></tr>';
				}
				
				wind_load_parameters += '		</tbody>';
				wind_load_parameters += '</table>';
	
				SKYCIV_UTILS.report.addHTML(addHeading("Wind Input Parameters"));
				SKYCIV_UTILS.report.addHTML(wind_load_parameters);
	
				SKYCIV_UTILS.report.addObject(jQuery("#figure-of-structure"));
	
			}
	
			// Add figure of structure
			jQuery("#report-frame .building-figure").css("width","50%").css('margin', 'auto');
	
			//design results tab
			if (jQuery('#wind-load-checkbox').checkbox('is checked')) {
				SKYCIV_UTILS.report.addHTML(addHeading("Wind Pressure Results"));
				SKYCIV_UTILS.report.addObject(jQuery("#wind-load-results-freestandingwall .form.grid.wind-load"));
			}
			
			jQuery("#report-frame").find(".entry-table input").css('text-align', 'center');
			jQuery("#report-frame .s3d-only, #report-frame .free-hidden").hide();
			jQuery("#report-frame .result-image-containers").css("float", "left").css("display", "inline-block").css("width", "400px");
			jQuery("#report-frame .result-image-containers img").css("width", "80%");

		}

	} else if (struc_selected == 'trusstower' || struc_selected == 'truss-tower') {

		if (report_type == "all") {
			SKYCIV_UTILS.report.addHTML(addHeading("Structure Data"));

			let truss_tower =  {
				'ground_to_top': jQuery('#ground-to-top-truss-tower').val(),
				'ground_to_centroid': jQuery('#ground-to-centroid-truss-tower').val(),
				'ratio_of_solid_area_to_gross': jQuery('#ratio-of-solid-area-to-gross-truss-tower').val(),
				'tower_cross_section': jQuery('#cross-section-truss-tower').dropdown('get text'),
				'member_section': jQuery('#member-section-truss-tower').dropdown('get text'),
				'tower_length': jQuery('#truss-tower-length').val(),
				'truss_type': jQuery('#truss-type-truss-tower').dropdown('get text'),
				'base_column_height': jQuery('#column-height-truss-tower').val(),
				'top_base_ratio': jQuery('#top-base-ratio-truss-tower').val()
			}

			let structure_level = SKYCIV_DESIGN.building.getTrussTowerEntryTable().getData(true)
	
			var structure_data = ''
			structure_data += '<table class="ui celled small compact table center aligned">';
			// HEADER
			structure_data += '			<thead>';
			structure_data += '			<tr>';
			structure_data += '			<th>Parameter</th>';
			structure_data += '			<th>Value</th>';
			structure_data += '			</tr>';
			structure_data += '			</thead>';
	
			// CONTENT
			structure_data += '			<tbody>';
			if (CODE == 'asce7-10' || CODE == 'asce7-16') {
	
				structure_data += '			<tr><td>Truss Tower Cross Section</td>';
				structure_data += '			<td>'+truss_tower.tower_cross_section+' </td></tr>';
				structure_data += '			<tr><td>Ground to Top of Distance, h</td>';
				structure_data += '			<td>'+truss_tower.ground_to_top+' <span data-unit="length"></span></td></tr>';
				structure_data += '			<tr><td>Truss Tower Length, L</td>';
				structure_data += '			<td>'+truss_tower.tower_length+' <span data-unit="length"></span></td></tr>';
				structure_data += '			<tr><td>Ratio of Solid Area to Gross Area (Projected), Ɛ</td>';
				structure_data += '			<td>'+truss_tower.ratio_of_solid_area_to_gross+' </td></tr>';
				structure_data += '			<tr><td>Ground to Centroid of Tower, h<sub>o</sub></td>';
				structure_data += '			<td>'+truss_tower.ground_to_centroid+' <span data-unit="length"></span></td></tr>';
				structure_data += '			<tr><td> Column Height, h<sub>c</sub></td>';
				structure_data += '			<td>'+truss_tower.base_column_height+' <span data-unit="length"></span></td></tr>';
				structure_data += '			<tr><td>Ratio of Top Cross Section to Base</td>';
				structure_data += '			<td>'+truss_tower.top_base_ratio+' </td></tr>';
				structure_data += '			<tr><td>Truss Type</td>';
				structure_data += '			<td>'+truss_tower.truss_type+' </td></tr>';
				structure_data += '			<tr><td>Member Cross Section</td>';
				structure_data += '			<td>'+truss_tower.member_section+' </td></tr>';
	
			}
	
			structure_data += '		</tbody>';
			structure_data += '</table>';
	
			// Generate building data table
			SKYCIV_UTILS.report.addHTML(structure_data);
			SKYCIV_UTILS.report.addObject(jQuery("#figure-of-structure"));
	
			// WIND LOAD PARAMETERS
			// Generate building data table
			if (jQuery('#wind-load-checkbox').checkbox('is checked')) {
				
				var wind_load_parameters = ''
				wind_load_parameters += '<table class="ui celled small compact table center aligned">';
				// HEADER
				wind_load_parameters += '			<thead>';
				wind_load_parameters += '			<tr>';
				wind_load_parameters += '			<th>Parameter</th>';
				wind_load_parameters += '			<th>Value</th>';
				wind_load_parameters += '			</tr>';
				wind_load_parameters += '			</thead>';
	
				// CONTENT
				wind_load_parameters += '			<tbody>';
				if (CODE == 'asce7-10' || CODE == 'asce7-16' || CODE == 'nscp2015') {
					wind_load_parameters += '			<tr><td>Structure Type</td>';
					wind_load_parameters += '			<td>'+jQuery('#structure-type').dropdown('get text')+'</td></tr>';
				}
				
				wind_load_parameters += '		</tbody>';
				wind_load_parameters += '</table>';
				
				SKYCIV_UTILS.report.addHTML(addHeading("Wind Input Parameters"));
				SKYCIV_UTILS.report.addHTML(wind_load_parameters);
	
				// Add building entry table
				let trusstower_entry_table = '';
				trusstower_entry_table += '<table class="ui celled small compact table center aligned" id="result-entry-table">';
				trusstower_entry_table += '	<thead><tr>';
				trusstower_entry_table += '			<th>Floor Level</th>';
				trusstower_entry_table += '			<th>Floor Elevation <span data-unit="length"></span></th>';
				trusstower_entry_table += '	</tr></thead>';
	
				building_entry_table += '	<tbody>';
	
				for (var j = 0; j < structure_level.length; j++) {
					trusstower_entry_table += '		<tr>'
					trusstower_entry_table += '		<td>'+ structure_level[j].node_level +'</td>'
					trusstower_entry_table += '		<td>'+ structure_level[j].node_elevation +'</td>'
					trusstower_entry_table += '		</tr>'
				}
				
				trusstower_entry_table += '	</tbody>';
				trusstower_entry_table += '</table>';
	
				SKYCIV_UTILS.report.addHTML(trusstower_entry_table);
				jQuery("#report-frame #result-entry-table").css("width","50%").css('margin', 'auto');
	
				SKYCIV_UTILS.report.addObject(jQuery("#figure-of-structure"));
	
			}
	
			// Add figure of structure
			jQuery("#report-frame .building-figure").css("width","50%").css('margin', 'auto');
	
			//design results tab
			if (jQuery('#wind-load-checkbox').checkbox('is checked')) {
				SKYCIV_UTILS.report.addHTML(addHeading("Wind Pressure Results"));
				SKYCIV_UTILS.report.addObject(jQuery("#wind-load-results-trusstower .form.grid.wind-load"));
			}
			
	
			jQuery("#report-frame").find(".entry-table input").css('text-align', 'center');
			jQuery("#report-frame .s3d-only, #report-frame .free-hidden").hide();
			jQuery("#report-frame .result-image-containers").css("float", "left").css("display", "inline-block").css("width", "400px");
			jQuery("#report-frame .result-image-containers img").css("width", "80%");

		}

	}

	

	SKYCIV_DESIGN.insertUnits();
	
	if (CONTEXT == "s3d" && PARENT && report_type == "all") {

		SKYCIV_UTILS.report.addHTML(addHeading("S3D Model"));
		PARENT.jQuery("#displayNodes").prop("checked", false);
		PARENT.jQuery("#faintElements").prop("checked", true);
		PARENT.jQuery("#displayLoadLabel").prop("checked", false);

		var $case_elements = [];
		PARENT.jQuery("#load-groups-visibility input").each(function () {
			var this_load_group = $(this).attr("data-load-group");
			if (this_load_group.indexOf("WL")> -1) {
				$case_elements.push($(this));
			}
			$(this).prop("checked", false);
		});
		PARENT.S3D.graphics.setCameraView("iso");

		var screenshot_index = 0;

		function takeNextScreenshot(ind) {

			if (ind == 2) SKYCIV_UTILS.report.addHTML(addHeading("S3D Model")); //new page every second screenshots
			if (ind > 0) $case_elements[ind-1].click();//turn off previous lc
			$case_elements[ind].click(); //draw load combo
			SKYCIV_UTILS.report.addHTML("<p>" + $case_elements[ind].attr("data-load-group") + "</p>");
			
			//give time for drawing
			setTimeout(function () {
				PARENT.takeScreenshot("return", false, function (response) {
					SKYCIV_UTILS.report.addHTML("<center><img style='width:70%;' src='" + response + "'/></center>");
					screenshot_index++;
					if (screenshot_index > 3) {
						PARENT.jQuery("#displayNodes").prop("checked", true);
						PARENT.jQuery("#faintElements").prop("checked", false);
						PARENT.jQuery("#displayLoadLabel").prop("checked", false);
						PARENT.jQuery("#displayLoadLabel").click();
						completeReport();
					} else {
						takeNextScreenshot(screenshot_index);
					}
				});			
			}, 300);

		}

		takeNextScreenshot(screenshot_index)

	} else {
			completeReport();
	}



};