var TINY_HOUSE = (function () {

	var viewer = null
	var s3d_model = null
	var functions = {}


	functions.init = function (data) {

		viewer = new SKYCIV.renderer({
			container_selector: '#renderer-container',
		});
		//TODO for the dynamics from the inputs
		var data = INDEX.getData()
		
		let buildingLength =  data["input_length"]
		let buildingWidth = data["input_width"]
		let eaveHeight = data["input_height"]
		let roofApex = data["input_truss_height"]
		let roofOverhang = data["input_truss_offset"]
		// debugger
		// (buildingLength, buildingWidth, eaveHeight, roofApex, roofOverhang)
		// let s3d_model = TINY_HOUSE.framing.generateWallFramingS3DModel(6,10,3,5,0.8)
		let s3d_model = TINY_HOUSE.framing.generateWallFramingS3DModel(buildingLength, buildingWidth, eaveHeight, roofApex, roofOverhang)

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


	return functions;

})();