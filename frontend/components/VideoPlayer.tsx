import { useEffect, useRef } from 'react';
import flvjs from 'flv.js';

type VideoPlayerProps = {
    // flvjs: any;
    streamId: string;
};

const VideoPlayer = (props: VideoPlayerProps) => {
    const playerRef = useRef(null);

    useEffect(() => {
        if (playerRef.current) {
            const player = flvjs.createPlayer(
                {
                    type: 'flv',
                    hasAudio: true,
                    hasVideo: true,
                    url: `http://localhost:8000/live/${props.streamId}.flv`
                },
                {
                    isLive: true
                }
            );
            player.attachMediaElement(playerRef.current!);
            player.load();
        }
    }, [playerRef.current]);

    return (
        <div>
            <video ref={playerRef} controls autoPlay>
                Your browser is too old which doesn't support HTML5 video.
                <track kind="captions"></track>
            </video>
        </div>
    );
};

export default VideoPlayer;
