var TINY_HOUSE = (function () {

	var viewer = null
	var s3d_model = null
	var functions = {}


	functions.init = function (data) {

		viewer = new SKYCIV.renderer({
			container_selector: '#renderer-container',
		});

		let buildingLength =  data["input_length"]
		let buildingWidth = data["input_width"]
		let eaveHeight = data["input_height"]
		let roofApex = data["input_truss_height"]
		let roofOverhang = data["input_truss_offset"]
		let trussSpacing = data["input_truss_panel_spacing"]

		s3d_model = TINY_HOUSE.framing.generateWallFramingS3DModel(buildingLength, buildingWidth, eaveHeight, roofApex, roofOverhang, trussSpacing)

		viewer.model.set(s3d_model);
		viewer.model.buildStructure();
		viewer.render();
	}
 

	functions.getViewer = function () {
		return viewer
	}
	

	functions.getS3DModel = function () {
		return s3d_model
	}

	functions.updateRenderer = function (s3dModel) {
		s3d_model = s3dModel
		functions.getViewer().model.set(s3d_model);
		functions.getViewer().model.buildStructure();
		functions.getViewer().render();

	}


	functions.getFrameParameters = function () {
		// let truss_panel_spacing = 1/0.3048
        // let door_height = 2.1/0.3048
        // let truss_height = 0.5/0.3048
        // let door_width = 0.9/0.3048
        // let door_truss_height = 0.3/0.3048
        // let window_width = 1.5/0.3048
        // let window_height = 0.9/0.3048
        // let vertical_truss_width = 0.5/0.3048
        // let spacing_horizontal_stud = 1.5/0.3048
        // let purlin_spacing = 0.6/0.3048
		// let spacing_vertical_stud = 1/0.3048

		let truss_panel_spacing = 3
        let door_height = 7
        let truss_height = 2
        let door_width = 3
        let door_truss_height = 1
        let window_width = 5
        let window_height = 3
        let vertical_truss_width = 2
        let spacing_horizontal_stud = 5
        let purlin_spacing = 2
		let spacing_vertical_stud = 3

		return {
			truss_panel_spacing,
			door_height,
			truss_height, 
			door_width, 
			door_truss_height, 
			window_width, 
			window_height, 
			vertical_truss_width, 
			spacing_horizontal_stud, 
			purlin_spacing,
			spacing_vertical_stud
		}
	}

	return functions;

})();