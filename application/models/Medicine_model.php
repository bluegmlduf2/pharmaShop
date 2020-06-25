<?php
defined('BASEPATH') OR exit('No direct script access allowed');
 
class Medicine_model extends CI_Model {
 
    public function __construct()
    {
        parent::__construct();
        $this->db = $this->load->database('default', true);
    }
   
    public function getMedicineList($row)
    {
        //log_message("error","model ##############");
        $result = $this->db->query('SELECT MEDICINE_CD,MEDICINE_NAME,MEDICINE_EFF FROM MEDICINE_TBL WHERE MEDICINE_NAME LIKE "%'.$row.'%"')->result();
        log_message('error', $this->db->last_query());
        $this->db->close();
        //첫번째 배열객체(행)에서 멤버변수 
        return $result;
    }

}
