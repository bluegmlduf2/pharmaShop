<?php
defined('BASEPATH') OR exit('No direct script access allowed');
 
class Index_model extends CI_Model {
 
    public function __construct()
    {
        parent::__construct();
        $this->db = $this->load->database('default', true);
    }
   
    public function GetPopularItem()
    {
        log_message("error","model ##############");
        $result = $this->db->query(
            'SELECT A.ITEM_CD,A.ITEM_NM,A.ITEM_KIND,A.ITEM_CONT,A.ITEM_SALE,A.ITEM_IMAGE,A.ITEM_PRICE,A.ITEM_TAKE
            FROM ITEM_TBL AS A
            JOIN 
             (SELECT ITEM_CD, COUNT(ITEM_CD) AS CNT
            FROM ITEM_DETAIL_TBL
            GROUP BY ITEM_CD
            ORDER BY CNT DESC,ITEM_CD DESC
            LIMIT 0,6) AS B 
            ON A.ITEM_CD =B.ITEM_CD')->result();
        log_message('error', $this->db->last_query());
        log_message("error","model End##############");
        $this->db->close();
        return $result;
    }

    public function GetNewItem()
    {
        log_message("error","model ##############");
        $result = $this->db->query(
            'SELECT A.ITEM_CD,A.ITEM_NM,A.ITEM_KIND,A.ITEM_CONT,A.ITEM_SALE,A.ITEM_IMAGE,A.ITEM_PRICE,A.ITEM_TAKE
            FROM ITEM_TBL AS A
            ORDER BY ITEM_CD DESC
            LIMIT 0,6')->result();
        log_message('error', $this->db->last_query());
        log_message("error","model End##############");
        $this->db->close();
        return $result;
    }

}
