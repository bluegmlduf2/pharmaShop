
//OnLoad 초기화
$(function () {
	var cnt=1;
	
	//Count,priceCalculate
	$('#plusBtn ,#minusBtn').click(function(){
		var cName=$(this).attr('id');

		if(cName=='plusBtn'){
			cnt=Number($('#cntVal').val())+1;
		}else{
			cnt=Number($('#cntVal').val())-1;
		}

		$('#addCart').attr('href','/pharmaShop/main/cart/'+cnt); 
		var rePrice=js_array[0].ITEM_PRICE;
		$('#priceVal').text("$"+(cnt*(rePrice.replace(/[^0-9]/g,''))));
	});

	//addCart,ifHaveASameKey
	$('#addCart').click(function(){		
		$.each(js_array,function(index,value){
			var arr=[];
			$.each(value,function(a,b){
				arr.push(b);
			});

			//??? ?? ??&&?????? ???
			if(index==0&&localStorage.getItem(value.ITEM_CD)==null){
				arr.unshift(cnt);
				localStorage.setItem(value.ITEM_CD,arr);
			}else{
				var nCnt=localStorage.getItem(value.ITEM_CD);
				var en=nCnt.indexOf(',');
				var reVal=nCnt.substr(0,en);
				arr.unshift(Number(cnt)+Number(reVal));
				localStorage.setItem(value.ITEM_CD,arr);
			}
		});
	});
	
});
