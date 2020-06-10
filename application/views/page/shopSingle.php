	<div class="site-section">
		<div class="container">
			<div class="row">
				<div class="col-md-5 mr-auto">
					<div class="border text-center">
						<img src="<?php echo $item_detail[0]->ITEM_IMAGE;?>" alt="Image" class="img-fluid p-5">
					</div>
				</div>
				<div class="col-md-6">
					<h2 class="text-black"><?php echo $item_detail[0]->ITEM_NM; ?></h2>
					<p><?php echo $item_detail[0]->ITEM_CONT;?></p>
					<p>
					<del id='delSale'>
						<?php 
							if(!empty($item_detail[0]->ITEM_SALE)){
								echo "$".$item_detail[0]->ITEM_PRICE;
							}
						?>
						<?php?>
					</del> 
					<strong class="text-primary h4" id="priceVal">
						$<?php 
							if(empty($item_detail[0]->ITEM_SALE)){
								echo $item_detail[0]->ITEM_PRICE;
							}else{
								$itemPrice=$item_detail[0]->ITEM_PRICE;
								$itemSale=$item_detail[0]->ITEM_SALE;
								echo ((int)$itemPrice/100)*(100-(int)$itemSale);
							}
						?>
					</strong>
					</p>
					<div class="mb-5">
						<div class="input-group mb-3" style="max-width: 220px;">
							<div class="input-group-prepend">
								<button class="btn btn-outline-primary js-btn-minus" id="minusBtn" type="button">&minus;</button>
							</div>
							<input type="text" class="form-control text-center" id="cntVal" value="1" placeholder=""
								aria-label="Example text with button addon" aria-describedby="button-addon1">
							<div class="input-group-append">
								<button class="btn btn-outline-primary js-btn-plus" id="plusBtn" type="button">&plus;</button>
							</div>
						</div>

					</div>
					<p><a href="/pharmaShop/main/cart/1" id="addCart" class="buy-now btn btn-sm height-auto px-4 py-3 btn-primary">Add To Cart</a></p>

					<div class="mt-5">
						<ul class="nav nav-pills mb-3 custom-pill" id="pills-tab" role="tablist">
							<li class="nav-item">
								<a class="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab"
									aria-controls="pills-home" aria-selected="true">Ordering Information</a>
							</li>
							<li class="nav-item">
								<a class="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab"
									aria-controls="pills-profile" aria-selected="false">Specifications</a>
							</li>

						</ul>
						<div class="tab-content" id="pills-tabContent">
							<div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
								<table class="table custom-table">
									<thead>
										<th>Material</th>
										<th>Description</th>
									</thead>
									<tbody>
										<?php
											foreach($item_detail as $value){
												echo "<tr>
												<th scope='row'>".$value->MEDICINE_NAME."</th>
												<td>".$value->MEDICINE_EFF."</td>
												</tr>";
											}
										?>
									</tbody>
								</table>
							</div>
							<div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">

								<table class="table custom-table">

									<tbody>
										<tr>
											<td>INTAKE METHOD</td>
											<td class="bg-light"><?php echo $item_detail[0]->ITEM_TAKE?></td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<script> var js_array = <?php echo json_encode($item_detail)?>;</script><!-- php->json->js  -->
<script src="/pharmaShop/static/libraries/js/pharma_shop_detail.js"></script>