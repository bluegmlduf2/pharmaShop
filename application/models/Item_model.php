<?php
defined('BASEPATH') OR exit('No direct script access allowed');
 
class Item_model extends CI_Model {
 
    public function __construct()
    {
        parent::__construct();
        $this->db = $this->load->database('default', true);
    }
   
    public function saveItemList($row)
    {
        /*						"itemCd":$('#itemcd').val(),
						"itemName":$('#itemName').val(),
						"itemKind":$('#itemKind').val(),
						"itemSale":$('#itemSale').val(),
						"itemPrice":$('#itemPrice').val(),
						"itemTake":$('#itemTake').val(),
						"itemPath":$('#itemPath').val(),
                        "itemContent":$('#itemContent').val()
                         */
        if(!empty($row['itemCd'])){
            //update
            $this->db->query("
            UPDATE ITEM_TBL SET 
            ITEM_NM='".$row["itemName"]."'
            ,ITEM_KIND='".$row["itemKind"]."'
            ,ITEM_CONT='".$row["itemContent"]."'
            ,ITEM_SALE='".$row["itemSale"]."'
            ,ITEM_IMAGE='".$row["itemPath"]."'
            ,ITEM_PRICE='".$row["itemPrice"]."'
            ,ITEM_TAKE='".$row["itemTake"]."'
            WHERE ITEM_CD='".$row['itemCd']."';");
        }else{
            //insert
            $this->db->query('INSERT INTO ITEM_TBL(
                ITEM_NM
                ,ITEM_KIND
                ,ITEM_CONT
                ,ITEM_SALE
                ,ITEM_IMAGE
                ,ITEM_PRICE
                ,ITEM_TAKE
                ) VALUES (
                "'.$row["itemName"].'"
                ,"'.$row["itemKind"].'"
                ,"'.$row["itemContent"].'"
                ,'.$row["itemSale"].'
                ,"'.$row["itemPath"].'"
                ,'.$row["itemPrice"].'
                ,"'.$row["itemTake"].'"
                )');
        }

        //log_message("error","model ##############");
        log_message('error', $this->db->last_query());
        $this->db->close();
    }

}
