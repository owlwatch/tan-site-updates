window.TAN = window.TAN || {};
(function($){
  
  var Cart = function(){
    this.items = [];
    this.tmpl = {
      modalBody : Handlebars.compile($('#cart-modal .body-tmpl').html()),
      cartProperty : Handlebars.compile($('#cart-footer .property-tmpl').html()),
      viewAll : Handlebars.compile($('#cart-footer .view-all-tmpl').html()),
      viewOne : Handlebars.compile($('#cart-footer .view-one-tmpl').html())
    };
    Handlebars.registerPartial("property_modal", $("#cart-modal .property-tmpl").html());
    this.$cart = $('#cart-footer');
    this.$modal = $('#cart-modal');
    this.$modal.on('show.bs.modal', $.proxy(this.onShowModal, this));
    this.$modal.on('shown.bs.collapse hidden.bs.collapse', $.proxy(this.onModalContentChange, this));
    this.$modal.on('show.bs.collapse hide.bs.collapse', '#booking-modal-more-properties', $.proxy(this.onModalCollapse,this))
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
    this.countdown();
  };
  
  $.extend( Cart.prototype, {
    
    countdown : function() {
      
      var
        _this = this
      ;
      clearTimeout( this._countdownTimeout );
      
      $('[data-expiration]').each(function(){
        var $expiration = $(this);
        var expires = $expiration.data('expiration');
        var remaining = expires - new Date().getTime();
        
        $expiration.removeClass('text-success text-danger text-warning');
        
        if ( remaining > 1000*60 ) {
          $expiration.addClass('text-success');
          var minutes = Math.round(remaining / (1000*60) );
          $expiration.find('[data-time]').html(
            minutes+' minutes'
          );
        }
        else if ( remaining > 0 ) {
          $expiration.addClass('text-danger');
          var seconds = Math.round(remaining / 1000);
          $expiration.find('[data-time]').html(
            seconds+' seconds'
          );
        }
        else {
          _this.removeById( $expiration.parents('[data-uid]').data().uid );
        }
      });
      _this._countdownTimeout = setTimeout($.proxy(_this.countdown,_this), 1000);
    },
    
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
    
    removeById : function( uid ){
      var found = false;
      $.each( this.items, function(i, item){
        if( item.uid == uid ) {
          found = i;
          return false;
        }
        return true;
      });
      if ( found !== false) {
        this.removeAt(found);
      }
    },
    
    removeAt : function(index){
      var
        _this = this,
        response = $.Deferred()
      ;
      
      if ( index < this.items.length ) {
        TAN.Adapter.cart.removeAt( index )
          .done(function( index, item ){
            if ( item ) {
              _this.items.splice(index,1);
              _this.$cart.trigger('itemremove.cart.tan', [index, item]);
              response.resolve(index, item);
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
      this.countdown();
    },
    
    onModalCollapse : function(e){
      var $a = $('a[href="#'+($(e.currentTarget).attr('id'))+'"]');
      $a.find('i')
        .toggleClass('fa-angle-right', e.type == 'hide')
        .toggleClass('fa-angle-down', e.type == 'show')
        
      $a.parent()
        .toggleClass('open', e.type == 'show')
        
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
      var uid = $(e.currentTarget).parents('[data-uid]').data().uid;
      this.removeById( uid );
    },
    
    onModalContentChange : function(e){
      this.$modal.data('bs.modal').adjustBackdrop();
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
      this.countdown();
      
      if ( !this.$cart.is(':visible') ) {
        this.$cart.show();
        $('body').addClass('has-cart');
        this.fixCart();
      }
    },
    
    onRemove : function(e, index, item){
      this.cartSwiper.removeSlide(index);
      if( this.cartSwiper.activeIndex > this.items.length ){
        this.cartSwiper.swipeTo(0);
      }
      if (this.$modal.is(':visible')) {
        this.$modal.find('.property-row[data-uid="'+item.uid+'"]')
          .remove();
        this.$modal.modal('hide');
      }
      
      this.updateViewAll();
      if ( !this.items.length ) {
        $('body').removeClass('has-cart');
        this.$cart.hide();
      }
    },
    
    updateViewAll : function(){
      var $ct = this.$cart.find('.view-all-container');
      $ct.html(
        this.items.length > 1 ? this.tmpl.viewAll({
          cur     :this.getActiveIndex()+1,
          total   :this.items.length
        }) : this.tmpl.viewOne({})
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