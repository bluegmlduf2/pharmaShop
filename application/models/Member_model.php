<?php
defined('BASEPATH') OR exit('No direct script access allowed');
 
class Member_model extends CI_Model {
 
    public function __construct()
    {
        parent::__construct();
        $this->db = $this->load->database('default', true);
    }

    /***
    * 회원아이디 중복체크
    */
    public function mngInfoCheck($memObj)
    {
        $inputPass=$memObj['MNG_PW']; //input password
        //$inputPass=password_hash($inputPass, PASSWORD_DEFAULT, array("cost" => 10) );//10의 코스트로 비밀번호 암호화
  
        $result = $this->db->query("
        SELECT E_PASS,E_NAME
        FROM EMP_TBL
        WHERE E_LOGINID='".$memObj['MNG_ID']."';")->result();

        log_message('error', $this->db->last_query());

        $this->db->close();
 
        if (password_verify($inputPass ,$result[0]->E_PASS)) {
            return $result[0]->E_NAME;
        } else {
            return null;
        }   
    }

        /***
    * 암호화 비밀번호 입력
    */
    public function mngInfoInsert($memObj)
    {
        $inputPass=$memObj['MNG_PW']; //input password
        $inputPass=password_hash($inputPass, PASSWORD_DEFAULT, array("cost" => 10) );//10의 코스트로 비밀번호 암호화
  
        $result = $this->db->query("
        UPDATE EMP_TBL SET E_PASS='".$inputPass."'
        WHERE E_LOGINID='".$memObj['MNG_ID']."';");

        $this->db->close();
    }
}
