import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getAllPosts, } from "../../services/postService.js"
import { deleteThePost } from "../../services/postService.js"
import { Link } from "react-router-dom"


export const UserPosts = ({currentUser}) => {
    const [showFilteredPosts, setShowFilteredPosts] = useState([])
    const [allPosts, setAllPosts] = useState([])
    const { userId } = useParams()

    const getNewPosts = () => {
        getAllPosts().then((postsArr)=>{
            setAllPosts(postsArr)
        })
    }



    useEffect(()=>{
        if (currentUser){
            getAllPosts().then(postArray=>{
                const userPosts = postArray.filter(post=>post.userId===currentUser.id)
                setShowFilteredPosts(userPosts)
            })
        }
    }, [currentUser, allPosts])

 const deletePost = (post) => {
    return deleteThePost(post)
 }
    

    return (
        <>
        <h2 className="myPost-title">My Posts</h2>
        
        {showFilteredPosts.length > 0 ? (
            showFilteredPosts.map(post=>(
                <div className="userPosts"><Link to={`/posts/${post.id}`}><div  key={post.id}>{post.title}</div></Link><input className="fa-solid fa-trash-can" type="radio" onClick={()=>{deletePost(post).then(()=> {getNewPosts()})}}></input>
                </div>
            ))
        ):(
            <p>No posts found for the current user.</p>
        )} 
        </>
    )
}