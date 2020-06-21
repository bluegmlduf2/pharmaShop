<?php
defined('BASEPATH') OR exit('No direct script access allowed');
 
class Code_model extends CI_Model {
 
    public function __construct()
    {
        parent::__construct();
        $this->db = $this->load->database('default', true);
    }
   
    public function initKind()
    {
        log_message("error","model ##############");
        $result = $this->db->query(
            'SELECT CODE,CODE_NAME FROM CODE_TBL
            WHERE CODE_KIND=1')->result();
        log_message('error', $this->db->last_query());
        log_message("error","model End##############");
        $this->db->close();
        return $result;
    }

}
