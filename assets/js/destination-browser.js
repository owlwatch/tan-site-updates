(function($){
  
  var defaults = {
    gridSelector : '.grid',
    itemSelector : '.grid-item',
    template : [
      '<div class="item-preview">',
        '<div class="content-wrap">',
          '<div class="excerpt">',
          '</div>',
          '<div class="actions">',
            '<div class="nav">',
              '<a href="#" data-browser-nav="prev" class="nav-arrow"><i class="fa fa-chevron-left"></i></a>',
              '<a href="#" data-browser-nav="next" class="nav-arrow"><i class="fa fa-chevron-right"></i></a>',
              '<a href="#" data-toggle="browser" class="close-button"><i class="fa fa-close"></i></a>',
            '</div>',
            '<a href="#" data-tmpl="link" class="btn btn-large btn-green">',
              'Learn More',
            '</a>',
          '</div>',
        '</div>',
      '</div>'
    ].join('')
  };
  
  function Browser(el, options) {
    this.$el = $(el);
    this.options = $.extend({}, defaults, options || {});
    this.initEvents();
  }
  
  $.extend( Browser.prototype, {
    
    initEvents : function(){
      this.$el.on('click', this.options.itemSelector, $.proxy(this.onGridItemClick, this) );
      this.$el.on('click', '[data-toggle="browser"]', $.proxy(this.onCloseClick, this) );
      this.$el.on('click', '[data-browser-nav]', $.proxy(this.onNavClick, this) );
      $(document).on('keydown', $.proxy(this.onKeyDown, this));
    },
    
    onGridItemClick : function(e){
      e.preventDefault();
      // check to see if this is open...
      var $el = $(e.currentTarget);
      if( $el.hasClass('active') ){
        // close it
        this.close( $el );
        return;
      }
      
      this.open( $el, true );
    },
    
    open : function( $el, animate ){
      var $insertEl = this.findInsertElement( $el ),
          $current = this.current( $el )
      
      if( animate && $current && $current.length ) {
        if ( this.findInsertElement( $current ).is( $insertEl ) ) {
          animate = false;
        }
      }
      
      this.close( $el );
      $el.addClass('open');
      var $preview = this.preview( $el, true );
      
      if ( animate ) {
        $preview.height(0);
      }
      $preview.insertAfter( $insertEl );
      if (animate ) {
        $preview.animate({height: $preview[0].scrollHeight},200);
      }
      else {
        $preview.css({height: 'auto'});
      }
      $.scrollTo( this.current( $el ), 200 );
    },
    
    preview : function( $el, create ){
      var $preview = this.$el.parents(this.gridSelector).find('.item-preview');
      if( !create ) {
        return $preview.length ? $preview : false;
      }
      
      if ( !$preview.length ) {
        $preview = $(this.options.template);
      }
      $preview.find('.excerpt').html( $el.find('.preview').html() );
      if ( !this.next( $el ) ) {
        $preview.find('[data-browser-nav="next"]').addClass('disabled');
      }
      else {
        $preview.find('[data-browser-nav="next"]').removeClass('disabled');
      }
      
      if ( !this.prev( $el ) ) {
        $preview.find('[data-browser-nav="prev"]').addClass('disabled');
      }
      else {
        $preview.find('[data-browser-nav="prev"]').removeClass('disabled');
      }
      
      // also set the link
      $preview.find('[data-tmpl="link"]').attr('href', $el.find('.destination-block').attr('href') );
      return $preview;
      
    },
    
    close : function( $el, animate ){
      var $current = this.current( $el );
      
      if ( !$current ) return;
      $current.addClass('closing').removeClass('open');
      var $preview = this.preview();
      if( $preview && $preview.closest('html') ) $preview.animate({height: 0}, animate?200:0, function(){
        $current.removeClass('closing');
      });
    },
    
    current : function( $el ){
      var $cur = $el.parents(this.options.gridSelector).first().find(this.options.itemSelector+'.open');
      return $cur.length ? $cur : false;
    },
    
    onCloseClick : function(e){
      e.preventDefault();
      this.close( $(e.currentTarget), true )
    },
    
    onNavClick : function(e){
      e.preventDefault();
      var $btn = $(e.currentTarget);
      var dir = $btn.data('browserNav');
      var $el = this[dir]( $btn );
      if ( $el ){
        this.open($el, false);
      }
    },
    
    onKeyDown : function(e){
        
      if( $(e.target).is('input,textarea,select') ) return;
      
      var $el = this.$el.find(this.options.itemSelector+'.open');
      if ( !$el.length ) return;
      
      switch ( e.keyCode ) {
        
        case 37:
          e.preventDefault();
          var $prev = this.prev( $el );
          if ( $prev ) this.open( $prev );
          return;
        
        case 39:
          e.preventDefault();
          var $next = this.next( $el );
          if ( $next ) this.open( $next );
          return;
        
        case 27:
          e.preventDefault();
          this.close( $el, true);
          return;
      }
    },
    
    next : function( $el ){
      var $next = $el.parents(this.options.gridSelector).find('.open').parent().nextAll('.col-xs-4').first();
      return $next.length ? $next.find(this.options.itemSelector) : false;
    },
    
    prev : function( $el ){
      var $prev = $el.parents(this.options.gridSelector).find('.open').parent().prevAll('.col-xs-4').first();
      return $prev.length ? $prev.find(this.options.itemSelector) : false;
    },
    
    setup : function( $el ){
      this.$grid = $el.parents('.browser');
    },
    
    findInsertElement : function($item){
      var $el = $item.parent(),
          $cur = $el;
        
      while( $el.nextAll('.col-xs-4').first().length && $el.nextAll('.col-xs-4').first().offset().top <= $cur.offset().top ){
        $el = $el.next();
      }
      return $el;
    }
    
  });
  
  $.fn.destinationBrowser = function(cmd){
    this.each(function(){
      new Browser( this );
    });
  };
  $(function(){
    $('body').destinationBrowser();
  });
  
  
})(jQuery);