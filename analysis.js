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
                    let {surface, dirn, pos_Cpi, neg_Cpi} = wind_load_arr[f]

                    if (surface == "roof_windward" && dirn == "along_L") {
                        dump_obj.roof_windward.pos = pos_Cpi/1000;
                        dump_obj.roof_windward.neg = neg_Cpi/1000;
                    } else if (surface == "roof_leeward" && dirn == "along_L") {
                        dump_obj.roof_leeward.pos = pos_Cpi/1000;
                        dump_obj.roof_leeward.neg = neg_Cpi/1000;
                    } else if (surface == "windward_wall" && dirn == "along_L") {
                        dump_obj.windward_wall.pos = pos_Cpi/1000;
                        dump_obj.windward_wall.neg = neg_Cpi/1000;
                    } else if (surface == "leeward_wall" && dirn == "along_L") {
                        dump_obj.leeward_wall.pos = pos_Cpi/1000;
                        dump_obj.leeward_wall.neg = neg_Cpi/1000;
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

    var getNodeIDsOfSurfaces = function (data) {
        // 0 DEGREES

        let buildingLength =  data["input_length"]
		let buildingWidth = data["input_width"]
		let eaveHeight = data["input_height"]
		let roofApex = data["input_truss_height"]
		let roofOverhang = data["input_truss_offset"]
		let trussSpacing = data["input_truss_panel_spacing"]

        let node1_windward_wall = getNodeIDFromModel(0,0,0,nodes)
        let node2_windward_wall = getNodeIDFromModel(0,eaveHeight,0,nodes)
        let node3_windward_wall = getNodeIDFromModel(buildingWidth,eaveHeight,0,nodes)
        let node4_windward_wall = getNodeIDFromModel(buildingWidth,0,0,nodes)

        let node1_leeward_wall = getNodeIDFromModel(buildingWidth,0,-buildingLength,nodes)
        let node2_leeward_wall = getNodeIDFromModel(buildingWidth,eaveHeight,-buildingLength,nodes)
        let node3_leeward_wall = getNodeIDFromModel(0,eaveHeight,-buildingLength,nodes)
        let node4_leeward_wall = getNodeIDFromModel(0,0,-buildingLength,nodes)


        let node1_roof_windward = getNodeIDFromModel(0,eaveHeight,0,nodes)
        let node2_roof_windward = getNodeIDFromModel(0,roofApex,-buildingLength*0.5,nodes)
        let node3_roof_windward = getNodeIDFromModel(buildingWidth,roofApex,-buildingLength*0.5,nodes)
        let node4_roof_windward = getNodeIDFromModel(buildingWidth,eaveHeight,0,nodes)

        let node1_roof_leeward = getNodeIDFromModel(buildingWidth,eaveHeight,-buildingLength,nodes)
        let node2_roof_leeward = getNodeIDFromModel(buildingWidth,roofApex,-buildingLength*0.5,nodes)
        let node3_roof_leeward = getNodeIDFromModel(0,roofApex,-buildingLength*0.5,nodes)
        let node4_roof_leeward = getNodeIDFromModel(0,eaveHeight,-buildingLength,nodes)

        let obj = {
            'windward_wall': `${node1_windward_wall},${node2_windward_wall},${node3_windward_wall},${node4_windward_wall}`,
            'leeward_wall': `${node1_leeward_wall},${node2_leeward_wall},${node3_leeward_wall},${node4_leeward_wall}`,
            'roof_windward': `${node1_roof_windward},${node2_roof_windward},${node3_roof_windward},${node4_roof_windward}`,
            'roof_leeward': `${node1_roof_leeward},${node2_roof_leeward},${node3_roof_leeward},${node4_roof_leeward}`
        }
        
        return obj
    }

    var getNodeDirections = function (data) {

        let buildingLength =  data["input_length"]
		let buildingWidth = data["input_width"]
		let eaveHeight = data["input_height"]
		let roofApex = data["input_truss_height"]
		let roofOverhang = data["input_truss_offset"]
		let trussSpacing = data["input_truss_panel_spacing"]

        let node1_windward_wall = getNodeIDFromModel(0,0,0,nodes)
        let node2_windward_wall = getNodeIDFromModel(0,eaveHeight,0,nodes)
        let node3_windward_wall = getNodeIDFromModel(buildingWidth,eaveHeight,0,nodes)
        let node4_windward_wall = getNodeIDFromModel(buildingWidth,0,0,nodes)

        let node1_leeward_wall = getNodeIDFromModel(buildingWidth,0,-buildingLength,nodes)
        let node2_leeward_wall = getNodeIDFromModel(buildingWidth,eaveHeight,-buildingLength,nodes)
        let node3_leeward_wall = getNodeIDFromModel(0,eaveHeight,-buildingLength,nodes)
        let node4_leeward_wall = getNodeIDFromModel(0,0,-buildingLength,nodes)


        let node1_roof_windward = getNodeIDFromModel(0,eaveHeight,0,nodes)
        let node2_roof_windward = getNodeIDFromModel(0,roofApex,-buildingLength*0.5,nodes)
        let node3_roof_windward = getNodeIDFromModel(buildingWidth,roofApex,-buildingLength*0.5,nodes)
        let node4_roof_windward = getNodeIDFromModel(buildingWidth,eaveHeight,0,nodes)

        let node1_roof_leeward = getNodeIDFromModel(buildingWidth,eaveHeight,-buildingLength,nodes)
        let node2_roof_leeward = getNodeIDFromModel(buildingWidth,roofApex,-buildingLength*0.5,nodes)
        let node3_roof_leeward = getNodeIDFromModel(0,roofApex,-buildingLength*0.5,nodes)
        let node4_roof_leeward = getNodeIDFromModel(0,eaveHeight,-buildingLength,nodes)

        let obj = {
            'windward_wall': `${node1_windward_wall},${node2_windward_wall}`,
            'leeward_wall': `${node1_leeward_wall},${node2_leeward_wall}`,
            'roof_windward': `${node1_roof_windward},${node2_roof_windward}`,
            'roof_leeward': `${node1_roof_leeward},${node2_roof_leeward}`
        }
        
        return obj
    }

    functions.runAnalysis = function (data) {
        let this_data = INDEX.getData()
        let load_gen = functions.generateLoads(this_data)
        let {wind, snow} = load_gen

        let s3d_model = TINY_HOUSE.getS3DModel()

        // USE Kpa
        s3d_model.settings.units.pressure = "pa"

        let {nodes, area_loads} = s3d_model


        let buildingLength =  data["input_length"]
		let buildingWidth = data["input_width"]
		let eaveHeight = data["input_height"]
		let roofApex = data["input_truss_height"]
		let roofOverhang = data["input_truss_offset"]
		let trussSpacing = data["input_truss_panel_spacing"]

        let surface_nodes = getNodeIDsOfSurfaces(data)
        let node_directions = getNodeDirections(data)

        let load_id = 1
        for (let surface in wind) {

            let {pos,neg} = wind[surface]
            let load_id_pos = String(load_id)
            load_id++

            let load_id_neg = String(load_id)
            load_id++

            let elevation = null
            

            let surface_180 = surface
            if (surface == 'windward_wall') {
                elevation = `0,${eaveHeight}`
                surface_180 = 'leeward_wall'
            } else if (surface == 'leeward_wall') {
                elevation = `0,${eaveHeight}`
                surface_180 = 'windward_wall'
            } else if (surface == 'roof_windward') {
                elevation = `0,100`
                surface_180 = 'roof_leeward'
            } else if (surface == 'roof_leeward') {
                elevation = `0,100`
                surface_180 = 'roof_windward'
            }

            area_loads[load_id_pos] = {
                "type": "column_wind_load",
                "nodes": surface_nodes[surface],
                "members": 0,
                "mag": 0,
                "direction": "Y",
                "elevations": elevation,
                "mags": neg,
                "column_direction": node_directions[surface],
                "loaded_members_axis": "all",
                "LG": "Wind_Case1"
            }

            area_loads[load_id_neg] = {
                "type": "column_wind_load",
                "nodes": surface_nodes[surface],
                "members": 0,
                "mag": 0,
                "direction": "Y",
                "elevations": elevation,
                "mags": pos,
                "column_direction": node_directions[surface],
                "loaded_members_axis": "all",
                "LG": "Wind_Case2"
            }


            let load_id_pos_alongB = String(load_id)
            load_id++

            let load_id_neg_alongB = String(load_id)
            load_id++

            area_loads[load_id_pos_alongB] = {
                "type": "column_wind_load",
                "nodes": surface_nodes[surface_180],
                "members": 0,
                "mag": 0,
                "direction": "Y",
                "elevations": elevation,
                "mags": neg,
                "column_direction": node_directions[surface_180],
                "loaded_members_axis": "all",
                "LG": "Wind_Case3"
            }

            area_loads[load_id_neg_alongB] = {
                "type": "column_wind_load",
                "nodes": surface_nodes[surface_180],
                "members": 0,
                "mag": 0,
                "direction": "Y",
                "elevations": elevation,
                "mags": pos,
                "column_direction": node_directions[surface_180],
                "loaded_members_axis": "all",
                "LG": "Wind_Case4"
            }

        }
        

        
        // APPLY SNOW LOAD

        let roof_windward_nodes = surface_nodes['roof_windward']
        roof_windward_nodes = roof_windward_nodes.split(',')

        let roof_leeward_nodes = surface_nodes['roof_leeward']
        roof_leeward_nodes = roof_leeward_nodes.split(',')

        let load_id_snow = String(load_id)
        load_id++

        area_loads[load_id_snow] = {
            "type": "two_way",
            "nodes": roof_windward_nodes,
            "members": null,
            "mag": snow,
            "direction": "X",
            "elevations": null,
            "mags": null,
            "column_direction": null,
            "loaded_members_axis": null,
            "LG": "LG"
        }
        
        load_id_snow = String(load_id)
        load_id++

        area_loads[load_id_snow] = {
            "type": "two_way",
            "nodes": roof_leeward_nodes,
            "members": null,
            "mag": snow,
            "direction": "X",
            "elevations": null,
            "mags": null,
            "column_direction": null,
            "loaded_members_axis": null,
            "LG": "LG"
        }

       
        
        s3d_model['area_loads'] = area_loads
        


    }


	return functions;

})();