
//OnLoad 초기화
$(function () {
	popularItemFunc(popularItem);
	newItemFunc(newItem);
});

function popularItemFunc(popularItem){
	var listHtml="";

	$('.itemList').empty();

	//게시물 값 초기화 			
	$.each(popularItem,function(index,value){
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
}


function newItemFunc(newItem){
	var listHtml="";

	$('.itemListNew').empty();

	//게시물 값 초기화 			
	$.each(newItem,function(index,value){
		listHtml+="<div class='col-sm-6 col-lg-12 text-center item mb-6'>";
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
	$('.itemListNew').append(listHtml);
}
