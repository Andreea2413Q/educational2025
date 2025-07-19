import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

const CyberpunkBackground = ({ children }) => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

   
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    const createGrid = () => {
      const gridGroup = new THREE.Group();
      
      
      const gridSize = 100;
      const divisions = 50;
      const gridHelper = new THREE.GridHelper(gridSize, divisions, 0x00ffff, 0x0066cc);
      gridHelper.position.y = -10;
      gridGroup.add(gridHelper);

     
      for (let i = 0; i < 30; i++) {
        const height = Math.random() * 15 + 5;
        const geometry = new THREE.BoxGeometry(0.5, height, 0.5);
        const material = new THREE.MeshBasicMaterial({
          color: new THREE.Color().setHSL(0.6 + Math.random() * 0.2, 0.8, 0.5),
          transparent: true,
          opacity: 0.8
        });
        
        const building = new THREE.Mesh(geometry, material);
        building.position.set(
          (Math.random() - 0.5) * 60,
          height / 2 - 10,
          (Math.random() - 0.5) * 60
        );
        gridGroup.add(building);

       
        const lightGeometry = new THREE.SphereGeometry(0.1, 8, 8);
        const lightMaterial = new THREE.MeshBasicMaterial({
          color: Math.random() > 0.5 ? 0x00ffff : 0xff00ff,
          transparent: true,
          opacity: 0.9
        });
        
        for (let j = 0; j < Math.floor(height / 2); j++) {
          const light = new THREE.Mesh(lightGeometry, lightMaterial);
          light.position.set(
            building.position.x + (Math.random() - 0.5) * 0.3,
            building.position.y - height/2 + j * 2 + 1,
            building.position.z + (Math.random() - 0.5) * 0.3
          );
          gridGroup.add(light);
        }
      }

      return gridGroup;
    };

  
    const createParticles = () => {
      const particlesCount = 200;
      const positions = new Float32Array(particlesCount * 3);
      const colors = new Float32Array(particlesCount * 3);
      
      for (let i = 0; i < particlesCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 100;
        positions[i * 3 + 1] = Math.random() * 50 - 10;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 100;
        
        const color = new THREE.Color();
        color.setHSL(Math.random() * 0.3 + 0.5, 1, 0.5);
        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;
      }
      
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      
      const material = new THREE.PointsMaterial({
        size: 0.5,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
      });
      
      return new THREE.Points(geometry, material);
    };

   
    const createHolographicRings = () => {
      const ringsGroup = new THREE.Group();
      
      for (let i = 0; i < 5; i++) {
        const geometry = new THREE.RingGeometry(8 + i * 4, 8.5 + i * 4, 32);
        const material = new THREE.MeshBasicMaterial({
          color: new THREE.Color().setHSL(0.5 + i * 0.1, 0.8, 0.6),
          transparent: true,
          opacity: 0.3,
          side: THREE.DoubleSide
        });
        
        const ring = new THREE.Mesh(geometry, material);
        ring.rotation.x = Math.PI / 2;
        ring.position.y = -8 + i * 2;
        ringsGroup.add(ring);
      }
      
      return ringsGroup;
    };

  
    const createLaserBeams = () => {
      const beamsGroup = new THREE.Group();
      
      for (let i = 0; i < 10; i++) {
        const geometry = new THREE.CylinderGeometry(0.05, 0.05, 30, 8);
        const material = new THREE.MeshBasicMaterial({
          color: Math.random() > 0.5 ? 0x00ffff : 0xff0066,
          transparent: true,
          opacity: 0.6
        });
        
        const beam = new THREE.Mesh(geometry, material);
        beam.position.set(
          (Math.random() - 0.5) * 40,
          5,
          (Math.random() - 0.5) * 40
        );
        beam.rotation.z = Math.random() * Math.PI;
        beamsGroup.add(beam);
      }
      
      return beamsGroup;
    };

    const grid = createGrid();
    const particles = createParticles();
    const rings = createHolographicRings();
    const beams = createLaserBeams();
    
    scene.add(grid);
    scene.add(particles);
    scene.add(rings);
    scene.add(beams);

    
    camera.position.set(0, 10, 20);
    camera.lookAt(0, 0, 0);

   
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      
      const time = Date.now() * 0.001;
      
    
      if (Math.floor(time) % 2 === 0 && time % 1 < 0.1) {
        console.log('Camera pos:', camera.position.x.toFixed(2), camera.position.y.toFixed(2), camera.position.z.toFixed(2));
      }
      
     
      rings.rotation.y += 0.01;
      rings.rotation.x += 0.005;
      
     
      const positions = particles.geometry.attributes.position.array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(time + i) * 0.01;
      }
      particles.geometry.attributes.position.needsUpdate = true;
      
   
      beams.children.forEach((beam, index) => {
        beam.rotation.y += 0.02;
        beam.rotation.x += 0.01;
        beam.material.opacity = 0.3 + Math.sin(time * 5 + index) * 0.4;
        beam.position.y = 5 + Math.sin(time * 3 + index) * 2;
      });
      
    
      camera.position.x = Math.sin(time) * 20;
      camera.position.y = 10 + Math.sin(time * 0.8) * 10;
      camera.position.z = 20 + Math.cos(time * 1.2) * 15;
      camera.lookAt(Math.sin(time * 0.5) * 5, 0, Math.cos(time * 0.7) * 5);
      
      renderer.render(scene, camera);
    };

    animate();
    sceneRef.current = { scene, camera, renderer, grid, particles, rings, beams };

  
    const handleResize = () => {
      if (camera && renderer) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener('resize', handleResize);
      

      if (sceneRef.current) {
        const { scene, renderer } = sceneRef.current;
        scene.children.forEach(child => {
          if (child.geometry) child.geometry.dispose();
          if (child.material) {
            if (Array.isArray(child.material)) {
              child.material.forEach(material => material.dispose());
            } else {
              child.material.dispose();
            }
          }
        });
        renderer.dispose();
      }
    };
  }, []);

  return (
    <div className="relative w-full min-h-screen overflow-hidden">

      <div 
        ref={mountRef} 
        className="absolute inset-0 z-0"
        style={{ background: 'linear-gradient(180deg, #000428 0%, #004e92 100%)' }}
      />
      
    
      <div className="absolute inset-0 bg-black bg-opacity-40 z-10" />
      
    
      <div 
        className="absolute inset-0 z-20 pointer-events-none opacity-50"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,255,0.03) 2px, rgba(0,255,255,0.03) 4px)',
          animation: 'scanlines 0.1s linear infinite'
        }}
      />
      
      
      <div className="relative z-30">
        {children}
      </div>
      
      <style jsx>{`
        @keyframes scanlines {
          0% { transform: translateY(0px); }
          100% { transform: translateY(4px); }
        }
        
        @keyframes glow {
          0%, 100% { text-shadow: 2px 2px 7px rgba(0, 255, 255, 0.8), 3px 3px 15px rgba(0, 255, 255, 0.6), 4px 4px 25px rgba(0, 255, 255, 0.4); }
          50% { text-shadow: 3px 3px 18px rgba(0, 255, 255, 1), 4px 4px 24px rgba(0, 255, 255, 0.8), 5px 5px  30px rgba(0, 255, 255, 0.6); }
        }
        
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
        
        .animate-fadeIn {
          animation: fadeIn 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

const CyberpunkSingleScreen = () => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <CyberpunkBackground>
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-6xl mx-auto text-center">
         
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-32 h-32 border-4 border-cyan-400 bg-opacity-10 rounded-full animate-spin opacity-30" style={{animationDuration: '20s'}} />
            <div className="absolute w-48 h-48 border-4 border-cyan-300 bg-opacity-10 rounded-full animate-spin opacity-25" style={{animationDuration: '15s'}} />
            <div className="absolute w-64 h-64 border-4 border-blue-400 bg-opacity-10 rounded-full animate-spin opacity-20" style={{animationDuration: '25s'}} />
            <div className="absolute w-80 h-80 border-4 border-blue-300 bg-opacity-10 rounded-full animate-spin opacity-15" style={{animationDuration: '30s'}} />
            <div className="absolute w-96 h-96 border-4 border-indigo-400 bg-opacity-10 rounded-full animate-spin opacity-10" style={{animationDuration: '35s'}} />
          </div>

          <div className="relative z-40 space-y-8">
            <h1 className="text-white text-5xl md:text-6xl font-bold animate-glow mb-6">
              Bine ați venit!
            </h1>
            
            <div className="bg-gray-900 bg-opacity-20 backdrop-blur-sm rounded-lg p-6 border border-cyan-400 border-opacity-50 shadow-xl max-w-4xl mx-auto">
              <h2 className="text-cyan-400 text-2xl md:text-3xl font-bold mb-4 ">
                Descoperă Lumea Fascinantă a Culorilor
              </h2>
              
              {showContent && (
                <div className="space-y-4 animate-fadeIn">
                  <p className="text-white text-base md:text-lg leading-relaxed">
                    Teoria culorilor este fundamentală în înțelegerii modului în care culorile interacționează, se combină și ne afectează. Fie că ești elev,student, decorator sau pur și simplu curios să înțelegi mai bine lumea din jurul tău, cunoașterea teoriei culorilor îți va deschide noi perspective asupra frumuseții vizuale.
                  </p>
                  
                  <p className="text-white text-base md:text-lg leading-relaxed">
                    Culorile ne înconjoară în fiecare moment al vieții și au un impact profund asupra emoțiilor, comportamentului și percepției noastre asupra lumii. Fiecare nuanță întruchipează sentimente specifice și poate influența modul în care ne simțim și acționăm.
                  </p>
                  
                  
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </CyberpunkBackground>
  );
};

export default CyberpunkSingleScreen;