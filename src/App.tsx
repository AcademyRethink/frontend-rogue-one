import Playground from "./view/playground/index"
import './App.css'
import TopBar from "./layout/TopBar/TopBar"

function App() {

  return (
    <>
    <div className="container">
      <Playground /> 
      <TopBar updateDate="12/01/2023"/>
    </div>
    </>
  )
}

export default App
