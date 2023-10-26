import React from 'react';

export default function Section2ChildComponent ({currentViewProduct, 슬라이드, n}) {

    const slideWrap = React.useRef();
    const [state, setState] = React.useState({
        cnt: 0        
    });
    const {cnt} = state; // 비구조화



    // 1. 최근 본상품 클릭 이벤트
    const onClickViewProduct=(e, item, imgPath)=>{
        e.preventDefault();       
        currentViewProduct(item, imgPath);
    }

    




    
    const mainSlide=()=>{
        slideWrap.current.style.transition = `all 0.6s ease-in-out`;
        slideWrap.current.style.transform = `translateX(${-1068*cnt}px)`;
    }

    React.useEffect(()=>{
        mainSlide();
    },[cnt]);

    const onClickNextBtn=(e)=>{
        e.preventDefault();
        setState({
            ...state,
            cnt: cnt+1
        })
    }
    const onClickNPrevBtn=(e)=>{
        e.preventDefault();
        setState({
            ...state,
            cnt: cnt-1
        })
    }

    return (
        <div className="slide-container">
            <div className="slide-view">
                <ul ref={slideWrap} className="slide-wrap">
                   {

                        슬라이드.map((item)=>{
                            return(
                                <li onClick={(e)=>onClickViewProduct(e,  item, './img/intro/' )}  className="slide slide1" key={item.번호}>
                                    <div className="gap">
                                        <div className="img-box">
                                            <img src={`./img/intro/${item.이미지}`} alt="" />
                                            <span><img src="./img/intro/icon_cart_circle_purple.svg" alt="" /></span>
                                        </div>    
                                        <div className="caption">
                                            <h3>
                                                {item.상품명}
                                            </h3>
                                            <h4>
                                                <strong>{Math.round(item.할인율*100)}%</strong>
                                                <em>{Math.round(item.정가*(1-item.할인율)).toLocaleString('ko-KO')}원</em><br/>
                                                <span>{item.정가.toLocaleString('ko-KO')}원</span>
                                            </h4>
                                            <p>
                                                <img src="./img/intro/icon_write.svg" alt="" />
                                                <span>{item.후기}</span>
                                            </p>
                                        </div>
                                    </div>    
                                </li>                    

                            )
                        })
                            
                    }              
                </ul>
            </div>
            {
                cnt > 0 && <a href="!#" onClick={onClickNPrevBtn}  className='prev-arrow-btn'><img src="./img/intro/icon_circle_white_arrow.svg" alt="" /></a>
            }
            {
                cnt < 4 && <a href="!#" onClick={onClickNextBtn} className='next-arrow-btn'><img src="./img/intro/icon_circle_white_arrow.svg" alt="" /></a>
            }        
        </div>
    );
};
