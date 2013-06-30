/*!
 * WYde Ninja Display Module
 * version 4.5.0.0
 *
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 */

(function($) {

$.extend($.fn.classfunc,{
/**
 * ajaxGet : get a content throught ajax, and replace selector content with it. If applied on input, or select, send the value through url (url += name=value).
 * apply on : input, select
 * [url] url to request
 * [selector] selector to update with content received from url
 * [event] (optional) trigger ajaxGet on a specific event 
 */
	ajaxGet: function(url,selector,event) {
		var fn = function() {
			var InputVal = $(this).val();
			var InputName = $(this).attr('name');
			var theUrl = url;
			if (InputVal!='' && InputVal!=null && InputName!='') {
				theUrl += url.indexOf('?')==-1 ? '?' : '&';
				theUrl += InputName+'='+InputVal;
			}
			$.ajax({
				url: theUrl,
				success: function(data) {
					var Element = selector ? $(selector).empty() : undefined;
	   				$(data).appendTo(Element).EvalClass();
				},
  			error: function(jqXHR, textStatus, errorThrown) {
  			    if (Options.toggleWaitClass.length > 1) {
  					$(Options.toggleWaitClass[0]).removeClass(Options.toggleWaitClass[1]);
  				}
  				switch(textStatus) {
  					case 'timeout':
  						alert('The server is not responding, please try again later');
  						break;
  					case 'error':
  						alert('Unknown error : '+errorThrown);
  						break;
  				}
  			}
			});
		};
    event ? $(this).bind(event, fn) : fn();
	},

/**
 *  add a dynamic google map window to the html tag, centered on the address specified in a sub node having a "address" class.
 */
	GoogleDynamicMap: function() {
		var container = $('<div class="MapDialog"></div>').appendTo($(this));
		var address = $(this).find('.address').text();
		$(this).bind('click', function(event) {
			var geocoder = new google.maps.Geocoder();
			geocoder.geocode({'address': address},
				function(results, status) {
					if (status == google.maps.GeocoderStatus.OK && results.length > 0) {
						container.empty();
		    			var map = new google.maps.Map(container.get(0), {
							zoom: 15,
							center: results[0].geometry.location,
							mapTypeId: google.maps.MapTypeId.ROADMAP
						});
						var marker = new google.maps.Marker({
							map: map, 
					    	position: results[0].geometry.location,
					    	title: address
					    });
						container.dialog({
							position: ['center', 'middle'],
							title: 'Google Map',
							width: 800,
							height: 600,
							modal: true,
							resize: function(event, ui) {
								google.maps.event.trigger(map, 'resize');
							}
						});
						google.maps.event.trigger(map, 'resize');
						map.setCenter(results[0].geometry.location);
					}
				}
			);
		});
	},

/**
 * treeView : display tree
 * apply on : ul
 */ 
	treeview: function() {
		var Options = $(this).ClassArgs();
		$(this).treeview(Options);
	},
/**
 * 
 */
	modalOn: function(event, action) {
		$(this).bind(event, function() {
			var dialog = $(this).parents('.modal:eq(0)');
			if (dialog.length > 0) {
				dialog.modal(action);
			}
		});
	},
/**
 * dialog : build a dialog box (see documentation on  http://jqueryui.com/demos/dialog/)
 * 			all boolean options are false by default, unless option name is specified in class (boolean argument not allowed for autoOpen, closeOnEscape, draggable, modal, resizable, stack, bgiframe)
 * 			the position option needs two arguments (not an array of two strings)  
 * example : <div class="dialog autoOpen width(100) position('middle','top')" title="hello">hello world !</div>
 * apply on : all containers (div, span, etc...)
 */ 
	dialog: function() {
		var Options = $(this).ClassArgs();
		var Default = {
			buttons: {},
			position: ['center', 'middle']
		};
		Options = $.extend(Default, Options);
		$(this).dialog(Options);
	},
/**
 * openDialog : open the dialog
 * [event] (optionnal, default=null) if specified, bind action with event
 * [selector] (optionnal, default=null) jQuery selector to select the dialog (no comma allowed!)
 * apply on : all clickable element
 */ 
	openDialog: function(event,selector) {
		var fn = function() {
			$(selector).dialog('open');
			return false;
		};
		event ?  $(this).bind(event, fn) : fn();		
	},
/**
 * closeDialog : close the dialog
 * [event] (optionnal, default=null) if specified, bind action with event 
 * [selector] (optionnal, default=null) jQuery selector to select the dialog (no comma allowed!)
 * apply on : all clickable element
 */ 
	closeDialog: function(event,selector) {
		var fn = function() {
			if (selector)
				$(selector).dialog('close');
			else
				$(this).parents('.dialog').dialog('close');
			return false;
		};
		event ?  $(this).bind(event, fn) : fn();
	},
/**
 * disableDialog : disable the dialog
 * [event] (optionnal, default=null) if specified, bind action with event  
 * [selector] (optionnal, default=null) jQuery selector to select the dialog (no comma allowed!)
 * apply on : all clickable element
 */ 
	disableDialog: function(event,selector) {
		var fn = function(event) {
			$(selector).dialog('disable');
			return false;
		};
		event ?  $(this).bind(event, fn) : fn();
	},
/**
 * enableDialog : enable the dialog specified in selector
 * [event] (optionnal, default=null) if specified, bind action with event   
 * [selector] (optionnal, default=null) jQuery selector to select the dialog (no comma allowed!)
 * apply on : all clickable element
 */ 
	enableDialog: function(event,selector) {
		var fn = function(event) {
			$(selector).dialog('enable');
			return false;
		};
		event ?  $(this).bind(event, fn) : fn();
	},
/**
 * toButtonPane : move the button to dialog button pane
 * apply on : button
 */ 
	toButtonPane: function() {	
		var buttons = $(this).parents('.dialog').dialog('option','buttons');
		var button = $(this);
		button.hide();
		buttons[$(this).htmlVal()] = function() {button.click();};
		$(this).parents('.dialog').dialog('option','buttons',buttons);	
	},
/**
 * defaultButton : if key "ENTER" is pressed on the form, click on the button
 * apply on : button
 */ 
	defaultButton: function() {
		var form = $(this).parents('form:eq(0)');
		form.keydown(function(event) {
			if (event.keyCode == '13') {
			  if (!$(':focus').is('textarea')) {
				  form.find('.defaultButton:eq(0)').click();
				}
			}
		});
	},
/**
 * noCloseCross : hide close top-right cross in dialog
 */
	noCloseCross: function() {
		$(this).parents(".ui-dialog:eq(0)").find(".ui-dialog-titlebar-close").hide();
	},
/**
 * tabs : display folders, for more info, see doc http://jqueryui.com/demos/tabs/
 * example :
 * 	<div class="tabs">
 * 		<ul>
 * 			<li><a href="#tab1">Hello world !</a></li>
 * 			<li><a href="#tab2">Hello 2</a></li>
 * 		</ul>
 * 		<div id="tab1">Hello world !</div>
 * 		<div id="tab2">Hello world 2 !</div>
 * apply on : div 
 */ 
	tabs: function() {
		var Options = $(this).ClassArgs();
		var Default = {
			fx: {
				opacity: 'toggle',
				duration: 'fast'
			}
		};
		Options = $.extend(Default, Options);
		$(this).tabs(Options);
	},
/**
 * accordion : display accordion, for more info, see doc http://jqueryui.com/demos/accordion/
 */ 
	accordion: function() {
		var Options = $(this).ClassArgs();
		var Default = {
			header: 'h4',
			autoHeight: false,
			collapsible: true
		};
		Options = $.extend(Default, Options);
		$(this).accordion(Options);
	},
/**
 * slider : create sliders, for more informations see doc http://jqueryui.com/demos/slider/
 * example : <div class="slider range min(0) max(3000) step(50) values(500,2500) sliderLink(#sliderInput1,#sliderInput2) sliderLink(#sliderSpan1,#sliderSpan2)"></div> 
 * apply on : div
 */ 
	slider: function() {
		var Options = $(this).ClassArgs();
		var Default = {
			animate: false
		};
		Options = $.extend(Default, Options);
		$(this).slider(Options);
	},
/**
 * sliderLink : link the slider value to an input
 * [selector1] link the first slider to the input specified by the selector1
 * [selector1] (optionnal, default=null) usefull only with the range option. Link the first slider to the input specified by the selector1
 */ 
	sliderLink: function(selector1,selector2) {
		var Options = $(this).ClassArgs();
		if (selector2 && $(this).hasClass('range')) {
			if (Options.values) {
				$(selector1).htmlVal(Options.values[0]);
				$(selector2).htmlVal(Options.values[1]);
			}
			$(this).bind('slide', function(event,ui) {
				$(selector1).htmlVal(ui.values[0]);
				$(selector2).htmlVal(ui.values[1]);
			});
		} else {
			if (Options.value)
				$(selector1).htmlVal(Options.value);
			$(this).bind('slide', function(event,ui) {
				$(selector1).htmlVal(ui.value);
			});
		}
	},
/**
 * buttonset : create a button set
 * apply on : any group of links or buttons 
 */ 
	buttonset: function() {
		var Options = $(this).ClassArgs();
		$(this).buttonset(Options);
	},
/**
 * button : create a button
 * apply on : any link or button 
 */ 
	button: function() {
		var Options = $(this).ClassArgs();
		$(this).button(Options);
	},
/**
 * icons : create icons in button, framework icons available here : http://jqueryui.com/themeroller/
 * [Primary] (optionnal, default=null) set primary icon class (null to unset)
 * [Secondary] (optionnal, default=null) set secondary icon class (null to unset)
 * apply on : any link or button with a button class
 */    
	icons: function(Primary, Secondary) {
		$(this).button('option','icons',{primary: Primary, secondary: Secondary} );
	},
/**
 * displayIconOnClick : display icon(s) when clicked, framework icons available here : http://jqueryui.com/themeroller/
 * [Primary] (optionnal, default=null) set primary icon class (null to remove)
 * [Secondary] (optionnal, default=null) set secondary icon class (null to remove)
 * apply on : any link or button with button class 
 */ 	
	displayIconOnClick: function(Primary, Secondary) {
		$(this).click(function() {
			$(this).button('option','icons',{primary: Primary, secondary: Secondary} );
		});
	},
/**
 * tableRow : apply alternate colors on each row
 * apply on : table
 */  
	tableRow: function() {
		$(this).find('tbody tr:odd').removeClass('even').addClass('odd');
		$(this).find('tbody tr:even').removeClass('odd').addClass('even');
	},
/**
 * redirectOnClick : redirect on url specified when clicked
 * [url] url to redirect on
 * apply on : all tags
 */  	
	redirectOnClick: function(url) {
		$(this).click(function() {
			$(location).attr('href',url);
		});
	},
/**
 * progressbar : display a progress bar
 * [value] integer from 0 to 100
 * apply on : div
 */ 	
	progressbar: function(value) {
		value = value || 0;
		$(this).progressbar({
			value: value
		});
	},
/**
 * UpdateOnFinalize : used only in conjuction of ninjaProgressBar: refresh the content specified by selector with the content at specified url
 * [UrlPercentProgress] url containing the html to update selector
 * [Selector] the content to update, if not set, dont do anything with url return
 * apply on : div[class=ninjaProgressBar]
 */	
	UpdateOnFinalize: function(Url, Selector) {	
	},
/**
 * triggerOnFinalize : used only in conjuction of ninjaProgressBar: trigger the specified event on the specified selector
 * [event] the event to trigger
 * [Selector] the element to be triggered
 * apply on : div[class=ninjaProgressBar]
 */	
	triggerOnFinalize: function(Url, Selector) {	
	},

/**
 * RefreshDelay : used only in conjuction of ninjaProgressBar: progress bar refresh delay in millisecond
 * [Delay] progress bar refresh delay in millisecond
 * apply on : div[class=ninjaProgressBar]
 */	
	RefreshDelay: function(Delay) {	
	},
/**
 * ninjaProgressBar : display a progress bar
 * [UrlPercentProgress] url returning an integer (the progress percentage).
 * [InitialProgress] If initial progress is already at 100, does not launch UpdateOnFinalize
 * apply on : div
 */	
	ninjaProgressBar: function(UrlPercentProgress, InitialProgress) {
		var Progress = 0;
		var Element = $(this);
		var timer;
		var Options, Default;
		Default = {
					triggerOnFinalize:false,
					UpdateOnFinalize:false,
					RefreshDelay:1000
		};
		Options = $(this).ClassArgs();
		Options = $.extend(Default, Options);
		Element.progressbar({value: 0});
		
		timer = $.timer(function() {
			$.ajax({
				url: UrlPercentProgress,
				success: function(data) {
					
					var percentage;
					Element.find('.ui-progressbar-value').removeClass('no-animation');

					if(Progress < 15){
						Element.find('.progression_rate').appendTo(Element.find('.ui-progressbar-value')).addClass('hidden');
						Element.find('.task_complete').appendTo(Element.find('.ui-progressbar-value')).addClass('hidden');
					}
					if (Progress >= 15 && Progress < 100)  {
						Element.find('.progression_rate').appendTo(Element.find('.ui-progressbar-value')).removeClass('hidden');
						Element.find('.task_complete').appendTo(Element.find('.ui-progressbar-value')).addClass('hidden');
					}
	   			
					percentage = Element.find('.percentage');
					;
					Element.progressbar({value: Math.min(data,100)});
					;
					Progress = data;
					
					if (percentage.length > 0) {
						percentage.text(' '+Progress+'%');
					} else if((Progress > 15)&&(Progress<100)) {
						$('<span class="percentage"> '+Progress+'%</span>').appendTo(Element.find('.progression_rate'));
					}
				
					if (Progress >= 100) {
						Element.find('.progression_rate').appendTo(Element.find('.ui-progressbar-value')).addClass('hidden');
						Element.find('.task_complete').appendTo(Element.find('.ui-progressbar-value')).removeClass('hidden');
						Element.find('.ui-progressbar-value').addClass('no-animation');
						if (Options.UpdateOnFinalize) {
							$.ajax({
								url: Options.UpdateOnFinalize[0],
								success: function(data) {
									$(Options.UpdateOnFinalize[1]).empty().append(data).EvalClass();
								}
							});
						}
						if (Options.triggerOnFinalize !== false) {
							$(Options.triggerOnFinalize[1]).trigger(Options.triggerOnFinalize[0]);
						}
					timer.stop();
					}
						
				}
			});	
		});
		timer.set({time: Options.RefreshDelay});
		timer.play();		
	},
/**
 * bindEvent : trigger the current event on the element targetSelector
 * [event] event to trigger on targetSelector
 * [targetSelector] the selector of the element to trigger
 * [targetEvent] (optional, default=event) the event triggered on targetSelector when event is triggered
 * apply on : all element 
 */   	
	bindEvent: function(event, targetSelector, targetEvent) {
    var targetEvent = targetEvent || event;
    $(this).bind(event, function() {
			$(targetSelector).trigger(targetEvent);
		});
	},
/**
 * fixedTableHeader : set table header always shown
 * [HighLightRowClass] (optional) Class to highlight a row on mouse over (default : selected) 
 * apply on : table 
 */   	
	fixedTableHeader: function(HighLightRowClass) {
	  var options = {
      highlightrow: true,
      highlightclass: HighLightRowClass?HighLightRowClass:'selected'
    };
    $(this).fixedtableheader(options);	    
	},
/**
 * removeOn : remove an element on a event
 * [event] when event occurs on element having this class, remove the selected element
 * [selector] (optional) remove the element pointed by the selector. If argument is empty, remove the element having this class
 * apply on : all clickable element
 */
	removeOn: function(event, selector) {
		$(this).bind(event, function() {
			if (selector) {
				$(selector).remove();
			} else {
				$(this).remove();
			}
		});
	},
/**
 * toggleDisableOn : disable or enable an input on an event
 * [event] when event occurs on input having this class, disable the selected input
 * [selector] (optional) disable the specified input. If argument is empty, disable the input having this class
 * apply on : input
 */
	toggleDisableOn: function(event, selector) {
		$(this).bind(event, function() {
			if ($(selector).attr('disabled')) {
				$(selector).removeAttr('disabled');
			} else {
				$(selector).toggleError().attr('disabled','disabled');
			}
		});
	},
/**
 * disableOn : disable an input on an event
 * [event] when event occurs on input having this class, disable the selected input
 * [selector] (optional) disable the specified input. If argument is empty, disable the input having this class
 * apply on : input
 */
	disableOn: function(event, selector) {
		$(this).bind(event, function() {
			$(selector).attr('disabled','disabled');
		});
	},
/**
 * enableOn : enable an input on an event
 * [event] when event occurs on input having this class, disable the selected input
 * [selector] (optional) disable the specified input. If argument is empty, disable the input having this class
 * apply on : input
 */
	disableOn: function(event, selector) {
		$(this).bind(event, function() {
			$(selector).removeAttr('disabled');
		});
	},
/**
 * remove : remove the current node. If a selector is specified, remove the selector and remove the class
 * [selector] (optional, default = this) jQuery selector (no comma allowed!)
 * apply on : all 
 */ 
	remove: function(selector) {
		if (selector) {
			$(this).removeClass("remove("+selector+")");
			$(selector).remove();
		} else {
			$(this).remove();
		}
	},
/**
 * toggleClass : toggle the specified class on the specified selector on the specified event
 * [theClass] the class to toggle
 * [selector] (optional, default=this)
 * [event] (optional, default=null) if not set, directly toggle class   
 * [toggleClassOnClickOutside] (optional, default=null) when set to true, toggles class on event and THEN an outside click toggles the class again, when set to false, click outside toggles class immediatly 
 */
  toggleClass: function(theClass,selector,event,toggleClassOnClickOutside) {
    var item = $(selector ? selector : this);
    if (event) {
      $(this).bind(event, function() {
        if (toggleClassOnClickOutside===true) {
		  item.click(function(intEvent) {
			  intEvent.stopPropagation();
		  });
		  $('html').one('click', function() {
			item.hasClass(theClass) ? item.removeClass(theClass) : item.addClass(theClass);
		  });
        }
        item.hasClass(theClass) ? item.removeClass(theClass) : item.addClass(theClass);
      });
	  if (toggleClassOnClickOutside===false) {
		item.click(function(intEvent) {
			  intEvent.stopPropagation();
		  });
		  $('html').one('click', function() {
			item.hasClass(theClass) ? item.removeClass(theClass) : item.addClass(theClass);
		  });
		  toggleClassOnClickOutside=true;
		}
    } else {
      item.hasClass(theClass) ? item.removeClass(theClass) : item.addClass(theClass);
    }
  }, 
/**
 * toggle : toggle the specified element
 * [selector] the element selector
 * [event] (optional, default=null) if set, toggle selector on a specified event. If not set, toggle immediately the selector (usefull when you get a content through ajax, and you want to interact with the rest of the page)  
 * apply on : all  
 */
 	toggle: function(selector,event) {
 	  if (event) {
 	    $(this).bind(event, function() {
        $(selector).toggle();
      });
    } else {
		  $(selector).toggle();
    } 
	},
/**
 * hide : hide the specified element
 * [selector] the element selector
 * [event] (optional, default=null) if set, hide selector on a specified event. If not set, hide immediately the selector (usefull when you get a content through ajax, and you want to interact with the rest of the page)  
 * apply on : all  
 */
 	hide: function(selector,event) {
 	  if (event) {
 	    $(this).bind(event, function() {
 	    	if (selector){
        		$(selector).hide();
       		}
      });
    } else {
		  $(selector).hide();
    } 
	},
/**
 * show : show the specified element
 * [selector] the element selector
 * [event] (optional, default=null) if set, show selector on a specified event. If not set, show immediately the selector (usefull when you get a content through ajax, and you want to interact with the rest of the page)
 * apply on : all 
 */
	show: function(selector,event) {
 	  if (event) {
 	    $(this).bind(event, function() {
        $(selector).hide();
      });
    } else {
		  $(selector).show();
		}
	}, 
/**
 * contentIn : move the current node content in the selector and remove the current node
 * [selector] jQuery selector (no comma allowed!)
 * [append] (optional, default=false) if true, append content to selector, else replace content in selector
 * apply on : all   
 */
	contentIn: function(selector,append) {
		append = append || false;
		if (!append)
			$(selector).empty();
		$(this).children().appendTo($(selector));
		$(this).remove();
	},
/**
 * replace : replace the selector node(s) with the current node
 * [selector] jQuery selector (no comma allowed!)
 * apply on : all 
 */
	replace: function(selector) {
		$(this).removeClass("replace("+selector+")");
		$(selector).replaceWith($(this));
	},
/**
 * valueIn : move the current value (or content if current node is not an input) to the selector input value and remove the node
 * [selector] jQuery selector (no comma allowed!)
 * apply on : all 
 */
	valueIn: function(selector) {
		$(selector).htmlVal($(this).htmlVal());
		$(this).remove();
	},
/**
 * trigger : trigger a specified event on a specified selector and remove the node 
 * [event] possible value : blur, click, ... 
 * [selector] (optional, default = this)
 * apply on : all 
 */
	trigger: function(event,selector) {
		selector = selector || this;
		$(selector).trigger(event);
		$(this).remove();
	},
/**
 * includeJs : include dynamically javascript in current html page 
 * [url] javascript url 
 * apply on : all 
 */
	includeJs: function(url) {
		if ($('script[src="'+url+'"]').lenght == 0)
			$('head').append('<script src="'+url+'"></script>');
	},
/**
 * includeCss : include dynamically css in current html page 
 * [url] css url 
 * [media] css media
 * apply on : all 
 */
	includeCss: function(url,media) {
		if ($('link[href="'+url+'"]').length == 0) {
			if (media) {
				$('head').append('<link href="'+url+'" rel="stylesheet" type="text/css" />');
			} else {
				$('head').append('<link href="'+url+'" rel="stylesheet" type="text/css" />');
			}
		}
	},
	
	modal: function() {
		$(this).on('shown', function() {
			$('input:text:visible:first', this).focus();
		});
	},

/**
 * dataTable : display fancy table with pagination, and other cool stuff.
 * doc at http://datatables.net
 * please include /js/DataTables/media/js/jquery.dataTables.min.js before use
 * please include /css/DataTables/jquery.dataTables.css
 */ 
	dataTable : function() {
		var Options = $(this).ClassArgs();
		
		//language
		var TextFile = "js/DataTables/media/i18n/english.txt";
		switch(  $.fn.LanguageCode ){
			case 'Fr' : 
				TextFile = "js/DataTables/media/i18n/frensh.txt";
		}
		
		//options
		var Default = {
			"oLanguage": {
                "sUrl": TextFile
            },
			"bPaginate": true,
			"bFilter": true,
			"bInfo": true,

		};
		Options = $.extend(Default, Options);
		$(this).dataTable(Options);	
	}
});




})(jQuery);