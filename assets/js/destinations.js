jQuery(function($){
  
  var state = {};
  
  var regions = {
    western: {
      id: 5,  title: "the Western U.S."
    },
    midWestern: {
      id: 6,  title: "the Midwest U.S."
    },
    northEast: {
      id: 4,  title: "the Northeast U.S."
    },
    gulfCoast: {
      id: 2,  title: "the Gulf Coast and Florida"
    },
    midAtlantic: {
      id: 3,  title: "the Mid Atlantic U.S."
    },
    SouthEast: {
      id: 1,  title: "the Southeast U.S."
    },
    HawaiiMexicoCaribbean: {
      id: [7,15,18], title: "Hawaii, Mexico and Caribbean"
    },
    Hawaii: {
      id: 7,  title: "Hawaii"
    },
    Mexico: {
      id: 15, title: "Mexico"
    },
    Caribbean: {
      id: 18, title: "the Caribbean"
    }
  };
  
  //var resultsTmpl = Handlebars.compile( $('#results-tmpl').html() );
  /*
  $('.default-default-results .results').html(
    resultsTmpl({results: $('.default-default-results').data('results')})
  );
  */
  
  function getParams(){
    var params = {};
    var hash = window.location.hash.replace(/^#/,'').split('&');
    $.each(hash, function(i, part){
      var pair = part.split('=',2);
      params[pair[0]] = pair.length==2 ? pair[1] : true;
    });
    return params;
  }
  
  function setParams(params) {
    window.location.hash = '#'+decodeURIComponent($.param( params ));
  }
  
  function highlightMap(){
    var params = getParams();
    $('.interactive-map img').each(function(){
      $(this).find('area').mapster('set', false);
    });
    if( params.region ){
      var highlight = params.region;
      if( ~['Hawaii','Mexico','Caribbean'].indexOf(params.region) ){
        highlight = 'HawaiiMexicoCaribbean';
      }
      $('.interactive-map img').each(function(){
        $(this).mapster('set',true,highlight);
      });
    }
  }
  
  function updateRegionSelect() {
    var params = getParams(),
        $select = $('.tan-select[data-name="region"]');
        
    if( !$select.length ) return;
    var text = false;
    if( params.region ) $select.find('li a').each(function(){
      if ( ~this.href.indexOf("region="+params.region)) {
        text = $(this).text();
        return false;
      }
      return true;
    });
    if ( !text ) text = $select.data('originalText');
    $select.find('.active-label').text(text);
  }
  
  function updateTimeSelect() {
    var params = getParams(),
        $select = $('.tan-select[data-name="time"]');
        
    if( !$select.length ) return;
    var text = false;
    if( params.time ) $select.find('li a').each(function(){
      if ( ~this.href.indexOf("time="+params.time)) {
        text = $(this).text();
        return false;
      }
      return true;
    });
    if ( !text ) text = $select.data('originalText');
    $select.find('.active-label').text(text);
  }
  
  function updateResults(){
    var params = getParams();
    if ( !params.region && !params.date && !params.ei && !params.activity && !params.time) {
      // just show the default...
      $('.destination-results .search').hide();
      $('.destination-results .default-default-results').show();
    }
    else {
      $('.destination-results .default-default-results').hide();
      $('.destination-results .search').show();
      $('.destination-results .search .search-results')
        .html('<div class="loading"><i class="fa fa-spin fa-spinner"></i></div>');
      
      TAN.Adapter.remote.getDestinations( params )
        .done(function success(results){
          //$('.destination-results .search .search-results').html(resultsTmpl({results: results}));
          $('.destination-results .search .search-results').html( results );
        })
        
        .fail(function failure(){
          $('.destination-results .search .search-results').html(
            '<div class="alert alert-block alert-danger">There was an error retreiving the results.'+
            'Please try refreshing the page</div>'
          );
        })
      
    }
  }
  
  (function date_filter(){
    
    function pad(n) {return (n<10 ? '0'+n : n); }
    
    var $picker = $('.destination-date-filter .date-picker'),
        available_dates = $picker.data('available-dates');
    
    if ( !$picker.length ) return;
    
    $picker.datepicker({
      minDate: new Date( available_dates[0] ),
      maxDate: new Date( available_dates[available_dates.length-1] ), 
      beforeShowDay: function(date){
        var test = date.getFullYear()+'-'+pad(date.getMonth()+1,2)+'-'+pad(date.getDate(),2);
        return ~$.inArray(test, available_dates) ? [true] : [false];
      },
      onSelect: function(date) {
        var params = getParams();
        delete params.time;
        params.date = date;
        window.location.hash = '#'+decodeURIComponent($.param( params ));
      }
    });

  })();
  
  function createFilterLabel(type, text){
    var $filters = $('.destination-results .filters');
    if ( !$filters.find('[data-filter-type="'+type+'"]').length )
        $('<span class="destination-filter" data-filter-type="'+type+'" />')
          .appendTo($filters);
    $filters.find('[data-filter-type="'+type+'"]')
      .html(text+' <i class="fa fa-close"></i>');
  }
  
  function removeFilterLabel(type){
    var $filters = $('.destination-results .filters');
    $filters.find('[data-filter-type="'+type+'"]').remove();
  }
  
  function onHashChange(){
    // close the search tool if it was used to select an area on the map
    window.TAN.closeSearchTool();
    highlightMap();
    updateRegionSelect();
    updateTimeSelect();
    updateResults();
    var params = getParams();
    
    var $filters = $('.destination-results .filters');
    if( params.region ) {
      var region = params.region
      if ( regions[region] ) {
        $('.page-title').text('Destinations in '+regions[region].title);
      }
      $('[data-filter="region"] .destination-date-filter').show();
    }
    else {
      $('.page-title').text('Destinations');
      $('[data-filter="region"] .destination-date-filter').hide();
    }
    if ( params.date ) {
      createFilterLabel(
        'date',
        'Properties available for arrival on '+params.date
      );
    }
    else {
      removeFilterLabel('date');
    }
    
    if ( params.ei ) {
      createFilterLabel(
        'ei',
        'Displaying Excess Inventory Only'
      );
      $('.ei-checkbox input').attr('checked', 'checked');
    }
    else {
      $('.ei-checkbox input').attr('checked', null);
      removeFilterLabel('ei');
    }
    
    if ( params.time ) {
      // get the time...
      var date = new Date( params.time+'-15');
      createFilterLabel(
        'time',
        'Properties available for arrival in '+ $.datepicker.formatDate('MM yy', date)
      );
    }
    else {
      removeFilterLabel('time');
    }
    
    if ( params.activity ) {
      var activityTitle = $('.activities a[href*="activity='+params.activity+'"] h3').text();
      $('.page-title').text('Destinations for '+activityTitle);
    }
  }
  
  var initialized = false;
  var $img = $('.interactive-map img').first();
  
  TAN.onMapsReady(function(){
    if ( !initialized ) {
      initiailized = true;
      onHashChange();
    }
  });
  $(window).on('hashchange', onHashChange);
  $('.ei-checkbox input').on('change', function(){
    params = getParams();
    if ( !$(this).is(':checked') ) {
      delete params.ei;
    }
    else {
      params.ei = 1;
    }
    setParams(params);
  });
  
  $('body').on('click', '[data-filter-type] .fa-close', function(e){
    var $target = $(e.currentTarget).parent();
    var params = getParams();
    delete params[$target.data('filterType')];
    $target.remove();
    setParams( params );
    
  });
  
});