import { TouchEventHandler } from 'react';

const Scratch = () => {
  const handleTouchMove: TouchEventHandler<HTMLDivElement> = (event) => {
    console.log(event);
  };

  return (
    <div style={{ margin: 20 }}>
      <div
        style={{ background: 'red', width: 300, height: 300 }}
        onTouchMove={handleTouchMove}
      >
        aaaaaaa
      </div>
    </div>
  );
};

export default Scratch;
