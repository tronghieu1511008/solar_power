$(function () {
    $("#datep_1").datepicker({
        // 
        onClose: function(dateText, inst) { 
            var today = $("#datep_1").val();                  
            $.get('/timeSpeed_1?today='+today , function( response ) {
                response.forEach(element => {
                    // 
                    var temp_status 
                    switch(element.status) {
                        case 'Low Low':
                          temp_status="<p style='color:#544532'>Low Low</p>"
                          break;
                        case 'Low':
                        temp_status="<p style='color:green'>Low</p>"
                          break;
                          case 'High':
                          temp_status="<p style='color:#ff7f00'>High</p>"
                          break;
                        default:
                        temp_status="<p style='color:red'>High High</p>"
                      }
                    $('#dataSpeed_1').append(function(){
                        return "<tr>"+"<td>"+element.day+"</td>"+"<td>"+element.time+"</td>"+"<td>"+element.speed+"</td>"+"<td>"+temp_status+"</td>"+"</tr"
                    })
                    // 
                });
              });
        }
        // 
    }); 
});
