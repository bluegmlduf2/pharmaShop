
//OnLoad 
$(function () {
    var curPage=1;//?????
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
            arr.push(localStorage.getItem(chkVal));
            //alert(chkVal);
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

    console.log(arrInput);
    console.log(lastYN,startBlock,lastBlock);
    // $json_Post= $this->Shop_model->GetPage(startPost,endPost);
    // //$json_output = json_encode($json_Post, JSON_UNESCAPED_UNICODE);
    // log_message("error",$json_output); 

    // echo json_encode(array(
    // 'post' => $json_Post
    // ,'lastYN' => $lastYN
    // ,'startBlock' => $startBlock
    // ,'lastBlock' => $lastBlock), JSON_UNESCAPED_UNICODE);

	
});
