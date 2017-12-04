$('form#req-form').on('submit', function() {
    var model = $(this).hasClass('Soldout') ? 'search-soldout': 'search-rented';
    var form = $(this);
    $('.error', form).html('');
    var btn_subm = $(":submit", form);
    btn_subm.text('Sending...');
    btn_subm.prop('disabled', true);
    var r = form.serialize();
    $.ajax({
        url:  "/user/"+ model,
        method: "POST",
        data: form.serialize(),
        complete: function () {
            btn_subm.prop('disabled', false);
            btn_subm.text("Search");
        },
        statusCode: {
            200: function (success) {

            },
            403: function (jqXHR) {
                var message = jqXHR.responseJSON.message;
                $('form#req-form').append(
                    "<div class=\"alert alert-danger\" role=\"alert\">" +
                    message +
                    "</div>"
                );
                $('.alert-danger').delay(4000).slideUp();
            }
        }
    });
    return false;
});