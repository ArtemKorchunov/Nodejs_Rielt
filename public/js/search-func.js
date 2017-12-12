(function () {
    var refresh  = $('.fa-refresh');
    if (refresh[0]) {
        var button_parent_search_i = refresh.parent();
        button_parent_search_i.attr({'data-toggle': '', 'data-target': ''});
        button_parent_search_i.click(function () {
            var model = $(this).hasClass('Soldout') ? 'search-soldout' : 'search-rented';
            location.href = '/user/control-panel/' + model;
        });
    }
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
})();