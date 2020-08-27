import React, { useContext } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

//import Layout from './Layout';
import Home from './pages/Home';
import Day from './pages/Day';
import NotFound from './pages/NotFound';

export default function App() {
    return (<BrowserRouter>
  
	        <Switch>
	        	<Route exact path="/">
	        		<Home />
	        	</Route>
	        	<Route path="/:day">
	        		<Day />
	        	</Route>
	        	
	        	<Route path="*">
	        		<NotFound />
	        	</Route>
	          	
	          
	        </Switch>
      
    </BrowserRouter>)
}
