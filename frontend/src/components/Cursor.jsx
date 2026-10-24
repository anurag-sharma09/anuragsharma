import { useEffect } from 'react';

export default function Cursor() {
  useEffect(() => {
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursor-follower');
    if (!cursor || !follower) return;

    let posX = 0, posY = 0;
    let followerX = 0, followerY = 0;

    const handleMouseMove = (e) => {
      posX = e.clientX;
      posY = e.clientY;
      cursor.style.left = posX + 'px';
      cursor.style.top = posY + 'px';
    };

    document.addEventListener('mousemove', handleMouseMove);

    let animationFrameId;
    const animateFollower = () => {
      followerX += (posX - followerX) * 0.12;
      followerY += (posY - followerY) * 0.12;
      follower.style.left = followerX + 'px';
      follower.style.top = followerY + 'px';
      animationFrameId = requestAnimationFrame(animateFollower);
    };
    animateFollower();

    // Click Ripple Effect
    const handleClick = (e) => {
      const ripple = document.createElement('div');
      ripple.style.cssText = `
        position: fixed;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        width: 16px; height: 16px;
        border: 1.5px solid rgba(0, 212, 255, 0.8);
        transform: translate(-50%, -50%) scale(0);
        pointer-events: none;
        z-index: 9997;
        animation: cursor-ripple 0.4s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
      `;
      document.body.appendChild(ripple);
      setTimeout(() => ripple.remove(), 400);
    };

    document.addEventListener('click', handleClick);

    // Ripple Style injection if not present
    if (!document.getElementById('cursor-ripple-style')) {
      const style = document.createElement('style');
      style.id = 'cursor-ripple-style';
      style.textContent = `
        @keyframes cursor-ripple {
          to { transform: translate(-50%,-50%) scale(6); opacity: 0; }
        }
      `;
      document.head.appendChild(style);
    }

    // Hide standard cursor on body
    document.body.style.cursor = 'none';

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationFrameId);
      document.body.style.cursor = '';
    };
  }, []);

  return (
    <>
      <div id="cursor" className="cursor"></div>
      <div id="cursor-follower" className="cursor-follower"></div>
    </>
  );
}
