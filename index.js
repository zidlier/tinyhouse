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
            "input-stories": parseFloat( jQuery("#input-stories").dropdown('get value') ),
            "input-site-address": jQuery('#input-site-address').val(),
            "input-dead-load": jQuery('#input-dead-load').val(),
            "input-live-load": jQuery('#input-live-load').val(),
            // "AISI-dropdown" : jQuery("#AISI-dropdown").dropdown('get value'),
            // "AISI-dropdown-profile" :  jQuery("#AISI-dropdown-profile").dropdown('get value'),
            // "NDS-dropdown" : jQuery("#NDS-dropdown").dropdown('get value'),
            // "NDS-dropdown-profile" :  jQuery("#NDS-dropdown-profile").dropdown('get value'),             
        }

        return data

    }


    // #AISI-dropdown-profile,
    // #NDS-dropdown-profile,

    functions.updateRender = function () {
        $(`#input-height, #input-width, #input-length, #input-truss-height, #input-truss-offset, #input-truss-panel-spacing,
        #input-risk-category,
        #input-exposure-category,
        #input-site-address,
        #input-live-load,
        #input-stories
        `).change(function () {
            data = INDEX.getData()
            console.log('updating data')
            TINY_HOUSE.init(data);
            var height = data["input-stories"]
            if(height == 1){
                jQuery(`#label-height`).html(`Structure Height`)
            } else if (height == 2){
                jQuery(`#label-height`).html(`Storey Height`)
            }

        })
    }

    functions.dropdownData = function () {
        var AISI = INDEX.general_data.getAISI()
        var NDS = INDEX.general_data.getNDS()

        var AISI_main = Object.keys(AISI)
        var NDS_main = Object.keys(NDS)
        var AISI_data = AISI["C-Sections W Lips (I-1)"]
        var AISI_length = AISI_data.length;
        var AISI_main_arr = []
        var NDS_main_arr = []

        for (var i = 0; i < AISI_length; i++) {
            var  data_arr = AISI_data[i] 
            AISI_main_arr.push(data_arr)
        }

        function generateDropdown(html1,html2){
            let generate_filter_dropdown = ''
            generate_filter_dropdown += `
       
            <div class="ui fluid search selection dropdown" id="${html2}">
              <input type="hidden" name="country">
                <i class="dropdown icon"></i>
                <div class="default text">Select Selection</div>
                <div class="menu">
    
                `
                for (var i = 0; i < AISI_main_arr.length; i++) {
                    generate_filter_dropdown += `
                            <div class="item" data-value="${AISI_main_arr[i]}">${AISI_main_arr[i]}</div>
                            `
                }
            generate_filter_dropdown += `
                    </div>
                </div>
            `

            jQuery(`#${html1}`).append(generate_filter_dropdown);
            jQuery(`#${html2}`).dropdown('set selected', AISI_main_arr[0]);
        }
        
        generateDropdown('filter-section','material-dropdown')
        generateDropdown('filter-section-2','material-dropdown-2')
        generateDropdown('filter-section-3','material-dropdown-3')

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
        jQuery("#input-stories").dropdown('set selected', "1");

    //     jQuery("#input-stories").dropdown({
    //         on : function (value){
    //             if(value == 1){
    //                 jQuery(`label-height`).html(`Structure Height`)
    //             } else {
    //                 jQuery(`label-height`).html(`Storey Height`)
    //             }
    //         } 
    //    });

        // jQuery('#NDS-dropdown').hide()
        // jQuery('#NDS-dropdown-profile').hide()

        // label-height

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