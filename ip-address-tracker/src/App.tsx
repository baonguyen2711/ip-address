import { Route, Routes } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import IpAddress from './components/IpAddress'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/*' element={<IpAddress />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App
