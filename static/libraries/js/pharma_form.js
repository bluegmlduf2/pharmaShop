var lastYN="";
var startBlock="";
var lastBlock="";

//OnLoad 초기화
$(function () {
	pageFunc(1);
	selectorAddEvent();
});

function selectorAddEvent(){
	// $('.selectClass').bind('click',function(){
	// 	// $(this).parent('.itemSelect').removeClass('active');
	// 	$(this).parent().addClass('active');
	// 	pageFunc($(this).text());
	// })
}


function pageFunc(curPage){
	var obj = {
		"pageNum":curPage
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
            console.log(result);
            //console.log(result['post'][0].ITEM_CD);//JS에서 객체의 멤버변수를 접근할때는 .을 사용
			lastYN=result['lastYN'];
			startBlock=result['startBlock'];
			lastBlock=result['lastBlock'];
			console.log(lastYN);
			console.log(startBlock);
			console.log(lastBlock);
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
					var salePrice=parseInt(((value.ITEM_PRICE/100)*value.ITEM_SALE));
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
			
			//블록 값 이벤트 주기
		   	$('.selectClass').bind('click',function(){
				pageFunc($(this).text());
			});

			//다음 이전 태그 이벤트 주기
			$('.backBlock,.nextBlock').bind('click',function(){
				//alert($(this).attr('class'));
				if($(this).attr('class')=="backBlock"){
					pageFunc(startBlock-1);
				}else{
					pageFunc(lastBlock+1);
				}
			});
			
			//다음 이전 태그 숨기기
			if(startBlock==0){
				$('.backBlock').css('visibility','hidden');
			}else if(lastYN==true){
				$('.nextBlock').css('visibility','hidden');
			}else{
				$('.nextBlock').css('visibility','visible');
				$('.backBlock').css('visibility','visible');
			}
			
			//console.log($('.itemList').html());

			// $('#idNm').val(result[0].M_NM);
			// $('#idHeight').val(result[0].M_HEIGHT);
			// $('#idWeight').val(result[0].M_WEIGHT);
			// $('#idAge').val(result[0].M_AGE);
			// $('#idPurpose').val(result[0].M_PURPOSE);
			// //$('#vlifeStyle').val(result[0].M_LIFESTYLE);

			// sessionStorage.setItem('userNm', result[0].M_NM);
			// sessionStorage.setItem('userHeight', result[0].M_HEIGHT);
			// sessionStorage.setItem('userWeight', result[0].M_WEIGHT);
			// sessionStorage.setItem('userAge', result[0].M_AGE);
			// sessionStorage.setItem('userSex', result[0].M_SEX);
			// sessionStorage.setItem('userPurpose', result[0].M_PURPOSE);

			// if(result[0].M_SEX=='1'){
			//     $('input:radio[id="idSex1"]').attr("checked", true);//'태그:타입[id&name='id&name명'].
			// }else{
			//     $('input:radio[id="idSex2"]').attr("checked", true);
			// }

			// $('#idNm').attr('disabled',true);
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