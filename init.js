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

        s3d_model.sections =  {
            "1": {
                "load_section": ["American", "AISI", "C-Sections W Lips (I-1)", "4CS2.5x059"],
                "material_id": 1
            },
            "2": {
                "load_section": ["American", "AISI", "C-Sections W Lips (I-1)", "4CS2.5x059"],
                "material_id": 1
            },
            "3": {
                "load_section": ["American", "AISI", "Z-Sections W Lips (I-4)", "3.5ZS1.5x059"],
                "material_id": 1
            }
        }

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