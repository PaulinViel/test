import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from "./Home";
import Product from "./ProductPage";
import './App.css';

const App = () => {
    return (
        <Router>
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route path='/product/:id' component={Product}/>
            </Switch>
        </Router>
    );
}

export default App;
