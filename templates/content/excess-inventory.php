<div class="clearfix two-column-layout">
  <div class="main-column">
    <h1 class="page-title">Excess Inventory</h1>
    <p>Welcome to the Travel Advantage Network Excess Inventory list! Providing you with
    real-time Excess Inventory listings, these discounted units are ready to be booked
    online at anytime. Click on the "View Property" button and you will be taken to the
    property's page, with the specific week already selected in that property's calendar.
    </p>
    <p>Don’t delay, act now – these sought-after properties will sell out quickly! Also,
    when you book 10 Excess Inventory vacations, you get the 11th one FREE!</p>
    
    <div class="panel-group" id="excess-inventory" role="tablist" aria-multiselectable="true">
    <?php
    $now = new DateTime();
    $now->modify('Friday');
    for( $i=0; $i<10; $i++){
      $id = 'week-'.$now->format('Y-m-d');
      ?>
      <div class="panel">
        <div class="panel-heading" role="tab" id="heading-<?= $id ?>">
          <h4 class="panel-title">
            <a data-toggle="collapse" data-parent="excess" href="#<?= $id ?>">
              <i class="fa fa-plus-square"></i>
              Week #<?= $now->format('W') ?> (Starting <?= $now->format('m/d/Y') ?>)
            </a>
          </h4>
        </div>
        <div id="<?= $id ?>" class="panel-collapse collapse" role="tabpanel">
          <div class="panel-body">
            <div class="excess-tabs">
              <span class="tabs-label">Check-in:</span>
              <ul class="check-in-tabs">
                <?php
                $days = array();
                for( $j=0; $j<3; $j++ ){
                  $day_id = 'day-'.$now->format('Y-m-d');
                  ?>
                <li class="<?= !$j?'active':'' ?>">
                  <a data-toggle="tab" href="#<?= $day_id ?>">
                    <?= $now->format('l') ?>
                  </a>
                </li>
                  <?php
                  $days[] = array($day_id,$now->format('l'));
                  $now->modify('+1 day');
                }
                ?>
              </ul>
            </div>
            <div class="tab-content">
              <?php
              $active = true;
              foreach( $days as $x => $config ){
                list($day_id, $label) = $config;
                ?>
              <div class="excess-tab-pane tab-pane <?= $active?'active':''?>" id="<?= $day_id ?>">
                <div class="more-units">
                  Looking for more units available for check-in on this day? <a href="#">Click here <i class="fa fa-angle-right"></i></a>
                </div>
                <?php
                $this->tmpl('content/results', array('total'=>rand(2,6)) );
                
                if( $days[$x+1] ) {
                  ?>
                  <div class="next-checkin">
                    Next: <a href="javascript:var a = jQuery('a[href=#<?= $days[$x+1][0] ?>]'); a.click(); jQuery.scrollTo(a);">
                      <?= $days[$x+1][1] ?> Check in <i class="fa fa-angle-right"></i>
                    </a>
                  </div>
                  <?php
                }
                ?>
              </div>
                <?php
                $active = false;
              }
              ?>
            </div>
          </div>
        </div>
      </div>
      <?php
      $now->modify('next friday');
    }
    ?>
    </div>
  </div>
  
  <div class="left-column sidebar">
    
  </div>
</div>
<script id="results-tmpl" type="text/x-handlebars-template">
  <div class="row destination-grid grid">
    {{#each results}}
    <div class="col-xs-4">
      <div class="destination grid-item">
        <a href="{{url}}" class="destination-block">
          <span class="image-wrap">
            <img src="{{thumb}}" />
            
            {{#if is_plus}}
            <span class="plus">
              <span>Plus <span>+</span></span>
            </span>
            {{/if}}
            {{#if is_excess_inventory}}
              <span class="ei-tag" data-toggle="tooltip" title="This property has discounted excess inventory dates available">
                Excess Inventory
              </span>
            {{/if}}
          </span>
          <span class="detail-wrap">
            <h3 {{{attrs title=title}}}>{{title}}</h3>
            <span class="location">{{location}}</span>
          </span>
        </a>
        <div class="preview">
          {{{preview}}}
        </div>
      </div>
    </div>
    {{/each}}
  </div>
</script>