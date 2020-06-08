
//OnLoad 초기화
$(function () {
	var cnt=1;
	
	//Count
	$('.plusMinusBtn').click(function(){
		cnt=Number($('#cntVal').val())+1;
		$('#addCart').attr('href','/pharmaShop/main/cart/'+cnt); 
	});

	//addCart
	$('#addCart').click(function(){		
		$.each(js_array,function(index,value){
			var arr=[];
			$.each(value,function(a,b){
				arr.push(b);
			});
			if(index==0){
				var rowCnt=localStorage.length+1;
				arr.unshift(cnt);
				localStorage.setItem(rowCnt,arr);
			}
		});
	});
	
});
