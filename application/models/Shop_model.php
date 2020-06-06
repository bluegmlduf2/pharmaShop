<?php
defined('BASEPATH') OR exit('No direct script access allowed');
 
class Shop_model extends CI_Model {
 
    public function __construct()
    {
        parent::__construct();
        $this->db = $this->load->database('default', true);
    }
   
    public function GetPageCnt()
    {
        //log_message("error","model ##############");
        $result = $this->db->query('SELECT count(*) as pageCnt FROM ITEM_TBL AS I')->result();
        log_message('error', $this->db->last_query());
        $this->db->close();
        //첫번째 배열객체에서 멤버변수 
        return $result[0]->pageCnt;
    }

    public function GetPage($startPost,$endPost)
    {
        log_message("error","model ##############");
        $result = $this->db->query(
            'SELECT ITEM_CD,ITEM_NM,ITEM_KIND,ITEM_CONT,ITEM_SALE,ITEM_IMAGE,ITEM_PRICE
            FROM ITEM_TBL
            LIMIT '.$startPost.','.$endPost.'')->result();
        log_message('error', $this->db->last_query());
        log_message("error","model End##############");
        $this->db->close();
        return $result;
    }


}
