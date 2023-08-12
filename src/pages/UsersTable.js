import React, {useContext, useEffect, useState} from 'react';
import EditableTable from "../components/EditableTable.js";
import {$authHost} from "../http";
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const UsersTable = observer(() => {
    const {user} = useContext(Context);
    const [rows, setRows] = useState([]);

    function formatDateString(dateString) {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour12: false,
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
        };
        return new Date(dateString).toLocaleDateString('en-US', options).replace('at', '').trim();
    }

    useEffect(() => {
        const fetchAll = async () => {
            try {
                const {data} = await $authHost.get('api/user/');
                data.map(row => {
                    row.registration_date = formatDateString(row.registration_date);
                    row.last_login_date = formatDateString(row.last_login_date);
                })
                setRows(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchAll().then(r => r);
    }, []);

    const columns = [
        {field: 'id', fieldName: '#'},
        {field: 'name', fieldName: 'Name'},
        {field: 'email', fieldName: 'email'},
        {field: 'registration_date', fieldName: 'Registration time'},
        {field: 'last_login_date', fieldName: 'Last login date'},
        {field: 'status', fieldName: 'User\'s status'},
    ];

    return (
        <>
            <EditableTable columns={columns} rows={rows} actions={user.isAuth}/>
        </>
    );
});

export default UsersTable;
