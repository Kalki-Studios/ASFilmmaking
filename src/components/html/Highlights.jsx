import { useEffect, useRef, useState } from 'react';

const stats = [
  { num: 97,  suffix: '+', label: 'Stories Told' },
  { num: 5,   suffix: '+', label: 'Years of Coverage' },
  { num: 100, suffix: '%', label: 'Candid & Real' },
  { num: 1,   suffix: '',  label: 'Day, Every Detail' },
];

function AnimatedNum({ target, suffix }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const animated = useRef(false);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;
          const duration = 1400;
          const step = 16;
          const steps = Math.ceil(duration / step);
          let current = 0;
          const increment = target / steps;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              setComplete(true);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, step);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref} className={complete ? 'bounce' : ''}>{count}{suffix}</span>;
}

export default function Highlights() {
  return (
    <div className="highlights">
      <div className="container highlights-row">
        {stats.map((s) => (
          <div key={s.label} className="highlight-item">
            <span className="highlight-num">
              <AnimatedNum target={s.num} suffix={s.suffix} />
            </span>
            <span className="highlight-label">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}