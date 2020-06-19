<?php
defined('BASEPATH') OR exit('No direct script access allowed');
 
class Order_model extends CI_Model {
 
    public function __construct()
    {
        parent::__construct();
        $this->db = $this->load->database('default', true);
    }
   
    public function insertOrderList($data)
    {
        $this->db->query("INSERT INTO ORDER_TBL(
        ORDER_NATION
        ,ORDER_NM
        ,ORDER_COMPANY
        ,ORDER_ADDR
        ,ORDER_CONTRY
        ,ORDER_POST
        ,ORDER_EMAIL
        ,ORDER_PHONE
        ,ORDER_WANT
        ,ORDER_AMOUNT
        ,ORDER_DATE
        ,COUPON_CD) 
        VALUES('".$data['c_country']."'
        ,'".$data['c_fname'].' '.$data['c_lname']."'
        ,'".$data['c_companyname']."'
        ,'".$data['c_address'].' '.$data['c_address_opt']."'
        ,'".$data['c_state_country']."'
        ,'".$data['c_postal_zip']."'
        ,'".$data['c_email_address']."'
        ,'".$data['c_phone']."'
        ,'".$data['c_order_notes']."'
        ,".$data['tot']."
        ,DATE_FORMAT(NOW(),'%Y-%m-%d')
        ,".$data['c_code'].")");

        return $this->db->insert_id();
    }

    public function insertOrderDetailList($data,$order_cd)
    {
        foreach( $data as $row ) {
            $this->db->query("INSERT INTO ORDER_DETAIL_TBL(
            ORDER_CD
            ,ITEM_CD
            ,ITEM_CNT) 
            VALUES(".$order_cd."
            ,".$row[1]."
            ,".$row[0].")");
        }
    }

    public function GetOrderCnt($oNum)
    {
        $result = $this->db->query('SELECT COUNT(*) AS CNT FROM ORDER_TBL WHERE ORDER_CD='.$oNum.'')->result();
        log_message('error', $this->db->last_query());
        $this->db->close();
        //첫번째 배열객체(행)에서 멤버변수 
        return $result;
    }

    public function GetOrderList($oNum)
    {
        $result = $this->db->query('
        SELECT 
            OT.ORDER_CD
            ,OT.ORDER_NATION
            ,OT.ORDER_NM
            ,OT.ORDER_CONTRY
            ,OT.ORDER_COMPANY
            ,OT.ORDER_ADDR
            ,OT.ORDER_POST
            ,OT.ORDER_EMAIL
            ,OT.ORDER_PHONE
            ,OT.COUPON_CD
            ,OT.ORDER_AMOUNT
            ,OT.ORDER_DATE
            ,OT.ORDER_WANT
            ,IT.ITEM_NM
            ,OD.ITEM_CNT
            ,CAST(((IT.ITEM_PRICE*OD.ITEM_CNT)/100)*IFNULL(100-IT.ITEM_SALE,100) AS SIGNED INTEGER) AS AMT
        FROM ORDER_TBL AS OT
        JOIN ORDER_DETAIL_TBL AS OD ON OT.ORDER_CD = OD.ORDER_CD
        JOIN ITEM_TBL AS IT ON OD.ITEM_CD=IT.ITEM_CD
        JOIN COUPON_TBL AS CT ON OT.COUPON_CD=CT.COUPON_NUM
        WHERE OT.ORDER_CD='.$oNum.'')->result();

        log_message('error', $this->db->last_query());

        $this->db->close();
        return $result;
    }

    public function updateOrderList($data)
    {
        try{
            $sql=$this->db->query("UPDATE ORDER_TBL SET 
            ORDER_NATION='".$data['ORDER_NATION']."'
            ,ORDER_NM='".$data['ORDER_NM']."'
            ,ORDER_COMPANY='".$data['ORDER_COMPANY']."'
            ,ORDER_ADDR='".$data['ORDER_ADDR']."'
            ,ORDER_CONTRY='".$data['ORDER_CONTRY']."'
            ,ORDER_POST='".$data['ORDER_POST']."'
            ,ORDER_EMAIL='".$data['ORDER_EMAIL']."'
            ,ORDER_PHONE='".$data['ORDER_PHONE']."'
            ,ORDER_WANT='".$data['ORDER_WANT']."'
            ,ORDER_PHONE='".$data['ORDER_PHONE']."'
            WHERE ORDER_CD=".$data['ORDER_CD']."");

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
}
