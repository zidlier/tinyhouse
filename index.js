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
            "material-dropdown" : jQuery("#material-dropdown").dropdown('get value'),
            "material-dropdown-2" : jQuery("#material-dropdown-2").dropdown('get value'),
            "material-dropdown-3" : jQuery("#material-dropdown-3").dropdown('get value')         
        }

        return data

    }

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

        }).change();
    }

    functions.dropdownData = function () {
        var AISI = INDEX.general_data.getAISI()
        var NDS = INDEX.general_data.getNDS()

        var AISI_main = Object.keys(AISI)
        var NDS_main = Object.keys(NDS)
        var AISI_data = AISI["C-Sections W Lips (I-1)"]
        var AISI_Zdata = AISI["Z-Sections WO Lips (I-5)"]
        var AISI_length = AISI_Zdata.length;
        var AISI_main_arr = []
        var NDS_main_arr = []

        for (var i = 0; i < AISI_length; i++) {
            var  data_arr = AISI_Zdata[i] 
            AISI_main_arr.push(data_arr)
        }

        function generateDropdown(section,html1,html2){
            // var AISI = INDEX.general_data.getAISI()
            var AISI_data = AISI[section]
            var AISI_length = AISI_data.length;
            var AISI_main_arr = []
            for (var i = 0; i < AISI_length; i++) {
                var  data_arr = AISI_data[i] 
                AISI_main_arr.push(data_arr)
            }
            
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
        
        generateDropdown("C-Sections W Lips (I-1)",'filter-section','material-dropdown')
        generateDropdown("C-Sections W Lips (I-1)",'filter-section-2','material-dropdown-2')
        generateDropdown("Z-Sections WO Lips (I-5)",'filter-section-3','material-dropdown-3')

    }

    $(document).ready(function () {

        jQuery('.input-data.accordion').accordion()

        INDEX.dropdownData();
        jQuery('#main-tab .item').tab();

        jQuery("#input-risk-category").dropdown('set selected', "II");
        jQuery("#input-exposure-category").dropdown('set selected', "B");
        jQuery("#input-stories").dropdown('set selected', "1");

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


        setTimeout(function () {
            INDEX.updateRender();
        }, 1000)

    });

    return functions;
})();