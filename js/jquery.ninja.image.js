/*!
 * WYde Ninja Image Module
 * version 1.0.0.0
 *
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 */

(function($) {

$.extend($.fn.classfunc,{
/**
 * crop : init input with coordinate in picture where to crop picture
 * [selectorX] the input selector storing the x axis
 * [selectorY] the input selector storing the y axis
 * [selectorW] the input selector storing the width
 * [selectorH] the input selector storing the height
 */
	crop: function(selectorX, selectorY, selectorW, selectorH) {
		var width;
		var height;
		var img = $(this);
		var Options = $(this).ClassArgs();
		var Default = {
			aspectRatio: 1
		};
		Options = $.extend(Default, Options);
		var execute = function(coords) {
			if (coords.w > 0 && coords.h) {
				$(selectorX).attr('value', coords.x);
				$(selectorY).attr('value', coords.y);
				$(selectorW).attr('value', coords.w);
				$(selectorH).attr('value', coords.h);
				if (Options.preview) {
					var previewContainer = $(Options.preview).parent();
					var rx = previewContainer.width() / coords.w;
					var ry = previewContainer.height() / coords.h;
					
					var cssProp = {
							width: Math.round(rx * img.width()) + 'px',
							height: Math.round(ry * img.height()) + 'px',
							marginLeft: '-' + Math.round(rx * coords.x) + 'px',
							marginTop: '-' + Math.round(ry * coords.y) + 'px'
					};
					$(Options.preview).css(cssProp);
				}
			}
		}
		Options.onChange = execute;
		Options.onSelect = execute;
		$(this).Jcrop(Options);
	},
	
	photoThumb: function() {
		var Options = $(this).ClassArgs();
		var Default = {
			social_tools:''
		};
		Options = $.extend(Default, Options);
		$(this).prettyPhoto();
	}
});




})(jQuery);