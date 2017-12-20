(function() {

    var beforePrint = function() {
        $(".print-content").css('display','block');
        $(".inprint-vanish").css('display','none');
        //console.log('Functionality to run before printing.');
    };

    var afterPrint = function() {
        $(".print-content").css('display','none');
        $(".inprint-vanish").css('display','block');
        //console.log('Functionality to run after printing');
    };

    if (window.matchMedia) {
        var mediaQueryList = window.matchMedia('print');
        mediaQueryList.addListener(function(mql) {
            if (mql.matches) {
                beforePrint();
            } else {
                afterPrint();
            }
        });
    }
    window.onbeforeprint = beforePrint;
    window.onafterprint = afterPrint;
}());