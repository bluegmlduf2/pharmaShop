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
		
		$data;

		if($this->uri->segment(3)!=null){
			$data = array(
				'kindCd' =>$this->uri->segment(3)
			);
		}

		log_message("error",$this->uri->segment(3));

		$this->load->view('layout/header', $default_data);
		$this->load->view('page/shop',$data);
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
	 * 주문리스트화면 
	 */
	public function orderList() {
		$default_data=array('title'=> "Wally's Portfolio");
		$this->load->model('Order_model');

		$json_result= $this->Order_model->GetOrderList($this->uri->segment(3));
		$orderList=array('orderList'=> json_encode($json_result, JSON_UNESCAPED_UNICODE));

		$this->load->view('layout/header', $default_data);
		$this->load->view('page/orderList', $orderList);
		$this->load->view('layout/footer', $default_data);
	}


		/**
	 * 상품관리화면
	 */
	public function managementItem() {
		$default_data=array('title'=> "Wally's Portfolio");
		//$data=array('memName'=>$this->uri->segment(3));
		$data=array('memName'=>rawurldecode($this->uri->segment(3))); //rawurldecode() url이깨질때,디코딩필요

		$this->load->view('layout/header', $default_data);
		$this->load->view('page/managementItem',$data);
		$this->load->view('layout/footer', $default_data);
	}
	

	
		/**
	 * 배송관리화면
	 */
	public function managementShip() {
		$default_data=array('title'=> "Wally's Portfolio");
		//$data=array('memName'=>$this->uri->segment(3));
		$data=array('memName'=>rawurldecode($this->uri->segment(3))); //rawurldecode() url이깨질때,디코딩필요

		$this->load->view('layout/header', $default_data);
		$this->load->view('page/managementShip',$data);
		$this->load->view('layout/footer', $default_data);
	}

	
		/**
	 * 쿠폰관리화면
	 */
	public function managementCoupon() {
		$default_data=array('title'=> "Wally's Portfolio");
		//$data=array('memName'=>$this->uri->segment(3));
		$data=array('memName'=>rawurldecode($this->uri->segment(3))); //rawurldecode() url이깨질때,디코딩필요
		
		$this->load->view('layout/header', $default_data);
		$this->load->view('page/managementCoupon',$data);
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
		$json_kindCd = json_decode( $data,true)['kindCd'];
		//$json_curPage = 6;

		//게시물
		$postCnt=$this->Shop_model->GetPageCnt($json_kindCd);//총게시물수
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

		//>버튼의 표시여부
		$cnt=$lastBlock*$pageShowitemCnt;
		$nextBtn=false;
		
		if($cnt<$postCnt){
			$nextBtn=true;
		}
		// log_message("error",$postCnt);
		// log_message("error",$cnt);
		// log_message("error",$nextBtn);

		//시작~종료 사이의 게시물
		// log_message("error",$curBlock);
		// log_message("error",$startBlock);
		// log_message("error",$lastBlock);
		$json_Post= $this->Shop_model->GetPage($startPost,$endPost,$json_kindCd);

		echo json_encode(array(
		'post' => $json_Post
		,'lastYN' => $lastYN
		,'startBlock' => $startBlock
		,'lastBlock' => $lastBlock
		,'nextBtn'=>$nextBtn), JSON_UNESCAPED_UNICODE);

	}
	

		/**
	 * 배송목록 리스트 데이터
	 */
	public function shipList() {
		$default_data=array('title'=> "Wally's Portfolio");
		
		$this->load->model('Ship_model');
		
		$data = $this->input->post('data', true);
		$json_curPage = json_decode( $data,true)['pageNum'];
		$json_kindCd = json_decode( $data,true)['kindCd'];
		//$json_curPage = 6;

		//게시물
		$postCnt=$this->Ship_model->GetPageCnt($json_kindCd);//총게시물수
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

		//>버튼의 표시여부
		$cnt=$lastBlock*$pageShowitemCnt;
		$nextBtn=false;
		
		if($cnt<$postCnt){
			$nextBtn=true;
		}

		$json_Post= $this->Ship_model->GetPage($startPost,$endPost,$json_kindCd);


		/**배송상태 초기화 */
		//$this->Member_model->mngInfoInsert($json_data);//관리자암호화입력
		$shipState=$this->Ship_model->initState();//배송상태 리스트

		echo json_encode(array(
		'post' => $json_Post
		,'lastYN' => $lastYN
		,'startBlock' => $startBlock
		,'lastBlock' => $lastBlock
		,'shipState' =>$shipState
		,'nextBtn'=>$nextBtn), JSON_UNESCAPED_UNICODE);

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
	}

	/**
	 * 주문 입력
	 */
	public function insertOrderList() {
		$this->db = $this->load->database('default', true);
		$this->load->model('Coupon_model');
		$this->load->model('Order_model');
		$this->load->model('Ship_model');
		
		$data = $this->input->post('data', true);
		$json_data = json_decode( $data,true);

		try{
			if(!empty($json_data['c_code'])){
				$coupon_yn=$this->Coupon_model->GetCouponCnt($json_data['c_code']);
				if($coupon_yn[0]->CNT!=1){
					echo json_encode(array('result'=>'_error','message'=>'Please Check the coupon'));
					return;
				}else{
					//쿠폰사용처리
					$this->Coupon_model->updateCoupon($json_data['c_code'],$coupon_yn[0]->COUPON_CD);
				}
			}else{
				$json_data['c_code']="NULL";
				//여기서 $this를 붙여서 에러가 났는데.. $this는 현재객체(클래스->Main클래스)를 가르킨다.
				//만약 $this->$json_data['c_code']라고 하면 Main클래스의 $json_data멤버변수(프라퍼티)를 찾는다
			}
			//log_message("error",print_r($json_data['item_list']));

			$this->db->trans_start();
			$order_cd=$this->Order_model->insertOrderList($json_data,$coupon_yn[0]->COUPON_CD);
			$this->Order_model->insertOrderDetailList($json_data['item_list'],$order_cd);
			$this->Ship_model->insertShipping($order_cd);
			
			//쿠폰사용처리추가
			if($this->db->trans_status() === FALSE){
				$this->db->trans_rollback();
			}else{
				$this->db->trans_complete();
			}

			$this->db->close();
			echo json_encode(array('order_cd'=>$order_cd));
		}catch(Exception $e){
			$this->db->close();
			log_message("error",$e);
			//echo json_encode(array('result'=>'_error','message'=>$e+' Please Contact Administator'));
		}
	}

		/**
	 * 주문 번호 체크
	 */
	public function CheckOrderList() {
		$this->load->model('Order_model');
		$data = $this->input->post('data', true);
		$json_data = json_decode( $data,true);

		try{	
			$order_cnt=$this->Order_model->GetOrderCnt($json_data['order_cd']);

			if($order_cnt[0]->CNT!=1){
				echo json_encode(array('order_cd'=>'_error','message'=>'Please Check the OrderNumber'));
			}else{
				echo json_encode(array('order_cd'=>$order_cnt));
			}
		}catch(Exception $e){
			$this->db->close();
			log_message("error",$e);
			//echo json_encode(array('result'=>'_error','message'=>$e+' Please Contact Administator'));
		}
	}


		/**
	 * 주문 업데이트
	 */
	public function updateOrderList() {
		$this->db = $this->load->database('default', true);
		$this->load->model('Order_model');
		
		try{
			$data = $this->input->post('data', true);
			$json_data = json_decode( $data,true);
			$this->Order_model->updateOrderList($json_data);
		}catch(Exception $e) {
			log_message('error', $e->getMessage());
			$this->output->set_status_header('500');
		}
	}

			/**
	 * 주문 취소
	 */
	public function deleteOrderList() {
		$this->db = $this->load->database('default', true);
		$this->load->model('Order_model');
		$this->load->model('Coupon_model');
		$this->load->model('Ship_model');

		try{
			$data = $this->input->post('data', true);
			$json_data = json_decode( $data,true);
			
			$this->db->trans_start();
			if(!empty($json_data['COUPON_CD'])){
				$this->Coupon_model->updateCancelCoupon($json_data['COUPON_CD']);//쿠폰 수정
			}
			
			$this->Order_model->deleteOrderDetailList($json_data['ORDER_CD']);//주문상세 삭제
			$this->Order_model->deleteOrderList($json_data['ORDER_CD']);//주문 삭제
			$this->Ship_model->deleteShipping($json_data['ORDER_CD']);//배송 삭제

			if($this->db->trans_status() === FALSE){
				$this->db->trans_rollback();
			}else{
				$this->db->trans_complete();
			}
		}catch(Exception $e) {
			log_message('error', $e->getMessage());
			$this->output->set_status_header('500');
		}
	}

		/**
	 * 관리자 비밀번호 체크
	 */
	public function mngInfoCheck() {
		$this->load->model('Member_model');

		$data = $this->input->post('data', true);
		$json_data = json_decode( $data,true);
		
		//$this->Member_model->mngInfoInsert($json_data);//관리자암호화입력
		$memObj=$this->Member_model->mngInfoCheck($json_data);//관리자암호화확인
		echo json_encode(array('memObj'=>$memObj));
	}

			/**
	 * 관리 아이템 리스트가져오기
	 */
	public function getItemList() {
		$this->load->model('Shop_model');

		$data = $this->input->post('data', true);
		$json_data = json_decode( $data,true);
		
		log_message('error', $json_data);
		log_message('error', $json_data['itemCd']);

		$itemObj=$this->Shop_model->GetItemList($json_data['itemCd']);//관리 아이템 상세가져오기
		echo json_encode(array('itemObj'=>$itemObj));
	}
	
			/**
	 * 아이템 종류 초기화
	 */
	public function initKind() {
		$this->load->model('Code_model');
		
		//$this->Member_model->mngInfoInsert($json_data);//관리자암호화입력
		$kindObj=$this->Code_model->initKind();//관리자암호화확인
		echo json_encode(array('kindObj'=>$kindObj));
	}

	/**
	 * Image Save
	 */
	function saveImage() {
       //upload file
	   $config['upload_path'] = 'static/libraries/images/';
	   $config['allowed_types'] = 'gif|jpg|png';
	   $config['max_filename'] = '255';
	   $config['encrypt_name'] = false;//true로 할 경우 파일명이 난수가 됨
	   $config['max_size'] = '1024'; //1 MB 
	   $config['file_name'] =$_FILES['image']['name'];
	   
	   $inpPath='/pharmaShop'.'/'.$config['upload_path'].$_FILES['image']['name'];


	   if (isset($_FILES['image']['name'])) {
		   if (0 < $_FILES['image']['error']) {
				$msg='Error during file upload' . $_FILES['image']['error'];
				echo json_encode(array('itemPath'=>$inpPath,'msg'=>$msg));
		   } else {
			   if (file_exists($config['upload_path'] . $_FILES['image']['name'])) {
				   $msg='File already exists :'.$inpPath;
				   echo json_encode(array('itemPath'=>$inpPath,'msg'=>$msg));
			   } else {
				   $this->load->library('upload', $config);
				   if (!$this->upload->do_upload('image')) {
					   echo $this->upload->display_errors();
				   } else {
					   //success
					   echo json_encode(array('itemPath'=>$inpPath));
				   }
			   }
		   }
	   } else {
			$msg='Please choose a file';
			echo json_encode(array('itemPath'=>$inpPath,'msg'=>$msg));
	   }
	}

		/**
	 * 아이템 저장
	 */
	public function saveItemList() {
		$this->load->model('Item_model');
		try{
			$data = $this->input->post('data', true);
			$json_data = json_decode( $data,true);

			$this->db->trans_start();
			
			//아이템 상세정보 삭제
			if(!empty($json_data['itemCd'])){
				$this->Item_model->deleteItemDetailList($json_data);
			}

			//아이템  리스트삭제
			$lastInsertId=$this->Item_model->saveItemList($json_data);
			
			//update & Insert에 따라 PK를 넣어주는지 여부
			if(!empty($lastInsertId)){
				$json_data['itemCd']=$lastInsertId;
			}

			//아이템 상세 리스트 삭제
			$this->Item_model->saveItemDetailList($json_data);
			
			if($this->db->trans_status() === FALSE){
				$this->db->trans_rollback();
			}else{
				$this->db->trans_complete();
			}

		}catch(Exception $e){
			log_message("error",$e);
			$this->output->set_status_header('500');
			//echo json_encode(array('result'=>'_error','message'=>$e+' Please Contact Administator'));
		}finally{
			$this->db->close();
		}
	}


			/**
	 * 아이템 삭제
	 */
	public function deleteItemList() {
		$this->load->model('Item_model');
		$this->load->model('Order_model');

		try{

			$data = $this->input->post('data', true);
			$json_data = json_decode( $data,true);

			$this->db->trans_start();
			
			$order_cnt=$this->Order_model->GetDetailOrderCnt($json_data);

			if($order_cnt[0]->CNT==0){
				$this->Item_model->deleteItemDetailList($json_data);
				$this->Item_model->deleteItemList($json_data);
			}else{
				throw new Exception( 'it is ordered item! please Chek orderDetailList' ); //msg설정을 오버라이딩한 예외처리
			}

			if($this->db->trans_status() === FALSE){
				$this->db->trans_rollback();
			}else{
				$this->db->trans_complete();
			}
			
			$this->db->close();
			$this->output->set_status_header('200');
		}catch(Exception $e){
			$this->db->close();
			log_message("error",$e);
			$this->output->set_status_header('500');
			echo $e->getMessage();
		}
	}

  public function errorMessage() {
    //error message
    $errorMsg = 'Error on line '.$this->getLine().' in '.$this->getFile()
    .': <b>'.$this->getMessage().'</b> is not a valid E-Mail address';
    return $errorMsg;
  }

			/**
	 * 아이템 상세 리스트 가져오기
	 */
	public function getMedicineList() {
		$this->load->model('Medicine_model');
		
		$data = $this->input->post('data', true);

		$returnData=$this->Medicine_model->getMedicineList($data);
		echo json_encode(array('medicineList'=>$returnData));
	}
	
			/**
	 * 배송상태 저장
	 */
	public function saveShipping() {
		$this->load->model('Ship_model');
		try{
			$data = $this->input->post('data', true);
			$json_data = json_decode( $data,true);

			$this->db->trans_start();
			
			//배송 정보 변경
			$this->Ship_model->saveShipping($json_data);
			
			if($this->db->trans_status() === FALSE){
				$this->db->trans_rollback();
			}else{
				$this->db->trans_complete();
			}

		}catch(Exception $e){
			log_message("error",$e);
			$this->output->set_status_header('500');
			//echo json_encode(array('result'=>'_error','message'=>$e+' Please Contact Administator'));
		}finally{
			$this->db->close();
		}
	}


			/**
	 * 쿠폰목록 리스트 데이터
	 */
	public function couponList() {
		$default_data=array('title'=> "Wally's Portfolio");
		
		$this->load->model('Coupon_model');
		
		$data = $this->input->post('data', true);
		$json_curPage = json_decode( $data,true)['pageNum'];
		//$json_curPage = 6;

		//게시물
		$postCnt=$this->Coupon_model->GetCouponListCnt();//총게시물수
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

		//>버튼의 표시여부
		$cnt=$lastBlock*$pageShowitemCnt;
		$nextBtn=false;
		
		if($cnt<$postCnt){
			$nextBtn=true;
		}

		$json_Post= $this->Coupon_model->GetPage($startPost,$endPost);

		echo json_encode(array(
		'post' => $json_Post
		,'lastYN' => $lastYN
		,'startBlock' => $startBlock
		,'lastBlock' => $lastBlock
		,'nextBtn'=>$nextBtn), JSON_UNESCAPED_UNICODE);

	}


		/**
	 * 쿠폰리스트 저장
	 */
	public function saveCouponList() {
		$this->load->model('Coupon_model');
		try{
			$data = $this->input->post('data', true);
			$json_data = json_decode( $data,true);

			$this->db->trans_start();

			//아이템  리스트삭제
			$this->Coupon_model->saveCouponList($json_data);
			
			if($this->db->trans_status() === FALSE){
				$this->db->trans_rollback();
			}else{
				$this->db->trans_complete();
			}

		}catch(Exception $e){
			log_message("error",$e);
			$this->output->set_status_header('500');
			//echo json_encode(array('result'=>'_error','message'=>$e+' Please Contact Administator'));
		}finally{
			$this->db->close();
		}
	}


			/**
	 * 쿠폰리스트 삭제
	 */
	public function deleteCouponList() {
		$this->load->model('Coupon_model');

		try{

			$data = $this->input->post('data', true);
			$json_data = json_decode( $data,true);

			$this->db->trans_start();
			
			$order_cnt=$this->Coupon_model->GetOrderCouponCnt($json_data);

			if($order_cnt[0]->CNT==0){
				$this->Coupon_model->deleteCouponList($json_data);
			}else{
				throw new Exception( 'it is Coupon Used by Order Item! please Chek order' ); //msg설정을 오버라이딩한 예외처리
			}

			if($this->db->trans_status() === FALSE){
				$this->db->trans_rollback();
			}else{
				$this->db->trans_complete();
			}
			
			$this->db->close();
			$this->output->set_status_header('200');
		}catch(Exception $e){
			$this->db->close();
			log_message("error",$e);
			$this->output->set_status_header('500');
			echo $e->getMessage();
		}
	}
}
