<?php
defined('BASEPATH') OR exit('No direct script access allowed');
 
class Coupon_model extends CI_Model {
 
    public function __construct()
    {
        parent::__construct();
        $this->db = $this->load->database('default', true);
    }
   
    public function GetCouponCnt($cNum)
    {
        //log_message("error","model ##############");
        $result = $this->db->query('SELECT COUNT(*) AS CNT ,COUPON_USE,COUPON_AMT FROM COUPON_TBL WHERE COUPON_NUM='.$cNum.'')->result();
        log_message('error', $this->db->last_query());
        $this->db->close();
        //첫번째 배열객체(행)에서 멤버변수 
        return $result;
    }

    public function updateCoupon($cNum)
    {
        //log_message("error","model ##############");
       $this->db->query("UPDATE COUPON_TBL SET 
            COUPON_USE=1 WHERE COUPON_NUM=".$cNum."");
    }
}
