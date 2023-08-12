import React from "react";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import {observer} from "mobx-react-lite";
import NavBar from "./components/NavBar.js";
import UsersTable from "./pages/UsersTable";

const App = observer(() => {

    return (
        <BrowserRouter>
            <NavBar/>
            <AppRouter/>
            <UsersTable/>
        </BrowserRouter>
    );
});

export default App;
