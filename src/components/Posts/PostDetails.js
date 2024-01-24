import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostByPostId } from "../../services/postService.js";
import { getAllUsers } from "../../services/userService.js";
import { Link } from "react-router-dom";
import "./Posts.css"


export const PostDetails = ({currentUser}) => {
    const [post, setPost] = useState({})
    const [postWriter, setPostWriter] = useState([])
    const [allUsers, setAllUsers] = useState([])
    
  
    

    const {postId} = useParams()
    
    useEffect(()=>{
        getPostByPostId(postId).then((dataArr)=>{
            setPost(dataArr)
        })

    },[postId])


    useEffect(()=>{
        getAllUsers().then(userArray=>{
            setAllUsers(userArray)
            
        })
    },[])


    

    const currentWriter = allUsers.find(user=> user.id === currentUser.id)

    useEffect(()=> {
        const foundUser=allUsers.find(
            (user)=> user.id === post.userId
        )
        setPostWriter(foundUser)
    },[allUsers])




    return (
        <section className="PostDetails">
             <section className="left-box">
                <h2 className="post-title" >{post.title}</h2>
                <div>Topic: {post.topic?.name}</div>
            </section>
            <div className="btn-container">{
                currentWriter===postWriter ? (
                    <Link to={`update-post/${post.id}`}><button>Edit Post</button></Link>
                ):("")
            }</div>
            <div className="btn-container">{
                currentWriter != postWriter ? (
                    <button>Like Post</button>
                ):("")
            }</div>
            <section className="right-box">
                <div className="author-info">
                <div >Written by: {post.user?.name}</div>
                <div>{post.date}</div>
                </div>
                <div className="post-body">{post.body}</div>
                
            </section>
        </section>
    )
}
