import { useEffect, useState } from "react"
import { Route, Routes, Outlet } from "react-router-dom"
import { PostList } from "../components/Posts/PostList.js"
import { NavBar } from "../components/nav/NavBar.js"
import { PostDetails } from "../components/Posts/PostDetails.js"

import { AddPost } from "../components/Posts/NewPost.js"
import { UserPosts } from "../components/Users/UserPosts.js"

export const ApplicationViews = () => {
    const [currentUser, setCurrentUser] = useState({})



useEffect(()=>{
    const localLearningUser = localStorage.getItem("learning_user")
    const learningUserObject = JSON.parse(localLearningUser)

    setCurrentUser(learningUserObject)
},[])


return (
    <Routes>
        <Route
      path="/"
      element={
        <>
          <NavBar />
          <Outlet />
        </>
      }
      >
        <Route index element={<PostList currentUser={currentUser}/>} />
        <Route path="posts" element={<PostList currentUser={currentUser}/>} />
        <Route path="userPosts" element={<UserPosts currentUser={currentUser} />} />
        <Route path="posts/:postId" element={<PostDetails  currentUser={currentUser}/>} />

        <Route path="posts/NewPost" element={<AddPost />} />
        </Route>
        
    </Routes>
)


}