import React, {use, useState} from 'react'

function Filters() {
    const [posts, setPosts] = useState([]);
    const [Loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        fetch('https://localhost:7193')
        .then(response => response.json())
        .then((json) => setPosts(json));
        setLoading(false);
    },[]);

    function getPost(){
        setLoading(true);
        setTimeout( () =>   {
                                setLoading(false);
                            }, 2000);
                    fetch('https://localhost:7193')
        .then(response => response.json())
        .then((json) => setData(json));
    }

    return (
        <>
        <h1 className="title">Http Request</h1>
        <button className="btn" onClick={getPost}>Get Post</button>
        
                Loading ? (<h2 className="mt2">LOADING...</h2>):
                    (
                        <ul>{data.map((post)=>(
                                            <li className='alert alert-info' key ={post.id}>
                                                <div className="mr1">{post.id}</div>
                                                <h3>{post.title}</h3>
                                                <p className="text-grey">{post.body}</p>
                                            </li>
                                            )
                                    )
                                    }
                        </ul>
                    )                
        </>
    )
}
