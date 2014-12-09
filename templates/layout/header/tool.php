<div class="search-tool">
    <div class="search-tool-wrap">
      <div class="search-nav-wrap">
        <div class="page">
          <div class="search-nav-bg">
            <div class="search-nav">
              <span class="choose-label">
                Choose:
              </span>
              <ul class="browse-by">
                <li class="active">
                  <a href="#search-tool-region" data-toggle="tab">Region</a>
                </li>
                <li>
                  <a href="#search-tool-date" data-toggle="tab">Date</a>
                </li>
                <li>
                  <a href="#search-tool-activity" data-toggle="tab">Activity</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="search-content">
        <div class="page">
          <a class="close-search-tool" href="#" data-toggle="search-tool">
            close <span class="tan-icon-close"></span>
          </a>
          <div class="tab-content">
            <div class="tab-pane active" id="search-tool-region">
              <div class="column">
                <h3>
                  Choose a region below:
                </h3>
                <div class="column-content">
                  <ul>
                    <li><a href="#">All Regions</a></li>
                    <?php
                    foreach( Tan\Utility::getRegions() as $key => $region ){
                      ?>
                    <li><a href="/destinations/by-region#region=<?= $key ?>"><?= htmlentities( $region ) ?></a></li>
                      <?php
                    }
                    ?>
                  </ul>
                </div>
              </div>
              <div class="column">
                <h3>
                  Or, select from the interactive map:
                </h3>
                <div class="column-content">
                  <div class="interactive-map">
                  <?php
                  $this->tmpl('common/map');
                  ?>
                  </div>
                </div>
              </div>
            </div>
            <div class="tab-pane" id="search-tool-date">
              <div class="column">
                <h3>
                  Choose a check-in date:
                </h3>
                <div class="column-content">
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
              </div>
              <div class="column">
                <h3>
                  Or, select a time period:
                </h3>
                <div class="column-content">
                  <div class="inner-column">
                    <ul>
                      <li>
                        <a href="#">December 2014</a>
                      </li>
                      <li>
                        <a href="#">January 2015</a>
                      </li>
                      <li>
                        <a href="#">February 2015</a>
                      </li>
                      <li>
                        <a href="#">March 2015</a>
                      </li>
                      <li>
                        <a href="#">April 2015</a>
                      </li>
                      <li>
                        <a href="#">May 2015</a>
                      </li>
                      <li>
                        <a href="#">June 2015</a>
                      </li>
                    </ul>
                  </div>
                  <div class="inner-column">
                    <ul>
                      <li>
                        <a href="#">July 2015</a>
                      </li>
                      <li>
                        <a href="#">August 2015</a>
                      </li>
                      <li>
                        <a href="#">September 2015</a>
                      </li>
                      <li>
                        <a href="#">October 2015</a>
                      </li>
                      <li>
                        <a href="#">November 2015</a>
                      </li>
                      <li>
                        <a href="#">December 2015</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="tab-pane" id="search-tool-activity">
              <div class="row activity-list">
                <div class="col-sm-3">
                  <a href="/destinations/by-activity#activity=beach">
                    <span class="image-wrap">
                      <!-- <img src="http://lorempixel.com/220/194/people/" /> -->
                      <img src="http://placehold.it/220x194" />
                      <span class="view-all">
                        <span class="view-all-copy">
                          <i class="fa fa-plus"></i>
                          <span>View All</span>
                        </span>
                      </span>
                    </span>
                    <h3>Beach Getaway</h3>
                  </a>
                </div>
                
                <div class="col-sm-3">
                  <a href="/destinations/by-activity#activity=family">
                    <span class="image-wrap">
                      <!--<img src="http://lorempixel.com/220/194/sports/" />-->
                      <img src="http://placehold.it/220x194" />
                      <span class="view-all">
                        <span class="view-all-copy">
                          <i class="fa fa-plus"></i>
                          <span>View All</span>
                        </span>
                      </span>
                    </span>
                    <h3>Family Fun</h3>
                  </a>
                </div>
                
                <div class="col-sm-3">
                  <a href="/destinations/by-activity#activity=golf">
                    <span class="image-wrap">
                      <!--<img src="http://lorempixel.com/220/194/food/" />-->
                      <img src="http://placehold.it/220x194" />
                      <span class="view-all">
                        <span class="view-all-copy">
                          <i class="fa fa-plus"></i>
                          <span>View All</span>
                        </span>
                      </span>
                    </span>
                    <h3>Golf Outing</h3>
                  </a>
                </div>
                
                <div class="col-sm-3">
                  <a href="/destinations/by-activity#activity=mountain">
                    <span class="image-wrap">
                      <!--<img src="http://lorempixel.com/220/194/nature/" />-->
                      <img src="http://placehold.it/220x194" />
                      <span class="view-all">
                        <span class="view-all-copy">
                          <i class="fa fa-plus"></i>
                          <span>View All</span>
                        </span>
                      </span>
                    </span>
                    <h3>Mountain Escape</h3>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>