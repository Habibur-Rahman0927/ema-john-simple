import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Review from './components/Review/Review';
import Invantory from './components/Invantory/Invantory';
import Notfound from './components/Notfound/Notfound';
import ProductDetails from './components/ProductDetails/ProductDetails';

function App() {
  return (
    <div>
      <Header></Header>
      <Router>
        <Switch>
          <Route path="/shop">
            <Shop></Shop>
          </Route>
          <Route path="/review">
            <Review></Review>
          </Route>
          <Route path="/invantory">
            <Invantory></Invantory>
          </Route>
          <Route exact path="/">
            <Shop></Shop>
          </Route>
          <Route path="/product/:produckey">
            <ProductDetails></ProductDetails>
          </Route>
          <Route path="/review">
            <Review></Review>
          </Route>
          <Route path="*">
            <Notfound></Notfound>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;