import React, {useContext} from 'react';
import {Context} from "../index";
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {NavLink, useNavigate} from "react-router-dom";
import {LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE} from "../utils/consts";
import {observer} from "mobx-react-lite";
import {$authHost} from "../http";

const NavBar = observer(() => {
    const {user} = useContext(Context);
    const navigate = useNavigate();
    function handleClickAuthorization() {
        navigate(LOGIN_ROUTE);
    }
    function handleClickRegistration() {
        navigate(REGISTRATION_ROUTE);
    }

    const logOut = () => {
        user.setUser({});
        user.setIsAuth(false);
    }

    return (
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
                <NavLink style={{color: 'white'}} to={MAIN_ROUTE}>Home</NavLink>
                {user.isAuth ?
                    <Nav className="ml-auto" style={{color: 'white'}}>
                        <Button
                            variant={"outline-danger"}
                            className={"m-lg-1"}
                        >
                            You're logged in
                        </Button>
                        <Button
                            variant={"outline-danger"}
                            className={"m-lg-1"}
                            onClick={() => logOut()}
                        >
                            Sign out
                        </Button>
                    </Nav>
                    :
                    <Nav className="ml-auto" style={{color: 'white'}}>
                        <Button
                            variant={"outline-danger"}
                            className={"m-lg-1"}
                            onClick={handleClickAuthorization}
                        >
                            Authorization
                        </Button>
                        <Button
                            variant={"outline-danger"}
                            className={"m-lg-1"}
                            onClick={handleClickRegistration}
                        >
                            Registration
                        </Button>
                    </Nav>
                }
            </Container>
        </Navbar>
    )
});

export default NavBar;