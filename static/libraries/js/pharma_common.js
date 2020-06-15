//float , number check
function ChkDataType (args){
    var result= null;
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
                swal('Sorry! it is used coupon');
                $('#c_code').val('');
                calculateTotal();
                return;
            }
            if(result.CNT==0){
                swal('Please check the coupon Number.');
                $('#c_code').val('');
                calculateTotal();
                return;
            }
            if(chk){
                swal("Applied coupon", "Check the sale price!", "success");
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