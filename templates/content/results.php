<div class="row destination-grid grid">
  <?php
  $total = @$total ? $total : rand(3,8);
  for( $i=0; $i<$total; $i++){
    $property = Tan\Utility::generateProperty();
    ?>
  <div class="col-xs-4">
    <div class="destination grid-item">
      <a href="/destination" class="destination-block">
        <span class="image-wrap">
          <img src="<?= $property->thumb ?>" />
          <?php
          if( $property->is_plus ){
            ?>
            <span class="plus">
              <span>Plus <span>+</span></span>
            </span>
            <?php
          }
          if( $property->is_excess_inventory ){
            ?>
            <span class="ei-tag" data-toggle="tooltip" title="This property has discounted excess inventory dates available">
              Excess Inventory
            </span>
            <?php
          }
          ?>
        </span>
        <span class="detail-wrap">
          <h3 title="<?= htmlspecialchars( $property->title ) ?>">
            <?= $property->title ?>
          </h3>
          <span class="location"><?= $property->city ?>, <?= $property->state ?></span>
        </span>
      </a>
      <div class="preview">
        <div class="row">
          <div class="col-xs-6">
            <h4>1 &amp; 2 Bedrooms Available</h4>
            <h4>Resort Amenities</h4>
            <?= $property->amenities->resort ?>
          </div>
          <div class="col-xs-6">
            <h4>Unit Amenities</h4>
            <?= $property->amenities->unit ?>
          </div>
        </div>
      </div>
    </div>
  </div>
    <?php
  }
  ?>
</div>