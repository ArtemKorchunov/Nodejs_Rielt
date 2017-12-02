$('form#req-form').on('submit', function() {
    var tableName = $(".table");
    var table_id = tableName.attr('id');
    var url;
    if (tableName.hasClass('edit')){
        url = '/edit/column/'+ table_id;
        var main_in_column = $('.this-column-id');
        var column_number = $('#hidden-input-in-form').val();
        var id_and_name = $('#'+ column_number);
        var id_value = id_and_name.val();
        var id_name = id_and_name.attr('name');
        var table_name_id = "/"+ id_name + "/" + id_value;
        url += table_name_id;
    } else if (tableName.hasClass('add')) {
        url = '/user/control-panel/add-' +  table_id.toLowerCase();
    } else if (tableName.hasClass('search')){
        url = '/search/'+ table_id;
    }
    var form = $(this);
    $('.error', form).html('');
    var btn_subm = $(":submit", form);
    btn_subm.text('Sending...');
    btn_subm.prop('disabled', true);
    var r = form.serialize();
    $.ajax({
        url: url,
        method: "POST",
        data: form.serialize(),
        complete: function () {
            btn_subm.prop('disabled', false);
            btn_subm.text("Create flat");
        },
        statusCode: {
            200: function (success) {
                if (success.type === "search"){
                    var search_items = success.arr;
                    var d = $('.tbody-info').children();
                    d.each(function (index, item) {
                       if (!search_items[item.id]){
                           item.remove();
                       }
                    });
                    var search_i = $('.fa-search');
                    search_i.removeClass('fa-search').addClass('fa-refresh');
                    var button_parent_search_i = search_i.parent();
                    button_parent_search_i.attr({'data-toggle': '', 'data-target': ''});
                    button_parent_search_i.click(function () {
                            var tableName = $(".table");
                            var table_id = tableName.attr('id');
                            location.href = '/user/control-panel/add-'  + table_id.toLowerCase();
                        }
                    );
                    $('#ModalLong').modal('hide')
                }
                else {
                    $('form#req-form').append(
                        "<div class=\"alert alert-success\" role=\"alert\">" +
                        success.message + "\n" +
                        "</div>"
                    );
                    window.location.href = "/user/control-panel/" + success.redir_to;
                }
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