<h2 class="sidebar-title">Destinations</h2>
<div class="destinations-filters">
  <?php
  foreach( array('Region','Date','Activity') as $filter){
    $key = strtolower($filter);
    ?>
  <div class="filter filter-<?= $key ?>" data-filter="<?= $key ?>">
    
    <h3 class="filter-title">
      <?php if( @$browse !== $key ){
        ?>
      <a href="/destinations/by-<?= $key ?>">
        <?php
      }
      ?>
      Browse by <?= $filter ?>
      <?php if( @$browse !== $key ){
        ?>
      </a>
        <?php
      }
      ?>
    </h3>
    <?php
    if( @$browse === $key ){
      ?>
    <div class="filter-content">
      <?php
      $this->tmpl('layout/destinations/sidebar/'.$key);
      ?>
    </div>
      <?php
    }
    ?>
  </div>  
    <?php
  }
  ?>
  
</div>