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