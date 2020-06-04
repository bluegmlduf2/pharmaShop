//OnLoad 초기화
$(function(){
    var lsSession=localStorage.getItem('lsSession');
    
    if(lsSession!=null){
        var obj ={"pageNum": 1};
        obj = JSON.stringify(obj);

        $.ajax({
            type: "POST",
            url: "/pharmaShop/main/shop",
            data: {
                "data": obj
            },
            async: false,
            dataType: "json",
            success: function (result) {
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
});
