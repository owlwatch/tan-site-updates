<p>Choose from the map below:</p>
<div class="interactive-map-wrap">
  <div class="interactive-map">
    <?php
    $this->tmpl('common/map');
    ?>
  </div>
</div>
<div class="tan-select-wrap">
  <div class="tan-select" data-name="region" data-component="tan-select">
    <div class="active-label">Or, select from the menu...</div>
    
    <div class="dropdown">
      <ul>
        <li><a href="#">All Regions</a></li>
        <li><a data-id="18" href="#region=Caribbean">Caribbean</a></li>
        <li><a data-id="2" href="#region=gulfCoast">Gulf Coast &amp; Florida</a></li>
        <li><a data-id="7" href="#region=Hawaii">Hawaiian Islands</a></li>
        <li><a data-id="15" href="#region=Mexico">Mexico</a></li>
        <li><a data-id="3" href="#region=midAtlantic">Mid Atlantic</a></li>
        <li><a data-id="6" href="#region=midWestern">Midwest</a></li>
        <li><a data-id="4" href="#region=northEast">Northeast</a></li>
        <li><a data-id="1" href="#region=SouthEast">Southeast</a></li>
        <li><a data-id="5" href="#region=western">Western</a></li>
      </ul>
    </div>
  </div>
</div>

<div class="destination-date-filter">
  <p>Know when you'd like to travel?</p>
  <?php
  $date = new DateTime();
  $date->modify('Friday');
  $available_dates = array();
  for( $i=0; $i<51; $i++ ){
    for($j=0; $j<3; $j++ ){
      $available_dates[] = $date->format('Y-m-d');
      $date->modify('+1 day');
    }
    $date->modify('+4 days');
  }
  ?>
  <div class="date-picker tan-datepicker" data-available-dates="<?= htmlspecialchars( json_encode($available_dates) ) ?>"></div>
</div>

<div class="ei-checkbox checkbox">
  <label>
    <input type="checkbox" name="ei-only" />
    Only show properties with excess inventory dates available.  
  </label>
</div>