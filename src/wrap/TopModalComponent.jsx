import React from 'react';
import './scss/top_modal.scss';

export default function TopModalComponent() {

    // 탑모달 가상클래스 상태관리 statement
    //  [modal 변수, setModal 셋터함수(변경설정)] 
    const [modal, setModal] = React.useState(false);  // 리액트 상태관리 훅(함수)

    // 탑모달 닫기 클릭 이벤트
    const onClickModal=(e)=>{
        e.preventDefault();
        setModal(true); // 셋터함수 true로 변경
    }

    // 사이트이동 링크
    const onClickSiteLink=(e)=>{
        e.preventDefault();
        window.location.href = 'https://www.kurly.com/shop/event/kurlyEvent.php?htmid=event/join/join/coupon';
    }

    return (
        <div id='topModal' className={modal ? 'on' : ''}>
            <div className="container">
                <a href="!#" onClick={onClickSiteLink}>지금 가입하고, <strong>1만원 할인 쿠폰</strong> 받아가세요!</a>
                <a href="!#" onClick={onClickModal} className='top-modal-close'><img src="./img/top_modal/close.svg" alt="" /></a>
            </div>                         
        </div>
    );
};
