import React from 'react'
import styled from 'styled-components'
import avatar from '../img/avatar.png'
import { menuItems } from '../utils/menuItems';
import { signout } from '../utils/Icons';
import { useNavigate } from 'react-router-dom';

export default function Navigation(props) {
    const navigate=useNavigate();
  const handleSignOut = () => {
    // setActive(1)
    console.log("clicked signOut") ; 
    console.log(props.setIsLoggedIn) ; 
    
    localStorage.removeItem("name");
    props.setIsLoggedIn(false);

    navigate("/") ; 
  }
  return (
    <NavStyled>
        <div className="user-con">
                <img src={avatar} alt="" />
                <div className="text">
                    <h2>{localStorage.getItem("name")}</h2>
                    <p>Your Money</p>
                </div>
        </div>
        <ul className="menu-items">
                {menuItems.map((item) => {
                    return <li
                        key={item.id}
                        onClick={() => props.setActive(item.id)}
                        className={props.active === item.id? 'active':''}
                    >
                        {item.icon}
                        <span>{item.title}</span>
                    </li>
                })}
            </ul>

            
       
            <button className="bottom-nav" onClick={handleSignOut}>
                {signout} Sign Out 
            </button>
           
        
    </NavStyled>
  )
}


const NavStyled = styled.nav`
    padding: 1.5rem 1rem;
    width: 20vw;
    height: 100%;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 1.7rem;
    .user-con{
        height: 15vh;
        display: flex;
        align-items: center;
        gap: 1rem;
        img{
            width: 90px;
            height: 90px;
            border-radius: 50%;
            object-fit: cover;
            background: #fcf6f9;
            border: 2px solid #FFFFFF;
            padding: .2rem;
            box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.06);
        }
        h2{
            color: rgba(34, 34, 96, 1);
        }
        p{
            color: rgba(34, 34, 96, .6);
        }
    }

    .menu-items{
        flex: 1;
        display: flex;
        flex-direction: column;
        li{
            display: grid;
            grid-template-columns: 40px auto;
            align-items: center;
            margin: .6rem 0;
            font-weight: 500;
            cursor: pointer;
            transition: all .4s ease-in-out;
            color: rgba(34, 34, 96, .6);
            padding-left: 1rem;
            position: relative;
            i{
                color: rgba(34, 34, 96, 0.6);
                font-size: 1.2rem;
                transition: all .4s ease-in-out;
            }
        }
    }

    .active{
        color: rgba(34, 34, 96, 1) !important;
        i{
            color: rgba(34, 34, 96, 1) !important;
        }
        &::before{
            content: "";
            position: absolute;
            left: 0;
            top: 0;
            width: 4px;
            height: 100%;
            background: #222260;
            border-radius: 0 10px 10px 0;
        }
    }
    .bottom-nav{
        cursor: pointer;
        padding: 7px;
        background-color: #fcf6f9;
        font-size: large;
        border: 0px solid ;
    }
    .bottom-nav:active{
        color: black;
    }
    
`;