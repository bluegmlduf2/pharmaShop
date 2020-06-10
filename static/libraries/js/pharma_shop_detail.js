//OnLoad 초기화
//js_array-->from shopSingle.php
$(function () {
	var cnt=1;
	var rePrice;
	
	//Count,priceCalculate
	$('#plusBtn ,#minusBtn').click(function(){
		var cName=$(this).attr('id');

		if(cName=='plusBtn'){
			cnt=Number($('#cntVal').val())+1;
		}else if(cName=='minusBtn'){
			cnt=Number($('#cntVal').val())-1;
		}

		//url의 count 파라메터 수정
		//$('#addCart').attr('href','/pharmaShop/main/cart/'+cnt);
		$('#addCart').attr('href','/pharmaShop/main/cart/');
		
		if(js_array[0].ITEM_SALE!=null){
			 rePrice=(js_array[0].ITEM_PRICE*(100-js_array[0].ITEM_SALE))/100;
			 $('#delSale').text("$"+js_array[0].ITEM_PRICE*cnt);
		}else{
			 rePrice=js_array[0].ITEM_PRICE;
		}
		//숫자,마침표만 입력가능
		rePrice=String(rePrice).replace(/[^.0-9]/g,'');
		$('#priceVal').text("$"+ChkDataType(cnt*rePrice));
	});

	//addCart,ifHaveASameKey
	$('#addCart').click(function(){		
		$.each(js_array,function(index,value){
			var arr=[];
			$.each(value,function(a,b){
				arr.push(b);
			});

			//할인율이 적용된 금액 보내기
			arr.push(rePrice);

			var itemCd=value.ITEM_CD;

			if(index==0&&localStorage.getItem(itemCd)==null){
				arr.unshift(cnt);
				localStorage.setItem(itemCd,JSON.stringify(arr));
			}else if(index==0){
				var nCnt=arr[0]+cnt;
				arr[0]=nCnt;
				// var en=nCnt.indexOf(',');
				// var reVal=nCnt.substr(0,en);
				// arr.unshift(Number(cnt)+Number(reVal));
				localStorage.setItem(itemCd,JSON.stringify(arr));
			}
		});
	});
	
});
