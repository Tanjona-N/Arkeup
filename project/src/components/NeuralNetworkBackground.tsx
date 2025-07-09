import React, { useRef, useEffect, useState } from 'react';

const NeuralNetworkBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dots, setDots] = useState<Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
  }>>([]);
  const animationFrameId = useRef<number | null>(null);

  const numDots = 68; // Increased by 35% from 50
  const maxDist = 150;
  const dotRadius = 2;
  const dotSpeed = 0.425;
  const dotColor = 'rgba(34, 197, 94, 1)';
  const lineColor = 'rgba(34, 197, 94, 0.6)';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      const newDots = [];
      for (let i = 0; i < numDots; i++) {
        newDots.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * dotSpeed * 2,
          vy: (Math.random() - 0.5) * dotSpeed * 2,
          radius: dotRadius,
        });
      }
      setDots(newDots);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || dots.length === 0) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const updatedDots = dots.map(dot => {
        let newX = dot.x + dot.vx;
        let newY = dot.y + dot.vy;

        if (newX < 0 || newX > canvas.width) dot.vx *= -1;
        if (newY < 0 || newY > canvas.height) dot.vy *= -1;
        
        newX = Math.max(0, Math.min(canvas.width, newX + dot.vx));
        newY = Math.max(0, Math.min(canvas.height, newY + dot.vy));

        ctx.beginPath();
        ctx.arc(newX, newY, dot.radius, 0, Math.PI * 2);
        ctx.fillStyle = dotColor;
        ctx.fill();

        return { ...dot, x: newX, y: newY };
      });

      for (let i = 0; i < updatedDots.length; i++) {
        for (let j = i + 1; j < updatedDots.length; j++) {
          const d1 = updatedDots[i];
          const d2 = updatedDots[j];
          const distance = Math.sqrt((d1.x - d2.x) ** 2 + (d1.y - d2.y) ** 2);

          if (distance < maxDist) {
            ctx.beginPath();
            ctx.moveTo(d1.x, d1.y);
            ctx.lineTo(d2.x, d2.y);
            ctx.strokeStyle = lineColor.replace(
              /(\d\.\d+)\)/,
              `${(1 - distance / maxDist) * parseFloat(lineColor.match(/(\d\.\d+)\)/)?.[1] || '0.6')})`
            );
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      
      setDots(updatedDots);
      animationFrameId.current = requestAnimationFrame(animate);
    };

    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [dots]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full opacity-70"
    />
  );
};

export default NeuralNetworkBackground;