//OnLoad 
$(function () {
    initFunc(1);
});

//click함수를 못찾아서 분리
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
                swal("Please Select item at least one");
                return;
            }
        }
        $(this).parents('#trRow').find('#cnt').val(cnt);
        $(this).parents('#trRow').children('#totalTd').text("$"+ChkDataType(cnt*Number(arr[12])));
        localStorage.setItem(itemCd,JSON.stringify(arr));
        
        calculateTotal();
    });
}

//Init Cart List
function initCartRow(pageNum){
    var curPage=pageNum;//현재페이지
    var postCnt=0;//
    var pageShowitemCnt=5;//페이지당 아이템 보여주는 갯수 

    var startPost=(curPage*pageShowitemCnt)-pageShowitemCnt;//페이지의 시작 게시물
    var endPost=curPage*pageShowitemCnt;//페이지의 종료 게시물

    var arr=new Array();

    //시작~종료 게시물 담기
    for(var i=0;i<localStorage.length;i++){
        var chkVal=Number(localStorage.key(i));
        if(Number.isInteger(chkVal)){;
            postCnt++;
            arr.push(JSON.parse(localStorage.getItem(chkVal)));
        }
    }

    //오름차순
    arr.sort(function(a,b){
        return Number(a[1]) < Number(b[1]) ? -1 : Number(a[1]) > Number(b[1]) ? 1 : 0;
    });

    //블록
    var block=5;//기본블록수
    var curBlock=Math.ceil(curPage/block);//현재블록
    var blockCnt=Math.ceil(postCnt/pageShowitemCnt);//마지막블록 
    var startBlock=(curBlock*5)-block;//시작블록페이지
    var lastBlock=curBlock*block;//마지막블록페이지
    //마지막 블록 유무
    var lastYN=false;

    //마지막블록 일시 블록 값 설정
    if(blockCnt<=lastBlock){
        lastBlock = blockCnt;
        lastYN=true;
    }

    //시작포스트와 끝포스트담기
    var arrInput=new Array();
    for(var i=startPost;i<endPost;i++){ 
        arrInput.push(arr[i]);
    }
    
    addCartRow(arrInput);
    addCartSelList(startBlock,lastBlock,curPage);

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
            +"<button class='btn btn-outline-primary' type='button' id='minusBtn'>&minus;</button>"
            +"</div>"
            +"<input type='text' class='form-control text-center' id='cnt' value='"+reRow[i][0]+"' placeholder=''"
            +"aria-label='Example text with button addon' aria-describedby='button-addon1'>"
            +"<div class='input-group-append'>"
            +"<button class='btn btn-outline-primary' type='button' id='plusBtn'>&plus;</button>"
            +"</div>"
            +"</div>"
            +"</td>"
            +"<td id='totalTd' class='totCls'>$"+ChkDataType(reRow[i][12]*reRow[i][0])+"</td>"
            +"<td><a href='#' onclick='removeFunc(this)' class='btn btn-primary height-auto btn-sm'>X</a></td>"
            +"<input type='hidden' value='"+reRow[i][1]+"' id='itemCd'>"
            +"</tr>";
        }
    }
    $('#cartItemList').append(addRow);
    
    calculateTotal();
}

//cartSelectList
function addCartSelList(reSb,reLb,curPage){
    var addRow="";
    var rLength=0;

    //<
    if(reSb!=0){
        addRow+="<li><a href='#' onclick='initFunc("+(reSb-1)+")'>&lt;</a></li>";
    }

    //1,2,3,4,5..
    for(var i=(reSb+1);i<=reLb;i++){        
        if(i==curPage){
            addRow+="<li><a href='#' style='font:bold;color:red; onclick='initFunc("+i+")'>"+i+"</a></li>";
        }else{
            addRow+="<li><a href='#' onclick='initFunc("+i+")'>"+i+"</a></li>";
        }
        rLength++;
    }

    //>
    if(rLength>=5){
        addRow+="<li><a href='#' onclick='initFunc("+(reLb+1)+")'>&gt;</a></li>";
    }

    $('.itemSelect').empty();
    $('.itemSelect').append(addRow);
}

//remove cart Row
function removeFunc(obj){
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          swal("Poof! Your imaginary file has been deleted!", {
            icon: "success",
          });
          localStorage.removeItem($(obj).parents('#trRow').find('#itemCd').val());
          initFunc(1);    
        }
      });
}

//checkOut page
function checkOut(){
    if($('#c_code').val()!=undefined){
        window.location='/pharmaShop/main/checkout/'+$('#c_code').val();
    }else{
        window.location='/pharmaShop/main/checkout/';
    }
}






