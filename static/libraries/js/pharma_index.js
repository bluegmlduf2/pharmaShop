
//OnLoad 초기화
$(function () {
	pageFunc(1,kindCd);
});

function pageFunc(curPage,kindCd){
	var obj = {
		"pageNum":curPage,
		"kindCd":kindCd
	};

	obj = JSON.stringify(obj);

	$.ajax({
		type: "POST",
		url: "/pharmaShop/main/shopList",
		data: {
			"data": obj
		},
		async: false,
		dataType: "json",
		success: function (result) {

			var listHtml="";
			var selectHtml="";

			$('.itemList').empty();
			$('.itemSelect').empty();

			//게시물 값 초기화 			
			$.each(result['post'],function(index,value){
				listHtml+="<div class='col-sm-6 col-lg-4 text-center item mb-4'>";

				//세일 여부
				if(value.ITEM_SALE!=null){
					listHtml+="<span class='tag'>"+value.ITEM_SALE+"% SALE</span>";
				}
				listHtml+="<a href='/pharmaShop/main/shopSingle/"+value.ITEM_CD+"'><img src="+value.ITEM_IMAGE+" alt='Image'></a>"
				listHtml+="<h3 class='text-dark'><a href='/pharmaShop/main/shopSingle/"+value.ITEM_CD+"'>"+value.ITEM_NM+"</a></h3>"

				//세일 여부
				if(value.ITEM_SALE!=null){
					var salePrice=parseInt(((value.ITEM_PRICE/100)*(100-value.ITEM_SALE)));
					listHtml+="<p class='price'><del>$ "+value.ITEM_PRICE+"</del> &mdash;$ "+salePrice+"</p></div>";
				}else{
					listHtml+="<p class='price'>$ "+value.ITEM_PRICE+"</p></div>";
				}				
			});
			$('.itemList').append(listHtml);

			//블록 값 초기화
			selectHtml+="<li><a href='#' class='backBlock'>&lt;</a></li>"
			for(var i=startBlock+1;i<=lastBlock;i++){
				if(curPage==i){
					selectHtml+="<li><a href='#' class='selectClass' style='font:bold;color:red;'>"+i+"</a></li>"
				}else{
					selectHtml+="<li><a href='#' class='selectClass'>"+i+"</a></li>"
				}
			}
			selectHtml+="<li><a href='#' class='nextBlock'>&gt;</a></li>";
			$('.itemSelect').append(selectHtml);
			
		},
		error: function (request, status, error) {
			//console.log("code:"+request.status+ ", message: "+request.responseText+", error:"+error);
			alert("code:" + request.status + ", message: " + request.responseText + ", error:" +
				error);
		},
		complete: function () {
			
        }
	});
}