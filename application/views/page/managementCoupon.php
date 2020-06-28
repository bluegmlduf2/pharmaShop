<!--li태그는 block 속성임, inline은 width가 안먹음. inline-block으로 하면 한줄차지안함,width가 먹음  -->
<div style='text-align:center; margin:20px 10px 20px 10px; font-size:1.5em;'>
	<li style='display:inline-block; margin-left:30px;'><a href="/pharmaShop/main/managementItem">Item Management</a></li>
	<li style='display:inline-block; margin-left:30px;'><a href="/pharmaShop/main/managementShip">Ship Management</a></li>
	<li style='display:inline-block; margin-left:30px;'><a href="/pharmaShop/main/managementCoupon">Coupon Management</a></li>
</div>

<!-- 2번째 행 -->
<div class="row" style="margin-top:60px;">
  <!-- 1번째 열 -->
	<div class="col-md-12 mb-5 mb-md-0">
  	<h2 class="h3 mb-3 text-black">&nbsp&nbsp Shipping List</h2>
          <form class="col-md-12" method="post">
            <div class="site-blocks-table">
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th class="ship-code">Ship Code</th>
                    <th class="order-code">Order Code</th>
                    <th class="ship-state">Ship State</th>
                    <th class="ship-date">Ship Date</th>
                  </tr>
                </thead>
                <tbody id="shipList">
                <!-- CartRow -->
                </tbody>
              </table>
                <div class="col-md-12 text-center">
                  <div class="site-block-27">
                    <ul class="shipSelect">
                        <!-- Navigator List -->
                    </ul>
                  </div>
                </div>
            </div>
          </form>
	</div>
</div>


<script src="/pharmaShop/static/libraries/js/pharma_management.js"></script>