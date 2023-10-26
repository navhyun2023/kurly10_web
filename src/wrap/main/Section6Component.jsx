import React from 'react';
import Section6ChildComponent from './Section6ChildComponent';
import './scss/section6.scss';
import axios from 'axios';

export default function Section6Component({currentViewProduct}) {

    const [state, setState] = React.useState({
        슬라이드: [],
        n: 0
    });

    React.useEffect(()=>{
        axios({
            url:'./data/section6.json',
            method:'GET'
        })
        .then((res)=>{
            setState({
                ...state,
                슬라이드: res.data.슬라이드,
                n:  res.data.슬라이드.length
            })
            
        })
        .catch((err)=>{
            console.log(err);
        });
    },[]);


    return (
        <section id='section2'>
            <div className="container">
                <div className="title">
                    <h2>이 상품 어때요?</h2>
                </div>    
                <div className="content">
                   <Section6ChildComponent   currentViewProduct={currentViewProduct}  슬라이드={state.슬라이드}  n={state.n}  />
                </div>    
            </div>              
        </section>
    );
};
