window.TAN = window.TAN || {};
(function($, exports){
  
  var fakeUser = {
    name      :'John Doe',
    alerts    :{
      bookings  :3,
      account   :1
    }
  };
  
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
    }
    
  });
})(jQuery, window.TAN);