<?php namespace Tan\Response\Filter;

use Proxy\Response\Filter\ResponseFilterInterface;
use Symfony\Component\HttpFoundation\Response;

class TanReplacementsFilter implements ResponseFilterInterface {
    
    protected $replacements = array();
    
    public function register($query, $replacement, $append=false, $paths=false, $replace=false)
    {
        $this->replacements[] = array(
            'query'             =>$query,
            'replacement'       =>$replacement,
            'append'            =>$append,
            'paths'             =>$paths,
            'replace'           =>$replace
        );
    }
    
    public function configure( $config )
    {
        foreach( $config as $r ){
            $this->register( @$r->query, @$r->file, @$r->append, @$r->paths, @$r->replace );
        }
    }

    /**
     * Process the response.
     *
     * @param  Response $response
     * @return Response
     */
    public function filter(Response $response)
    {
        $contentType = $response->headers->get('content-type');
        
        if(!preg_match( '#text/html#', $contentType) ) return $response;
        
        $content = $response->getContent();
        if(!preg_match('#<!doctype#i', $content) ) return $response;
        
        $doc = new \DOMDocument();
        libxml_use_internal_errors(true);
        $doc->loadHTML( $content );
        $xpath = new \DOMXPath( $doc );
        
        foreach( $this->replacements as $replacement ){
            if( $replacement['paths'] &&
                !$this->matchPath($replacement['paths'], $_SERVER['REQUEST_URI']) ){
                continue;
            }
            $node = $xpath->query( $replacement['query'] );
            if( $node->length ){
                
                $current = $node->item(0);
                ob_start();
                include REPLACEMENT_DIR.'/'. $replacement['replacement'];
                $html = ob_get_clean();
                
                $fragment = $doc->createDocumentFragment();
                $fragment->appendXML( $html );
                
                if( @$replacement['replace'] ) {
                    //print_r(array($fragment, $current));
                    $parent = $current->parentNode;
                    $parent->replaceChild( $fragment, $current );
                }
                else {
                    if( !$replacement['append'] ) $current->nodeValue = '';
                    $current->appendChild( $fragment );
                }
            }
        }
        
        $content = $doc->saveHTML();
        
        $response->setContent( $content );
        $response->headers->set('content-length', strlen($content));
        
        return $response;
    }
    
    protected function matchPath( $paths, $uri ){
        foreach( (array)$paths as $path ){
            if( preg_match($path, $uri) ) return true;
        }
        return false;
    }
}
