<?php
namespace Tan\Page;

use Tan\Document;

class Destinations extends Document
{
  protected $title = 'Destinations';
  
  public function configure()
  {
    if( preg_match( '#by\-(.*)$#', $this->name, $match ) ){
      $this->title .= ' by '.ucfirst($match[1]);
      $this->browse = $match[1];
    }
    else {
      $this->browse = 'region';
    }
    parent::configure();
  }
}
