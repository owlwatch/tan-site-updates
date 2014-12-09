<?php
namespace Tan;

class Document
{
  
  protected $contentType = 'text/html';
  protected $httpStatus = 200;
  
  protected $bodyClass = 'default';
  
  protected $id = 0;
  
  protected $title = null;
  
  public function __construct( $name )
  {
    $this->name = $name;
    $this->configure();
  }
  
  public function tmpl( $name, $locals=array() )
  {
    if( $locals ) extract($locals);
    $parts = explode('/', $name);
    while( count($parts) && !file_exists( TEMPLATE_DIR."/{$name}.php" ) ){
      array_pop($parts);
      $name = implode('/', $parts);
    }
    include TEMPLATE_DIR."/{$name}.php";
    echo "\n";
  }
  
  public function configure()
  {
    if( $this->title ){
      $this->title .= ' | Travel Advantage Network';
    }
    else {
      $this->title = 'Travel Advantage Network';
    }
  }
  
  public function headers()
  {
    header("HTTP/1.0 ".$this->httpStatus);
    header('Content-Type: '.$this->contentType);
  }
  
  public function display()
  {
    $this->headers();
    ob_start();
    $this->tmpl( 'layout' );
    $html = ob_get_clean();
    /*
    $config = array(
      'indent'         => true,
      'wrap'           => 200
    );
    $tidy = new \tidy;
    $tidy->parseString($html, $config, 'utf8');
    $tidy->cleanRepair();
    */
    echo $html;
  }
  
  public static function inst( $name )
  {
    static $instances = array();
    if( !isset( $instances[$name]) ){
      // get the page...
      $parts = preg_split('#[/\-]#i', $name);
      $parts = array_map( function($str){
        return ucfirst( $str );
      }, $parts);
      while( count($parts) && !class_exists('Tan\\Page\\'.implode('', $parts)) ){
        array_pop($parts);
      }
      if( count( $parts ) ){
        $page = 'Tan\\Page\\'.implode('', $parts);
        $instances[$name] = new $page( $name );
      }
      else {
        $instances[$name] = new Page\NotFound( $name );
      }
    }
    return $instances[$name];
  }
}


