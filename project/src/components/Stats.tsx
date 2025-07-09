import React, { useState, useEffect } from 'react';
import { Users, TrendingUp, Globe2 } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

const AnimatedNumber = ({ end, duration = 2000 }: { end: number; duration?: number }) => {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true });

  useEffect(() => {
    if (inView) {
      let startTime: number;
      let animationFrame: number;

      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        
        setCount(Math.floor(progress * end));
        
        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        }
      };

      animationFrame = requestAnimationFrame(animate);

      return () => {
        if (animationFrame) {
          cancelAnimationFrame(animationFrame);
        }
      };
    }
  }, [inView, end, duration]);

  return <span ref={ref}>{count}</span>;
};

const StatCard = ({ 
  icon: Icon, 
  value, 
  description, 
  color, 
  delay 
}: { 
  icon: React.ElementType; 
  value: number; 
  description: string; 
  color: string; 
  delay: number;
}) => {
  const { ref, inView } = useInView({ 
    triggerOnce: true, 
    threshold: 0.1 
  });

  return (
    <div
      ref={ref}
      className={`flex flex-col items-center text-center p-6 bg-slate-50 rounded-2xl transition-all duration-700 ${
        inView 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div 
        className={`mb-4 p-4 ${color} rounded-full transform transition-transform duration-700 ${
          inView ? 'scale-100 rotate-0' : 'scale-0 rotate-180'
        }`}
        style={{ transitionDelay: `${delay + 200}ms` }}
      >
        <Icon className="w-8 h-8" />
      </div>
      <div className="text-4xl md:text-5xl font-bold text-slate-800 mb-2">
        <AnimatedNumber end={value} />
        {value === 95 ? '%' : '+'}
      </div>
      <p className="text-slate-600">{description}</p>
    </div>
  );
};

const Stats = () => {
  const stats = [
    {
      icon: Users,
      value: 1000,
      description: "Collaborateurs",
      color: "bg-green-100 text-green-500",
      delay: 0
    },
    {
      icon: TrendingUp,
      value: 600,
      description: "Projets menés à bien",
      color: "bg-blue-100 text-blue-500",
      delay: 200
    },
    {
      icon: Globe2,
      value: 40,
      description: "technologies maîtrisées",
      color: "bg-purple-100 text-purple-500",
      delay: 400
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white" aria-label="Statistiques clés">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;