	/**
	 * 실수형(소수점1자리이하)와 정수형 구분해서 반환
	 */
	function ChkDataType (args){
		var result= null;
		//alert(typeof(args));
		if (Number.isInteger(args)){
			result=args;
		}else{
			result = args.toFixed(1)//실수형일때 소수점 1자리까지 표기
		}
		return Number(result);
	}