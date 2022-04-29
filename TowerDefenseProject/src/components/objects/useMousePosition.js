import React, { useEffect, useState } from 'react';


const useMousePosition = () => {

    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMove = (e) => {
            setMousePosition({ x: e.x, y: e.y });
        }

        window.addEventListener('mousemove', handleMove);

        return () => {
            window.removeEventListener('mousemove', handleMove);
        }
    }, []);

    return mousePosition;
}

export default useMousePosition;