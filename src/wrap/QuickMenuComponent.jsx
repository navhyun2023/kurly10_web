import React from 'react';
import './scss/quickmenu.scss';

export default function QuickMenuComponent({viewProduct}) {

    const [state, setState] = React.useState({
        isFixed: false
    });

    let quickMenu = React.useRef();



    // 스크롤 탑값이 헤더의 row3 탑값 143.375 에 도달하면 고정
    React.useEffect(()=>{
    
        let quickMenuTop = quickMenu.current.offsetTop;

        window.addEventListener('scroll', function(){
            let isFixed = false;
            
            if( window.scrollY >= quickMenuTop ){ // 143.375
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


    const [cnt, setCnt] = React.useState(0);


    // 업, 다운 클릭 이벤트
    const onClickUpDownEvent=(e,  direction)=>{
        e.preventDefault();         //7-4=3
       if(direction==="down"){ // cnt++  viewProduct.length-4 개일때 => 0
            if(cnt > viewProduct.length-4){ // cnt > 3 보다 크면 끝 4에서 끝
               return;
            }
            else{ // cnt <= 3    0 1 2 3  4번증가
                setCnt(cnt+1); // 1
            }
       }       
       else if(direction==="up"){ // cnt++
            if(cnt > 0){
                setCnt(cnt-1); // 3 2 1... 
            }
            else{ // 0 이면 종료
                return;
            }
       }
    }

    const refSlideWrap = React.useRef();

    // 메인슬라이드 애니메이션 메서드 <= cnt 변경되면 실행
    const mainSlide=()=>{
        try{
            refSlideWrap.current.style.transition = "all 0.3s";
            refSlideWrap.current.style.transform = `translateY(${-84*cnt}px)`;    
        } 
        catch(e){
            return;
        }
    }

    // cnt변경되면 실행
    React.useEffect(()=>{
        mainSlide();
    },[cnt]);



    return (
        <div ref={quickMenu} id='quickMenu' className={state.isFixed?'on':''}>
            <div className="container">
                <div className="content">
                    <div className="row1">
                        <a href="!#">
                            <img src="./img/intro/deliveryInfo.png" alt="" />
                        </a>
                    </div>
                    <div className="row2">
                        <a href="!#">등급별 혜택</a>
                        <a href="!#">레시피</a>
                    </div>
                    {
                    viewProduct.length > 0 && (   
                        <div className="row3">
                            <div className="up">
                                <a href="!#" onClick={(e)=>onClickUpDownEvent(e, 'up')} ><img src="./img/intro/quikmenu/arrow_down.svg" alt="" /></a>
                            </div>
                            <div className="title">최근본상품</div>
                            <div className="img-box">
                                <ul ref={refSlideWrap}>
                                    {
                                        viewProduct.map((item)=>{
                                            return(
                                                <li key={item.번호}>
                                                    <a href="!#">
                                                        <img src={item.이미지} alt="" />
                                                    </a>
                                                </li>
                                            )
                                        })

                                    }
                                </ul>
                            </div>
                            <div className="down">
                                <a href="!#" onClick={(e)=>onClickUpDownEvent(e, 'down')} ><img src="./img/intro/quikmenu/arrow_down.svg" alt="" /></a>
                            </div>
                        </div>
                    )
                    }
                </div>
            </div>        
        </div>
    );
};
