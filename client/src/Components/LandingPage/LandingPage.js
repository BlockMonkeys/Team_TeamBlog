import React, { useEffect, useState } from 'react';
import Axios from "axios";

import Home from '../Home/Home';
import Category from '../Home/Category';
import { Row , Col } from 'antd';
import LandingCarousel from "./Sections/LandingCarousel";
import { CaretDownOutlined } from '@ant-design/icons';


import styled from 'styled-components';

function LandingPage(props) {

    const [Data, setData] = useState([]);
    const [Skip, setSkip] = useState(0);
    const [Limit, setLimit] = useState(8);
    const [LikeCount, setLikeCount] = useState(0);


    useEffect(() => {

        console.log(props)

        let body = {
            skip : Skip,
            limit : Limit,
        }

        getHomes(body);

        // Axios.get(`/api/like/${props.match.params.id}`)
        // .then(response => {
        //     console.log(response);
        //     setLikeCount(response.data.liked.length);
        // });

    }, [])

    const getHomes = (body) => {
        Axios.post('/api/post/postAll', body)
        .then(response => {
            // console.log(response);
            if(response.data.success){
                if(body.loadMore){
                    setData([...Data, ...response.data.result]);
                } else {
                    setData(response.data.result);
                }
                if(response.data.postCount < 1){
                    alert('마지막 페이지입니다.');
                }
            }
        })
    }

    const loadMoreHandler = () => {
        let skip = Skip + Limit;

        let body = {
            skip : skip,
            limit : Limit,
            loadMore: true,
        }

        getHomes(body);
        setSkip(skip);
    }
 

    return (
        <div>
            <LandingCarousel />
            <Category />
            {Data && 
            <Row gutter={[24, 24]} style={{margin: "0px 30px"}}>
                    {Data.map((item, idx)=> (
                        <Col key={idx} xl = {6} lg={8} md={12} xs={24}>
                            <Home
                                id={item._id}
                                title={item.title}
                                views={item.views}
                                creator={item.creator}
                                createdAt={item.createdAt}
                                description={item.description}
                                category={item.category}
                                imgSrc={item.postImg}
                            />
                        </Col>
                    ))}
                </Row>}
            <Btn>
                <button onClick={loadMoreHandler}><CaretDownOutlined /></button>
            </Btn>
        </div>
    )
}

export default LandingPage;

const Btn = styled.div`
    display: flex;
    justify-content: center;
    font-size: 14px;
    button{
        border: none;
        background-color: #CA526B;
        color: white;
        opacity: 0.8;
        width: 30px; height: 30px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        &:hover{
            cursor: pointer;
            opacity: 1;
        }
    }
`;