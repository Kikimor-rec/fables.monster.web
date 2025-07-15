
"use client";

import { useState, useRef, useEffect } from "react";

interface Track {
  title: string;
  filename: string;
}

export default function MusicPlayer() {
  const tracks: Track[] = [
    { title: "In a Deep Space", filename: "1-In-a-deep-space.mp3" },
    { title: "Arrival at the Black Hole", filename: "2-arrival-at-the-black-hole.mp3" },
    { title: "Welcome to Silk Star", filename: "1_2-Welcome-to-Silk-Star.mp3" },
    { title: "Breath of Black Hole", filename: "2_-Breath-of-black-hole.mp3" },
    { title: "Radiation Wave", filename: "3_-Radiation-wave.mp3" },
    { title: "Keep Silence", filename: "4_-Keep-Silence.mp3" },
    { title: "Pray to Mark", filename: "5_-Pray-to-Mark.mp3" },
    { title: "I Can't Breathe", filename: "6_-I-can't-breath.mp3" },
    { title: "Afterword", filename: "10_-Afterword.mp3" }
  ];


  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying,  setIsPlaying]  = useState(false);
  const [isLoading,  setIsLoading]  = useState(false);
  const [volume,     setVolume]     = useState(0.7);
  const [loop,       setLoop]       = useState(false);
  const [currentTime,setCurrentTime]= useState(0);
  const [duration,   setDuration]   = useState(0);
  const [buffered,   setBuffered]   = useState(0);

  const [prefetch, setPrefetch] = useState<Record<number,
    { url:string; progress:number; done:boolean }>>({});

  const audioRef     = useRef<HTMLAudioElement>(null);
  const clickTimeout = useRef<NodeJS.Timeout|null>(null);


  /* -------------------- события audio -------------------- */
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const t = () => setCurrentTime(audio.currentTime);
    const d = () => setDuration(audio.duration);
    const e = () => loop ? (audio.currentTime=0, audio.play()) : setIsPlaying(false);
    const w = () => setIsLoading(true);
    const c = () => setIsLoading(false);
    const p = () => {                           // progress → buffered %
      if (!audio.duration) return;
      const b = audio.buffered;
      if (!b.length) return;
      const end = b.end(b.length - 1);          // последний диапазон
      setBuffered(Math.min(100, (end / audio.duration) * 100));
    };

    audio.addEventListener("timeupdate", t);
    audio.addEventListener("loadedmetadata", d);
    audio.addEventListener("ended", e);
    audio.addEventListener("waiting", w);
    audio.addEventListener("canplay", c);
    audio.addEventListener("progress", p);

    return () => {
      audio.removeEventListener("timeupdate", t);
      audio.removeEventListener("loadedmetadata", d);
      audio.removeEventListener("ended", e);
      audio.removeEventListener("waiting", w);
      audio.removeEventListener("canplay", c);
      audio.removeEventListener("progress", p);
    };
  }, [loop]);

  /* ----------------------- громкость / loop ---------------------------- */
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.loop   = loop;
    }
  }, [volume, loop]);

  /* ----------------------- функции управления -------------------------- */

  const selectTrack = (i:number) => {
    setCurrentTrack(i);
    setIsPlaying(false);
    setCurrentTime(0); setDuration(0); setBuffered(0);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.removeAttribute("src");
      audioRef.current.load();
    }
  };


  const playTrack = async (i:number=currentTrack) => {
    const audio = audioRef.current; if (!audio) return;
    if (i!==currentTrack) setCurrentTrack(i);

    const pre = prefetch[i];
    const src = pre?.done ? pre.url : `/music/lostmarkmusic/${tracks[i].filename}`;

    if (audio.src !== src) { audio.src = src; audio.load(); }

    setIsLoading(true);
    try { await audio.play(); setIsPlaying(true); }
    finally { setIsLoading(false); }
  };

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      playTrack();
    }
  };

  /* ----------------------- клик / двойной клик ------------------------- */

  const handleTrackClick = (i:number) => {
    if (clickTimeout.current) {
      clearTimeout(clickTimeout.current); clickTimeout.current=null;
      playTrack(i);
    } else {
      clickTimeout.current=setTimeout(()=>{
        selectTrack(i); clickTimeout.current=null;
      },250);
    }
  };

  /* ----------------------- предзагрузка -------------------------------- */

  const prefetchTrack = async (i:number) => {
    if (prefetch[i]?.done) return;
    const res = await fetch(`/music/lostmarkmusic/${tracks[i].filename}`);
    const len = Number(res.headers.get("content-length"))||0;
    const reader = res.body!.getReader();
    let rec=0; const chunks:Uint8Array[]=[];
    for (;;) {
      const {done,value}=await reader.read(); if(done) break;
      chunks.push(value); rec+=value.length;
      setPrefetch(p=>({...p,[i]:{url:p[i]?.url||"",progress:len?(rec/len)*100:0,done:false}}));
    }
    const blob=new Blob(chunks,{type:"audio/mpeg"});
    const url = URL.createObjectURL(blob);
    setPrefetch(p=>({...p,[i]:{url,progress:100,done:true}}));
    if (i===currentTrack) setBuffered(100);
  };

  /* ----------------------- seek --------------------------------------- */

  const playedPercent = duration ? (currentTime/duration)*100 : 0;
  const fmt = (t:number)=>isNaN(t)?"0:00":
    `${Math.floor(t/60)}:${Math.floor(t%60).toString().padStart(2,"0")}`;
  const seek = (e:React.ChangeEvent<HTMLInputElement>)=>{
    if(!audioRef.current)return;
    const nt=(Number(e.target.value)/100)*duration;
    audioRef.current.currentTime=nt; setCurrentTime(nt);
  };

  /* -------------------------------------------------------------------- */
  /* -------------------- render -------------------- */
  return (
    <section className="py-20 bg-gray-900 border-t border-red-700">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-white mb-12 text-center font-mono">
          🎵 ATMOSPHERIC SOUNDTRACK
        </h2>

        <div className="bg-black border border-red-700 p-6 max-w-4xl mx-auto">
          <audio ref={audioRef} preload="none"/>

          {/* текущее название */}
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-white mb-2 font-mono">
              {tracks[currentTrack].title}
            </h3>
            <div className="text-gray-400 font-mono text-sm">
              Track {currentTrack+1} of {tracks.length}
            </div>
          </div>

          {/* прогресс (загрузка + проигрыш) */}
          <div className="mb-6">
            <div className="flex justify-between text-gray-400 font-mono text-sm mb-2">
              <span>{fmt(currentTime)}</span><span>{fmt(duration)}</span>
            </div>
            <div className="relative h-2 bg-gray-700 rounded-lg">
              {/* загружено */} <div style={{width:`${buffered}%`}}
                className="absolute left-0 top-0 h-full bg-gray-500 rounded-lg"/>
              {/* проиграно */} <div style={{width:`${playedPercent}%`}}
                className="absolute left-0 top-0 h-full bg-red-700 rounded-lg"/>
              {/* слайдер */}  <input type="range" min="0" max="100"
                  value={playedPercent} onChange={seek}
                  className="absolute w-full h-2 opacity-0 cursor-pointer"/>
            </div>
          </div>

          {/* кнопки управления */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <button onClick={togglePlay}
              className="bg-red-700 hover:bg-red-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-mono font-bold transition-colors">
              {isLoading?"⚙️":(isPlaying?"⏸":"▶")}
            </button>
            <button onClick={()=>setLoop(!loop)}
              className={`border-2 text-white w-12 h-12 rounded-full flex items-center justify-center font-mono transition-colors ${
                loop?"border-red-700 bg-red-700":"border-gray-600 hover:border-red-700"}`}>
              🔁
            </button>
          </div>

          {/* буферизация текстом */}
          {isLoading && (
            <div className="text-center mb-4 text-gray-400 font-mono text-sm animate-pulse">
              Buffering…
            </div>
          )}

          {/* громкость */}
          <div className="mb-6">
            <div className="flex items-center gap-4 justify-center">
              <span className="text-gray-400 font-mono text-sm">🔊</span>
              <input type="range" min="0" max="1" step="0.1"
                value={volume} onChange={e=>setVolume(+e.target.value)}
                className="w-32 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"/>
              <span className="text-gray-400 font-mono text-sm">
                {Math.round(volume*100)}%
              </span>
            </div>
          </div>

          {/* список треков */}
          <div className="border-t border-red-700 pt-4">
            <h4 className="text-lg font-bold text-white mb-4 font-mono text-center">PLAYLIST</h4>
            <div className="grid gap-2 max-h-64 overflow-y-auto">
              {tracks.map((t,i)=>{
                const p=prefetch[i];
                const status=p?.done?"✅":p?`🔄 ${p.progress.toFixed(0)}%`:"⬇️";
                return (
                  <div key={i}
                    className={`flex items-center justify-between p-3 border transition-colors font-mono ${
                      i===currentTrack?"border-red-700 bg-red-700/20 text-white":
                      "border-gray-700 text-gray-300 hover:border-red-700 hover:bg-red-700/10"}`}>
                    <button onClick={()=>handleTrackClick(i)} className="flex-1 text-left">
                      {t.title}
                    </button>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-gray-500">
                        {String(i+1).padStart(2,"0")}
                      </span>
                      <button onClick={()=>prefetchTrack(i)} disabled={p?.done}
                        className="text-gray-400 hover:text-white disabled:opacity-50"
                        title="Предзагрузить">
                        {status}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-400 font-mono text-sm">
            🎧 Use this audio to immerse your game.
          </p>
        </div>
      </div>
    </section>
  );
}
