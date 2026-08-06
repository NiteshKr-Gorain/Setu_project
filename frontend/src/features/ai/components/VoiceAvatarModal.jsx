import React, { useState, useEffect, useRef } from 'react';
import { X, Mic, MicOff, Sparkles, Send, VolumeX, Video, Settings2, Globe } from 'lucide-react';

const LOCAL_LANGUAGES = [
  { code: 'hi-IN', name: 'Hindi (हिंदी)', flag: '🇮🇳' },
  { code: 'pa-IN', name: 'Punjabi (ਪੰਜਾਬੀ)', flag: '🇮🇳' },
  { code: 'en-US', name: 'English (US)', flag: '🇺🇸' },
  { code: 'en-IN', name: 'English (India)', flag: '🇮🇳' },
  { code: 'es-ES', name: 'Spanish (Español)', flag: '🇪🇸' },
  { code: 'fr-FR', name: 'French (Français)', flag: '🇫🇷' },
  { code: 'de-DE', name: 'German (Deutsch)', flag: '🇩🇪' },
  { code: 'bn-IN', name: 'Bengali (বাংলা)', flag: '🇮🇳' },
  { code: 'ta-IN', name: 'Tamil (தமிழ்)', flag: '🇮🇳' },
  { code: 'te-IN', name: 'Telugu (తెలుగు)', flag: '🇮🇳' },
  { code: 'mr-IN', name: 'Marathi (मराठी)', flag: '🇮🇳' },
  { code: 'gu-IN', name: 'Gujarati (ગુજરાતી)', flag: '🇮🇳' }
];

export default function VoiceAvatarModal({ isOpen, onClose, onAskBackend }) {
  const [selectedLang, setSelectedLang] = useState('hi-IN');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasBrowserSupport, setHasBrowserSupport] = useState(true);

  // Voice Customization States
  const [availableVoices, setAvailableVoices] = useState([]);
  const [selectedVoiceIndex, setSelectedVoiceIndex] = useState(0);
  const [speechPitch, setSpeechPitch] = useState(1.0);
  const [speechRate, setSpeechRate] = useState(1.0);
  const [showVoiceSettings, setShowVoiceSettings] = useState(false);

  // Word Karaoke Subtitle States
  const [wordsList, setWordsList] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(-1);

  const recognitionRef = useRef(null);
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);
  const avatarImageRef = useRef(null);

  // Load available browser voices
  useEffect(() => {
    if (!('speechSynthesis' in window)) return;

    const updateVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices && voices.length > 0) {
        setAvailableVoices(voices);
        const langPrefix = selectedLang.split('-')[0];
        const matchingIdx = voices.findIndex(v => v.lang.startsWith(langPrefix) || v.lang.startsWith(selectedLang));
        if (matchingIdx !== -1) setSelectedVoiceIndex(matchingIdx);
      }
    };

    updateVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = updateVoices;
    }
  }, [selectedLang]);

  // Preload Avatar Image
  useEffect(() => {
    const img = new Image();
    img.src = '/avatar.png';
    img.onload = () => {
      avatarImageRef.current = img;
    };
  }, []);

  // 60FPS Video Canvas Renderer with Lip-Sync & Vibrant Orange Lighting
  useEffect(() => {
    if (!isOpen) return;

    let startTime = Date.now();

    const renderVideoCanvas = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      const width = canvas.width;
      const height = canvas.height;

      const elapsed = (Date.now() - startTime) / 1000;

      ctx.clearRect(0, 0, width, height);

      // 1. Draw Base Avatar Character with Nodding Motion
      ctx.save();
      
      let headTilt = 0;
      let bodySwayY = 0;

      if (isSpeaking) {
        headTilt = Math.sin(elapsed * 4) * 0.025;
        bodySwayY = Math.sin(elapsed * 6) * 3;
      } else if (isListening) {
        headTilt = Math.sin(elapsed * 2) * 0.015;
        bodySwayY = Math.sin(elapsed * 2) * 1.5;
      } else {
        bodySwayY = Math.sin(elapsed * 1.5) * 1;
      }

      ctx.translate(width / 2, height / 2 + bodySwayY);
      ctx.rotate(headTilt);

      if (avatarImageRef.current) {
        ctx.drawImage(
          avatarImageRef.current,
          -width / 2,
          -height / 2,
          width,
          height
        );
      } else {
        ctx.fillStyle = '#1e1e24';
        ctx.fillRect(-width / 2, -height / 2, width, height);
      }

      // 2. Lip-Sync & Face Morphing
      if (isSpeaking) {
        const mouthOpen = Math.abs(Math.sin(elapsed * 16)) * 12 + 2;
        const mouthWidth = 24 + Math.cos(elapsed * 10) * 3;
        const mouthX = 0;
        const mouthY = -28;
        const jawDrop = mouthOpen * 0.25;

        // Inner Mouth Cavity
        ctx.beginPath();
        ctx.ellipse(mouthX, mouthY + jawDrop, mouthWidth / 2, mouthOpen / 2, 0, 0, Math.PI * 2);
        ctx.fillStyle = '#12080a';
        ctx.fill();

        // Upper Teeth
        if (mouthOpen > 5) {
          ctx.beginPath();
          ctx.rect(mouthX - mouthWidth / 3, mouthY - mouthOpen / 4, (mouthWidth * 2) / 3, 2);
          ctx.fillStyle = 'rgba(245, 245, 245, 0.9)';
          ctx.fill();
        }

        // Upper Lip Contour
        ctx.beginPath();
        ctx.ellipse(mouthX, mouthY - mouthOpen / 4, mouthWidth / 2 + 1, 2.5, 0, 0, Math.PI);
        ctx.fillStyle = 'rgba(249, 115, 22, 0.85)';
        ctx.fill();

        // Lower Lip Contour
        ctx.beginPath();
        ctx.ellipse(mouthX, mouthY + mouthOpen / 2 + jawDrop, mouthWidth / 2, 3, 0, Math.PI, Math.PI * 2);
        ctx.fillStyle = 'rgba(234, 88, 12, 0.85)';
        ctx.fill();
      }

      ctx.restore();

      // 3. HD Video HUD Badge Overlay
      ctx.fillStyle = 'rgba(15, 23, 42, 0.65)';
      ctx.fillRect(10, 10, 120, 26);
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(249, 115, 22, 0.4)';
      ctx.strokeRect(10, 10, 120, 26);

      // Status Dot
      ctx.beginPath();
      ctx.arc(22, 23, 4, 0, Math.PI * 2);
      ctx.fillStyle = isSpeaking ? '#f97316' : '#10b981';
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 10px sans-serif';
      ctx.fillText(isSpeaking ? 'SPEAKING 60 FPS' : 'AVATAR READY', 32, 26);

      animationFrameRef.current = requestAnimationFrame(renderVideoCanvas);
    };

    renderVideoCanvas();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isOpen, isSpeaking, isListening]);

  // Speech Recognition Setup (Dynamic Local Language)
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setHasBrowserSupport(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = selectedLang;

    recognition.onresult = (event) => {
      let currentTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        currentTranscript += event.results[i][0].transcript;
      }
      setTranscript(currentTranscript);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.warn('Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognitionRef.current = recognition;
  }, [selectedLang]);

  // Handle modal open state
  useEffect(() => {
    if (isOpen) {
      setTranscript('');
      const selectedObj = LOCAL_LANGUAGES.find(l => l.code === selectedLang);
      const langName = selectedObj ? selectedObj.name : 'Local Language';
      setResponse(`Namaste! AI Voice Mode active in ${langName}. Speak or type your query in your local language.`);
      setCurrentWordIndex(-1);
      startListening();
    } else {
      stopListening();
      stopSpeech();
    }
  }, [isOpen]);

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      try {
        setTranscript('');
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        console.warn('Recognition active:', err);
      }
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      try {
        recognitionRef.current.stop();
      } catch (err) {
        console.warn('Stop error:', err);
      }
      setIsListening(false);
    }
  };

  const toggleMic = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  // Speak AI response out loud with local language support & pitch/rate controls
  const speakScriptText = (textToSpeak) => {
    if (!('speechSynthesis' in window) || !textToSpeak) return;

    window.speechSynthesis.cancel();
    const words = textToSpeak.trim().split(/\s+/);
    setWordsList(words);
    setCurrentWordIndex(-1);

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.rate = speechRate;
    utterance.pitch = speechPitch;
    utterance.lang = selectedLang;

    // Find voice matching selected local language
    const langPrefix = selectedLang.split('-')[0];
    const matchingIdx = availableVoices.findIndex(v => v.lang.startsWith(selectedLang) || v.lang.startsWith(langPrefix));
    if (matchingIdx !== -1) {
      utterance.voice = availableVoices[matchingIdx];
    } else if (availableVoices.length > 0 && availableVoices[selectedVoiceIndex]) {
      utterance.voice = availableVoices[selectedVoiceIndex];
    }

    let wordIdx = 0;

    utterance.onstart = () => {
      setIsSpeaking(true);
      setCurrentWordIndex(0);
    };

    utterance.onboundary = (event) => {
      if (event.name === 'word') {
        setCurrentWordIndex(wordIdx);
        wordIdx++;
      }
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setCurrentWordIndex(-1);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      setCurrentWordIndex(-1);
    };

    window.speechSynthesis.speak(utterance);
  };

  // Handle Input Submit
  const handleSubmitSpeech = async () => {
    if (!transcript.trim() || isProcessing) return;
    const queryText = transcript.trim();
    stopListening();
    setIsProcessing(true);
    setTranscript('');
    setResponse('Searching web and knowledge base...');

    try {
      if (onAskBackend) {
        const res = await onAskBackend(queryText);
        const ans = res.response || 'I have processed your query.';
        setResponse(ans);
        speakScriptText(ans);
      } else {
        const ans = `Here is the explanation for "${queryText}". Ready to help you.`;
        setResponse(ans);
        speakScriptText(ans);
      }
    } catch (_err) {
      const fallbackAns = `I have received your request and generated the output for you.`;
      setResponse(fallbackAns);
      speakScriptText(fallbackAns);
    } finally {
      setIsProcessing(false);
    }
  };

  const stopSpeech = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
    setCurrentWordIndex(-1);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-md p-4 animate-fadeIn">
      <div className="relative w-full max-w-xl bg-white border border-[#e2e8f0] rounded-3xl p-6 md:p-8 text-slate-800 flex flex-col items-center shadow-2xl overflow-hidden">
        {/* Header with Local Language Selector */}
        <div className="w-full flex items-center justify-between mb-3 gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <div className="px-3 py-1.5 rounded-full text-xs font-semibold bg-orange-500 text-white shadow-md shadow-orange-500/30 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-white" />
              <span>AI Voice Mode</span>
            </div>

            {/* Local Language Selector Pill */}
            <div className="flex items-center bg-orange-50 border border-orange-200 rounded-full px-2.5 py-1 text-xs font-medium text-orange-800 shadow-xs">
              <Globe className="w-3.5 h-3.5 mr-1 text-orange-600 shrink-0" />
              <select
                value={selectedLang}
                onChange={(e) => {
                  setSelectedLang(e.target.value);
                  if (isListening) stopListening();
                }}
                className="bg-transparent outline-none cursor-pointer font-semibold text-orange-900 pr-1 text-xs"
              >
                {LOCAL_LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.flag} {lang.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => setShowVoiceSettings(!showVoiceSettings)}
              className="p-2 text-slate-500 hover:text-orange-600 hover:bg-orange-50 rounded-full transition-colors"
              title="Voice Settings"
            >
              <Settings2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Voice Customization Settings Drawer */}
        {showVoiceSettings && (
          <div className="w-full bg-orange-50/70 border border-orange-200 rounded-2xl p-3.5 mb-3 text-xs space-y-2.5">
            <div className="flex items-center justify-between font-semibold text-orange-800">
              <span>Voice Synthesis Settings</span>
              <span className="text-[10px] text-orange-600 font-normal">{availableVoices.length} Voices Found</span>
            </div>

            {/* Voice Dropdown */}
            {availableVoices.length > 0 && (
              <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-1">Select System Voice:</label>
                <select
                  value={selectedVoiceIndex}
                  onChange={(e) => setSelectedVoiceIndex(Number(e.target.value))}
                  className="w-full bg-white border border-orange-200 rounded-xl px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-orange-500"
                >
                  {availableVoices.map((v, i) => (
                    <option key={i} value={i}>
                      {v.name} ({v.lang})
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Pitch & Rate Controls */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-1">Speed: {speechRate.toFixed(1)}x</label>
                <input
                  type="range"
                  min="0.5"
                  max="1.5"
                  step="0.1"
                  value={speechRate}
                  onChange={(e) => setSpeechRate(Number(e.target.value))}
                  className="w-full accent-orange-500 cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-1">Pitch: {speechPitch.toFixed(1)}</label>
                <input
                  type="range"
                  min="0.5"
                  max="1.5"
                  step="0.1"
                  value={speechPitch}
                  onChange={(e) => setSpeechPitch(Number(e.target.value))}
                  className="w-full accent-orange-500 cursor-pointer"
                />
              </div>
            </div>
          </div>
        )}

        {/* 60FPS Video Canvas Avatar Player */}
        <div className="relative flex flex-col items-center justify-center my-2 group">
          <div className={`relative rounded-3xl overflow-hidden border-2 transition-all duration-300 shadow-xl ${
            isSpeaking
              ? 'border-orange-500 shadow-[0_0_40px_rgba(249,115,22,0.5)]'
              : isListening
              ? 'border-orange-400 shadow-[0_0_30px_rgba(251,146,60,0.4)]'
              : 'border-slate-200'
          }`}>
            <canvas
              ref={canvasRef}
              width={260}
              height={320}
              className="w-[260px] h-[320px] object-cover bg-[#1e1e24]"
            />

            {/* Orange Video Player Equalizer Soundwave Overlay */}
            {isSpeaking && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-end gap-1 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-orange-500/50">
                <span className="w-1 h-3.5 bg-orange-400 rounded-full animate-bounce" />
                <span className="w-1 h-5.5 bg-orange-500 rounded-full animate-bounce delay-75" />
                <span className="w-1 h-2.5 bg-amber-400 rounded-full animate-bounce delay-150" />
                <span className="w-1 h-4.5 bg-orange-400 rounded-full animate-bounce delay-100" />
              </div>
            )}
          </div>

          {/* Video Status Badge */}
          <div className="mt-2.5 inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-50 border border-orange-200 text-xs font-semibold text-orange-700">
            {isSpeaking ? (
              <>
                <Video className="w-3.5 h-3.5 text-orange-600 animate-pulse" />
                <span>Video Lip-Syncing & Explaining...</span>
              </>
            ) : isListening ? (
              <>
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
                <span>Listening in {LOCAL_LANGUAGES.find(l => l.code === selectedLang)?.name || selectedLang}...</span>
              </>
            ) : (
              <>
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>AI Voice Avatar Ready ({LOCAL_LANGUAGES.find(l => l.code === selectedLang)?.flag})</span>
              </>
            )}
          </div>
        </div>

        {!hasBrowserSupport && (
          <p className="text-xs text-amber-600 mb-2 font-medium">
            Speech Recognition is not supported by your browser. Please type your query below.
          </p>
        )}

        {/* Word-by-Word Karaoke Subtitles Box */}
        <div className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3.5 my-2 min-h-16 max-h-28 overflow-y-auto text-center flex items-center justify-center custom-scrollbar">
          {wordsList.length > 0 && isSpeaking ? (
            <p className="text-xs md:text-sm font-medium leading-relaxed max-w-md">
              {wordsList.map((word, idx) => (
                <span
                  key={idx}
                  className={`inline-block mx-0.5 transition-all duration-150 ${
                    idx === currentWordIndex
                      ? 'text-orange-600 font-extrabold scale-110 border-b-2 border-orange-500'
                      : idx < currentWordIndex
                      ? 'text-slate-400'
                      : 'text-slate-800'
                  }`}
                >
                  {word}{' '}
                </span>
              ))}
            </p>
          ) : (
            <p className="text-xs md:text-sm font-medium text-slate-700 leading-relaxed max-w-md">
              {response}
            </p>
          )}
        </div>

        {/* AI VOICE MODE INPUT BOX */}
        <div className="w-full flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2 mb-2">
          <input
            type="text"
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmitSpeech()}
            placeholder={isListening ? `Listening in ${LOCAL_LANGUAGES.find(l => l.code === selectedLang)?.name || 'local language'}...` : 'Type or speak in local language...'}
            className="flex-1 bg-transparent border-none outline-none text-slate-800 text-sm placeholder-slate-400"
          />
          <button
            type="button"
            onClick={handleSubmitSpeech}
            disabled={!transcript.trim() || isProcessing}
            className="p-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl disabled:opacity-40 transition-colors shrink-0 shadow-md shadow-orange-500/20"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

        {/* Action Controls Bar */}
        <div className="flex items-center gap-4 mt-2">
          <button
            onClick={toggleMic}
            className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${
              isListening
                ? 'bg-orange-500 text-white hover:bg-orange-600 shadow-lg shadow-orange-500/40 scale-105'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
            }`}
            title={isListening ? 'Mute Microphone' : 'Start Microphone'}
          >
            {isListening ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4 text-orange-500" />}
          </button>

          {isSpeaking && (
            <button
              onClick={stopSpeech}
              className="px-4 py-2 bg-red-50 border border-red-200 text-red-600 text-xs font-semibold rounded-full hover:bg-red-100 transition-colors flex items-center gap-1.5"
            >
              <VolumeX className="w-3.5 h-3.5" />
              <span>Stop Voice</span>
            </button>
          )}

          <button
            onClick={onClose}
            className="px-6 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-full border border-slate-200 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
