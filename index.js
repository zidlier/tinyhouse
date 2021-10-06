var INDEX =  (function(){
    var functions = {}
    var data = {}
    functions.getData = function (){
   
        var data =  {
        "input_height" : parseFloat(jQuery('#input-height').val()),
        "input_width" : parseFloat(jQuery('#input-width').val()),
        "input_length" : parseFloat(jQuery('#input-length').val()),
        "input_thk" : parseFloat(jQuery('#input-thickness').val()),
        "input_window_width" : parseFloat(jQuery('#input-window-width').val()),
        "input_window_height" : parseFloat(jQuery('#input-window-height').val()),
        "input_door_height" : parseFloat(jQuery('#input-door-height').val()),
        "input_door_width" : parseFloat(jQuery('#input-door-width').val()),
        "input_door_truss_height" : parseFloat(jQuery('#input-door-truss-height').val()),
        "input_truss_panel_spacing" : parseFloat(jQuery('#input-truss-panel-spacing').val()),
        "input_truss_height" : parseFloat(jQuery('#input-truss-height').val()),
        "input_truss_offset" : parseFloat(jQuery('#input-truss-offset').val()),
        "input_vertical_truss_width" : parseFloat(jQuery('#input-vertical-truss-width').val()),
        "input_roof_angle" : parseFloat(jQuery('#roof-angle').val()),
    }

    return data

    }


$(document).ready(function () {
    TINY_HOUSE.init(data);


    jQuery('#main-tab .item').tab();

    // jQuery(".renderer-update").change(function () {
    //     let data_tab_active = jQuery('#display-container-menu .item.active').tab().attr('data-tab');
    //     if (data_tab_active == '3d-figure') SKYCIV_DESIGN.renderer.renderAssembly()
    // });


    jQuery('#results_button').click(function () {

        jQuery('#results').modal('show');

    });



});

return functions;
})();
