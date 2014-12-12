<div id="footer">
  <div class="container">
    <div class="row">
      <div class="col-sm-4">
        <div class="contact-block">
          <p>Questions? Contact us at</p>
          <a class="telephone" href="tel:18002230088">1.800.223.0088</a>
          <a href="mailto:vacationservices@planwithtan.com">vacationservices@planwithtan.com</a>
        </div>
      </div>
      <div class="col-sm-8 primary-footer-content">
        <div class="right">
          <a href="#" class="bbb">
            <img src="/assets/images/bbb_onblue@2x.png" width="204" height="71" />
          </a>
          
          <a href="#top" class="back-to-top">
            <i class="fa fa-chevron-up"></i>
            <span>Back to top</span>
          </a>
        </div>
        <div class="footer-nav">
          <ul>
            <li>
              <a href="#">Careers</a>
            </li>
            <li>
              <a href="#">Media Center</a>
            </li>
            <li>
              <a href="#">Privacy Policy</a>
            </li>
            <li>
              <a href="#">Terms of Use</a>
            </li>
          </ul>
        </div>
        
        <div class="copyright">
          Copyright &copy; 2014 Travel Advantage Network. All Rights Reserved.
        </div>
      </div>
    </div>
  </div>
</div>

<div class="modal fade out tan-modal" id="cart-modal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal"><i class="fa fa-close"></i><span class="sr-only">Close</span></button>
      </div>
      <div class="modal-body">
        
        <script class="body-tmpl" type="text/x-handlebars-template">
        
          <h2>Ready to check out?</h2>
  
          <p>You have 15 minutes to complete this booking. If you need more time, you may also place a 24 hour hold on any property. A non-refundable deposit of $25.00 is required.
          Please select an option below to continue:</p>
          {{#if highlight_property}}
            {{#with highlight_property}}
              {{> property_modal}}
            {{/with}}
            
            {{#if more_properties.length}}
              <div class="more-properties-toggle">
                <a data-toggle="collapse" target="#booking-modal-more-properties">
                  View all selected properties
                </a>
              </div>
              <div id="booking-modal-more-properties">
                {{#each more_properties}}
                  {{> property_modal}}
                {{/each}}
              </div>
            {{/if}}
            
          {{else}}
            {{#each properties}}
              {{> property_modal}}
            {{/each}}
          {{/if}}
          
          
        </script>
        <script class="property-tmpl" type="text/x-handlebars-template">
          <div class="row property-row">
            <div class="col-xs-3">
              <img src="{{property.thumb}}" />
            </div>
            <div class="col-xs-5">
              <h5>{{property.title}} ({{room.bedrooms}} BDRM)</h5>
              <div class="detail">
                <span class="name">Dates:</span>
                <span class="value">{{dates}}</span>
              </div>
              <div class="detail">
                <span class="name">Room Rate:</span>
                <span class="value">{{room.rate}}/week</span>
              </div>
              <div class="detail checkbox">
                <label>
                  <input type="checkbox" name="vap" {{#if vapEnabled}}checked="checked"{{/if}} />
                  <span class="name">VAP ?:</span>
                  <span class="value">{{room.vap}}</span>
                </label>
              </div>
              
              <div class="timing-remaining" data-expiration="{{expires}}">
                Complete this booking within <span data-time="true"></span>
              </div>
              
              <div class="cancel">
                <a href="#" data-action="cancel" data-index="{{index}}" class="cancel-room">Cancel</a>
              </div>
            </div>
            <div class="col-xs-4">
              <div class="buttons">
                <a class="btn btn-block btn-success" data-action="check-out">Check Out Now</a>
                <a class="btn btn-block btn-secondary" data-action="hold">Hold for 24 Hours</a>
              </div>
            </div>
          </div>
        </script>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close &amp; Continue Browsing</button>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->

<div id="cart-footer">
  <div class="page">
    <div class="items swiper-container ">
      <div class="swiper-wrapper">
        
      </div>
    </div>
    <div class="col-xs-1 view-all-container">
    </div>
    <script class="view-all-tmpl" type="text/x-handlebars-template">
      <div class="nav-container">
        <a class="property-nav prev" href="#" data-nav="prev"><i class="fa fa-angle-left"></i></a>
        <span class="nav-info">
          <span class="cur">{{cur}}</span>/<span class="total">{{total}}</span>
        </span>
        <a class="property-nav next" href="#" data-nav="next"><i class="fa fa-angle-right"></i></a>
      </div>
      <a href="#cart-modal" data-toggle="modal" >View All</a>
    </script>
    <script class="property-tmpl" type="text/x-handlebars-template">
      <div class="row property-row" data-index="{{index}}">
        <div class="col-xs-11">
          <div class="row">
            <div class="col-xs-7">
              <div class="row">
                <div class="col-xs-3">
                  <button class="btn btn-lg btn-green btn-block" data-action="checkout">
                    Check Out
                  </button>
                </div>
                <div class="col-xs-5 title-column">
                  <h5>{{property.title}} ({{room.bedrooms}} BDRM)</h5>
                  <h6>{{dates}}</h6>
                </div>
                <div class="col-xs-4 rate-column">
                  <div class="detail">
                    <span class="name">Room Rate:</span>
                    <span class="value">{{room.rate}}/week</span>
                  </div>
                  <div class="detail checkbox">
                    <label>
                      <input type="checkbox" name="vap" {{#if vapEnabled}}checked="checked"{{/if}} />
                      <span class="name">VAP ?:</span>
                      <span class="value">{{room.vap}}</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="col-xs-5 countdown-column">
              <p class="time-remaining" data-expiration="">
                This property is on hold for <span data-time="true"></span>
              </p>
              <p><a href="#" data-action="cancel" data-index="{{index}}" class="cancel-room">Cancel</a></p>
            </div>
          </div>
        </div>
      </div>
    </script>
    <script 
  </div>
</div>