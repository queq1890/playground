import { TouchEventHandler, useState } from 'react';

const Scratch = () => {
  const [progress, setProgress] = useState(0);

  const handleTouchMove: TouchEventHandler<HTMLDivElement> = (event) => {
    console.log(event);
    if (progress < 100) {
      setProgress((current) => (current * 10 + 1) / 10);
    }
  };

  return (
    <div>
      <div style={{ margin: 20 }}>
        <div
          style={{ background: 'lightblue', width: 300, height: 300 }}
          onTouchMove={handleTouchMove}
        >
          aaaaaaa
        </div>
      </div>
      <div style={{ color: 'white' }}>progress: {progress}%</div>
    </div>
  );
};

export default Scratch;
