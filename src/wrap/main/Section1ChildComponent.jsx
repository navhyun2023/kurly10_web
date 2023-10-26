import React from 'react';

export default function Section1ChildComponent ({슬라이드}) {

    // 돔요소를 처리하는 useRef() 훅
    const slideWrap = React.useRef();  // 슬라이드 랩퍼 박스 돔요소를 선언
    const [cnt, setCnt] = React.useState(0);
    const [n, setN] = React.useState(0);  // 슬라이드 전체 개수
    const [toggle, setToggle] = React.useState(0); // 리턴 한걸 기억하는 상태변수
    const [play, setPlay] = React.useState(true); // 타이머 제어 true 타이머 동작 false 이면 타이머중지

    // 0. 슬라이드 너비 자동화 : 로딩시 자동으로 슬라이드 랩퍼박스 너비를 설정하라
    React.useEffect(()=>{
        slideWrap.current.style.width = `${100 * 슬라이드.length}%`;
        setN((슬라이드.length-2)); // 17개 이지만 번호는 0 ~ 16
    },[슬라이드]); // 로딩시 실행 1회

    // 1. 메인슬라이드함수
    const mainSlide=()=>{
        slideWrap.current.style.transition = `all 0.6s ease-in-out`;
        slideWrap.current.style.transform = `translate(${-1903*cnt}px)`;
        returnSlide();
    } 

    // 리턴 우측 끝에서 한번 더 이동하면 첫번째 슬라이드이미지까지 부드럽게 이동하고
    // 그리고 리턴 
    // 언제 리턴 ? 
    // 1+17+1 = 19
    // 0 ~ 16 => 17개
    const returnSlide=()=>{
        if(cnt>n){            
            setCnt(1);      // cnt 변경 두번째로 
            setToggle(1)    // 리턴 했다고 변수에 기억 토글값이 1이면 리턴 한거임.
            slideWrap.current.style.transition = `none`; 
            slideWrap.current.style.transform = `translate(${-1903*0}px)`;
        }
        if(cnt<0){            
            setCnt(n-1);      // cnt 마지막 슬라이드로 설정
            setToggle(1)      // 리턴 했다고 변수에 기억 토글값이 1이면 리턴 한거임.
            slideWrap.current.style.transition = `none`; 
            slideWrap.current.style.transform = `translate(${-1903*n}px)`;
        }
    }

    // 자동타이머함수
    React.useEffect(()=>{
        let setId = 0;
        
        if(play===true){
            setId = setInterval(()=>{
                setCnt( cnt => cnt + 1 ); // 1 2 3 .... 
            }, 3000); // 4초간격 자동 실행
            return () => clearInterval(setId);
        }

    },[play]); // 로딩시 1회 실행

    // cnt가 변경되면 자동으로 메인슬라이드 호출 실행
    React.useEffect(()=>{ // 비동기처리
        if(toggle===0){ // 리턴이 아닌상태에서 실행
            mainSlide();
        }
        else{             
            setTimeout(function(){
                mainSlide();
            }, 100); 
            setToggle(0); 
        }
    },[cnt]); //  cnt=1 상태변수가 변경되면 즉시 실행


    // 다음 화살 버튼 클릭 이벤트
    const onClickNextBtn=()=>{
        setCnt(cnt+1);
    }

    // 이전 화살 버튼 클릭 이벤트
    const onClickPrevBtn=()=>{
        setCnt(cnt-1);
    }


    // 마우스를 슬라이드에 오버시 슬라이드 정지
    const onMouseEnterSlide=()=>{
        setPlay(false); //play 변수가 변경되면 타이머에 잀시정지
    }

    // 마우스를 슬라이드에 아웃시 슬라이드 재실행
    const onMouseLeaveSlide=()=>{
        setPlay(true); //play 변수가 변경되면 타이머에 플레이
    }



    return (
        <div className="slide-container"  onMouseEnter={onMouseEnterSlide} onMouseLeave={onMouseLeaveSlide} >
            <div className="slide-view">
                <ul ref={slideWrap}  className="slide-wrap">
                {                    
                    슬라이드.map((item,idx)=>{
                        return (
                            <li className="slide" key={item.번호}>
                                <img src={`./img/intro/slide/${item.이미지}`} alt="" />
                            </li>
                        )
                    })                     
                }
                </ul>
            </div>

            <button onClick={onClickNextBtn} className='arrow-next-btn'><img src="./img/intro/icon_circle_gray_arrow.svg" alt="" /></button>
            <button onClick={onClickPrevBtn}  className='arrow-prev-btn'><img src="./img/intro/icon_circle_gray_arrow.svg" alt="" /></button>
            <div className='page-num-box'><span>{ cnt+1 > n ? 1 : cnt+1 }</span>/<span>{슬라이드.length-2}</span></div>

        </div>
    );
};
