<!doctype html>
<html>
  <head>
    <?php
    $this->tmpl('head');
    ?>
  </head>
  <body>
    <?php
    if( @$_REQUEST['alert'] ) $this->tmpl('layout/alert');
    $this->tmpl('layout/header');
    ?>
    <div class="bd">
      <div class="page">
      <?php
      $this->tmpl('content/'.$this->name);
      ?>
      </div>
    </div>
    <?php
    $this->tmpl('layout/footer');
    ?>
  </body>
</html>