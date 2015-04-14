/**
 * Copyright (c) 2011-2014 Chen Yu
 * Licensed under the MIT license
 */
(function(root, factory) {

  /* CommonJS */
  if (typeof exports == 'object')  module.exports = factory(require('jquery'))

  /* AMD module */
  else if (typeof define == 'function' && define.amd) define(['jquery'], factory)

  /* Browser global */
  else root.ScrollFixedHeader = factory(window.jQuery)
}
(this, function($) {
    var ScrollFixedHeader = function(el, options) {
        var offset = $(el).offset(),
            fixedCss = {
                position: 'fixed',
                top: 0,
                left: offset.left,
                width: '100%',
                zIndex: 1000
            };

        if (options && options.css) {
            fixedCss = $.extend({}, fixedCss, options.css);
        }

        $(window).scroll(function() {
            if ($('body').scrollTop() > offset.top){
                $(el).css(fixedCss);
            } else {
                $(el).css({
                    position: 'static',
                    left: 0,
                    backgroundColor: 'inherit'
                });
            }
        });
    };

    $.fn.scrollFixedHeader = function(options) {
        return this.each(function() {
            new ScrollFixedHeader(this, options);
        });
    };

    return ScrollFixedHeader;
}));