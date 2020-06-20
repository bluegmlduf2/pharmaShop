<!DOCTYPE html>
<html lang="ko">

<head>
	<title>Pharma &mdash; Colorlib Template</title>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">    
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

	<link href="https://fonts.googleapis.com/css?family=Rubik:400,700|Crimson+Text:400,400i" rel="stylesheet">
	<link rel="stylesheet" href="/pharmaShop/static/libraries/fonts/icomoon/style.css">
	<link rel="stylesheet" href="/pharmaShop/static/libraries/css/bootstrap.min.css">
	<link rel="stylesheet" href="/pharmaShop/static/libraries/css/magnific-popup.css">
	<link rel="stylesheet" href="/pharmaShop/static/libraries/css/jquery-ui.css">
	<link rel="stylesheet" href="/pharmaShop/static/libraries/css/owl.carousel.min.css">
	<link rel="stylesheet" href="/pharmaShop/static/libraries/css/owl.theme.default.min.css">
	<link rel="stylesheet" href="/pharmaShop/static/libraries/css/aos.css">
	<link rel="stylesheet" href="/pharmaShop/static/libraries/css/style.css">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
	<!--Font awesome-->

	<script src="/pharmaShop/static/libraries/js/lib/jquery-3.3.1.min.js"></script>
	<script src="/pharmaShop/static/libraries/js/lib/jquery-ui.js"></script>
	<script src="/pharmaShop/static/libraries/js/pharma_common.js"></script>
	<script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script><!-- alert degine -->

</head>

<body>
	<div class="site-wrap">
		<div class="site-navbar py-2">

			<div class="search-wrap">
				<div class="container">
					<a href="#" class="search-close js-search-close"><span class="icon-close2"></span></a>
					<form action="#" method="post">
						<input type="text" class="form-control" placeholder="Search keyword and hit enter...">
					</form>
				</div>
			</div>

			<div class="container">
				<div class="d-flex align-items-center justify-content-between">
					<div class="logo">
						<div class="site-logo">
							<a href="/pharmaShop/main/index" class="js-logo-clone">Pharma</a>
						</div>
					</div>
					<div class="main-nav d-none d-lg-block">
						<nav class="site-navigation text-right text-md-center" role="navigation">
							<ul class="site-menu js-clone-nav d-none d-lg-block">
								<li><a href="/pharmaShop/main/index">Home</a></li>
                <!-- <li class="active"><a href="/pharmaShop/main/shop">Store</a></li> -->
								<li><a href="/pharmaShop/main/shop">Store</a></li>
								<li class="has-children">
									<a href="#">Dropdown</a>
									<ul class="dropdown">
										<li><a href="#">Supplements</a></li>
										<li class="has-children">
											<a href="#">Vitamins</a>
											<ul class="dropdown">
												<li><a href="#">Supplements</a></li>
												<li><a href="#">Vitamins</a></li>
												<li><a href="#">Diet &amp; Nutrition</a></li>
												<li><a href="#">Tea &amp; Coffee</a></li>
											</ul>
										</li>
										<li><a href="#">Diet &amp; Nutrition</a></li>
										<li><a href="#">Tea &amp; Coffee</a></li>

									</ul>
								</li>
								<li><a href="/pharmaShop/main/cart">Cart</a></li>
								<li><a href="/pharmaShop/main/checkout">Order</a></li>
							</ul>
						</nav>
					</div>
					<div class="icons">
						<a href="#" class="icons-btn d-inline-block js-search-open"><span class="icon-search"></span></a>
						<a href="#" class="icons-btn d-inline-block bag" id="openModalBtn">
							<span style="font-family: FontAwesome;font-size: 20px;">&#xf013;</span>
							<!-- <span class="number">2</span> -->
						</a>
						<a href="#" class="site-menu-toggle js-menu-toggle ml-3 d-inline-block d-lg-none">
							<span class="icon-menu"></span></a>
					</div>
				</div>
			</div>
		</div>

		<div class="bg-light py-3">
			<div class="container">
				<!-- <div class="row">
					<div class="col-md-12 mb-0"><a href="/pharmaShop/main/index">Home</a> <span class="mx-2 mb-0">/</span> <strong
							class="text-black">Store</strong></div>
				</div> -->
			</div>
		</div>


    <div id="modalBox" class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title" id="myModalLabel">Login Management</h4>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
          </div>
          <div class="modal-body">
            <div class="col-md-12">
                <label for="MNG_ID" class="text-black">ID</label>
                <input type="text" class="form-control" id="MNG_ID">
                <label for="MNG_PW" class="text-black">PASSWORD</label>
                <input type="password" class="form-control" id="MNG_PW">
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" id="confirmBtn">Ok</button>
            <button type="button" class="btn btn-default" id="closeModalBtn">Cancel</button>
          </div>
        </div>
      </div>
    </div>

