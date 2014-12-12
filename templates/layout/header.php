<div id="header">
  <div class="top-row">
    <div class="page">
      <h1 class="logo">
        <a href="/"></a>
      </h1>
      <div class="utility-nav">
        <ul>
          <li>
            <a href="/pub/about-us">About TAN</a>
          </li>
          <li class="logged-out highlight-link">
            <a href="#"><strong>Member Login</strong></a>
            <div class="dropdown">
              <div class="dropdown-content">
                <form action="?" class="login-form" data-action="login">
                  <div class="form-group">
                    <input name="username" type="text" class="form-control" placeholder="Username" />
                  </div>
                  <div class="form-group">
                    <input name="password" type="password" class="form-control" placeholder="Password" />
                  </div>
                  <button type="submit" class="btn btn-success btn-block">Login</button>
                  <ul class="login-links list-unstyled">
                    <li><a href="#">Forgot password?</a></li>
                    <li><a href="#">Not registered?</a></li>
                  </ul>
                </form>
              </div>
            </div>
          </li>
          <li class="logged-in  highlight-link">
            <a href="#"><strong>Hello Ellen!</strong><div class="label label-outside label-orange">3</div></a>
            <div class="dropdown">
              <div class="dropdown-content">
                <ul>
                  <li>
                    <a href="#">My Profile</a>
                  </li>
                  <li>
                    <a href="#">My Bookings <span class="label label-default">2</span></a>
                  </li>
                  <li>
                    <a href="#">My Vacations</a>
                  </li>
                  <li>
                    <a href="#">My Account <span class="label label-default">1</span></a>
                  </li>
                  <li>
                    <a href="#">My Preferences</a>
                  </li>
                  <li>
                    <a href="#" data-action="logout">Logout</a>
                  </li>
                </ul>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
  
  <div class="bottom-row">
    <div class="page">
      <div class="tool-toggle" data-toggle="search-tool">
        <h2>Where do you want to go?</h2>
      </div>
      
      <div class="primary-nav">
        <ul>
          <li class="has-menu">
            <a href="/destinations/by-region">Destinations</a>
            <ul>
              <li>
                <a href="/destinations/by-region">By Region</a>
              </li>
              <li>
                <a href="/destinations/by-date">By Date</a>
              </li>
              <li>
                <a href="/destinations/by-activity">By Activity</a>
              </li>
              <li>
                <a href="/excess-inventory">Excess Inventory</a>
              </li>
            </ul>
          </li>
          <li class="has-menu">
            <a href="#">Plan Your Vacation</a>
          </li>
          <li class="has-menu">
            <a href="/benefits">Your Benefits</a>
          </li>
          <li class="has-menu">
            <a href="#">Specials</a>
          </li>
        </ul>
      </div>
    </div>  
  </div>
  
  <?php
  $this->tmpl('layout/header/tool');
  ?>
</div>