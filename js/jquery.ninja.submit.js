/*!
 * Wyde Ninja Submit Module
 * version 4.6.0.0
 *
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 */

(function($) {

$.fn.ajaxfunc = {
  closeDialogOnResponse: false,
	displayResultOnDialog: false,
	updateWithResponse: null,
	redirectOnEmptyResponse: null,
	dismissOnError: false,
	toggleWaitClass:[],
	toggleStateClass:[],
	successOnResponse:'',
	resetForm: false,
	dataType: null,
	redirectOnResponse: null,
	beforeSubmit: function(arr, form, options) {
    form.block({message: null});
		if (this.toggleWaitClass.length > 1) {
			$(this.toggleWaitClass[0]).addClass(this.toggleWaitClass[1]);
		}
		switch(this.toggleStateClass.length) {
		  case 4:
		    $(this.toggleStateClass[0]).removeClass(this.toggleStateClass[3]);
		  case 3:
		    $(this.toggleStateClass[0]).removeClass(this.toggleStateClass[2]);
		  case 2:
        $(this.toggleStateClass[0]).addClass(this.toggleStateClass[1]);
		}
		if (this.dismissOnError === true) {
			var sel = form;
		} else if (this.dismissOnError) {
			var sel = $(this.dismissOnError);
		}
		if (sel) {
			sel.find("*[class]").blur();
			if (sel.find("."+$(this).ClassError).length > 0) {
				form.unblock();
				return false;
			}
		}
		return true;
	},
	success: function(responseText, statusText, jqXHR, form) {
	    if (responseText == '' && (this.redirectOnEmptyResponse == '' || this.redirectOnEmptyResponse == true)) {
    		window.location.reload();
			return;
	    } else if (this.redirectOnResponse != null && typeof this.redirectOnResponse == 'object') {
	    	if (this.redirectOnResponse[0] == responseText) {
	    		window.location = this.redirectOnResponse[1];
				return;
			}
	    } else if (typeof this.redirectOnResponse == 'string') {
			if (this.redirectOnResponse == responseText) {
				window.location.reload();
				return;
			}
	    }
	    if (form)
	    	form.unblock();
		if (this.toggleWaitClass.length > 1) {
			$(this.toggleWaitClass[0]).removeClass(this.toggleWaitClass[1]);
		}
		switch(this.toggleStateClass.length) {
		  case 4:
		    $(this.toggleStateClass[0]).removeClass(this.toggleStateClass[3]);
		  case 3:
		    if (this.successOnResponse == responseText) {
		      $(this.toggleStateClass[0]).addClass(this.toggleStateClass[2]);
		    }
		  case 2:
        $(this.toggleStateClass[0]).removeClass(this.toggleStateClass[1]);
		}
		if (this.updateFormWithResponse && form) {
			$(responseText).appendTo(form.empty()).EvalClass();
		} else if (this.updateWithResponse) {
			$(responseText).appendTo($(this.updateWithResponse).empty()).EvalClass();
		}
		if (this.triggerOnSuccess) {
			$(this.triggerOnSuccess[1]).trigger(this.triggerOnSuccess[0]);
	    }
    
	},
	
	error: function(jqXHR, textStatus, errorThrown) {
	  if (this.toggleWaitClass.length > 1) {
			$(this.toggleWaitClass[0]).removeClass(this.toggleWaitClass[1]);
		}
    switch(this.toggleStateClass.length) {
		  case 4:
		    $(this.toggleStateClass[0]).addClass(this.toggleStateClass[3]);
		  case 3:
		    $(this.toggleStateClass[0]).removeClass(this.toggleStateClass[2]);
		  case 2:
        $(this.toggleStateClass[0]).removeClass(this.toggleStateClass[1]);
		}
		switch(textStatus) {
			case 'timeout':
				alert('The server is not responding, please try again later');
				break;
			case 'error':
				alert(textStatus+' : '+jqXHR.status+'('+errorThrown+') '+jqXHR.responseText);
				break;
		}
    $('form').unblock();
	}
};


$.extend($.fn.classfunc,{
/**
 * dismissOnError : cancel submit when an input has failed validation
 * apply on : form submit item 
 */
dismissOnError: function(selector) {
    if ($(this).is('form')) {
      var form = $(this);
    } else {
      var form = $(this).parents('form:eq(0)');
    }
	if (selector) {
	  var sel = $(selector);
	} else {
	  var sel = form;
	}
	if (form) {
		form.bind('submit', function() {
			if (sel) {
				sel.find("*[class]").blur();
				if (sel.find(":input."+$(this).ClassError).filter(":visible").filter(":enabled").length > 0) {
					form.unblock();
					return false;
				}
				return true;
			}
		});
	}
},
/**
 * inputSubmitOn : submit form on specified event and optionaly insert an input name and value in request before submit
 * [event] (optional) event to bind on submit, default = click 
 * [name] (optional) name of the input inserted into the form before submit (if not specified, input not inserted into request)
 * [value] (optional) value of the input inserted into the form before submit (if not specified, take the content or the value)
 * apply on : all clickable element inside a form
 */
	inputSubmitOn: function(event, name, value) {
		$(this).bind(event ? event : 'click', function() {
			var myform = $(this).parents('form:eq(0)');
			if (myform.length == 0) return;
			if (name) {
				if (value == null) value = $(this).htmlVal();
				var myinput = myform.find(':input[name='+name+']');
				if (myinput.length > 0) {
					myinput.val(value);
					myform.submit();
				} else {
					myinput = $('<input type="hidden" name="'+name+'" value="'+(value ? value : '0')+'" />');
					myform.append(myinput);
					myform.submit();
				}
			} else {
				myform.submit();
			}
			return false;
		});	
	},
/**
 * inputSubmit : submit form on click and optionaly insert an input name and value in request before submit
 * [name] (optional) name of the input inserted into the form before submit (if not specified, input not inserted into request)
 * [value] (optional) value of the input inserted into the form before submit (if not specified, take the content or the value)
 * apply on : all clickable element inside a form
 */
	inputSubmit: function(name, value) {
		$(this).click(function() {
			var myform = $(this).parents('form:eq(0)');
			if (myform.length == 0) return;
			if (name) {
				if (value == null) value = $(this).htmlVal();
				var myinput = myform.find(':input[name="'+name+'"]');
				if (myinput.length > 0) {
					myinput.val(value);
					myform.submit();
				} else {
					myinput = $('<input type="hidden" name="'+name+'" value="'+(value ? value : '0')+'" />');
					myform.append(myinput);
					myform.submit();
				}
			} else {
				myform.submit();
			}
		});    	
	},
/**
 * inputAjaxSubmitOn : submit form asynchroneously and optionaly insert an input name and value in request before submit [can be used with the same functions as ajaxSubmit to parameter the behaviour on reponse]
 * [event] (optional) event to bind on submit, default = click 
 * [name] (optional) name of the input inserted into the form before submit (if not specified, input not inserted into request)
 * [value] (optional) value of the input inserted into the form before submit (if not specified, take the input value)
 * can be used with the following function to parameter the behaviour on response :  
 * 		closeDialogOnResponse : close the wrapping dialog box when response is matches the specified response
 * 			[response] (optional) if set, closes the wrapping dialog when response matches, if not set, closes the wrapping dialog when response is empty
 * 		displayResultOnDialog : display the result on dialog if the result is not empty
 * 		updateWithResponse : update with the result the selector. Note : the result is evaluated
 * 			[selector] the selector of the tag to update
 * 		updateFormWithResponse : update form with result 
 * 		redirectOnEmptyResponse : redirect with the specified url when the response is empty
 * 		 	[url] (optional) the url to redirect with, if not set, it reloads the current page
 * 		redirectOnResponse : redirect with the specified url if the response match the specified response
 * 		 	[response] the response to test
 * 		 	[url] (optional) the url to redirect with, if not set, it reloads the current page   
 * 		dismissOnError : prevent submit when any field in form is in error
 * 		 	[Boolean] default = false
 * 		toggleWaitClass : add the specified class to the specified selector before submit, and remove it after submit
 * 		 	[selector] the selector to add a class
 * 		 	[class] the class to toggle
 * 		toggleStateClass : add the specified class to the specified selector on specific states of the ajax submission
 * 		  [selector] the selector to add a class
 * 		  [classOnSubmit] the class to add to the selector during ajax submit, removed after submit
 * 		  [classOnSuccess] (optional) the class to add to the selector on ajax submit
 * 		  [classOnFailure] (optional) the class to add to the selector on ajax failure      
 * 		resetForm
 * 		  [boolean] default=false, reset form after submit
 * 		triggerOnSuccess : trigger an event on a specified selector on server response
 * 		  [event] the event to trigger (click)
 * 		  [selector] the selector to trigger 
 * apply on : all clickable element inside a form  
 */
	inputAjaxSubmitOn: function(event, name, value) {
		$(this).bind(event ? event : 'click', function() {
			var Options = $(this).ClassArgs();
			Options = $.extend({forceSync:true},$.fn.ajaxfunc,Options);
			var myform = $(this).parents('form:eq(0)');
			if (myform.length == 0) return;
			if (name) {
				var myinput = myform.find(':input[name='+name+']');
				if (myinput.length > 0)
					myinput.val(value ? value : myinput.htmlVal());
				else {
					Options.data = {};
					Options.data[name] = value?value:'0';
				}
			}
			myform.ajaxSubmit(Options);
			return false;
		});	
	},
	
	ajaxSendOn: function(theUrl, event) {
		$(this).bind(event ? event : 'click', function() {
			var Options = $(this).ClassArgs();
			Options = $.extend({
				forceSync:true,
				type:'POST'
			},$.fn.ajaxfunc,Options);
			$.ajax(theUrl, Options);				
		});
	},
/**
 * ajaxUpdateFormOnChange : automatically update form with ajax when the field changes  
 * this is ghost function, this function is removed server side and replaced server side by the following statement combination :
 * inputAjaxSubmitOn(theGoodEvent,UpdateForm) updateFormWithResponse
 * apply on : all fields  
 */  
  ajaxUpdateFormOnChange: function() {
  },  
/**
 * ajaxSubmit : ajax submit form
 * DEPRECATED : use inputAjaxSubmitOn instead      
 * apply on : form 
 */
	ajaxSubmit: function() {
		var Options = $(this).ClassArgs();
		Options = $.extend({},$.fn.ajaxfunc,Options);
		$(this).ajaxForm(Options);
	},
/**
 * disabledForm : disable field (use this for maximum compatibility)
 * apply on : input 
 */
 	disabledForm: function() {
 		$(this).disableForm();
	},
/**
 * enabledForm : enable field (use this for maximum compatibility)
 * apply on : input 
 */
 	enabledForm: function() {
 		$(this).enableForm();
	}

});

})(jQuery);
