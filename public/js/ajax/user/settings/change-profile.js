$('form#req-form').on('submit', function() {
    var form = $(this);
    var d = arguments;
    $('.error', form).html('');
    var btn_subm = $(":submit", form);
    btn_subm.text('Отправляется...');
    btn_subm.prop('disabled', true);
    $.ajax({
        url: "/user/settings/change-profile",
        method: "POST",
        data: form.serialize(),
        complete: function() {
            btn_subm.prop('disabled', false);
            btn_subm.text("Change your profile");
        },
        statusCode: {
            200: function(success) {
                form.html("Your profile was changed successful!").addClass('alert-success');
                document.location.href = "/user/settings/profile";
            },
            403: function(jqXHR) {
                var message = jqXHR.responseJSON.message;
                $('form#req-form').append(
                    "<div class=\"alert alert-danger\" role=\"alert\">" +
                    message +
                    "</div>"
                );
            }
        }
    });
    return false;
});