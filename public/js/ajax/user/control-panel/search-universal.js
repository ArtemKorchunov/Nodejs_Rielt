$('form#req-form').on('submit', function() {
    var model = $(this).hasClass('soldout') ? 'search-soldout': 'search-rented';
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
                if (success.type !== "soldout" && success.type !== 'rented') {
                    return;
                }
                var type = success.type;
                    var tr = "";
                    success.result.forEach(function (item) {
                        tr += "<tr id='" + type+ "-" + item._id + "\'>\n";
                        tr += "<td>" +
                            "<button type=\"button\" id=\"button-handshake-form\" class=\"btn btn-success btn-sm btn-handshake\" data-toggle=\"modal\"" +
                            "data-target=\"#ModalLong\">" +
                            "     <i class=\"fa fa-handshake-o\" aria-hidden=\"true\"></i>\n" +
                            "</button>" +
                            "</td>\n"
                        for (var key in item) {
                            if (key !== "_id") {
                                tr += "<td>" + item[key] + "</td>"
                            }
                        }
                        tr += "\n</tr>"
                    });
                    $('#tbody').append(tr)
                    var search_i = $('.fa-search');
                    search_i.removeClass('fa-search').addClass('fa-refresh');
                    var button_parent_search_i = search_i.parent();
                    button_parent_search_i.attr({'data-toggle': '', 'data-target': ''});
                    button_parent_search_i.click(function () {
                            var model = $(this).hasClass('soldout') ? 'search-soldout' : 'search-rented';
                            location.href = '/user/control-panel/' + model;
                    });
                    $('.btn-handshake').click(function () {
                        var parent_id = $(this).parent().parent()[0].id.split("-")[1];
                        $('.hidden-input-choose-customer').attr({'value':parent_id,'name': 'id'});
                        $('.hidden-input-create-customer').attr({'value':parent_id,'name' : 'deal_id'});
                        $('#wrapper-form').remove();
                        $('.modal-footer').attr({class: 'row justify-content-around'});

                        $('#universal-submit').text('Make a deal').attr({'class': 'btn btn-success','type':'button'}).click(function () {
                            $('#choose-customer-body').css('display','block');
                            $('#search-deal-body').css('display','none');
                        });
                        $('#universal-cancel').text('Create customer').attr({'class': 'btn btn-primary','data-dismiss':''}).click(function () {
                            $('#create-customer-body').css('display','block');
                            $('#search-deal-body').css('display','none');
                        });
                        $('#create-customer-cancel').click(function () {
                            $('#create-customer-body').css('display','none');
                            $('#search-deal-body').css('display','block');
                        });
                        $('#choose-customer-cancel').click(function () {
                            $('#choose-customer-body').css('display','none');
                            $('#search-deal-body').css('display','block');
                        })
                    });
                    $('#ModalLong').modal('hide')

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