//OnLoad 
$(function () {
    var reVal=initCartRow(1);
    reVal.reRow;
    // reYn.reRow;
    // reSb.reRow;
    // reLb.reRow;
    addCartRow(reVal.reRow);

    //Count,priceCalculate
$('#plusBtn ,#minusBtn').click(function(){
    
    var cName=$(this).attr('id');
    var itemCd=$(this).parents('#trRow').children('#itemCd').val()
    var arr=JSON.parse(localStorage.getItem(itemCd));
    
    if(cName=='plusBtn'){
        var cnt=arr[0]+1;
        arr[0]=cnt;
    }else if(cName=='minusBtn'){
        if(arr[0]!=0){
            var cnt=arr[0]-1;
            arr[0]=cnt;
        }
    }

    $(this).parents('#trRow').children('#totalTd').text("$"+ChkDataType(cnt*Number(arr[12])));
    localStorage.setItem(itemCd,JSON.stringify(arr));
    
    calculateTotal();

});


});

//Init Cart List
function initCartRow(pageNum){
    var curPage=pageNum;//?????
    var postCnt=0;//?????
    var pageShowitemCnt=5;//???? ?? ??? 

    //???
    var pageCnt=Math.ceil(postCnt/pageShowitemCnt);// ????? ??? ??? ?? ?????
    var startPost=(curPage*pageShowitemCnt)-pageShowitemCnt;//?????
    var endPost=pageShowitemCnt;//?????

    var arr=new Array();
    //? rowCount ??????
    for(var i=0;i<localStorage.length;i++){
        var chkVal=Number(localStorage.key(i));
        if(Number.isInteger(chkVal)){;
            postCnt++;
            arr.push(JSON.parse(localStorage.getItem(chkVal)));
        }
    }

    //??
    //debugger;??? ??
    var block=5;//?????
    var curBlock=Math.ceil(curPage/block);//????
    var blockCnt=Math.ceil(postCnt/pageShowitemCnt);//????? 
    var startBlock=(curBlock*5)-block;//???????
    var lastBlock=curBlock*block;//????????

    //??? ?? ??
    var lastYN=false;

    //??? ???? ??? ??
    if(blockCnt<=lastBlock){
        lastBlock = blockCnt;
        lastYN=true;
    }

    var arrInput=new Array();
    for(var i=startPost;i<endPost;i++){        
        arrInput.push(arr[i]);
    }

    return {
        reRow:arrInput,
        reYn:lastYN,
        reSb:startBlock,
        reLb:lastBlock
    };
}

//AddCartList
function addCartRow(reRow){
    $('#cartItemList').empty();

    var addRow;
    var total=0;
    
    for(var i=0;i<reRow.length;i++){       
        if(reRow[i]!=undefined){ 
            addRow+="<tr id='trRow'>"
            +"<td class='product-thumbnail'>"
            +"<img src='"+reRow[i][6]+"' alt='Image' class='img-fluid'>"
            +"</td>"
            +"<td class='product-name'>"
            +"<h2 class='h5 text-black'>"+reRow[i][2]+"</h2>"
            +"</td>"
            +"<td>$"+reRow[i][12]+"</td>"
            +"<td>"
            +"<div class='input-group mb-3' style='max-width: 120px;'>"
            +"<div class='input-group-prepend'>"
            +"<button class='btn btn-outline-primary js-btn-minus' type='button' id='minusBtn'>&minus;</button>"
            +"</div>"
            +"<input type='text' class='form-control text-center' id='cnt' value='"+reRow[i][0]+"' placeholder=''"
            +"aria-label='Example text with button addon' aria-describedby='button-addon1'>"
            +"<div class='input-group-append'>"
            +"<button class='btn btn-outline-primary js-btn-plus' type='button' id='plusBtn'>&plus;</button>"
            +"</div>"
            +"</div>"
            +"</td>"
            +"<td id='totalTd' class='totCls'>$"+ChkDataType(reRow[i][12]*reRow[i][0])+"</td>"
            +"<td><a href='#' class='btn btn-primary height-auto btn-sm'>X</a></td>"
            +"<input type='hidden' value='"+reRow[i][1]+"' id='itemCd'>"
            +"</tr>";
        }
    }
    $('#cartItemList').append(addRow);
    
    calculateTotal();
}

//Total Calculate
function calculateTotal(){
    var totCls=$('.totCls').get();
    var total=0;
    
    totCls.forEach(function(e){
        total+=ChkDataType(Number($(e).text().substring(1)));
    });

    $('#subTot').text("$"+total);
    $('#tot').text("$"+total);
}

