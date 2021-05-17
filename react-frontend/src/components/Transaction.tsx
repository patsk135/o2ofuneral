import React, { useContext, useEffect, useState } from 'react';

import API from '../utils/API';
import { Context } from '../Store';
import ErrorModal from './ErrorModal/ErrorModal';
import { Table } from 'react-bootstrap';

interface ITransaction {
    id: string;
    user_id: string;
    donator: string;
    condolence_word: string;
    amount: string;
    reference: string;
}

const Transaction = () => {
    const { state, dispatch } = useContext(Context) as any;
    const [transactions, setTransactions] = useState(Array<ITransaction>(0));

    useEffect(() => {
        API.get('/donation/transactions', {
            headers: {
                Authorization: `Bearer ${state.token}`
            }
        }).then(({ data }) => {
            console.log(data);
            setTransactions(data);
        });
    }, []);

    const requestForWithdraw = () => {
        API.get('/donation/withdraw', {
            headers: {
                Authorization: `Bearer ${state.token}`
            }
        }).then(({ data }) => {
            console.log(data);
            dispatch({
                type: 'showError',
                payload:
                    'Successfully sent withdrawal request. Wait for reviewing.'
            });
        });
    };

    return (
        <div>
            <div className={state.isError && 'avoid-clicks'}>
                <Table>
                    <thead>
                        <tr>
                            <th style={{ textAlign: 'center' }}>
                                <a>#</a>
                            </th>
                            <th style={{ textAlign: 'center' }}>
                                <a>TransactionID</a>
                            </th>
                            <th style={{ textAlign: 'center' }}>
                                <a>From</a>
                            </th>
                            <th style={{ textAlign: 'center' }}>
                                <a>Amount (Baht)</a>
                            </th>
                            <th style={{ textAlign: 'center' }}>
                                <a>Condolence Word</a>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((each, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{each.reference}</td>
                                    <td>{each.donator}</td>
                                    <td>{each.amount}</td>
                                    <td>{each.condolence_word}</td>
                                </tr>
                            );
                        })}
                        <tr>
                            <td>
                                <b>Sum</b>
                            </td>
                            <td>-</td>
                            <td>-</td>
                            <td>
                                <b>
                                    {transactions
                                        .reduce(
                                            (a, b) => a + parseFloat(b.amount),
                                            0
                                        )
                                        .toFixed(2)}
                                </b>
                            </td>
                            <td>-</td>
                        </tr>
                    </tbody>
                </Table>
                <button
                    className="btn btn-lg btn-primary"
                    onClick={requestForWithdraw}
                >
                    Withdraw Money
                </button>
            </div>
            {state.isError && <ErrorModal></ErrorModal>}
        </div>
    );
};

export default Transaction;
