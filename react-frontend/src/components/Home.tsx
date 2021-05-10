import Donation from './donation';
import React from 'react';
import Streaming from './streaming';

const Home = () => {
    return (
        <div>
            <Streaming></Streaming>
            <Donation></Donation>
        </div>
    );
};

export default Home;
