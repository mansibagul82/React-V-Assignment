import { useState, useEffect} from 'react'
import './App.css'
import { Spinner} from '@chakra-ui/react';
import PostItem from 'PostItem';


function App() {
  // usestate is async task
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  async function fetchData(){
    setIsLoading(true)
    try { 
      const data = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${page}`)

      // converts data
      const res = await data.json();

      // save in res
      setPosts(res)
      setIsLoading(false)
    } 
    catch (error) {
      setError(error)
      setIsLoading(false)
    }
 
  }

  if (isLoading) {
    return <Spinner/>
  }
  
  useEffect(()=> 
  {
    fetchData()
  },[page])

  useEffect(() => 
  {}, [posts])

  useEffect(() => {

  }, [page]);

//implements pagination.
  return (
    <>
      <PostItem posts={posts} />
      <div> 
        <button disabled = {page == 1? true : false} onClick = {() => {setPage(page-1);
                                  fetchData()
                                 }}>Prev</button>

        <button disabled = {page == 10? true : false}   onClick = {() => {setPage(page+1)
                                  fetchData()
                                  }}>Next</button>
      </div>
    </>
  )
}

export default App

