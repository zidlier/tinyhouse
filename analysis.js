TINY_HOUSE.analysis = (function () {

    var functions = {}
	var wind_pressure = null
    var snow_pressure = null

    functions.generateLoads = function (data) {

        let { input_height, input_width, input_length, input_truss_height } = data
        let roof_mean_height = (input_truss_height+input_height)*0.5
        let roof_angle = Math.atan((input_truss_height-input_height)/(input_length/2))*(180/Math.PI)
       
        let wind_api_object = {
            "auth": {
                "username": "patrick@skyciv.com",
                "key": "LVBZgXsQgMcqykLB8EfYaIeHqdyaitYKqkXNZuGKH0RLAYIrvtCTdP8rzmLtCq2H"
            },
            "functions": [
                {
                    "function": "standalone.loads.start",
                    "arguments": { "keep_open": true }
                },
                {
                    "function": "standalone.loads.getLoads",
                    "arguments": {
                        "project_details": {
                            "name": "",
                            "id": "",
                            "company": "",
                            "designer": "",
                            "client": "",
                            "notes": "",
                            "units": "metric"
                        },
                        "site_data": {
                            "design_code": "asce7-16",
                            "project_address": "Minneapolis, MN, USA",
                            "topography": {
                                "wind_direction": "N",
                                "topo_image": true,
                                "country": "United States",
                                "exposure": "B"
                            },
                            "risk_category": "II"
                        },
                        "building_data": {
                            "design_code": "asce7-16",
                            "structure": "building",
                            "wind_parameters": {
                                "structure_level": [
                                    {
                                        "floor_level": "Roof Mean Height",
                                        "floor_elevation": roof_mean_height
                                    }
                                ],
                                "wall_cladding_area": "",
                                "roof_cladding_area": "",
                                "enclosure": "enclosed",
                                "structure_type": "mwfrs"
                            },
                            "snow_parameters": {
                                "exposure_condition_roof": "fully-exposed",
                                "terrain_category": "B",
                                "thermal_condition": "greenhouse",
                                "sloped_roof_surface_condition": "slippery",
                                "balance_unbalance": false
                            },
                            "roof_profile": "gable",
                            "building_dimensions": {
                                "length": input_length,
                                "width": input_width,
                                "roof_angle": roof_angle,
                                "mean_roof_height": roof_mean_height
                            }
                        }
                    }
                }
            ]
        }
    
        skyciv.request(wind_api_object, function (res) {

            if (res.response.status == 0) {

                var wind_load_arr  = res.response.data.wind_pressure.pressures;
                var snow_load  = res.response.data.snow_pressure.balance_case.ps;
                
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

                snow_pressure = snow_load
                wind_result = dump_obj

                return {'wind': dump_obj, 'snow': snow_pressure}
                
            } else {

            }
            
        })
    
    }


    functions.testRun = function () {
        let this_data = INDEX.getData()
        functions.generateLoads(this_data)
    }

    var getNodeIDFromModel = function(xval, yval, zval, nodes) {
		for (let i = 1; i < nodes.length; i++) {
			let this_node_val = nodes[i]
			if (this_node_val == null) continue
			if (xval == this_node_val[0] && yval == this_node_val[1] && zval == this_node_val[2]) return i
		}
		return null
	}

    functions.runAnalysis = function () {
        let this_data = INDEX.getData()
        let load_gen = functions.generateLoads(this_data)
        let {wind, snow} = load_gen

        let s3d_model = TINY_HOUSE.getS3DModel()
        let {nodes} = s3d_model

        
        // APPLY SNOW_LOAD


    }


	return functions;

})();