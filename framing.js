TINY_HOUSE.framing = (function () {

    var functions = {}

    var wall_assembly = []

    functions.generateWallFramingS3DModel = function (buildingLength, buildingWidth, eaveHeight) {

        let truss_panel_spacing = 0.6
        let door_height = 2.1
        let truss_height = 0.5
        let door_width = 0.9
        let door_truss_height = 0.3
        let window_width = 1.5
        let window_height = 0.9
        let vertical_truss_width = 0.3

        let num_panel_truss_front = Math.ceil(buildingWidth/truss_panel_spacing)
        let num_panel_truss_side = Math.ceil(buildingLength/truss_panel_spacing)
        
        let vertical_web_length = Math.sqrt(vertical_truss_width*vertical_truss_width + ((eaveHeight-truss_height)/3)*((eaveHeight-truss_height)/3))
        let num_panel_truss_front_vertical = Math.ceil(eaveHeight/1)

        let col_to_door_jamb_dist_front = (buildingWidth*0.5-door_width*0.5) - vertical_truss_width
        let num_vertical_studs_front = Math.ceil(col_to_door_jamb_dist_front/1)

        let col_to_wind_jamb_dist_back = (buildingWidth*0.5-window_width*0.5) - vertical_truss_width
        let num_vertical_studs_back = Math.ceil(col_to_wind_jamb_dist_back/1)
        
        let col_to_wind_jamb_dist_side = (buildingLength*0.5-window_width*0.5) - vertical_truss_width
        let num_vertical_studs_side = Math.ceil(col_to_wind_jamb_dist_side/1)

        // FRONT PANEL
        let front_panel = [
            // TOP BEAM

            {
                "cad_type": 'cad_truss',
                "type": '2D',
                "ref_pt": [0, "~~building_height - truss_height~~", 0],
                "length": ['x', "~~building_width~~"],
                "height": ['y', "~~truss_height~~"],
                "offset": 0, // or [30,30],
                "style": 'cross',
                "web_section_id": 1,
                "chord_section_id": 2,
                "segments": "~~front_number_of_panels~~",
            },
            
            // {
            //     cad_type: 'cad_truss',
            //     type: 'nodes',
            //     start_pts: [
            //         [0, "~~building_height - truss_height~~", 0], // or {x: 1, y: 2, z: 1} or {cad_id : "2_1", cad_perc: 33},
            //         [0, "~~building_height~~", 0], // or {x: 1, y: 2, z: 1} or {cad_id : "2_1", cad_perc: 33},
            //     ],
            //     end_pts: [
            //         ["~~building_width~~", "~~building_height - truss_height~~", 0], // or {x: 1, y: 2, z: 1} or {cad_id : "2_1", cad_perc: 33},
            //         ["~~building_width~~", "~~building_height~~", 0], // or {x: 1, y: 2, z: 1} or {cad_id : "2_1", cad_perc: 33},
            //     ],
            //     bays: "~~front_number_of_panels~~",
            //     web_section_id: 1,
            //     chord_section_id: 2,
            //     style: 'cross',
            // },


            // SIDE COLUMN 1
            {
                "cad_type": 'cad_line',
                "type": 'vector',
                "ref_pt": [0,0,0], // or {x : 1, y: 1, z: 1} or {cad_id : "2_1", cad_perc: 33},
                "vector": [0, 1, 0], // or {x : 0, y: 1, z: 0},
                "segments": 1,
                "length": "~~building_height~~",
                "section_id": 1,
            },
            {
                "cad_type": 'cad_line',
                "type": 'vector',
                "ref_pt": ["~~vertical_truss_width~~",0,0], // or {x : 1, y: 1, z: 1} or {cad_id : "2_1", cad_perc: 33},
                "vector": [0, 1, 0], // or {x : 0, y: 1, z: 0},
                "segments": 1,
                "length": "~~building_height - truss_height~~",
                "section_id": 1,
            },
            {
                "cad_type": 'cad_line',
                "type": 'vector',
                "ref_pt": [0,"~~(building_height - truss_height)/3~~",0], // or {x : 1, y: 1, z: 1} or {cad_id : "2_1", cad_perc: 33},
                "vector": [1, 0, 0], // or {x : 0, y: 1, z: 0},
                "segments": 1,
                "length": "~~vertical_truss_width~~",
                "section_id": 1,
            },
            {
                "cad_type": 'cad_line',
                "type": 'vector',
                "ref_pt": [0,"~~2*((building_height - truss_height)/3)~~",0], // or {x : 1, y: 1, z: 1} or {cad_id : "2_1", cad_perc: 33},
                "vector": [1, 0, 0], // or {x : 0, y: 1, z: 0},
                "segments": 1,
                "length": "~~vertical_truss_width~~",
                "section_id": 1,
            },
            {
                "cad_type": 'cad_line',
                "type": 'vector',
                "ref_pt": ["~~vertical_truss_width~~",0,0], // or {x : 1, y: 1, z: 1} or {cad_id : "2_1", cad_perc: 33},
                "vector": ["~~-vertical_truss_width/vertical_web_length~~","~~((building_height - truss_height)/3)/vertical_web_length~~",0], // or {x : 0, y: 1, z: 0},
                "segments": 1,
                "length": "~~vertical_web_length~~",
                "section_id": 1,
            },
            {
                "cad_type": 'cad_line',
                "type": 'vector',
                "ref_pt": ["~~vertical_truss_width~~","~~((building_height - truss_height)/3)~~",0],
                "vector": ["~~-vertical_truss_width/vertical_web_length~~","~~((building_height - truss_height)/3)/vertical_web_length~~",0], // or {x : 0, y: 1, z: 0},
                "segments": 1,
                "length": "~~vertical_web_length~~",
                "section_id": 1,
            },
            {
                "cad_type": 'cad_line',
                "type": 'vector',
                "ref_pt": ["~~vertical_truss_width~~","~~2*((building_height - truss_height)/3)~~",0], // or {x : 1, y: 1, z: 1} or {cad_id : "2_1", cad_perc: 33},
                "vector": ["~~-vertical_truss_width/vertical_web_length~~","~~((building_height - truss_height)/3)/vertical_web_length~~",0], // or {x : 0, y: 1, z: 0},
                "segments": 1,
                "length": "~~vertical_web_length~~",
                "section_id": 1,
            },


            // SIDE COLUMN 2
            {
                "cad_type": 'cad_line',
                "type": 'vector',
                "ref_pt": ["~~building_width~~",0,0], // or {x : 1, y: 1, z: 1} or {cad_id : "2_1", cad_perc: 33},
                "vector": [0, 1, 0], // or {x : 0, y: 1, z: 0},
                "segments": 1,
                "length": "~~building_height~~",
                "section_id": 1,
            },
            {
                "cad_type": 'cad_line',
                "type": 'vector',
                "ref_pt": ["~~building_width-vertical_truss_width~~",0,0], // or {x : 1, y: 1, z: 1} or {cad_id : "2_1", cad_perc: 33},
                "vector": [0, 1, 0], // or {x : 0, y: 1, z: 0},
                "segments": 1,
                "length": "~~building_height - truss_height~~",
                "section_id": 1,
            },
            {
                "cad_type": 'cad_line',
                "type": 'vector',
                "ref_pt": ["~~building_width-vertical_truss_width~~","~~(building_height - truss_height)/3~~",0], // or {x : 1, y: 1, z: 1} or {cad_id : "2_1", cad_perc: 33},
                "vector": [1, 0, 0], // or {x : 0, y: 1, z: 0},
                "segments": 1,
                "length": "~~vertical_truss_width~~",
                "section_id": 1,
            },
            {
                "cad_type": 'cad_line',
                "type": 'vector',
                "ref_pt": ["~~building_width-vertical_truss_width~~","~~2*((building_height - truss_height)/3)~~",0], // or {x : 1, y: 1, z: 1} or {cad_id : "2_1", cad_perc: 33},
                "vector": [1, 0, 0], // or {x : 0, y: 1, z: 0},
                "segments": 1,
                "length": "~~vertical_truss_width~~",
                "section_id": 1,
            },
            {
                "cad_type": 'cad_line',
                "type": 'vector',
                "ref_pt": ["~~building_width-vertical_truss_width~~",0,0], // or {x : 1, y: 1, z: 1} or {cad_id : "2_1", cad_perc: 33},
                "vector": ["~~vertical_truss_width/vertical_web_length~~","~~((building_height - truss_height)/3)/vertical_web_length~~",0], // or {x : 0, y: 1, z: 0},
                "segments": 1,
                "length": "~~vertical_web_length~~",
                "section_id": 1,
            },
            {
                "cad_type": 'cad_line',
                "type": 'vector',
                "ref_pt": ["~~building_width-vertical_truss_width~~","~~((building_height - truss_height)/3)~~",0],
                "vector": ["~~vertical_truss_width/vertical_web_length~~","~~((building_height - truss_height)/3)/vertical_web_length~~",0], // or {x : 0, y: 1, z: 0},
                "segments": 1,
                "length": "~~vertical_web_length~~",
                "section_id": 1,
            },
            {
                "cad_type": 'cad_line',
                "type": 'vector',
                "ref_pt": ["~~building_width-vertical_truss_width~~","~~2*((building_height - truss_height)/3)~~",0], // or {x : 1, y: 1, z: 1} or {cad_id : "2_1", cad_perc: 33},
                "vector": ["~~vertical_truss_width/vertical_web_length~~","~~((building_height - truss_height)/3)/vertical_web_length~~",0], // or {x : 0, y: 1, z: 0},
                "segments": 1,
                "length": "~~vertical_web_length~~",
                "section_id": 1,
            },

            // DOOR JAMB
            {
                "cad_type": 'cad_line',
                "type": 'vector',
                "ref_pt": ["~~building_width*0.5 - door_width*0.5~~",0,0], // or {x : 1, y: 1, z: 1} or {cad_id : "2_1", cad_perc: 33},
                "vector": [0, 1, 0], // or {x : 0, y: 1, z: 0},
                "segments": 1,
                "length": "~~building_height - truss_height~~",
                "section_id": 1,
            },
            {
                "cad_type": 'cad_line',
                "type": 'vector',
                "ref_pt": ["~~building_width*0.5 + door_width*0.5~~",0,0], // or {x : 1, y: 1, z: 1} or {cad_id : "2_1", cad_perc: 33},
                "vector": [0, 1, 0], // or {x : 0, y: 1, z: 0},
                "segments": 1,
                "length": "~~building_height - truss_height~~",
                "section_id": 1,
            },

            // HORIZONTAL STUDS
            {
                "cad_type": 'cad_line',
                "type": 'vector',
                "ref_pt": ["~~vertical_truss_width~~","~~((building_height - truss_height)/2)~~",0], // or {x : 1, y: 1, z: 1} or {cad_id : "2_1", cad_perc: 33},
                "vector": [1,0,0], // or {x : 0, y: 1, z: 0},
                "segments": 1,
                "length": "~~building_width*0.5-door_width*0.5 - vertical_truss_width~~",
                "section_id": 1,
            },
            {
                "cad_type": 'cad_line',
                "type": 'vector',
                "ref_pt": ["~~building_width*0.5+door_width*0.5~~","~~((building_height - truss_height)/2)~~",0], // or {x : 1, y: 1, z: 1} or {cad_id : "2_1", cad_perc: 33},
                "vector": [1,0,0], // or {x : 0, y: 1, z: 0},
                "segments": 1,
                "length": "~~(building_width-vertical_truss_width) -(building_width*0.5+door_width*0.5)~~",
                "section_id": 1,
            },

            // BOTTOM BEAM
            {
                "cad_type": 'cad_line',
                "type": 'vector',
                "ref_pt": [0,0,0], // or {x : 1, y: 1, z: 1} or {cad_id : "2_1", cad_perc: 33},
                "vector": [1, 0, 0], // or {x : 0, y: 1, z: 0},
                "segments": 1,
                "length": "~~building_width~~",
                "section_id": 1,
            }
        ]

        if ((eaveHeight - truss_height) > (door_height + door_truss_height)) {
            front_panel.push( 
                // door truss
                {
                    "cad_type": 'cad_truss',
                    "type": '2D',
                    "ref_pt": ["~~(building_width*0.5-door_width*0.5)~~","~~door_height~~",0],
                    "length": ['x', "~~door_width~~"],
                    "height": ['y', "~~door_truss_height~~"],
                    "offset": 0, // or [30,30],
                    "style": 'warren',
                    "web_section_id": 1,
                    "chord_section_id": 2,
                    "segments": 3,
                }
            )
        }

        if (num_vertical_studs_front > 1) {
            let vert_stud_space = col_to_door_jamb_dist_front/num_vertical_studs_front

            for (let n = 1; n < num_vertical_studs_front; n++) {

                let this_x_1 = vertical_truss_width+(n*vert_stud_space)
                let this_x_2 = (buildingWidth*0.5+door_width*0.5)+(n*vert_stud_space)
                

                front_panel.push({
                    "cad_type": 'cad_line',
                    "type": 'vector',
                    "ref_pt": [this_x_1,0,0], // or {x : 1, y: 1, z: 1} or {cad_id : "2_1", cad_perc: 33},
                    "vector": [0, 1, 0], // or {x : 0, y: 1, z: 0},
                    "segments": 1,
                    "length": "~~building_height - truss_height~~",
                    "section_id": 1,
                })
                
                front_panel.push({
                    "cad_type": 'cad_line',
                    "type": 'vector',
                    "ref_pt": [this_x_2,0,0], // or {x : 1, y: 1, z: 1} or {cad_id : "2_1", cad_perc: 33},
                    "vector": [0, 1, 0], // or {x : 0, y: 1, z: 0},
                    "segments": 1,
                    "length": "~~building_height - truss_height~~",
                    "section_id": 1,
                })
                
            }

        }



        // BACK PANEL - WITH WINDOW
        let back_panel = [
            // TOP BEAM
            {
                "cad_type": 'cad_truss',
                "type": '2D',
                "ref_pt": [0, "~~building_height - truss_height~~", "~~-building_length~~"],
                "length": ['x', "~~building_width~~"],
                "height": ['y', "~~truss_height~~"],
                "offset": 0, // or [30,30],
                "style": 'cross',
                "web_section_id": 1,
                "chord_section_id": 2,
                "segments": "~~front_number_of_panels~~",
            },

            // SIDE COLUMN 1
            {
                "cad_type": 'cad_line',
                "type": 'vector',
                "ref_pt": [0,0,"~~-building_length~~"], // or {x : 1, y: 1, z: 1} or {cad_id : "2_1", cad_perc: 33},
                "vector": [0, 1, 0], // or {x : 0, y: 1, z: 0},
                "segments": 1,
                "length": "~~building_height~~",
                "section_id": 1,
            },
            {
                "cad_type": 'cad_line',
                "type": 'vector',
                "ref_pt": ["~~vertical_truss_width~~",0,"~~-building_length~~"], // or {x : 1, y: 1, z: 1} or {cad_id : "2_1", cad_perc: 33},
                "vector": [0, 1, 0], // or {x : 0, y: 1, z: 0},
                "segments": 1,
                "length": "~~building_height - truss_height~~",
                "section_id": 1,
            },
            {
                "cad_type": 'cad_line',
                "type": 'vector',
                "ref_pt": [0,"~~(building_height - truss_height)/3~~","~~-building_length~~"], // or {x : 1, y: 1, z: 1} or {cad_id : "2_1", cad_perc: 33},
                "vector": [1, 0, 0], // or {x : 0, y: 1, z: 0},
                "segments": 1,
                "length": "~~vertical_truss_width~~",
                "section_id": 1,
            },
            {
                "cad_type": 'cad_line',
                "type": 'vector',
                "ref_pt": [0,"~~2*((building_height - truss_height)/3)~~","~~-building_length~~"], // or {x : 1, y: 1, z: 1} or {cad_id : "2_1", cad_perc: 33},
                "vector": [1, 0, 0], // or {x : 0, y: 1, z: 0},
                "segments": 1,
                "length": "~~vertical_truss_width~~",
                "section_id": 1,
            },
            {
                "cad_type": 'cad_line',
                "type": 'vector',
                "ref_pt": ["~~vertical_truss_width~~",0,"~~-building_length~~"], // or {x : 1, y: 1, z: 1} or {cad_id : "2_1", cad_perc: 33},
                "vector": ["~~-vertical_truss_width/vertical_web_length~~","~~((building_height - truss_height)/3)/vertical_web_length~~",0], // or {x : 0, y: 1, z: 0},
                "segments": 1,
                "length": "~~vertical_web_length~~",
                "section_id": 1,
            },
            {
                "cad_type": 'cad_line',
                "type": 'vector',
                "ref_pt": ["~~vertical_truss_width~~","~~((building_height - truss_height)/3)~~","~~-building_length~~"],
                "vector": ["~~-vertical_truss_width/vertical_web_length~~","~~((building_height - truss_height)/3)/vertical_web_length~~",0], // or {x : 0, y: 1, z: 0},
                "segments": 1,
                "length": "~~vertical_web_length~~",
                "section_id": 1,
            },
            {
                "cad_type": 'cad_line',
                "type": 'vector',
                "ref_pt": ["~~vertical_truss_width~~","~~2*((building_height - truss_height)/3)~~","~~-building_length~~"], // or {x : 1, y: 1, z: 1} or {cad_id : "2_1", cad_perc: 33},
                "vector": ["~~-vertical_truss_width/vertical_web_length~~","~~((building_height - truss_height)/3)/vertical_web_length~~",0], // or {x : 0, y: 1, z: 0},
                "segments": 1,
                "length": "~~vertical_web_length~~",
                "section_id": 1,
            },

            // SIDE COLUMN 2
            {
                "cad_type": 'cad_line',
                "type": 'vector',
                "ref_pt": ["~~building_width~~",0,"~~-building_length~~"], // or {x : 1, y: 1, z: 1} or {cad_id : "2_1", cad_perc: 33},
                "vector": [0, 1, 0], // or {x : 0, y: 1, z: 0},
                "segments": 1,
                "length": "~~building_height~~",
                "section_id": 1,
            },
            {
                "cad_type": 'cad_line',
                "type": 'vector',
                "ref_pt": ["~~building_width-vertical_truss_width~~",0,"~~-building_length~~"], // or {x : 1, y: 1, z: 1} or {cad_id : "2_1", cad_perc: 33},
                "vector": [0, 1, 0], // or {x : 0, y: 1, z: 0},
                "segments": 1,
                "length": "~~building_height - truss_height~~",
                "section_id": 1,
            },

            {
                "cad_type": 'cad_line',
                "type": 'vector',
                "ref_pt": ["~~building_width-vertical_truss_width~~","~~(building_height - truss_height)/3~~","~~-building_length~~"], // or {x : 1, y: 1, z: 1} or {cad_id : "2_1", cad_perc: 33},
                "vector": [1, 0, 0], // or {x : 0, y: 1, z: 0},
                "segments": 1,
                "length": "~~vertical_truss_width~~",
                "section_id": 1,
            },
            {
                "cad_type": 'cad_line',
                "type": 'vector',
                "ref_pt": ["~~building_width-vertical_truss_width~~","~~2*((building_height - truss_height)/3)~~","~~-building_length~~"], // or {x : 1, y: 1, z: 1} or {cad_id : "2_1", cad_perc: 33},
                "vector": [1, 0, 0], // or {x : 0, y: 1, z: 0},
                "segments": 1,
                "length": "~~vertical_truss_width~~",
                "section_id": 1,
            },
            
            {
                "cad_type": 'cad_line',
                "type": 'vector',
                "ref_pt": ["~~building_width-vertical_truss_width~~",0,"~~-building_length~~"], // or {x : 1, y: 1, z: 1} or {cad_id : "2_1", cad_perc: 33},
                "vector": ["~~vertical_truss_width/vertical_web_length~~","~~((building_height - truss_height)/3)/vertical_web_length~~",0], // or {x : 0, y: 1, z: 0},
                "segments": 1,
                "length": "~~vertical_web_length~~",
                "section_id": 1,
            },
            {
                "cad_type": 'cad_line',
                "type": 'vector',
                "ref_pt": ["~~building_width-vertical_truss_width~~","~~((building_height - truss_height)/3)~~","~~-building_length~~"],
                "vector": ["~~vertical_truss_width/vertical_web_length~~","~~((building_height - truss_height)/3)/vertical_web_length~~",0], // or {x : 0, y: 1, z: 0},
                "segments": 1,
                "length": "~~vertical_web_length~~",
                "section_id": 1,
            },
            {
                "cad_type": 'cad_line',
                "type": 'vector',
                "ref_pt": ["~~building_width-vertical_truss_width~~","~~2*((building_height - truss_height)/3)~~","~~-building_length~~"], // or {x : 1, y: 1, z: 1} or {cad_id : "2_1", cad_perc: 33},
                "vector": ["~~vertical_truss_width/vertical_web_length~~","~~((building_height - truss_height)/3)/vertical_web_length~~",0], // or {x : 0, y: 1, z: 0},
                "segments": 1,
                "length": "~~vertical_web_length~~",
                "section_id": 1,
            },

            // WINDOW JAMB
            {
                "cad_type": 'cad_line',
                "type": 'vector',
                "ref_pt": ["~~building_width*0.5 - window_width*0.5~~",0,"~~-building_length~~"], // or {x : 1, y: 1, z: 1} or {cad_id : "2_1", cad_perc: 33},
                "vector": [0, 1, 0], // or {x : 0, y: 1, z: 0},
                "segments": 1,
                "length": "~~building_height - truss_height~~",
                "section_id": 1,
            },
            {
                "cad_type": 'cad_line',
                "type": 'vector',
                "ref_pt": ["~~building_width*0.5 + window_width*0.5~~",0,"~~-building_length~~"], // or {x : 1, y: 1, z: 1} or {cad_id : "2_1", cad_perc: 33},
                "vector": [0, 1, 0], // or {x : 0, y: 1, z: 0},
                "segments": 1,
                "length": "~~building_height - truss_height~~",
                "section_id": 1,
            },
            // WINDOW SILL
            {
                "cad_type": 'cad_line',
                "type": 'vector',
                "ref_pt": ["~~building_width*0.5 - window_width*0.5~~","~~window_height~~","~~-building_length~~"], // or {x : 1, y: 1, z: 1} or {cad_id : "2_1", cad_perc: 33},
                "vector": [1,0,0], // or {x : 0, y: 1, z: 0},
                "segments": 1,
                "length": "~~building_width*0.5+window_width*0.5 - (building_width*0.5 - window_width*0.5)~~",
                "section_id": 1,
            },
            {
                "cad_type": 'cad_line',
                "type": 'vector',
                "ref_pt": ["~~building_width*0.5~~",0,"~~-building_length~~"], // or {x : 1, y: 1, z: 1} or {cad_id : "2_1", cad_perc: 33},
                "vector": [0, 1, 0], // or {x : 0, y: 1, z: 0},
                "segments": 1,
                "length": "~~window_height~~",
                "section_id": 1,
            },

            // HORIZONTAL STUDS
            {
                "cad_type": 'cad_line',
                "type": 'vector',
                "ref_pt": ["~~vertical_truss_width~~","~~((building_height - truss_height)/2)~~","~~-building_length~~"], // or {x : 1, y: 1, z: 1} or {cad_id : "2_1", cad_perc: 33},
                "vector": [1,0,0], // or {x : 0, y: 1, z: 0},
                "segments": 1,
                "length": "~~building_width*0.5-window_width*0.5 - vertical_truss_width~~",
                "section_id": 1,
            },
            {
                "cad_type": 'cad_line',
                "type": 'vector',
                "ref_pt": ["~~building_width*0.5+window_width*0.5~~","~~((building_height - truss_height)/2)~~","~~-building_length~~"], // or {x : 1, y: 1, z: 1} or {cad_id : "2_1", cad_perc: 33},
                "vector": [1,0,0], // or {x : 0, y: 1, z: 0},
                "segments": 1,
                "length": "~~(building_width-vertical_truss_width) -(building_width*0.5+window_width*0.5)~~",
                "section_id": 1,
            },


            // BOTTOM BEAM
            {
                "cad_type": 'cad_line',
                "type": 'vector',
                "ref_pt": [0,0,"~~-building_length~~"], // or {x : 1, y: 1, z: 1} or {cad_id : "2_1", cad_perc: 33},
                "vector": [1, 0, 0], // or {x : 0, y: 1, z: 0},
                "segments": 1,
                "length": "~~building_width~~",
                "section_id": 1,
            }
        ]
       
        if (num_vertical_studs_back > 1) {
            let vert_stud_space = col_to_wind_jamb_dist_back/num_vertical_studs_back

            for (let n = 1; n < num_vertical_studs_back; n++) {

                let this_x_1 = vertical_truss_width+(n*vert_stud_space)
                let this_x_2 = (buildingWidth*0.5+window_width*0.5)+(n*vert_stud_space)
        
                back_panel.push({
                    "cad_type": 'cad_line',
                    "type": 'vector',
                    "ref_pt": [this_x_1,0,"~~-building_length~~"], // or {x : 1, y: 1, z: 1} or {cad_id : "2_1", cad_perc: 33},
                    "vector": [0, 1, 0], // or {x : 0, y: 1, z: 0},
                    "segments": 1,
                    "length": "~~building_height - truss_height~~",
                    "section_id": 1,
                })
                
                back_panel.push({
                    "cad_type": 'cad_line',
                    "type": 'vector',
                    "ref_pt": [this_x_2,0,"~~-building_length~~"], // or {x : 1, y: 1, z: 1} or {cad_id : "2_1", cad_perc: 33},
                    "vector": [0, 1, 0], // or {x : 0, y: 1, z: 0},
                    "segments": 1,
                    "length": "~~building_height - truss_height~~",
                    "section_id": 1,
                })
                
            }
        }



        let side_panel_1 = [
            // TOP BEAM

            {
                "cad_type": 'cad_truss',
                "type": '2D',
                "ref_pt": [0, "~~building_height - truss_height~~", "~~-building_length~~"],
                "length": ['z', "~~building_length~~"],
                "height": ['y', "~~truss_height~~"],
                "offset": 0, // or [30,30],
                "style": 'cross',
                "web_section_id": 1,
                "chord_section_id": 2,
                "segments": "~~side_number_of_panels~~",
            },

            // {
            //     cad_type: 'cad_truss',
            //     type: 'nodes',
            //     start_pts: [
            //         [0, "~~building_height - truss_height~~", "~~-building_length~~"], // or {x: 1, y: 2, z: 1} or {cad_id : "2_1", cad_perc: 33},
            //         [0, "~~building_height~~", "~~-building_length~~"], // or {x: 1, y: 2, z: 1} or {cad_id : "2_1", cad_perc: 33},
            //     ],
            //     end_pts: [
            //         [0, "~~building_height - truss_height~~", 0], // or {x: 1, y: 2, z: 1} or {cad_id : "2_1", cad_perc: 33},
            //         [0, "~~building_height+0.3~~", 0], // or {x: 1, y: 2, z: 1} or {cad_id : "2_1", cad_perc: 33},
            //     ],
            //     bays: "~~side_number_of_panels~~",
            //     web_section_id: 1,
            //     chord_section_id: 2,
            //     truss_style: 'gambrel',
            // },

            // SIDE COLUMN 1
            {
                "cad_type": 'cad_line',
                "type": 'vector',
                "ref_pt": [0,0,"~~-building_length~~"], // or {x : 1, y: 1, z: 1} or {cad_id : "2_1", cad_perc: 33},
                "vector": [0, 1, 0], // or {x : 0, y: 1, z: 0},
                "segments": 1,
                "length": "~~building_height~~",
                "section_id": 1,
            },
            {
                "cad_type": 'cad_line',
                "type": 'vector',
                "ref_pt": [0,0,"~~-building_length+vertical_truss_width~~"], // or {x : 1, y: 1, z: 1} or {cad_id : "2_1", cad_perc: 33},
                "vector": [0, 1, 0], // or {x : 0, y: 1, z: 0},
                "segments": 1,
                "length": "~~building_height - truss_height~~",
                "section_id": 1,
            },
            {
                "cad_type": 'cad_line',
                "type": 'vector',
                "ref_pt": [0,"~~(building_height - truss_height)/3~~","~~-building_length~~"], // or {x : 1, y: 1, z: 1} or {cad_id : "2_1", cad_perc: 33},
                "vector": [0, 0, 1], // or {x : 0, y: 1, z: 0},
                "segments": 1,
                "length": "~~vertical_truss_width~~",
                "section_id": 1,
            },
            {
                "cad_type": 'cad_line',
                "type": 'vector',
                "ref_pt": [0,"~~2*((building_height - truss_height)/3)~~","~~-building_length~~"], // or {x : 1, y: 1, z: 1} or {cad_id : "2_1", cad_perc: 33},
                "vector": [0, 0, 1], // or {x : 0, y: 1, z: 0},
                "segments": 1,
                "length": "~~vertical_truss_width~~",
                "section_id": 1,
            },
        
            {
                "cad_type": 'cad_line',
                "type": 'vector',
                "ref_pt": [0,0,"~~-building_length+ vertical_truss_width~~"], // or {x : 1, y: 1, z: 1} or {cad_id : "2_1", cad_perc: 33},
                "vector": [0,"~~((building_height - truss_height)/3)/vertical_web_length~~","~~-vertical_truss_width/vertical_web_length~~"], // or {x : 0, y: 1, z: 0},
                "segments": 1,
                "length": "~~vertical_web_length~~",
                "section_id": 1,
            },
            {
                "cad_type": 'cad_line',
                "type": 'vector',
                "ref_pt": [0,"~~((building_height - truss_height)/3)~~","~~-building_length + vertical_truss_width~~"],
                "vector": [0,"~~((building_height - truss_height)/3)/vertical_web_length~~","~~-vertical_truss_width/vertical_web_length~~"], // or {x : 0, y: 1, z: 0},
                "segments": 1,
                "length": "~~vertical_web_length~~",
                "section_id": 1,
            },
            {
                "cad_type": 'cad_line',
                "type": 'vector',
                "ref_pt": [0,"~~2*((building_height - truss_height)/3)~~","~~-building_length+vertical_truss_width~~"], // or {x : 1, y: 1, z: 1} or {cad_id : "2_1", cad_perc: 33},
                "vector": [0,"~~((building_height - truss_height)/3)/vertical_web_length~~","~~-vertical_truss_width/vertical_web_length~~"], // or {x : 0, y: 1, z: 0},
                "segments": 1,
                "length": "~~vertical_web_length~~",
                "section_id": 1,
            },
        
        
            // SIDE COLUMN 2
            {
                "cad_type": 'cad_line',
                "type": 'vector',
                "ref_pt": [0,0,0], // or {x : 1, y: 1, z: 1} or {cad_id : "2_1", cad_perc: 33},
                "vector": [0, 1, 0], // or {x : 0, y: 1, z: 0},
                "segments": 1,
                "length": "~~building_height~~",
                "section_id": 1,
            },
            {
                "cad_type": 'cad_line',
                "type": 'vector',
                "ref_pt": [0,0,"~~-vertical_truss_width~~"], // or {x : 1, y: 1, z: 1} or {cad_id : "2_1", cad_perc: 33},
                "vector": [0, 1, 0], // or {x : 0, y: 1, z: 0},
                "segments": 1,
                "length": "~~building_height - truss_height~~",
                "section_id": 1,
            },
        
            {
                "cad_type": 'cad_line',
                "type": 'vector',
                "ref_pt": [0,"~~(building_height - truss_height)/3~~","~~-vertical_truss_width~~"], // or {x : 1, y: 1, z: 1} or {cad_id : "2_1", cad_perc: 33},
                "vector": [0, 0, 1], // or {x : 0, y: 1, z: 0},
                "segments": 1,
                "length": "~~vertical_truss_width~~",
                "section_id": 1,
            },
            {
                "cad_type": 'cad_line',
                "type": 'vector',
                "ref_pt": [0,"~~2*((building_height - truss_height)/3)~~","~~-vertical_truss_width~~"], // or {x : 1, y: 1, z: 1} or {cad_id : "2_1", cad_perc: 33},
                "vector": [0, 0, 1], // or {x : 0, y: 1, z: 0},
                "segments": 1,
                "length": "~~vertical_truss_width~~",
                "section_id": 1,
            },
            
            {
                "cad_type": 'cad_line',
                "type": 'vector',
                "ref_pt": [0,0,"~~-vertical_truss_width~~"], // or {x : 1, y: 1, z: 1} or {cad_id : "2_1", cad_perc: 33},
                "vector": [0,"~~((building_height - truss_height)/3)/vertical_web_length~~","~~vertical_truss_width/vertical_web_length~~"], // or {x : 0, y: 1, z: 0},
                "segments": 1,
                "length": "~~vertical_web_length~~",
                "section_id": 1,
            },
            {
                "cad_type": 'cad_line',
                "type": 'vector',
                "ref_pt": [0,"~~((building_height - truss_height)/3)~~","~~-vertical_truss_width~~"],
                "vector": [0,"~~((building_height - truss_height)/3)/vertical_web_length~~","~~vertical_truss_width/vertical_web_length~~"], // or {x : 0, y: 1, z: 0},
                "segments": 1,
                "length": "~~vertical_web_length~~",
                "section_id": 1,
            },
            {
                "cad_type": 'cad_line',
                "type": 'vector',
                "ref_pt": [0,"~~2*((building_height - truss_height)/3)~~","~~-vertical_truss_width~~"], // or {x : 1, y: 1, z: 1} or {cad_id : "2_1", cad_perc: 33},
                "vector": [0,"~~((building_height - truss_height)/3)/vertical_web_length~~","~~vertical_truss_width/vertical_web_length~~"], // or {x : 0, y: 1, z: 0},
                "segments": 1,
                "length": "~~vertical_web_length~~",
                "section_id": 1,
            },
        
            // WINDOW JAMB
            {
                "cad_type": 'cad_line',
                "type": 'vector',
                "ref_pt": [0,0,"~~-building_length*0.5 - window_width*0.5~~"], // or {x : 1, y: 1, z: 1} or {cad_id : "2_1", cad_perc: 33},
                "vector": [0, 1, 0], // or {x : 0, y: 1, z: 0},
                "segments": 1,
                "length": "~~building_height - truss_height~~",
                "section_id": 1,
            },
            {
                "cad_type": 'cad_line',
                "type": 'vector',
                "ref_pt": [0,0,"~~-building_length*0.5 + window_width*0.5~~"], // or {x : 1, y: 1, z: 1} or {cad_id : "2_1", cad_perc: 33},
                "vector": [0, 1, 0], // or {x : 0, y: 1, z: 0},
                "segments": 1,
                "length": "~~building_height - truss_height~~",
                "section_id": 1,
            },

            // WINDOW SILL
            {
                "cad_type": 'cad_line',
                "type": 'vector',
                "ref_pt": [0,"~~window_height~~","~~-building_length*0.5-window_width*0.5~~"], // or {x : 1, y: 1, z: 1} or {cad_id : "2_1", cad_perc: 33},
                "vector": [0,0,1], // or {x : 0, y: 1, z: 0},
                "segments": 1,
                "length": "~~building_length*0.5+window_width*0.5 - (building_length*0.5 - window_width*0.5)~~",
                "section_id": 1,
            },
            {
                "cad_type": 'cad_line',
                "type": 'vector',
                "ref_pt": [0,0,"~~-building_length*0.5~~"], // or {x : 1, y: 1, z: 1} or {cad_id : "2_1", cad_perc: 33},
                "vector": [0, 1, 0], // or {x : 0, y: 1, z: 0},
                "segments": 1,
                "length": "~~window_height~~",
                "section_id": 1,
            },
        
            // HORIZONTAL STUDS
            {
                "cad_type": 'cad_line',
                "type": 'vector',
                "ref_pt": [0,"~~((building_height - truss_height)/2)~~","~~-building_length+vertical_truss_width~~"], // or {x : 1, y: 1, z: 1} or {cad_id : "2_1", cad_perc: 33},
                "vector": [0,0,1], // or {x : 0, y: 1, z: 0},
                "segments": 1,
                "length": "~~building_length*0.5-window_width*0.5 - vertical_truss_width~~",
                "section_id": 1,
            },
            {
                "cad_type": 'cad_line',
                "type": 'vector',
                "ref_pt": [0,"~~((building_height - truss_height)/2)~~","~~-building_length*0.5+window_width*0.5~~"], // or {x : 1, y: 1, z: 1} or {cad_id : "2_1", cad_perc: 33},
                "vector": [0,0,1], // or {x : 0, y: 1, z: 0},
                "segments": 1,
                "length": "~~building_length*0.5-window_width*0.5 - vertical_truss_width~~",
                "section_id": 1,
            },
        
            // BOTTOM BEAM
            {
                "cad_type": 'cad_line',
                "type": 'vector',
                "ref_pt": [0,0,"~~-building_length~~"], // or {x : 1, y: 1, z: 1} or {cad_id : "2_1", cad_perc: 33},
                "vector": [0, 0, 1], // or {x : 0, y: 1, z: 0},
                "segments": 1,
                "length": "~~building_length~~",
                "section_id": 1,
            }
        ]
        

        if (num_vertical_studs_side > 1) {
            let vert_stud_space = col_to_wind_jamb_dist_side/num_vertical_studs_side

            for (let n = 1; n < num_vertical_studs_side; n++) {

                let this_x_1 = -buildingLength + vertical_truss_width+(n*vert_stud_space)
                let this_x_2 = -buildingLength + (buildingWidth*0.5+window_width*0.5)+(n*vert_stud_space)
        
                side_panel_1.push({
                    "cad_type": 'cad_line',
                    "type": 'vector',
                    "ref_pt": [0,0,this_x_1], // or {x : 1, y: 1, z: 1} or {cad_id : "2_1", cad_perc: 33},
                    "vector": [0, 1, 0], // or {x : 0, y: 1, z: 0},
                    "segments": 1,
                    "length": "~~building_height - truss_height~~",
                    "section_id": 1,
                })
                
                side_panel_1.push({
                    "cad_type": 'cad_line',
                    "type": 'vector',
                    "ref_pt": [0,0,this_x_2], // or {x : 1, y: 1, z: 1} or {cad_id : "2_1", cad_perc: 33},
                    "vector": [0, 1, 0], // or {x : 0, y: 1, z: 0},
                    "segments": 1,
                    "length": "~~building_height - truss_height~~",
                    "section_id": 1,
                })
                
            }
        }


        let final_assembly = []
        final_assembly = [...final_assembly, ...front_panel, ...back_panel, ...side_panel_1]

        let side_panel_1_ids = []
        for (let i = 1; i <= final_assembly.length; i++) {
            if (i > (front_panel.length+back_panel.length)) side_panel_1_ids.push(String(i))
        }
        

        final_assembly.push({
            cad_type: 'cad_repeat',
            type: 'vector',
            repetitions: 1,
            ref_ids: side_panel_1_ids,
            vector: [1, 0, 0], // or {x: 1, y: 2, z: 1},
            length: "~~building_width~~",
        })
        


        let assembly_obj = {
			"id": 1,
			"title": "Tiny House",
			"variables": {
				"building_height": { "value": eaveHeight, "type": "float", "units": "length" },
				"building_length": { "value": buildingLength, "type": "float", "units": "length" },
				"building_width": { "value": buildingWidth, "type": "float", "units": "length" },
				"truss_height": { "value": truss_height, "type": "float", "units": "length" },

				"front_truss_style": { "value": "pratt", "type": "truss_style" },
				"front_number_of_panels": { "value": num_panel_truss_front, "type": "integer" },

                "vertical_web_length": {"value": vertical_web_length, "type": "float", "units": "length"},
                "vertical_truss_width":{"value": vertical_truss_width, "type": "float", "units": "length"},
                "door_width":{"value": door_width, "type": "float", "units": "length"},
                "door_height": {"value": door_height, "type": "float", "units": "length"},
                "door_truss_height":{"value": door_truss_height, "type": "float", "units": "length"},
                "window_width":{"value":  window_width, "type": "float", "units": "length"},
                "window_height": {"value":  window_height, "type": "float", "units": "length"},

                
				"side_truss_style": { "value": "pratt", "type": "truss_style" },
				"side_number_of_panels": { "value": num_panel_truss_side, "type": "integer" },
			},
			"steps": final_assembly
            
		}

        let s3d_model = SKYCIV.structure.parametric.init({
			"assembly_obj" : assembly_obj
		})

        return s3d_model

    }
    

    functions.generateRoofTrusses = function (roofProfile, roofApex, eaveHeight) {
        // Gable
        let gable_roof = [
            {
                "cad_type": 'cad_truss',
                "type": '2D',
                "ref_pt": [0, "~~building_height - truss_height~~", "~~-building_length~~"],
                "length": ['z', "~~building_length~~"],
                "height": ['y', "~~truss_height~~"],
                "offset": 0, // or [30,30],
                "style": 'pratt',
                "web_section_id": 1,
                "chord_section_id": 2,
                "segments": "~~side_number_of_panels~~",
            }
        ]

    }

	
	return functions;

})();