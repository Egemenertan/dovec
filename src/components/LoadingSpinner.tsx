import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-[200px] w-full">
      <div className="relative w-32 h-32">
        {/* Ana dönen dış halka */}
        <div className="absolute inset-0 animate-spin-slow">
          <div className="w-full h-full rounded-full border-4 border-transparent border-t-primary/30 border-r-primary/10"></div>
        </div>
        
        {/* İkinci halka */}
        <div className="absolute inset-2 animate-spin-reverse">
          <div className="w-full h-full rounded-full border-4 border-transparent border-l-primary/40 border-b-primary/10"></div>
        </div>
        
        {/* Üçüncü halka */}
        <div className="absolute inset-4 animate-spin-slower">
          <div className="w-full h-full rounded-full border-4 border-transparent border-r-primary/50 border-t-primary/10"></div>
        </div>

        {/* Merkez efekti */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-12 h-12">
            {/* Dış pulse efekti */}
            <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping-slow"></div>
            
            {/* Gradient arka plan */}
            <div className="absolute inset-0.5 rounded-full bg-gradient-to-tr from-primary/80 to-primary animate-pulse"></div>
            
            {/* İç daire */}
            <div className="absolute inset-2 rounded-full bg-white"></div>
            <div className="absolute inset-3 rounded-full bg-gradient-to-br from-primary to-primary/80"></div>
          </div>
        </div>

        {/* Dekoratif noktalar */}
        <div className="absolute inset-0 animate-spin-slower">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full bg-primary/30"
              style={{
                top: '50%',
                left: '50%',
                transform: `rotate(${i * 30}deg) translateY(-14px)`,
                transformOrigin: '0 0'
              }}
            />
          ))}
        </div>

        {/* Dış ışıma efekti */}
        <div className="absolute -inset-6 rounded-full bg-primary/5 blur-xl animate-pulse"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner; 