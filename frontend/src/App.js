import './App.css';
import{Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Create from './components/Create';
import NavBar from './components/NavBar';
import Edit from './components/Edit';
import Delete from './components/Delete';
import TableData from './components/TableData'
import Games from './components/Games'
import Download from './components/Download'
import Signup from './components/Signup';
import FirebaseAuth from './components/FirebaseAuth';
import Member from './components/Member';
import Forum from './components/Forum'
import CreateForum from './components/CreateForum';
import ThreadDetails from './components/ThreadDetails';
import Login from './components/Login';
import AdminPortal from './components/AdminPortal';
import GameList from './components/GameList';
import GameEdit from './components/GameEdit';
import GameDelete from './components/GameDelete';
import GameCreate from './components/GameCreate';


function App() {
  const myWidth = 200
  return (
    <div className="App">
     
      <NavBar 
        drawerWidth={myWidth}
        content = {
          <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/about" element={<About/>}/> 
          <Route path="/create" element={<Create/>}/>
          <Route path="/adminportal/edit/:id" element={<Edit/>}/>
          <Route path="/adminportal/delete/:id" element={<Delete/>}/>
          <Route path="/tabledata" element={<TableData/>}/>
          <Route path="/games" element={<Games/>}/>
          <Route path="/download" element={<Download/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/firebaseauth" element={<FirebaseAuth />} />
          <Route path="/member" element={<Member />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/forum/:id" element={<ThreadDetails />} />
          <Route path="/createforum" element={<CreateForum />} />
          <Route path="/login" element={<Login />} />
          <Route path="/adminportal" element={<AdminPortal/>} />
          <Route path="/gamelist" element={<GameList/>} />
          <Route path="/adminportal/gameedit/:id" element={<GameEdit/>} />
          <Route path="/adminportal/gamedelete/:id" element={<GameDelete/>} />
          <Route path="/gamecreate" element={<GameCreate/>} />


          
        </Routes>
        }
      />

      
    </div>
  );
}

export default App;
