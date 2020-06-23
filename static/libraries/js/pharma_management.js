//OnLoad 
$(function () {
    initKind();
	pageFunc(1);

	//IMAGE SAVE
	$("#form_img").submit(function(e){
		e.preventDefault();//강제 호출 되는 submit이벤트의 동작을 막아준다
		if($('#image').val()!=''){
			swal({
				title: "Save image",
				text: "Would you like to save image?",
				icon: "info",
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				buttons: true
			}).then((willDelete) => {
				if(willDelete){
					//image Save
					var formData = new FormData($("#form_img")[0]);
					$.ajax({
						url : $("#form_img").attr('action'),
						dataType : 'json',
						type : 'POST',
						data : formData,
						contentType : false,
						processData : false,
						success: function(resp) {
							swal("Thanks!", "Successfully Updated!", "success");
							$('#itemPath').val(resp.itemPath);
							$('#itemImage').attr('src',resp.itemPath);
						},error: function (request, status, error) {
							//console.log("code:"+request.status+ ", message: "+request.responseText+", error:"+error);
							alert("code:" + request.status + ", message: " + request.responseText + ", error:" +
								error);
						}
					});
				}
			});
		}else{
			swal("Check!", "Please Select File", "info");
			return;
		}
	});

	//init
	$('#btnInit').click(function(){
		swal({
			title: "Init Value",
			text: "Would you like to Init value?",
			icon: "info",
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			buttons: true
		}).then((willDelete) => {
			if(willDelete){
				$('#itemcd').val('');
				$('#itemName').val('');
				$('#itemKind').val(0);
				$('#itemSale').val('');
				$('#itemPrice').val('');
				$('#itemTake').val('');
				$('#image').val('');
				$('#itemPath').val('');
				$('#itemContent').val('');		
			}
		});	
	});


	//Save
	$('#btnSave').click(function(){
		var msg='Item Code : '+$('#itemcd').val();

		if($('#itemcd').val()==''){
			msg='New Item';
		}
		
		//if(validationChk()){
			swal({
				title: "Save image",
				text: "Would you like to save "+msg+"?",
				icon: "info",
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				buttons: true
			}).then((willDelete) => {
				if(willDelete){

					var obj = {
						"itemCd":$('#itemcd').val(),
						"itemName":$('#itemName').val(),
						"itemKind":$('#itemKind').val(),
						"itemSale":$('#itemSale').val(),
						"itemPrice":$('#itemPrice').val(),
						"itemTake":$('#itemTake').val(),
						"itemPath":$('#itemPath').val(),
						"itemContent":$('#itemContent').val()
					};
					
					obj = JSON.stringify(obj);
				
					$.ajax({
						type: "POST",
						url: "/pharmaShop/main/saveItemList",
						data: {
							"data": obj
						},
						async: false,
						success: function (result) {
							swal("Thanks!", "Successfully Updated!", "success");
							location.reload();
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
			});
		//}
	});

});

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
            //console.log(result['post'][0].ITEM_CD);//JS에서 객체의 멤버변수를 접근할때는 .을 사용
			lastYN=result['lastYN'];
			startBlock=result['startBlock'];
			lastBlock=result['lastBlock'];

			var listHtml="";
			var selectHtml="";

			$('#itemList').empty();
			$('.itemSelect').empty();

			//게시물 값 초기화 
			$.each(result['post'],function(index,value){  
                listHtml+="<tr id='trRow'>"
                +"<td class='product-code'>"
                +"<h2 class='h5 text-black'><a href='#' onclick='getitemlist(this);'>"+value.ITEM_CD+"</a></h2>"
                +"</td>"
                +"<td class='product-name'>"
                +"<h2 class='h5 text-black'>"+value.ITEM_NM+"</h2>"
                +"</td>"
                +"<td class='product-kind'>"
                +"<h2 class='h5 text-black'>"+value.ITEM_KIND+"</h2>"
                +"</td>"
                +"<td class='product-price'>"
                +"<h2 class='h5 text-black'>"+value.ITEM_PRICE+"</h2>"
                +"</td>"
                +"</tr>"; 
            });
			$('#itemList').append(listHtml);

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


function initKind(){
	$.ajax({
		type: "POST",
		url: "/pharmaShop/main/initKind",
		async: false,
		dataType: "json",
		success: function (result) {
            console.log(result);
            $('#itemKind').empty();
            var listHtml='<option value="0">Select a kind</option>';
            $.each(result['kindObj'],function(index,value){
                listHtml+='<option value="'+value.CODE+'">'+value.CODE_NAME+'</option>';
            });
            $('#itemKind').append(listHtml);
            //console.log(result['post'][0].ITEM_CD);//JS에서 객체의 멤버변수를 접근할때는 .을 사용
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

function getitemlist(id){
    //함수(this)로 보낸 매개변수는 id로 처리된다
    //console.log(id.innerText);
    var obj = {
		"itemCd":id.innerText
    };
    
    obj = JSON.stringify(obj);

    $.ajax({
		type: "POST",
		url: "/pharmaShop/main/getItemList",
		data: {
			"data": obj
		},
		async: false,
		dataType: "json",
		success: function (result) {
            $('#itemcd').val(result.itemObj[0].ITEM_CD);
            $('#itemName').val(result.itemObj[0].ITEM_NM);
            $('#itemKind').val(result.itemObj[0].ITEM_KIND);
            $('#itemSale').val(result.itemObj[0].ITEM_SALE);
            $('#itemPrice').val(result.itemObj[0].ITEM_PRICE);
			$('#itemTake').val(result.itemObj[0].ITEM_TAKE);
			if(result.itemObj[0].ITEM_IMAGE!=null){
				$('#itemImage').attr('src',result.itemObj[0].ITEM_IMAGE);
				$('#itemPath').val(result.itemObj[0].ITEM_IMAGE);
			}
			$('#itemContent').val(result.itemObj[0].ITEM_CONT);
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





