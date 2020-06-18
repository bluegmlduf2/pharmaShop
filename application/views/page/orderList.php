    <div class="site-section">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <h2 class="h3 mb-5 text-black">Your Order List</h2>
          </div>
          <div class="col-md-12">
    
            <form action="#" method="post">
    
              <div class="p-3 p-lg-5 border">
                <div class="form-group row">
                  <div class="col-md-2">
                    <label for="ORDER_CD" class="text-black">Order Code </label>
                    <input type="text" class="form-control" id="ORDER_CD"  disabled="disabled" name="ORDER_CD">
                  </div>
                  <div class="col-md-4">
                    <label for="ORDER_NATION" class="text-black">Country <span class="text-danger">*</span></label>
                    <select id="ORDER_NATION" class="form-control">
                      <option value="1">Select a country</option>
                      <option value="2">South Korea</option>
                      <option value="3">Japan</option>
                      <option value="4">China</option>
                      <option value="5">America</option>
                      <option value="6">India</option>
                      <option value="7">Russia</option>
                    </select>
                  </div>
                  <div class="col-md-6">
                    <label for="ORDER_NM" class="text-black">Name <span class="text-danger">*</span></label>
                    <input type="text" class="form-control" id="ORDER_NM" name="ORDER_NM">
                  </div>
                </div>
                <div class="form-group row">
                  <div class="col-md-2">
                    <label for="ORDER_CONTRY" class="text-black">State / Country <span class="text-danger">*</span></label>
                    <input type="text" class="form-control" id="ORDER_CONTRY" name="ORDER_CONTRY">
                  </div>
                  <div class="col-md-4">
                    <label for="ORDER_COMPANY" class="text-black">Company</label>
                    <input type="text" class="form-control" id="ORDER_COMPANY" name="ORDER_COMPANY">
                  </div>
                  <div class="col-md-6">
                    <label for="ORDER_ADDR" class="text-black">Address <span class="text-danger">*</span></label>
                    <input type="text" class="form-control" id="ORDER_ADDR" name="ORDER_ADDR">
                  </div>
                </div>
                <div class="form-group row">
                  <div class="col-md-2">
                    <label for="ORDER_POST" class="text-black">Posta / Zip <span class="text-danger">*</span></label>
                    <input type="text" class="form-control" id="ORDER_POST" name="ORDER_POST">
                  </div>
                  <div class="col-md-5">
                    <label for="ORDER_EMAIL" class="text-black">Email <span class="text-danger">*</span></label>
                    <input type="email" class="form-control" id="ORDER_EMAIL" name="ORDER_EMAIL" placeholder="">
                  </div>
                  <div class="col-md-5">
                    <label for="ORDER_PHONE" class="text-black">Phone <span class="text-danger">*</span></label>
                    <input type="tel" class="form-control" id="ORDER_PHONE" name="ORDER_PHONE">
                  </div>
                </div>
                <div class="form-group row">
                <div class="col-md-2">
                    <label for="COUPON_CD" class="text-black">Coupon</label>
                    <input type="text" class="form-control" disabled="disabled"  id="COUPON_CD" name="COUPON_CD">
                  </div>
                  <div class="col-md-5">
                    <label for="ORDER_AMOUNT" class="text-black" >Amount</label>
                    <input type="text" class="form-control" disabled="disabled" id="ORDER_AMOUNT" name="ORDER_AMOUNT">
                  </div>
                  <div class="col-md-5">
                    <label for="ORDER_DATE" class="text-black">OrderDate</label>
                    <input type="date" class="form-control" disabled="disabled" id="ORDER_DATE" name="ORDER_DATE">
                  </div>
                </div>

                <div class="form-group row">
                  <div class="col-md-12">
                    <label for="ORDER_WANT" class="text-black">Message </label>
                    <textarea name="ORDER_WANT" id="ORDER_WANT" cols="30" rows="7" class="form-control"></textarea>
                  </div>
                </div>

                <div class="col-md-12">
                  <h2 class="h3 mb-3 text-black">Your Order</h2>
                  <div class="p-3 p-lg-5 border">
                    <table class="table site-block-order-table mb-5">
                      <thead>
                        <th>Product</th>
                        <th>Total</th>
                      </thead>
                      <tbody id='prodList'>
                      </tbody>
                      <td>
                          <div class="btn btn-primary btn-sm px-2" type="button" id='showMoreBtn'>SHOW MORE</div>
                      </td>
                    </table>
                  </div>
                </div>
                </div>

                <div class="form-group row">
                  <div class="col-lg-6">
                    <input type="button" id="btnSaveOrder" class="btn btn-primary btn-lg btn-block" value="Save Order">
                  </div>
                  <div class="col-lg-6">
                    <input type="button" id="btnCancelOrder" class="btn btn-primary btn-lg btn-block" value="Cancel Order">
                  </div>
                </div>
              </div>
            </form>
          </div>
          
        </div>
      </div>
    </div>
    <script> var orderList = <?php echo $orderList?>;</script>
        <script src="/pharmaShop/static/libraries/js/pharma_orderlist.js"></script>

