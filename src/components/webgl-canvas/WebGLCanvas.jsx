import { useRef, useEffect } from 'react';
import Render from '../../webgl/rendering';

import './webgl-canvas.css';

function WebGLCanvas({sizePixels = 128}) {

    const canvasRef = useRef(null);
    //const [glCompatible, setGlCompatible] = useEffect(true);      

    useEffect(() => 
    {
        const canvas = canvasRef.current;
        Render(canvas);
    }, []);

    return (
        <div className='webgl-canvas'>
            <canvas 
                ref={canvasRef} className='webgl-canvas'
                width={sizePixels} height={sizePixels}
                style={
                    {
                    height: sizePixels,
                    width: sizePixels
                    }
                }  
            />
            <p> WebGL demo.</p>
        </div>
    );
}

export default WebGLCanvas;