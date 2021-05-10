import { Link, useHistory } from 'react-router-dom';
import { useRef, useState } from 'react';

import Button from 'react-bootstrap/Button';
// @ts-ignore
import ReactHLS from 'react-hls';
import VideoPlayer from './VideoPlayer';

const Streaming = () => {
    const [streamId, setStreamId] = useState('test');
    const [bufferStreamId, setBufferStreamId] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    let history = useHistory();

    return (
        <div>
            <div>
                <div className="col-md-6 offset-md-3 col-xs-12">
                    <form
                        onSubmit={e => {
                            e.preventDefault();
                            setStreamId(bufferStreamId);
                            setIsOpen(true);
                        }}
                        style={{ display: 'flex' }}
                    >
                        <input
                            className="form-control form-control-lg"
                            type="text"
                            placeholder="RoomID"
                            value={bufferStreamId}
                            onChange={e => setBufferStreamId(e.target.value)}
                        />

                        <button className="btn btn-lg btn-primary pull-xs-right">
                            Join
                        </button>
                    </form>
                </div>
            </div>

            <div style={{ height: '2vh' }}></div>

            {/* <ReactHLS url={'http://localhost:8000/live/test/index.m3u8'} /> */}

            {isOpen && (
                <div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                flexDirection: 'column',
                                height: '80vh',
                                width: '80vw'
                            }}
                        >
                            <VideoPlayer streamId={streamId}></VideoPlayer>
                        </div>
                    </div>
                    <div style={{ height: '2vh' }}></div>
                    <Button
                        onClick={() => {
                            history.push('/donation');
                        }}
                    >
                        Make a Donation
                    </Button>
                </div>
            )}
        </div>
    );
};

export default Streaming;
