import React from 'react';
import "./scss/section3.scss";

export default function Section3Component({currentViewProduct}) {

    const [state, setState] = React.useState({
        H: 0,
        M: 0,
        S: 0
    });


    // 24시간 타임세일 시작일시 2023-08-17 19:00:00 => 19 + 24시간 => 타임세일 종료일시
    // 카운트 타이머 => 타임세일 일시를 초단위로 호출 계산 1970년 1월 1일 00:00:00 기준 계산
    // 시 : 분 : 초
    
    React.useEffect(()=>{
        let startTime = new Date("2023-08-16 22:10:00"); //타임세일 시작일시
        let nowTime = new Date();  // 현재 일시
            startTime = (startTime.setHours( startTime.getHours() + 24 ));   // 시간세터함수 + 24 계산
        let endTime = startTime - nowTime; //초단위

        let H = Math.floor(endTime/(60*60*1000)%24); // 나머지 시간
        let M = Math.floor(endTime/(60*1000)%60);    // 나머지 분
        let S = Math.floor(endTime/(1000)%60);    // 나머지 초

       function timeSaleFn(){ 
            nowTime = new Date();
            endTime = startTime - nowTime;
            H = Math.floor(endTime/(60*60*1000)%24); // 나머지 시간
            M = Math.floor(endTime/(60*1000)%60);    // 나머지 분
            S = Math.floor(endTime/(1000)%60);    // 나머지 초
            
            if( nowTime >= startTime ){ // 현재일시 가  타임세일 시작보다 크거나 같다면 타일세일종료
                    setState({
                        ...state,
                        H: 0,
                        M: 0,
                        S: 0
                    })
            }
            else{ // 타일 세일 진행 중 ...
                    setState({
                        ...state,
                        H: H,
                        M: M,
                        S: S
                    });
            }
        }

       setInterval( timeSaleFn, 1000 );


    },[state.H, state.M, state.S]);



    return (
        <section id='section3'>
            <div className="container">
                <div className="content">
                    <ul  className="slide-wrap">
                        <li className="slide slide1">
                            <div className="gap">
                                
                                <h2>
                                    매일 오전 11시<br/>OPEN !
                                </h2>
                                <p>
                                    24시간 한정 일일특가
                                </p>

                                <div>
                                    <img src="./img/intro/section3/timer.svg" alt="" />
                                    <strong>{state.H < 10 ? `0${state.H}`: state.H}</strong>
                                    <i>:</i>
                                    <strong>{state.M < 10 ? `0${state.M}`: state.M}</strong>
                                    <i>:</i>
                                    <strong>{state.S < 10 ? `0${state.S}`: state.S}</strong>
                                </div>

                                <h3>
                                    망설이면 늦어요!
                                </h3>


                            </div>    
                        </li> 
                        <li className="slide slide2">
                            <div className="gap">
                                <div className="img-box">
                                    <img src="./img/intro/section3/95a33a48-a620-447e-b597-7cbe875dbded.jpg" alt="" />
                                    <span><img src="./img/intro/icon_cart_circle_purple.svg" alt="" /></span>
                                </div>    
                                <div className="caption">
                                    <h3>
                                        [하이포크] 한돈 급냉 삼겹살 500g
                                    </h3>
                                    <h4>
                                        <strong>{Math.round(0.3*100)}%</strong>
                                        <em>{Math.round(15300*(1-0.3)).toLocaleString('ko-KO')}원</em><br/>
                                        <span>{(15300).toLocaleString('ko-KO')}원</span>
                                    </h4>
                                    <p>
                                        <img src="./img/intro/icon_write.svg" alt="" />
                                        <span>후기 999+</span>
                                    </p>
                                </div>
                            </div>    
                        </li> 
                        <li className="slide slide3">
                            <div className="gap">
                                <div className="img-box">
                                    <img src="./img/intro/section3/1626252109651l0.jpg" alt="" />
                                    <span><img src="./img/intro/icon_cart_circle_purple.svg" alt="" /></span>
                                </div>    
                                <div className="caption">
                                    <h3>
                                        [하이포크] 한돈 급냉 삼겹살 500g
                                    </h3>
                                    <h4>
                                        <strong>{Math.round(0.3*100)}%</strong>
                                        <em>{Math.round(15300*(1-0.3)).toLocaleString('ko-KO')}원</em><br/>
                                        <span>{(15300).toLocaleString('ko-KO')}원</span>
                                    </h4>
                                    <p>
                                        <img src="./img/intro/icon_write.svg" alt="" />
                                        <span>후기 999+</span>
                                    </p>
                                </div>
                            </div>    
                        </li> 
                        <li className="slide slide4">
                            <div className="gap">
                                <div className="img-box">
                                    <img src="./img/intro/section3/c519a725-3a8f-4051-aff3-33741938d185.jpg" alt="" />
                                    <span><img src="./img/intro/icon_cart_circle_purple.svg" alt="" /></span>
                                </div>    
                                <div className="caption">
                                    <h3>
                                        [하이포크] 한돈 급냉 삼겹살 500g
                                    </h3>
                                    <h4>
                                        <strong>{Math.round(0.3*100)}%</strong>
                                        <em>{Math.round(15300*(1-0.3)).toLocaleString('ko-KO')}원</em><br/>
                                        <span>{(15300).toLocaleString('ko-KO')}원</span>
                                    </h4>
                                    <p>
                                        <img src="./img/intro/icon_write.svg" alt="" />
                                        <span>후기 999+</span>
                                    </p>
                                </div>
                            </div>    
                        </li> 
                    </ul>   
                </div>    
            </div>       
        </section>
    );
};
