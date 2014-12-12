<div class="clearfix two-column-layout">
  <div class="main-column">
    <h1 class="page-title">Destinations</h1>
    <div class="destination-results">
      <div class="search">
        <div class="filters"></div>
        <div class="search-results">
          
        </div>
      </div>
      <div class="default-default-results" data-results="<?php ob_start(); $this->tmpl('content/results2', array('total'=>6) ); echo htmlspecialchars(trim(ob_get_clean()), ENT_QUOTES) ?>">
        <p>Browse our exciting properties below, or use the filters at left to find the perfect getaway.</p>
        <div class="results">
          <?php
          $this->tmpl('content/results', array('total'=>6) );
          ?>
        </div>
      </div>
    </div>
  </div>
  <div class="left-column sidebar">
    <?php
    $this->tmpl('layout/destinations/sidebar', array(
      'browse'      => $this->browse
    ));
    ?>
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
<script src="/assets/js/destinations.js"></script>