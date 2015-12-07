/*!
 * scrollFixedHeader v1.0.2
 * https://github.com/ycscholes/scrollFixedHeader
 *
 * Copyright 2015 Chen Yu
 * Released under the MIT license
 *
 * Date: 2015-11-12
 */

(function(root, factory) {

  /* CommonJS */
  if (typeof exports == 'object')  
    module.exports = factory(require('jquery'));

  /* AMD module */
  else if (typeof define == 'function' && define.amd) 
    define(['jquery'], factory);

  /* Browser global */
  else 
    root.ScrollFixedHeader = factory(window.jQuery);
}
(this, function($) {
    var ScrollFixedHeader = function(el, options) {
        options = options || {};

        var $el = $(el),
            offset = $el.offset(),
            scrollWrapper = $(window),
            wrapper = $('body'),
            wrapperTop = 0,
            fixedCss = {},
            tempDom = $('<div>');

        if (options.wrapper) {
            wrapper = $(options.wrapper);
            scrollWrapper = wrapper;
            wrapperTop = wrapper.offset().top;
        }

        fixedCss = {
            position: 'fixed',
            top: wrapperTop,
            left: offset.left,
            width: $el.outerWidth(),
            zIndex: 1000
        };

        // Insert a equal dom before element to fixed blink issue
        tempDom.css({
            height: $el.outerHeight(),
            margin: $el.css('margin')
        });
        tempDom.hide();
        tempDom.insertBefore($el);

        if (options && options.css) {
            fixedCss = $.extend({}, fixedCss, options.css);
        }

        scrollWrapper.scroll(function() {
            if (wrapper.scrollTop() > offset.top - wrapperTop) {
                if (options.wrapper) {
                    fixedCss.top = wrapperTop - $('body').scrollTop();
                }

                $el.css(fixedCss);
                $el.addClass('sfh-scrolling');
                tempDom.show();
            } else {
                $el.css({
                    position: 'static',
                    left: 0,
                    backgroundColor: 'inherit'
                });
                $el.removeClass('sfh-scrolling');
                tempDom.hide();
            }
        });

        if (options.wrapper) {
            $(window).on('scroll', function() {
                if (wrapper.scrollTop() > offset.top - wrapperTop) {
                    $el.css('top', wrapperTop - $('body').scrollTop());
                }
            });
        }
    };

    $.fn.scrollFixedHeader = function(options) {
        return this.each(function() {
            new ScrollFixedHeader(this, options);
        });
    };

    return ScrollFixedHeader;
}));

// TODO: Optimize code