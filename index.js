var INDEX = (function () {
    var functions = {}

    var data = {}

    var default_data = {
        "input_height": 3,
        "input_width": 10,
        "input_length": 6,
        "input_thk": 0.3,
        "input_window_width": 1.5,
        "input_window_height": 0.9,
        "input_door_height": 0.9,
        "input_door_width": 0.9,
        "input_door_truss_height": 1.5,
        "input_truss_panel_spacing": 1,
        "input_truss_height": 5,
        "input_truss_offset": 0.8,
        "input_vertical_truss_width": 0.3,
        "input_roof_angle": 0.05,
    }

    functions.setDefaultData = function () {
        return default_data
    }

    functions.getData = function () {

        var data = {
            "input_height": parseFloat(jQuery('#input-height').val()),
            "input_width": parseFloat(jQuery('#input-width').val()),
            "input_length": parseFloat(jQuery('#input-length').val()),
            "input_thk": parseFloat(jQuery('#input-thickness').val()),
            "input_window_width": parseFloat(jQuery('#input-window-width').val()),
            "input_window_height": parseFloat(jQuery('#input-window-height').val()),
            "input_door_height": parseFloat(jQuery('#input-door-height').val()),
            "input_door_width": parseFloat(jQuery('#input-door-width').val()),
            "input_door_truss_height": parseFloat(jQuery('#input-door-truss-height').val()),
            "input_truss_panel_spacing": parseFloat(jQuery('#input-truss-panel-spacing').val()),
            "input_truss_height": parseFloat(jQuery('#input-truss-height').val()),
            "input_truss_offset": parseFloat(jQuery('#input-truss-offset').val()),
            "input_vertical_truss_width": parseFloat(jQuery('#input-vertical-truss-width').val()),
            "input_roof_angle": parseFloat(jQuery('#roof-angle').val()),
            "input-risk-category": jQuery("#input-risk-category").dropdown('get value'),
            "input-exposure-category": jQuery("#input-exposure-category").dropdown('get value'),


        }

        return data

    }

    functions.updateData = function () {
        var data_keys = Object.keys(default_data);
        var form_fields = {}
        var $form_fields = {}
        // debugger

        for (var i = 0; i < data_keys.length; i++) {
            data_key = data_keys[i]
            $form_fields[data_key] = jQuery('#menu-input [data-key="' + data_key + '"]');
            // debugger
            form_fields[data_keys] = parseFloat($form_fields[data_key].val())
        }


        data = form_fields
        // if()
        // debugger
    }


    functions.updateRender = function () {
        $("#input-height, #input-width, #input-length, #input-truss-height, #input-truss-offset")
            .change(function () {
                data = INDEX.getData()
                TINY_HOUSE.init(data);
            }).change();
    }

    $(document).ready(function () {

        // INIT ACCORDION DATA INPUT
        jQuery('.input-data.accordion').accordion()

        INDEX.updateRender();

        jQuery('#main-tab .item').tab();

        jQuery("#input-risk-category").dropdown('set selected', "I");
        jQuery("#input-exposure-category").dropdown('set selected', "B");

        jQuery('#results_button').click(function () {



            // jQuery(".renderer-update").change(function () {
            //     let data_tab_active = jQuery('#display-container-menu .item.active').tab().attr('data-tab');
            //     if (data_tab_active == '3d-figure') SKYCIV_DESIGN.renderer.renderAssembly()
            // });

            jQuery('#results').modal('show');

        });



    });

    return functions;
})();
