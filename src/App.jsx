import './App.css'
import Navbar from './components/Navbar'
import Manager from './components/Manager'
import Footer from './components/Footer'

function App() {
  return (
    <div className='no-scrollbar'>
     <Navbar/>
     <Manager/>
     <Footer/>
    </div>
  )
}

export default App
