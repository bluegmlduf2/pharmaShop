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
							if(resp.msg==null){
								swal("Thanks!", "Successfully Updated!", "success");
								$('#itemPath').val(resp.itemPath);
								$('#itemImage').attr('src',resp.itemPath);	
							}else{
								swal("** Please Check Error **", resp.msg,"error");
							}
						},error: function (request, status, error) {
							//swal("** Please Check input Value **", output);
							//console.log("code:"+request.status+ ", message: "+request.responseText+", error:"+error);
							swal("Error!", "--- Please Contact Administrator ---", "error");
						}
					});
				}
			});
		}else{
			swal("Check!", "Please Select File", "info");
			return;
		}
	});

	// ADD ITEM
	$('#addItemBtn').on('click', function () {
		$('#modalDetailBox').modal('show').css({
			'margin-top': function () { //vertical centering
				//return -($(this).height() / 2);
				return 150;
			},
			'margin-left': function () { //Horizontal centering
				return 0;
			}
		});;
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
				$('#itemImage').attr('src','/pharmaShop/static/libraries/images/noimage.png');
				$('#itemContent').val('');		
				$('#itemDetailList').empty();
			}
		});	
	});


	//Save
	$('#btnSave').click(function(){
		var msg='Item Code : '+$('#itemcd').val();

		if($('#itemcd').val()==''){
			msg='New Item';
		}
		
		var main=new Array();		
		var cnt=0;
		var sub;

		//htmlTable->json
		//json형태 --> 객체{배열[객체{}{}..]}
		$('#itemListTbl>tbody>tr').children().each(function(i,e){
			//$(this) 와 e (태그객체)는 같다
			
			if($(this).attr('class')=='medicine-cd'){
				sub=new Object();
				sub['MEDICINE_CD']=$(this).children('#mCD').text();
			}
			if($(this).attr('class')=='medicine-name'){
				sub['MEDICINE_NAME']=$(this).children('#mNameMedi').text();
			}
			if($(this).attr('class')=='medicine-effect'){
				sub['MEDICINE_EFF']=$(this).children('#mEff').text();
			}
			if($(this).attr('class')=='medicine-remove'){
				main[cnt] = sub;
				cnt++
			}
		});
		var jsonTblObj={list:main};

		//jsonTblObj=JSON.stringify(jsonTblObj);

		var obj = {
			"itemCd":$('#itemcd').val(),
			"itemName":$('#itemName').val(),
			"itemKind":$('#itemKind').val(),
			"itemSale":$('#itemSale').val(),
			"itemPrice":$('#itemPrice').val(),
			"itemTake":$('#itemTake').val(),
			"itemPath":$('#itemPath').val(),
			"itemContent":$('#itemContent').val(),
			"ItemDetailList":jsonTblObj
		};
		
		obj = JSON.stringify(obj);

		if(validationChk(obj)){
			swal({
				title: "Save Item",
				text: "Would you like to save "+msg+"?",
				icon: "info",
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				buttons: true
			}).then((willDelete) => {
				if(willDelete){
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
							swal("Error!", "--- Please Contact Administrator ---", "error");
						}
					});
				}
			});
		}
	});

	// 모달 안의 취소 버튼에 이벤트를 건다. 
	//이벤트를 설정해주는것이기 때문에 이벤트 호출 dom객체가 호출 된 이벤트를 해당 dom에 설정해준다
	$('#closeModalDetailBtn').on('click', function () {
		$('#search_cd').val('');
		$('#modalDetailBox').modal('hide');
		$('#itemDetailListBody').empty();
	});

	//detail delete
	$('#btnDelete').click(function(){
		var reItemCd=$('#itemcd').val();

		if(reItemCd==''){
			swal("Please select", "Delete item","error");
			return;
		}

		var obj = {
			"itemCd":reItemCd
		};
		
		obj = JSON.stringify(obj);

		swal({
			title: "Delete Item",
			text: "Would you like to Delete [ "+reItemCd+" ] ?",
			icon: "info",
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			buttons: true
		}).then((willDelete) => {
			if(willDelete){
				$.ajax({
					type: "POST",
					url: "/pharmaShop/main/deleteItemList",
					data: {
						"data": obj
					},
					async: false,
					//dataType: "json",//반환값이 없을때 사용하면 에러
					success: function (result) {
						swal("Thanks!", "Successfully Updated!", "success");
						location.reload();
					},
					error: function (request, status, error) {
						//console.log("code:"+request.status+ ", message: "+request.responseText+", error:"+error);
						swal("Error!", request.responseText, "error");						
					},
					complete: function () {
						
					}
				});
			}
		});
	});
});

//page count
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

//item kind init
function initKind(){
	$.ajax({
		type: "POST",
		url: "/pharmaShop/main/initKind",
		async: false,
		dataType: "json",
		success: function (result) {
			//kind
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
			swal("Error!", "--- Please Contact Administrator ---", "error");
		}
	});
}

//ITEM DETAIL LIST
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

			//itemDetailList

			$('#itemDetailList').empty();

			var addRow;

			for(var i=0;i<result.itemObj.length;i++){       
				addRow+="<tr id='trRow'>"
				+"<td class='medicine-cd'>"
				+"<h2 class='h5 text-black' id='mCD'>"+result.itemObj[i].MEDICINE_CD+"</h2>"
				+"</td>"
				+"<td class='medicine-name'>"
				+"<h2 class='h5 text-black' id='mNameMedi'>"+result.itemObj[i].MEDICINE_NAME+"</h2>"
				+"</td>"
				+"<td class='medicine-effect'>"
				+"<h2 class='h5 text-black' id='mEff'>"+result.itemObj[i].MEDICINE_EFF+"</h2>"
				+"</td>"
				+"<td class='medicine-remove'>"
				+"<div style='position:relative;'>"
				+"<button class='btn btn-outline-primary' type='button' onclick='removeDetailItem(this)' id='removeBtn' style='position:absolute; margin-left:25px; margin-top:-5px;'>X</button>"
				+"</div>"
				+"</td>"
				+"</tr>";
			}
			
			$('#itemDetailList').append(addRow);

		},
		error: function (request, status, error) {
			//console.log("code:"+request.status+ ", message: "+request.responseText+", error:"+error);
			swal("Error!", "--- Please Contact Administrator ---", "error");
		},
		complete: function () {
			
        }
	});
}


//validation Check
function validationChk(obj) {
    var chk = true;
    var output = "";
    var arrCol=[
        '[ Cd ]\n',
        '[ item Name ]\n',
        '[ Kind ]\n',
        '[ Sale ]\n',//option
        '[ Price ]\n',
        '[ Take ]\n',//option
        '[ imagePath ]\n',
		'[ Content ]\n',
		'[ ItemDetailList ]'
    ];

    var contact = JSON.parse(obj);//json문자열 ->js객체
    var i=0;
		
    //국가선택체크
    if(contact.itemKind==0){
        output+="[ Kind ]\n";
        chk = false;
	}
	
	//상세약품체크
	if($('#itemListTbl>tbody>tr').children().length==0){
		output+="[ ItemDetailList ]\n";
		chk = false;
	}

    //공백확인
    $.each(contact, function (index, item) {

        if(index!="itemSale"
        &&index!="itemTake"
        &&index!="itemContent"
        &&index!="itemCd"){
            if (item == "") {
                //$("#idNm").focus(); 
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

//just input number
$(document).on("keyup", "input:text[numberOnly]", function () {
	//swal('Please input only Number');
	$(this).val($(this).val().replace(/[^.0-9]/gi, ""));
});

//removeDetailItems
function removeDetailItem(id){
	swal({
		title: "Delete Detail Item",
		text: "Would you like to delete item?",
		icon: "info",
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		buttons: true
	}).then((willDelete) => {
		if(willDelete){
			var trNode=id.parentNode.parentNode.parentNode;
			//var deleteRowText=trNode.childNodes[0].innerText;
			var deleteRow=trNode;
			$(deleteRow).remove();//HtmlElement-->JqueryObject
		}
	});	
}


//modalitemchoice
function choiceItem(id){
	swal({
		title: "Select Medicine",
		text: "Would you like to Select this Medicine?",
		icon: "info",
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		buttons: true
	}).then((willDelete) => {
		if(willDelete){
			var addRow;
			var mCd=id.innerText;
			var trTag=id.parentNode.parentNode.parentNode;
			var chkArr=[];//기존에 가지고있던 약품코드
			var chkval=true; //swal때문에 return이 안먹음

			$('#itemListTbl>tbody>tr').children().each(function(i,e){
				//$(this) 와 e (태그객체)는 같다
				if($(this).attr('class')=='medicine-cd'){
					chkArr.push($(this).children('#mCD').text());
				}
			});

			chkArr.forEach(function(v,i,ar){
				if(v==mCd){
					swal('Sorry!','['+mCd+'] is already registered','error');
					chkval=false;
				}else{
					chkval=true;
				}
			});

			//기존 약품에 동적추가
			if(chkval){
				addRow+="<tr id='trRow'>"
				+"<td class='medicine-cd'>"
				+"<h2 class='h5 text-black' id='mCD'>"+mCd+"</h2>"
				+"</td>"
				+"<td class='medicine-name'>"
				+"<h2 class='h5 text-black'>"+trTag.childNodes[1].firstChild.innerText+"</h2>"
				+"</td>"
				+"<td class='medicine-effect'>"
				+"<h2 class='h5 text-black'>"+trTag.childNodes[2].firstChild.innerText+"</h2>"
				+"</td>"
				+"<td class='medicine-remove'>"
				+"<div style='position:relative;'>"
				+"<button class='btn btn-outline-primary' type='button' onclick='removeDetailItem(this)' id='removeBtn' style='position:absolute; margin-left:25px; margin-top:-5px;'>X</button>"
				+"</div>"
				+"</td>"
				+"</tr>";

				$('#itemListTbl > tbody:last-child').append(addRow);//id가 itemListTbl의 > 자식의 tbody의 마지막 태그
				$('#closeModalDetailBtn').trigger('click');
			}
		}
	});	
}

//detail Search
function detailSearch(){
	var detailId=document.getElementById('search_cd').value;

	if(detailId==''){
		swal("Please type", "Type MedicineName","error");
		return;
	}

	$.ajax({
		type: "POST",
		url: "/pharmaShop/main/getMedicineList",
		data: {
			"data": detailId
		},
		async: false,
		dataType: "json",
		success: function (result) {
			$('#itemDetailListBody').empty();

			var addRow;

			for(var i=0;i<result.medicineList.length;i++){       
				addRow+="<tr id='trDetailRow'>"
				+"<td class='medicine-detail-cd'>"
				+"<h2 class='h5 text-black' id='mCD'>"
				+"<a class='d-block' data-toggle='collapse' role='button' aria-expanded='false' aria-controls='collapsepaypal' href='#' onclick='choiceItem(this)'>"
				+result.medicineList[i].MEDICINE_CD
				+"</a>"
				+"</h2>"
				+"</td>"
				+"<td class='medicine-detail-name'>"
				+"<h2 class='h5 text-black' id='mName'>"+result.medicineList[i].MEDICINE_NAME+"</h2>"
				+"</td>"
				+"<td class='medicine-detail-effect'>"
				+"<h2 class='h5 text-black' id='mEffe'>"+result.medicineList[i].MEDICINE_EFF+"</h2>"
				+"</td>"
				+"</tr>";
			}
			
			$('#itemDetailListBody').append(addRow);
		},
		error: function (request, status, error) {
			//console.log("code:"+request.status+ ", message: "+request.responseText+", error:"+error);
			swal("Error!", "--- Please Contact Administrator ---", "error");
		},
		complete: function () {
			
        }
	});
}

