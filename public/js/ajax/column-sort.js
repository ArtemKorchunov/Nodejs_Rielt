$('.span-sort').click( function (e) {
    var this_span =  $(this)[0];
    var column = this_span.id.split('-');
    column = column[1].toLowerCase();
    var type_of_sort = this_span.children[0];
    var name_type_of_sort = type_of_sort.className;
    $('.span-sort').children().attr('class', 'fa fa-sort');
    var tableName = $(".table");
    var table_id = tableName.attr('id');
    if (name_type_of_sort.indexOf('fa-sort')){
        type_of_sort.className = 'fa fa-sort-asc';
        var type = 'asc';
    }
    else if (name_type_of_sort.indexOf('fa-sort-asc')) {
        type_of_sort.className = 'fa fa-sort-desc';
        var type = 'desk';
    }
    else {
        type_of_sort.className = 'fa fa-sort';
        column = table_id.toLowerCase() + '_id'
    }

    $.ajax({
        url: "/sort/" + table_id + '/' + column + '/' + type ,
        method: "POST",
        statusCode: {
            200: function (success) {
                alert('success');
            },
            403: function (jqXHR) {
                alert('wrong');
            }
        }
    });
});