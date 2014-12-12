window.TAN = window.TAN || {};
if ( !TAN.Adapter ) {
  //code
  TAN.Adapter = {};
}
(function($, exports){
  
  var fakeUser = {
    name      :'John Doe',
    alerts    :{
      bookings  :3,
      account   :1
    }
  };
  
  var id = 0;
  
  function success(){
    var response = $.Deferred();
    response.resolve.apply(response, arguments);
    return response;
  }
  
  $.extend( exports, {
    
    remote : {
      
      /**
       * Get Destinations
       *
       * The filters passed here are a plain javascript object comprising some or none of the following:
       *   date: string in MM/DD/YYYY format
       *   time: string in format YYYY-MM
       *   region: comma separated string of region ids
       *   activity: string
       *   
       * @param {object}    filters  - filters to use for 
       * 
       */
      getDestinations : function( filters ){
        return $.get('/results');
      }
    },
    
    user : {
      isLoggedIn : function(done, fail, always){
        var deferred = $.Deferred();
        deferred.resolve($.cookie('logged-in'));
        return deferred.promise();
      },
      
      authenticate : function(username, password){
        
        $.cookie('logged-in', '1', {path:'/'});
        $(window).trigger('auth.tan', [true] )
        
        var deferred = $.Deferred();
        deferred.resolve(true);
        return deferred.promise();
      }
    },
    
    cart : {
      add : function(item){
        
        if ( window.localStorage ) {
          var cart = window.localStorage.cart;
          if ( !cart ) {
            cart = [];
          }
          else{
            cart = JSON.parse( cart );
            if ( !$.isArray(cart) ) cart=[];
          }
          item.expiration = new Date().getTime() + (1000 * 60 * 15);
          item.uid = new Date().getTime()+'-'+(id++);
          cart.push(item);
          window.localStorage.cart = JSON.stringify( cart );
        }
        
        var response = $.Deferred();
        response.resolve(true);
        return response;
      },
      removeAt : function(index){
        var response = $.Deferred();
        
        if ( window.localStorage && window.localStorage.cart ) {
          var cart = window.localStorage.cart;
          cart = JSON.parse( cart );
          if ( cart && cart.length && index < cart.length) {
            
            var removed = cart.splice(index,1);
            response.resolve(index, removed[0] );
            window.localStorage.cart = JSON.stringify( cart );
          }
        }
        
        return response.promise();
      },
      
      sync : function(){
        var response = $.Deferred();
        if ( window.localStorage && window.localStorage.cart ) {
          var cart = JSON.parse( window.localStorage.cart );
          if( cart && $.isArray(cart) ) response.resolve( cart );
          else {
            response.resolve([]);
          }
        }
        else {
          response.resolve([])
        }
        
        return response;
      }
    }
    
  });
})(jQuery, window.TAN.Adapter );