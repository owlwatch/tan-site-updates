jQuery(function($){
  (function general_display(){
    
    function triggerContentChange(){
      $(document).trigger('contentchange.expander');
    }
    
    $('.overview').expander({
      slicePoint: 500,
      expandText: 'Show More',
      userCollapseText: 'Show Less',
      expandSpeed: 0,
      collapseSpeed: 0,
      onAfterCollapse: triggerContentChange,
      onBeforeCollapse: triggerContentChange
    });
    
    $('.image-browser').on('click', '.thumbnails a', function(e){
      e.preventDefault();
      var i = $(e.currentTarget).data('image-index');
      var $browser = $(e.currentTarget).parents('.image-browser');
      $browser.find('.swiper-container').data().swiper.swipeTo( i );
    });
    
    $('.image-browser .swiper-container').data().swiper.addCallback('SlideChangeStart', function(swiper){
      var total = $('.image-browser .thumbnails a').length;
      var active = swiper.activeIndex - 1;
      if ( swiper.activeIndex > total ) {
        active = 0;
      }
      if ( swiper.activeIndex == 0 ) {
        active = total-1;
      }
      
      $('.image-browser .thumbnails a').removeClass('active');
      $('.image-browser .thumbnails a[data-image-index="'+active+'"]').addClass('active');
    });
  })();
  
  (function initpopup(){
    $('.image-browser').each(function(){
      var $browser = $(this),
          swiper = $browser.find('.swiper-container').data().swiper,
          $thumbnails = $browser.find('.thumbnails a'),
          images = []
      
      $thumbnails.each(function(){
        images.push({
          src: $(this).attr('href'),
          type: 'image'
        });
      });
      
      function getActiveIndex() {
        var total = $thumbnails.length;
        var active = swiper.activeIndex - 1;
        if ( swiper.activeIndex > total ) {
          active = 0;
        }
        if ( swiper.activeIndex == 0 ) {
          active = total-1;
        }
        return active;
      }
      
      $browser.find('.expand').magnificPopup({
        items: images,
        gallery : {
          enabled: true,
          //arrowMarkup: '<button title="%title%" type="button" class="fa fa-chevron-%dir%"></button>', // markup of an arrow button
        },
        zoom: {
          enabled: true,
          opener : function(){
            return $(swiper.activeSlide()).find('img');
          }
        },
        callbacks : {
          beforeOpen : function(){
            this._isOpen = false;
            this.goTo( getActiveIndex() );
          },
          
          open : function(){
            this._isOpen = true;
          },
          
          change : function(){
            if( this._isOpen ) swiper.swipeTo( this.index );
          }
        }
      });
    });
  })();
  
  (function fixed_sidebar(){
    $('.destination-sidebar').width( $('.destination-sidebar').width() );
    $('.destination-sidebar').affix({
      offset: {
        top: $('.destination-sidebar').offset().top,
        bottom: function(){
          return $('#cart-footer').is(':visible') ? $('#cart-footer').height() : 0
        }
      }
    });
    function check(){
      $('.destination-sidebar').affix('checkPosition');
    }
    $(document).on('shown.tab.bs', check);
    $(document).on('panelchange.booking.tan', check);
    $(document).on('contentchange.expander', check);
  })();
  
  (function booking_widget(){
    
    function pad(n) {return (n<10 ? '0'+n : n); }
    
    function BookingWidget( $el ) {
      this.$el = $el;
      this.$content = this.$el.find('.booking-widget-content');
      this.property = this.$el.data().property;
      this.tmpl = {
        book: Handlebars.compile( $('[data-booking-panel="book"] .panel-tmpl').html() )
      };
      this.init();
    }
    
    $.extend( BookingWidget.prototype, {
      init : function(){
        this.queue = [];
        this.initEvents();
        this.initPicker();
      },
      
      initEvents : function(){
        this.$el.on('click', '[data-toggle="booking-widget"]', $.proxy(this.toggleWidget, this));
        this.$el.on('click', '[data-booking-slide]',$.proxy(this.onSlideClick, this));
        this.$el.on('click', '[data-action="book"]', $.proxy(this.onBookClick, this));
        this.$el.on('submit', '[data-action="login"]', $.proxy(this.onLogin, this));
        $(window).on('auth.tan', $.proxy(this.addQueuedItem, this));
      },
      
      slideToPanel : function(name, dir){
        var $to = this.$el.find('[data-booking-panel='+name+']'),
            $from = this.$el.find('.booking-panel.active'),
            $content = this.$content,
            $el = this.$el
            
        if ($to.is($from) ) return;
        
        $content.height(this.$content.outerHeight());
        
        $from.css({
          position: 'absolute',
          top: 0,
          left: 0
        });
        
        $to.css({
          display: 'block',
          position: 'absolute',
          top: 0,
          left: dir?'100%':'-100%'
        });
        
        $content.animate({height: $to[0].scrollHeight}, 200, function(){
          $content.css({height:'auto'});
        });
        
        $from.animate({left: dir?'-100%':'100%'}, 200, function(){
          $from.hide();
          $from.removeClass('active');
        });
        
        $to.animate({left: 0}, 200, function(){
          $to.css({position:'relative'});
          $to.addClass('active');
          $el.trigger('panelchange.booking.tan');
        });
      },
      
      onLogin : function(e){
        e.preventDefault();
        var $form = $(e.currentTarget);
        TAN.Adapter.user.authenticate(
          $form.find('[name=username]').val(),
          $form.find('[name=password]').val()
        ).done( function(repsonse){
          if ( response && response.success ) {
            // don't need to do anything, the form should be replaced when the
            // 'auth.tan' event is triggered on the window.
            return;
          }
          if ( response.errors ) {
            alert( repsonse.errors.join('\n') );
          }
        }).fail(function(repsonse){
          alert('An error occurred');
        });
      },
      
      onSlideClick : function(e){
        
        e.preventDefault();
        
        var $e = $(e.currentTarget),
            to = $e.data('bookingSlide'),
            dir = $e.data('bookingSlideDirection')
        
        this.slideToPanel(to, dir);
      },
      
      getDates : function(){
        var
          dateParts = this.date.split('-'),
          from = new Date(dateParts[0],dateParts[1]-1,dateParts[2]),
            to = new Date(dateParts[0],dateParts[1]-1,dateParts[2])
        ;
        
        to.setTime(to.getTime() + 1000 * 60 * 60 * 24 * 7 );
        return [
          $.datepicker.formatDate('mm/dd/yy', from),
          $.datepicker.formatDate('mm/dd/yy', to)
        ].join(' - ');
      },
      
      onBookClick : function(e){
        var $btn = $(e.currentTarget),
            _this = this
            
        var $room = $btn.parent('.room');
        $room.data().index;
        
        var
          rooms = this.$picker.data('room-availability')[this.date],
          room = rooms[$room.data().index]
        ;
        
        this.queue.push({
          property    :this.property,
          room        :rooms[$room.data().index],
          vapEnabled  :$room.find('input[type=checkbox]').is(':checked'),
          date        :this.date,
          dates       :this.getDates(),
          $btn        :$btn
        });
            
        TAN.Adapter.user.isLoggedIn()
          .done(function(result){
            if ( !result ) {
              _this.slideToPanel('login', true);
            }
            else {
              // open the confirmation modal
              _this.addQueuedItem();
            }
          });
      },
      
      addQueuedItem : function(){
        if ( !this.queue.length ) return;
        this.slideToPanel('book', true);
        
        var
          $panel = this.$el.find('[data-booking-panel=book]'),
          item = this.queue.pop(),
          _this = this,
          $btn = item.$btn
        ;
        
        $panel.addClass('loading');
        var btnHTML = $btn.html();
        $btn.html('Booking...').addClass('disabled');
        
        delete item.$btn;
        
        TAN.cart().add( item, true )
          .always( function(){
            $panel.removeClass('loading');
            $btn.html(btnHTML).removeClass('disabled');
          })
          .fail( function(){
            alert('An error occurred. Please refresh this page and try again.')
          })
          .done( function(){
            _this.slideToPanel('book', true);
          });
      },
      
      toggleWidget : function(){
        var $content = this.$content,
            $el = this.$el
        
        if( $el.hasClass('open') ) {
          $content.animate({
            height: 0
          }, 200, function(){
            $el.removeClass('open');
          });
        }
        else {
          $el.addClass('open');
          $content.animate({
            height: $content[0].scrollHeight
          }, 200, function(){
            $content.css({height: 'auto'});
          });
        }
      },
      
      initPicker : function(){
        // lets create the date picker...
        var $picker = this.$el.find('.date-picker'),
            available = $picker.data('available-dates'),
            excess = $picker.data('excess-dates'),
            _this = this
            
        this.$picker = $picker;
        
        if ( !$picker.length ) return;
        
        var min = available[0] > excess[0] ? excess[0] : available[0];
        var max = available[available.length-1] > excess[excess.length-1] ?
                  available[available.length-1] : excess[excess.length-1];
        
        $picker.datepicker({
          dateFormat: 'yy-mm-dd',
          minDate: new Date( min ),
          maxDate: new Date( max ), 
          beforeShowDay: function(date){
            var test = date.getFullYear()+'-'+pad(date.getMonth()+1,2)+'-'+pad(date.getDate(),2);
            var enabled = ~$.inArray(test, available) || ~$.inArray(test, excess);
            return [enabled, ~$.inArray(test, excess) ? 'excess-inventory' : ''];
          },
          onSelect: $.proxy(this.onSelectDate, this)
        });
      },
      
      onSelectDate : function(date){
        this.date = date;
        this.populateBook();
        this.slideToPanel('book', true);
      },
      
      populateBook : function(){
        var
          rooms = this.$picker.data('room-availability'),
          vars = {
            rooms: rooms[this.date],
            dates: this.getDates()
          }
        ;

        this.$el.find('[data-booking-panel="book"] .panel-content')
          .html( this.tmpl.book(vars) );
        
      }
    });
    
    window.bookingWidget = new BookingWidget($('.booking-widget'));
  })();
  
});