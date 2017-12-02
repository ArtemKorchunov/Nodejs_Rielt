$('.span-sort').click( function (e) {
    var this_span =  $(this)[0];
    var column = this_span.id.split('-');
    column = column[1].toLowerCase();
    var type_of_sort = this_span.children[0];
    var name_type_of_sort = type_of_sort.className.split('-');
    name_type_of_sort = name_type_of_sort[name_type_of_sort.length - 1];
    $('.span-sort').children().attr('class', 'fa fa-sort');
    var tableName = $(".table");
    var table_id = tableName.attr('id');
    if (name_type_of_sort === "sort"){
        type_of_sort.className = 'fa fa-sort-asc';
        var type = 'asc';
    }
    else if (name_type_of_sort === "asc") {
        type_of_sort.className = 'fa fa-sort-desc';
        var type = 'desc';
    }
    else {
        type_of_sort.className = 'fa fa-sort-asc';
        var type = 'asc';
    }

    $.ajax({
        url: "/sort/" + table_id + '/' + column + '/' + type ,
        method: "POST",
        statusCode: {
            200: function (success){
                $('tbody').children().remove();
                var column_number = 1;
                success.result.forEach(function(item, i, arr) {
                    var one_column = '';
                    one_column +=
                        "<tr id=\"tr-column-id-" + item._id + "\">\n" +
                            "<td class=\"row justify-content-center\">\n" +
                            "    <form class=\"form-inline\" id=\"del-form\">\n" +
                            "        <input type=\"hidden\" id=\"column-" + column_number + "\" class=\"this-column-id\" name=\"id\" value=\"" + item._id + "\">\n" +
                            "    <button type=\"submit\" class=\"btn btn-danger btn-sm func-icon\">\n" +
                            "        <i class=\"fa fa-trash-o\" aria-hidden=\"true\"></i>\n" +
                            "    </button>\n" +
                            "    </form>\n" +
                            "    <button type=\"button\" id=\"but-edit-form\" class=\"btn btn-info btn-sm func-icon\" data-toggle=\"modal\" data-target=\"#ModalLong\">\n" +
                            "        <input type=\"hidden\" name=\"column-number\" value=\"column-" + column_number + "\">\n" +
                            "        <i class=\"fa fa-pencil-square-o\" aria-hidden=\"true\"></i>\n" +
                            "    </button>\n" +
                            "</td>";
                    for (var td in item) {
                        if (td !== '_id') {
                            one_column += "\n<td class=\"column-" + column_number + " " + td + "\">" + item[td] + "</td>";
                        }
                    }
                    one_column += "\n</tr>";
                    $('tbody').append(one_column);
                    one_column = '';
                    column_number++;
                });
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
            },
            403: function (jqXHR) {
                alert('wrong');
            }
        }
    });
});