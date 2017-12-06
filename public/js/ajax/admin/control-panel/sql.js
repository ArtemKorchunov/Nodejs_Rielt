$('form#req-form').on('submit', function() {
    var form = $(this);
    $('.error', form).html('');
    var btn_subm = $(":submit", form);
    btn_subm.text('Sending...');
    btn_subm.prop('disabled', true);
    $.ajax({
        url: "/admin/control-panel/sql",
        method: "POST",
        data: form.serialize(),
        complete: function() {
            btn_subm.prop('disabled', false);
            btn_subm.text("Find from db");
        },
        statusCode: {
            200: function(success) {
                var th = "";
                var tr = "";
                for (var key in success.result[0]){
                    th += "\n<th>" + key + "</th>"
                }
                var tr_header = $('#tr-header');
                tr_header.children().remove();
                tr_header.append(th);
                success.result.forEach(function (item) {
                    tr += "\n<tr>";
                    for (var key in item){
                        tr += "<td>" + item[key] +  "</td>"
                    }
                    tr += "\n</tr>"
                });
                var tbody = $('#tbody');
                tbody.children().remove();
                tbody.append(tr);
            },
            403: function(jqXHR) {
                $('form').attr('id', 'req-form').append(
                    "<div class=\"alert alert-danger\" role=\"alert\">" +
                    jqXHR.responseJSON.message +
                    "</div>"
                );
                $('.alert-danger').delay(2500).slideUp();
            }
        }
    });
    return false;
});