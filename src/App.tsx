import Playground from "./view/playground/index"
import './App.css'
import TopBar from "./layout/TopBar/TopBar"
import MyProfile from "./view/myProfile/MyProfile"

function App() {

  return (
    <>
    <div className="container">
      {/* <Playground /> 
      <TopBar updateDate="12/01/2023"/> */}
      <MyProfile/>
    </div>
    </>
  )
}

export default App
