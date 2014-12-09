jQuery(function($){
  $('.overview').expander({
    slicePoint: 500,
    expandText: 'Show More',
    userCollapseText: 'Show Less',
    expandSpeed: 0,
    collapseSpeed: 0
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
        bottom: 0
      }
    });
  })();
  
  (function booking_widget(){
    
    function pad(n) {return (n<10 ? '0'+n : n); }
    
    function BookingWidget( $el ) {
      this.$el = $el;
      this.$content = this.$el.find('.booking-widget-content');
      this.tmpl = {
        book: Handlebars.compile( $('[data-booking-panel="book"] .panel-tmpl').html() )
      };
      this.init();
    }
    
    $.extend( BookingWidget.prototype, {
      
      bind : function(fn){
        var _this = this;
        return function(){
          return fn.apply(_this, arguments);
        }
      },
      
      init : function(){
        this.initEvents();
        this.initPicker();
      },
      
      slideToPanel : function(name, dir){
        var $to = this.$el.find('[data-booking-panel='+name+']'),
            $from = this.$el.find('.booking-panel.active'),
            $content = this.$content
            
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
        });
      },
      
      initEvents : function(){
        this.$el.on('click', '[data-toggle="booking-widget"]', this.bind(this.toggleWidget));
        this.$el.on('click', '[data-booking-slide]', this.bind(this.onSlideClick));
        this.$el.on('click', '[data-action="book"]', this.bind(this.onBookClick));
        this.$el.on('submit', '[data-action="login"]', this.bind(this.onLogin));
      },
      
      onLogin : function(e){
        e.preventDefault();
        var $form = $(e.currentTarget);
        TAN.user.authenticate(
          $form.find('[name=username]').val(),
          $form.find('[name=password]').val()
        ).done( function(success){
          
        });
      },
      
      onSlideClick : function(e){
        
        e.preventDefault();
        
        var $e = $(e.currentTarget),
            to = $e.data('bookingSlide'),
            dir = $e.data('bookingSlideDirection')
        
        this.slideToPanel(to, dir);
      },
      
      onBookClick : function(e){
        var $btn = $(e.currentTarget),
            _this = this
            
        TAN.user.isLoggedIn()
          .done(function(result){
            if ( !result ) {
              _this.slideToPanel('login', true);
            }
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
          onSelect: this.bind(this.onSelectDate)
        });
      },
      
      onSelectDate : function(date){
        this.date = date;
        this.populateBook();
        this.slideToPanel('book', true);
      },
      
      populateBook : function(){
        var rooms = this.$picker.data('room-availability'),
            dateParts = this.date.split('-'),
            from = new Date(dateParts[0],dateParts[1]-1,dateParts[2]),
            to = new Date(dateParts[0],dateParts[1]-1,dateParts[2])
            
        to.setTime(to.getTime() + 1000 * 60 * 60 * 24 * 7 );
        var vars = {
          rooms: rooms[this.date],
          dates: $.datepicker.formatDate('mm/dd/yy', from)+' - '+$.datepicker.formatDate('mm/dd/yy', to)
        };

        this.$el.find('[data-booking-panel="book"] .panel-content')
          .html( this.tmpl.book(vars) );
        
      }
      
    });
    
    window.bookingWidget = new BookingWidget($('.booking-widget'));
  })();
  
});