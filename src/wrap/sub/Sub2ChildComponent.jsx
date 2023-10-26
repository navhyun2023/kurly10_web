import React from 'react';

export default function Sub2ChildComponent ({currentViewProduct,베스트}) {

    const onClickViewProduct=(e, item, imgPath)=>{
        e.preventDefault();
        currentViewProduct(item, imgPath);
    }

    return (
        <ul>
            {
                베스트.map((item, idx)=>{
                    return(
                        <li key={item.번호}   onClick={(e)=>onClickViewProduct(e, item, './img/sub/sub2/')}  >
                            <div className="col-gap">
                                <div className="img-box">
                                    <img src={`./img/sub/sub2/${item.이미지}`} alt="" />
                                </div>
                                <div className="button-box">
                                    <a href="!#"><img src="./img/sub/sub2/icon_cart.svg" alt="" />담기</a>
                                </div>
                                <div className="txt-box">
                                    <ul>
                                        <li><em>{item.배송구분}</em></li>
                                        <li><h2>{item.상품명}</h2></li>
                                        <li><h3>{item.상세설명}</h3></li>
                                        <li><h4>{item.정가.toLocaleString("ko-KR")}</h4></li>
                                        <li><strong>{Math.round(item.할인율*100)}%</strong><h5>{Math.round(item.정가*(1-item.할인율)).toLocaleString("ko-KR")}원</h5></li>
                                        <li><h6>{item.공급처}</h6></li>
                                    </ul>
                                </div>
                            </div>
                        </li>
                    )
                })
            }
        </ul>
    );
};