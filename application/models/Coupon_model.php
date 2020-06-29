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
        $result = $this->db->query('SELECT COUNT(*) AS CNT ,COUPON_USE,COUPON_AMT FROM COUPON_TBL WHERE COUPON_NUM="'.$cNum.'"')->result();
        log_message('error', $this->db->last_query());
        $this->db->close();
        //첫번째 배열객체(행)에서 멤버변수 
        return $result;
    }

    public function updateCoupon($cNum)
    {
        //log_message("error","model ##############");
       $this->db->query("UPDATE COUPON_TBL SET 
            COUPON_USE=9 WHERE COUPON_NUM='".$cNum."'");
    }

    public function updateCancelCoupon($cNum)
    {
        //log_message("error","model ##############");
       $this->db->query("UPDATE COUPON_TBL SET 
            COUPON_USE=8 WHERE COUPON_NUM='".$cNum."'");
    }
    
    public function GetCouponListCnt()
    {
        //log_message("error","model ##############");
        $result = $this->db->query('SELECT COUNT(*) AS CNT FROM COUPON_TBL')->result();
        log_message('error', $this->db->last_query());
        $this->db->close();
        //첫번째 배열객체(행)에서 멤버변수 
        return $result[0]->CNT;
    }

    public function GetPage($startPost,$endPost)
    {
        $result = $this->db->query(
            'SELECT COUPON_CD,COUPON_NUM,COUPON_USE,COUPON_AMT
            FROM COUPON_TBL AS C               
            LIMIT '.$startPost.','.$endPost.'')->result();

        log_message('error', $this->db->last_query());
        $this->db->close();
        return $result;
    }

    public function saveCouponList($row)
    {
        try{
            $sql;

            //sale Null 처리
            if(!empty($row['couponcd'])){
                //update
                $sql=$this->db->query("
                UPDATE COUPON_TBL SET  
                COUPON_NUM='".$row["couponNum"]."'
                ,COUPON_USE=".$row["couponUse"]."
                ,COUPON_AMT=".$row["couponAmt"]."
                WHERE COUPON_CD=".$row['couponcd'].";");
            }else{
                //insert
                $sql=$this->db->query('INSERT INTO COUPON_TBL(
                    COUPON_NUM
                    ,COUPON_USE
                    ,COUPON_AMT
                    ) VALUES (
                    "'.$row["couponNum"].'"
                    ,'.$row["couponUse"].'
                    ,'.$row["couponAmt"].')');
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
        }
    }

    public function GetOrderCouponCnt($oNum)
    {
        $result = $this->db->query('SELECT COUNT(*) AS CNT FROM ORDER_TBL WHERE COUPON_CD='.$oNum['couponcd'].'')->result();
        log_message('error', $this->db->last_query());
        $this->db->close();
        //첫번째 배열객체(행)에서 멤버변수 
        return $result;
    }

    public function deleteCouponList($data)
    {
        try{
            $sql=$this->db->query("DELETE FROM COUPON_TBL WHERE
            COUPON_CD=".$data['couponcd'].";");
    
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
    
}
