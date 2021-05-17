import './index.css';

import React, { useEffect, useState } from 'react';

import API from '../../utils/API';
import qrcode from 'qrcode';
import useInterval from '../../utils/useInterval';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

export interface IDonationRouteParams {
    receiverId: string;
}

const Donation = () => {
    const [donationID, setDonationID] = useState('');
    const [amount, setAmount] = useState('');
    const [condolenceWord, setCondolenceWord] = useState('');
    const [from, setFrom] = useState('');
    const { receiverId } = useParams<IDonationRouteParams>();

    const [ceremonyDetail, setCeremonyDetail] = useState({
        name: '',
        lastname: '',
        startDate: new Date(),
        endDate: new Date(),
        location: '',
        description: ''
    });

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [isPolling, setIsPolling] = useState(false);

    const [qr, setQR] = useState('');

    useEffect(() => {
        // console.log(state.user.id);
        API.get('/ceremony/detail', { params: { id: receiverId } })
            .then(({ data }) => {
                console.log(data);
                setCeremonyDetail(data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    useInterval(
        () => {
            // Your custom logic here
            getTransaction();
        },
        // Delay in milliseconds or null to stop it
        isPolling ? 2000 : null
    );

    const getTransaction = () => {
        API.get('/donation/transaction', { params: { donationID } }).then(
            ({ data }) => {
                console.log(data);
                if (data === 'paid') {
                    setIsPolling(false);
                    setIsModalOpen(false);
                }
            }
        );
    };

    const donate = () => {
        const donationIDs = uuidv4().split('-');
        setDonationID(donationIDs[donationIDs.length - 1].toUpperCase());
        API.post('/payment/donate', {
            donationID: donationIDs[donationIDs.length - 1].toUpperCase(),
            amount: parseFloat(amount),
            condolenceWord,
            from,
            to: receiverId
        }).then(async ({ data }) => {
            const { qrRawData } = data;
            console.log(data);
            setQR(
                await qrcode.toDataURL(qrRawData, {
                    errorCorrectionLevel: 'H',
                    color: {
                        dark: '#000', // Blue dots
                        light: '#FFF' // Transparent background
                    }
                })
            );
            setIsModalOpen(true);
            setIsPolling(true);
        });
    };

    return (
        <div>
            <div style={{ height: '10vh' }}></div>
            <a style={{ fontSize: '3vh' }}>
                <b>The Death: </b>
                {ceremonyDetail.name + ' ' + ceremonyDetail.lastname}
            </a>
            <br />
            <a style={{ fontSize: '2vh' }}>
                <b>Ceremony Date: </b>
                {new Date(ceremonyDetail.startDate).toDateString() +
                    ' - ' +
                    new Date(ceremonyDetail.endDate).toDateString()}
            </a>
            <br />
            <a style={{ fontSize: '2vh' }}>
                <b>Location: </b>
                {ceremonyDetail.location}
            </a>
            <div
                className={
                    !isModalOpen
                        ? 'container page'
                        : 'container page avoid-clicks'
                }
            >
                <div className="row">
                    <div className="col-md-6 offset-md-3 col-xs-12">
                        <form
                            onSubmit={e => {
                                e.preventDefault();
                                donate();
                            }}
                        >
                            <fieldset>
                                <fieldset className="form-group">
                                    <input
                                        className="form-control form-control-lg"
                                        type="number"
                                        placeholder="Donation Amount (Baht)"
                                        value={amount}
                                        onChange={e =>
                                            setAmount(e.target.value)
                                        }
                                    ></input>
                                </fieldset>
                                <fieldset className="form-group">
                                    <textarea
                                        className="form-control form-control-lg"
                                        rows={10}
                                        placeholder="Condolence Words . . ."
                                        value={condolenceWord}
                                        onChange={e =>
                                            setCondolenceWord(e.target.value)
                                        }
                                    ></textarea>
                                </fieldset>
                                <fieldset className="form-group">
                                    <input
                                        className="form-control form-control-lg"
                                        type="text"
                                        placeholder="From"
                                        value={from}
                                        onChange={e => setFrom(e.target.value)}
                                    ></input>
                                </fieldset>
                                <button
                                    className="btn btn-lg btn-primary pull-xs-right"
                                    type="submit"
                                >
                                    Donate
                                </button>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div className="mymodal">
                    <img src={qr} alt={'qr for payment'} />
                    <button
                        className="btn btn-lg btn-primary pull-xs-right"
                        onClick={e => setIsModalOpen(false)}
                    >
                        Close
                    </button>
                </div>
            )}
        </div>
    );
};

export default Donation;
