// import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/argon-design-system-react.min.css';
// import "./assets/css/blk-design-system-react.css";

import { useEffect } from 'react';
import './App.css';
import AppNavbar from './components/AppNavbar';
import ShoppingList from './components/ShoppingList';
import Footer from './components/Footer'
// import Charts from './components/Charts'

import { Provider } from 'react-redux';
import store from './redux';

import { loadUser } from './redux/actions/authActions';
import Chart from './components/Charts';

function App() {
   useEffect(() => {
      store.dispatch(loadUser());
   }, []);

   return (
      <div className="App">
         <Provider store={store}>
            <AppNavbar />
            {/* <Charts/> */}
            <ShoppingList />
            {/* <Footer /> */}
         
         </Provider>
      </div>
   );
}

export default App;
