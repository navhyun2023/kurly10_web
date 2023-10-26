import React from 'react';
import Section1ChildComponent from './Section1ChildComponent';
import './scss/section1.scss';
import axios from 'axios';

export default function Section1Component() {
    
    const [state, setState] = React.useState({
        슬라이드: []
    });

    axios({  // index.html 루트 경로 위치
        url: './data/section1.json',
        method: 'GET'
    })
    .then((res)=>{ // AXIOS 성공  프로미스(비동기식)
        // console.log( res.data );
        setState({
            슬라이드: res.data.슬라이드
        })

    })
    .catch((err)=>{ // AXIOS 실패
        console.log(  'AXIOS 실패' );
        console.log(  err );
    });


    return (
        <section id='section1'>

            <Section1ChildComponent  슬라이드={state.슬라이드} />

        </section>
    );
};
