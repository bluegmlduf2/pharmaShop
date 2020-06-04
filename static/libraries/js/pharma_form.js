//OnLoad 초기화
$(function () {
	var obj = {
		"pageNum":7
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
            console.log(result['post']);
            console.log(result['post'][0].ITEM_CD);
            console.log(result['curBlock']);
            console.log(result['startBlock']);
            console.log(result['lastBlock']);
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
});
