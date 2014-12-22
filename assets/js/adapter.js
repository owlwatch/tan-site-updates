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
        return $.post('/ajax/login',{
          username: username,
          password: password
        }).done(function(response){
          
          if ( response && response.success ) {
            $(window).trigger('auth.tan', [response.user] );
          }
          
        }).fail(function(response){
          
        }).always(function(response){
          
        });
        
      },
      
      /**
       * Log the user out
       *
       * @return {promise}  promise
       */
      logout : function(){
        
        return $.post('/ajax/logout')
          .done(function( response ){
            if ( response && response.success ) {
              $(window).trigger('logout.tan', [true] )
            }
          });
      }
    },
    
    cart : {
      /**
       * Add an item to the cart
       */
      add : function(item){
        
        var response = $.Deferred();
        
        /**
         * Replace with your endpoint. A successful response should
         * be a json object with the following properties
         *
         *  Takes an "item" object as a parameter
         *
         *  The returned item should have an uid property
         *  and an 'expiration' time in milliseconds
         *
         *  success : boolean
         *  cart : Array - the array of cart items
         *  item : Object - the removed item
         */
        $.post('/ajax/addItemToCart', {
          item: item
        }).done(function(res){
          if ( res && res.success ) {
            item.uid = res.item.uid;
            item.expiration = res.item.expiration;
            response.resolve(true);
          }
          else {
            response.reject();
          }
        }).fail(function(){
          response.reject();
        });
        
        return response.promise();
      },
      
      /**
       * Remove an item at the specified array index from the
       * cart
       */
      removeById : function(uid){
        
        var response = $.Deferred();
        
        
        /**
         * Replace with your endpoint. A successful response should
         * be a json object with the following properties
         *
         * This endpoint takes "id" as a parameter which would
         * be the hold id.
         *
         *  success : boolean
         *  cart : Array - the array of cart items
         *  item : Object - the removed item
         */
        
        $.post('ajax/removeItemFromCart', {
          id: uid
        })
          .done(function(res){
            
            if ( res && res.success ) {
              response.resolve( res );
            }
            else {
              response.reject();
            }
          })
          .fail(function(){
            response.reject();
          })
        
        
        return response.promise();
      },
      
      /**
       * Retrieve the stored shopping cart and pass it to the callback.
       */
      sync : function(){
        var response = $.Deferred();
        
        /**
         * Option 1. Get the Cart via ajax
         *
        $.post('ajax/getCart')
          .done(function(res){
            if ( res && res.success ) {
              response.resolve( res.cart );
            }
            else {
              response.reject();
            }
          })
          .fail(function(){
            response.reject();
          })
        */
        /**
         * Option 2. Grab inline to avoid the extra
         * http request.
         */
        var cart = $('#cart-footer').data('cart');
        if ( !$.isArray(cart) ) {
          cart = [];
        }
        response.resolve(cart);
        return response.promise();
      },
      
      /**
       * Update an item in the cart
       */
      updateItem : function(id, item){
        var response = $.Deferred();
        
        /**
         * Replace with your endpoint. A successful response should
         * be a json object with the following properties
         *
         *  success : boolean
         *  cart : Array - the array of cart items
         */
        
        $.post('ajax/updateItemInCart', {
          item: item,
          id: id
        })
          .done(function(res){
            if ( res && res.success ) {
              response.resolve( res.cart );
            }
            else {
              response.reject();
            }
          })
          .fail(function(){
            response.reject();
          })
        
        return response.promise();
      }
    }
    
  });
})(jQuery, window.TAN.Adapter );