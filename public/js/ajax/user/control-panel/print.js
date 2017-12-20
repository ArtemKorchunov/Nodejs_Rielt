$('#print-deal-summary').click(function() {
    $.ajax({
        url: "/print/summary-deal",
        method: "POST",
        data: '',
        statusCode: {
            200: function (success) {
                success = JSON.parse(success);
                var th = "";
                var tr = "";
                for (var key in success[0]){
                    th += "\n<th>" + key + "</th>"
                }
                var tr_header = $('#tr-header');
                tr_header.children().remove();
                tr_header.append(th);
                success.forEach(function (item) {
                    tr += "\n<tr>";
                    for (var key in item){
                        tr += "<td>" + item[key] +  "</td>"
                    }
                    tr += "\n</tr>"
                });
                var tbody = $('#tbody');
                tbody.children().remove();
                tbody.append(tr);
                window.print();
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
                success = JSON.parse(success);
                var th = "";
                var tr = "";
                for (var key in success[0]){
                    th += "\n<th>" + key + "</th>"
                }
                var tr_header = $('#tr-header');
                tr_header.children().remove();
                tr_header.append(th);
                success.forEach(function (item) {
                    tr += "\n<tr>";
                    for (var key in item){
                        tr += "<td>" + item[key] +  "</td>"
                    }
                    tr += "\n</tr>"
                });
                var tbody = $('#tbody');
                tbody.children().remove();
                tbody.append(tr);
                window.print();
            },
            403: function (jqXHR) {

            }
        }
    });
    return false;
});
