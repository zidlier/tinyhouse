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


		let s3d_model = TINY_HOUSE.framing.generateWallFramingS3DModel(6,10,3,5,0.8)

		
		viewer.model.set(s3d_model);
		viewer.model.buildStructure();
		viewer.render();
	}
 

	functions.getViewer = function () {
		return viewer
	}
	


	return functions;

})();