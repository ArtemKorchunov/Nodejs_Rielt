$('form').attr('id', 'req-form').on('submit', function() {
    var form = $(this);
    var d = arguments;
    $('.error', form).html('');
    var btn_subm = $(":submit", form);
    btn_subm.text('Отправляется...');
    btn_subm.prop('disabled', true);
    $.ajax({
        url: "/user/change-profile",
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
                $('form').attr('id', 'req-form').append(
                    "<div class=\"alert alert-danger\" role=\"alert\">" +
                    "This is a danger alert—check it out!" +
                    "</div>"
                );
            }
        }
    });
    return false;
});