<?php

$property = \Tan\Utility::generateProperty();

?>
<div class="clearfix two-column-layout destination-page">
  <div class="main-column">
    <div class="image-browser">
      <div class="swiper-container" data-mode="horizontal" data-component="swiper" data-loop="true" data-simulate-touch="false" data-calculate-height="true">
        <div class="swiper-wrapper">
          <!-- slides here -->
          <?php
          foreach( $property->images as $image ){
            ?>
          <div class="swiper-slide">
            <img src="<?= $image->lg ?>" />
          </div>  
            <?php
          }
          ?>
        </div>
        <a href="#" data-toggle="modal" class="expand">
          <i class="fa fa-expand"></i>
        </a>
        <a href="#" data-swiper-nav="prev" class="nav prev">
          <i class="fa fa-chevron-left"></i>
        </a>
        <a href="#" data-swiper-nav="next" class="nav next">
          <i class="fa fa-chevron-right"></i>
        </a>
      </div>
      <div class="thumbnails">
        <div class="row">
          <?php
          foreach( $property->images as $i => $image ){
            ?>
          <div class="col-xs-3">
            <a href="<?= $image->lg ?>" data-image-index="<?= $i ?>" class="<?= $i === 0 ? 'active' : '' ?>">
              <img src="<?= $image->thmb ?>" />
            </a>
          </div>
            <?php
          }
          ?>
        </div>
      </div>
    </div>
    <h4 class="overview-title">Overview</h4>
    
    <div class="overview">
      
      <p>Imagine beautiful French doors opening to your private balcony.
      The view includes Miramar beach and the Gulf of Mexico (partial view),
      or your condo may overlook the resort's beautiful in-ground pool.
      Spectacular emerald green waters and powder soft beaches are just part of
      Summerspell's charms: Destin abounds with family fun and world-class golfing and fishing.</p>
  
      <p>Summerspell properties are on the first and second floors of this convenient,
      three-story mid-rise resort, directly across the street from the Gulf!
      Each vacation home features a full kitchen, including a dishwasher and microwave;
      television, DVD/VCR, telephone, air conditioning/heat and a private balcony.</p>
      
      <p>Summerspell properties are on the first and second floors of this convenient,
      three-story mid-rise resort, directly across the street from the Gulf!
      Each vacation home features a full kitchen, including a dishwasher and microwave;
      television, DVD/VCR, telephone, air conditioning/heat and a private balcony.</p>
      
      <p>Summerspell properties are on the first and second floors of this convenient,
      three-story mid-rise resort, directly across the street from the Gulf!
      Each vacation home features a full kitchen, including a dishwasher and microwave;
      television, DVD/VCR, telephone, air conditioning/heat and a private balcony.</p>
      
    </div>
    
    <div class="destination-details">
      <ul class="details-tabs">
        <li class="active">
          <a href="#details-amenities" data-toggle="tab">Amenities</a>
        </li>
        <li>
          <a href="#details-attractions" data-toggle="tab">Local Attractions</a>
        </li>
        <li>
          <a href="#details-availability" data-toggle="tab">Availability &amp; Booking</a>
        </li>
      </ul>
      <div class="tab-content">
        <div class="tab-pane active" id="details-amenities">
          <div class="row">
            <div class="col-xs-6">
              <h4>Resort Amenities</h4>
              <?= $property->amenities->resort ?>
            </div>
            <div class="col-xs-6">
              <h4>Unit Amenities</h4>
              <?= $property->amenities->unit ?>
            </div>
          </div>
        </div>
        
        <div class="tab-pane" id="details-attractions">
          <h4>Local Area Name</h4>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ultrices pulvinar
          velit a vehicula. In tristique consectetur magna, vitae consequat turpis faucibus
          vitae. Praesent vehicula fringilla facilisis. Fusce congue eget risus quis consequat.
          Donec interdum euismod luctus. Praesent hendrerit, neque aliquam dignissim ultricies,
          est neque pulvinar nibh, in rhoncus erat ipsum quis urna. Vestibulum malesuada risus
          velit, ut lacinia eros euismod ac. Mauris in tellus nisi.</p>

          <p>Duis sagittis mattis laoreet. In hac habitasse platea dictumst. Nulla in congue dui.
          Aliquam id ligula felis. In ac erat sed orci lacinia iaculis eget a ex. Sed semper mi
          non bibendum vehicula. Nulla in commodo massa, et ullamcorper ex. Suspendisse libero
          nulla, imperdiet a nisl eget, aliquam pharetra erat. Maecenas diam elit, vestibulum ut
          dui id, facilisis pulvinar tellus. Morbi ac diam cursus, mattis nunc vel, dignissim
          purus.</p>
        </div>
        
        <div class="tab-pane" id="details-availability">
          Availability
        </div>
      </div>
    </div>
  </div>
  <div class="left-column sidebar">
    <a href="javascript:window.history.go(-1)" class="prev-link">
      &larr; Return to previous page
    </a>
    <div class="destination-sidebar">
      
      <div class="destination-info">
        
        <h1 class="destination-title"><?= $property->title ?></h1>
        
        <div class="address">
          <span class="street"><?= $property->address ?></span><br />
          <span class="city"><?= $property->city ?></span>, <span class="state"><?= $property->state ?></span>
        </div>
        
        <div class="check-in-out">
          <strong class="info-label">Check-in/out:</strong>
          <?= $property->checkinDay ?> - <?= $property->checkinDay ?>
        </div>
        
        <div class="unit-sizes">
          <strong class="info-label">Unit Size(s):</strong>
          <?php
          $rooms = array();
          foreach( $property->rooms as $room ){
            $rooms[] = $room['bedrooms'].' BR';
          }
          echo implode(', ', $rooms);
          ?>
        </div>
      </div>
      
      <div class="booking-widget" data-property="<?= htmlspecialchars( json_encode( $property, ENT_QUOTES ) ) ?>">
        <button type="button" class="btn btn-block btn-success btn-lg widget-toggle" data-toggle="booking-widget">
          View Available Dates
        </button>
        <div class="booking-widget-content">
          <div class="booking-panel active" data-booking-panel="choose-date">
            <p>Select an available check-in date:</p>
            
            <?php
            $date = new DateTime();
            $date->modify('Sunday');
            $available_dates = array();
            $room_availability = array();
            for( $i=0; $i<51; $i++ ){
              if( rand(1,3) == 1 ){
                $excess_dates[] = $date->format('Y-m-d');
              }
              else{
                $available_dates[] = $date->format('Y-m-d');
              }
              
              $rooms = array(
                array(
                  'bedrooms'      => 1,
                  'rate'          => '$248',
                  'vap'           => '$30'
                ),
                array(
                  'bedrooms'      => 2,
                  'rate'          => '$248',
                  'vap'           => '$30'
                )
              );
              
              $room_availability[ $date->format('Y-m-d') ] = $rooms;
              
              $date->modify('next Sunday');
            }
            ?>
            <div class="date-picker tan-datepicker"
              data-available-dates="<?= htmlspecialchars( json_encode($available_dates) ) ?>"
              data-excess-dates="<?= htmlspecialchars( json_encode($excess_dates) ) ?>"
              data-room-availability="<?= htmlspecialchars( json_encode($room_availability) ) ?>"></div>
          
            <div class="date-picker-legend">
              <span class="key available">
                <i class="square"></i>
                Available
              </span>
              <span class="key excess-inventory">
                <i class="square"></i>
                Excess Inventory
              </span>
            </div>
          </div>
          
          <div class="booking-panel" data-booking-panel="book">
            <p>
              <a href="#" data-booking-slide="choose-date" data-booking-slide-direction="false"><i class="fa fa-angle-left"></i> View Calendar</a>
            </p>
            
            <div class="panel-content"></div>
            
            <script class="panel-tmpl" type="text/x-handlebars-template">
              <div class="dates">{{dates}}</div>
              <ul class="rooms">
                {{#each rooms}}
                <li class="room" data-index="{{@index}}">
                  <h5>{{bedrooms}} BDRM</h5>
                  <div class="detail">
                    <span class="name">Room Rate:</span>
                    <span class="value">{{rate}}/week</span>
                  </div>
                  <div class="checkbox">
                    <label class="detail">
                      <input name="vap" type="checkbox" checked="checked"/>
                      <span class="name">VAP <a href="#" data-toggle="tooltip" title="What is VAP?">?</a>:</span>
                      <span class="value">{{vap}}</span>
                    </label>
                  </div>
                  <button type="button" class="btn btn-success" data-action="book">
                    Book Now
                  </button>
                </li>
                {{/each}}
              </ul>
            </script>
            
          </div>
          
          <div class="booking-panel" data-booking-panel="login">
            <p>
              <a href="#" data-booking-slide="choose-date" data-booking-slide-direction="false"><i class="fa fa-angle-left"></i> Back to Calendar</a>
            </p>
            <h4>Please log in to continue</h4>
            <form action="?" data-action="login">
              <div class="form-group">
                <input name="username" type="text" class="form-control" placeholder="Username" />
              </div>
              <div class="form-group">
                <input name="password" type="password" class="form-control" placeholder="Password" />
              </div>
              <button type="submit" class="btn btn-success">Login</button>
              <ul class="login-links list-unstyled">
                <li><a href="#">Forgot password?</a></li>
                <li><a href="#">Not registered?</a></li>
              </ul>
            </form>
          </div>
        </div>
      </div>
      
      <div class="destination-utility-links">
        <a href="https://goo.gl/maps/4I7lB" target="_blank"><i class="fa fa-map-marker"></i> Map</a>
        <a href="javascript:window.print();"><i class="fa fa-print"></i> Print</a>
      </div>
    </div>
  </div>
</div>
<script src="/assets/js/destination.js"></script>