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
            // "input_window_width": parseFloat(jQuery('#input-window-width').val()),
            // "input_window_height": parseFloat(jQuery('#input-window-height').val()),
            // "input_door_height": parseFloat(jQuery('#input-door-height').val()),
            // "input_door_width": parseFloat(jQuery('#input-door-width').val()),
            // "input_door_truss_height": parseFloat(jQuery('#input-door-truss-height').val()),
            "input_truss_panel_spacing": parseFloat(jQuery('#input-truss-panel-spacing').val()),
            "input_truss_height": parseFloat(jQuery('#input-truss-height').val()),
            "input_truss_offset": parseFloat(jQuery('#input-truss-offset').val()),
            "input_vertical_truss_width": parseFloat(jQuery('#input-vertical-truss-width').val()),
            "input_roof_angle": parseFloat(jQuery('#roof-angle').val()),
            "input-risk-category": jQuery("#input-risk-category").dropdown('get value'),
            "input-exposure-category": jQuery("#input-exposure-category").dropdown('get value'),
            "input-site-address": jQuery('#input-site-address').val(),
            // "AISI-dropdown" : jQuery("#AISI-dropdown").dropdown('get value'),
            // "AISI-dropdown-profile" :  jQuery("#AISI-dropdown-profile").dropdown('get value'),
            // "NDS-dropdown" : jQuery("#NDS-dropdown").dropdown('get value'),
            // "NDS-dropdown-profile" :  jQuery("#NDS-dropdown-profile").dropdown('get value'),             
        }

        return data

    }

    functions.updateData = function () {
        var data_keys = Object.keys(default_data);
        var form_fields = {}
        var $form_fields = {}
        // 

        for (var i = 0; i < data_keys.length; i++) {
            data_key = data_keys[i]
            $form_fields[data_key] = jQuery('#menu-input [data-key="' + data_key + '"]');
            // 
            form_fields[data_keys] = parseFloat($form_fields[data_key].val())
        }


        data = form_fields
        // if()
        // 
    }

    // #AISI-dropdown-profile,
    // #NDS-dropdown-profile,

    functions.updateRender = function () {
        $(`#input-height, #input-width, #input-length, #input-truss-height, #input-truss-offset, #input-truss-panel-spacing
        #input-risk-category,
        #input-exposure-category,
        #input-site-address
        `).change(function () {
            data = INDEX.getData()
            TINY_HOUSE.init(data);
        }).change();
    }

    functions.dropdownData = function () {
        var AISI = INDEX.general_data.getAISI()
        var NDS = INDEX.general_data.getNDS()

        var AISI_main = Object.keys(AISI)
        var NDS_main = Object.keys(NDS)

        var AISI_main_arr = []
        var NDS_main_arr = []

        for (var i = 0; i < AISI_main.length; i++) {
            // if(i == 0){
            //     AISI_main_arr.push({
            //         "name" : AISI_main[i],
            //         "value" : AISI_main[i],
            //         "selected" : true
            //     })
            // } else {
            //     AISI_main_arr.push({
            //         "name" : AISI_main[i],
            //         "value" : AISI_main[i]
            //     }) 
            // }
        }

        // for(var i = 0; i< NDS_main.length; i++){
        //     if(i == 0){
        //         NDS_main_arr.push({
        //             "name" : NDS_main[i],
        //             "value" : NDS_main[i],
        //             "selected" : true
        //         })
        //     } else {
        //         NDS_main_arr.push({
        //             "name" : NDS_main[i],
        //             "value" : NDS_main[i]
        //         })
        //     }



        // }

        var checkbox_checker = jQuery('.ui.checkbox').is(':checked');

        let generate_filter_dropdown = ''

        var random = ['red', 'green', 'blue', 'black', 'purple', 'orange', 'yellow', 'white']
        //initialize first
        generate_filter_dropdown += `<div class="ui floating dropdown labeled icon button" id="material-dropdown">			
            <i class="filter icon"></i>
            <span class="text">Filter Section</span>
            <div class="menu">
            <div class="ui icon search input">
                <i class="search icon"></i>
                <input type="text" placeholder="Search tags...">
            </div>
            <div class="divider"></div>
            <div class="header">
                <i class="tags icon"></i>
                Tag Label
            </div>
            <div class="scrolling menu">`

        if (!checkbox_checker) {
            for (var i = 0; i < AISI_main.length; i++) {

                generate_filter_dropdown += `<div class="item">
                        <div class="ui ${random[i]} empty circular label"></div>
                        ${AISI_main[i]}
                        </div>`
            }
        } else {
            for (var i = 0; i < NDS_main.length; i++) {

                generate_filter_dropdown += `<div class="item">
                        <div class="ui ${random[i]} empty circular label"></div>
                        ${NDS_main[i]}
                        </div>`
            }
        }

        generate_filter_dropdown += `</div>
            </div>
        </div>`
        // debugger
        jQuery('#filter-section').append(generate_filter_dropdown);
        jQuery('#material-dropdown').dropdown();


    }

    functions.dropdownData2 = function () {
        
        var AISI = INDEX.general_data.getAISI()
        var NDS = INDEX.general_data.getNDS()

        var AISI_main = jQuery('#AISI-dropdown').dropdown('get value')
        var AISI_profile = AISI[AISI_main]
        var AISI_profile_arr = []

        for (var i = 0; i < AISI_profile.length; i++) {
            if (i == 0) {
                AISI_profile_arr.push({
                    "name": AISI_profile[i],
                    "value": AISI_profile[i],
                    "selected": true
                })
            } else {
                AISI_profile_arr.push({
                    "name": AISI_profile[i],
                    "value": AISI_profile[i]
                })
            }
        }

        var NDS_main = jQuery('#NDS-dropdown').dropdown('get value')
        var NDS_profile = NDS[NDS_main]
        var NDS_profile_arr = []

        for (var i = 0; i < NDS_profile.length; i++) {
            if (i == 0) {
                NDS_profile_arr.push({
                    "name": NDS_profile[i],
                    "value": NDS_profile[i],
                    "selected": true
                })
            } else {
                NDS_profile_arr.push({
                    "name": NDS_profile[i],
                    "value": NDS_profile[i]
                })
            }
        }


        jQuery('#AISI-dropdown-profile').dropdown({
            values: AISI_profile_arr
        });

        jQuery('#NDS-dropdown-profile').dropdown({
            values: NDS_profile_arr
        });
    }

    $(document).ready(function () {

        jQuery('.input-data.accordion').accordion()

        INDEX.updateRender();
        INDEX.dropdownData();
        // INDEX.dropdownData2();

        jQuery('#main-tab .item').tab();

        jQuery("#input-risk-category").dropdown('set selected', "I");
        jQuery("#input-exposure-category").dropdown('set selected', "B");

        // jQuery('#NDS-dropdown').hide()
        // jQuery('#NDS-dropdown-profile').hide()

        jQuery('.ui.checkbox').checkbox({
            onChecked: function () {
                // INDEX.dropdownData();
                //  jQuery('#material-type-slider').html('Wood Material');
                //  jQuery('#NDS-dropdown').show()
                //  jQuery('#NDS-dropdown-profile').show()
                //  jQuery('#AISI-dropdown').hide()
                //  jQuery('#AISI-dropdown-profile').hide()
            },
            onUnchecked: function () {
                // INDEX.dropdownData();
                // jQuery('#material-type-slider').html('Cold-formed Steel Material');
                // jQuery('#NDS-dropdown').hide()
                // jQuery('#NDS-dropdown-profile').hide()
                // jQuery('#AISI-dropdown').show()
                // jQuery('#AISI-dropdown-profile').show()
            }


        });



    });

    return functions;
})();