$('form#req-form-customer').on('submit', function(table) {
    var form = $(this);
    var serialize = form.serialize();
    var tableName = $('.search-name').attr('id');
    serialize += "&solve_deal=" + tableName;
    $.ajax({
        url: "/user/control-panel/add-customer",
        method: "POST",
        data: serialize,
        statusCode: {
            200: function (success) {
                var tableName = $('.search-name').attr('id');
                var id = $('.hidden-input-choose-customer').val();
                $('#' + tableName.toLowerCase() + '-' + id).remove();
                $.ajax({
                    url: "/get-table/" + tableName + '/' + id,
                    method: "GET",
                    data: '',
                    statusCode: {
                        200: function (success) {
                            $('#ModalLong').modal('hide');
                            $('#date-contract').text(date_convert());
                            var service_contract = $('.service-contract');
                            var owner_contract = $('#owner-contract');
                            var customer_contract = $('#customer-contract');
                            var price_contract = $('#price-contract');
                            var address_contrast = $('#address-contract');
                            var deposit_contract = $('#deposit-contract');
                            var obj = success.obj[0];
                            if (success.type === "Soldout"){
                                service_contract.text('sell');
                            }
                            else {
                                service_contract.text('rent');
                            }
                            owner_contract.text(obj.owner_name);
                            customer_contract.text(obj.customer_name);
                            price_contract.text(obj.price + '$');
                            address_contrast.text(obj.address);
                            deposit_contract.text((obj.deposit ? obj.deposit : Number(obj.price) / 2) + '$');
                            setTimeout(function () {
                                window.print()
                            },250);
                        },
                        403: function (jqXHR) {

                        }
                    }
                });
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