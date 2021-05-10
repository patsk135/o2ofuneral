import React, { useState } from 'react';

import API from '../../utils/API';
import qrcode from 'qrcode';

const Donation = () => {
    const [amount, setAmount] = useState('');
    const [condolenceWord, setCondolenceWord] = useState('');
    const [name, setName] = useState('');

    const [qr, setQR] = useState('');

    return (
        <div style={{ height: '90vh' }}>
            {qr === '' ? (
                <div className="container page">
                    <div className="row">
                        <div className="col-md-6 offset-md-3 col-xs-12">
                            <form>
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
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                    ></input>
                                </fieldset>
                            </form>
                            <button
                                className="btn btn-lg btn-primary pull-xs-right"
                                onClick={e => {
                                    API.post('/payment/donate', {
                                        amount: parseFloat(amount),
                                        condolenceWord
                                    }).then(async ({ data }) => {
                                        // setQRCode(data.deeplinkUrl);
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
                                    });
                                }}
                            >
                                Donate
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100vh'
                    }}
                >
                    <img
                        src={qr}
                        alt={'qr for payment'}
                        style={{ position: 'absolute' }}
                    />
                </div>
            )}
        </div>
    );
};

export default Donation;
