<?php
defined('BASEPATH') OR exit('No direct script access allowed');
 
class Shop_Single_model extends CI_Model {
 
    public function __construct()
    {
        parent::__construct();
        $this->db = $this->load->database('default', true);
    }
   
    public function GetSingleItem($item_Cd)
    {
        log_message("error","model ##############");
        $result = $this->db->query('
            SELECT 
            I.ITEM_CD
            ,I.ITEM_NM
            ,CODE_NAME AS ITEM_KIND
            ,I.ITEM_CONT
            ,I.ITEM_SALE
            ,I.ITEM_SALE
            ,I.ITEM_IMAGE
            ,I.ITEM_PRICE
            ,I.ITEM_TAKE
            ,M.MEDICINE_CD
            ,M.MEDICINE_NAME
            ,M.MEDICINE_EFF
            FROM ITEM_TBL AS I
            LEFT JOIN CODE_TBL AS C ON I.ITEM_KIND=C.CODE
            JOIN ITEM_DETAIL_TBL AS ID ON I.ITEM_CD=ID.ITEM_CD
            JOIN MEDICINE_TBL AS M ON ID.MEDICINE_CD=M.MEDICINE_CD
            WHERE I.ITEM_CD='.$item_Cd.'')->result();
        log_message('error', $this->db->last_query());
        log_message("error","model End##############");
        $this->db->close();
        return $result;
    }
}
