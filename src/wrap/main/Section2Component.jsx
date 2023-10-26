import React from 'react';
import Section2ChildComponent from './Section2ChildComponent ';
import './scss/section2.scss';
import axios from 'axios';

export default function Section2Component({currentViewProduct}) {

    const [state, setState] = React.useState({
        슬라이드: [],
        n: 0
    });

    React.useEffect(()=>{
        axios({
            url:'./data/section2.json',
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
                   <Section2ChildComponent currentViewProduct={currentViewProduct} 슬라이드={state.슬라이드}  n={state.n}  />
                </div>    
            </div>              
        </section>
    );
};
