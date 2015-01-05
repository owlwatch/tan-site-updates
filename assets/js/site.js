Handlebars.registerHelper('attrs', function(options) {
	var attrs = [];
  for (var prop in options.hash) {
    attrs.push(
        Handlebars.escapeExpression(prop) + '="'
        + Handlebars.escapeExpression(options.hash[prop]) + '"');
  }
  return new Handlebars.SafeString(
    attrs.join(' ')
  );
});

jQuery(function($){
	
	if ( !window.TAN ) {
		window.TAN = {};
	}
	
	(function user_menu(){
		$(window).on('auth.tan', function(e, user){
			$('body').addClass('logged-in');
		});
		$(window).on('logout.tan', function(e, user){
			$('body').removeClass('logged-in');
		});
	})();
	
	(function logout(){
		$(document).on('click', '[data-action="logout"]', function(e){
			e.preventDefault();
			TAN.Adapter.user.logout();
		});
	})();
	
	(function loginForm(){
		$('#header').on('submit', '[data-action="login"]', function(e){
			e.preventDefault();
			var $form = $(e.currentTarget);
			TAN.Adapter.user.authenticate(
				$form.find('[name=username]').val(),
				$form.find('[name=password]').val()
			).done( function(response){
				if ( response && response.success ) {
					// don't need to do anything, the form should be replaced when the
					// 'auth.tan' event is triggered on the window.
					return;
				}
				if ( response.errors ) {
					alert( repsonse.errors.join('\n') );
				}
			}).fail( function(repsonse){
				alert( 'An error occurred!' );
			}).always( function(response){
				
			});
		});
	})();
	
  (function search_tool(){
    var open = false,
        contentHeight = null,
        $trigger = $('[data-toggle="search-tool"]'),
        $tool = $('.search-tool'),
        $wrap = $tool.find('.search-tool-wrap')
    
    function toggleSearchTool(){
      var h;
      if( !open ) {
        $tool.css({height: 0, display:'block'}).animate({
          height: $tool[0].scrollHeight
        }, 250, 'swing', function(){
          $tool.css({height: 'auto'});
        });
      }
      else {
        h = 0;
        $tool.css({height: $tool.height(), display:'block'}).animate({
          height: h
        }, 250, 'swing', function(){
          $tool.css({display:'none'});
        });
      }
      open = !open;
      $('body').toggleClass('search-tool-open');
    }
		
		window.TAN.toggleSearchTool = toggleSearchTool;
		window.TAN.closeSearchTool = function(){
			if ( open ) toggleSearchTool();
		}
    
    function onBeforeTabChange(e){
      
      $tool.css({height: $tool.height()});
    }
    
    function onTabChange(e){
      
      $tool.css({height: $tool.height(), display:'block'}).animate({
        height: $wrap[0].scrollHeight
      }, 200, 'swing', function(){
        $tool.css({height: 'auto'});
      });
    }
    
    $trigger.click(toggleSearchTool);
    $tool.find('[data-toggle="tab"]').on('show.bs.tab', onBeforeTabChange);
    $tool.find('[data-toggle="tab"]').on('shown.bs.tab', onTabChange);
    
  })();
  
	(function interactive_map(){
    var $maps = $('.interactive-map img');
		var ready = 0;
		var mapsCallbacks = [];
		TAN.onMapsReady = function(callback){
			if ( ready != $maps.length ) {
				mapsCallbacks.push( callback );
			}
			else {
				callback();
			}
		};
		function fireMapsReady() {
			if ( mapsCallbacks.length )  $.each(mapsCallbacks, function(i, cb){
				cb();
			});
		}
    $maps.each(function(){
			var $this = $(this);
			$this.mapster({
				fillOpacity: 0.4,
				fillColor: "d42e16",
				strokeColor: "3320FF",
				strokeOpacity: 0.8,
				strokeWidth: 2,
				render_select: { 
					fillOpacity: 0.8
				},
				stroke: true,
				scaleMap: true,
				isSelectable: true,
				isDeselectable: false,
				singleSelect: true,
				mapKey: 'name',
				listKey: 'name',
				onClick: function (e) {
					window.location = this.href;
				},
				onConfigured : function(){
					ready++;
					if ( ready == $maps.length ) {
						fireMapsReady();
					}
				},
				showToolTip: false,
				toolTipClose: ["tooltip-click", "area-click"],
				areas: [{
					key: "western",
					fillColor: "b6e079",
					strokeColor: "6aaf05"
				},{
					key: "midWestern",
					fillColor: "fcd270",
					strokeColor: "f7af14"
				},{
					key: "northEast",
					fillColor: "ef9b17",
					strokeColor: "da5701"
				},{
					key: "gulfCoast",
					fillColor: "2b90b2",
					strokeColor: "015977"
				},{
					key: "midAtlantic",
					fillColor: "9e75bd",
					strokeColor: "551387"
				},{
					key: "SouthEast",
					fillColor: "98ddf6",
					strokeColor: "29b5e9"
				},{
					key: "HawaiiMexicoCaribbean",
					fillColor: "f87a73",
					strokeColor: "b80c01"
				}]
			});
		});

  })();
  
  (function date_picker(){
    
    function pad(n) {return (n<10 ? '0'+n : n); }
    
    var $picker = $('#search-tool-date .date-picker'),
        available_dates = $picker.data('available-dates');
		
    $picker.datepicker({
      minDate: new Date( available_dates[0] ),
      maxDate: new Date( available_dates[available_dates.length-1] ), 
      beforeShowDay: function(date){
        var test = date.getFullYear()+'-'+pad(date.getMonth()+1,2)+'-'+pad(date.getDate(),2);
        return ~$.inArray(test, available_dates) ? [true] : [false];
      },
      onSelect: function(date) {
				window.location = '/destinations/by-date#date='+date;
      }
    });

  })();
  
  (function sliders(){
    $('[data-component="swiper"]').each(function(){
      var config = $(this).data(),
					swiper = $(this).swiper(config);
					
			$(this).on('click', '[data-swiper-nav]', function(e){
				e.preventDefault();
				var dir = $(e.currentTarget).data('swiperNav'),
						fn = 'swipe'+dir.substr(0,1).toUpperCase()+dir.substr(1);
						
				swiper[fn]();
			});
    });
  })();
  
  (function zoom_popups(){
    $('[data-component="zoom-popup"]').magnificPopup({
      type: 'image',
      zoom: {
        enabled: true
      }
    })
  })();
  
  (function back_to_top(){
    $('.back-to-top').on('click', function(e){
      e.preventDefault();
      $.scrollTo(0, 200);
    });
  })();
	
	$('.tan-select').each(function(){
    var open = false,
        $select = $(this),
        originalHeight = $select.outerHeight();
				
		function clicklistener(e){
			if ( !$.contains($select[0],e.target) && !$select.is(e.target) ) {
				$select.find('.active-label').click();
			}
		};
    
		$select.data('originalText', $select.find('.active-label').text());
    $select.on('click', function(e){
			
      if ( !open ) {
        $select.stop();
        $select.addClass('open');
        $select.animate({height: $select[0].scrollHeight}, 200);
				
				// listen for clicks
				$(document).on('click', clicklistener);
      }
      else {
				if( !$(e.target).is('a,.active-label') ){
					return;
				}
				if( $(e.target).is('a') ) {
					$select.find('.active-label').text($(e.target).text());
				}
        $select.stop();
        $select.animate({height: originalHeight}, 200, function(){
          $select.removeClass('open');
        });
				$(document).off('click', clicklistener);
      }
      open = !open;
    })
  });
	
	(function tooltips(){
    $('body').tooltip({
      selector    :'[data-toggle="tooltip"]',
      container   :'body'
    });
  })();
	
	(function collapsibles(){
		$(document).on('show.bs.collapse hide.bs.collapse', '.panel-collapse', function(e){
			$(e.currentTarget).parents('.panel').first().toggleClass(
				'panel-open', e.type == 'show'
			)
		});
	})();
	
	(function imagemapster_ie10_fix(){
		$.mapster.AreaData.prototype.areas = function(){
			var i,result=[];
			for (i=0;i<this.areasXref.length;i++) {
				if ( this.owner.mapAreas[this.areasXref[i]] ) {
					result.push(this.owner.mapAreas[this.areasXref[i]]);
				}
			}
			return result;
		}
	})();
});