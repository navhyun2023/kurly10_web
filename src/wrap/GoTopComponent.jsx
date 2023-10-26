import React from 'react';
import './scss/gotop.scss';

export default function GoTopComponent() {

    const [state, setState] = React.useState({
        isFixed: false
    });

    let goTop = React.useRef();



    // 스크롤 탑값이 헤더의 row3 탑값 143.375 에 도달하면 고정
    React.useEffect(()=>{
    

        window.addEventListener('scroll', function(){
            let isFixed = false;
            
            if( window.scrollY >= 1200 ){ // 143.375
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


    return (
        <div  ref={goTop} id='goTop' className={state.isFixed?'on':''}>
            <a href="#wrap"><img src="./img/intro/gotop/icon_gotop.png" alt="" /></a>        
        </div>
    );
};
