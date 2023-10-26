import React from 'react';
import Postcode  from 'react-daum-postcode';
import './scss/AddressSearch.scss';


export default function  AddressSearchComponent ({addressSearchClose, addressSave}) {

    const [state, setState] = React.useState({
        isMoreView: false,
        주소1: '',
        주소2: ''
    });

    const onClickMoreView = (e) => {
        e.preventDefault();
        setState({
            ...state,
            isMoreView: !state.isMoreView
        })
    }
    const onClickAddressSearchClose=(e)=>{
        e.preventDefault();
        addressSearchClose();
    }

    // 포스트코드 : 우편번호, 주소 검색
    const onCompletePostCode=(data)=>{
        setState({
            ...state,
            주소1: `(${data.zonecode}) ${data.address}`,
        });

    }

    // 나머지 주소2
    const onChangeAddress2=(e)=>{
        setState({
            ...state,
            주소2: e.target.value
        })
    }

    // 주소저장 
    const onClickSave=(e)=>{
        e.preventDefault();
        addressSave(state.주소1, state.주소2);
        // 로컬스토레이지 저장소에 주소 저장하기
        const obj = {
            주소1: state.주소1,
            주소2: state.주소2
        }
        sessionStorage.setItem('POSTCODE_ADDRESS', JSON.stringify(obj));
        addressSearchClose();
    }


    const postCodeStyle = {
        zIndex: '3',
        width: '100%',
        height: 'calc(100% - 30px)',
        background: '#fff',
        position: 'absolute',
        top: '30px',
        left: 0
    }

    return (

        <div id='addressSearch'>
            <div className="wrap">                
                <div className="container">
                    <button onClick={onClickAddressSearchClose} className='modal-close'>×</button>
                    <div className="title">
                        <h1><strong>샛별배송</strong>  <span>지역입니다.</span></h1>
                        <h2>매일 새벽, 문 앞까지 신선함을 전해드려요.</h2>
                    </div>
                    <div className="content">
                        <ul>
                            <li>
                                <div className="input-box1">
                                    <input 
                                        type="text" 
                                        name='add1' 
                                        id='addr1' 
                                        placeholder='카카오 API 검색 주소 바인딩' 
                                        value={state.주소1}
                                        disabled={false}
                                    />
                                    <button className='search-btn'><img src="./img/sub/sub5/icon_zoom.svg" alt="" />재검색</button>
                                </div>
                            </li>
                            <li>
                                <div className="input-box2">
                                    <input 
                                        type="text" 
                                        name='add2' 
                                        id='addr2' 
                                        placeholder='나머지 주소 입력' 
                                        onChange={onChangeAddress2}
                                        value={state.주소2}
                                    />
                                </div>
                            </li>
                            <li>
                                <p className='p1'>
                                 ※ 저장된 배송지는 최대 7일 간 임시 저장 후 자동 삭제됩니다.<br/>
                                    로그인 할 경우, 회원님의 배송지 목록에 추가됩니다.
                                </p>
                            </li>
                            <li>
                                <button 
                                    className='save-btn'
                                    onClick={onClickSave}
                                >저장</button>
                            </li>
                            <li>
                                <p className='p2'><img src="./img/sub/sub5/notice_14_14_f03f40.svg" alt="" />샛별배송 지역 중 배송불가 장소 안내</p>
                            </li>
                            <li>
                                <p className='p3'>관공서 / 학교 / 병원 / 시장 / 공단지역 / 산간지역 / 백화점 등</p>
                                <span>
                                    <a href="!#" onClick={onClickMoreView}>자세히 보기<img className={state.isMoreView?'on':''} src="./img/sub/sub5/ico_arrow_down_11x10.svg" alt="" /></a>
                                </span>                                
                            </li>
                        </ul>

                        {   

                            state.isMoreView && (
                                <div className="sub-list">
                                    <ul class="css-lu7l5g ep04gzj0">
                                        <li>가락동농수산물도매시장</li>
                                        <li>가락동농수산물시장</li>
                                        <li>가천대학교</li>
                                        <li>고려대학교안암캠퍼스</li>
                                        <li>고매동 일부(일부지역만 배송가능)</li>
                                        <li>국립중앙박물관</li>
                                        <li>국민대학교</li>
                                        <li>덕성여자대학교</li>
                                        <li>덕양구 신원동 일부(일부지역만 배송가능)</li>
                                        <li>도내동 일부(원흥지구만 배송가능)</li>
                                        <li>동덕여자대학교</li>
                                        <li>반월특수지구</li>
                                        <li>서경대학교</li>
                                        <li>서울사이버대학교</li>
                                        <li>서울시립대학교</li>
                                        <li>서울여자대학교</li>
                                        <li>성균관대학교</li>
                                        <li>성신여자대학교</li>
                                        <li>세종대학교</li>
                                        <li>연세대학교</li>
                                        <li>이화여자대학교</li>
                                        <li>한국외국어대학교</li>
                                        <li>홍익대학교</li>
                                    </ul>
                                </div>
                            )
                        }
                    </div>
                    <Postcode 
                        className='post-code'
                        style={postCodeStyle}
                        onComplete={onCompletePostCode}
                    />  
                </div>                
            </div>
                     
        </div>


    );
};

 