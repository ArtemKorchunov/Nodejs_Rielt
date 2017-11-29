$('form#del-form').on('submit', function(table) {
    var form = $(this);
    var r = form.serialize();
    $.ajax({
        url: "/delete/column",
        method: "POST",
        data: form.serialize(),
        statusCode: {
            200: function (success) {
                window.location.href = "/user/control-panel/add-flat";
            },
            403: function (jqXHR) {

            }
        }
    });
    return false;
});