import React, { useState, useRef, useEffect } from 'react';
import { Plus, FileText, X, ArrowUp, Mic, AlertCircle } from 'lucide-react';

export default function ChatInput({ onSendMessage, isLoading }) {
  const [prompt, setPrompt] = useState('');
  const [attachedFile, setAttachedFile] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [micError, setMicError] = useState('');

  const fileInputRef = useRef(null);
  const recognitionRef = useRef(null);
  const autoSubmitTimerRef = useRef(null);
  const promptRef = useRef(prompt);
  promptRef.current = prompt;
  const basePromptRef = useRef('');
  const isListeningRef = useRef(false);

  const clearAutoSubmitTimer = () => {
    if (autoSubmitTimerRef.current) {
      clearTimeout(autoSubmitTimerRef.current);
      autoSubmitTimerRef.current = null;
    }
  };

  const stopVoiceRecognition = () => {
    isListeningRef.current = false;
    clearAutoSubmitTimer();
    if (recognitionRef.current) {
      try {
        recognitionRef.current.onresult = null;
        recognitionRef.current.onerror = null;
        recognitionRef.current.onend = null;
        recognitionRef.current.stop();
      } catch (e) {}
      recognitionRef.current = null;
    }
    setIsListening(false);
  };

  useEffect(() => {
    return () => {
      stopVoiceRecognition();
    };
  }, []);

  const triggerAutoSubmit = () => {
    const textToSubmit = promptRef.current.trim();
    stopVoiceRecognition();
    if (textToSubmit) {
      let finalPrompt = textToSubmit;
      if (attachedFile) {
        finalPrompt = `[Attached File: ${attachedFile.name}]\n${finalPrompt}`;
      }
      setPrompt('');
      promptRef.current = '';
      setAttachedFile(null);
      onSendMessage(finalPrompt);
    }
  };

  const scheduleAutoSubmit = () => {
    clearAutoSubmitTimer();
    autoSubmitTimerRef.current = setTimeout(() => {
      triggerAutoSubmit();
    }, 5000);
  };

  const toggleVoiceTyping = () => {
    setMicError('');
    if (isListening) {
      stopVoiceRecognition();
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setMicError('Speech Recognition is not supported by your browser. Please use Chrome, Edge, or Safari.');
      return;
    }

    basePromptRef.current = promptRef.current;
    isListeningRef.current = true;
    setIsListening(true);

    let recognition;
    try {
      recognition = new SpeechRecognition();
    } catch (err) {
      setMicError('Could not initialize speech recognition.');
      isListeningRef.current = false;
      setIsListening(false);
      return;
    }

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = navigator.language || 'en-US';

    recognition.onresult = (event) => {
      clearAutoSubmitTimer();

      let sessionTranscript = '';
      let hasFinal = false;

      for (let i = 0; i < event.results.length; i++) {
        const res = event.results[i];
        if (res && res[0] && res[0].transcript) {
          sessionTranscript += res[0].transcript;
          if (res.isFinal) {
            hasFinal = true;
          }
        }
      }

      sessionTranscript = sessionTranscript.trim();

      if (sessionTranscript) {
        const base = basePromptRef.current ? basePromptRef.current.trim() : '';
        const updated = base ? `${base} ${sessionTranscript}` : sessionTranscript;
        setPrompt(updated);
        promptRef.current = updated;

        if (hasFinal) {
          basePromptRef.current = updated;
          scheduleAutoSubmit();
        }
      }
    };

    recognition.onend = () => {
      if (isListeningRef.current) {
        try {
          recognition.start();
        } catch (err) {
          if (!autoSubmitTimerRef.current) {
            isListeningRef.current = false;
            setIsListening(false);
          }
        }
      } else {
        if (!autoSubmitTimerRef.current) {
          setIsListening(false);
        }
      }
    };

    recognition.onerror = (event) => {
      if (event.error === 'no-speech' || event.error === 'aborted') {
        return;
      }

      if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
        setMicError('Microphone permission denied. Please allow microphone access in browser.');
        stopVoiceRecognition();
      } else if (event.error === 'audio-capture') {
        setMicError('No microphone found.');
        stopVoiceRecognition();
      } else {
        setMicError(`Voice recognition error (${event.error}).`);
        stopVoiceRecognition();
      }
    };

    recognitionRef.current = recognition;
    try {
      recognition.start();
    } catch (err) {
      setMicError('Could not start microphone.');
      isListeningRef.current = false;
      setIsListening(false);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setAttachedFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if ((!prompt.trim() && !attachedFile) || isLoading) return;

    stopVoiceRecognition();

    let finalPrompt = prompt.trim();
    if (attachedFile) {
      finalPrompt = `[Attached File: ${attachedFile.name}]\n${finalPrompt}`;
    }

    setPrompt('');
    promptRef.current = '';
    setAttachedFile(null);
    onSendMessage(finalPrompt);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6">
      {micError && (
        <div className="mb-3 flex items-center justify-between gap-2 px-4 py-2.5 bg-red-50 border border-red-200 text-red-700 text-sm font-semibold rounded-2xl shadow-xs">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <span>{micError}</span>
          </div>
          <button
            type="button"
            onClick={() => setMicError('')}
            className="p-1 hover:bg-red-100 rounded-full transition-colors shrink-0"
          >
            <X className="w-4 h-4 text-red-600" />
          </button>
        </div>
      )}

      {attachedFile && (
        <div className="mb-3 inline-flex items-center gap-2 px-4 py-2 bg-orange-50 border border-orange-200 text-orange-800 text-xs font-bold rounded-2xl shadow-xs">
          <FileText className="w-4 h-4 text-orange-600" />
          <span className="truncate max-w-xs font-semibold">{attachedFile.name}</span>
          <button
            type="button"
            onClick={() => setAttachedFile(null)}
            className="p-1 hover:bg-orange-100 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5 text-orange-600" />
          </button>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className={`relative flex items-center bg-white border-2 rounded-3xl px-6 py-4 shadow-xl min-h-[76px] transition-all duration-200 ${
          isListening
            ? 'border-orange-500 ring-4 ring-orange-500/25 bg-orange-50/30'
            : 'border-[#cbd5e1] focus-within:border-orange-500 focus-within:ring-4 focus-within:ring-orange-500/20'
        }`}
      >
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="p-2.5 text-slate-500 hover:text-orange-600 rounded-full hover:bg-orange-50 transition-colors shrink-0 font-bold cursor-pointer"
          title="Attach media or files"
        >
          <Plus className="w-6 h-6 stroke-[2.5]" />
        </button>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />

        <input
          type="text"
          value={prompt}
          onChange={(e) => {
            setPrompt(e.target.value);
            promptRef.current = e.target.value;
            if (isListening) {
              clearAutoSubmitTimer();
              basePromptRef.current = e.target.value;
            }
            if (micError) setMicError('');
          }}
          onKeyDown={handleKeyDown}
          placeholder={
            isListening
              ? 'Listening... Speak into mic now...'
              : 'Ask Setu AI anything about traditional knowledge, farming, schemes...'
          }
          className="flex-1 bg-transparent border-none outline-none text-slate-900 placeholder-slate-400 text-lg sm:text-xl px-4 focus:ring-0 font-semibold"
        />

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={toggleVoiceTyping}
            className={`relative p-3 rounded-2xl font-bold transition-all flex items-center justify-center cursor-pointer ${
              isListening
                ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg shadow-orange-500/30 animate-pulse ring-2 ring-red-400'
                : 'bg-orange-100/90 text-orange-700 border border-orange-300 hover:bg-orange-500 hover:text-white shadow-sm opacity-100'
            }`}
            title={
              isListening
                ? 'Stop Voice Typing'
                : 'Click mic to speak and type with voice'
            }
          >
            <Mic className="w-5 h-5 stroke-[2.5]" />
            {isListening && (
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-80"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600 border border-white"></span>
              </span>
            )}
          </button>

          <button
            type="submit"
            disabled={(!prompt.trim() && !attachedFile) || isLoading}
            className="w-11 h-11 rounded-2xl bg-gradient-to-r from-[#FF9F43] to-[#E08A32] hover:opacity-90 text-white flex items-center justify-center shadow-md shadow-amber-500/25 transition-all disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed font-bold"
            title="Send message"
          >
            <ArrowUp className="w-6 h-6 stroke-[3]" />
          </button>
        </div>
      </form>
    </div>
  );
}
