import './App.css';
import DragNDrop from './Components/drag-n-drop.Component';


function App() {
  
  // default state of data to initialize lists
  const data = [
    {listHeader: 'Back Log', cards:['Not happening', 'Not in a million years'] },
    {listHeader: 'To Do', cards:['Im Procrastinating on this one','And this one','And this one','And this one','And this one'] },
    {listHeader: 'In Progress', cards:['This was due last week','This is due today','Maybe this will get done on time'] },
    {listHeader: 'Complete', cards:['Has several bugs','Cant be bothered to fix this','Only god knows what this code does now'] }
  ]
  
  return (
    <div className="App">
    
        <div className="appHeader">
            <h1 className='appHeader'>Trello Clone </h1>
            <h5 className='appHeader'>with drag and drop</h5>
        </div>         
            <DragNDrop data={data} />
    </div>
  );
}

export default App;
