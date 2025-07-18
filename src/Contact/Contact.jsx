import { useEffect, useRef } from 'react';
import { Mail, Facebook, User } from 'lucide-react';
import Eu from '../Imagini/eu1.jpg'


const FloatingDotsBackground = () => {
  const canvasRef = useRef(null);
  const dotsRef = useRef([]);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    let WIDTH = window.innerWidth;
    let HEIGHT = window.innerHeight;
    
    const TOTAL_DOTS = 60;
    const DISTANCE = 120;
    const GRAVITY = 0.0001;

   
    const resizeCanvas = () => {
      WIDTH = window.innerWidth;
      HEIGHT = window.innerHeight;
      canvas.width = WIDTH;
      canvas.height = HEIGHT;
    };
    
    resizeCanvas();

  
    function Dot() {
      this.x = 0;
      this.y = 0;
      this.vy = 0;
      this.vx = 0;
      this.r = 2 + 2 * Math.random();
      this.c = '#86A4C1';
      this.reset();
    }

    Dot.prototype.reset = function() {
      this.x = Math.random() * WIDTH;
      this.y = Math.random() * HEIGHT;
      var rand = Math.random();
      this.vx = (2 * Math.random() + 0.1) * 3 / this.r;
      if (rand > 0.5) {
        this.vx = -1 * this.vx;
      }
      rand = Math.random();
      this.vy = (2 * Math.random() + 0.1) * 3 / this.r;
      if (rand > 0.5) {
        this.vy = -1 * (2 * Math.random() + 0.1) * 1;
      }
    };

    Dot.prototype.collisionCheck = function() {
      if (this.x < 0 - this.r - DISTANCE) this.x = WIDTH;
      if (this.x > WIDTH + this.r + DISTANCE) this.x = 0;
      if (this.y < 0 - this.r - DISTANCE) this.y = HEIGHT;
      if (this.y > HEIGHT + this.r + DISTANCE) this.y = 0;
    };

    dotsRef.current = [];
    for (let i = 0; i < TOTAL_DOTS; i++) {
      const dot = new Dot();
      dotsRef.current.push(dot);
    }

    function distance(x1, y1, x2, y2) {
      const xdiff = x1 - x2;
      const ydiff = y1 - y2;
      return Math.sqrt(xdiff * xdiff + ydiff * ydiff);
    }

    function drawDot(dot) {
      ctx.beginPath();
      ctx.arc(dot.x, dot.y, dot.r, 0, 2 * Math.PI);
      ctx.fillStyle = dot.c;
      ctx.fill();
    }

    function draw() {
      ctx.clearRect(0, 0, WIDTH, HEIGHT);
      
      for (let i = 0; i < dotsRef.current.length; i++) {
        const dot1 = dotsRef.current[i];
        dot1.collisionCheck();
        drawDot(dot1);

        for (let j = i + 1; j < dotsRef.current.length; j++) {
          const dot2 = dotsRef.current[j];
          const x1 = dot1.x;
          const x2 = dot2.x;
          const y1 = dot1.y;
          const y2 = dot2.y;
          const dist = distance(x1, y1, x2, y2);

          if (dist <= DISTANCE) {
            const normalizedDist = dist / DISTANCE;
            const alpha = 1.0 - (normalizedDist * normalizedDist);
            ctx.lineWidth = (dot1.r + dot2.r) * 0.25 / (2 * Math.sqrt(normalizedDist) + 0.00001);
            ctx.strokeStyle = `rgba(134,164,193,${alpha})`;
            ctx.beginPath();
            const x1r = (0.5 + x1) << 0;
            const y1r = (0.5 + y1) << 0;
            const x2r = (0.5 + x2) << 0;
            const y2r = (0.5 + y2) << 0;
            ctx.moveTo(x1r, y1r);
            ctx.lineTo(x2r, y2r);
            ctx.stroke();

            const x1next = dot1.x + dot1.vx;
            const y1next = dot1.y + dot1.vy;
            const x2next = dot2.x + dot2.vx;
            const y2next = dot2.y + dot2.vy;
            const distnext = distance(x1next, y1next, x2next, y2next);

            if (distnext <= dist) {
             
              dot1.x += GRAVITY * dot2.r * x2 * Math.pow(normalizedDist, 2);
              dot2.x += GRAVITY * dot1.r * x1 * Math.pow(normalizedDist, 2);
              dot1.y += GRAVITY * dot2.r * y2 * Math.pow(normalizedDist, 2);
              dot2.y += GRAVITY * dot1.r * y1 * Math.pow(normalizedDist, 2);
            } else {
              dot1.x -= GRAVITY * dot2.r * x2 * Math.pow(normalizedDist, 2);
              dot2.x -= GRAVITY * dot1.r * x1 * Math.pow(normalizedDist, 2);
              dot1.y -= GRAVITY * dot2.r * y2 * Math.pow(normalizedDist, 2);
              dot2.y -= GRAVITY * dot1.r * y1 * Math.pow(normalizedDist, 2);
            }
          }
        }

        dot1.y += dot1.vy;
        dot1.x += dot1.vx;
      }

      animationRef.current = requestAnimationFrame(draw);
    }

    const handleResize = () => {
      resizeCanvas();
  
      dotsRef.current.forEach(dot => dot.reset());
    };

    window.addEventListener('resize', handleResize);
    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1]"
      style={{ 
        background: 'radial-gradient(circle farthest-corner at 50% 0%, #1464B2, #042C52)'
      }}
    />
  );
};

const Contact = () => {
  const creatorInfo = {
    name: "Țirban Andreea-Florina",
    email: "andreea2.p.3@email.com",
    facebook: "https://www.facebook.com/andreea.tirban?locale=ro_RO",
    photo: Eu
  };

  const handleEmailClick = async () => {
    const email = creatorInfo.email;
    
    
    try {
      const mailtoUrl = `mailto:${email}?subject=Contact%20de%20pe%20website&body=Bună%20ziua,%0A%0AScriu%20în%20legătură%20cu...%0A%0A`;
      window.location.href = mailtoUrl;
      
     
      setTimeout(() => {
        alert('📧 Email deschis în aplicația ta de email!\n\nDacă nu s-a deschis automat, verifică setările browserului.');
      }, 1000);
      
    } catch (err) {
      console.log('Mailto failed, trying clipboard...');
      
    
      if (navigator.clipboard && window.isSecureContext) {
        try {
          await navigator.clipboard.writeText(email);
          alert('📧 Email copiat în clipboard!\n\nPoți să-l lipești acum în Outlook.');
        } catch (clipboardErr) {
         
          prompt('Te rog copiază acest email pentru Outlook:', email);
        }
      } else {
        prompt('Te rog copiază acest email pentru Outlook:', email);
      }
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
    
      <FloatingDotsBackground />
      
     
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-900 bg-opacity-30 blur-[40px] pointer-events-none z-10"></div>
      

      <div className="relative z-20 py-16 px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-yellow-400 to-white bg-clip-text text-transparent">
              Contact
            </h1>
            <p className="text-gray-200 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
              Ai întrebări despre website? Vrei să colaborezi? Sau pur și simplu vrei să spui "Salut :)"? 
              Sunt aici să te ajut și să răspund la toate întrebările tale!
            </p>
          </div>

          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-8 md:p-12 text-center border border-white border-opacity-20">
            <div className="mb-8">
              <div className="w-32 h-32 md:w-40 md:h-40 mx-auto rounded-full overflow-hidden border-4 border-blue-300 shadow-2xl">
                <img 
                  src={creatorInfo.photo} 
                  alt={creatorInfo.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center" style={{display: 'none'}}>
                  <User size={60} className="text-white" />
                </div>
              </div>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {creatorInfo.name}
            </h2>
            
            <p className="text-yellow-500 text-lg mb-8">
              Creatoare | Inginer Softwere 
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button
                onClick={handleEmailClick}
                className="flex items-center bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <Mail className="mr-3 w-5 h-5" />
                Copiază Email
              </button>

              <a
                href={creatorInfo.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <Facebook className="mr-3 w-5 h-5" />
                Facebook
              </a>
            </div>

            <div className="mt-8 p-4 bg-black bg-opacity-30 rounded-lg border border-white border-opacity-10">
              <p className="text-blue-300 text-sm mb-2">Email direct:</p>
              <p className="text-white font-mono text-lg">{creatorInfo.email}</p>
            </div>
          </div>

          <div className="mt-12 grid md:grid-cols-2 gap-8">
            <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 border border-white border-opacity-20">
              <h3 className="text-white text-xl font-bold mb-4">🧩 Despre Mine: 🎓</h3>
              <p className="text-blue-100 leading-relaxed mb-4">
                Studentă la UPT - CTI, pasionată de intersecția dintre tehnologie și psihologia culorilor. Explorez cum culorile influențează comportamentul uman și le aplic în designul digital.
              </p>
              <p className="text-blue-100 leading-relaxed">
                Când nu programez vreun proiect, îmi place să creez diverse proiecte în Blender, să caut inspirație pe Unsplash și să citesc cărți de fizică. Combin astfel creativitatea cu cunoașterea științifică pentru a înțelege mai bine lumea din jurul nostru.
              </p>
            </div>

            <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 border border-white border-opacity-20">
              <h3 className="text-white text-xl font-bold mb-4">📬 De ce să mă contactezi?</h3>
              <ul className="text-blue-100 space-y-2">
                <li>• Întrebări despre teoria culorilor</li>
                <li>• Sugestii pentru noi funcții</li>
                <li>• Raportarea unor probleme</li>
                <li>• Colaborări și proiecte</li>
                <li>• Feedback și păreri</li>
                <li>• <strong>Oportunități de internship sau angajare</strong></li>
              </ul>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-blue-300 text-sm">
              Persoană punctuală, răspund în termen de 24-48 de ore
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;