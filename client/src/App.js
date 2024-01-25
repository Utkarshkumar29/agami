import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Register from './components/register';
import HomePage from './pages/homePage';
import Staff from './components/staff';
import StaffDashboard from './pages/staffDashboard';
import Login from './components/login';

function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Register/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/staffLogin' element={<Staff/>}/>
                <Route path='/staffLogin/:id' element={<Staff/>}/>
                <Route path='/staff' element={<Staff/>}/>
                <Route path='/home' element={<HomePage/>}/>
                <Route path='/staffDashboard' element={<StaffDashboard/>}/>
            </Routes>
        </Router>   
    )
}

export default App;


{/*
Create a shipping system that should allow crud operation for staff and let the user specify the time and days of operations for the staff. The system should automatically show the list of staff available for delivery of goods based on the day and time entered.
*/}