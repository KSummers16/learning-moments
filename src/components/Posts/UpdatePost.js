import { getPostByPostId } from "../../services/postService.js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { updatePost } from "../../services/postService.js";



export const PostForm = ({currentPost}) =>{
    const [post, setPost]= useState([])


    useEffect(()=>{
        getPostByPostId(currentPost).then((data)=>{
            const postObj = data[0]
            setPost(postObj)
        })
    },[currentPost])


const navigate = useNavigate()


const handleSave = (event)=> {
    event.preventDefault()


    const editedPost = {
        id: post.id,
        title: post.title,
        userId: post.userId,
        body: post.body,
        date: post.date,
        topicId: post.topicId
    }
    updatePost(editedPost).then(()=>{
        navigate(`/posts/${post.id}`)
    })
}

return (
    <form className="post">
        <h2>Update Post</h2>
        <fieldset>
            <div className="form-group">
                <input 
                type="text"
                // value={post.title}
                onChange={(e)=>{
                const copy = {...post}
                copy.title = e.target.value
                setPost(copy)
                } }
                required/>
            </div>
            <div className="form-group">
                <input 
                type="text"
                // value={post.body}
                onChange={(e)=>{
                const copy = {...post}
                copy.body = e.target.value
                setPost(copy)
                } }
                required/>
            </div>
        </fieldset>
        <div>
            <button onClick={handleSave}>Save Post</button>
        </div>
    </form>
)


}