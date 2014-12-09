<div class="clearfix two-column-layout">
  <div class="main-column">
    <h1 class="page-title">Destinations</h1>
    <div class="destination-results">
      <div class="search">
        <div class="filters"></div>
        <div class="search-results">
          
        </div>
      </div>
      <div class="default-default-results">
        <p>Browse our exciting properties below, or use the filters at left to find the perfect getaway.</p>
        <?php
        $this->tmpl('content/results', array('total'=>6) );
        ?>
      </div>
    </div>
  </div>
  <div class="left-column sidebar">
    <?php
    $this->tmpl('layout/destinations/sidebar', array(
      'browse'      => $this->browse
    ));
    ?>
  </div>
</div>

<script src="/assets/js/destinations.js"></script>