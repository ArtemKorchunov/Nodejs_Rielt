$('form#req-form').on('submit', function() {
    var model = $(this).hasClass('soldout') ? 'search-soldout': 'search-rented';
    var form = $(this);
    $('.error', form).html('');
    var btn_subm = $(":submit", form);
    btn_subm.text('Sending...');
    btn_subm.prop('disabled', true);
    var get_attrs = form.serialize();
    location.href = location.href + '?' + get_attrs;
    return false;
});