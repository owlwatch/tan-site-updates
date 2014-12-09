<?php
namespace Tan\Page;

use Tan\Document;

class NotFound extends Document
{
  protected $httpStatus = '404 Not Found';
  protected $title = 'Page Not Found';
}
