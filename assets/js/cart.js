window.TAN = window.TAN || {}
(function($){
  
  var Cart = function(){
    this.items = [];
  };
  
  $.extend( Cart.prototype, {
    
    add : function(config){
      this.items.push( config );
    }
    
  });
  
  var cart = new Cart;
  TAN.cart = function(){
    return cart;
  };
  
})(jQuery);