<?php
defined('BASEPATH') OR exit('No direct script access allowed');
 
class Ship_model extends CI_Model {
 
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
            $result = $this->db->query('SELECT count(*) as pageCnt
            FROM ORDER_TBL AS O
            JOIN SHIP_TBL AS S ON O.ORDER_CD=S.ORDER_CD')->result();
        }else{
            $result= $this->db->query('SELECT count(*) as pageCnt
            FROM ORDER_TBL AS O
            JOIN SHIP_TBL AS S ON O.ORDER_CD=S.ORDER_CD
            WHERE S.SHIP_STATE='.$kindCd.'')->result();
        }
        log_message('error', $this->db->last_query());
        $this->db->close();
        //첫번째 배열객체에서 멤버변수 
        return $result[0]->pageCnt;
    }

    public function GetPage($startPost,$endPost,$kindCd)
    {
        $result;

        //$kindCd->0 전체검색
        //PHP는 null과 0을 같다고 처리해버림 그러므로 $kindCd=null=0임
        if($kindCd==0){
            $result = $this->db->query(
                'SELECT S.SHIP_CD,O.ORDER_CD,O.ORDER_NM,O.ORDER_DATE,S.SHIP_STATE,S.SHIP_DATE
                FROM ORDER_TBL AS O
                JOIN SHIP_TBL AS S ON O.ORDER_CD=S.ORDER_CD
                ORDER BY  S.SHIP_CD DESC                
                LIMIT '.$startPost.','.$endPost.'')->result();
        }else{
            $result = $this->db->query(
                'SELECT S.SHIP_CD,O.ORDER_CD,O.ORDER_NM,O.ORDER_DATE,S.SHIP_STATE,S.SHIP_DATE
                FROM ORDER_TBL AS O
                JOIN SHIP_TBL AS S ON O.ORDER_CD=S.ORDER_CD   
                WHERE S.SHIP_STATE='.$kindCd.'
                 ORDER BY  S.SHIP_CD DESC
                 LIMIT '.$startPost.','.$endPost.'')->result();
        }
        log_message('error', $this->db->last_query());
        $this->db->close();
        return $result;
    }

    public function initState()
    {
       $result = $this->db->query(
        'SELECT CODE,CODE_NAME
        FROM CODE_TBL
        WHERE CODE_KIND=2')->result();

        log_message('error', $this->db->last_query());
        $this->db->close();
        return $result;
    }

    public function saveShipping($shipObj)
    {
        $this->db->query('UPDATE SHIP_TBL SET SHIP_STATE='.$shipObj['shipState'].',SHIP_DATE=NOW() 
         WHERE SHIP_CD='.$shipObj['shipCd'].'');

        log_message('error', $this->db->last_query());
        $this->db->close();
    }

    public function insertShipping($orderCd)
    {
        $this->db->query('INSERT SHIP_TBL (ORDER_CD,SHIP_STATE,SHIP_DATE)VALUE('.$orderCd.',5,NOW());');
        log_message('error', $this->db->last_query());
        $this->db->close();
    }
    
    public function deleteShipping($orderCd)
    {
        $this->db->query('DELETE FROM SHIP_TBL WHERE ORDER_CD='.$orderCd.'');
        log_message('error', $this->db->last_query());
        $this->db->close();
    }
}
