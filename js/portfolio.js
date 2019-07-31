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

// thumbnail show/hide
checkVisibility('li.pf-item');
$(window).on('scroll resize', function() {
    checkVisibility('li.pf-item');
});
function checkVisibility(selector) {
    var scrollTop = $(document).scrollTop();
    $(selector).each(function() {
        var $selector = $(this);
        var minScroll = $selector.offset().top - $(window).height();
        var maxScroll = $selector.offset().top + $selector.outerHeight();
        if (scrollTop < minScroll) {
            if ($selector.hasClass('down') !== true) {
                $selector.removeClass('show up');
                $selector.addClass('down');
            }
        } else if (scrollTop > maxScroll) {
            if ($selector.hasClass('up') !== true) {
                $selector.removeClass('down show');
                $selector.addClass('up');
            }
        } else {
            if ($selector.hasClass('show') !== true) {
                $selector.removeClass('down up');
                $selector.addClass('show');
            }
        }
    });
}

// layer popup
function openLayerPopup(selector, returnElement) {
    // 필요요소 추가 및 창 표시
    $(selector).prepend('<div id="layer-mask" tabindex="0"></div>').append('<a href="#" class="return"></a>').attr({'tabIndex': 0}).css({'display': 'block'});
    
    //포커스 이동 및 차단
    $(selector).trigger('focus');
    $(selector).find('a.return').on('focus', function() {
        $(selector).trigger('focus');
    });
    $('body').css({'overflow': 'hidden'});  // 본문 스크롤 차단
    
    // 창닫기
    $('#layer-mask').on('click', function() {
        $(selector).find('a.close').trigger('click')
    });
    $(selector).find('a.close').one('click', function() {
        $(returnElement).trigger('focus');
        $('#layer-mask').remove();
        $(selector).find('a.return').remove();
        $(selector).removeAttr('tabIndex').css({'display': 'none'});
        $('body').css({'overflow': 'initial'});  // 본문 스크롤 초기화
    });
}