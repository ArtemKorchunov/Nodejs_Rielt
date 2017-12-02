$('form').attr('id', 'req-form').on('submit', function() {
    var form = $(this);
    $('.error', form).html('');
    var btn_subm = $(":submit", form);
    btn_subm.text('Отправляется...');
    btn_subm.prop('disabled', true);
    $.ajax({
        url: "/login",
        method: "POST",
        data: form.serialize(),
        complete: function() {
            btn_subm.prop('disabled', false);
            btn_subm.text("Log in");
        },
        statusCode: {
            200: function(success) {
                form.html("Вы вошли в сайт").addClass('alert-success');
                if (success.admin) {
                    window.location.href = "/admin/control-panel/add-user";
                }
                else {
                    window.location.href = "/user/control-panel/add-flat";
                }
            },
            403: function(jqXHR) {
                $('.error', form).html(jqXHR.responseText);
            }
        }
    });
    return false;
});