<?php namespace Tan\Response\Filter;

use Proxy\Response\Filter\ResponseFilterInterface;
use Symfony\Component\HttpFoundation\Response;

class TanRegexFilter implements ResponseFilterInterface {
    
  /**
   * Process the response.
   *
   * @param  Response $response
   * @return Response
   */
  public function filter(Response $response)
  {
    $contentType = $response->headers->get('content-type');
    
    // check for the stylesheet...
    
    if(!preg_match( '#text/html#', $contentType) ) return $response;
    
    $content = $response->getContent();
    if(!preg_match('#<!doctype#i', $content) ) return $response;
    
    // hard coded for now..
    $content = str_replace("$('img')", "$('.addPadding > img')", $content);
    $response->setContent( $content );
    
    return $response;
  }
}
