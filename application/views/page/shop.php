    <div class="site-section">
      <div class="container">
        
        <div class="row">
          <div class="col-lg-6">
            <h3 class="mb-3 h6 text-uppercase text-black d-block">Filter by Price</h3>
            <div id="slider-range" class="border-primary"></div>
            <input type="text" name="text" id="amount" class="form-control border-0 pl-0 bg-white" disabled="" />
          </div>
          <div class="col-lg-6">
            <h3 class="mb-3 h6 text-uppercase text-black d-block">Filter by Reference</h3>
            <button type="button" class="btn btn-secondary btn-md dropdown-toggle px-4" id="dropdownMenuReference"
              data-toggle="dropdown">Reference</button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuReference">
              <a class="dropdown-item" href="#">Relevance</a>
              <a class="dropdown-item" href="#">Name, A to Z</a>
              <a class="dropdown-item" href="#">Name, Z to A</a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="#">Price, low to high</a>
              <a class="dropdown-item" href="#">Price, high to low</a>
            </div>
          </div>
        </div>
    
        <div class="row itemList">
          <!-- <div class="col-sm-6 col-lg-4 text-center item mb-4">
            <span class="tag">Sale</span>
            <a href="shop-single.html"> <img src="/pharmaShop/static/libraries/images/product_01.png" alt="Image"></a>
            <h3 class="text-dark"><a href="shop-single.html">Bioderma</a></h3>
            <p class="price"><del>95.00</del> &mdash; $55.00</p>
          </div>-->
        </div>
        <div class="row mt-5">
          <div class="col-md-12 text-center">
            <div class="site-block-27">
              <ul class="itemSelect">
                <!-- <li><a href="#">&lt;</a></li>
                <li class="active"><span>1</span></li>
                <li><a href="#">2</a></li>
                <li><a href="#">3</a></li>
                <li><a href="#">4</a></li>
                <li><a href="#">5</a></li>
                <li><a href="#">&gt;</a></li> -->
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 종류별 검색을 위함 전체 검색일 경우 : 0 -->
    <script> var kindCd = <?php echo empty($kindCd)?0:$kindCd ?>;</script>
    <script src="/pharmaShop/static/libraries/js/pharma_store.js"></script>