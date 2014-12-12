<?php
$results = array();
$total = @$total ? $total : rand(3,8);

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

$titles = array(
  'Marco Island Lakeside Inn',
  'Mt Washington Mountain Escape from New York',
  'London Getaway, Guvnah!'
);

$locations = array(
  'City, State',
  'London, England',
  'Brattleboro, Vermont'
);

for( $i=0; $i<$total; $i++){
  
  $result = array();
  $result['thumb'] = "/assets/images/properties/".$images[rand(0,count($images)-1)]."-thmb.jpg";
  $result['title'] = $titles[rand(0,count($titles)-1)];
  $result['is_plus'] = rand(1,3) === 1;
  $result['is_excess_inventory'] = rand(1,3) === 1;
  $result['location'] = $locations[rand(0,count($locations)-1)];
  $result['preview'] = <<<PREVIEW
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
PREVIEW;
  $results[] = $result;
}
echo json_encode( $results);