import React from 'react';
import './scss/sub1.scss';
import axios from 'axios';
import Sub3ChildComponent from './Sub3ChildComponent';


export default function Sub3Component({currentViewProduct}) {

    const [state, setState] = React.useState({
        알뜰쇼핑: [],
        isSub1: false,
        isSub2: false,
        isSub3: false,
        isSub4: false,
        isSub5: false,
        isSub6: false
    });

    React.useEffect(()=>{
       
        axios({  // index.html 루트 경로 위치
            url: './data/sub/sub3/data.json',
            method: 'GET'
        })
        .then((res)=>{ // AXIOS 성공  프로미스(비동기식)

            setState({
                ...state,
                알뜰쇼핑: res.data.알뜰쇼핑
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
        <main id='sub3' className='sub'>
            <section id="section1">
                <div className="container">
                    <div className="content">
                        <a href="!#"><img src="./img/sub/sub1/uHE0ClaQtik9dFz10g9WdtCkTcVNKSEjnJYuZYw0.webp" alt="" /></a>
                    </div>    
                </div>  
            </section>
            <section id="section2">
                <div className="container">
                    <div className="title">
                        <h2>알뜰쇼핑</h2>
                    </div>
                    <div className="content">
                        <div className="left">
                            <div className="col-gap">
                                <div className="top">
                                    <strong>
                                        필터
                                    </strong>
                                    <a href='!#' className='refresh-btn'>
                                        <img src="./img/sub/sub1/refresh.svg" alt="" />
                                        <em>초기화</em>
                                    </a>
                                </div>
                                <div className="category">
                                    <ul>
                                        <li>
                                            <a href="!#" onClick={onClickSub1} className='cataegory-btn'>카테고리</a>
                                            <div className={`sub sub1${state.isSub1?' on':' off'}`}>
                                                <ul>
                                                    <li>
                                                        <label htmlFor="sub1-1"><input type="checkbox" name='sub1-1' id='sub1-1' value='생수·음료·우유·커피' />생수·음료·우유·커피<em>35</em></label>
                                                    </li>
                                                    <li>
                                                        <label htmlFor="sub1-2"><input type="checkbox" name='sub1-2' id='sub1-2' value='국·반찬·메인요리' />국·반찬·메인요리<em>35</em></label>
                                                    </li>
                                                    <li>
                                                        <label htmlFor="sub1-3"><input type="checkbox" name='sub1-3' id='sub1-3' value='샐러드·간편식' />국·반찬·메인요리<em>35</em></label>
                                                    </li>
                                                    <li>
                                                        <label htmlFor="sub1-4"><input type="checkbox" name='sub1-4' id='sub1-4' value='SUMMER BIG SALE' />국·반찬·메인요리<em>35</em></label>
                                                    </li>
                                                    <li>
                                                        <label htmlFor="sub1-5"><input type="checkbox" name='sub1-5' id='sub1-5' value='수산·해산·건어물' />수산·해산·건어물<em>35</em></label>
                                                    </li>
                                                    <li>
                                                        <label htmlFor="sub1-6"><input type="checkbox" name='sub1-6' id='sub1-6' value='생활용품·리빙·캠핑' />생활용품·리빙·캠핑<em>35</em></label>
                                                    </li>
                                                    <li>
                                                        <label htmlFor="sub1-7"><input type="checkbox" name='sub1-7' id='sub1-7' value='베이커리·치즈·델리' />베이커리·치즈·델리<em>35</em></label>
                                                    </li>
                                                    <li>
                                                        <label htmlFor="sub1-8"><input type="checkbox" name='sub1-8' id='sub1-8' value='면·양념·오일' />면·양념·오일<em>35</em></label>
                                                    </li>
                                                    <li>
                                                        <label htmlFor="sub1-9"><input type="checkbox" name='sub1-9' id='sub1-9' value='과일·견과·쌀' />과일·견과·쌀<em>35</em></label>
                                                    </li>
                                                    <li>
                                                        <label htmlFor="sub1-10"><input type="checkbox" name='sub1-10' id='sub1-10' value='주방용품' />주방용품<em>35</em></label>
                                                    </li>
                                                </ul>
                                                <button className='category-more-view-btn'>카테고리 더보기<img src="./img/sub/sub1/arrow.svg" alt="" /></button>
                                            </div>
                                        </li>
                                        <li>
                                            <a href="!#" onClick={onClickSub2}  className='cataegory-btn'>브랜드</a>
                                            <div className={`sub sub2${state.isSub2?' on':' off'}`}>
                                                <ul>
                                                    <li>
                                                        <label><input type="checkbox" name='sub2-1' id='sub2-1' value='생수·음료·우유·커피' />생수·음료·우유·커피<em>35</em></label>
                                                    </li>
                                                    <li>
                                                        <label><input type="checkbox" name='sub2-2' id='sub2-2' value='국·반찬·메인요리' />국·반찬·메인요리<em>35</em></label>
                                                    </li>
                                                    <li>
                                                        <label><input type="checkbox" name='sub2-3' id='sub2-3' value='샐러드·간편식' />국·반찬·메인요리<em>35</em></label>
                                                    </li>
                                                    <li>
                                                        <label><input type="checkbox" name='sub2-4' id='sub2-4' value='SUMMER BIG SALE' />국·반찬·메인요리<em>35</em></label>
                                                    </li>
                                                   
                                                </ul>
                                                <button className='category-more-view-btn'>카테고리 더보기<img src="./img/sub/sub1/arrow.svg" alt="" /></button>
                                            </div>
                                        </li>
                                        <li>
                                            <a href="!#" onClick={onClickSub3}  className='cataegory-btn'>가격</a>
                                            <div className={`sub sub3${state.isSub3?' on':' off'}`}>
                                                <ul>
                                                    <li>
                                                        <label><input type="checkbox" name='sub3-1' id='sub3-1' value='생수·음료·우유·커피' />생수·음료·우유·커피<em>35</em></label>
                                                    </li>
                                                    <li>
                                                        <label><input type="checkbox" name='sub3-2' id='sub3-2' value='국·반찬·메인요리' />국·반찬·메인요리<em>35</em></label>
                                                    </li>
                                                    
                                                </ul>
                                                <button className='category-more-view-btn'>카테고리 더보기<img src="./img/sub/sub1/arrow.svg" alt="" /></button>
                                            </div>                                            
                                        </li>
                                        <li>
                                            <a href="!#" onClick={onClickSub4}  className='cataegory-btn'>혜택</a>
                                            <div className={`sub sub4${state.isSub4?' on':' off'}`}>
                                                <ul>
                                                    <li>
                                                        <label htmlFor="sub1-1"><input type="checkbox" name='sub1-1' id='sub1-1' value='생수·음료·우유·커피' />생수·음료·우유·커피<em>35</em></label>
                                                    </li>
                                                    <li>
                                                        <label htmlFor="sub1-2"><input type="checkbox" name='sub1-2' id='sub1-2' value='국·반찬·메인요리' />국·반찬·메인요리<em>35</em></label>
                                                    </li>
                                                    <li>
                                                        <label htmlFor="sub1-3"><input type="checkbox" name='sub1-3' id='sub1-3' value='샐러드·간편식' />국·반찬·메인요리<em>35</em></label>
                                                    </li>
                                                    <li>
                                                        <label htmlFor="sub1-4"><input type="checkbox" name='sub1-4' id='sub1-4' value='SUMMER BIG SALE' />국·반찬·메인요리<em>35</em></label>
                                                    </li>
                                                    <li>
                                                        <label htmlFor="sub1-5"><input type="checkbox" name='sub1-5' id='sub1-5' value='수산·해산·건어물' />수산·해산·건어물<em>35</em></label>
                                                    </li>
                                                    <li>
                                                        <label htmlFor="sub1-6"><input type="checkbox" name='sub1-6' id='sub1-6' value='생활용품·리빙·캠핑' />생활용품·리빙·캠핑<em>35</em></label>
                                                    </li>
                                                    <li>
                                                        <label htmlFor="sub1-7"><input type="checkbox" name='sub1-7' id='sub1-7' value='베이커리·치즈·델리' />베이커리·치즈·델리<em>35</em></label>
                                                    </li>
                                                    <li>
                                                        <label htmlFor="sub1-8"><input type="checkbox" name='sub1-8' id='sub1-8' value='면·양념·오일' />면·양념·오일<em>35</em></label>
                                                    </li>
                                                    <li>
                                                        <label htmlFor="sub1-9"><input type="checkbox" name='sub1-9' id='sub1-9' value='과일·견과·쌀' />과일·견과·쌀<em>35</em></label>
                                                    </li>
                                                    <li>
                                                        <label htmlFor="sub1-10"><input type="checkbox" name='sub1-10' id='sub1-10' value='주방용품' />주방용품<em>35</em></label>
                                                    </li>
                                                </ul>
                                                <button className='category-more-view-btn'>카테고리 더보기<img src="./img/sub/sub1/arrow.svg" alt="" /></button>
                                            </div>                                            
                                        </li>
                                        <li>
                                            <a href="!#" onClick={onClickSub5}  className='cataegory-btn'>유형</a>
                                            <div className={`sub sub5${state.isSub5?' on':' off'}`}>
                                                <ul>
                                                    <li>
                                                        <label><input type="checkbox" name='sub5-1' id='sub5-1' value='생수·음료·우유·커피' />생수·음료·우유·커피<em>35</em></label>
                                                    </li>
                                                    <li>
                                                        <label><input type="checkbox" name='sub5-2' id='sub5-2' value='국·반찬·메인요리' />국·반찬·메인요리<em>35</em></label>
                                                    </li>
                                                    
                                                </ul>
                                                <button className='category-more-view-btn'>카테고리 더보기<img src="./img/sub/sub1/arrow.svg" alt="" /></button>
                                            </div>
                                        </li>
                                        <li>
                                            <a href="!#" onClick={onClickSub6}  className='cataegory-btn'>특정상품 제외</a>
                                            <div className={`sub sub6${state.isSub6?' on':' off'}`}>
                                                <ul>
                                                    <li>
                                                        <label><input type="checkbox" name='sub6-1' id='sub1-1' value='생수·음료·우유·커피' />생수·음료·우유·커피<em>35</em></label>
                                                    </li>
                                                </ul>
                                                <button className='category-more-view-btn'>카테고리 더보기<img src="./img/sub/sub1/arrow.svg" alt="" /></button>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="right">
                                <div className="top">
                                    <div className="top-left">
                                        <strong>총 232건</strong>
                                    </div>
                                    <div className="top-right">
                                        <a href="!#" className='order-btn'>추천순&nbsp;<img src="./img/sub/sub1/icon_question.svg" alt="" /></a>
                                        <a href="!#" className='order-btn  on'>신상품순</a>
                                        <a href="!#" className='order-btn'>판매량순</a>
                                        <a href="!#" className='order-btn'>혜택순</a>
                                        <a href="!#" className='order-btn'>낮은가격순</a>
                                        <a href="!#" className='order-btn'>높은가격순</a>                                        
                                    </div>
                                </div>

                                <Sub3ChildComponent currentViewProduct={currentViewProduct} 알뜰쇼핑={state.알뜰쇼핑}  />

                        </div>
                    </div>
                </div>  
            </section>


         
        </main>
    );
};
