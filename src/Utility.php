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
}
