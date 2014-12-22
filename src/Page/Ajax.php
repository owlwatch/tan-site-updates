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
  
  protected function getCart()
  {
    $cart = @$_SESSION['cart'];
    if( !$cart ){
      $cart = array();
    }
    
    return $cart;
  }
  
  protected function setCart( $cart )
  {
    $_SESSION['cart'] = $cart;
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
  
  protected function actionAddItemToCart()
  {
    $item = $_REQUEST['item'];
    $cart = $this->getCart();
    
    $item['expiration'] = (time()+60*15) * 1000;
    $item['uid'] = $item['expiration'] .'-'. rand(0,500);
    
    $cart[] = $item;
    $this->setCart($cart);
    return array(
      'success'   => true,
      'cart'      => $cart,
      'item'      => $item
    );
  }
  
  protected function actionUpdateItemInCart()
  {
    $item = $_REQUEST['item'];
    $id = $_REQUEST['id'];
    $cart = $this->getCart();
    
    foreach( $cart as $i => $cur ){
      if( $cur['uid'] == $id ){
        $cart[$i] = $item;
      }
    }
    
    $this->setCart($cart);
    return array(
      'success'   => true,
      'cart'      => $cart,
      'item'      => $item
    );
  }
  
  protected function actionGetCart()
  {
    return array(
      'success'   => true,
      'cart'      => $this->getCart()
    );
  }
  
  protected function actionRemoveItemFromCart()
  {
    $id = $_REQUEST['id'];
    $cart = $this->getCart();
    $found = false;
    foreach( $cart as $i => $cur ){
      if( $cur['uid'] == $id ){
        $found = $i;
        break;
      }
    }
    
    if( $found !== false){
      $item = $cart[$found];
      array_splice( $cart, $found, 1);
      $this->setCart($cart);
      return array(
        'success'   => true,
        'cart'      => $cart,
        'item'      => $item
      );
    }
    
    else {
      return array(
        'success'   => false
      );
    }
  }
}
