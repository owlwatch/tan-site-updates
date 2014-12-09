<div class="row destination-grid grid">
  <?php
  $total = @$total ? $total : rand(3,8);
  for( $i=0; $i<$total; $i++){
    $images = array(
      'DSC00459',
      'Fire-Pit',
      'HMO-11872_Exterior4',
      'IMG_5387',
      'One-Bed-Studio-3',
      'Village-Marina-3',
      'West-Coast-FL-September-2012-037',
      'Woodfield-exterior_03'
    );
    ?>
  <div class="col-xs-4">
    <div class="destination grid-item">
      <a href="/destination" class="destination-block">
        <span class="image-wrap">
          <img src="/assets/images/properties/<?= $images[rand(0,count($images)-1)] ?>-thmb.jpg" />
          <?php
          if( rand(1,5) == 1 ){
            ?>
            <span class="plus">
              <span>Plus <span>+</span></span>
            </span>
            <?php
          }
          if( rand(1,5) == 1 ){
            ?>
            <span class="ei-tag" data-toggle="tooltip" title="This property has discounted excess inventory dates available">
              Excess Inventory
            </span>
            <?php
          }
          ?>
        </span>
        <span class="detail-wrap">
          <h3 title="Marco Island Lakeside Inn and then a little more text">Marco Island Lakeside Inn and then a little more text</h3>
          <span class="location">City, State</span>
        </span>
      </a>
      <div class="preview">
        <div class="row">
          <div class="col-xs-6">
            <h4>1 &amp; 2 Bedrooms Available</h4>
            <h4>Resort Amenities</h4>
            <p>* Multi-level resort with no elevator. Please contact a Travel Advocate
                    if you need special accommodations.</p>
            <ul class="no-margin-list">
                
              <li>Hot Tub Onsite
              <li>Laundry Onsite
              <li>Outdoor Pool Onsite
  
            </ul>
          </div>
          <div class="col-xs-6">
            <h4>Unit Amenities</h4>
            <p>* Not all rooms have all amenities</p>
            <ul class="no-margin-list">
              <li>2nd Floor
              <li>Air Conditioning
              <li>Balcony or Patio
              <li>Cable or Satellite
              <li>DVD/VCR Combo
              <li>Full Kitchen 
              <li>No Phone
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
    <?php
  }
  ?>
</div>