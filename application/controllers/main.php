<?php defined('BASEPATH') OR exit('No direct script access allowed');

class main extends CI_Controller {
	/**
	 * onload
	 */
	public function __construct()
    {
        parent::__construct();
		$this->load->database();
	}

	/**
	 * 메인화면
	 */
	public function index() {
		$default_data=array('title'=> "pharmaShop");

		$this->load->view('layout/header', $default_data);
		$this->load->view('page/index', $data);
		$this->load->view('layout/footer', $default_data);
	}

	/**
	 * 스킬 및 캐리어 호출
	 */
	public function skill() {
		$default_data=array('title'=> "Wally's Portfolio");

		$this->load->view('layout/header', $default_data);
		$this->load->view('page/skill', $data);
		$this->load->view('layout/footer', $default_data);
	}
		/**
	 * 나의 작업 현황 화면 호출
	 */
	public function work() {
		$default_data=array('title'=> "Wally's Portfolio");

		$this->load->view('layout/header', $default_data);
		$this->load->view('page/work', $data);
		$this->load->view('layout/footer', $default_data);
	}

		/**
	 * 연락처 화면 호출
	 */
	public function contact() {
		$default_data=array('title'=> "Wally's Portfolio");

		$this->load->view('layout/header', $default_data);
		$this->load->view('page/contact', $data);
		$this->load->view('layout/footer', $default_data);
	}

			/**
	 * 테스트 화면 호출
	 */
	public function test() {
		$default_data=array('title'=> "Wally's Portfolio");

		$this->load->view('layout/header', $default_data);
		$this->load->view('page/testpage', $data);

	}
	

}
