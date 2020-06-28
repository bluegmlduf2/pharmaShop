//OnLoad 
$(function () {
	//초기값
	$('#ORDER_CD').val(orderList[0].ORDER_CD);
	$('#ORDER_NATION').val(orderList[0].ORDER_NATION);
	$('#ORDER_NM').val(orderList[0].ORDER_NM);
	$('#ORDER_CONTRY').val(orderList[0].ORDER_CONTRY);
	$('#ORDER_COMPANY').val(orderList[0].ORDER_COMPANY==null?null:orderList[0].ORDER_COMPANY);
	$('#ORDER_ADDR').val(orderList[0].ORDER_ADDR);
	$('#ORDER_POST').val(orderList[0].ORDER_POST);
	$('#ORDER_EMAIL').val(orderList[0].ORDER_EMAIL);
	$('#ORDER_PHONE').val(orderList[0].ORDER_PHONE);
	$('#COUPON_CD').val(orderList[0].COUPON_CD==null?null:orderList[0].COUPON_CD);
	$('#ORDER_AMOUNT').val('$' + orderList[0].ORDER_AMOUNT);
	$('#ORDER_DATE').val(orderList[0].ORDER_DATE);
	$('#ORDER_WANT').val(orderList[0].ORDER_WANT==null?null:orderList[0].ORDER_WANT);
	$('#SHIPPING_STATE').val(orderList[0].SHIP_STATE);
	$('#SHIPPING_DATE').val(orderList[0].SHIP_DATE);

	
	var toggle = true;
	//제이쿼리에서 html을 생성하고 생성된 html에 이벤트를 적용하기때문에 여기에 위치해야한다
	$('#showMoreBtn').click(function () {
		if (toggle) {
			$('.itemShowHide1').show();
			$('.itemShowHide2').show();
			$('#showMoreBtn').text('HIDE LIST');
			toggle = false
		} else {
			$('.itemShowHide1').show();
			$('.itemShowHide2').hide();
			$('html').scrollTop(0); //해당 셀렉터까지 스크롤 이동
			$('#showMoreBtn').text('SHOW MORE');
			toggle = true
		}
	});

	//아이템리스트 생성
	var addRow;

	$('#prodList').empty();

	for (var i = 0; i < orderList.length; i++) {
		if (orderList[i] != undefined && i < 5) {
			addRow += "<tr class='itemShowHide1'>" +
				"<td>" + orderList[i].ITEM_NM + " <strong class='mx-2'>x</strong>" + orderList[i].ITEM_CNT + "</td>" +
				"<td>$" + orderList[i].AMT + "</td>" +
				"</tr>";
		} else {
			addRow += "<tr class='itemShowHide2' style='display: none;'>" +
				"<td>" + orderList[i].ITEM_NM + " <strong class='mx-2'>x</strong>" + orderList[i].ITEM_CNT + "</td>" +
				"<td>$" + orderList[i].AMT + "</td>" +
				"</tr>";
		}
	}

	if (orderList.length > 5) {
		$('#showMoreBtn').show();
	} else {
		$('#showMoreBtn').hide();
	}

	$('#prodList').prepend(addRow);

    
	//Save Order
	$('#btnSaveOrder').click(function () {
        var obj = {
            "ORDER_CD": $('#ORDER_CD').val(),
            "ORDER_NATION": $('#ORDER_NATION').val(),
            "ORDER_NM": $('#ORDER_NM').val(),
            "ORDER_CONTRY": $('#ORDER_CONTRY').val(),
            "ORDER_COMPANY": $('#ORDER_COMPANY').val(),
            "ORDER_ADDR": $('#ORDER_ADDR').val(),
            "ORDER_POST": $('#ORDER_POST').val(),
            "ORDER_EMAIL": $('#ORDER_EMAIL').val(),
            "ORDER_PHONE": $('#ORDER_PHONE').val(),
            "ORDER_WANT": $('#ORDER_WANT').val()
        };

        obj = JSON.stringify(obj); //json객체 -> json문자열

		if (validationChk(obj)) {
			swal({
					title: "Would you Save Order?",
					text: "Check Your Order Number! \n 　　　　　[ " + $('#ORDER_CD').val() + " ] ",
					icon: "info",
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
					buttons: true
				})
				.then((willDelete) => {
					if (willDelete) {
						if (willDelete) {
							$.ajax({
								type: "POST",
								url: "/pharmaShop/main/updateOrderList",
								data: {
									"data": obj
								},
								async: false,
								//dataType: "json",//서버에서 받을 데이터 형식을 지적한다.그러나 반환값이 없으므로 에러가 발생하므로 주석처리
								success: function (result) {
									swal("Thanks!", "Successfully Updated!", "success");
									location.href='/pharmaShop/main/checkout';
									// if (result.order_cd[0].CNT == 1) {
									// 	swal("Thanks!", "Successfully Checked!", "success");
									// 	var rUrl = "/pharmaShop/main/orderList/" + value;
									// 	location.href = rUrl;
									// } else {
									// 	swal("Sorry Check the OrderNumber!", result.message, "error");
						            // }                       
								},
								error: function (request, status, error) {
									//console.log("code:"+request.status+ ", message: "+request.responseText+", error:"+error);
									//swal("　　　　　　　Error!\n\n--- Please Contact Administrator ---");
									swal("Error!", "--- Please Contact Administrator ---", "error");
								}				 		
						 	});
						}
					}
				});
		}
	});

	//Cancel Order
	$('#btnCancelOrder').click(function () {
        var obj = {
            "ORDER_CD": $('#ORDER_CD').val(),
			"COUPON_CD": $('#COUPON_CD').val()
		};
		
		obj = JSON.stringify(obj); //json객체 -> json문자열

		swal({
			title: "Would you Cancel Order?",
			text: "Check Your Order Number! \n 　　　　　[ " + $('#ORDER_CD').val() + " ] ",
			icon: "info",
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			buttons: true
		})
		.then((willDelete) => {
			if (willDelete) {
				if (willDelete) {
					$.ajax({
						type: "POST",
						url: "/pharmaShop/main/deleteOrderList",
						data: {
							"data": obj
						},
						async: false,
						//dataType: "json",//서버에서 받을 데이터 형식을 지적한다.그러나 반환값이 없으므로 에러가 발생하므로 주석처리
						success: function (result) {
							swal("Thanks!", "Successfully Canceled!", "success");  
							location.href='/pharmaShop/main/checkout';                
						},
						error: function (request, status, error) {
							//console.log("code:"+request.status+ ", message: "+request.responseText+", error:"+error);
							swal("　　　　　　　Error!\n\n--- Please Contact Administrator ---");
						}				 		
					 });
				}
			}
		});
	});

	//validation Check
	function validationChk(obj) {
		var chk = true;
		var output = "";

		//obj에 있는 값 전부다 입력해줘야함
		var arrCol = [
			'[ OrderCode ]\n',
			'[ Country ]\n',
			'[ Name ]\n',
			'[ State / Country ]\n',
			'[ Company ]\n',
			'[ Address ]\n',
			'[ Posta / Zip ]\n',
			'[ Email Address ]\n',
			'[ Phone ]\n',
			'[ Message ]\n'
		];

		var contact = JSON.parse(obj); //json문자열 ->js객체
		var i = 0;

		//국가선택체크
		if (contact.ORDER_NATION == 1) {
			output += "[ Country ]\n";
			chk = false;
		}

		//공백확인
		$.each(contact, function (index, item) {
			//if()검사하지않는 항목
			if (index != "ORDER_CD" &&
				index != "ORDER_NATION" &&
				index != "ORDER_COMPANY" &&
				index != "ORDER_WANT") {
				if (item == "") {
					output += arrCol[i];
					chk = false;
				}
			}
			i++
		});

		//에러메세지 출력
		if (output != "") {
			swal("** Please Check input Value **", output);
		}

		return chk;
	}
});
