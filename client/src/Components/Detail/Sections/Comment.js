import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector } from "react-redux";
import Axios from "axios";

import Reply from './Reply';

function Comment(props) {
    const [Comments, setComments] = useState([]);
    const [Content, setContent] = useState("");
    // const [Reply, setReply] = useState(false);
    const currentUser = useSelector(state => state.user);

    useEffect(() => {
        Axios.get(`/api/comments/${props.match.params.id}`)
            .then(response => {
                setComments(response.data.result);
            });
    }, [Comments.length]);

    const handleContent = (e) => {
        setContent(e.currentTarget.value);
    }

    const handleSubmit = (e) => {
        if(Content.length < 3){
            alert("댓글은 3글자 이상 작성해주세요.");
            return ;
        };

        const variables = {
            content : Content,
        }

        Axios.post(`/api/comments/create/${props.match.params.id}`, variables)
            .then(response => {
                if(response.data.success){
                    alert("댓글작성완료");
                    setContent("");
                    window.location.reload();
                } else {
                    alert("댓글작성실패");
                }
            });
    }

    const elems = document.getElementsByClassName('toggle');

    // console.log(elems);

    const handleClick = (e) => {
        let target_id = e.target.id;
        console.log(target_id);
        for( let i = 0; i < elems.length; i+= 1 ){
            let elems_id = document.getElementById(`${i}`).getAttribute('id')
            console.log(elems_id);
            if(target_id === elems_id){
                elems[i].classList.toggle('toggle_fold');
                console.log(elems[i].style.display)
            }
        }
    }

    return (
 
    <div className="detailWrapper_comment">

        {Comments.length > 0 && 
            <div className="detailWrapper_comment__column">
                {Comments.map((item, idx)=>(
                    <div className='detailWrapper_comment__contents' key={idx}>
                        <div className="detailWrapper_comment_creator">
                                <div>{item.creator.name}</div>
                                <div>{item.createdAt.split("T")[0]}</div>
                        </div>
                        <div className="detailWrapper_comment_reply">
                            <div>{item.content}</div>
                            <button onClick={handleClick} id={idx}>답글</button>
                        </div>
                        <div className='toggle' id={idx}>
                            <div className="detailWrapper_comment__column">
                                <textarea 
                                    value={Content}
                                    placeholder="답글을 달아주세요." 
                                    onChange={handleContent}
                                />
                                <button onClick={handleSubmit}>작성</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        }

        <div className="detailWrapper_comment__column">
            <textarea 
                value={Content} 
                placeholder="덧글을 달아주세요." 
                onChange={handleContent}
            />
            <button onClick={handleSubmit}>작성</button>
        </div>
    </div>

    )
}

export default withRouter(Comment);
