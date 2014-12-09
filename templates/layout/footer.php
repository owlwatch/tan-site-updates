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

<div class="modal fade" id="booking-confirmation-window">
  <div class="modal-dialog">
    <div class="modal-content">
      <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
      <div class="modal-body">
        
        <script class="body-tmpl" type="text/x-handlebars-template">
        
          <h2>Ready to check out?</h2>
  
          <p>You have 15 minutes to complete this booking. If you need more time, you may also place a 24 hour hold on any property. A non-refundable deposit of $25.00 is required.
          Please select an option below to continue:</p>
          
          <div class="row">
            <div class="col-xs-3">
              <img src="{{thumb}}" />
            </div>
            <div class="col-xs-6">
              <h3>{{title}} ({{bedrooms}} BDRM)</h3>
              <div class="detail">
                <span class="name">Dates:</span>
                <span class="value">{{dates}}</span>
              </div>
              <div class="detail">
                <span class="name">Room Rate:</span>
                <span class="value">{{rate}}/week</span>
              </div>
              <div class="detail checkbox">
                <label>
                  <input type="checkbox" name="vap" {{#if vapChecked}}checked="checked"{{/if}} />
                  <span class="name">VAP ?:</span>
                  <span class="value">{{vapAmount}}</span>
                </label>
              </div>
              
              <div class="timing-info">
                Complete this booking within <span class="time-remaining" data-expiration-time="{{expires}}"></span>
              </div>
              
              <div class="cancel">
                <a href="#" data-action="cancel" class="cancel-room">Cancel</a>
              </div>
            </div>
            <div class="col-xs-3">
              <div class="buttons">
                <a class="btn btn-block btn-success" data-action="check-out">Check Out Now</a>
                <a class="btn btn-block btn-secondary" data-action="hold">Hold for 24 Hours</a>
              </div>
            </div>
          </div>
        </script>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->