import  { useEffect, useRef, useState } from 'react';

const EqualCircle = ({ className = '' }) => {
  const ref = useRef(null);
  const [size, setSize] = useState(0);

  useEffect(() => {
    const updateSize = () => {
      if (ref.current) {
        setSize(ref.current.offsetWidth);
      }
    };

    updateSize();
    const observer = new ResizeObserver(updateSize);
    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`absolute border rounded-full bg-transparent ${className}`}
      style={{ height: `${size}px` }}
    />
  );
};

export default EqualCircle;
