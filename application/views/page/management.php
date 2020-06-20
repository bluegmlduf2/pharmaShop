<!-- <div>aaaaaaaaaaaaaaaaaaaaaa<?php echo $memName ?></div> -->
<div class="row">
  <!-- 1번째 열 -->
	<div class="col-md-6 mb-5 mb-md-0">
  <h2 class="h3 mb-3 text-black">&nbsp&nbsp Item List</h2>
          <form class="col-md-12" method="post">
            <div class="site-blocks-table">
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th class="product-thumbnail">Image</th>
                    <th class="product-name">Product</th>
                    <th class="product-price">Price</th>
                    <th class="product-quantity">Quantity</th>
                    <th class="product-total">Total</th>
                    <th class="product-remove">Remove</th>
                  </tr>
                </thead>
                <tbody id="cartItemList">
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
			<div class="form-group">
				<label for="c_country" class="text-black">Country <span class="text-danger">*</span></label>
				<select id="c_country" class="form-control">
					<option value="1">Select a country</option>
					<option value="2">South Korea</option>
					<option value="3">Japan</option>
					<option value="4">China</option>
					<option value="5">America</option>
					<option value="6">India</option>
					<option value="7">Russia</option>
				</select>
			</div>
			<div class="form-group row">
				<div class="col-md-6">
					<label for="c_fname" class="text-black">First Name <span class="text-danger">*</span></label>
					<input type="text" class="form-control" id="c_fname" name="c_fname">
				</div>
				<div class="col-md-6">
					<label for="c_lname" class="text-black">Last Name <span class="text-danger">*</span></label>
					<input type="text" class="form-control" id="c_lname" name="c_lname">
				</div>
			</div>

			<div class="form-group row">
				<div class="col-md-12">
					<label for="c_companyname" class="text-black">Company Name </label>
					<input type="text" class="form-control" id="c_companyname" name="c_companyname">
				</div>
			</div>

			<div class="form-group row">
				<div class="col-md-12">
					<label for="c_address" class="text-black">Address <span class="text-danger">*</span></label>
					<input type="text" class="form-control" id="c_address" name="c_address" placeholder="Street address">
				</div>
			</div>

			<div class="form-group">
				<input type="text" class="form-control" id='c_address_opt' placeholder="Apartment, suite, unit etc. (optional)">
			</div>

			<div class="form-group row">
				<div class="col-md-6">
					<label for="c_state_country" class="text-black">State / Country <span class="text-danger">*</span></label>
					<input type="text" class="form-control" id="c_state_country" name="c_state_country">
				</div>
				<div class="col-md-6">
					<label for="c_postal_zip" class="text-black">Posta / Zip <span class="text-danger">*</span></label>
					<input type="text" class="form-control" id="c_postal_zip" name="c_postal_zip" numberonly="true">
				</div>
			</div>

			<div class="form-group row mb-5">
				<div class="col-md-6">
					<label for="c_email_address" class="text-black">Email Address <span class="text-danger">*</span></label>
					<input type="text" class="form-control" id="c_email_address" name="c_email_address">
				</div>
				<div class="col-md-6">
					<label for="c_phone" class="text-black">Phone <span class="text-danger">*</span></label>
					<input type="text" class="form-control" id="c_phone" name="c_phone" placeholder="Phone Number"
						numberonly="true">
				</div>
			</div>

			<div class="form-group">
				<label for="c_create_account" class="text-black" data-toggle="collapse" href="#create_an_account" role="button"
					aria-expanded="false" aria-controls="create_an_account"><input type="checkbox" value="1"
						id="c_create_account"> Create an account?</label>
				<div class="collapse" id="create_an_account">
					<div class="py-2">
						<p class="mb-3">Create an account by entering the information below. If you are a returning customer
							please login at the top of the page.</p>
						<div class="form-group">
							<label for="c_account_password" class="text-black">Account Password</label>
							<input type="email" class="form-control" id="c_account_password" name="c_account_password" placeholder="">
						</div>
					</div>
				</div>
			</div>


			<div class="form-group">
				<label for="c_ship_different_address" class="text-black" data-toggle="collapse" href="#ship_different_address"
					role="button" aria-expanded="false" aria-controls="ship_different_address"><input type="checkbox" value="1"
						id="c_ship_different_address">
					Ship To A Different Address?</label>
				<div class="collapse" id="ship_different_address">
					<div class="py-2">

						<div class="form-group">
							<label for="c_diff_country" class="text-black">Country <span class="text-danger">*</span></label>
							<select id="c_diff_country" class="form-control">
								<option value="1">Select a country</option>
								<option value="2">South Korea</option>
								<option value="3">Japan</option>
								<option value="4">China</option>
								<option value="5">America</option>
								<option value="6">India</option>
								<option value="7">Russia</option>
							</select>
						</div>


						<div class="form-group row">
							<div class="col-md-6">
								<label for="c_diff_fname" class="text-black">First Name <span class="text-danger">*</span></label>
								<input type="text" class="form-control" id="c_diff_fname" name="c_diff_fname">
							</div>
							<div class="col-md-6">
								<label for="c_diff_lname" class="text-black">Last Name <span class="text-danger">*</span></label>
								<input type="text" class="form-control" id="c_diff_lname" name="c_diff_lname">
							</div>
						</div>

						<div class="form-group row">
							<div class="col-md-12">
								<label for="c_diff_companyname" class="text-black">Company Name </label>
								<input type="text" class="form-control" id="c_diff_companyname" name="c_diff_companyname">
							</div>
						</div>

						<div class="form-group row">
							<div class="col-md-12">
								<label for="c_diff_address" class="text-black">Address <span class="text-danger">*</span></label>
								<input type="text" class="form-control" id="c_diff_address" name="c_diff_address"
									placeholder="Street address">
							</div>
						</div>

						<div class="form-group">
							<input type="text" class="form-control" placeholder="Apartment, suite, unit etc. (optional)">
						</div>

						<div class="form-group row">
							<div class="col-md-6">
								<label for="c_diff_state_country" class="text-black">State / Country <span
										class="text-danger">*</span></label>
								<input type="text" class="form-control" id="c_diff_state_country" name="c_diff_state_country">
							</div>
							<div class="col-md-6">
								<label for="c_diff_postal_zip" class="text-black">Posta / Zip <span class="text-danger">*</span></label>
								<input type="text" class="form-control" id="c_diff_postal_zip" name="c_diff_postal_zip">
							</div>
						</div>

						<div class="form-group row mb-5">
							<div class="col-md-6">
								<label for="c_diff_email_address" class="text-black">Email Address <span
										class="text-danger">*</span></label>
								<input type="text" class="form-control" id="c_diff_email_address" name="c_diff_email_address">
							</div>
							<div class="col-md-6">
								<label for="c_diff_phone" class="text-black">Phone <span class="text-danger">*</span></label>
								<input type="text" class="form-control" id="c_diff_phone" name="c_diff_phone"
									placeholder="Phone Number">
							</div>
						</div>

					</div>

				</div>
			</div>

			<div class="form-group">
				<label for="c_order_notes" class="text-black">Order Notes</label>
				<textarea name="c_order_notes" id="c_order_notes" cols="30" rows="5" class="form-control"
					placeholder="Write your notes here..."></textarea>
			</div>

		</div>
	</div>
</div>

<script src="/pharmaShop/static/libraries/js/pharma_management.js"></script>