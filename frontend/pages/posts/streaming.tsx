import { useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

import Button from 'react-bootstrap/Button';

const Streaming = () => {
    const [streamId, setStreamId] = useState('test');
    const [isOpen, setIsOpen] = useState(false);

    const VideoPlayer = dynamic(() => import('../../components/VideoPlayer'), {
        ssr: false
    });

    return (
        <div>
            {isOpen ? (
                <VideoPlayer streamId={streamId}></VideoPlayer>
            ) : (
                <div>
                    <input
                        type="text"
                        value={streamId}
                        onChange={e => setStreamId(e.target.value)}
                    ></input>
                    <button onClick={e => setIsOpen(old => !old)}>
                        submit
                    </button>
                </div>
            )}

            <Link href="/">
                <Button variant="primary">Home</Button>
            </Link>
        </div>
    );
};

// Streaming.getInitialProps = async () => {
//     const flvjs = (await import('flv.js')).default;
//     return { flvjs };
// };

export default Streaming;
