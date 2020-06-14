	/**
	 * 실수형(소수점1자리이하)와 정수형 구분해서 반환
	 */
	function ChkDataType (args){
		var result= null;
		//alert(typeof(args));
		if (Number.isInteger(args)){
			result=args;
		}else{
			result = args.toFixed(1)//실수형일때 소수점 1자리까지 표기
		}
		return Number(result);
	}

//Total Calculate
function calculateTotal(coupon){
    var arr=new Array();
    var totalCost=0;

    for(var i=0;i<localStorage.length;i++){
        var chkVal=Number(localStorage.key(i));
        if(Number.isInteger(chkVal)){;
            arr.push(JSON.parse(localStorage.getItem(chkVal)));
        }
    }
    
    arr.forEach(function(e){
        totalCost+=ChkDataType(Number(e[0]*e[12]));
    });

    if(coupon!=undefined){ 
        $('#subSale').text('-$'+coupon);        
        $('#subTot').text("$"+ChkDataType(totalCost));
        totalCost-=coupon;
        $('#tot').text("$"+ChkDataType(totalCost));
        return;
    }

    $('#subTot').text("$"+ChkDataType(totalCost));
    $('#subSale').text('');
    $('#tot').text("$"+ChkDataType(totalCost));
}

//apply Coupon
function applyCoupon(chk){
    $.ajax({
        type: "POST",
        url: "/pharmaShop/main/coupon/",
        data: {
            "data": JSON.stringify($('#c_code').val())
        },
        async: false,
        dataType: "json",
        success: function (result) {
            if(result.COUPON_USE==1){
                alert('이미 사용된 쿠폰입니다');
                $('#c_code').val('');
                calculateTotal();
                return;
            }
            if(result.CNT==0){
                alert('존재하지않는 쿠폰입니다.');
                $('#c_code').val('');
                calculateTotal();
                return;
            }
            if(chk){
                alert('쿠폰이 적용되었습니다.');
            }
            calculateTotal(result.COUPON_AMT);
        },
        error: function (request, status, error) {
            //console.log("code:"+request.status+ ", message: "+request.responseText+", error:"+error);
            alert("code:" + request.status + ", message: " + request.responseText + ", error:" +
                error);
        }
    });
}