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
					<label for="itemName" class="text-black">Item Name <span class="text-danger">*</span></label>
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
					<input type="text" class="form-control" id="itemSale" numberonly="true" maxlength="2">
				</div>
			</div>
			<div class="form-group row">
				<div class="col-md-6">
					<label for="itemPrice" class="text-black">Price($)<span class="text-danger">*</span></label>
					<input type="text" class="form-control" id="itemPrice" numberonly="true">
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
					<form action="/pharmaShop/main/saveImage" method="post" id="form_img" enctype="multipart/form-data"  accept-charset="utf-8">
						<div>
							<label for="itemImage" class="text-black">Select image file</label><span class="text-danger">*</span>
							<input type="file" name="image" id="image" >
							<span class="error image"></span>
						</div>
						</br>
						<label for="itemPath" class="text-black" style="display:block;">Save file Path</label>
						<input type="text" class="form-control" id="itemPath" disabled='disabled'>
 		    	 		<input type="submit" name="submit" value="Image Save" style="margin-top:15px;">
        			</form>
				</div>	
			</div>
			<div class="form-group">
				<label for="itemContent" class="text-black">Content</label>
				<textarea id="itemContent" cols="30" rows="5" class="form-control"
					placeholder="Write your notes here..."></textarea>
			</div>
            <div class="form-group row">
				<div class="col-md-12">
					<label for="itemListTbl" class="text-black">ItemDetailList</label>&nbsp
					<button class='btn btn-outline-primary' type='button' id='addItemBtn'>Add Item</button>
					<table table class="table table-bordered" id='itemListTbl' style='margin-top:15px;'>
						<thead>
						<tr>
							<th class="medicine-cd">Medicine Code</th>
							<th class="medicine-name">Medicine Name</th>
							<th class="medicine-effect">MEdicine Effect</th>
							<th class="medicine-remove">Remove</th>
						</tr>
						</thead>
						<tbody id="itemDetailList">
						<!-- itemDetailList -->
						</tbody>
					</table>
			  </div>
            </div>
			<div class="btn btn-primary btn-sm px-2" type="button" id='btnInit'>INIT VALUE</div>&nbsp
			<div class="btn btn-primary btn-sm px-2" type="button" id='btnSave'>SAVE</div>
		</div>
	</div>
</div>

<!-- 레이어팝업 -->
<div id="modalDetailBox" class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title" id="myModalLabel">Search Medicine</h4>
          </div>
          <div class="modal-body">
            <div class="col-md-12">
                <!-- <label for="MNG_ID" class="text-black">ID</label>
                <input type="text" class="form-control" id="MNG_ID"> -->
				<table table class="table table-bordered" id='itemDetailListHead' style='margin-top:15px;'>
						<thead>
							<tr>
								<th class="medicine-detail-cd">Code</th>
								<th class="medicine-detail-name">Name</th>
								<th class="medicine-detail-effect">Effect</th>
							</tr>
						</thead>
							<div class="form-group row">
								<div class="col-md-9">
									<input type="text" class="form-control" id="search_cd" placeholder="Search MedicineName..">
								</div>
								<div class="col-md-3">	
									<button type="button" class="btn btn-primary" id="searchBtn" onclick="detailSearch()">Search</button>
								</div>
							</div>
						<tbody id="itemDetailListBody">
							<!-- medicine list -->
						</tbody>
				</table>
            </div>
          </div>
          <div class="modal-footer">
            <!-- <button type="button" class="btn btn-primary" id="confirmDetailBtn">Ok</button> -->
            <button type="button" class="btn btn-default" id="closeModalDetailBtn">Cancel</button>
          </div>
        </div>
      </div>
    </div>
</div>


<script src="/pharmaShop/static/libraries/js/pharma_management.js"></script>