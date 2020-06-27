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
        try{
            $sql;

            //sale Null 처리
            $itemSale=!empty($row["itemSale"])?$row["itemSale"]:'NULL';
            if(!empty($row['itemCd'])){
                //update
                $sql=$this->db->query("
                UPDATE ITEM_TBL SET 
                ITEM_NM='".$row["itemName"]."'
                ,ITEM_KIND='".$row["itemKind"]."'
                ,ITEM_CONT='".$row["itemContent"]."'
                ,ITEM_SALE=".$itemSale."
                ,ITEM_IMAGE='".$row["itemPath"]."'
                ,ITEM_PRICE='".$row["itemPrice"]."'
                ,ITEM_TAKE='".$row["itemTake"]."'
                WHERE ITEM_CD='".$row['itemCd']."';");
            }else{
                //insert
                $sql=$this->db->query('INSERT INTO ITEM_TBL(
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
                    ,'.$itemSale.'
                    ,"'.$row["itemPath"].'"
                    ,'.$row["itemPrice"].'
                    ,"'.$row["itemTake"].'"
                    )');
            }

            //DB Error처리
            if(!$sql){
                // do something in error case
                $error = $this->db->error();
                throw new Exception( 'Error! Please Contact admin' );
            }else{
                log_message('error', $this->db->last_query());
            }
            
        }catch(exception $e){
            throw new Exception( 'Error! Please Contact admin' );
            log_message('error', $e->getMessage());
        }finally{
            return $this->db->insert_id();
        } 
    }

    public function deleteItemDetailList($data)
    {
        try{
            $sql=$this->db->query("DELETE FROM ITEM_DETAIL_TBL WHERE
            ITEM_CD=".$data['itemCd'].";");
    
            //DB Error처리
            if(!$sql){
                // do something in error case
                $error = $this->db->error();
                throw new Exception( 'Error! Please Contact admin' );
            }else{
                log_message('error', $this->db->last_query());
            }

        }catch(exception $e){
            throw new Exception( 'Error! Please Contact admin' );
            log_message('error', $e->getMessage());
        }finally{
            $this->db->close();
        } 
    }


    public function deleteItemList($data)
    {
        try{
            $sql=$this->db->query("DELETE FROM ITEM_TBL WHERE
            ITEM_CD=".$data['itemCd'].";");
    
            //DB Error처리
            if(!$sql){
                // do something in error case
                $error = $this->db->error();
                throw new Exception( 'Error! Please Contact admin' );
            }else{
                log_message('error', $this->db->last_query());
            }

        }catch(Exception $e){
            throw new Exception( 'Error! Please Contact admin' );
            log_message('error', $e->getMessage());
        }finally{
            $this->db->close();
        } 
    }


    public function saveItemDetailList($data)
    {
        try{
            $json_data = $data['ItemDetailList']['list'];

            foreach($json_data as $row ) {
                $sql=$this->db->query("INSERT INTO ITEM_DETAIL_TBL(
                MEDICINE_CD
                ,ITEM_CD) 
                VALUES(".$row['MEDICINE_CD']."
                ,".$data['itemCd'].")");
     
                //DB Error처리
                if(!$sql){
                    // do something in error case
                    $error = $this->db->error();
                    throw new Exception( 'Error! Please Contact admin' );
                }else{
                    log_message('error', $this->db->last_query());
                }
            }
        }catch(exception $e){
            throw new Exception( 'Error! Please Contact admin' );
            log_message('error', $e->getMessage());
        }finally{
            $this->db->close();
        } 

        //log_message("error","model ##############");
        log_message('error', $this->db->last_query());
        $this->db->close();
    }
    

}
