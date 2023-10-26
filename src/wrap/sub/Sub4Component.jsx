import React from 'react';
import './scss/sub4.scss';
import axios from 'axios';
import Sub4ChildComponent from './Sub4ChildComponent';


export default function Sub4Component({currentViewProduct}) {

    const [state, setState] = React.useState({
        특가혜택: [],
        isSub1: false,
        isSub2: false,
        isSub3: false,
        isSub4: false,
        isSub5: false,
        isSub6: false
    });

    React.useEffect(()=>{
        axios({  // index.html 루트 경로 위치
            url: './data/sub/sub4/data.json',
            method: 'GET'
        })
        .then((res)=>{ // AXIOS 성공  프로미스(비동기식)

            setState({
                ...state,
                특가혜택: res.data.특가혜택
            })
    
        })
        .catch((err)=>{ // AXIOS 실패
            console.log(  'AXIOS 실패' );
            console.log(  err );
        });

    },[]);


    // 서브메뉴 버튼 클릭 이벤트 
    const onClickSub1=(e)=>{
        e.preventDefault();
        setState({
            ...state,
            isSub1: !state.isSub1  // 토글 toggle
        })
    }
    const onClickSub2=(e)=>{
        e.preventDefault();
        setState({
            ...state,
            isSub2: !state.isSub2  // 토글 toggle
        })        
    }

    const onClickSub3=(e)=>{
        e.preventDefault();
        setState({
            ...state,
            isSub3: !state.isSub3  // 토글 toggle
        })        
    }

    const onClickSub4=(e)=>{
        e.preventDefault();
        setState({
            ...state,
            isSub4: !state.isSub4  // 토글 toggle
        })        
    }

    const onClickSub5=(e)=>{
        e.preventDefault();
        setState({
            ...state,
            isSub5: !state.isSub5  // 토글 toggle
        })        
    }

    const onClickSub6=(e)=>{
        e.preventDefault();
        setState({
            ...state,
            isSub6: !state.isSub6  // 토글 toggle
        })        
    }



    return (
        <main id='sub4' className='sub'>
            <section id="section2">
                <div className="container">
                    <div className="content">
                        <div className="right">
                               
                                <Sub4ChildComponent currentViewProduct={currentViewProduct} 특가혜택={state.특가혜택}  />

                        </div>
                    </div>
                </div>  
            </section>


         
        </main>
    );
};
