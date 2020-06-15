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
		$this->load->view('page/index');
		$this->load->view('layout/footer');
	}

	/**
	 * 상품목록 화면
	 */
	public function shop() {
		$default_data=array('title'=> "pharmaShop");

		$this->load->view('layout/header', $default_data);
		$this->load->view('page/shop');
		$this->load->view('layout/footer');
	}

	/**
	 * 상품상세 화면
	 */
	public function shopSingle() {
		$default_data=array('title'=> "pharmaShop");
		$this->load->model('Shop_Single_model');
		$item_detail= $this->Shop_Single_model->GetSingleItem($this->uri->segment(3));

		$data = array(
			'item_detail' => $item_detail
		);

		$this->load->view('layout/header', $default_data);
		$this->load->view('page/shopSingle',$data);
		$this->load->view('layout/footer');
	}

	/**
	 * 체크아웃 화면
	 */
	public function checkout() {
		$default_data=array('title'=> "pharmaShop");
		if($this->uri->segment(3)!=null){
			$coupon_cd=array('couponCd'=> $this->uri->segment(3));
		}
		log_message("error",$this->uri->segment(3));

		$this->load->view('layout/header', $default_data);
		$this->load->view('page/checkout', $coupon_cd);
		$this->load->view('layout/footer');
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
	 * 카트 화면 호출
	 */
	public function cart() {
		$default_data=array('title'=> "Wally's Portfolio");
			
		log_message("error",$this->uri->segment(3));

		$this->load->view('layout/header', $default_data);
		$this->load->view('page/cart', $data);
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
	 * 상품목록 리스트 데이터
	 */
	public function shopList() {
		$default_data=array('title'=> "Wally's Portfolio");
		
		$this->load->model('Shop_model');
		
		$data = $this->input->post('data', true);
		$json_curPage = json_decode( $data,true)['pageNum'];
		//$json_curPage = 6;

		//게시물
		$postCnt=$this->Shop_model->GetPageCnt();//총게시물수
		$pageShowitemCnt=12;//한화면당 노출 상품수 
		$pageCnt=ceil($postCnt/$pageShowitemCnt);// 총페이지수 실수가 존재할 경우 반올림한다
		$startPost=($json_curPage*$pageShowitemCnt)-$pageShowitemCnt;//시작게시물
		$endPost=$pageShowitemCnt;//종료게시물

		//블록
		$block=5;//기본블록수
		$curBlock=ceil($json_curPage/$block);//현재블록
		$blockCnt=ceil($postCnt/$pageShowitemCnt);//마지막블록 
		$startBlock=($curBlock*5)-$block;//시작블록페이지
		$lastBlock=$curBlock*$block;//마지막블록페이지

		//마지막 블록 유무
		$lastYN=false;

		//마지막 블록일시 블록값 설정
		if($blockCnt<=$lastBlock){
			$lastBlock = $blockCnt;
			$lastYN=true;
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
		,'lastYN' => $lastYN
		,'startBlock' => $startBlock
		,'lastBlock' => $lastBlock), JSON_UNESCAPED_UNICODE);

	}
	
	/**
	 * 쿠폰 확인
	 */
	public function coupon() {
		$this->load->model('Coupon_model');
		
		$data = $this->input->post('data', true);
		$json_data = json_decode( $data,true);

		$json_result= $this->Coupon_model->GetCouponCnt($json_data);

		echo json_encode($json_result, JSON_UNESCAPED_UNICODE);

		log_message("error",$json_curPage);
		//log_message("error",$this->uri->segment(3));
	}

	/**
	 * 주문 입력
	 */
	public function insertOrderList() {
		//쿠폰처리
		//주문입력
		//주문상세입력
		$this->load->model('Coupon_model');
		
		$data = $this->input->post('data', true);
		$json_data = json_decode( $data,true);

		$json_result= $this->Coupon_model->GetCouponCnt($json_data);

		echo json_encode($json_result, JSON_UNESCAPED_UNICODE);

		log_message("error",$json_curPage);
		//log_message("error",$this->uri->segment(3));
	}

}
