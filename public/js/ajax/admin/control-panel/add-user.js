$('form').attr('id', 'req-form').on('submit', function() {
    var form = $(this);
    $('.error', form).html('');
    var btn_subm = $(":submit", form);
    btn_subm.text('Отправляется...');
    btn_subm.prop('disabled', true);
    $.ajax({
        url: "/admin",
        method: "POST",
        data: form.serialize(),
        complete: function() {
            btn_subm.prop('disabled', false);
            btn_subm.text("Log in");
        },
        statusCode: {
            200: function(success) {
                $('form').attr('id', 'req-form').append(
                    "<div class=\"alert alert-success\" role=\"alert\">" +
                    "   This is a success alert—check it out!\n" +
                    "</div>"
                );
                window.location.href = "/admin/control-panel";
            },
            403: function(jqXHR) {
                $('form').attr('id', 'req-form').append(
                    "<div class=\"alert alert-danger\" role=\"alert\">" +
                    "Name has already exist!" +
                    "</div>"
                );
                $('.alert-danger').delay(4000).slideUp();
            }
        }
    });
    return false;
});