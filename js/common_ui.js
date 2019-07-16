// scroll (header, scroll down CSS)
function setScrollUI() {
    var scrollTop = $(document).scrollTop();

    if (scrollTop > 100) {
        $('#header section.header-top').addClass('on');
        $('.container').css({'display': 'none'});
    } else {
        $('#header section.header-top').removeClass('on');
        $('.container').css({'display': 'block'});
    }
}
// text animation
function setTextAnimation(selector, className) {
    var text = $(selector).text();
    var numText = text.length;
    var newHtml = '';
    var effectType = className;
    
    for (var i = 0; i < numText; i++) {
        if (text[i] === ' ') {
            newHtml += '<span class="blank"></span>';
        } else if (text[i] === ',') {
            newHtml += '<br>';
        } else {
            newHtml += '<span>' + text[i] + ' </span>';
        }
    }
    $(selector).html(newHtml);
    $(selector).find('span').each(function(i) {
        setTimeout(function() {$(selector).find('span:eq(' + i + ')').addClass(effectType);}, (i * 80));
    });
}