import logo from './logo.svg';
import './App.css';
import Parent from './component/parent';
import { Counter } from './features/counter/Counter';
function App() {
  return (
    <div className="App">
      <Parent />
      {/* <Counter /> */}
    </div>
  );
}

export default App;
