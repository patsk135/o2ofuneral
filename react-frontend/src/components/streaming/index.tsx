import { Link, useHistory, useParams } from 'react-router-dom';
import { useContext, useEffect, useRef, useState } from 'react';

import VideoPlayer from './VideoPlayer';

export interface IStreamingParams {
    roomID: string;
}

const Streaming = () => {
    const { roomID } = useParams<IStreamingParams>();

    const [streamId, setStreamId] = useState(roomID);
    const [bufferStreamId, setBufferStreamId] = useState('');
    const [isOpen, setIsOpen] = useState(true);

    let history = useHistory();

    return (
        <div>
            <div>
                <div className="col-md-6 offset-md-3 col-xs-12">
                    <form
                        onSubmit={e => {
                            e.preventDefault();
                            // console.log(`Join: ${bufferStreamId}`);
                            setStreamId(bufferStreamId);
                            history.push(`/streaming/${bufferStreamId}`);
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

            {isOpen && (
                <div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                flexDirection: 'column',
                                height: '75vh',
                                width: '75vw'
                            }}
                        >
                            <VideoPlayer streamId={streamId}></VideoPlayer>
                        </div>
                    </div>
                    <div style={{ height: '2vh' }}></div>
                    <button
                        className="btn btn-lg btn-primary"
                        onClick={() => {
                            history.push(`/donation/${streamId}`);
                        }}
                    >
                        Make a Donation
                    </button>

                    {/* <div style={{ display: 'flex' }}>description</div> */}
                </div>
            )}
        </div>
    );
};

export default Streaming;
