window.TAN = window.TAN || {};
(function($){
  
  var Cart = function(){
    this.items = [];
    this.tmpl = {
      modalBody : Handlebars.compile($('#cart-modal .body-tmpl').html()),
      cartProperty : Handlebars.compile($('#cart-footer .property-tmpl').html()),
      viewAll : Handlebars.compile($('#cart-footer .view-all-tmpl').html())
    };
    Handlebars.registerPartial("property_modal", $("#cart-modal .property-tmpl").html());
    this.$cart = $('#cart-footer');
    this.$modal = $('#cart-modal');
    this.$modal.on('show.bs.modal', $.proxy(this.onShowModal, this));
    this.$cart.on('itemadd.cart.tan', $.proxy(this.onAdd, this));
    this.$cart.on('itemremove.cart.tan', $.proxy(this.onRemove, this));
    this.cartSwiper = this.$cart.find('.swiper-container').swiper({
      mode                :'horizontal',
      loop                :true,
      simulateTouch       :false,
      calculateHeight     :true,
      onSlideChangeStart  :$.proxy(this.onSlideChange, this)
    });
    $(window).on('scroll resize', $.proxy(this.fixCart, this) );
    this.$cart.on('click', '[data-nav]', $.proxy(this.onCartNavClick, this));
    this.sync();
    $('#cart-footer, #cart-modal').on('click', '[data-action="cancel"]', $.proxy(this.onCancelClick, this));
  };
  
  $.extend( Cart.prototype, {
    
    sync : function(){
      var
        _this = this
      ;
      
      TAN.Adapter.cart.sync()
        .done(function(items){
          _this.items = [];
          $.each(items, function(i, item){
            _this.push(item);
          });
        });
    },
    
    push : function(item){
      this.items.push( item );
      this.$cart.trigger('itemadd.cart.tan', [item]);
    },
    
    remove : function(item){
      var i = this.items.indexOf( item );
      if (i > -1) {
        this.removeAt( i );
      }
    },
    
    getActiveIndex : function() {
      var total = this.items.length;
      var active = this.cartSwiper.activeIndex - 1;
      if ( this.cartSwiper.activeIndex > total ) {
        active = 0;
      }
      if ( this.cartSwiper.activeIndex == 0 ) {
        active = total-1;
      }
      return active;
    },
    
    removeAt : function(index){
      var
        _this = this,
        response = $.Deferred()
      ;
      
      if ( index < this.items.length-1 ) {
        TAN.Adapter.cart.removeAt( index )
          .done(function( success ){
            if ( success) {
              _this.items.splice(index,1);
              _this.$cart.trigger('itemremove.cart.tan', index);
              response.resolve(index);
            }
            else {
              // there was an error
              response.reject();
            }
          })
          .fail(function(){
            repsonse.reject();
          });
      }
      
      return response.promise();
    },
    
    add : function(item, display_modal){
      
      var
        response = $.Deferred(),
        _this = this
      ;
      
      TAN.Adapter.cart.add( item )
        .done(function( success ){
          if ( success) {
            item.index = _this.items.length;
            if ( display_modal ) {
              _this.$modal.find('.modal-body').html( _this.tmpl.modalBody({
                highlight_property  :item,
                more_properties     :_this.items
              }));
              _this.showingModal = true;
              _this.$modal.modal('show');
              _this.showingModal = false;
            }
            _this.push(item);
            response.resolve(true);
          }
          else {
            // there was an error
            response.reject();
          }
        })
        .fail(function(){
          repsonse.reject();
        });
      
      
      return response.promise();
    },
    
    onShowModal : function(e){
      if ( !this.showingModal ) {
        this.$modal.find('.modal-body').html( this.tmpl.modalBody({
          properties : this.items
        }));
      }
    },
    
    onCartNavClick : function(e){
      e.preventDefault();
      var
        dir = $(e.currentTarget).data('nav'),
        fn = 'swipe'+dir.substr(0,1).toUpperCase()+dir.substr(1)
      ;
      this.cartSwiper[fn]();
    },
    
    onCancelClick : function(e){
      e.preventDefault();
      var i = $(e.currentTarget).data('index');
      this.removeAt( i );
    },
    
    onSlideChange : function(swiper){
      this.updateViewAll();
    },
    
    onAdd : function(e, item){
      var i = this.getActiveIndex();
      this.cartSwiper.createSlide(
        this.tmpl.cartProperty(item)
      ).append();
      
      this.cartSwiper.swipeTo( i, 0 );
      
      this.updateViewAll();
      
      if ( !this.$cart.is(':visible') ) {
        this.$cart.show();
        $('body').addClass('has-cart');
        this.fixCart();
      }
    },
    
    onRemove : function(e, index){
      this.cartSwiper.removeSlide(index);
      this.cartSwiper.reInit();
      this.updateViewAll();
      if ( !this.items.length ) {
        $('body').removeClass('has-cart');
        this.$cart.hide();
      }
    },
    
    updateViewAll : function(){
      var $ct = this.$cart.find('.view-all-container');
      $ct.html(
        this.tmpl.viewAll({
          cur: this.getActiveIndex()+1,
          total: this.items.length
        })
      );
    },
    
    fixCart : function(){
      if( this.$cart.is(':visible') ) {
        var
          wh = $(window).height(),
          b =  $('#footer').offset().top,
          fh = $('#footer').height(),
          st = $(window).scrollTop()
        ;
        
        if( (m = st+wh - b) > 0 ) {
          this.$cart.css({'position':'absolute','bottom': fh});
        }
        else {
          this.$cart.css({'position': 'fixed','bottom':0});
        }
        
      }
    }
    
  });
  
  $(function(){
    var impl = new Cart();
    window.TAN.cart = function(){
      return impl;
    };
  });
  
  
})(jQuery);