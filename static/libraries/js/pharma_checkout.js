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

    //오름차순
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






