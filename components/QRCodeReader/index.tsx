import jsQR from 'jsqr';
import { useEffect } from 'react';
import styles from './QRCodeReader.module.css';

function drawRect(location: any, ctx: any) {
  drawLine(location.topLeftCorner, location.topRightCorner, ctx);
  drawLine(location.topRightCorner, location.bottomRightCorner, ctx);
  drawLine(location.bottomRightCorner, location.bottomLeftCorner, ctx);
  drawLine(location.bottomLeftCorner, location.topLeftCorner, ctx);
}
function drawLine(begin: any, end: any, ctx: any) {
  ctx.lineWidth = 4;
  ctx.strokeStyle = '#FF3B58';
  ctx.beginPath();
  ctx.moveTo(begin.x, begin.y);
  ctx.lineTo(end.x, end.y);
  ctx.stroke();
}

export const QRCodeReader = () => {
  useEffect(() => {
    const video = document.createElement('video');
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const msg = document.getElementById('msg') as HTMLDivElement;
    const ctx = canvas.getContext('2d')!;
    const userMedia = { video: { facingMode: 'environment' } };

    navigator.mediaDevices.getUserMedia(userMedia).then((stream) => {
      video.srcObject = stream;
      video.setAttribute('playsinline', 'true');
      video.play();
      startTick();
    });

    function startTick() {
      msg.innerText = 'Loading video...';
      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        canvas.height = video.videoHeight;
        canvas.width = video.videoWidth;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const img = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(img.data, img.width, img.height, {
          inversionAttempts: 'dontInvert',
        });
        if (code) {
          drawRect(code.location, ctx); // Rect
          msg.innerText = code.data; // Data
        } else {
          msg.innerText = 'Detecting QR-Code...';
        }
      }
      setTimeout(startTick, 250);
    }
  });

  return (
    <div id="wrapper" className={styles.wrapper}>
      <div id="msg" className={styles.msg}>
        Unable to access videostream.
      </div>
      <canvas id="canvas" className={styles.canvas}></canvas>
    </div>
  );
};
