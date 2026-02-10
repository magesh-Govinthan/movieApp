
import { Route, Routes } from "react-router-dom"
import Home from "./Pages/Home"
import MovieDetail from "./Pages/MovieDetail"


function App() {
 

  return (
  
<div>
  <Routes>
<Route index element={<Home/>}/>
<Route path='movie' element={<MovieDetail/>}/>
 </Routes>
  {/* <Home/> */}
</div>
       
   
 
      
      
  
  )
}

export default App
