TINY_HOUSE.analysis = (function () {

    var functions = {}
	

    functions.generateLoads = function () {

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
                                        "floor_elevation": "3.5"
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
                            "roof_profile": "monoslope",
                            "building_dimensions": {
                                "length": 3,
                                "width": "3",
                                "roof_angle": "12",
                                "mean_roof_height": "3.5"
                            }
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
                var message = `<center><div>An error occured in Wind API</div></center>`;
            }
            
            jQuery('#generate-model-cases-btn').removeClass('loading');
            SKYCIV_UTILS.alert(message)	
            
        })
    
    }



	return functions;

})();