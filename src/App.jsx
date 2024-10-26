import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'

import Login from './pages/Login'
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { store } from './redux/store';




import Update from './pages/Update';
import Report from './pages/Report';
import PersistentDrawerLeft from './components/Main';
import NewLanding from './pages/NewLanding';

function App() {

  return (
    <Provider store={store}>
      <Toaster />
      <Router>
        {/* <div className=''>
          <SidePanel />
          <div className=''> */}
          {/* <PersistentDrawerLeft /> */}
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/landing" exact element={<NewLanding />} />
              {/* <Route path="/home" exact element={<Landing />} /> */}
              <Route path="/main" exact element={<PersistentDrawerLeft />} />
              <Route path="/Report" element={<Report />} />
              <Route path="/Update" element={<Update />} />
            </Routes>
          {/* </div>
        </div> */}
      </Router>
    </Provider>
  )
}

export default App
