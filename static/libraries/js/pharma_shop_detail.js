//OnLoad 초기화
$(function () {
	var cnt=1;
	
	//Count,priceCalculate
	$('#plusBtn ,#minusBtn').click(function(){
		var cName=$(this).attr('id');

		if(cName=='plusBtn'){
			cnt=Number($('#cntVal').val())+1;
		}else if(cName=='minusBtn'){
			cnt=Number($('#cntVal').val())-1;
		}

		//url의 count 파라메터 수정
		$('#addCart').attr('href','/pharmaShop/main/cart/'+cnt);
		
		//수정필요:할인된 가격변경시 할인금액도 변경되어야함..
		var rePrice;
		
		if(js_array[0].ITEM_SALE!=null){
			 rePrice=(js_array[0].ITEM_PRICE*(100-js_array[0].ITEM_SALE))/100;
		}else{
			 rePrice=js_array[0].ITEM_PRICE;
		}
		//숫자,마침표만 입력가능
		rePrice=String(rePrice).replace(/[^.0-9]/g,'');
		$('#priceVal').text("$"+ChkDataType(cnt*rePrice));
	});

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
		return result;
	}

	//addCart,ifHaveASameKey
	$('#addCart').click(function(){		
		$.each(js_array,function(index,value){
			var arr=[];
			$.each(value,function(a,b){
				arr.push(b);
			});

			if(index==0&&localStorage.getItem(value.ITEM_CD)==null){
				arr.unshift(cnt);
				localStorage.setItem(value.ITEM_CD,arr);
			}else if(index==0){
				var nCnt=localStorage.getItem(value.ITEM_CD);
				var en=nCnt.indexOf(',');
				var reVal=nCnt.substr(0,en);
				arr.unshift(Number(cnt)+Number(reVal));
				localStorage.setItem(value.ITEM_CD,arr);
			}
		});
	});
	
});
