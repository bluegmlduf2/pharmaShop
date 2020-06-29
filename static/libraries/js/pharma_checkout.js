//OnLoad 
$(function () {
    if(couponCd!=undefined){
        $('#c_code').val(couponCd);
        itemList();
        applyCoupon(false);
        return;
    }
    itemList();
    calculateTotal();

    var toggle=true;

    //제이쿼리에서 html을 생성하고 생성된 html에 이벤트를 적용하기때문에 여기에 위치해야한다
    $('#showMoreBtn').click(function(){    
        if(toggle){
            $('.itemShowHide1').show();
            $('.itemShowHide2').show();
            $('#showMoreBtn').text('HIDE LIST');
            toggle=false
        }else{
            $('.itemShowHide1').show();
            $('.itemShowHide2').hide();
            $('html').scrollTop(0);//해당 셀렉터까지 스크롤 이동
            $('#showMoreBtn').text('SHOW MORE');
            toggle=true
        }
    });

    //just input number
    $(document).on("keyup", "input:text[numberOnly]", function () {
        //swal('Please input only Number');
        $(this).val($(this).val().replace(/[^-0-9]/gi, ""));
    });

    //Check My Order
    $('#btnChkOrder').click(function(){
        swal("Input Your Order Number:", {
            content: "input",
            cancel: "Run away!",
          })
          .then((value) => {
            
            if(value==""){
                return;
            }

            var obj ={
                "order_cd": value
            };
            
            obj = JSON.stringify(obj);//json객체 -> json문자열

            $.ajax({
                type: "POST",
                url: "/pharmaShop/main/checkOrderList",
                data: {
                    "data": obj
                },
                async: false,
                dataType: "json",
                success: function (result) {
                    if(result.order_cd[0].CNT==1){
                        swal("Thanks!", "Successfully Checked!", "success");
                        var rUrl="/pharmaShop/main/orderList/"+value;
                        location.href=rUrl;
                    }else{
                        swal("Sorry Check the OrderNumber!", result.message, "error");
                    }               
                },
                error: function (request, status, error) {
                    //console.log("code:"+request.status+ ", message: "+request.responseText+", error:"+error);
                    swal("code:" + request.status + ", message: " + request.responseText + ", error:" +
                        error+"\n"+"\n     ---Please Contact Administrator ---");
                }
            });
        });

    })

});

//Item List
function itemList(coupon){
    var addRow;
    var arr=new Array();

    //시작~종료 게시물 담기
    for(var i=0;i<localStorage.length;i++){
        var chkVal=Number(localStorage.key(i));
        if(Number.isInteger(chkVal)){;
            arr.push(JSON.parse(localStorage.getItem(chkVal)));
        }
    }

    //order by
    arr.sort(function(a,b){
        return Number(a[1]) < Number(b[1]) ? -1 : Number(a[1]) > Number(b[1]) ? 1 : 0;
    });
   
    $('#prodList').empty();

    for(var i=0;i<arr.length;i++){       
        if(arr[i]!=undefined&&i<5){ 
            addRow+="<tr class='itemShowHide1'>"
            +"<td>"+arr[i][2]+" <strong class='mx-2'>x</strong>"+ arr[i][0]+"</td>"
            +"<td>$"+ChkDataType(arr[i][12]*arr[i][0])+"</td>"
            +"</tr>";
        }else{
            addRow+="<tr class='itemShowHide2' style='display: none;'>"
            +"<td>"+arr[i][2]+" <strong class='mx-2'>x</strong>"+ arr[i][0]+"</td>"
            +"<td>$"+ChkDataType(arr[i][12]*arr[i][0])+"</td>"
            +"</tr>";
        }
    }

    if(arr.length>5){
        $('#showMoreBtn').show();
    }else{
        $('#showMoreBtn').hide();
    }

    $('#prodList').prepend(addRow);
}

//place order
function placeOrder(){

    var arr=new Array();

    //시작~종료 게시물 담기
    for(var i=0;i<localStorage.length;i++){
        var chkVal=Number(localStorage.key(i));
        if(Number.isInteger(chkVal)){;
            arr.push(JSON.parse(localStorage.getItem(chkVal)));
        }
    }

    //order by
    arr.sort(function(a,b){
        return Number(a[1]) < Number(b[1]) ? -1 : Number(a[1]) > Number(b[1]) ? 1 : 0;
    });

    //저장정보 json형태로 넘김
    var obj ={
        "c_country": $('#c_country').val(),
        "c_fname": $('#c_fname').val(),
        "c_lname": $('#c_lname').val(),
        "c_companyname": $('#c_companyname').val(),//option
        "c_address": $('#c_address').val(),
        "c_address_opt": $('#c_address_opt').val(),//option
        "c_state_country": $('#c_state_country').val(),
        "c_postal_zip": $('#c_postal_zip').val(),
        "c_email_address": $('#c_email_address').val(),
        "c_phone": $('#c_phone').val(),
        "c_order_notes": $('#c_order_notes').val(),//option
        "tot":$('#tot').text().substring(1),//총금액
        "c_code":$('#c_code').val()==undefined?null:$('#c_code').val(),
        "item_list":arr
    };

    obj = JSON.stringify(obj);//json객체 -> json문자열

    //input value validation check and insert value
    if (validationChk(obj)) {
        //insert value
        swal({
            title: "Order!!",
            text: "Would you like to order?",
            icon: "info",
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            buttons: true
          })
          .then((willDelete) => {
            if (willDelete) {
                $.ajax({
                    type: "POST",
                    url: "/pharmaShop/main/insertOrderList",
                    data: {
                        "data": obj
                    },
                    async: false,
                    dataType: "json",
                    success: function (result) {
                        //콜백함수-->동기적으로 동작 location.reload();가 비동기적으로 실행되버리기때문
                        var syncFunc=function(lastCall){
            
                            //주문번호 
                            swal("Successfully Ordered!", "Check Your Order Number!  \n Youu OrderNumber Is : ", "success");

                            //로컬스토리지 비우기 확인
                            swal({
                                title: "Successfully Ordered!",
                                text: "Check Your Order Number! [ "+result.order_cd+" ]  \n  Would you delete Cart List?",
                                icon: "success",
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                buttons: true
                            })
                            .then((willDelete) => {
                                if (willDelete) {
                                    localStorage.clear();
                                    swal("Success","CartList Deleted!!","info");
                                    location.reload('/pharmaShop/main/checkout/');
                                }else{
                                    location.reload('/pharmaShop/main/checkout/');
                                }
                            });  
                            //최종 실행 location.reload();
                            lastCall();
                        }

                        syncFunc(function lastCall(){
                          //  location.reload(); //동기함수에 매개변수로 lastCall()을 넣음. 가장 마지막에 실행
                        });      
                                     
                    },
                    error: function (request, status, error) {
                        //console.log("code:"+request.status+ ", message: "+request.responseText+", error:"+error);
                        swal("code:" + request.status + ", message: " + request.responseText + ", error:" +
                            error+"\n"+"\n     ---Please Contact Administrator ---");
                    }
                });
            }
        });
    }  	  
}

//validation Check
function validationChk(obj) {
    var chk = true;
    var output = "";
    var arrCol=[
        '[ Country ]\n',
        '[ First Name ]\n',
        '[ Last Name ]\n',
        '[ Company Name ]\n',//option
        '[ Address ]\n',
        '[ Address (Option) ]\n',//option
        '[ State / Country ]\n',
        '[ Posta / Zip ]\n',
        '[ Email Address ]\n',
        '[ Phone ]\n',
        '[ c_order_notes ]'//option
    ];

    var contact = JSON.parse(obj);//json문자열 ->js객체
    var i=0;
    
    //국가선택체크
    if(contact.c_country==1){
        output+="[ Country ]\n";
        chk = false;
    }

    //공백확인
    $.each(contact, function (index, item) {

        if(index!="c_country"
        &&index!="c_companyname"
        &&index!="c_address_opt"
        &&index!="c_order_notes"
        &&index!="tot"
        &&index!="c_code"
        &&index!="item_list"){
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






