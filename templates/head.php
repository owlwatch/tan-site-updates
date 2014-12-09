<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
  
<title><?= $this->title ?></title>

<script src="//use.typekit.net/zmv6suh.js"></script>
<script>try{Typekit.load();}catch(e){}</script>
<link href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet" />
<link rel="stylesheet" href="/assets/bower_components/jquery-ui/themes/ui-lightness/jquery-ui.min.css" />
<link rel="stylesheet" href="/assets/bower_components/swiper/dist/idangerous.swiper.css" />
<link rel="stylesheet" href="/assets/bower_components/magnific-popup/dist/magnific-popup.css" />
<?php
// lets compile our stylesheet
$less_files = array(TAN_DIR.'/less/index.less' => '/assets/css/');
$options = array('cache_dir' => TAN_DIR.'/tmp');
$css_file_name = Less_Cache::Get( $less_files, $options );
copy( TAN_DIR.'/tmp/'.$css_file_name, TAN_DIR.'/assets/css/front.css');
?>
<link rel="stylesheet" href="/assets/css/front.css" />

<script src="/assets/js/modernizr.js"></script>
<script src="/assets/bower_components/jquery/dist/jquery.min.js"></script>
<script src="/assets/bower_components/jquery-ui/jquery-ui.min.js"></script>
<!--
<script src="/assets/bower_components/history.js/scripts/bundled/html4+html5/jquery.history.js"></script>
-->
<script src="/assets/bower_components/swiper/dist/idangerous.swiper.min.js"></script>
<script src="/assets/bower_components/imagemapster/dist/jquery.imagemapster.min.js"></script>
<script src="/assets/bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
<script src="/assets/bower_components/jquery.cookie/jquery.cookie.js"></script>
<script src="/assets/bower_components/jquery.expander/jquery.expander.min.js"></script>
<script src="/assets/bower_components/magnific-popup/dist/jquery.magnific-popup.min.js"></script>
<script src="/assets/bower_components/jquery.scrollTo/jquery.scrollTo.min.js"></script>
<script src="/assets/bower_components/handlebars/handlebars.min.js"></script>
<script src="/assets/js/jquery.placeholders.js"></script>
<script src="/assets/js/adapter.js"></script>
<script src="/assets/js/cart.js"></script>
<script src="/assets/js/destination-browser.js"></script>
<script src="/assets/js/site.js"></script>

<!--[if lt IE 9]>
<script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
<script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
<![endif]-->
