import {Routes, Route} from 'react-router-dom';

import About from '../pages/About';
import Auth from '../pages/Auth';

const AppRouter = () => {
    <Routes>
        <Route path='/about' element={<About/>} />
        <Route path='/login' element={<Auth/>} />
    </Routes>
}

export default AppRouter;