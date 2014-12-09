<?php namespace Tan\Request\Filter;

use Proxy\Request\Filter\RequestFilterInterface;
use Symfony\Component\HttpFoundation\Request;

class TanRequestFilter implements RequestFilterInterface {
    
    /**
     * Process the response.
     *
     * @param  Response $response
     * @return Response
     */
    public function filter(Request $request)
    {
      //$request->headers->set('host', 'planwithtan.com');
      return $request;
    }
}
