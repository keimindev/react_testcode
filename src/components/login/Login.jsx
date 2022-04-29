import { useState } from "react";
import axios from 'axios';

const Login = () =>{
  const [username, setUsername] = useState("")
  const [pw, setPw] = useState("")
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState({})

  const handleClick = async (e) =>{
    e.preventDefault();
    setLoading(true)
    try{
      const { data } = await axios.get("https://jsonplaceholder.typicode.com/users/1");
      setUser(data)
    }catch{
      setError(true)
    }
    setLoading(false)
  }
  
  return (
    <div className="container">
      <span className='user'>{user.name}</span>
      <form>
        <input type="text" placeholder="username" value={username} onChange={e => setUsername(e.target.value)}/>
        <input type="password" placeholder="password" value={pw} onChange={e => setPw(e.target.value)}/>
        <button disabled={!username || !pw ? true: false } onClick={handleClick}>{loading ? "please wait" : "Login"}</button>
        <span data-testid="error" style={{visibility : error ? "visible" : "hidden"}}>Something went wrong!</span>
      </form>
    </div>
  )
}

export default Login;