import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getAllTopics } from "../../services/topicService.js"
import { savePost } from "../../services/postService.js"


export const AddPost = () => {
    const navigate = useNavigate()
    const [topics, setTopics] = useState([])
    const [filter, setFilter] = useState('')

    const [post, setPost] = useState({
            title: "",
            userId: null ,
            body: "",
            date: "",
            topicId: ""
    })

    useEffect(()=>{
        getAllTopics().then(topicsArray=>{
            setTopics(topicsArray)
        })
    },[])

    const handleSubmit = (event)=>{
        event.preventDefault()

        savePost(post).then(()=>{
            navigate("/")
        })
    }

 
    const newPostMade = (evt) => {
        const { id, value } = evt.target;
      
        // If the input is userId, parse it as a number
        const parsedValue = id === 'userId' ? parseInt(value, 10) : value.trim();
      
        // If the input is topicId, set it directly
        setPost((prevPost) => ({
          ...prevPost,
          [id]: id === 'topicId' ? parseInt(value, 10) : parsedValue,
        }));
      };
      



return (<>
  <form className="form-new-post" onSubmit={handleSubmit}>
    <h1>New Post</h1>
    <fieldset>
        <div>
            <input
            onChange={newPostMade}
            type="text"
            id="title"
            placeholder="Title of your Post"
            required
            autoFocus />
        </div>
    </fieldset>
    <fieldset>
        <div>
            <input
            onChange={newPostMade}
            type="text"
            id="userId"
            placeholder="What is your User Id?"
            required
             />
        </div>
    </fieldset>
    <fieldset>
        <div>
            <input
            onChange={newPostMade}
            type="text"
            id="body"
            placeholder="Write your Post"
            required
            />
        </div>
    </fieldset>
    <fieldset>
        <div>
        <select className="topic-menu" onChange={(e) => newPostMade({ target: { id: 'topicId', value: e.target.value } })}>
                    <option value="">Choose a topic</option>
                    {topics.map(topic=>{
                    return <><option   value ={topic.id} key={topic.id}>{topic.name}</option></>;
                })}
                </select>
        </div>
    </fieldset>
    <fieldset>
        <div>
            <button className="newPostBtn" type="submit">Submit</button>
        </div>
    </fieldset>
  </form>
</>)

}