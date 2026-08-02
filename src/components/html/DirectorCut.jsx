import { useState, useEffect, useRef } from 'react';

const scenes = [
  { n:'01', cat:'HALDI',     title:'Turmeric & Laughter',      desc:"Golden hour, golden hands — the ceremony that always ends in a happy mess.",  img:'/haldi.png',   tint:'#3a1e00', glow:'rgba(220,160,40,0.55)'  },
  { n:'02', cat:'MEHENDI',   title:'Ink Before the Vows',      desc:'Patterns that tell the story before the wedding does.',                       img:'/mehendi.png',       tint:'#2a1500', glow:'rgba(180,100,30,0.50)'  },
  { n:'03', cat:'BARAAT',    title:'The Arrival',               desc:'Dhol beats, dust in the air, and a groom who cannot stop smiling.',            img:'/baraat.png',    tint:'#200a14', glow:'rgba(200,40,80,0.50)'   },
  { n:'04', cat:'PHERAS',    title:'Seven Steps, One Promise',  desc:'The exact second the whole room goes quiet.',                                 img:'/pheras.png',        tint:'#1c0810', glow:'rgba(220,80,40,0.52)'   },
  { n:'05', cat:'RECEPTION', title:'The Night Lights Up',       desc:'Where the formal photos end and the real dancing begins.',                     img:'/reception.png',  tint:'#0d0820', glow:'rgba(100,60,220,0.50)'  },
  { n:'06', cat:'PORTRAITS', title:'Just the Two of You',       desc:'Away from the crowd, for a few quiet frames.',                                img:'/portraits.png',      tint:'#111111', glow:'rgba(200,200,200,0.30)' },
];

export default function DirectorCut() {
  const [idx, setIdx] = useState(0);
  const [take, setTake] = useState(1);
  const [clapActive, setClapActive] = useState(false);
  const clapperRef = useRef(null);
  const s = scenes[idx];

  const playClapSound = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();

      const t = ctx.currentTime;

      // 1. Wooden Thud (Low frequency)
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(300, t);
      osc.frequency.exponentialRampToValueAtTime(40, t + 0.1);
      
      oscGain.gain.setValueAtTime(0, t);
      oscGain.gain.linearRampToValueAtTime(0.25, t + 0.015);
      oscGain.gain.exponentialRampToValueAtTime(0.01, t + 0.12);
      
      osc.connect(oscGain);
      oscGain.connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.15);

      // 2. The Crack/Smack (Filtered Noise)
      const bufferSize = ctx.sampleRate * 0.1;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      
      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.value = 1200;
      noiseFilter.Q.value = 0.5;
      
      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0, t);
      noiseGain.gain.linearRampToValueAtTime(0.35, t + 0.015);
      noiseGain.gain.exponentialRampToValueAtTime(0.01, t + 0.12);
      
      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(ctx.destination);
      
      noise.start(t);
    } catch (e) {
      console.warn('Audio context blocked or not supported');
    }
  };

  const handleClap = () => {
    if (clapActive) return;
    setClapActive(true);
    playClapSound();
    // Spring back after clap
    setTimeout(() => setClapActive(false), 300);

    const nextIdx = (idx + 1) % scenes.length;
    window.dispatchEvent(new CustomEvent('scene-change', { detail: { index: nextIdx } }));
    setIdx(nextIdx);
    setTake(t => t + 1);
  };

  const goTo = (i) => {
    if (i === idx) return;
    window.dispatchEvent(new CustomEvent('scene-change', { detail: { index: i } }));
    setIdx(i);
  };

  return (
    <section className="director-cut" id="stories">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">Featured Stories</span>
          <h2>Every wedding has scenes.</h2>
          <p>Tap the clapperboard to cut to the next moment — six real parts of a wedding day, told the way we actually shoot them.</p>
        </div>

        <div className="director-panel" id="directorPanel">
          {/* Scene background images */}
          {scenes.map((sc, i) => (
            <img
              key={sc.n}
              className="panel-scene-img"
              src={sc.img}
              alt={sc.title}
              loading={i === 0 ? 'eager' : 'lazy'}
              style={{ opacity: i === idx ? 1 : 0 }}
            />
          ))}

          <div className="panel-tint" style={{ background: s.tint }} />
          <div className="panel-vignette" />


          <div className="panel-content">
            <div className="panel-info">
              <div key={s.n} className="scene-enter" style={{ animation: 'sceneEnter 0.6s var(--ease) forwards' }}>
                <span className="tag">{s.cat}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>

              <style>{`
                @keyframes sceneEnter {
                  from { opacity: 0; transform: translateX(-10px); }
                  to { opacity: 1; transform: translateX(0); }
                }
              `}</style>

              {/* Scene progress dots */}
              <div className="panel-progress" role="tablist" aria-label="Scene selector">
                {scenes.map((_, i) => (
                  <button
                    key={i}
                    className={`panel-dot ${i === idx ? 'active' : ''}`}
                    onClick={() => goTo(i)}
                    role="tab"
                    aria-selected={i === idx}
                    aria-label={`Go to scene ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            <button
              ref={clapperRef}
              className={`clapper ${clapActive ? 'clap' : ''}`}
              onClick={handleClap}
              aria-label="Tap clapperboard to advance scene"
              style={{ '--clapper-glow': s.glow }}
            >
              <span className="clapper-hint">TAP TO CUT</span>
              <div className="clapper-lid" style={{ transform: clapActive ? 'rotate(0deg)' : 'rotate(-13deg)' }}>
                <div className="clapper-stripes" />
              </div>
              <div className="clapper-base">
                <div className="clapper-row"><span>PROD.</span><b>AS FILM</b></div>
                <div className="clapper-row"><span>SCENE</span><b>{s.n}</b></div>
                <div className="clapper-row"><span>SHOT</span><b>{s.cat}</b></div>
                <div className="clapper-row"><span>TAKE</span><b>{take}</b></div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}