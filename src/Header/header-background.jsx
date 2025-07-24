export default function HeaderBackground() {
  return (
    <>
   
      <div className="absolute inset-0">
       
        <div className="absolute inset-0 bg-gradient-to-r bg-gray-700"></div>
      </div>

    
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </>
  );
}