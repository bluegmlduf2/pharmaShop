<?php defined('BASEPATH') OR exit('No direct script access allowed');

class Main extends CI_Controller {
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
	 * 메인화면
	 */
	public function shop() {
		$default_data=array('title'=> "pharmaShop");

		$this->load->view('layout/header', $default_data);
		$this->load->view('page/shop');
		$this->load->view('layout/footer', $default_data);
	}


	/**
	 * 상품목록
	 */
	public function shopList() {
		$default_data=array('title'=> "Wally's Portfolio");
		
		$this->load->model('Shop_model');
		
		$data = $this->input->post('data', true);
		$json_curPage = json_decode( $data,true)['pageNum'];
		//$json_curPage = 6;

		//게시물
		$postCnt=$this->Shop_model->GetPageCnt();//총게시물수
		$pageShowitemCnt=6;//한화면당 노출 상품수 
		$pageCnt=ceil($postCnt/$pageShowitemCnt);// 총페이지수 실수가 존재할 경우 반올림한다
		$startPost=$json_curPage*$pageShowitemCnt;//시작게시물
		$endPost=$pageShowitemCnt;//종료게시물
		
		//블록
		$block=5;//기본블록수
		$curBlock=ceil($json_curPage/$block);//현재블록
		$blockCnt=ceil($postCnt/$block);//마지막블록
		$startBlock=($curBlock*5)-$block;//시작블록페이지
		$lastBlock=$curBlock*$block;//마지막블록페이지

		if($curBlock==$blockCnt)
			$lastBlock = $pageCnt;
		else{
			$lastBlock= $curBlock*$block;
		}
		
		//시작~종료 사이의 게시물
		log_message("error",$curBlock);
		log_message("error",$startBlock);
		log_message("error",$lastBlock);
		$json_Post= $this->Shop_model->GetPage($startPost,$endPost);
		//$json_output = json_encode($json_Post, JSON_UNESCAPED_UNICODE);
		log_message("error",$json_output); 

		echo json_encode(array(
		'post' => $json_Post
		,'curBlock' => $curBlock
		,'startBlock' => $startBlock
		,'lastBlock' => $lastBlock), JSON_UNESCAPED_UNICODE);

		//화면으로 보내주는값 (게시물,현재블록,시작블록페이지,종료블록페이지)
		//$json_output = json_encode($json_Post,$curBlock,$startBlock,$lastBlock, JSON_UNESCAPED_UNICODE);
		//log_message("error",$json_output); 
		//echo $json_output;
		// $this->load->view('layout/header', $default_data);
		// $this->load->view('page/shop', $data);
		// $this->load->view('layout/footer', $default_data);
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
