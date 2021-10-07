TINY_HOUSE.analysis = (function () {

    var functions = {}
	var wind_pressure = null
    var snow_pressure = null

    functions.generateLoads = function (data) {

        let { input_height, input_width, input_length, input_truss_height } = data
        let roof_mean_height = (input_truss_height+input_height)*0.5
        let roof_angle = Math.atan((input_truss_height-input_height)/(input_length/2))*(180/Math.PI)
        
        let address = data["input-site-address"]
        let exposure_category = data["input-exposure-category"]
        let risk_category = data["input-risk-category"]

        // TODO - INTEGRATE TO data
        var liveload = 0.6*20.88543423315
        let member_design_code = "AISI_S100-12_LRFD" //NDC
        let wall_section = ["American", "AISI", "C-Sections W Lips (I-1)", "4CS2.5x059"]
        let truss_section = ["American", "AISI", "C-Sections W Lips (I-1)", "4CS2.5x059"]
        let purlin_section = ["American", "AISI", "Z-Sections W Lips (I-4)", "3.5ZS1.5x059"]
        
        // input-risk-category
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
                            "units": "imperial"
                        },
                        "site_data": {
                            "design_code": "asce7-16",
                            "project_address": address,
                            "topography": {
                                "wind_direction": "N",
                                "topo_image": false,
                                "country": "United States",
                                "exposure": exposure_category
                            },
                            "risk_category": risk_category
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
                    let {surface, dirn, pos_GCpi, neg_GCpi} = wind_load_arr[f]

                    if (surface == "roof_windward" && dirn == "along_L") {
                        dump_obj.roof_windward.pos = pos_GCpi;
                        dump_obj.roof_windward.neg = neg_GCpi;
                    } else if (surface == "roof_leeward" && dirn == "along_L") {
                        dump_obj.roof_leeward.pos = pos_GCpi;
                        dump_obj.roof_leeward.neg = neg_GCpi;
                    } else if (surface == "windward_wall" && dirn == "along_L") {
                        dump_obj.windward_wall.pos = pos_GCpi;
                        dump_obj.windward_wall.neg = neg_GCpi;
                    } else if (surface == "leeward_wall" && dirn == "along_L") {
                        dump_obj.leeward_wall.pos = pos_GCpi;
                        dump_obj.leeward_wall.neg = neg_GCpi;
                    }
                }

                snow_pressure = snow_load
                wind_result = dump_obj

                // ASSIGN LOADS
                let processed_model = functions.setupLoads(wind_result, snow_pressure, liveload)

                // ASSIGN SUPPORTS
                let supports = assignSupports(data, processed_model.nodes)
                processed_model.supports = supports

                processed_model.sections =  {
                    "1": {
                        "load_section": wall_section,
                        "material_id": 1
                    },
                    "2": {
                        "load_section": truss_section,
                        "material_id": 1
                    },
                    "3": {
                        "load_section": purlin_section,
                        "material_id": 1
                    }
                }

                let s3d_api = {
                    "auth": {
                        "username": "patrick@skyciv.com",
                        "key": "LVBZgXsQgMcqykLB8EfYaIeHqdyaitYKqkXNZuGKH0RLAYIrvtCTdP8rzmLtCq2H"
                    },
                    "functions": [
                        {
                            "function": "S3D.session.start",
                            "arguments": {}
                        },
                        {
                            "function": "S3D.model.set",
                            "arguments": {
                                "s3d_model": processed_model
                            }
                        },
                        
                        {
                            "function": "S3D.model.solve",
                            "arguments": {
                                "analysis_type": "nonlinear",
                                "repair_model": true,
                                "return_results": false
                            }
                        },
                        {
                            "function": "S3D.member_design.check",
                            "arguments": {
                                "design_code": member_design_code
                            }
                        },
                        // {
                        //     "function": "S3D.member_design.optimize",
                        //     "arguments": {
                        //         "design_code": member_design_code,
                        //         "simplified": true,
                        //         "settings": {
                        //             "max_ur": 0.8,
                        //             "optimize_by": {
                        //                 "item": "sections",
                        //                 "ids": null
                        //             },
                        //             "section_height": {
                        //                 "min": 6,
                        //                 "max": 12
                        //             },
                        //             "section_width": {
                        //                 "min": null,
                        //                 "max": null
                        //             }
                        //         }
                        //     }
                        // }
                    ]
                }


                skyciv.request(s3d_api, function (res) {
                    
                    if (res.response.status == 0) {
                        debugger
                    } else {

                    }

                })
                
            } else {

            }
            
        })
    
    }


    functions.testRun = function () {
        let this_data = INDEX.getData()
        functions.generateLoads(this_data)
    }

    var getNodeIDFromModel = function(xval, yval, zval, nodes) {

        for (let nodeid in nodes) {
            let this_node_val = nodes[nodeid]
			if (this_node_val == null) continue
            let {x,y,z} = this_node_val
            if (xval == x && yval == y && zval == z) return nodeid
        }

		return null
	}

    var getNodeIDsOfSurfaces = function (data, nodes) {
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

    var getNodeDirections = function (data, nodes) {

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

    var assignSupports = function (data, nodes) {

        let support_node_ids = []

        for (let id in nodes) {
            if (nodes[id] == null) continue
            let {x,y,z} = nodes[id]
            if (y == 0) support_node_ids.push(id)
        }

        let support_obj = {}

        let ctr = 1

        support_node_ids.map(nodeid => {

            let this_support_id = String(ctr)

            support_obj[this_support_id] = {
                "direction_code": "BBBBBB",
                "tx": 0,
                "ty": 0,
                "tz": 0,
                "rx": 0,
                "ry": 0,
                "rz": 0,
                "node": nodeid,
                "restraint_code": "FFFFRR"
            }

            ctr++
        })

        
        return support_obj
    }

    functions.setupLoads = function (wind, snow, live) {

        let data = INDEX.getData()

        let s3d_model = TINY_HOUSE.getS3DModel()

        // USE psf
        s3d_model.settings.units = {
            "length": "ft",
            "section_length": "in",
            "material_strength": "ksi",
            "density": "lb/ft3",
            "force": "kip",
            "moment": "kip-ft",
            "pressure": "psf",
            "mass": "kip",
            "translation": "in",
            "stress": "ksi"
        }

        let {nodes, area_loads} = s3d_model


        let buildingLength =  data["input_length"]
		let buildingWidth = data["input_width"]
		let eaveHeight = data["input_height"]
		let roofApex = data["input_truss_height"]
		let roofOverhang = data["input_truss_offset"]
		let trussSpacing = data["input_truss_panel_spacing"]

        let surface_nodes = getNodeIDsOfSurfaces(data, nodes)
        let node_directions = getNodeDirections(data, nodes)

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

        // Convert snow load in psf to Kpa
        // snow = 0.047880258888889*snow

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
            "LG": "Snow"
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
            "LG": "Snow"
        }

        // LIVE LOAD
        let load_id_live = String(load_id)
        load_id++

        area_loads[load_id_live] = {
            "type": "two_way",
            "nodes": roof_windward_nodes,
            "members": null,
            "mag": live,
            "direction": "X",
            "elevations": null,
            "mags": null,
            "column_direction": null,
            "loaded_members_axis": null,
            "LG": "Live"
        }

        load_id_live = String(load_id)
        load_id++

        area_loads[load_id_live] = {
            "type": "two_way",
            "nodes": roof_leeward_nodes,
            "members": null,
            "mag": live,
            "direction": "X",
            "elevations": null,
            "mags": null,
            "column_direction": null,
            "loaded_members_axis": null,
            "LG": "Live"
        }


        s3d_model['area_loads'] = area_loads
        s3d_model.self_weight = {
            "enabled": true,
            "x": 0,
            "y": -1,
            "z": 0
        }

        s3d_model.load_combinations = {
            "1": {
              "name": "1.4D",
              "SW1": 1.4,
              "Live": 0,
              "Wind_Case1": 0,
              "Wind_Case2": 0,
              "Wind_Case3": 0,
              "Wind_Case4": 0,
              "Snow": 0
            },
            "2": {
              "name": "1.2D + 0.5Lr",
              "SW1": 1.2,
              "Live": 0.5,
              "Wind_Case1": 0,
              "Wind_Case2": 0,
              "Wind_Case3": 0,
              "Wind_Case4": 0,
              "Snow": 0
            },
            "3": {
                "name": "1.2D + 0.5S",
                "SW1": 1.2,
                "Live": 0,
                "Wind_Case1": 0,
                "Wind_Case2": 0,
                "Wind_Case3": 0,
                "Wind_Case4": 0,
                "Snow": 0.5
            },
            "4": {
                "name": "1.2D + 1.6W1",
                "SW1": 1.2,
                "Live": 0,
                "Wind_Case1": 1.6,
                "Wind_Case2": 0,
                "Wind_Case3": 0,
                "Wind_Case4": 0,
                "Snow": 0
            },
            "5": {
                "name": "1.2D + 1.6W2",
                "SW1": 1.2,
                "Live": 0,
                "Wind_Case1": 0,
                "Wind_Case2": 1.6,
                "Wind_Case3": 0,
                "Wind_Case4": 0,
                "Snow": 0
            },
            "6": {
                "name": "1.2D + 1.6W3",
                "SW1": 1.2,
                "Live": 0,
                "Wind_Case1": 0,
                "Wind_Case2": 0,
                "Wind_Case3": 1.6,
                "Wind_Case4": 0,
                "Snow": 0
            },
            "7": {
                "name": "1.2D + 1.6W4",
                "SW1": 1.2,
                "Live": 0,
                "Wind_Case1": 0,
                "Wind_Case2": 0,
                "Wind_Case3": 0,
                "Wind_Case4": 1.6,
                "Snow": 0
            }
        }

        console.log(JSON.stringify(s3d_model))

        return s3d_model

    
    }


	return functions;

})();