<?php
namespace Tan\Page;

use Tan\Document;

class Results extends Document
{
  protected $title = false;
  protected $bodyClass = '';
  
  public function display()
  {
    $this->headers();
    ob_start();
    $this->tmpl( 'content/results' );
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
}
