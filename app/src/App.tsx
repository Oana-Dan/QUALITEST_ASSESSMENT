import './App.css';
import AppRouter from './Router';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Header from './layout/Header';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Header/>
        <AppRouter />
      </Provider>
    </div>
  );
}

export default App;
