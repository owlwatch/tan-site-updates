<?php
namespace Tan\Page;

use Tan\Document;

class Ajax extends Document
{
  protected $title = false;
  protected $bodyClass = '';
  
  protected $contentType = 'application/json';
  
  public function display()
  {
    $this->headers();
    echo json_encode( $this->process() );
  }
  
  protected function process()
  {
    $parts = explode('/', $this->name);
    array_shift($parts);
    $fn = 'action'.implode('', array_map('ucfirst', $parts));
    if( method_exists( $this, $fn ) ){
      return $this->$fn();
    }
    return false;
  }
  
  protected function actionLogin()
  {
    setcookie('logged-in', 1, null, '/');
    return array(
      'success' => true,
      'user'    => array(
        'name'      => 'Mark Fabrizio',
        'email'     => 'mark@fabrizio.com'
      )
    );
  }
  
  protected function actionLogout()
  {
    setcookie('logged-in', 1, time() - 3600, '/');
    return array(
      'success' => true
    );
  }
}
