//OnLoad 
$(function () {
    pageFunc(1);
});

//page count
function pageFunc(curPage){
	var obj = {
		"pageNum":curPage
	};

	obj = JSON.stringify(obj);

	$.ajax({
		type: "POST",
		url: "/pharmaShop/main/shipList",
		data: {
			"data": obj
		},
		async: false,
		dataType: "json",
		success: function (result) {
            //console.log(result['post'][0].ITEM_CD);//JS에서 객체의 멤버변수를 접근할때는 .을 사용
			lastYN=result['lastYN'];
			startBlock=result['startBlock'];
			lastBlock=result['lastBlock'];

			var listHtml="";
			var selectHtml="";

			$('#shipList').empty();
			$('.shipSelect').empty();

            //게시물 값 초기화 
			$.each(result['post'],function(index,value){  
                listHtml+="<tr id='trRow'>"
                +"<td class='ship-code'>"
                +"<h2 class='h5 text-black'>"+value.SHIP_CD+"</h2>"
                +"</td>"
                +"<td class='order-code'>"
                +"<h2 class='h5 text-black'>"+value.ORDER_CD+"</h2>"
                +"</td>"
                +"<td class='order-name'>"
                +"<h2 class='h5 text-black'>"+value.ORDER_NM+"</h2>"
                +"</td>"
                +"<td class='order-date'>"
                +"<h2 class='h5 text-black'>"+value.ORDER_DATE+"</h2>"
                +"</td>"

                +"<td class='ship-state'>"
                +"<select id='shipState' class='form-control' onchange='saveShipping(this)'>"
                
                //+로 문자열을 붙일 경우, 새로운 함수를 만나면 초기화됨, 그러므로 listHtml를 새롭게 선언해야함, 아래 함수 참고 
                $.each(result['shipState'],function(index,valueState){
                    if(value.SHIP_STATE==valueState.CODE){
                        listHtml+="<option value='"+valueState.CODE+"' selected >"+valueState.CODE_NAME+"</option>";
                    }else{
                        listHtml+="<option value='"+valueState.CODE+"' >"+valueState.CODE_NAME+"</option>";
                    }
                });

                listHtml+="</select>"
                +"</td>"
                
                +"<td class='ship-date'>"
                +"<h2 class='h5 text-black'>"+value.SHIP_DATE+"</h2>"
                +"</td>"
                +"</tr>"; 
            });
			$('#shipList').append(listHtml);

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
            
            $('.shipSelect').append(selectHtml);

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

			// > 버튼 <버튼 숨기기
			if(startBlock==0){
				//첫번째 페이지 일 경우 < 버튼 숨기기
				$('.backBlock').css('visibility','hidden');
			}else if(lastYN==true){
				//마지막 페이지 일 경우 > 버튼 숨기기
				$('.nextBlock').css('visibility','hidden');
			}else{
				//그 이외의 경우 보여주기
				$('.nextBlock').css('visibility','visible');
				$('.backBlock').css('visibility','visible');
			}
			
			//게시물 수가 5페이지 미만일시 >버튼 보여주지 않음
			if(result['nextBtn']){
				$('.nextBlock').css('visibility','visible');
			}else{
				$('.nextBlock').css('visibility','hidden');
			}
		},
		error: function (request, status, error) {
			//console.log("code:"+request.status+ ", message: "+request.responseText+", error:"+error);
			swal("Error!", "--- Please Contact Administrator ---", "error");
		}
	});
}

//shipping state change
function saveShipping(id){
    var selectedText=id.options[id.selectedIndex].text;
    var selectedValue=id.options[id.selectedIndex].value;
    var orderCd=id.parentNode.parentNode.childNodes[0].firstChild.innerText;
    var userNm=id.parentNode.parentNode.childNodes[2].firstChild.innerText;
   
    var obj={
        "shipCd":orderCd
        ,"shipState":selectedValue
    }

    obj=JSON.stringify(obj);

    swal({
        title: "Change Shipping",
        text: "Would you like to Change Shipping state of [ "+userNm+" ] to "+selectedText+"?",
        icon: "info",
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        buttons: true
    }).then((willDelete) => {
        if(willDelete){
            $.ajax({
                type: "POST",
                url: "/pharmaShop/main/saveShipping",
                data: {
                    "data": obj
                },
                async: false,
                success: function (result) {
                    swal("Success!!","Updated Shipping State","success");
                    location.reload();  
                },
                error: function (request, status, error) {
                    //console.log("code:"+request.status+ ", message: "+request.responseText+", error:"+error);
                    swal("Error!", "--- Please Contact Administrator ---", "error");
                }
            });
        }
    });
}