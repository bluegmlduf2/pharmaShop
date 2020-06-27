<?php
defined('BASEPATH') OR exit('No direct script access allowed');
 
class Shop_model extends CI_Model {
 
    public function __construct()
    {
        parent::__construct();
        $this->db = $this->load->database('default', true);
    }
   
    public function GetPageCnt($kindCd)
    {
        $result;
        //log_message("error","model ##############");
        //$kindCd->0 전체검색
        if($kindCd==0){
            $result = $this->db->query('SELECT count(*) as pageCnt FROM ITEM_TBL AS I')->result();
        }else{
            $result= $this->db->query('SELECT count(*) as pageCnt FROM ITEM_TBL AS I WHERE I.ITEM_KIND='.$kindCd.'')->result();
        }
        log_message('error', $this->db->last_query());
        $this->db->close();
        //첫번째 배열객체에서 멤버변수 
        return $result[0]->pageCnt;
    }

    public function GetPage($startPost,$endPost,$kindCd)
    {
        $result;
        log_message("error","model ##############");
        //$kindCd->0 전체검색
        if($kindCd==0){
            $result = $this->db->query(
                'SELECT ITEM_CD,ITEM_NM,CODE_NAME AS ITEM_KIND,ITEM_CONT,ITEM_SALE,ITEM_IMAGE,ITEM_PRICE
                FROM ITEM_TBL AS I
                LEFT JOIN CODE_TBL AS C ON I.ITEM_KIND=C.CODE
                LIMIT '.$startPost.','.$endPost.'')->result();
        }else{
            $result = $this->db->query(
                'SELECT ITEM_CD,ITEM_NM,CODE_NAME AS ITEM_KIND,ITEM_CONT,ITEM_SALE,ITEM_IMAGE,ITEM_PRICE
                FROM ITEM_TBL AS I
                LEFT JOIN CODE_TBL AS C ON I.ITEM_KIND=C.CODE
                WHERE I.ITEM_KIND='.$kindCd.'
                 LIMIT '.$startPost.','.$endPost.'')->result();
        }
        log_message('error', $this->db->last_query());
        log_message("error","model End##############");
        $this->db->close();
        return $result;
    }

    public function GetItemList($itemCd)
    {
        log_message("error","model ##############");
        $result = $this->db->query(
            'SELECT I.ITEM_CD,I.ITEM_NM,I.ITEM_KIND,I.ITEM_CONT,I.ITEM_SALE,I.ITEM_IMAGE,I.ITEM_PRICE,I.ITEM_TAKE,M.MEDICINE_CD,M.MEDICINE_NAME,M.MEDICINE_EFF
            FROM ITEM_TBL AS I
            JOIN ITEM_DETAIL_TBL AS ID ON I.ITEM_CD=ID.ITEM_CD
            JOIN MEDICINE_TBL AS M ON ID.MEDICINE_CD=M.MEDICINE_CD
            WHERE I.ITEM_CD='.$itemCd.'
            ORDER BY I.ITEM_CD')->result();
        log_message('error', $this->db->last_query());
        log_message("error","model End##############");
        $this->db->close();
        return $result;
    }

}
