//OnLoad 
$(function () {
    initFunc(1);
});
function initFunc(nRow){
    var reVal=initCartRow(nRow);
    
    //Count,priceCalculate
    $('#plusBtn ,#minusBtn').click(function(){
        
        
        var cName=$(this).attr('id');
        var itemCd=$(this).parents('#trRow').children('#itemCd').val()
        var arr=JSON.parse(localStorage.getItem(itemCd));
        var cnt;

        if(cName=='plusBtn'){
             cnt=arr[0]+1;
            arr[0]=cnt;
        }else if(cName=='minusBtn'){
            if(arr[0]>1){
                cnt=arr[0]-1;
                arr[0]=cnt;
            }else{
                cnt=arr[0];
            }
        }
        
        $('#cnt').val(cnt);
        $(this).parents('#trRow').children('#totalTd').text("$"+ChkDataType(cnt*Number(arr[12])));
        localStorage.setItem(itemCd,JSON.stringify(arr));
        
        calculateTotal();
    });
}
//Init Cart List
function initCartRow(pageNum){
    var curPage=pageNum;//?????
    var postCnt=0;//?????
    var pageShowitemCnt=5;//???? ?? ??? 

    //???
    var pageCnt=Math.ceil(postCnt/pageShowitemCnt);// ????? ??? ??? ?? ?????
    var startPost=(curPage*pageShowitemCnt)-pageShowitemCnt;//?????
    var endPost=curPage*pageShowitemCnt;//?????

    var arr=new Array();
    //? rowCount ??????
    for(var i=0;i<localStorage.length;i++){
        var chkVal=Number(localStorage.key(i));
        if(Number.isInteger(chkVal)){;
            postCnt++;
            arr.push(JSON.parse(localStorage.getItem(chkVal)));
        }
    }

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
    
    addCartRow(arrInput);
    addCartSelList(startBlock,lastBlock);

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
    var arr=new Array();

    for(var i=0;i<localStorage.length;i++){
        var chkVal=Number(localStorage.key(i));
        if(Number.isInteger(chkVal)){;
            arr.push(JSON.parse(localStorage.getItem(chkVal)));
        }
    }
    
    var totCls=JSON.parse(localStorage.getItem(chkVal));
    var totalCost=0;
    
    arr.forEach(function(e){
       var totalCost;
        totalCost+=ChkDataType(Number(e[0]*e[12]));
    });
}

//cartSelectList
function addCartSelList(reSb,reLb){

    var addRow="";
    var rLength=0;

    if(reSb!=0){
        addRow+="<li><a href=''>&lt;</a></li>";
    }

    for(var i=(reSb+1);i<=reLb;i++){                    
        addRow+="<li><a href='#' onclick='initFunc("+i+")'>"+i+"</a></li>";
        rLength++;
    }

    if(rLength>5){
        addRow+="<li><a href=''>&gt;</a></li>";
    }

    $('.itemSelect').empty();
    $('.itemSelect').append(addRow);
}


