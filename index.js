jQuery(".renderer-update").change(function () {
    let data_tab_active = jQuery('#display-container-menu .item.active').tab().attr('data-tab');
    if (data_tab_active == '3d-figure') SKYCIV_DESIGN.renderer.renderAssembly()
});



$(document).ready(function () {
    TINY_HOUSE.init();
    let input_height = jQuery('#input-height').val();
    let input_thk = jQuery('#input-thickness').val();
    let input_window_width = jQuery('#input-window-width').val();
    let input_window_height = jQuery('#input-window-height').val();
    let input_door_height = jQuery('#input-door-height').val();
    let input_door_width = jQuery('#input-door-width').val();
    let input_door_truss_height = jQuery('#input-door-truss-height').val();
    let input_truss_panel_spacing = jQuery('#input-truss-panel-spacing').val();
    let input_truss_height = jQuery('#input-truss-height').val();
    let input_vertical_truss_width = jQuery('#input-vertical-truss-width').val();
    let input_roof_angle = jQuery('#roof-angle').val();
    // debugger

    jQuery('#main-tab .item').tab();


    jQuery('#results_button').click(function () {

        jQuery('#results').modal('show');

    });



});