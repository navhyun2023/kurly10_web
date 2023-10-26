import React from 'react';
import './scss/sub5.scss';
import axios from 'axios';
import {useNavigate,useLocation} from 'react-router-dom';


export default function Sub5Component({회원가입, confirmModalOpen,isConfirmModal, addressSearchOpen, 주소1, 주소2 }) {

    //네비게이트 사용 등록 선언
    const {navigate} = useNavigate();
    const {location} = useLocation();
    
    const [state, setState] = React.useState(회원가입);

    // 비구조화 == 구조분할할당
    const {
            아이디, 비밀번호1, 비밀번호2, 이름, 이메일, 휴대폰, 인증번호발송, 인증번호입력, 성별, 생년, 생월, 생일,
            is인증번호받기, is인증번호확인, is인증번호입력, is인증번호성공, is주소검색, is추가입력사항, 추가입력사항,
            참여이벤트명, 추천인아이디, 이용약관동의, 전체동의, 체크필수항목카운트, is아이디중복확인, is이메일중복확인,
            is휴대폰번호인증확인,info_birth, info_email, info_hp, info_id, info_name,info_pw1, info_pw2,
    // } = state.회원가입;
    } = state;


    React.useEffect(()=>{
        
        if(주소1!=='' && 주소2!==''){            
            setState({
                ...state,
                is주소검색: true
            });
        }

    },[주소1, 주소2]);

    const onChangeId=(e)=>{       
        // 정규표현식(정규식) RegExp
        // (영문+필수 +1자이상) 혹은 (숫자)*0자이상 을 조합) [영문숫자]{6자 이상 16자 이하}의
        const regExp = /(?=.*[A-Za-z])+(?=.*[0-9])*[A-Za-z0-9]{6,16}/g;
        let info_id = '';
        // 검증(test() => true  또는 false) 통과되면 저장
        // 정규표현식.test(문자열)
        if( regExp.test(e.target.value)===false ){
            info_id = '6자 이상 16자 이하의 영문 혹은 영문과 숫자를 조합';
        }
        else {  // 유효성 검증 false
            info_id = '';
        }

        setState({                       
            ...state,
            아이디: e.target.value,  
            info_id: info_id  // 안내 텍스트         
        })

    }

    const onClickIdOkBtn=(e)=>{
        e.preventDefault();

        const regExp = /(?=.*[A-Za-z])+(?=.*[0-9])*[A-Za-z0-9]{6,16}/g;
        if( regExp.test(아이디)===false ){
            confirmModalOpen('6자 이상 16자 이하의 영문 혹은 영문과 숫자를 조합');
        }
        else {
            // 2. 중복검사 Rest API  AXIOS => 서버에 전송
            const formData = new FormData(); 
            formData.append('id', 아이디);

            axios({
                url:'https://flyinggoose.co.kr/kurly10/select_id_check.php',
                method:'POST',
                data: formData  // axios 폼데이터 형식으로 전송
            })
            .then((res)=>{

                // console.log( res.data );  // 응답 내용은 String Number(문자열 )
                
                    if(Number(res.data)===0){                   
                        confirmModalOpen('사용 할 수 있는 아이디 입니다');
                        setState({
                            ...state,
                            is아이디중복확인: true
                        });
                    }  
                    else{
                        confirmModalOpen('사용 불가능한 아이디 입니다');
                        setState({
                            ...state,
                            is아이디중복확인: false
                        });
                    }
              

            })
            .catch((err)=>{
                console.log( err );
            });

        }

       

    }

   
    const onChangePw1=(e)=>{
        const regExp1 = /(.){10,}/g; 
        const regExp2 = /\s/g;
        const regExp3 = /(\d)\1\1/g;
        const regExp4 = /(([A-Z]+[0-9]+)+)|(([0-9]+[A-Z]+)+)|(([A-Z]+[`~!@#$%^&*()\-_=+\\|[\]{}'";:/?.,<>]+)+)|(([`~!@#$%^&*()\-_=+\\|[\]{}'";:/?.,<>]+[A-Z]+)+)|(([0-9]+[`~!@#$%^&*()\-_=+\\|[\]{}'";:/?.,<>]+)+)|(([`~!@#$%^&*()\-_=+\\|[\]{}'";:/?.,<>]+[0-9]+)+)/gi; // 영문&숫자
        let info_pw = '';

        if(regExp1.test(e.target.value)===false ){ //1. 최소 10자 이상 입력
            info_pw = '최소 10자 이상 입력';
        }        
        else if(regExp2.test(e.target.value)===true ){ //2. 공백제외
            info_pw = '공백제외';
        }
        else if(regExp3.test(e.target.value)===true ){ //3. 동일한 숫자 3개 이상 연속 사용 불가
            info_pw = '동일한 숫자 3개 이상 연속 사용 불가';
        }
        else if(regExp4.test(e.target.value)===false ){
            info_pw = '영문/숫자/특수문자(공백 제외)만 허용하며, 2개 이상 조합 ';
        }
        

        setState({
            ...state,
            비밀번호1: e.target.value,
            info_pw1: info_pw
        })    
    }





    // 3. 비밀번호2
    const onChangePw2=(e)=>{
        let info_pw = '';

        if(e.target.value===''){
            info_pw = '비밀번호를 한번 더 입력해 주세요.'
        }
        else if(e.target.value!==비밀번호1){
            info_pw = '동일한 비밀번호를 입력'
        }

        setState({
            ...state,
            비밀번호2: e.target.value,
            info_pw2: info_pw
        })
    }







    // 4. 이름 
    const onChangeName=(e)=>{
        const regExp = /[`~!@#$%^&*()\-_=+\\|[\]{}'";:/?.,<>]/g;
        let info_name = '';
        let 이름 = e.target.value;
        이름 = e.target.value.replace(regExp, '');

        if(e.target.value===""){
            info_name = "이름을 입력해 주세요.";
        }        
        else {
            info_name = "";
        }

        setState({
            ...state,
            이름: 이름,
            info_name: info_name
        })
    }








    // 5. 이메일
    const onChangeEmail=(e)=>{
        const regExp = /^[A-Za-z0-9`~!#$%^&*\-_=+|{}'/?]+([.]?[A-Za-z0-9`~!#$%^&*\-_=+|{}'/?]+)*@[A-Za-z0-9]+[A-Za-z0-9`~!#$%^&*\-_=+|{}'/?.]*\.[A-Za-z]{2,3}$/g;
        let info_email = '';

        if(regExp.test(e.target.value)===false){
            info_email = '이메일 형식으로 입력해 주세요.';
        }
        else if(e.target.value==='') {
            info_email = '이메일을 입력해 주세요.';
        }
        else {
            info_email = '';
        }
        
        setState({
            ...state,
            이메일: e.target.value,
            info_email: info_email
        })
    }


    // 이메일 중복확인 버튼 클릭 이벤트
    const onClickEmailOkBtn=(e)=>{
        e.preventDefault();
        const regExp = /^[A-Za-z0-9`~!#$%^&*\-_=+|{}'/?]+([.]?[A-Za-z0-9`~!#$%^&*\-_=+|{}'/?]+)*@[A-Za-z0-9]+[A-Za-z0-9`~!#$%^&*\-_=+|{}'/?.]*\.[A-Za-z]{2,3}$/g;
        
        
        
        if( 이메일==="" ){
            confirmModalOpen('이메일 입력해 주세요.');
        }
        else if( regExp.test(이메일)===false ){
            confirmModalOpen('이메일 형식으로 입력해 주세요.');
        }
        else {
            // 2. 중복검사 Rest API  AXIOS => 서버에 전송

            const formData = new FormData();
            formData.append('email', 이메일);

            axios({
                url:'https://flyinggoose.co.kr/kurly10/select_email_check.php',
                method:'POST',
                data: formData
            })
            .then((res)=>{

                if( res.status === 200 ){
                    if(Number(res.data)===0){                   
                        confirmModalOpen('사용 할 수 있는 이메일 입니다');
                        setState({
                            ...state,
                            is이메일중복확인: true
                        });
                    }  
                    else{
                        confirmModalOpen('사용 불가능한 이메일 입니다');
                        setState({
                            ...state,
                            is이메일중복확인: false
                        });
                    }
                }

            })
            .catch((err)=>{
                console.log( err );
            });

        }
    }



    // 6. 휴대폰
    const onChangeHp=(e)=>{
        const regExp = /[^\d]/g;        
        let info_hp = '';
        let 휴대폰 = e.target.value;
        let is인증번호받기 = false;

        휴대폰 = e.target.value.replace(regExp, '');

        if(휴대폰.length>=1){
            is인증번호받기 = true;
        }
        else{
            is인증번호받기 = false;
        }

        if(e.target.value===''){
            info_hp = '휴대폰 번호를 입력해 주세요.';
        }        
        else {
            info_hp = '';
        }

        setState({
            ...state,
            휴대폰: 휴대폰,
            info_hp: info_hp,
            is인증번호받기: is인증번호받기
        })
    }

    const refUserHp1 = React.useRef(); // 휴대폰 입력상자 선택

    // 휴대폰 인증번호 받기 클릭 이벤트 번호 검증 
    const onClickAuthenNum=(e)=>{
        e.preventDefault();

        if(is인증번호성공===true){
            
            setState({
                ...state,
                휴대폰: "",
                is인증번호성공: false   // 초기화  다시 처음상태로
            })
            refUserHp1.current.focus(); // 커서 포커스

        }
        else{     // 2.  인증번호 받기 클릭 이벤트 정규표현식점검
        
            const regExp2 = /^01[\d]{1}[\d]{3,4}[\d]{4}$/g;  // 버튼클릭시 검증
            let is인증번호확인 = false;
            let is인증번호받기 = true;
            let 인증번호발송 = '';


            if( regExp2.test(휴대폰)===false ){
                // 모달창
                confirmModalOpen('잘못된 휴대폰 번호 입니다. 확인 후 다시 시도 해 주세요.');
                is인증번호확인 = false;
                is인증번호받기 = true;
            }
            else {
                
                // 임의의 숫자(난수) 6자리 발급
                인증번호발송 = Math.floor((Math.random() * 900000) + 100000);            
                is인증번호확인 = true;
                is인증번호받기 = false;
                confirmModalOpen(`인증번호가 발송되었습니다. ${인증번호발송}`);
                // 6자리 인증번호 129897
            }

            setState({
                ...state,
                is인증번호확인: is인증번호확인,
                is인증번호받기: is인증번호받기,
                인증번호발송 : 인증번호발송
            })
        }
    }


    // 인증번호입력상자 온체인지 이벤트
    const onChangeHp2=(e)=>{
        let is인증번호입력 = false;
        if( e.target.value.length >= 1 ){
            is인증번호입력 = true;                   
        }
        else {
            is인증번호입력 = false;
        }

        setState({
            ...state,
            is인증번호입력: is인증번호입력,
            인증번호입력 : Number(e.target.value)  // 숫자 문자열 => 숫자변환
        })

    }

    // 인증번호입력 완료 하고 확인버튼 클릭
    const onClickAuthenNumInput=(e)=>{
        e.preventDefault();
        let  is인증번호성공 = false;
        let  is인증번호확인 = false;
        let  is인증번호받기 = false;
        let  is휴대폰번호인증확인 = false;

        if(인증번호입력===인증번호발송){
            is인증번호성공 = true;
            is인증번호확인 = false;
            is인증번호받기 = true;
            is휴대폰번호인증확인 = true;
            confirmModalOpen(`인증에 성공 하였습니다.`);
        }
        else{
            is인증번호성공 = false;
            is인증번호확인 = true;
            is인증번호받기 = true;
            is휴대폰번호인증확인 = false;
            confirmModalOpen(`잘못된 인증코드 입니다.`);
        }
        setState({
            ...state,
            is인증번호성공: is인증번호성공,
            is인증번호확인: is인증번호확인,
            is인증번호받기: is인증번호받기,
            is휴대폰번호인증확인: is휴대폰번호인증확인
        })
    }






    // 주소검색 API 열기
    const onClickAddressSearch=(e)=>{
        e.preventDefault();
        addressSearchOpen();
    }








    // 성별 라디오버튼
    const onChangeGender=(e)=>{
        setState({
            ...state,
            성별: e.target.value
        });
    }








    // 생년
    const onChangeYear=(e)=>{
        setState({
            ...state,
            생년: e.target.value
        })
    }
    // 생월
    const onChangeMonth=(e)=>{
        setState({
            ...state,
            생월: e.target.value
        })
    }
    // 생일
    const onChangeDate=(e)=>{
        setState({
            ...state,
            생일: e.target.value
        })
    }


    React.useEffect(()=>{
        if(생년==='' && 생월==='' && 생일===''){
            setState({
                ...state,
                info_birth: ''
            });
        }
        else {
            if(생년===""){
                setState({
                    ...state,
                    info_birth: '태어난 년도 4자리를 정확하게 입력해주세요.'
                });
            }
            else{
                if( Number(생년) < ((new Date().getFullYear())-100) ){  //  입력값 < 1923
                    setState({
                        ...state,
                        info_birth: '생년월일을 다시 확인해주세요.'
                    }); 
                }
                else if(Number(생년) > (new Date().getFullYear())){
                    setState({
                        ...state,
                        info_birth: '생년월일이 미래로 입력 되었습니다.'
                    }); 
                } 
                else if(Number(생년) >= ((new Date().getFullYear())-14)){
                    setState({
                        ...state,
                        info_birth: '만 14세 미만은 가입이 불가합니다.'
                    }); 
                }
                else { // 생년조건 모두 만족시 초기화 => 생월로 넘어간다.
                    if( 생월==="" ||  Number(생월) < 1  ||  Number(생월) > 12 ){ // 1~12
                        setState({
                            ...state,
                            info_birth: '태어난 월을 정확하게 입력해주세요.'
                        });
                    }
                    else{ // 생년조건 모두 만족시 초기화 =>  생일로 넘어간다.
     
                        if( 생일==="" || Number(생일) < 1  ||  Number(생일) > 31 ){ // 1~31
                            setState({
                                ...state,
                                info_birth: '태어난 일을 정확하게 입력해주세요.'
                            });
                        }
                        else {
                            setState({
                                ...state,
                                info_birth: ''
                            }); 
                        }
                    }
                }
            }
        }
    },[생년, 생월, 생일]);


    
    
    
    // 추가입력사항 라디오 버튼 이벤트
    const onChangeChooga=(e)=>{
       setState({
            ...state,
            is추가입력사항: true,
            추가입력사항: e.target.value
       });
    }

    // 추가입력사항 : 추천인아이디 입력상자
    const onChangeChoogaId=(e)=>{
        setState({
            ...state,
            추천인아이디: e.target.value
       });
    }
    // 추가입력사항 : 참여이벤트명 입력상자
    const onChangeChoogaEvent=(e)=>{
        setState({
            ...state,
            참여이벤트명: e.target.value
       });
    }


    // 추천인 아이디 체크 버튼 클릭 이벤트
    const onClickChoochunId=(e)=>{
        e.preventDefault();
        

        // 2. 중복검사 Rest API  AXIOS => 서버에 전송
        const formData = new FormData();
        formData.append('id', 추천인아이디);

        axios({
            url:'https://flyinggoose.co.kr/kurly10/select_choochun_id_check.php',
            method:'POST',
            data: formData
        })
        .then((res)=>{

            if( res.status === 200 ){
                if(Number(res.data)===1){                   
                    confirmModalOpen('존재하는 아이디 입니다 친구초대 이벤트에 참여 가능해요.');
                }  
                else{
                    confirmModalOpen('존재하지 않는 아이디 입니다.');
                }
            }

        })
        .catch((err)=>{
            console.log( err );
        });


    }



    // 이용약관동의 : 체크 이벤트    
    const onChangeAllCheck=(e)=>{
        if(e.target.checked === true){
            setState({
                ...state,
                이용약관동의: 전체동의
            });
        }
        else {
            setState({
                ...state,
                이용약관동의: []
            });
        }
    }

    // 개별체크 이벤트
    const onChangeCheck=(e)=>{
        let imsi = [];

        if(e.target.checked===true){
            imsi = [...이용약관동의, e.target.value];   // 추가
        }
        else{
            // 현재 체크해제한 항목이 아닌 모든 항목을 리턴 반환 재배열 한다.
            imsi = 이용약관동의.filter((item)=>item!==e.target.value); // 삭제
        }
        setState({
            ...state,
            이용약관동의: imsi
        });
    }

    // 필수 항목 개수 체크 이벤트
    React.useEffect(()=>{

        const arr = 이용약관동의.map((item)=>item.includes('필수') ? 1 : 0);
        //예] arr[0,1,1,0,0,0,1];
        
        let sum = 0;
        arr.map((item)=>{
            sum += item; // 누적연산 0+1+1+0+0+0+1 => 3
        });
        
        setState({
            ...state,
            체크필수항목카운트: sum
        })

    },[이용약관동의]);



    // 폼 전송 이벤트 온 서브밋 이벤트
    const onSubmitSignup=(e)=>{
        e.preventDefault();
        // 유효성 검사
        // 폼 입력상자 모든 빈값 체크
        if( 아이디 ===  ""){
            confirmModalOpen('아이디를 입력하세요');
        }
        else if( is아이디중복확인 ===  false){
            confirmModalOpen('아이디 중복확인을 하세요');
        }        
        else if( 비밀번호1 ===  ""){
            confirmModalOpen('비밀번호를 입력하세요');
        }        
        else if( 비밀번호2 ===  ""){
            confirmModalOpen('비밀번호를 한번더 입력하세요');
        }
        else if( 이름 ===  ""){
            confirmModalOpen('이름을 입력하세요');
        }
        else if( 이메일 ===  ""){
            confirmModalOpen('이메일 입력하세요');
        }
        else if( is이메일중복확인 ===  false){
            confirmModalOpen('이메일 중복확인을 하세요');
        } 
        else if( 휴대폰 ===  ""){
            confirmModalOpen('휴대폰 입력하세요');
        }
        else if( is휴대폰번호인증확인 ===  false){
            confirmModalOpen('휴대폰번흘 인증하세요');
        }
        else if( 주소1 ===  ""){
            confirmModalOpen('주소를 입력하세요');
        }
        else if( 주소2 ===  ""){
            confirmModalOpen('나머지 주소를 입력하세요');
        }
        else if(  체크필수항목카운트 !== 3 ){
            confirmModalOpen('이용약관동의 필수 항목 3개 이상을 선택하세요');
        }
        else {
            //  전송 준비
            // 휴대폰 형식
            //const regExp = /^(\d{3})(\d{3,4})(\d{4})$/g;
            // 휴대폰  010-7942-5305  010-348-6441
            
            //const regExp2 = /^(\d{6})(\d{7})$/g;
            // 주민번호  701021-1661033 주민번호.replace(regExp, '$1-$2')
            
            //const regExp3 = /^(\d{3})(\d{2})(\d{5})$/g;
            // 사업자번호 834-30-01199 사업자번호.replace(regExp, '$1-$2-$3')

            // 휴대폰 형식
            const regExp = /^(\d{3})(\d{3,4})(\d{4})$/g;



            // 서버에 전송될 폼데이터 준비
            const formData = new FormData(); // 폼데이터 객체 생성
            formData.append("id", 아이디);
            formData.append("pw", 비밀번호1);
            formData.append("name", 이름);
            formData.append("email", 이메일);
            formData.append("hp", 휴대폰.replace(regExp, '$1-$2-$3')); 
            formData.append("addr", `${주소1} ${주소2}`);
            formData.append("gender", 성별);
            formData.append("birth", `${생년}-${생월}-${생일}`);
            formData.append("chooga_input", `${추가입력사항} ${참여이벤트명} ${추천인아이디}`);
            formData.append("service", 이용약관동의);

            axios({
                url:'https://flyinggoose.co.kr/kurly10/signup.php', // 서버사이드 스크립트 언어 파일  signup.php
                method:'POST',
                data: formData
            })
            .then((res)=>{
                if(res.status===200){  
                    if(res.data===1){
                        confirmModalOpen('회원가입을 진심으로 감사드립니다.');
                        setTimeout(() => {
                            // window.location.pathname = '/';
                            //라우터 네비게이트 사용
                            navigate('/index');

                        }, 2000);
                    }   
                    else{
                        confirmModalOpen('회원가입 폼데이터를 확인하고 다시시도해주세요');
                    }              
                }
                
            })
            .catch((err)=>{
                console.log( err );
            });



        }




    }



    return (
        <main id='sub5' className='main'>
            <section id="signUp">
                <div className="container">
                    <div className="title">
                           <h2>회원가입</h2> 
                           <h3><em><i>*</i>필수입력사항</em></h3>
                    </div>    
                    <div className="content">
                        <form  onSubmit={onSubmitSignup}>
                            <ul>
                                <li>
                                    <div className='gap'>
                                        <label htmlFor="userId">아이디<i>*</i></label>
                                        {/* 1키입력 입력상자 입력 => 2상태변수에 저장 => 3상태변수값을 => 입력상자 value 바인딩  */}
                                        {/* 입력상자에 이벤트가 발생하면(입력을하면) 체인지 이벤트 onChange
                                        입력상자에 값을 상태변수에 저장한다.
                                        그러면 상태변수에 저장된 내용은 다시 현재 입력상자 value 값으로 넣어준다. */}
                                        <input 
                                            type="text" 
                                            name='user_id' 
                                            id='userId' 
                                            placeholder='아이디를 입력해주세요' 
                                            onChange={onChangeId}   
                                            value={아이디}
                                            maxLength={16}
                                        />
                                        {/* 정규표현식 또는 입력제한조건 틀리면 오류메시지 바인딩  */}
                                        <p className='info'>{info_id}</p>
                                        <button 
                                            className='right'
                                            onClick={onClickIdOkBtn}
                                        >중복확인</button>
                                    </div>
                                </li>
                                <li>
                                    <div className='gap'>
                                        <label htmlFor="userPw1">비밀번호<i>*</i></label>
                                        <input 
                                            type="password" 
                                            name='user_pw1' 
                                            id='userPw1' 
                                            placeholder='비밀번호를 입력해주세요'
                                            onChange={onChangePw1}
                                            value={비밀번호1}
                                            maxLength='16'
                                         />
                                        <p className='info'>{info_pw1}</p>
                                    </div>
                                </li>
                                <li>
                                    <div className='gap'>
                                        <label htmlFor="userPw2">비밀번호확인<i>*</i></label>
                                        <input 
                                            type="password"
                                            name='user_pw2' 
                                            id='userPw2' 
                                            placeholder='비밀번호를 한번더 입력해주세요'
                                            onChange={onChangePw2}
                                            value={비밀번호2}
                                            maxLength='16'
                                         />
                                        <p className='info'>{info_pw2}</p>
                                    </div>
                                </li>
                                <li>
                                    <div className='gap'>
                                        <label htmlFor="userName">이름<i>*</i></label>
                                        <input 
                                            type="text" 
                                            name='user_name' 
                                            id='userName' 
                                            placeholder='이름을 입력해주세요' 
                                            onChange={onChangeName}
                                            value={이름}
                                            maxLength='20'
                                        />
                                        <p className='info'>{info_name}</p>
                                    </div>
                                </li>
                                <li>
                                    <div className='gap'>
                                        <label htmlFor="userEmail">이메일<i>*</i></label>
                                        <input 
                                            type="text" 
                                            name='user_email' 
                                            id='userEmail' 
                                            placeholder='예: marketkurly@kurly.com' 
                                            onChange={onChangeEmail}
                                            value={이메일}
                                            maxLength='100'
                                        />
                                        <p className='info'>{info_email}</p>
                                        <button  
                                            onClick={onClickEmailOkBtn} 
                                            className='right'
                                        >중복확인</button>
                                    </div>
                                </li>
                                <li>
                                    <div className='gap'>
                                        <label htmlFor="userHp1">휴대폰<i>*</i></label>
                                        <input 
                                            type="text" 
                                            name='user_hp1' 
                                            id='userHp1' 
                                            placeholder='숫자만 입력해주세요'
                                            onChange={onChangeHp}
                                            value={휴대폰}
                                            maxLength='11'
                                            ref={refUserHp1}
                                         />
                                        <p className='info'>{info_hp}</p>
                                        <button  onClick={onClickAuthenNum}   className={`right${is인증번호받기?'':' off'}`}>{is인증번호성공?`다른번호 인증`:`인증번호 받기`}</button>
                                    </div>
                                </li> 
                            
                            {                            
                            is인증번호확인 && (<li>
                                    <div className='gap'>                                    
                                        <input 
                                            type="text" 
                                            name='user_Hp2' 
                                            id='userHp2' 
                                            placeholder='숫자만 입력해주세요' 
                                            onChange={onChangeHp2}
                                            value={인증번호입력}
                                        />
                                        <button 
                                            className={`right${is인증번호입력?'':' off'}`}
                                            onClick={onClickAuthenNumInput}
                                        >인증번호 확인</button>
                                    </div>
                                </li>)
                            }


                                <li>
                                    <div className='gap'>
                                        <label htmlFor="userAddr1">주소<i>*</i></label>
                                        {
                                            is주소검색 && (<input type="text" name='user_addr1' id='userAddr1' placeholder='숫자만 입력해주세요' value={주소1} />)
                                        }
                                        <button onClick={onClickAddressSearch} className={`right address${is주소검색?' on':''}`}><img src="./img/sub/sub5/icon_zoom.svg" alt="" />{is주소검색?'재검색':'주소 검색'}</button>
                                        {
                                            !is주소검색 && <><br/><br/><em>배송지에 따라 상품 정보가 달라질 수 있습니다.</em></>
                                        }
                                        
                                    </div>
                                </li> 
                                {
                                    is주소검색 &&  <>
                                        <li>
                                            <div className='gap'>
                                                
                                                <input type="text" name='user_addr2' id='userAddr2' placeholder='나머지 주소를 입력하세요' value={주소2} />
                                                
                                            </div>
                                        </li> 
                                        <li>
                                            <div className='gap'>
                                                <div className='address-tip-box'>
                                                    <strong>샛별배송</strong>
                                                    <em>배송지에 따라 상품 정보가 달라질 수 있습니다.</em>                                        
                                                </div>                                     
                                            </div>
                                        </li> 
                                    </>
                                }

                                <li>
                                    <div className='gap'>
                                        <label htmlFor='male'>성별</label>
                                        <div className="gender-box">
                                            <label htmlFor="male">
                                                <input 
                                                    type="radio" 
                                                    name='gender' 
                                                    id='male' 
                                                    value='남자' 
                                                    onChange={onChangeGender} 
                                                    
                                                    checked={state.성별.includes('남자')}
                                                />남자
                                            </label>
                                            <label htmlFor="female">
                                                <input 
                                                    type="radio" 
                                                    name='gender' 
                                                    id='female' 
                                                    value='여자' 
                                                    onChange={onChangeGender} 
                                                    
                                                    checked={state.성별.includes('여자')}
                                                />여자
                                            </label>
                                            <label htmlFor="none">
                                                <input 
                                                    type="radio" 
                                                    name='gender' 
                                                    id='none' 
                                                    value='선택안함'
                                                    onChange={onChangeGender} 
                                                    
                                                    checked={state.성별.includes('선택안함')}
                                                />선택안함
                                            </label>                                
                                        </div>                                  
                                    </div>
                                </li> 
                            

                                <li>
                                    <div className='gap'>
                                        <label htmlFor="">생년월일</label>
                                        <div className="birth-box">
                                            <input 
                                                type="text" 
                                                name='year' 
                                                id='year'  
                                                placeholder='YYYY'
                                                maxLength={4}
                                                onChange={onChangeYear}
                                                value={생년}
                                            />
                                            <i>/</i>
                                            <input 
                                                type="text" 
                                                name='month' 
                                                id='month'  
                                                placeholder='MM' 
                                                maxLength={2}
                                                onChange={onChangeMonth}
                                                value={생월}
                                            />
                                            <i>/</i>
                                            <input 
                                                type="text" 
                                                name='date' 
                                                id='date'  
                                                placeholder='DD' 
                                                maxLength={2}
                                                onChange={onChangeDate}
                                                value={생일}
                                            />
                                        </div>
                                        <p className='info'>{info_birth}</p>
                                    </div>
                                </li> 



                                <li>
                                    <div className='gap'>
                                        <label htmlFor="">추가입력 사항</label>
                                        <div className="gender-box">
                                            <label htmlFor="chooga1">
                                                <input 
                                                    type="radio"
                                                    name='chooga' 
                                                    id='chooga1' 
                                                    value='친구초대 추천인 아이디' 
                                                    onChange={onChangeChooga}
                                                    checked={state.추가입력사항.includes('친구초대 추천인 아이디')}
                                                />친구초대 추천인 아이디
                                            </label>
                                            <label htmlFor="chooga2">
                                                <input 
                                                    type="radio" 
                                                    name='chooga' 
                                                    id='chooga2' 
                                                    value='참여 이벤트명'
                                                    onChange={onChangeChooga} 
                                                    checked={state.추가입력사항.includes('참여 이벤트명')}
                                                />참여 이벤트명
                                            </label>                                        
                                        </div>                                 
                                    </div>
                                </li> 
                            {
                                    is추가입력사항 && (<>
                                        <li>
                                            <div className='gap'>
                                                { 
                                                추가입력사항==='친구초대 추천인 아이디' && <>
                                                    <input 
                                                        type="text" 
                                                        name='chooChun_id' 
                                                        id='chooChunId' 
                                                        placeholder='추천인 아이디를 입력해 주세요'
                                                        onChange={onChangeChoogaId}
                                                        value={state.추천인아이디}
                                                    />
                                                    <button  
                                                        className='right'
                                                        onClick={onClickChoochunId}
                                                    >아이디 확인</button>  
                                                </>
                                                }

                                                {
                                                추가입력사항==='참여 이벤트명' &&  <input 
                                                                                    type="text" 
                                                                                    name='chamEvent_id' 
                                                                                    id='chamEventId' 
                                                                                    placeholder='참여 이벤트명을 입력해 주세요'
                                                                                    onChange={onChangeChoogaEvent} 
                                                                                    value={state.참여이벤트명}
                                                                                />
                                                }
                                            </div>
                                        </li>                            
                                        <li>
                                            <div className='gap'>
                                                {
                                                추가입력사항==='친구초대 추천인 아이디' && <em>가입 후 7일 내 첫 주문 배송완료 시, 친구초대 이벤트 적립금이 지급됩니다.</em>                                   
                                                }
                                                {
                                                추가입력사항==='참여 이벤트명' && <em>
                                                    추천인 아이디와 참여 이벤트명 중 하나만 선택 가능합니다.<br/>
                                                    가입 이후는 수정이 불가능 합니다.<br/>
                                                    대소문자 및 띄어쓰기에 유의해주세요.
                                                </em>                                   
                                                }
                                            </div>
                                        </li> 
                                    </>)
                                }
                                <li>
                                    <hr />
                                </li>

                                <li>
                                    <div className='gap service-gap'>
                                        <label htmlFor="" className='service-label'>이용약관동의<i>*</i></label> 
                                        <div className="service">
                                            <label className='check1' htmlFor="check1">
                                                <input 
                                                    type="checkbox" 
                                                    name='service' 
                                                    id='check1' 
                                                    value='전체 동의 합니다.' 
                                                    onChange={onChangeAllCheck}
                                                    checked={이용약관동의.length===7}
                                                />전체 동의 합니다.
                                            </label>
                                            <em>선택항목에 동의하지 않은 경우도 회원가입 및 일반적인 서비스를 이용할 수 있습니다.</em>                                        
                                        </div>                                    
                                    </div>
                                </li> 
                                <li>
                                    <div className='gap service-gap'>
                                        <div className="service">
                                            <label htmlFor="check2">
                                                <input 
                                                    type="checkbox" 
                                                    name='service' 
                                                    id='check2' 
                                                    value='이용약관 동의(필수)'
                                                    checked={이용약관동의.includes('이용약관 동의(필수)')} 
                                                    onChange={onChangeCheck}
                                                />이용약관 동의
                                            </label> <span>(필수)</span>
                                        </div>
                                    </div>
                                </li> 
                                <li>
                                    <div className='gap service-gap'>
                                        <div className="service">
                                            <label htmlFor="check3">
                                                <input 
                                                    type="checkbox" 
                                                    name='service' 
                                                    id='check3' 
                                                    value='개인정보 수집∙이용 동의(필수)' 
                                                    checked={이용약관동의.includes('개인정보 수집∙이용 동의(필수)')} 
                                                    onChange={onChangeCheck}
                                                />개인정보 수집∙이용 동의
                                            </label> <span>(필수)</span>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className='gap service-gap'>
                                        <div className="service">
                                            <label htmlFor="check4">
                                                <input 
                                                    type="checkbox" 
                                                    name='service' 
                                                    id='check4' 
                                                    value='개인정보 수집∙이용 동의(선택)' 
                                                    checked={이용약관동의.includes('개인정보 수집∙이용 동의(선택)')} 
                                                    onChange={onChangeCheck}
                                                />개인정보 수집∙이용 동의</label> <span>(선택)</span>
                                        </div>
                                    </div>
                                </li> 
                                <li>
                                    <div className='gap service-gap'>
                                        <div className="service">
                                            <label htmlFor="check5">
                                                <input 
                                                    type="checkbox" 
                                                    name='service' 
                                                    id='check5' 
                                                    value='무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)' 
                                                    checked={이용약관동의.includes('무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)')} 
                                                    onChange={onChangeCheck}
                                                />무료배송, 할인쿠폰 등 혜택/정보 수신 동의
                                            </label><span>(선택)</span>
                                        </div>
                                    </div>
                                </li> 

                                <li>
                                    <div className='gap service-gap'>
                                        <div className="service sns">
                                            <label htmlFor="check6">
                                                <input 
                                                    type="checkbox" 
                                                    name='service' 
                                                    id='check6' 
                                                    value='SNS' 
                                                    checked={이용약관동의.includes('SNS')} 
                                                    onChange={onChangeCheck}
                                                />SNS
                                            </label>
                                            <label htmlFor="check7">
                                                <input 
                                                    type="checkbox" 
                                                    name='service' 
                                                    id='check7' 
                                                    value='이메일' 
                                                    checked={이용약관동의.includes('이메일')} 
                                                    onChange={onChangeCheck}
                                                />이메일
                                            </label>
                                        </div>
                                    </div>
                                </li> 
                                <li className='ico_sub_dot'>
                                    <div className='gap service-gap'>    
                                        <div className="service">                                
                                            <em className='ico_sub_dot'><img src="./img/sub/sub5/ico_sub_dot.svg" alt="" />동의 시 한 달간 [5%적립] + [2만원 이상 무료배송] 첫 주문 후 안내</em>
                                        </div>
                                    </div>
                                </li> 
                                <li>
                                    <div className='gap service-gap'>
                                        <div className="service">
                                            <label htmlFor="check8">
                                                <input 
                                                    type="checkbox" 
                                                    name='service' 
                                                    id='check8' 
                                                    value='본인은 만 14세 이상입니다.(필수)' 
                                                    checked={이용약관동의.includes('본인은 만 14세 이상입니다.(필수)')} 
                                                    onChange={onChangeCheck}
                                                />본인은 만 14세 이상입니다.
                                            </label> <span>(필수)</span>
                                        </div>
                                    </div>
                                </li> 
                            </ul>
                            
                            <div className="button-box">
                                <button type='submit'>가입하기</button>                                
                            </div>

                        </form>
                    </div>    
                </div>    
            </section>              
        </main>
    );
};


Sub5Component.defaultProps = {
    회원가입: {
        아이디: '',
        비밀번호1: '',
        비밀번호2: '',
        이름: '',
        이메일:'',
        휴대폰:'',
        인증번호발송:'',
        인증번호입력:'',        
        성별:'선택안함',
        생년:'',
        생월:'',
        생일:'',

        // 조건부 연산
        is인증번호받기: false,
        is인증번호확인: false,
        is인증번호입력: false,
        is인증번호성공: false,
        is주소검색: false,
        is추가입력사항: false,

        is아이디중복확인: false,
        is이메일중복확인: false,
        is휴대폰번호인증확인: false,

        추가입력사항: '',
        참여이벤트명:'',
        추천인아이디:'',

        전체동의: [
            '이용약관 동의(필수)',
            '개인정보 수집∙이용 동의(필수)',
            '개인정보 수집∙이용 동의(선택)',
            '무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)',
            'SNS',
            '이메일',
            '본인은 만 14세 이상입니다.(필수)'
        ],
        이용약관동의:[],
        체크필수항목카운트: 0,
        // 가이드 텍스트
        info_birth: '',
        info_email: '',
        info_hp: '',
        info_id: '',
        info_name: '',
        info_pw1: '',
        info_pw2: '',
    }
}

