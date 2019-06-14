$(function() {
    $('#datepicker').datepicker( {
        changeMonth: true,
        changeYear: true,
        showButtonPanel: true,
        dateFormat: 'MM yy',
        onClose: function(dateText, inst) { 
            var temp_month = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
            var month = parseInt(temp_month)+1
            var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
            $(this).datepicker('setDate', new Date(year, temp_month, 1));        
            // 
            $.get('/datepicker?month='+month+'&year='+year , function( response ) {
                response.forEach(element => {
                    massPopChart
                });
              });
        }
    });
});
