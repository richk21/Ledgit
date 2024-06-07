import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Posts from './Components/Post/Posts';

function App() {
  return (
    <>
    <Navbar/>
    <div className="AppContainer">
      <Posts />
    </div>
    </>
  );
}

export default App;
