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
        let window_height = 1.2
        let num_panel_truss_front = Math.ceil(buildingLength/truss_panel_spacing)
        
        let vertical_truss_width = 0.3
        let vertical_web_length = Math.sqrt(vertical_truss_width*vertical_truss_width + (buildingLength-truss_height)*(buildingLength-truss_height))
        let num_panel_truss_front_vertical = Math.ceil(eaveHeight/1)

        let front_panel = [
            // TOP BEAM
            {
                "cad_type": 'cad_truss',
                "type": '2D',
                "ref_pt": [0, "~~building_height - truss_height~~", 0],
                "length": ['x', "~~building_width~~"],
                "height": ['y', "~~truss_height~~"],
                "offset": 0, // or [30,30],
                "style": 'warren',
                "web_section_id": 1,
                "chord_section_id": 2,
                "segments": "~~front_number_of_panels~~",
            },

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
                    "ref_pt": [(buildingWidth*0.5-door_width*0.5),door_height,0],
                    "length": ['x', door_width],
                    "height": ['y', door_truss_height],
                    "offset": 0, // or [30,30],
                    "style": 'warren',
                    "web_section_id": 1,
                    "chord_section_id": 2,
                    "segments": 3,
                }
            )
        }

       



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

                
				"side_truss_style": { "value": "pratt", "type": "truss_style" },
				"side_number_of_panels": { "value": 5, "type": "integer" },
			},
			"steps": front_panel
            
            // [
			// 	// {
			// 	// 	"cad_type": "cad_truss",
			// 	// 	"type": "2D",
			// 	// 	"ref_pt": [0, 0, 0],
			// 	// 	"height": ["y", "~~building_height~~"],
			// 	// 	"length": ["x", "~~building_length~~"],
			// 	// 	"segments": "~~side_number_of_panels~~",
			// 	// 	"style": "~~side_truss_style~~",
			// 	// 	"offset": 0,
			// 	// 	"web_section_id": 1,
			// 	// 	"chord_section_id": 2
			// 	// },
            //     {
            //         "cad_type": 'cad_truss',
            //         "type": '2D',
            //         "ref_pt": [0, 0, 0],
            //         "length": ['x', "~~building_height~~"],
            //         "height": ['y', "~~building_length~~"],
            //         "offset": 1, // or [30,30],
            //         "style": 'pratt',
            //         "web_section_id": 1,
            //         "chord_section_id": 2,
            //         "segments": "~~side_number_of_panels~~",
            //     }
			// 	// {
			// 	// 	"cad_type": "cad_repeat",
			// 	// 	"type": "vector",
			// 	// 	"vector": [0, 0, 1],
			// 	// 	"repetitions": 1,
			// 	// 	"length": "~~building_width~~",
			// 	// 	"ref_ids": ["1"]
			// 	// },
			// 	// {
			// 	// 	"cad_type": "cad_truss",
			// 	// 	"type": "2D",
			// 	// 	"ref_pt": [0, 0, 0],
			// 	// 	"height": ["y", "~~building_height~~"],
			// 	// 	"length": ["z", "~~building_width~~"],
			// 	// 	"segments": "~~front_number_of_panels~~",
			// 	// 	"style": "~~front_truss_style~~",
			// 	// 	"offset": 0,
			// 	// 	"web_section_id": 1,
			// 	// 	"chord_section_id": 2
			// 	// },
			// 	// {
			// 	// 	"cad_type": "cad_repeat",
			// 	// 	"type": "vector",
			// 	// 	"vector": [1, 0, 0],
			// 	// 	"repetitions": 1,
			// 	// 	"length": "~~building_length~~",
			// 	// 	"ref_ids": ["3"]
			// 	// }
			// ]
		}

        let s3d_model = SKYCIV.structure.parametric.init({
			"assembly_obj" : assembly_obj
		})

        return s3d_model
    }

	
	return functions;

})();