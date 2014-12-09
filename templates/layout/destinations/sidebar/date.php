<div class="tan-select-wrap">
  <div class="tan-select" data-name="time" data-component="tan-select">
    <div class="active-label">Select a time period...</div>
    
    <div class="dropdown">
      <ul>
        <?php
        $date = new DateTime();
        for( $i=0; $i<18; $i++){
          $time = $date->format('Y-m');
          $label = $date->format('F Y');
          $date->modify('+1 month');
          ?>
        <li><a data-id="18" href="#time=<?= $time ?>"><?= $label ?></a></li>
          <?php
        }
        ?>
      </ul>
    </div>
  </div>
</div>

<p>Or choose from the calendar:</p>

<div class="destination-date-filter">
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