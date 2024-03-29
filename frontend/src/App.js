import styled from "styled-components";
import bg from './img/bg(1).png';
import { MainLayout } from "./styles/Layouts";
import Orb from "./Components/Orb";
import Navigation from "./Components/Navigation";
import { useMemo, useState  ,useEffect} from "react";
import DashBoard from "./Components/DashBoard";
import Incomes from "./Components/Incomes";
import Expenses from "./Components/Expenses";
import { GlobalContextProvider } from "./context/GlobalContext";
import { useGlobalContext } from "./context/GlobalContext";
import ViewTransaction from "./Components/ViewTransaction";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";

export default function App() {
  const [active , setActive] = useState(1) ; 
  const [isloggedIn,setIsLoggedIn]=useState(false)
  const global = useGlobalContext() ; 
  const [username  , setUserName] = useState("");

  useEffect(() => {
    // Check if the user is logged in on component mount
    const storedName = localStorage.getItem('name');
    if (storedName) {
      setIsLoggedIn(true);
      setUserName(storedName);
    }
  }, []);

   const displayData = () => {
      switch(active){
        case 1:
          return <DashBoard />
        case 2:
          return <ViewTransaction />  
        case 3:
          return <Incomes />  
        case 4:
          return <Expenses  />
        default:
          return <DashBoard  />  
      }
   } 


  const orbMemo = useMemo(() => {
    return <Orb />
  }, [])
  
  return (
    <BrowserRouter>
    <GlobalContextProvider>
      <AppStyled className="App">
        {isloggedIn ? (
          <MainLayout>
            {orbMemo}
            <Navigation active={active} setActive={setActive} isloggedIn={isloggedIn}
                  setIsLoggedIn={setIsLoggedIn} />
            <main>{displayData()}</main>
          </MainLayout>
        ) : (
          <Routes>
            <Route
              path="/"
              element={
                <Login
                  isloggedIn={isloggedIn}
                  setIsLoggedIn={setIsLoggedIn}
                  username={username}
                  setUserName={setUserName}
                />
              }
            />
            <Route
              path="/signup"
              element={<Signup  username={username} setUserName={setUserName} setIsLoggedIn={setIsLoggedIn} isloggedIn={isloggedIn}/>}
            />
          </Routes>
        )}
      </AppStyled>
    </GlobalContextProvider>
  </BrowserRouter>

  );
}

const AppStyled = styled.div`
height: 100vh;
background-image: url(${bg});
position: relative;
main{
  flex: 1;
  background: rgba(252, 246, 249, 0.78);
  border: 3px solid #FFFFFF;
  backdrop-filter: blur(4.5px);
  border-radius: 32px;
  overflow-x: hidden;
  &::-webkit-scrollbar{
    width: 0;
  }
}
`;