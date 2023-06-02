import { Route, Routes } from 'react-router';
import IdAddress from './component/IdAddress';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/address" element={<IdAddress />} />
        </Routes>
    </BrowserRouter>
  );
}
export default App;