import React, {useEffect, useState} from 'react';
import {Table} from "react-bootstrap";
import {Lock, Trash, Unlock} from "react-bootstrap-icons";
import {observer} from "mobx-react-lite";
import {blockAll, changeUserStatus, removeAll, removeRow} from "../http/userAPI";

const EditableTable = observer(({columns, rows, actions}) => {
    const [rowsState, setRowsState] = useState(rows);
    const [statusState, setStatusState] = useState(rows);

    useEffect(() => {
        setRowsState(rows);
    }, [rows]);

    useEffect(() => {
        setStatusState(rows);
    }, [rows]);

    const handleRemoveRow = async (rowID) => {
        await removeRow(rowID);
        const newData = rowsState.filter(row => {
            return row.id !== rowID ? row : null
        });
        setRowsState(newData);
    }

    const handleRemoveAll = async () => {
        await removeAll();
        const newData = rowsState.filter(()=> {
            return null
        });
        setRowsState(newData);
    }

    const handleChangeUserStatus = async (rowID) => {
        const updatedRows = rowsState.map(row => {
            if (row.id === rowID) {
                return {
                    ...row,
                    status: row.status === "Active" ? "Block" : "Active",
                    last_login_date: row.last_login_date,
                };
            }
            return row;
        });
        setRowsState(updatedRows);
        const newData = statusState.filter(row => {
            return row.status === "Active" ? "Block" : "Active"
        });
        setStatusState(newData);
        await changeUserStatus(rowID);
    }

    const handleBlockAll = async () => {
        const updatedRows = rowsState.map(row => {
                return {
                    ...row,
                    status: "Block"
                };
        });
        setRowsState(updatedRows);
        const newData = statusState.filter(()=> {
            return "Block";
        });
        setStatusState(newData);
        await blockAll();
    }



    return (
        <Table striped bordered hover>
            <thead>
            {actions ?
                <tr>
                    {columns.map((column) => {
                        return <th key={column.field}>{column.fieldName}</th>
                    })}
                    <th>
                        <button onClick={() => handleRemoveAll()} className='custom-table__action-btn'>
                            <Trash/>
                        </button>
                        <button onClick={() => handleBlockAll()}
                                className='custom-table__action-btn ms-3'>
                            <Lock/>
                        </button>
                    </th>
                </tr>
                :
                <tr>
                    {columns.map((column) => {
                        return <th key={column.field}>{column.fieldName}</th>
                    })}
                </tr>
            }
            </thead>
            <tbody>
            {rowsState.map((row) => {
                return <tr key={row.id}>
                    <td>
                        {row.id}
                    </td>
                    <td>
                        {row.name}
                    </td>
                    <td>
                        {row.email}
                    </td>
                    <td>
                        {row.registration_date}
                    </td>
                    <td>
                        {row.last_login_date}
                    </td>
                    <td>
                        {row.status}
                    </td>
                    {actions ?
                        <td>
                            <button onClick={() => handleRemoveRow(row.id)} className='custom-table__action-btn'>
                                <Trash/>
                            </button>
                            {row.status === "Active" ?
                                <button onClick={() => handleChangeUserStatus(row.id)}
                                        className='custom-table__action-btn ms-3'>
                                    <Lock/>
                                </button>
                                :
                                <button onClick={() => handleChangeUserStatus(row.id)}
                                        className='custom-table__action-btn ms-3'>
                                    <Unlock/>
                                </button>}
                        </td>
                        :
                        <div></div>
                    }
                </tr>
            })}
            </tbody>
        </Table>
    );
});

export default EditableTable;

