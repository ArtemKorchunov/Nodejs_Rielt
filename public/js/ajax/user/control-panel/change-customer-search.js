$('form#req-form-choose').on('submit', function(table) {
    var form = $(this);
    var serialize = form.serialize();
    var tableName = $('.search-name').attr('id');
    serialize += "&solve_deal=" + tableName;
    var id = $('.hidden-input-choose-customer').val();
    $.ajax({
        url: "/edit/column/" + tableName + '/' + id,
        method: "POST",
        data: serialize,
        statusCode: {
            200: function (success) {
                location.href = '/user/control-panel/' + success.redir_to;
            },
            403: function (jqXHR) {
                var message = jqXHR.responseJSON.message;
                $('form#req-form-customer').append(
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