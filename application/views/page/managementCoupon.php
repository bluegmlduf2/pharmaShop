<!--li태그는 block 속성임, inline은 width가 안먹음. inline-block으로 하면 한줄차지안함,width가 먹음  -->
<div style='text-align:center; margin:20px 10px 20px 10px; font-size:1.5em;'>
	<li style='display:inline-block; margin-left:30px;'><a href="/pharmaShop/main/managementItem">Item Management</a></li>
	<li style='display:inline-block; margin-left:30px;'><a href="/pharmaShop/main/managementShip">Ship Management</a></li>
	<li style='display:inline-block; margin-left:30px;'><a href="/pharmaShop/main/managementCoupon">Coupon Management</a></li>
</div>

  <!-- 1번째 행 -->
<div class="row">
  <!-- 1번째 열 -->
	<div class="col-md-6 mb-5 mb-md-0">
  <h2 class="h3 mb-3 text-black">&nbsp&nbsp Coupon List</h2>
          <form class="col-md-12" method="post">
            <div class="site-blocks-table">
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th class="coupon-code">Coupon Code</th>
                    <th class="coupon-num">Coupon Num</th>
                    <th class="coupon-use">Use</th>
                    <th class="coupon-amount">Amount ($)</th>
                  </tr>
                </thead>
                <tbody id="couponList">
                <!-- CartRow -->
                </tbody>
              </table>
                <div class="col-md-12 text-center">
                  <div class="site-block-27">
                    <ul class="couponSelect">
                        <!-- Navigator List -->
                    </ul>
                  </div>
                </div>
            </div>
          </form>
	</div>
	<!-- 2번째 열 -->
	<div class="col-md-6 mb-5 mb-md-0">
		<h2 class="h3 mb-3 text-black">Coupon Details</h2>
		<div class="p-3 p-lg-5 border">
			<div class="form-group row">
				<div class="col-md-6">
					<label for="couponcd" class="text-black">Coupon Code</label>
					<input type="text" class="form-control" id="couponcd" disabled="disabled">
				</div>
				<div class="col-md-6">
					<label for="couponNum" class="text-black">Coupon Num <span class="text-danger">*</span></label>
					<input type="text" class="form-control" id="couponNum" >
				</div>
			</div>
			<div class="form-group row">
				<div class="col-md-6">
					<label for="couponUse" class="text-black">Use <span class="text-danger">*</span></label>
					<select id="couponUse" class="form-control">
						<option id="UNUSED" value="0">UNUSED</option>
						<option id="USED" value="1">USED</option>
					</select>
				</div>
				<div class="col-md-6">
					<label for="couponAmt" class="text-black">Amount($) <span class="text-danger">*</span></label>
					<input type="text" class="form-control" id="couponAmt" numberonly="true">
				</div>
			</div>
			<div style='float:left;'>
				<div class="btn btn-primary btn-md px-2" type="button" id='btnInit'>INIT VALUE</div>
			</div>
			<div style='float:right;'>
				<div class="btn btn-primary btn-md px-2" type="button" id='btnDelete'>DELETE</div>
				<div class="btn btn-primary btn-md px-2" type="button" id='btnSave'>SAVE</div>			
			</div>
		</div>
	</div>
</div>

<script src="/pharmaShop/static/libraries/js/pharma_managementCoupon.js"></script>