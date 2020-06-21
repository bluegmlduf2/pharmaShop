<div class="row">
  <!-- 1번째 열 -->
	<div class="col-md-6 mb-5 mb-md-0">
  <h2 class="h3 mb-3 text-black">&nbsp&nbsp Item List</h2>
          <form class="col-md-12" method="post">
            <div class="site-blocks-table">
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th class="product-code">Code</th>
                    <th class="product-name">Name</th>
                    <th class="product-kind">Kind</th>
                    <th class="product-price">Price</th>
                  </tr>
                </thead>
                <tbody id="itemList">
                <!-- CartRow -->
                </tbody>
              </table>
                <div class="col-md-12 text-center">
                  <div class="site-block-27">
                    <ul class="itemSelect">
                        <!-- Navigator List -->
                    </ul>
                  </div>
                </div>
            </div>
          </form>
	</div>
	<!-- 2번째 열 -->
	<div class="col-md-6 mb-5 mb-md-0">
		<h2 class="h3 mb-3 text-black">Item Details</h2>
		<div class="p-3 p-lg-5 border">
			<div class="form-group row">
				<div class="col-md-6">
					<label for="itemcd" class="text-black">Cd</label>
					<input type="text" class="form-control" id="itemcd" disabled="disabled">
				</div>
				<div class="col-md-6">
					<label for="itemName" class="text-black">Name <span class="text-danger">*</span></label>
					<input type="text" class="form-control" id="itemName" >
				</div>

			</div>
			<div class="form-group row">
				<div class="col-md-6">
					<label for="itemKind" class="text-black">Kind <span class="text-danger">*</span></label>
					<select id="itemKind" class="form-control">
						<!-- kind -->
					</select>
				</div>
				<div class="col-md-6">
					<label for="itemSale" class="text-black">Sale(%)</label>
					<input type="text" class="form-control" id="itemSale" >
				</div>
			</div>
			<div class="form-group row">
				<div class="col-md-6">
					<label for="itemPrice" class="text-black">Price($)<span class="text-danger">*</span></label>
					<input type="text" class="form-control" id="itemPrice" >
				</div>			
				<div class="col-md-6">
					<label for="itemTake" class="text-black">Take</label>
					<input type="text" class="form-control" id="itemTake">
				</div>	
			</div>
			<div class="form-group row">
				<div class="col-md-6">
					<label for="itemImage" class="text-black" style="display:block;">Image <span class="text-danger">*</span></label>
					<!-- <input type="text" class="form-control" id="c_lname" name="c_lname"> -->
					<!-- <div class="site-blocks-cover inner-page" style="background-image: url('images/hero_1.jpg');"> -->
					<img src='/pharmaShop/static/libraries/images/noimage.png' id='itemImage' alt='Image' class='img-fluid'>
				</div>	
				<div class="col-md-6">
					<!-- <input class="upload-name" value="Select File" disabled="disabled" >  -->
					<input type="file" id="input-file" class="upload-hidden">
				</div>	
			</div>
			<div class="form-group">
				<label for="itemContent" class="text-black">Content</label>
				<textarea id="itemContent" cols="30" rows="5" class="form-control"
					placeholder="Write your notes here..."></textarea>
			</div>
			<div class="btn btn-primary btn-sm px-2" type="button" id='btnInit'>INIT VALUE</div>&nbsp
			<div class="btn btn-primary btn-sm px-2" type="button" id='btnSave'>SAVE</div>
		</div>
	</div>
</div>

<script src="/pharmaShop/static/libraries/js/pharma_management.js"></script>