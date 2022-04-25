import React, { useEffect, useState, useRef } from "react";
//changed img path
import circleImg from "../../assets/Images/circle.png";
const circle = new Image();
circle.src = circleImg;

const Draggable = (props) => {
  const { place, type, paused, ...rest } = props;
  const [pressed, setPressed] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const ref = useRef();

  useEffect(() => {
    const dragRef = ref.current;

    const handleMouseMove = (e) => {
      if (pressed) {
        setPosition({
          x: position.x + e.movementX,
          y: position.y + e.movementY,
        });
        //console.log(e.movementX + ', ' + e.movementY);
        //console.log(e.x + ', ' + e.y);
        //mouse.x = e.x;
        //mouse.y = e.y;
        e.preventDefault();
      }
    };
    const handleMouseDown = (e) => {
      if (!paused) {
        setPressed(true);
      }
    };
    const handleMouseUp = (e) => {
      if (pressed) {
        setPressed(false);
        place(type);
        setPosition({ x: 0, y: 0 });
      }
    };

    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mousemove", handleMouseMove);
    dragRef.addEventListener("mousedown", handleMouseDown);
    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mousemove", handleMouseMove);
      dragRef.removeEventListener("mousedown", handleMouseDown);
    };
  }, [position, pressed, place, type, paused]);

  useEffect(() => {
    if (ref.current) {
      ref.current.style.transform = `translate(${position.x}px, ${position.y}px)`;
    }
  }, [position]);
  return (
    <div ref={ref} {...rest}>
      <img src={circle.src} alt="Tower" width="50" height="50" />
    </div>
  );
};

export default Draggable;
