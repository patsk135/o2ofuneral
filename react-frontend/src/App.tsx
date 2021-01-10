import React from 'react';
// import QRCode from 'qrcode.react';
import QRCode from 'react-qr-code';
import logo from './logo.svg';
import './App.css';

function App() {
    const kbankQR =
        '00020101021230810016A00000067701011201150107536000315080214KB1020571497040320API1582994752120378531690016A00000067701011301030040214KB1020571497040420API15829947521203785530376454072020.005802TH6304d43b';
    const scbQR =
        '000201010212305101153094764348231840212REFERENCE0010312REFERENCE00252047011530376454041.355802TH5922TestMerchant16096081686007BANGKOK62370523202101041039548310000000706CEE123630481CF';
    return (
        <div className="App">
            <header className="App-header">
                <QRCode value={scbQR} />

                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default App;
