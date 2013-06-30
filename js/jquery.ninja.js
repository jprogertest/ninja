/*!
 * Wyde Ninja Core
 * version 4.6.0.0
 *
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 */

(function($) {
///////////////////////// init default arrays //////////////////////////////////
if (!$.fn.classfunc)
	$.fn.classfunc = {};
if (!$.lang)
	$.lang = {};
////////////////// fill classfunc with core functions //////////////////////////

$.extend($.fn.classfunc,{
/**
 * LanguageCode : set default language to user messages
 * apply on : all 
 * [value] the language defined in jquery.ninja.language.js, default value = 'En'
 */
	LanguageCode: function(value) {
		$.lang.LanguageCode = value;
	},
/**
 * DateFormat : set default date format
 * apply on : all 
 * [value] the default date format : can be 'm_d_y' or 'd_m_y'
 */
	DateFormat: function(value) {
		if (value == 'm_d_y') {
			$.lang.DateFormat = 'mm/dd/yy';
		} else if (value='d_m_y') {
			$.lang.DateFormat = 'dd/mm/yy';
		} else {
			$.lang.DateFormat = 'mm/dd/yy';
		}
	},
/**
 * toggle : when element is clicked, display argument if argument is hidden, hide if displayed
 * apply on : all clickable element
 * [selector] selector of the element to toggle (for ex : #id_of_element) 
 */
	toggle: function(selector) {
		$(this).bind('click', selector, function(event) {
			$(event.data).toggle();
		});
	}
});
$.lang.DateFormat = 'mm/dd/yy';
$.lang.LanguageCode = 'en';

///////////////////////// extend jquery with wyde core module //////////////////
$.extend($.fn,{
	ClassError: 'error',
	ClassInfo: 'info',
	ClassHelper: 'help-inline',
	ClassValid: 'valid',
	
/**
 * isInputUnavailable : test if the input unavailable to the user = is visible and is enabled
 * return a boolean 
 */ 
	isInputUnavailable: function() {
    var Visible = $(this).is(':visible');
    var Disabled = $(this).attr('disabled') == 'disabled' || $(this).hasClass('disabled');
    var InError = $(this).hasClass($(this).ClassError); 
		return !Visible || Disabled  || InError;
	},
/**
 * enable : enable field (use this for maximum compatibility)
 */
	enableForm: function() {
		$(this).removeAttr('disabled');
		$(this).removeClass('disabled');
	},
/**
 * disabled : disable field (use this for maximum compatibility)
 */
	disableForm: function() {
		$(this).attr('disabled','disabled');
		$(this).addClass('disabled');
	},
/**
 * toggleError : Make error appear or disappear
 * [msg] if null remove error message, else set error specified
 * chainable 
 */ 
	toggleError: function(msg) {
		this.each(function(i) {
			if (msg) {// set error message
				if (!$(this).isInputUnavailable()) {
					var controlGroup = $(this).parents('.control-group:eq(0)');
          var controls = $(this).parents('.controls:eq(0)');
          if (controlGroup.length == 0) {
            if (controls.length == 0) {
              controls = $('<div></div>').addClass('controls');
              $(this).wrap(controls);
              controls = $(this).parents('.controls:eq(0)');
            }
            controlGroup = $('<div></div>').addClass('control-group').addClass($(this).ClassError);
            var label = $(this).parents('label:eq(0)');
            if (label.length > 0) {
              if (!label.hasClass('control-label'))
                label.addClass('control-label');
              label.wrap(controlGroup);
            } else {
              controls.wrap(controlGroup);
            }
			    } else {
  					if (!controlGroup.hasClass($(this).ClassError)) {
              controlGroup.addClass($(this).ClassError);
            }
          }
          if (controls.find("span:contains('"+msg+"')").length == 0)
            controls.append($('<span></span>').addClass($(this).ClassHelper).append(msg));
        }
			} else {// remove error message
				$(this).parents('.control-group').find('span[class=\''+$(this).ClassHelper+'\']').remove();
				$(this).parents('.control-group').removeClass($(this).ClassError);
			}
		});
		return this;
	},
/**
 * EvalClass : eval a jquery HTML class functions
 * [context] allow you to make your own classfunc as execution context 
 * chainable
 */
	EvalClass: function(context) {
		context = context || $(this).classfunc;
		this.find('*[class]').andSelf().each(function(i) {
			if ($(this).attr('class')) {
				var ClassNames = $(this).attr('class').split(new RegExp("[ ]+","g"));
				for(var c=0;c<ClassNames.length;c++) {
					var ClassName = ClassNames[c];
					if (ClassName != "") {
						var myArgs = ClassName.split(new RegExp("[(),]+","g"));
						var myFunc = myArgs.shift();
						if (myArgs[myArgs.length-1] == '')
							myArgs.pop();
						myArgs.parseType();
						if (context[myFunc]) {
								//alert(myFunc+' called on class="'+$(this).attr('class')+'"...');
							if (context[myFunc].apply($(this),myArgs) == false)
								break;
						}
					}
				}
			}
		});
		return this;
	},
/**
 * ClassArgs : get arguments of all classes 
 * return : object {class.[args]}
 */ 
	ClassArgs: function() {
		var ClassNames = $(this).attr('class').split(new RegExp("[ ]+","g"));
		var result = {};
		for(var c=0;c<ClassNames.length;c++) {
			var ClassName = ClassNames[c];
			var indexP = ClassName.indexOf('(');
			if (indexP == -1) {
				var myFunc = ClassName;
				var myArgs = [];
			} else {
				var myFunc = ClassName.substring(0,indexP);
				var myArgs = ClassName.substring(indexP+1,ClassName.length-1).split(new RegExp("[,]+","g"));
				myArgs.parseType();
			}
			switch(myArgs.length) {
				case 0:
					result[myFunc] = true;
					break;
				case 1:
					result[myFunc] = myArgs[0];
					break;
				default:
					result[myFunc] = myArgs;
			}
		}
		return result;
	},
	
	htmlVal: function(str) {
    // JPR $(this).text(str) is used to get a simple text in order to be used in inputSubmit
	// JPR if (str == null) { is necessary due to change in .val() and .text() behavior in jquery
		if (str == null) {
			if ($(this).is(':input'))
				return $(this).val();
			else
				return $(this).text();
		} else {
			if ($(this).is(':input'))
				return $(this).val(str);
			else
				return $(this).text(str);
		}
	},
	
	textVal: function(str) {
	// JPR if (str == null) { is necessary due to change in .val() and .text() behavior in jquery
		if (str == null) {
			if ($(this).is(':input'))
				return $(this).val();
			else
				return $(this).text();
		} else {
			if ($(this).is(':input'))
				return $(this).val(str);
			else
				return $(this).text(str);
		}
	},
/**
 * translate : translate an array in current language
 * [args] array of parameters to replace with {0}, {1}, {2}, etc... in translation 
 */ 
	translate: function(args) {
		var fn;
		var message = this[0][$.lang.LanguageCode.toUpperCase()];
		if (args !== undefined) {
			if (typeof args == 'object' && args.length) {
				fn = function(index) {
					for(var i=0;i<args.length; i++) {
						message = message.replace('{'+i+'}', args[i]);
					}
				}
			} else {
				fn = function(index) {
					message = message.replace('{0}',args);
				};
			}
			this.each(fn);
		}
		return message;
	},
	
/**
 * GetParamsFromList : produce jquery options from a list <dd></dd> with several levels
 * return : jquery options
 * example :
 * 	HTML <dl id = 'myParams'>
 * 	HTML 	<dt>title<dt><dd>'my title'</dd>
 * 	HTML 	<dt>yaxis<dt>
 * 	HTML 	<dd>
 * 	HTML 		<dl>
 * 	HTML 			<dt>pad<dt><dd>0</dd>
 * 	HTML 		</dl>
 * 	HTML 	</dd>
 * 	HTML </dl>
 * 	JAVASCRIPT var Params = $('#myParams').GetParamsFromList();
 * 	JAVASCRIPT Params -> {title : 'my title', yaxis: {pad : 0} }
 */ 
	GetParamsFromList : function(){
	
		var Childs =  $(this).children();
		var Result = {};
		for( var i=0; i < Childs.length; i+=2 ) {
			if ( $(Childs[i+1]).children().length == 0 ) {
				var myText = $(Childs[i+1]).text();
				var ParsedTD  = myText.parseType();
				Result[$(Childs[i]).text()] = ParsedTD;
			} else {
				Result[$(Childs[i]).text()] = $($(Childs[i+1]).children()[0]).GetParamsFromList();
			}
		}
		return Result;
	}
});
})(jQuery);
//////////////////////// set javascript core functions ///////////////////////// 

/**
 * toInt : convert to Int
 * return a number
 */ 
String.prototype.toInt = function() {
	var str = this;
	while(str.substring(0,1) == '0' && str.length > 1) {
		str = str.substring(1);
	}
	return parseInt(str);
};
/**
 * toFloat : convert to float
 * return a number 
 */ 
String.prototype.toFloat = function() {
	str = this.replace(",",".");
	while(str.substring(0,1) == '0' && str.length > 1 && str.substring(0,2) != '0.') {
		str = str.substring(1);
	}
	return parseFloat(str);
};
Number.prototype.toFloat = function() {
	return this;
};
/**
 * parseType : transform value in the corresponding type
 */ 
String.prototype.parseType = function() {
	switch(this.substring(0,1).toLowerCase()) {
		case '0':case '1':case '2':case '3':case '4':case '5':case '6':case '7':case '8':case '9':case '-':
			if (this.match("^[-]?[0-9]*[\.]?[0-9]+$"))
				return this.toFloat();
			break;
		case 'f':
			if (this.toLowerCase() == 'false')
				return false;
			break;
		case 't':
			if (this.toLowerCase() == 'true')
				return true;
			break;
		case 'n':
			if (this.toLowerCase() == 'null')
				return null;
			break;
	}
	return this.substring(0,this.length);
};
/**
 * parseType : transform values in associative array in the corresponding type
 */ 
Array.prototype.parseType = function() {
	for(var i=0;i<this.length;i++) {
		switch(this[i].substring(0,1).toLowerCase()) {
			case '0':case '1':case '2':case '3':case '4':case '5':case '6':case '7':case '8':case '9':case '-':
				if (this[i].match("^[-]?[0-9]*[\.]?[0-9]+$"))
					this[i] = this[i].toFloat();
				break;
			case 'f':
				if (this[i].toLowerCase() == 'false')
					this[i] = false;
				break;
			case 't':
				if (this[i].toLowerCase() == 'true')
					this[i] = true;
				break;
			case 'n':
				if (this[i].toLowerCase() == 'null')
					this[i] = null;
				break;
		}
	}
};
/////////////////// starts html class evaluation /////////////////////////////// 
$(document).ready(function() {
	$("*[class]").EvalClass();
	$('body').removeClass('loading');
});

$('body').addClass('loading');