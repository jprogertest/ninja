/*!
 * Wyde Ninja Display Module
 * version 4.6.0.0
 *
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 */

(function($) {

$.extend($.fn.classfunc,{
/**
 * lt : Less Than : compare argument with the object value
 * apply on : input 
 * [value] the value to compare
 * ex : <input type="text" class="lt(15)" /> 
 */ 
	lt: function(value) {
		$(this).bind('blur', function() {
			if ($(this).isInputUnavailable() || $(this).val() == '') return;
			if ($(this).val().toFloat() < value) return;
			$(this).toggleError($($.lang.mlValueShouldBeLessThan).translate(value));
		});
	},
/**
 * le : Less or Equal : compare argument with the object value
 * apply on : input 
 * [value] the value to compare
 */ 
	le: function(value) {
		$(this).bind('blur', function() {
			if ($(this).isInputUnavailable() || $(this).val() == '') return;
			if ($(this).val().toFloat() <= value) return;
			$(this).toggleError($($.lang.mlValueShouldBeLessThanOrEqual).translate(value));
		});
	},
/**
 * gt : Greater Than : compare argument with the object value
 * apply on : input 
 * [value] the value to compare
 */ 
	gt: function(value) {
		$(this).bind('blur', function() {
			if ($(this).isInputUnavailable() || $(this).val() == '') return;
			if ($(this).val().toFloat() > value) return;
			$(this).toggleError($($.lang.mlValueShouldBeGreaterThan).translate(value));
		});
	},
/**
 * ge : Greater or Equal : compare argument with the object value
 * apply on : input 
 * [value] the value to compare
 */ 
	ge: function(value) {
		$(this).bind('blur', function() {
			if ($(this).isInputUnavailable() || $(this).val() == '') return;
			if ($(this).val().toFloat() >= value) return;
			$(this).toggleError($($.lang.mlValueGreaterThanOrEqual).translate(value));
		});
	},
/**
 * ne : Not Equal : compare argument with the object value
 * apply on : input 
 * [value] the value to compare (no comma allowed!)
 */
	ne: function(value) {
		if ($(this).is('select')) {
		  $(this).find('option[value="'+value+'"]').remove();
    } else {
  		$(this).bind('blur', function() {
  			if ($(this).isInputUnavailable() || $(this).val() == '') return;
  			if ($(this).val() != value) return;
  			$(this).toggleError($($.lang.mlValueIsForbidden).translate(value));
  		});
  	}
	},
/**
 * num : is a numeric number positive/negative, float/integer
 * apply on : input 
 */ 
	num: function() {
		$(this).bind('blur', function() {
			if ($(this).isInputUnavailable() || $(this).val() == '') return;
			if ($(this).val().match("^[-]?[0-9]*[\.,]?[0-9]+$")) return;
			$(this).toggleError($($.lang.mlFormatShouldBeNumeric).translate());
			
		});
	},
/**
 * integer : is integer positive or negative
 * apply on : input 
 */ 
	integer: function() {
		$(this).bind('blur', function() {
			if ($(this).isInputUnavailable() || $(this).val() == '') return;
			if ($(this).val().match("^[-]?[0-9]+$")) return;
			$(this).toggleError($($.lang.mlFormatShouldBeInteger).translate());
		});
	},
/**
 * alphanum : is digits or alpha (without accent)
 * apply on : input 
 */  
	alphanum: function() {
		$(this).bind('blur', function() {
			if ($(this).isInputUnavailable() || $(this).val() == '') return;
			if ($(this).val().match("^[a-zA-Z0-9 ]+$")) return;
			$(this).toggleError($($.lang.mlFormatShouldBeAlphaNumeric).translate());
		});
	},
/**
 * alphanumAccent : is digits or alpha (with accent)
 * apply on : input 
 */  
	alphanumAccent: function() {
		$(this).bind('blur', function() {
			if ($(this).isInputUnavailable() || $(this).val() == '') return;
			if ($(this).val().match("^[a-zA-Z0-9ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÑÒÓÔÕÖØÙÚÛÜÝßàâáéãåæçèéêëìíîïñòóôõöùúûüÿ ]+$")) return;
			$(this).toggleError($($.lang.mlFormatShouldBeAphaNumericAccent).translate());
		});
	},
/**
 * alpha : is alpha (without accent)
 * apply on : input 
 */  
	alpha: function() {
		$(this).bind('blur', function() {	
			if ($(this).isInputUnavailable() || $(this).val() == '') return;
			if ($(this).val().match("^[a-zA-Z ]+$")) return;
			$(this).toggleError($($.lang.mlFormatShouldBeAlphabetic).translate());
		});
	},
/**
 * alphaAccent : is alpha (with accent)
 * apply on : input 
 */  
	alphaAccent: function() {
		$(this).bind('blur', function() {
			if ($(this).isInputUnavailable() || $(this).val() == '') return;
			if ($(this).val().match("^[a-zA-ZÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÑÒÓÔÕÖØÙÚÛÜÝßàâáéãåæçèéêëìíîïñòóôõöùúûüÿ ]+$")) return;
			$(this).toggleError($($.lang.mlFormatShouldBeAlphabeticAccent).translate());
		});
	},
/**
 * minLength : specify input min char number
 * [value] the min length
 * apply on : input
 */
  minLength: function(value) {
    $(this).bind('blur', function() {
		if ($(this).val().length < value) {
			$(this).toggleError($($.lang.mlYouMustFillWithAtLeastChars).translate(value));
		}
	});
  },
/**
 * maxLength : specify input max char number
 * [value] the max length
 * apply on : input
 */
  maxLength: function(value) {
    $(this).attr('maxlength',value);
  },
/**
 * disable : specify if input should be disabled
 * [bool] if set to true or not set, disable the input, else if set to false, enable the field 
 * apply on : input 
 */ 
  disable: function(bool) {
	if ($(this).is(':input')) {
		if (bool || bool == undefined) {
		  $(this).attr('disabled','disabled');
		} else {
		  $(this).removeAttr('disabled');
		}
	}
  },
/**
 * email : is an email format
 * apply on : input 
 */ 
	email: function() {
		$(this).bind('blur', function(e) {
			if ($(this).isInputUnavailable() || $(this).val() == '') return;
			if ($(this).val().match("^[a-zA-Z0-9\._-]+\@[a-zA-Z0-9\._-]+\.[a-zA-z0-9]{2,4}$")) return;
			$(this).toggleError($($.lang.mlValueIsNotMail).translate());
		});
	},
/**
 * nodigit : has no digit
 * apply on : input 
 */ 
	nodigit: function() {
		$(this).bind('blur', function() {
			if ($(this).isInputUnavailable() || $(this).val() == '') return;
			if ($(this).val().match("^[^0-9]+$")) return;
			$(this).toggleError($($.lang.mlValueShouldNotContainDigit).translate());
		});
	},
/**
 * required : let the user know when he miss a field
 * apply on : input 
 */
	required: function() {
		$(this).parents('dl:eq(0)').find('label[for="'+$(this).attr('id')+'"]').append('*');
		$(this).blur(function() {
			if ($(this).isInputUnavailable()) return;
			var val = $(this).htmlVal();
			if (val == '' || val == null || val == '--/--/----')
				$(this).toggleError($($.lang.mlFieldIsRequired).translate());
		});
    
	},
/**
 * inputValueOn : set value on input on event
 * [event] the event
 * [name] the input to set value on event
 * [value] the value to set on input
 */
	inputValueOn: function(event,name,value) {
		$(this).bind(event, function() {
			$('input[name="'+name+'"]').val(value);
		});
	},
/**
 * password : transform an text input in password input
 * apply on : input 
 */
	password: function() {
    var NewInput = $(this).clone();
    NewInput.attr('type','password').removeClass('password').EvalClass();
    $(this).hide().parent().append(NewInput);
    $(this).remove();
	},
/**
 * isDate : control if the field is filled with a valid date
 * [format] date format (optional), see doc on http://docs.jquery.com/UI/Datepicker/formatDate
 * apply on : input 
 */
	isDate: function(format) {
		var Options = $(this).ClassArgs();
		var format = format || $.lang.DateFormat;
		if (!Options.noPicker) {
  		var isInline = Options.isInline;
  		var input = $(this);
  		var Default = {
  			dateFormat: format,
        onSelect: function(dateText, inst) {
          input.toggleError();
  			  if (isInline) input.val(dateText);
  			},
  			changeMonth: true,
        changeYear: true,
  			yearRange:'1920:2020'
  		};
  		Options = $.extend(Default, Options);
  		if (isInline) {
  		  $(this).after('<div />');
        $(this).next().datepicker(Options);
      } else {
  		  $(this).datepicker(Options);
  		}
		}
		$(this).bind('blur',function() {
		  var format = $.lang.DateFormat;
		  var value = $(this).val();
			if ($(this).isInputUnavailable()) return;
      if (value == '' || value == '--/--/----') return;
			try {
				var dat = $.datepicker.parseDate(format, value);
			} catch(e) {
			}
			if (dat == null)
				$(this).toggleError($($.lang.mlNotValidDate).translate(format));
		});
	},
/**
 *  autoComplete : allow  you to build an autoCompleted field input.
 *  [SourceUrl] the url where to find data. Three parameters are given to the url :
 *    autoComplete : the name of the input
 *    autoCompleteValue : the characters typed by the user
 *    autoCompleteType : the optional parameter set 
 *  the url must return a JSON array containing the autocomplete fields displayed to the user. ex : ['toto','tata','titi']
 *  [Name] (optional) if set, autoCompleteName is set with Name, else, autoCompleteName is set with the name of the input
 *  [Type] (optional) if set, autoCompleteType is set with Type, else, autoCompleteType is not set
 *  apply on : input
 */ 
	autoComplete: function(SourceUrl,Name,Type) {
		var Options = $(this).ClassArgs();
		var TagName = Name ? Name : $(this).attr('name');
		var Default = {
			source: function(request, response) {
				var myData = {};
				if (Options.inputData) {
					myData[Options.inputData[0]] = Options.inputData[1];
				}
				myData.autoComplete = TagName;
				myData.autoCompleteValue = encodeURIComponent(request.term);
				myData.autoCompleteType = Type;
				$.ajax({
					url: SourceUrl,
					dataType: 'json',
					data: myData,
					success: function(data) {
						response(data);
					}
				});
			}
		};
		Options = $.extend(Default, Options);
		$(this).autocomplete(Options);
	},
/**
 *  addItemToPickerInput : add an item to refto presentor
 *  [InputPath] the input selector
 *  [InputName] the input name
 *  [ItemUId] unique id of the item   
 */
	addItemToPickerInput: function(InputPath,InputName,ItemUId) {
		$(this).bind('click', function(event) {
			var InputUl = $(InputPath).find('ul');
			if (InputUl.length == 0) {
				InputUl = $('<ul>').appendTo($(InputPath));		
			} else {
				if (! $(InputPath).hasClass('MultiItemInput')) {
					InputUl.find('li').remove();
				}
				var SameInput = InputUl.find('input[value='+ItemUId+']');
				if (SameInput.length > 0) {
					SameInput.parents('li:eq(0)').remove();
				}
			}
			$('<li class="button icons(ui-icon-circle-close) removeOn(click)">'+$(this).attr('title')+'<input type="hidden" name="'+InputName+'" value="'+ItemUId+'" /></li>').EvalClass().appendTo(InputUl);
		});
	},
/**
 * 
 */
	multiselect: function() {
		var Options = $(this).ClassArgs();
		var Default = {
				buttonClass: 'btn',
				buttonWidth: 'auto',
				buttonContainer: '<div class="btn-group" />',
				maxHeight: false,
				buttonText: function(options) {
					if (options.length == 0) {
						return $($.lang.mlNoneSelected).translate() + ' <b class="caret"></b>';
					} else if (options.length > 3) {
						return $($.lang.mlElementSelected).translate() + ' <b class="caret"></b>';
					} else {
						var selected = '';
						options.each(function() {
							selected+= $(this).text() + ', ';
						});
						return selected.substr(0, selected.length -2) + ' <b class="caret"></b>';
					}
				}
		};
		Options = $.extend(Default, Options);
		$(this).multiselect(Options);
	},
/**
 * toggleCheckboxOn : check specified checkboxes if unchecked, unchecked if checked.
 * [selector] the checkbox(es) selector
 * [event] (optional) the event, default = click
 * [check] (optional) if true, check specified checkbox(es), if false, uncheck specified checkbox(es), if not set, check all if first is unchecked, uncheck all if first is checked   
 * apply on : all html tag 
 */  	
	toggleCheckboxOn: function(selector, event, check) {
    event = event || 'click';
    $(this).bind(event, function() {
      var checkbox = $(selector).first();
      var myCheck = check == null ? checkbox.hasClass('ninja-checkbox-unchecked') : check;
      if (checkbox.is($(this))) myCheck = !myCheck; 
      if (myCheck) {
        $(selector).not($(this)).filter('.ninja-checkbox-unchecked').trigger('click');
      } else {
        $(selector).not($(this)).filter('.ninja-checkbox-checked').trigger('click');
      }
    });
  },
/**
 * ninjacheckbox : manage ninja checkbox
 * can be used with the following function to parameter the behaviour :  
 * 		propagateOn : check specified checkboxes as the current one. 
 *					  If none of the specified cheboxes checked, the current one is automatically unchecked.
 *					  If one of the specified cheboxes checked, the current one is automatically checked.
 * 			[selector] the selector used for checkboxes to update
 */  	
  ninjacheckbox: function() {
    var checkbox = $(this);
    var input = checkbox.find('input');
    if (!checkbox.hasClass('disable')) {
      if (checkbox.hasClass('ninjacheckbox-unchecked')) {
        input.val('0');
      } else {
        input.val('1');
      }
    }
    var JustDoIt = function(evt) {
    	evt.stopPropagation();
    	evt.preventDefault();
      if (!$(this).hasClass('disable')) {
        if ($(this).hasClass('ninjacheckbox-unchecked') || $(this).hasClass('ninjacheckbox-unchecked-disabled')) {
          $(this).removeClass('ninjacheckbox-unchecked').removeClass('ninjacheckbox-unchecked-disabled').addClass('ninjacheckbox-checked');
          input.val('1');
        } else {
          $(this).removeClass('ninjacheckbox-checked').removeClass('ninjacheckbox-checked-disabled').addClass('ninjacheckbox-unchecked');
          input.val('0');
        }
      }
    }
    $(this).click(JustDoIt);
  },
  
  SimpleWysiwyg: function() {
	  	var Options = $(this).ClassArgs();
		var Default = {
				theme: "modern",
				width: 1170,
				height: 1000,
				content_css : "/css/include.css",
				plugins: [
						"advlist autolink link image lists charmap print preview hr anchor pagebreak",
						"searchreplace wordcount visualblocks visualchars code insertdatetime media nonbreaking",
						"table contextmenu directionality emoticons paste textcolor filemanager", 
				        "paste save"
				],
				language: 'fr_FR',
				paste_as_text: true,
				image_advtab: true,
				toolbar1: "save | undo redo | styleselect | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link unlink anchor | image media | code"

		};
		//in httpd.conf remove # at line EnableSendfile off
		Options = $.extend(Default, Options);
		$(this).tinymce(Options);
  },
  
  
	SimpleWysiwyg_old: function() {
		var Options = $(this).ClassArgs();
		var Default = {
			// Location of TinyMCE script
			script_url : '/js/tinymce/jscripts/tiny_mce/tiny_mce.js',

			// General options
			theme : "advanced",
			plugins : "ccSimpleUploader,pagebreak,style,layer,table,save,advhr,advimage,advlink,emotions,iespell,inlinepopups,insertdatetime,preview,media,searchreplace,print,contextmenu,paste,directionality,fullscreen,noneditable,visualchars,nonbreaking,xhtmlxtras,template",

            // Theme options
            theme_advanced_buttons1 : "save,newdocument,|,bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,styleselect,formatselect,fontselect,fontsizeselect",
            theme_advanced_buttons2 : "cut,copy,paste,pastetext,pasteword,|,search,replace,|,bullist,numlist,|,outdent,indent,blockquote,|,undo,redo,|,link,unlink,anchor,image,cleanup,help,code,|,insertdate,inserttime,preview,|,forecolor,backcolor",
            theme_advanced_buttons3 : "tablecontrols,|,hr,removeformat,visualaid,|,sub,sup,|,charmap,emotions,iespell,media,advhr,|,print,|,ltr,rtl,|,fullscreen",
            theme_advanced_buttons4 : "insertlayer,moveforward,movebackward,absolute,|,styleprops,|,cite,abbr,acronym,del,ins,attribs,|,visualchars,nonbreaking,template,pagebreak",
            theme_advanced_toolbar_location : "top",
            theme_advanced_toolbar_align : "left",
            theme_advanced_statusbar_location : "bottom",
            theme_advanced_resizing : true,
            
            //ccSimpleUploader options
            relative_urls : false,
            file_browser_callback: "ccSimpleUploader",
			
			//content_css : "/js/bootstrap/css/bootstrap.min.css",
			content_css : "/css/include.css",
			width: '1170',
			height: '1000',
			
			extended_valid_elements : "hr[class|width|size|noshade]",
			language: $.lang.LanguageCode,
			
			imagemanager_contextmenu: false,
			convert_newlines_to_brs : true,
			entity_encoding : "named",
			force_p_newlines: true,
			paste_preprocess : function(pl, o) {
				var content = o.content;
				content = content
				.replace("\n","","g")
				.replace("</div>","</div>\n","g")
				.replace("</h1>","</h1>\n","g")
				.replace("</h2>","</h2>\n","g")
				.replace("</h3>","</h3>\n","g")
				.replace("</h4>","</h4>\n","g")
				.replace("</h5>","</h5>\n","g")
				.replace("</h6>","</h6>\n","g")
				.replace("</ul>","</ul>\n","g")
				.replace("</ol>","</ol>\n","g")
				.replace("</table>","</table>\n","g")
				.replace("<br>","<br>\n","g")
				.replace("<br />","<br />\n","g")
				.replace("<br/>","<br/>\n","g")
				.replace("</p>","</p>\n","g");
				content = $("<span>"+content+"</span>").text();
				content = "<p>"+content.replace("\n","</p><p>","g")+"</p>";
				o.content = content;
			}

		};
		//in httpd.conf remove # at line EnableSendfile off
		Options = $.extend(Default, Options);
		$(this).tinymce(Options);
		
	}, 
/**
 * clean : reset error when field changes. it has to be the first class in all dynamic input
 * apply on : all clickable element
 */
	clean: function() {
		$(this).toggleError();
		$(this).change(function(event) {
			$(this).toggleError();
		});
	} 
});

})(jQuery);