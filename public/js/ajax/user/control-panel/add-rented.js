$('form#req-form').on('submit', function() {
    var form = $(this);
    $('.error', form).html('');
    var btn_subm = $(":submit", form);
    btn_subm.text('Sending...');
    btn_subm.prop('disabled', true);
    var r = form.serialize();
    $.ajax({
        url: "/user/control-panel/add-rented",
        method: "POST",
        data: form.serialize(),
        complete: function () {
            btn_subm.prop('disabled', false);
            btn_subm.text("Create rented");
        },
        statusCode: {
            200: function (success) {
                $('form').attr('id', 'req-form').append(
                    "<div class=\"alert alert-success\" role=\"alert\">" +
                    "   This is a success alert—check it out!\n" +
                    "</div>"
                );
                window.location.href = "/user/control-panel/add-rented";
            },
            403: function (jqXHR) {
                $('form').attr('id', 'req-form').append(
                    "<div class=\"alert alert-danger\" role=\"alert\">" +
                    "This is a danger alert—check it out!" +
                    "</div>"
                );
                $('.alert-danger').delay(4000).slideUp();
            }
        }
    });
    return false;
});