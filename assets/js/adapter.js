/**
 * TAN Adapter
 *
 * This file is intended to contain the logic that interacts
 * with the TAN database / server.
 *
 * All the functions in the adapter return deferred objects,
 * see http://api.jquery.com/category/deferred-object/. Since
 * $.ajax calls return deferred objects, you can return those
 * directly if necessary.
 *
 * This file currently contains dummy logic and all the functions
 * need to be implemented with production TAN logic.
 * 
 */

window.TAN = window.TAN || {};
if ( !TAN.Adapter ) TAN.Adapter = {};

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
       * The callback should pass a single parameter "html" - HTML with the a "destination-grid" block
       *   
       * @param {object}    filters  - filters to use for the query
       * @return {promise}  promise
       * 
       */
      getDestinations : function( filters ){
        return $.get('/results');
      }
    },
    
    user : {
      
      /**
       * Return a boolean indicating whether or not the user is logged
       * in.
       *
       * The callback should return a single boolean
       *
       * @return {promise}  promise
       */
      isLoggedIn : function(){
        var deferred = $.Deferred();
        deferred.resolve($.cookie('logged-in'));
        return deferred.promise();
      },
      
      /**
       * Return a boolean indicating whether or not the user is logged
       * in.
       *
       * A successfully callback should pass a "success" parameter and
       * a "user" parameter
       *
       * @param {string}    username
       * @param {string}    password
       *
       * @return {promise}  promise
       */
      authenticate : function(username, password){
        
        $.cookie('logged-in', '1', {path:'/'});
        $(window).trigger('auth.tan', [true, fakeUser] )
        
        var deferred = $.Deferred();
        deferred.resolve(true, fakeUser);
        return deferred.promise();
      },
      
      /**
       * Log the user out
       *
       * @return {promise}  promise
       */
      logout : function(){
        $.removeCookie('logged-in');
        $(window).trigger('logout.tan', [true] )
        
        var deferred = $.Deferred();
        deferred.resolve(true);
        return deferred.promise();
      }
    },
    
    cart : {
      /**
       * Add an item to the cart
       */
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
      
      /**
       * Remove an item at the specified array index from the
       * cart
       */
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
      
      /**
       * Retrieve the stored shopping cart and pass it to the callback.
       */
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
      },
      
      updateItem : function(i, item){
        var response = $.Deferred();
        if ( window.localStorage && window.localStorage.cart ) {
          var cart = JSON.parse( window.localStorage.cart );
          if ( cart[i] ) {
            cart[i] = item;
            window.localStorage.cart = JSON.stringify( cart );
          }
        }
        else {
          response.reject()
        }
        
        return response;
      }
    }
    
  });
})(jQuery, window.TAN.Adapter );