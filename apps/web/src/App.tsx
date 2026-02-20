import './App.css'
import Landing2Views from '@/Landing2Views'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppShell from '@/layout/AppShell'
import Landing from '@/features/landing/Landing'
import Events from '@/features/events/pages/Events'
import EventAccess from '@/features/events/pages/EventAccess'
import { div } from 'framer-motion/client'
import EventLayout from '@/layout/EventLayout'

/*function App(){
  return <Landing2Views/>
}*/

function App(){

  return(
    <BrowserRouter>
      <Routes>
        
        <Route path='/' element={<AppShell/>}>
          <Route index element={<Landing/>} />
          <Route path='2views' element={<Landing2Views/>} />

          <Route path="events">
            <Route index element={<Events/>}/>
            <Route path=":eventId" element={<EventLayout/>}>
              <Route path='access' element={<EventAccess/>}/>
              <Route path='tickets' element={ <section></section> } />
              <Route path='2views' element={<section></section>} />
            </Route>

          </Route>
        </Route>

      </Routes>
  </BrowserRouter>
  );
  
}

export default App;

/*function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App*/