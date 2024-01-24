export const getAllPosts = () => {
    return fetch(`http://localhost:8088/posts`).then(res => res.json())
}

export const getPostByPostId = (postId) => {
    return fetch(`http://localhost:8088/posts/${postId}?_expand=user&_expand=topic`).then((res)=>res.json())
}


export const getPostByUserId = (userId) => {
    return fetch(`http://localhost:8088/posts/${userId}`).then((res)=>res.json())
}


export const updatePost = (post) => {
    return fetch(`http://localhost:8088/posts/${post.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application.json",
        },
        body: JSON.stringify(post)
    })
}

export const deleteThePost = (post) => {
    const deleteState = {
        "id": post.id,
        "title": post.title,
        "userId": post.userId,
        "body": post.body,
        "date": post.date,
        "topicId": post.topicId
    }
    return fetch(`http://localhost:8088/posts/${post.id}`,{
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(deleteState)
    })
}

export const savePost = (newPostObject) => {
    const postOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(newPostObject)
    }
    return fetch("http://localhost:8088/posts", postOptions)
}