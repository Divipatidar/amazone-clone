import React, { useEffect } from "react";
import './App.css';
import Header from'./Header';
import Home from "./Home"; 
import { BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";
import Checkout from "./Checkout";
import Login from "./Login";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";
import Payment from "./Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const promise=loadStripe("pk_test_51LrP30SB4nFwNrSIfbaFVg9Cr0IlyigCRJ3XIoBEtFbzpVXFe0EfUxhyek1mB5x2rm6VCwpVpyjsJB1zzwJGm7ho00hroGQRqz");

function App() {
  const [{}, dispatch] = useStateValue();

  useEffect(() => {

    auth.onAuthStateChanged((authuser) => {
      console.log("The user is  >>> ", authuser);

      if (authuser) {

        dispatch({
          type: "Set_user",
          user: authuser,
        });
      } else {
        
        dispatch({
          type: "Set_user",
          user: null,
        });
      }
    });
  }, []);
  return (
    <Router>
    <div className="app">
        
        <Switch>
       
        <Route  exact path="/login">
            <Login />
        </Route>
        <Route  exact path="/checkout">
            <Header />
            <Checkout />
        </Route>
        <Route  exact path="/payment">
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
    
        </Route>
        <Route  exact path="/" component={<Home/>}>
            <Header />
            <Home />
        </Route> 
        
        </Switch>
       
    </div>
    </Router>
   
  );
}

export default App;
