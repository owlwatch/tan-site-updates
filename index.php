<?php
use Tan\Document;

$template = trim( strtok($_SERVER['REQUEST_URI'], '?'), '/');

define('TAN_DIR', dirname(__FILE__));
define('TEMPLATE_DIR', TAN_DIR.'/templates');

if( !$template ) $template = 'index';

require 'vendor/autoload.php';

Document::inst( $template )->display();