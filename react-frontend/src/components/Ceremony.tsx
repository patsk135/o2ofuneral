import React, { useContext, useEffect, useState } from 'react';

import API from '../utils/API';
import { Context } from '../Store';
// @ts-ignore
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import ErrorModal from './ErrorModal/ErrorModal';

const Ceremony = () => {
    const { state, dispatch } = useContext(Context) as any;

    const [ceremonyDetail, setCeremonyDetail] = useState({
        name: '',
        lastname: '',
        startDate: new Date(),
        endDate: new Date(),
        location: '',
        description: ''
    });

    // const [date, setDate] = useState([new Date(), new Date()]);

    useEffect(() => {
        // console.log(state.user.id);
        API.get('/ceremony/detail', { params: { id: state.user.id } })
            .then(({ data }) => {
                console.log(data);
                setCeremonyDetail(data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const onChangeDate = (date: any) => {
        console.log(date);
        setCeremonyDetail(old => {
            return {
                ...old,
                startDate: date[0],
                endDate: date[1]
            };
        });
    };

    const onSubmit = () => {
        console.log(ceremonyDetail);
        API.post(
            '/ceremony/update',
            {
                ceremonyDetail
            },
            {
                headers: {
                    Authorization: `Bearer ${state.token}`
                }
            }
        )
            .then(async ({ data }) => {
                console.log(data);
                dispatch({
                    type: 'showError',
                    payload: 'Successfully Updated'
                });
            })
            .catch(err => {
                console.log(err);
            });
    };

    return (
        <div>
            <div
                className={
                    !state.isError ? 'auth-page' : 'auth-page avoid-clicks'
                }
                style={{ height: '80vh', width: '80vw', paddingLeft: '10vw' }}
            >
                <form
                    style={{ display: 'flex', flexDirection: 'column' }}
                    onSubmit={e => {
                        e.preventDefault();
                        onSubmit();
                    }}
                >
                    <div style={{ textAlign: 'left', paddingBottom: '1vh' }}>
                        <b>The Death:</b>
                        <div style={{ display: 'flex' }}>
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Name"
                                value={ceremonyDetail.name}
                                onChange={e => {
                                    setCeremonyDetail(old => {
                                        return {
                                            ...old,
                                            name: e.target.value
                                        };
                                    });
                                }}
                            ></input>
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Lastname"
                                value={ceremonyDetail.lastname}
                                onChange={e => {
                                    setCeremonyDetail(old => {
                                        return {
                                            ...old,
                                            lastname: e.target.value
                                        };
                                    });
                                }}
                            ></input>
                        </div>
                    </div>
                    <div style={{ textAlign: 'left', paddingBottom: '1vh' }}>
                        <b style={{ paddingRight: '1vw' }}>Ceremony Date:</b>
                        <DateRangePicker
                            onChange={onChangeDate}
                            value={[
                                ceremonyDetail.startDate,
                                ceremonyDetail.endDate
                            ]}
                            locale="th-TH"
                        />
                    </div>
                    <div style={{ textAlign: 'left', paddingBottom: '1vh' }}>
                        <b>Location:</b>
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Place"
                            value={ceremonyDetail.location}
                            onChange={e => {
                                setCeremonyDetail(old => {
                                    return {
                                        ...old,
                                        location: e.target.value
                                    };
                                });
                            }}
                        ></input>
                    </div>
                    <div style={{ textAlign: 'left', paddingBottom: '1vh' }}>
                        <b>Description:</b>
                        <textarea
                            className="form-control"
                            rows={10}
                            value={ceremonyDetail.description}
                            onChange={e => {
                                setCeremonyDetail(old => {
                                    return {
                                        ...old,
                                        description: e.target.value
                                    };
                                });
                            }}
                        ></textarea>
                    </div>
                    <button
                        className="btn btn-lg btn-primary pull-xs-right"
                        type="submit"
                    >
                        Submit
                    </button>
                </form>
                <div style={{ textAlign: 'left', paddingTop: '2vh' }}>
                    <b>
                        Event Link:
                        <a
                            href={
                                'http://192.168.1.36:3000/streaming/' +
                                state.user.id
                            }
                            style={{ paddingLeft: '0.5vw' }}
                        >
                            http://192.168.1.36:3000/streaming/
                            {state.user.id}
                        </a>
                    </b>
                </div>
            </div>
            {state.isError && <ErrorModal></ErrorModal>}
        </div>
    );
};

export default Ceremony;
