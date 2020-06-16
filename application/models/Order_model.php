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
}
