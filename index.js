var INDEX = (function () {
    var functions = {}

    var data = {}

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
            "material-dropdown-3" : jQuery("#material-dropdown-3").dropdown('get value'),
            "material-dropdown-b" : jQuery("#material-dropdown-b").dropdown('get value'),
            "material-dropdown-2b" : jQuery("#material-dropdown-2b").dropdown('get value'),
            "material-dropdown-3b" : jQuery("#material-dropdown-3b").dropdown('get value'),    
            "material-slider": jQuery('#material-slider').checkbox('is checked')
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
            // console.log('updating data')
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

        function generateDropdown(type,section,html1,html2){
            // var AISI = INDEX.general_data.getAISI()
            var AISI_data = type[section]
            var AISI_length = AISI_data.length;
            var AISI_main_arr = []
            for (var i = 0; i < AISI_length; i++) {
                var  data_arr = AISI_data[i] 
                AISI_main_arr.push(data_arr)
            }
            
            let generate_filter_dropdown = ''
            generate_filter_dropdown += `
       
            <div class="ui fluid search selection dropdown" id="${html2}" style="padding-left: 15px;">
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
        
        generateDropdown(AISI,"C-Sections W Lips (I-1)",'filter-section','material-dropdown')
        generateDropdown(AISI,"C-Sections W Lips (I-1)",'filter-section-2','material-dropdown-2')
        generateDropdown(AISI,"Z-Sections WO Lips (I-5)",'filter-section-3','material-dropdown-3')
        generateDropdown(NDS,"Western Species Structural Glued Laminated Timber",'filter-section-b','material-dropdown-b')
        generateDropdown(NDS,"Western Species Structural Glued Laminated Timber",'filter-section-2b','material-dropdown-2b')
        generateDropdown(NDS,"Sawn Lumber",'filter-section-3b','material-dropdown-3b')
        
    }

    functions.updateData2 = function (type){
        var data = {
            "material" : type
        }

        return data
    }

    functions.woodMat = function (){
        return 'wood'
    }

    functions.cfMat = function(){
        return 'cf'
    }


    // functions.Mat = function(type){
    //     return t
    // }
    $(document).ready(function () {

        jQuery('.input-data.accordion').accordion()

        INDEX.dropdownData();
        jQuery('#main-tab .item').tab();

        jQuery("#input-risk-category").dropdown('set selected', "II");
        jQuery("#input-exposure-category").dropdown('set selected', "B");
        jQuery("#input-stories").dropdown('set selected', "1");

        jQuery('#optimize-button').click(function () {
            // jQuery('#modal-results').modal('show');
            TINY_HOUSE.analysis.runAnalysis()
        });

        //--> initially hide the wood materials
        jQuery('#material-dropdown-b').hide()
        jQuery('#material-dropdown-2b').hide()       
        jQuery('#material-dropdown-3b').hide()

        jQuery('#material-slider').checkbox({
            onChecked: function () {
                
                jQuery('#material-dropdown').hide()
                jQuery('#material-dropdown-2').hide()       
                jQuery('#material-dropdown-3').hide()

                jQuery('#material-dropdown-b').show()
                jQuery('#material-dropdown-2b').show()       
                jQuery('#material-dropdown-3b').show()

                // updateData2()
            },
            onUnchecked: function () {

                jQuery('#material-dropdown').show()
                jQuery('#material-dropdown-2').show()       
                jQuery('#material-dropdown-3').show()

                jQuery('#material-dropdown-b').hide()
                jQuery('#material-dropdown-2b').hide()       
                jQuery('#material-dropdown-3b').hide()

            },
            onChange: function () {
                var material_type = jQuery('#material-slider').checkbox("is checked"); //false : cf //true : wood
                // INDEX.getData()
            }

        });

        setTimeout(function () {
            INDEX.updateRender();
        }, 1000)

    });

    return functions;
})();