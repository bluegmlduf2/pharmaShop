//OnLoad 
$(function () {
    pageFunc(1);
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
            $('#couponcd').val('');
            $('#couponNum').val('');
            $('#couponUse').val(0);
            $('#couponAmt').val('');
        }
    });	
});


//Save
$('#btnSave').click(function(){
    var msg='Coupon Code : '+$('#couponcd').val();

    if($('#couponcd').val()==''){
        msg='New Coupon';
    }

    var obj = {
        "couponcd":$('#couponcd').val(),
        "couponNum":$('#couponNum').val(),
        "couponUse":$('#couponUse').val(),
        "couponAmt":$('#couponAmt').val()
    };
    
    obj = JSON.stringify(obj);

    if(validationChk(obj)){
        swal({
            title: "Save Coupon",
            text: "Would you like to save "+msg+"?",
            icon: "info",
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            buttons: true
        }).then((willDelete) => {
            if(willDelete){
                $.ajax({
                    type: "POST",
                    url: "/pharmaShop/main/saveCouponList",
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


//detail delete
$('#btnDelete').click(function(){
    var reCouponcd=$('#couponcd').val();

    if(reCouponcd==''){
        swal("Please select", "Delete item","error");
        return;
    }

    var obj = {
        "couponcd":reCouponcd
    };
    
    obj = JSON.stringify(obj);

    swal({
        title: "Delete Coupon",
        text: "Would you like to Delete [ "+reCouponcd+" ] ?",
        icon: "warning",
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        buttons: true
    }).then((willDelete) => {
        if(willDelete){
            $.ajax({
                type: "POST",
                url: "/pharmaShop/main/deleteCouponList",
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

//page count
function pageFunc(curPage){
	var obj = {
		"pageNum":curPage
	};

	obj = JSON.stringify(obj);

	$.ajax({
		type: "POST",
		url: "/pharmaShop/main/couponList",
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

			$('#couponList').empty();
			$('.couponSelect').empty();

            //게시물 값 초기화 
			$.each(result['post'],function(index,value){  
                listHtml+="<tr id='trRow'>"
                +"<td class='coupon-code'>"
                +"<a class='d-block' data-toggle='collapse' role='button' aria-expanded='false' aria-controls='collapsepaypal' href='#' onclick='choiceItem(this)'>"
                +value.COUPON_CD
                +"</a>"
                +"</td>"
                +"<td class='coupon-num'>"
                +"<h2 class='h5 text-black'>"+value.COUPON_NUM+"</h2>"
                +"</td>"
                +"<td class='coupon-use'>"
                if(value.COUPON_USE==0){
                    listHtml+="<h2 class='h5 text-black'>UNUSED</h2>"
                }else{
                    listHtml+="<h2 class='h5 text-black'>USED</h2>"
                }
                listHtml+="</td>"
                +"<td class='coupon-amount'>"
                +"<h2 class='h5 text-black'> $ "+value.COUPON_AMT+"</h2>"
                +"</td>"
                +"</tr>"; 
            });
			$('#couponList').append(listHtml);

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
            
            $('.couponSelect').append(selectHtml);

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

//CouponDetailList
function choiceItem(id){
	swal({
		title: "Select Coupon",
		text: "Would you like to Select this Coupon?",
		icon: "info",
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		buttons: true
	}).then((willDelete) => {
		if(willDelete){
			var mCd=id.innerText;
            var trTag=id.parentNode.parentNode;
            var vNum=trTag.childNodes[1].firstChild.innerText;
            var vUse=trTag.childNodes[2].firstChild.innerText;
            var vAmt=trTag.childNodes[3].firstChild.innerText;
            var vAmtSub=vAmt.substring(1).trim();

            //document.getElementById('couponcd').setAttribute('value',mCd);
            document.getElementById('couponcd').value=mCd;
            document.getElementById('couponNum').value=vNum;
            if(vUse=='UNUSED'){
                document.getElementById('UNUSED').selected=true;
            }else{
                document.getElementById('USED').selected=true;
            }
            //vSel.options[vSel.selectedIndex].selected;
            
            document.getElementById('couponAmt').value=vAmtSub;
		}
	});	
}

//validation Check
function validationChk(obj) {
    var chk = true;
    var output = "";
    var arrCol=[
        '[ Coupon Code ]\n',
        '[ Coupon Num ]\n',
        '[ Use ]\n',
		'[ Amount  ]'
    ];

    var contact = JSON.parse(obj);//json문자열 ->js객체
    var i=0;
	
    //공백확인
    $.each(contact, function (index, item) {

        if(index!="couponcd"){
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



