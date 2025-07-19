import  { useRef, useEffect, useState, useCallback } from 'react';

const StarDotsAnimation = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const starsRef = useRef([]);
  const dotsRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0, moving: false });
  const mouseMoveCheckerRef = useRef(null);
  
  const [params, setParams] = useState({
    maxDistFromCursor: 50,
    dotsSpeed: 0,
    backgroundSpeed: 0
  });

  // Star class
  class Star {
    constructor(id, x, y) {
      this.id = id;
      this.x = x;
      this.y = y;
      this.r = Math.floor(Math.random() * 2) + 1;
      const alpha = (Math.floor(Math.random() * 10) + 1) / 10 / 2;
      this.color = `rgba(255,255,255,${alpha})`;
    }

    draw(ctx) {
      ctx.fillStyle = this.color;
      ctx.shadowBlur = this.r * 2;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
      ctx.closePath();
      ctx.fill();
    }

    move(ctx, height) {
      this.y -= 0.15 + params.backgroundSpeed / 100;
      if (this.y <= -10) this.y = height + 10;
      this.draw(ctx);
    }
  }

  // Dot class
  class Dot {
    constructor(id, x, y) {
      this.id = id;
      this.x = x;
      this.y = y;
      this.r = Math.floor(Math.random() * 5) + 1;
      this.maxLinks = 2;
      this.speed = 0.5;
      this.a = 0.5;
      this.aReduction = 0.005;
      this.color = `rgba(255,255,255,${this.a})`;
      this.linkColor = `rgba(255,255,255,${this.a / 4})`;
      this.dir = Math.floor(Math.random() * 140) + 200;
    }

    draw(ctx) {
      ctx.fillStyle = this.color;
      ctx.shadowBlur = this.r * 2;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
      ctx.closePath();
      ctx.fill();
    }

    link(ctx, dots) {
      if (this.id === 0) return;
      const previousDot1 = this.getPreviousDot(dots, 1);
      const previousDot2 = this.getPreviousDot(dots, 2);
      const previousDot3 = this.getPreviousDot(dots, 3);
      
      if (!previousDot1) return;
      
      ctx.strokeStyle = this.linkColor;
      ctx.beginPath();
      ctx.moveTo(previousDot1.x, previousDot1.y);
      ctx.lineTo(this.x, this.y);
      if (previousDot2) ctx.lineTo(previousDot2.x, previousDot2.y);
      if (previousDot3) ctx.lineTo(previousDot3.x, previousDot3.y);
      ctx.stroke();
      ctx.closePath();
    }

    getPreviousDot(dots, stepback) {
      if (this.id === 0 || this.id - stepback < 0) return false;
      return dots[this.id - stepback] || false;
    }

    move(ctx, dots) {
      this.a -= this.aReduction;
      if (this.a <= 0) {
        return false; // Signal to remove this dot
      }
      
      this.color = `rgba(255,255,255,${this.a})`;
      this.linkColor = `rgba(255,255,255,${this.a / 4})`;
      
      this.x = this.x + Math.cos(this.degToRad(this.dir)) * (this.speed + params.dotsSpeed / 100);
      this.y = this.y + Math.sin(this.degToRad(this.dir)) * (this.speed + params.dotsSpeed / 100);

      this.draw(ctx);
      this.link(ctx, dots);
      return true; // Continue existing
    }

    degToRad(deg) {
      return deg * (Math.PI / 180);
    }
  }

  const setCanvasSize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    canvas.width = width;
    canvas.height = height;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    
    return { width, height };
  }, []);

  const initStars = useCallback((width, height) => {
    const stars = [];
    for (let i = 0; i < 80; i++) {
      stars[i] = new Star(i, Math.floor(Math.random() * width), Math.floor(Math.random() * height));
    }
    starsRef.current = stars;
  }, []);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    ctx.clearRect(0, 0, width, height);
    ctx.strokeStyle = "white";
    ctx.shadowColor = "white";
    
    // Animate stars
    starsRef.current.forEach(star => {
      star.move(ctx, height);
    });
    
    // Animate dots and filter out expired ones
    dotsRef.current = dotsRef.current.filter(dot => {
      return dot.move(ctx, dotsRef.current);
    });
    
    // Draw new dots if mouse is moving
    drawIfMouseMoving(ctx);
    
    ctx.shadowBlur = 0;
    animationRef.current = requestAnimationFrame(animate);
  }, [params]);

  const drawIfMouseMoving = useCallback((ctx) => {
    if (!mouseRef.current.moving) return;

    const dots = dotsRef.current;
    const mouseX = mouseRef.current.x;
    const mouseY = mouseRef.current.y;
    const dotsMinDist = 2;

    if (dots.length === 0) {
      const newDot = new Dot(0, mouseX, mouseY);
      dots[0] = newDot;
      newDot.draw(ctx);
      return;
    }

    const previousDot = dots[dots.length - 1];
    if (!previousDot) return;
    
    const prevX = previousDot.x;
    const prevY = previousDot.y;

    const diffX = Math.abs(prevX - mouseX);
    const diffY = Math.abs(prevY - mouseY);

    if (diffX < dotsMinDist || diffY < dotsMinDist) return;

    const xVariation = (Math.random() > 0.5 ? -1 : 1) * 
      (Math.floor(Math.random() * params.maxDistFromCursor) + 1);
    const yVariation = (Math.random() > 0.5 ? -1 : 1) * 
      (Math.floor(Math.random() * params.maxDistFromCursor) + 1);
    
    const newDot = new Dot(dots.length, mouseX + xVariation, mouseY + yVariation);
    dots.push(newDot);
    newDot.draw(ctx);
    newDot.link(ctx, dots);
  }, [params.maxDistFromCursor]);

  const handleMouseMove = useCallback((e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    mouseRef.current.x = e.clientX - rect.left;
    mouseRef.current.y = e.clientY - rect.top;
    mouseRef.current.moving = true;
    
    clearTimeout(mouseMoveCheckerRef.current);
    mouseMoveCheckerRef.current = setTimeout(() => {
      mouseRef.current.moving = false;
    }, 100);
  }, []);

  useEffect(() => {
    const dimensions = setCanvasSize();
    if (dimensions) {
      initStars(dimensions.width, dimensions.height);
    }
    
    const handleResize = () => {
      const newDimensions = setCanvasSize();
      if (newDimensions) {
        initStars(newDimensions.width, newDimensions.height);
      }
    };
    
    window.addEventListener('resize', handleResize);
    animate();
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (mouseMoveCheckerRef.current) {
        clearTimeout(mouseMoveCheckerRef.current);
      }
    };
  }, [setCanvasSize, initStars, animate]);

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      <canvas
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        className="absolute inset-0 cursor-none"
      />
      
     
       
      
    </div>
  );
};

export default StarDotsAnimation;