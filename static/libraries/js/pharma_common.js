//modalEvent
var memName='';//admin Name

$(function () {
	// 모달 버튼에 이벤트를 건다.
	$('#openModalBtn').on('click', function () {
		$('#modalBox').modal('show').css({
			'margin-top': function () { //vertical centering
				//return -($(this).height() / 2);
				return 250;
			},
			'margin-left': function () { //Horizontal centering
				return 0;
			}
		});;
	});

	// 모달 안의 취소 버튼에 이벤트를 건다.
	    $('#closeModalBtn').on('click', function () {
        $('#MNG_ID').val('');
        $('#MNG_PW').val('');
		$('#modalBox').modal('hide');
    });
    
    // 확인버튼.
    $('#confirmBtn').on('click', function () {
        var MNG_ID=$('#MNG_ID').val();
        var MNG_PW=$('#MNG_PW').val();

        if(MNG_ID==null||MNG_PW==null){
            swal("Please Input Value");
            return;
        }

        var obj ={
            "MNG_ID": MNG_ID,
            "MNG_PW": MNG_PW
        };
        
        obj = JSON.stringify(obj);//json객체 -> json문자열


        $.ajax({
            type: "POST",
            url: "/pharmaShop/main/mngInfoCheck",
            data: {
                "data": obj
            },
            dataType: "json",
            async: false,
            //dataType: "json",//서버에서 받을 데이터 형식을 지적한다.그러나 반환값이 없으므로 에러가 발생하므로 주석처리
            success: function (result) {
                if(result["memObj"]==null){
                    swal("Check!", "Please Check ID / PASSWORD", "info");
                    return;
                }
                $('#modalBox').modal('hide');
				swal("Welcome!", "Welcome to Login [ "+result["memObj"]+" ] !", "success");
				memName=result["memObj"];
                location.href = '/pharmaShop/main/management/'+memName;
                // if (result.order_cd[0].CNT == 1) {
                // 	swal("Thanks!", "Successfully Checked!", "success");
                // 	var rUrl = "/pharmaShop/main/orderList/" + value;
                // 	location.href = rUrl;
                // } else {
                // 	swal("Sorry Check the OrderNumber!", result.message, "error");
                // }                       
            },
            error: function (request, status, error) {
                $('#modalBox').modal('hide');
                //console.log("code:"+request.status+ ", message: "+request.responseText+", error:"+error);
                swal("Error!", "--- Please Contact Administrator ---", "error");
            }
        });
    });
});


//float , number check
function ChkDataType(args) {
	var result = null;
	if (Number.isInteger(args)) {
		result = args;
	} else {
		result = args.toFixed(1) //실수형일때 소수점 1자리까지 표기
	}
	return Number(result);
}

//Total Calculate
function calculateTotal(coupon) {
	var arr = new Array();
	var totalCost = 0;

	for (var i = 0; i < localStorage.length; i++) {
		var chkVal = Number(localStorage.key(i));
		if (Number.isInteger(chkVal)) {
			;
			arr.push(JSON.parse(localStorage.getItem(chkVal)));
		}
	}

	arr.forEach(function (e) {
		totalCost += ChkDataType(Number(e[0] * e[12]));
	});

	if (coupon != undefined) {
		$('#subSale').text('-$' + coupon);
		$('#subTot').text("$" + ChkDataType(totalCost));
		totalCost -= coupon;
		$('#tot').text("$" + ChkDataType(totalCost));
		return;
	}

	$('#subTot').text("$" + ChkDataType(totalCost));
	$('#subSale').text('');
	$('#tot').text("$" + ChkDataType(totalCost));
}

//apply Coupon
function applyCoupon(chk) {
	$.ajax({
		type: "POST",
		url: "/pharmaShop/main/coupon/",
		data: {
			"data": JSON.stringify($('#c_code').val())
		},
		async: false,
		dataType: "json",
		success: function (result) {
			if (result[0].COUPON_USE == 1) {
				swal('Sorry! it is used coupon');
				$('#c_code').val('');
				calculateTotal();
				return;
			}
			if (result[0].CNT == 0) {
				swal('Please check the coupon Number.');
				$('#c_code').val('');
				calculateTotal();
				return;
			}
			if (chk) {
				swal("Applied coupon", "Check the sale price!", "success");
			}
			calculateTotal(result[0].COUPON_AMT);
		},
		error: function (request, status, error) {
			//console.log("code:"+request.status+ ", message: "+request.responseText+", error:"+error);
			alert("code:" + request.status + ", message: " + request.responseText + ", error:" +
				error);
		}
	});
}

