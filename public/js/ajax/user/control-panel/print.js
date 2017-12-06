$('#print-deal-summary').click(function() {
    $.ajax({
        url: "/print/summary-deal",
        method: "POST",
        data: '',
        statusCode: {
            200: function (success) {

            },
            403: function (jqXHR) {

            }
        }
    });
    return false;
});
$('#print-amount-loc').click(function() {
    $.ajax({
        url: "/print/amount-loc",
        method: "POST",
        data: '',
        statusCode: {
            200: function (success) {

            },
            403: function (jqXHR) {

            }
        }
    });
    return false;
});
