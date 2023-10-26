import React from 'react';
import './scss/header.scss';
import {Link, Outlet, useLocation} from 'react-router-dom';

export default function HeaderComponent({addressSearchOpen, 주소1, 주소2 }) {

    const {pathname} = useLocation();

    const refRow3 = React.useRef();

    const [state, setState] = React.useState({
        imageFile: 'icon_ham_bar.svg',
        map: false,       
        notice: false,
        isFixed: false       
    });

    // 스크롤 탑값이 헤더의 row3 탑값 143.375 에 도달하면 고정
    React.useEffect(()=>{

        let row3OffsetTop = refRow3.current.offsetTop + 43.375; // 탐값  offset().top => offsetTop

        window.addEventListener('scroll', function(){
            let isFixed = false;
            
            if( window.scrollY >= row3OffsetTop ){ // 143.375
                isFixed = true;
            }
            else {
                isFixed = false;
            }
            setState({
                ...state,
                isFixed: isFixed
            })
        });
        
    },[]);



    // mouseOver = mouseEnter
    // mouseOut = mouseleave
    const onMouseEnterCategory=()=>{
        setState({
            ...state, // state 안에 모든 변수중
            imageFile: 'icon_ham_bar_purple.svg'  // 이미지파일 변수만 셋터함수 실행
        })
    }
    const onMouseLeaveCategory=()=>{
        setState({
            ...state,
            imageFile: 'icon_ham_bar.svg'  
        })
    }

    // 배송지 등록 마우스 엔터
    const onMouseEnterMap=()=>{
        setState({
            ...state,
            map: true
        })
    }

    // 배송지 등록 박스를 마우스가 떠나면 map: false로 상태변경
    const onMouseLeaveMap=()=>{ 
        setState({
            ...state,
            map: false
        })
    }

    // 공지사항  Notice 마우스 엔터
    const onMouseEnterNotice=()=>{
        setState({
            ...state,
            notice: true
        })
    }

    // 공지사항  Notice 마우스 리브
    const onMouseLeaveNotice=()=>{
        setState({
            ...state,
            notice: false
        })
    }

    // 주소검색 API
    const onClickAddressSearch=(e)=>{
        e.preventDefault();
        addressSearchOpen();
    }

    return (
        <>
            <header id='header'>
            <div className="row1">
                    <div className="container">
                        <ul>
                            <li><Link to="/sub5" className='on'>회원가입</Link></li>
                            <li><i>|</i></li>
                            <li><Link to="/sub6">로그인</Link></li>
                            <li><i>|</i></li>
                            <li>
                                <Link to="/sub7"  onMouseEnter={onMouseEnterNotice}>고객센터</Link>
                                {
                                    state.notice && <div className="notice-box"  onMouseLeave={onMouseLeaveNotice}>
                                        <ul>
                                            <li><Link to="/sub7">공지사항</Link></li>
                                            <li><a href="!#">자주하는 질문</a></li>
                                            <li><a href="!#">1:1 문의</a></li>
                                            <li><a href="!#">대량주문 문의</a></li>
                                        </ul>
                                    </div>
                                }
                            </li>
                        </ul>
                    </div> 
            </div>           
            <div className="row2">
                    <div className="container">
                        <div className="left">
                            <h1><Link to="/index"><img src="./img/intro/icon_logo.svg" alt="" /><strong>마켓컬리</strong></Link></h1>
                            <span><i>|</i></span>
                            <a href="!#"><span>뷰티컬리<img src="./img/intro/icon_n.svg" alt="" /></span></a>
                        </div>

                        <div className={`center${state.isFixed ?' on':''}`}>
                            <input type="text" name='search' id='search' placeholder='검색어를 입력해주세요' />
                            <a href="!#" className='zoom-btn'><img src="./img/intro/icon_zoom.svg" alt="" /></a>
                        </div>

                        <div className={`right${state.isFixed ?' on':''}`}>
                            <a href="!#" onMouseEnter={onMouseEnterMap}><img src="./img/intro/icon_map.svg" alt="" /></a>
                            {                            
                                state.map && (
                                    <div className="map-box"  onMouseLeave={onMouseLeaveMap}>
                                        {
                                            주소1 !== "" && (
                                                <p>
                                                    {주소1}<br/>
                                                    {주소2}
                                                </p>
                                            )
                                        }
                                        <p>
                                            <strong>배송지를 등록</strong>하고<br/>
                                            구매 가능한 상품을 확인하세요!
                                        </p>
                                        <div className="btn-box">
                                            <button className='login-btn'>로그인</button>
                                            <button  onClick={onClickAddressSearch}  className='addr-search-btn'><img src="./img/intro/icon_zoom_small_btn.png" alt="" />주소검색</button>
                                        </div>
                                    </div>
                                )
                            }
                            <a href="!#"><img src="./img/intro/icon_heart.svg" alt="" /></a>
                            <a href="!#"><img src="./img/intro/icon_cart_middle.svg" alt="" /></a>
                        </div>
                    </div>             
            </div>           
            <div ref={refRow3} className={`row3${state.isFixed ?' on':''}`}>
                    <div className="container">
                        <div className={`left${state.isFixed ?' on':''}`}>
                            <a href="!#" onMouseEnter={onMouseEnterCategory}  onMouseLeave={onMouseLeaveCategory}>
                                <img src={`./img/intro/${state.imageFile}`} alt="" />
                                <strong>카테고리</strong>
                            </a>     
                        </div>
                        <div className={`center${state.isFixed ?' on':''}`}>
                            <ul>
                                <li><Link to="/sub1" className={pathname==='/sub1'?'on':''} >신상품</Link></li>
                                <li><Link to="/sub2" className={pathname==='/sub2'?'on':''} >베스트</Link></li>
                                <li><Link to="/sub3" className={pathname==='/sub3'?'on':''} >알뜰쇼핑</Link></li>
                                <li><Link to="/sub4" className={pathname==='/sub4'?'on':''} >특가혜택</Link></li>
                            </ul>
                        </div>
                        <div className={`right${state.isFixed ?' on':''}`}>
                            <a href="!#">
                                <strong>샛별・택배</strong><span>배송안내</span>
                            </a>
                        </div>
                    </div>     
            </div>           
            </header>
            <Outlet />
        </>
    );
};
