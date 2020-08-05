$.fn.clicktoggle = function (a, b) {
    return this.each(function () {
        var clicked = false;
        $(this).click(function () {
            if (clicked) {
                clicked = false;
                return b.apply(this, arguments);
            }
            clicked = true;
            return a.apply(this, arguments);
        });
    });
};

function fadeelmt(etrigger, elmt, docbot) {
    if (elmt.hasClass('fadein')) {
        var eleoffset = (etrigger.offset().top);
        if (docbot > eleoffset)
            elmt.velocity({
                opacity: 1,
                translateY: 0
            }, {duration: 350, easing: 'linear'});
    }
}

function fadeelmt2(etrigger, elmt, docbot) {
    if (elmt.hasClass('fadein2') || elmt.hasClass('fadein3')) {
        var eleoffset = (etrigger.offset().top) - 50;
        if (docbot > eleoffset)
            elmt.velocity({
                opacity: 1,
                translateX: 0,
                translateY: 0
            }, {duration: 350, easing: 'linear'});
    }
}

$(window).load(function() {
        // Mobile handlings
    var isMobile = false,
        compatErr = false,
        // Responsible handlings
        mobileScrolling = false,
        resizeWidth = 780,
        winWidth = $(window).width(),
        winHeight = $(window).height(),
        // Color handling
        // Colors pre
        b_night = '#353535',
        m1_night = '#000000',
        m2_night = '#021435',
        // Colors post
        bc_day = '#00B9FE',
        m1_day = '#9E7748',
        m2_day = '#795028',
        sun_day = '#FFF103',
        cloud_day = '#FFFFFF',
        // Colors constant
        jqt_color = '#000000',
        // SVG animatingvar m1len = $('.mountains-1').get(0).getTotalLength() - 1000;
        m2len,
        sunlen,
        cloudlen,
        jqt_jlen,
        jqt_elen,
        jqt_slen,
        jqt_qlen,
        jqt_ilen,
        jqt_nlen,
        birdL,
        birdR,
        moonLen;

    /* check mobile */
    if ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        isMobile = true;
    }

    if (isMobile) {
        $('.project-asset').removeClass('h-link');
    }

    // Scrolling down subtle fade-ins (fade them out here)
    $('.fadein').each(function() {
        $(this).velocity({
            translateY: 70
        },0);
    });
    $('.fadein2').each(function() {
        $(this).velocity({
            translateX: -100,
            translateY: 200
        },0);
    });
    $('.fadein3').each(function() {
        $(this).velocity({
            translateX: 100,
            translateY: 200
        },0);
    });

    try{
        m1len = $('.mountains-1').get(0).getTotalLength() - 1000;
        m2len = $('.mountains-2').get(0).getTotalLength() - 1000;
        sunlen = $('.sun-1').get(0).getTotalLength();
        cloudlen = $('.cloud-1').get(0).getTotalLength();
        jqt_jlen = $('.jqt-j').get(0).getTotalLength();
        jqt_elen = $('.jqt-e').get(0).getTotalLength();
        jqt_slen = $('.jqt-s').get(0).getTotalLength();
        jqt_qlen = $('.jqt-q').get(0).getTotalLength();
        jqt_ilen = $('.jqt-i').get(0).getTotalLength();
        jqt_nlen = $('.jqt-n').get(0).getTotalLength();
        birdL = $('.bird-left-1').get(0).getTotalLength();
        birdR = $('.bird-right-1').get(0).getTotalLength();
        moonLen = $('.moon-1').get(0).getTotalLength();

    }
    catch (err) {
        compatErr = true;
    }

    /* timing */

    mttime = 800;
    mttime2 = 1200;
    mttype = 'easeInCubic';
    mttype2 = 'easeOutCubic';

    /* functions */
    function pathIn(elmt, len, color) {
        if (compatErr)
            elmt.fadeIn(mttime);
        else{
            elmt.velocity({
                strokeDasharray: len,
                strokeDashoffset: len,
            },0)
            .fadeIn(0)
            .velocity({
                strokeDashoffset: 0
            }, {duration: mttime, easing: mttype })
            .velocity({
                fill: color
            }, {duration: mttime2, easing: mttype2 });
        }
    }

    function pathIn2(elmt, len) {
        if (compatErr)
            elmt.fadeIn(mttime);
        else{
            elmt.velocity({
                strokeDasharray: len,
                strokeDashoffset: len,
            },0)
            .fadeIn(0)
            .velocity({
                strokeDashoffset: 0
            }, {duration: mttime, easing: mttype });
        }
    }

    pathIn($('.mountains-1'), m1len, m1_day);
    pathIn($('.mountains-2'), m2len, m2_day);
    pathIn($('.sun-1'), sunlen, sun_day);
    pathIn($('.cloud-1'), cloudlen, cloud_day);
    pathIn($('.jqt-j'), jqt_jlen, jqt_color);
    pathIn($('.jqt-s'), jqt_slen, jqt_color);
    pathIn($('.jqt-e'), jqt_elen, jqt_color);
    pathIn($('.jqt-q'), jqt_qlen, jqt_color);
    pathIn($('.jqt-i'), jqt_ilen, jqt_color);
    pathIn($('.jqt-n'), jqt_nlen, jqt_color);
    pathIn2($('.bird-left-1'), birdL);
    pathIn2($('.bird-right-1'), birdR);
    setTimeout(function () {
        $('.jqtext2nd').velocity({
            scaleX: 0.9,
            scaleY: 0.9
        },0)
        .velocity({
            color: '#000000',
            opacity: 1,
            scaleX: 1,
            scaleY: 1
        },{duration: mttime2, easing: mttype2});
    },mttime);



    /* cloud shift */
    function cloudShift() {
        if (!mobileScrolling)
            $('.cloud').velocity('stop').velocity({
                translateX: (Math.random()-0.5)*30,
                translateY: (Math.random()-0.5)*30
            }, { duration: 3000});
    }
    cloudShift();
    setInterval(cloudShift,2000);

    /* bird flap */
    var flapTime = 1000;
    var flapDist = 4;
    var flapDeg = '4deg';
    var flapUType = 'easeInQuad';
    var flapDType = 'easeOutQuad';
    function birdFlap() {
        if (!mobileScrolling) {
            $('.bird-left').velocity({
                rotateZ: flapDeg,
                translateY: flapDist
            },{ duration: flapTime, easing: flapUType})
            .velocity({
                rotateZ: '-'+flapDeg,
                translateY: -flapDist
            },{ duration: flapTime, easing: flapDType});
            $('.bird-right').velocity({
                rotateZ: '-'+flapDeg,
                translateY: flapDist
            },{ duration: flapTime, easing: flapUType})
            .velocity({
                rotateZ: flapDeg,
                translateY: -flapDist
            },{ duration: flapTime, easing: flapDType});
        }
    }
    birdFlap();
    setInterval(birdFlap, flapTime*2);

    /* mobile navigation magic */
    setTimeout(function () {
        if (isMobile || ($(window).width() < resizeWidth)) {
            $('.burger-icon, .mobile-navbar').velocity({
                opacity: 1
            },{duration: mttime2, easing: mttype2, visibility: 'visible'});
            $('.navigation').velocity({
                opacity: 1
            },{duration: mttime2, easing: mttype2});
        }
        else{
            $('.burger-icon, .mobile-navbar').velocity({
                opacity: 1
            },{duration: mttime2, easing: mttype2});
            $('.navigation').velocity({
                opacity: 1
            },{duration: mttime2, easing: mttype2, visibility: 'visible'});
        }
    },mttime);

    var burger = true;
    $('.burger-icon').mousedown(function () {
        if (burger)
            $(this).velocity('finish').velocity({
                scaleX: 0.85,
                scaleY: 0.85
            }, 50);
    });
    $(document).on('mouseup',function () {
        if (burger)
            $('.burger-icon').velocity({
                scaleX: 1,
                scaleY: 1
            }, 50);
    });

    var bar2offset = $('.bar2').offset();
    var bar2top = bar2offset.top - $(window).scrollTop();
    var bar2left = bar2offset.left;
    var bar2right = bar2offset.right;
    var btime = 600;
    var btype = 'easeOutQuad';
    $('.navigation-mobile').velocity({
        rotateZ: '180deg'
    },0);
    var animating = false;
    $('.burger-icon').click(function () {
        if (animating)
            return;
        animating = true;
        if (burger) {
            burger = false;
            $('.bar2').velocity({
                translateX: -0.35*winWidth,
                translateY: 0.20*winHeight,
                width: '500%',
                height: '100%',
                rotateZ: '-160deg'
            },{duration: btime, easing: btype})
            .velocity({
                translateX: -winWidth + 33+ 17,
                translateY: -bar2top,
                width: winWidth,
                height: winHeight,
                rotateZ: '-180deg'
            }, {duration: 250, easing: 'easeInCubic'});

            $('.bar1').velocity({
                backgroundColor: '#98E587',
                translateX: '15%',
                rotateZ: '45deg'
            }, {duration: btime, easing: btype});
            $('.bar3').velocity({
                backgroundColor: '#98E587',
                translateX: '15%',
                rotateZ: '-45deg'
            }, {duration: btime, easing: btype});
            $(this).velocity({
                backgroundColorAlpha: 0,
            },{duration: btime, easing: btype});
            setTimeout(function () {
                $('.navigation-mobile').velocity({
                    opacity: 1
                }, {duration: 100, visibility: 'visible', complete: function() {animating = false;}});
            }, btime + 250);
        }
        else{
            burger = true;
            $('.bar2').velocity({
                translateX: -0.35*winWidth,
                translateY: 0.20*winHeight,
                width: '500%',
                height: '100%',
                rotateZ: '-160deg'
            }, {duration: btime/2, easing: btype})
            .velocity({
                translateX: 0,
                translateY: 0,
                width: '100%',
                height: '20%',
                rotateZ: '0deg'
            }, {duration: 250, easing: 'easeInCubic', complete: function() {animating = false;}});
            $('.bar1, .bar3').velocity('reverse',
                {duration: btime/2, easing: btype});
            $('.burger-icon').velocity({
                backgroundColorAlpha: 0,
            },{duration: btime/2, easing: btype});
            $('.navigation-mobile').velocity({
                opacity: 0
            }, {duration: 100, visibility: 'hidden'});
        }
    });


/* navigation magic */
var docViewTop = $(window).scrollTop();
var winHeight = $(window).height();
if (!isMobile && $(window).width() > resizeWidth) {
    if ((winHeight-docViewTop) < 70) {
        $('.grass').addClass('grass-post');
        $('.grass-night').velocity('finish').addClass('grass-post2');
        $('.nav-button').addClass('nav-button-post');
    }
    else{
        $('.grass').removeClass('grass-post');
        $('.grass-night').velocity('finish').removeClass('grass-post2');
        $('.nav-button').removeClass('nav-button-post');
    }
}

/* logo magic */
function logomagic() {
    $('.shield-l').velocity({
        opacity: 0
    },{duration: 2000})
    .velocity('reverse',{duration:200, easing: "easeInCubic"});
}

/* mobile scroll magic */
if (isMobile) {
    function mobileBounce() {
        $('.mobile-arrow').velocity({
            translateY: -5,
            boxShadowY: 15,
            boxShadowBlur: 10
        }, 1000)
        .velocity('reverse',1000);
    }

    setTimeout(function () {
        $('.mobile-arrow').velocity({
            opacity: 1,
            translateY: -5,
            boxShadowY: 15,
            boxShadowBlur: 10
        },{duration: 1000, display: "block",})
        .velocity({
            translateY: 5,
            boxShadowY: 10,
            boxShadowblur: 5
        }, {duration: 1000, complete: function () {mobileBounce(); setInterval(mobileBounce,2000);}});
    },mttime);

    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();
    if (docViewTop === 0)
        $('body').css('overflow','visible');

    $('.mobile-arrow').click(function () {
        if (mobileScrolling)
            return;

        $('body').css('overflow','hidden');
        var inc = 0.05;
        var inctime = 50;
        mobileScrolling = true;

        setTimeout(function () {
            $('.section1').velocity(
                "scroll",
                {duration: 750, easing: "easeInCubic", complete: function () {mobileScrolling = false; $('body').css('overflow','visible');}});
        },((1/inc)*inctime)*1);

        var amtScrl = 0;


        var i = setInterval(function () {

            $('.moon').css('opacity',1);

            $('.landing-night, .grass-night, .mountains-1-night, .mountains-2-night').velocity({
                opacity: amtScrl*2
            },0);



            $('.sun').velocity({
                translateY: Math.pow(amtScrl,2)*1.6*winHeight,
                translateX: (Math.pow(amtScrl+1,0.1)-1)*14*winWidth
            },0);

            $('.cloud').velocity('stop').velocity({
                opacity: 1-(amtScrl*6),
                translateX: (amtScrl/4)*winWidth
            },0);

            var moonY = -0.95*Math.sin((amtScrl*(Math.PI)*0.4)+0.8)*winHeight;
            var moonX = (Math.pow(amtScrl+1,0.1)-1)*6*winWidth;
            $('.moon').velocity({
                translateY: moonY,
                translateX: moonX
            },0);

            amtScale = amtScrl*5;
            amtScale = amtScale > 1 ? 1 : amtScale;
            $('.birds').velocity({
                scale: -amtScale + 1,
                translateY: amtScrl*10 + '%'
            },0);

        amtScrl += inc;
        if (amtScrl > 1)
            clearInterval(i);
    }, inctime);
    });
}

/* scroll magic */
function scrollmagic() {
    var docViewTop = $(window).scrollTop(),
        docViewBottom = docViewTop + $(window).height(),
        winHeight = $(window).height(),
        winWidth = $(window).width(),
        winHeight2 = winHeight - 70,
        amtScrl = (docViewBottom-winHeight)/winHeight;

    if (!isMobile && $(window).width() > resizeWidth) {
        if ((winHeight-docViewTop) < 70) {
            $('.grass').addClass('grass-post');
            $('.grass-night').velocity('finish').velocity({opacity:1},0).addClass('grass-post2');
            $('.nav-button').addClass('nav-button-post');
        }
        else{
            $('.grass').removeClass('grass-post');
            $('.grass-night').velocity('finish').removeClass('grass-post2');
            $('.nav-button').removeClass('nav-button-post');
        }
    }

    if ( $(window).width() < resizeWidth) {
        if ((winHeight-docViewTop) < 70) {
            $('.mobile-navbar').addClass('mobile-navbar-post');
        }
        else{
            $('.mobile-navbar').removeClass('mobile-navbar-post');
        }
    }

    if ((amtScrl <= 1) && !mobileScrolling && (winHeight-docViewTop) > 70 && !mobileScrolling) {

        if (amtScrl > 0)
            $('.moon').css('opacity',1);
        else
            $('.moon').css('opacity',0);

        $('.landing-night, .grass-night, .mountains-1-night, .mountains-2-night').velocity({
            opacity: amtScrl*2
        },0);


        $('.jqlogo').velocity({
            opacity: 1 - amtScrl
        },0);

        $('.sun').velocity({
            translateY: Math.pow(amtScrl,2)*1.6*winHeight,
            translateX: (Math.pow(amtScrl+1,0.1)-1)*14*winWidth
        },0);

        $('.cloud').velocity('stop').velocity({
            opacity: 1-(amtScrl*6),
            translateX: (amtScrl/4)*winWidth
        },0);

        var moonY = -0.9*Math.sin((amtScrl*(Math.PI)*0.4)+0.8)*winHeight;
        var moonX = (Math.pow(amtScrl+1,0.1)-1)*6*winWidth;
        $('.moon').velocity({
            translateY: moonY,
            translateX: moonX
        },0);

        amtScale = amtScrl*5;
        amtScale = amtScale > 1 ? 1 : amtScale;
        $('.birds').velocity({
            scale: -amtScale + 1,
            translateY: amtScrl*10 + '%'
        },0);
}
else{
    $('.jqlogo').velocity({
        opacity: 1
    },0);
}

fadeelmt($('.howdy-big-text'),$('.howdy'), docViewBottom);
$('.third').each(function () {
    fadeelmt($(this),$(this), docViewBottom);
});
$('.project-asset-l').each(function () {
    fadeelmt2($(this),$(this).parent(), docViewBottom);
});
$('.project-asset-r').each(function () {
    fadeelmt2($(this),$(this).parent(), docViewBottom);
});
}

$(window).on("scroll", scrollmagic);
scrollmagic();

/* resize shenanigans */
function navresize() {
    winWidth = $(window).width();
    winHeight = $(window).height();
    var bar2offset = $('.bar2').offset();
    var bar2left = bar2offset.left;
    var bar2right = bar2offset.right;
    if (!burger) {
        $('.bar2').velocity({
            width: winWidth,
            height: winHeight,
            translateX: -winWidth+17+33
        },0);
    }
    if (!isMobile) {
        if ($(window).width() < resizeWidth) {
            $('.navigation').velocity({opacity:0},{duration:0,visibility: 'hidden'});
            $('.burger-icon, .mobile-navbar').velocity({opacity:1},{duration:0,visibility: 'visible'});
            $('.grass').removeClass('grass-post');
            $('.grass-night').velocity('finish').removeClass('grass-post2');
            $('.nav-button').removeClass('nav-button-post');
        }
        else{
            $('.navigation').velocity({opacity:1},{duration:0,visibility: 'visible'});
            $('.burger-icon, .mobile-navbar').velocity({opacity:0},{duration:0,visibility: 'hidden'});
            $('.grass').addClass('grass-post');
            $('.grass-night').velocity('finish').addClass('grass-post2');
            $('.nav-button').addClass('nav-button-post');
        }
        scrollmagic();
    }
}
$(window).resize(navresize);


/* PROJECT ANIMATIONS */
var protime = 500;
var protype = 'easeOutCubic';
function hoverin() {
    $(this).find('img').velocity('stop').velocity({
        scaleX: 1.2,
        scaleY: 1.2
    }, {duration: protime, easing: protype});
    $(this).find('.asset-zoom').velocity('stop').velocity({
        backgroundColorAlpha: 1,
        opacity: 1,
        scaleX: 1.1,
        scaleY: 1.1
    }, {duration: protime, easing: protype, visibility: 'visible' });
    $(this).find('.zoom-box').velocity('stop').velocity({
        scaleX: 0.8,
        scaleY: 0.8
    }, {duration: protime, easing: protype});
}

function hoverout() {
    $(this).find('img').velocity('stop').velocity({
        scaleX: 1,
        scaleY: 1
    }, {duration: protime, easing: protype});
    $(this).find('.asset-zoom').velocity('stop').velocity({
        backgroundColorAlpha: 0,
        opacity: 0,
        scaleX: 1,
        scaleY: 1
    }, {duration: protime, easing: protype, visibility: 'hidden'});
    $(this).find('.zoom-box').velocity('stop').velocity({
        scaleX: 1,
        scaleY: 1
    }, {duration: protime, easing: protype});
}

if (isMobile) {
    $('.project-asset').clicktoggle(hoverin, hoverout);
    $('.projects, .project, .project-title, .project-date').click(function(e) {
        if (e.target !== this)
            return;
        $('.project-asset').each(function () {
            if ($(this).find('.asset-zoom').css('opacity') == 1)
                $(this).click();
        });
    });
}
else{
    $('.project-asset').hover(hoverin, hoverout);
}


/* HIDDEN LINKS */
$('.h-link').click(function (e) {
    e.stopPropagation();
    $(this).find('a')[0].click();
});

/* EMAILING */
$('.form-name').focus(function () {
    $('.name-label').css('color','#09B300');
});
$('.form-name').blur(function () {
    $('.name-label').css('color','#454545');
});

$('.form-email').focus(function () {
    $('.email-label').css('color','#09B300');
});
$('.form-email').blur(function () {
    $('.email-label').css('color','#454545');
});

$('.form-message').focus(function () {
    $('.message-label').css('color','#09B300');
});
$('.form-message').blur(function () {
    $('.message-label').css('color','#454545');
});


/* SCROLLING */
var stime = 700;
var stime2 = 1000;
var stype = 'easeOutQuad';
var stype2 = 'easeInCubic';

function dolanding() {
    $('.section1').velocity("scroll",{
        duration: stime2, easing: stype2
    });
}

$('.nav-about').click(function () {
    $('body').css('overflow','visible');
    if ($(window).scrollTop() === 0) {
        dolanding();
    }
    else{
        $('.section1').velocity("scroll",{
            duration: stime, easing: stype
        });
    }
});

$('.nav-projects').click(function () {
    $('body').css('overflow','visible');
    if ($(window).scrollTop() === 0) {
        dolanding();
        setTimeout(function () {
            $('.section2').velocity("scroll",{
                duration: stime, easing: stype
            });
        },stime2);
    }
    else{
        $('.section2').velocity("scroll",{
            duration: stime, easing: stype
        });
    }

});

$('.nav-contact').click(function () {
    $('body').css('overflow','visible');
    if ($(window).scrollTop() === 0) {
        dolanding();
        setTimeout(function () {
            $('.section3').velocity("scroll",{
                duration: stime, easing: stype
            });
        },stime2);
    }
    else{
        $('.section3').velocity("scroll",{
            duration: stime, easing: stype
        });
    }
});

/* FORM THINGS */
$('.submit-button').click(function () {
    $('.input-submit').click();
});

});
