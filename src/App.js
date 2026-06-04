import Header from './components/Layouts/header';
import Product from './components/productsList/Products';
import SubHeader from './components/Layouts/subHeader';
import { BrowserRouter, Routes, Route,useNavigate } from 'react-router-dom';
import AuthIndex from './components/Auth';
import { useEffect } from "react";
import { checkIsLoggedIn } from "./actions/auth";
import { useDispatch, useSelector } from "react-redux";

const App = () => {

  const dispatch = useDispatch()
  const authState = useSelector(state => state.auth)

  useEffect(() => {
    dispatch(checkIsLoggedIn(() => {}))
  }, [])

  const RedirectToHome =() => {
    const navigate = useNavigate();
    useEffect(() => {
        navigate('/');
    }, [navigate]);

    return null;
  }

  return (
    <div>
      <BrowserRouter>
        <Header></Header>
        <SubHeader></SubHeader>
        <Routes>
          { !authState.idToken && <Route path="/:type" element={<AuthIndex />} />}
          <Route path="/:category?" element={<Product></Product>} />
          <Route path="/" element={<Product />} />
          <Route path="*" element={<h1>Not Found!!</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
    
  );
}

export default App;