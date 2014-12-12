<?php namespace Tan;

class Utility {
  public static function getRegions()
  {
    static $regions = array(
      //western,midWestern,northEast,gulfCoast,midAtlantic,SouthEast,HawaiiMexicoCaribbean
      'Caribbean'             => 'Caribbean',
      'gulfCoast'             => 'Gulf Coast & Florida',
      'Hawaii'                => 'Hawaiian Islands',
      'Mexico'                => 'Mexico',
      'midAtlantic'           => 'Mid Atlantic',
      'midWestern'            => 'Midwest',
      'northEast'             => 'Northeast',
      'SouthEast'             => 'Southeast',
      'western'               => 'Western'
    );
    
    return $regions;
  }
  
  public static function generateProperty()
  {
    static $images = array(
      'DSC00459',
      'Fire-Pit',
      'HMO-11872_Exterior4',
      'IMG_5387',
      'One-Bed-Studio-3',
      'Village-Marina-3',
      'West-Coast-FL-September-2012-037',
      'Woodfield-exterior_03'
    );
    
    static $titles = array(
      'Marco Island Lakeside Inn',
      'Mt Washington Mountain Escape from New York',
      'London Getaway, Guvnah!'
    );
    
    $property = new \stdClass;
    $property->id = rand(1,99999);
    $property->thumb = '/assets/images/properties/'.$images[rand(0, count($images)-1)].'-thmb.jpg';
    $property->images = array();
    $property->is_plus = rand(1,5) === 1;
    $property->is_excess_inventory = rand(1,5) === 1;
    
    
    shuffle( $images );
    foreach( $images as $image ){
      $img = new \stdClass;
      foreach( array('full','lg','thmb') as $size ){
        $img->$size = '/assets/images/properties/'.$image.'-'.$size.'.jpg';
      }
      $property->images[] = $img;
    }
    $property->title = $titles[rand(0, count($titles)-1)];
    $property->rooms = array(
      array(
        'bedrooms'      => 1,
        'rate'          => 245,
        'vap'           => 30
      ),
      array(
        'bedrooms'      => 2,
        'rate'          => 285,
        'vap'           => 30
      )
    );
    
    $property->address = '2396 Old Scenic Highway 98';
    $property->city = 'Mirimar Beach';
    $property->state = 'Florida';
    
    $property->checkinDay = 'Sunday';
    
    $property->amenities = new \stdClass;
    $property->amenities->resort = "
      <p>* Multi-level resort with no elevator. Please contact a Travel Advocate
              if you need special accommodations.</p>
      <ul class=\"no-margin-list\">
          
        <li>Hot Tub Onsite
        <li>Laundry Onsite
        <li>Outdoor Pool Onsite

      </ul>";
    $property->amenities->unit = "
      <p>* Not all rooms have all amenities</p>
      <ul class=\"no-margin-list\">
        <li>2nd Floor
        <li>Air Conditioning
        <li>Balcony or Patio
        <li>Cable or Satellite
        <li>DVD/VCR Combo
        <li>Full Kitchen 
        <li>No Phone
      </ul>
    ";
    
    return $property;

  }
}
