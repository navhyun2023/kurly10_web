import React from 'react';
import './scss/ConfirmModal.scss';

export default function ConfirmModal ({msg, confirmModalClose}) {

    const onClickCloseBtn=(e)=>{
        e.preventDefault();
        confirmModalClose(); // 닫기 메서드 호출
    }

    return (
        <div id='confirmModal'>
            <div className="container">
                <div className="content">
                    <ul>
                        <li><p>{ msg }</p></li>
                        <li><button  onClick={onClickCloseBtn}>확인</button></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};