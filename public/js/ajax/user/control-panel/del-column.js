$('form#del-form').on('submit', function(table) {
    var form = $(this);
    var tableName = $(".table");
    var table_id = tableName.attr('id');
    var r = form.serialize();
    $.ajax({
        url: "/delete/column/" + table_id,
        method: "POST",
        data: form.serialize(),
        statusCode: {
            200: function (success) {
                window.location.href = "/user/control-panel/" + success.redir_to;;
            },
            403: function (jqXHR) {

            }
        }
    });
    return false;
});