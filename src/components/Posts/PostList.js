import { useEffect, useState } from "react"
import { getAllPosts } from "../../services/postService.js"
import { getAllTopics } from "../../services/topicService.js"
import { Link } from "react-router-dom"
import "./Posts.css"


export const PostList = ({currentUser}) => {
    const [allPosts, setAllPosts] = useState([])
    const [showFilteredPosts, setShowFilteredPosts] = useState([])
    const [topics, setTopics] = useState([])
    const [filter, setFilter] = useState('')
    const [currentPost, setCurrentPost]=useState({})

useEffect(()=>{
    getAllPosts().then(postArray=>{
        setAllPosts(postArray)
        setShowFilteredPosts(postArray)
    })
},[])

useEffect(()=>{
    getAllTopics().then(topicsArray=>{
        setTopics(topicsArray)
    })
},[])

useEffect(()=>{
    const filterPost = allPosts.filter(post => post.topicId===filter)
       if (filterPost.length===0) {
        setShowFilteredPosts(allPosts)
       } else {
        setShowFilteredPosts(filterPost)}
},[filter])

useEffect(()=>{
    const localPost = localStorage.getItem("clicked-post")
    const clickedPostObject = JSON.parse(localPost)

    setCurrentPost(clickedPostObject)
},[])


    return (
        
        <div>
            <div>
                <select className="topic-menu" onChange={e=>setFilter(parseInt((e.target.value)))}>
                    <option value="">Choose a topic filter</option>
                    {topics.map(topic=>{
                    return <><option   value ={topic.id} key={topic.id}>{topic.name}</option></>;
                })}
                </select>

            </div>
            <article className="posts-container">
                {showFilteredPosts.map(post => {
                    return (<Link to={`/posts/${post.id}`}>
                        <div className="post" key={post.id}>
                      <div className="post-title" key={post.id}>{post.title}</div> 
                       
                       </div>
                       </Link>
                    )
                })}
            </article>
            
        </div>
        
    )
}







