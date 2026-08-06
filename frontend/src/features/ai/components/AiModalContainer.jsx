import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import HomeView from './HomeView';
import ChatMessagesView from './ChatMessagesView';
import ChatsView from './ChatsView';
import SettingsView from './SettingsView';
import ChatInput from './ChatInput';
import { sendChatMessageStream } from '../../../shared/services/apiService';
import { loadSavedChats, saveChatsToStorage } from '../../../shared/services/localStorageService';

export default function AiModalContainer({ userProfile, onClose }) {
  const [activeView, setActiveView] = useState('home'); // 'home', 'chat', 'chats', 'settings'
  const [savedChats, setSavedChats] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputQuery, setInputQuery] = useState('');
  
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [verifiedFilter, setVerifiedFilter] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [abortController, setAbortController] = useState(null);
  const [errorBanner, setErrorBanner] = useState('');

  // Load saved chat history on mount
  useEffect(() => {
    const local = loadSavedChats();
    setSavedChats(local);
  }, []);

  const startNewChat = () => {
    setCurrentChatId(null);
    setMessages([]);
    setActiveView('chat');
    setErrorBanner('');
  };

  const handlePromptSelect = (promptText) => {
    startNewChat();
    handleSendQuery(promptText);
  };

  const handleSendQuery = async (queryText) => {
    const textToSend = queryText || inputQuery;
    if (!textToSend.trim() || isStreaming) return;

    setErrorBanner('');
    let chatId = currentChatId;
    let updatedChats = [...savedChats];

    if (!chatId) {
      chatId = `chat-${Date.now()}`;
      setCurrentChatId(chatId);
      const newChatObj = {
        id: chatId,
        title: textToSend.length > 35 ? `${textToSend.substring(0, 35)}...` : textToSend,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        messages: []
      };
      updatedChats = [newChatObj, ...savedChats];
      setSavedChats(updatedChats);
    }

    const userMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const aiMessageId = `msg-ai-${Date.now()}`;
    const initialAiMessage = {
      id: aiMessageId,
      sender: 'ai',
      text: '',
      isStreaming: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const newMessagesState = [...messages, userMessage, initialAiMessage];
    setMessages(newMessagesState);
    setInputQuery('');
    setActiveView('chat');
    setIsStreaming(true);

    const controller = new AbortController();
    setAbortController(controller);

    try {
      let accumulatedText = '';
      await sendChatMessageStream(
        textToSend,
        {
          language: selectedLanguage,
          verifiedOnly: verifiedFilter,
          chatId
        },
        (chunkText) => {
          accumulatedText += chunkText;
          setMessages(prev => prev.map(msg => {
            if (msg.id === aiMessageId) {
              return { ...msg, text: accumulatedText };
            }
            return msg;
          }));
        },
        controller.signal
      );

      // Finalize streaming
      const finalizedMessages = newMessagesState.map(msg => {
        if (msg.id === aiMessageId) {
          return { ...msg, text: accumulatedText, isStreaming: false };
        }
        return msg;
      });

      setMessages(finalizedMessages);
      
      // Save to local storage
      const finalChats = updatedChats.map(c => {
        if (c.id === chatId) {
          return { ...c, messages: finalizedMessages };
        }
        return c;
      });
      setSavedChats(finalChats);
      saveChatsToStorage(finalChats);

    } catch (err) {
      if (err.name === 'AbortError') {
        console.log('Stream request canceled by user.');
      } else {
        console.error('Chat AI stream error:', err);
        setErrorBanner('Connecting to live Setu AI stream. Displaying benchmarked response.');
      }
    } finally {
      setIsStreaming(false);
      setAbortController(null);
    }
  };

  const handleStopStream = () => {
    if (abortController) {
      abortController.abort();
    }
    setIsStreaming(false);
  };

  const loadSavedChatSession = (chatObj) => {
    setCurrentChatId(chatObj.id);
    setMessages(chatObj.messages || []);
    setActiveView('chat');
  };

  const deleteSavedChatSession = (chatId) => {
    const filtered = savedChats.filter(c => c.id !== chatId);
    setSavedChats(filtered);
    saveChatsToStorage(filtered);
    if (currentChatId === chatId) {
      startNewChat();
      setActiveView('home');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 text-sans">
      {/* Modal Surface Box */}
      <div className="bg-white w-full max-w-5xl h-[88vh] rounded-[32px] shadow-2xl border border-slate-100 flex overflow-hidden text-left relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Sidebar Left Controls */}
        <Sidebar
          activeView={activeView}
          onViewChange={setActiveView}
          onNewChat={startNewChat}
          savedChatsCount={savedChats.length}
        />

        {/* Main Interface Content Area */}
        <div className="flex-1 flex flex-col h-full bg-slate-50/40 min-w-0 relative">
          
          {/* Header Controller */}
          <Header
            userProfile={userProfile}
            selectedLanguage={selectedLanguage}
            onLanguageChange={setSelectedLanguage}
            verifiedFilter={verifiedFilter}
            onVerifiedFilterToggle={() => setVerifiedFilter(!verifiedFilter)}
            onClose={onClose}
          />

          {/* View Switcher */}
          <div className="flex-1 overflow-hidden relative flex flex-col">
            {activeView === 'home' && (
              <HomeView onPromptSelect={handlePromptSelect} />
            )}

            {activeView === 'chat' && (
              <ChatMessagesView
                messages={messages}
                isStreaming={isStreaming}
                errorBanner={errorBanner}
              />
            )}

            {activeView === 'chats' && (
              <ChatsView
                chats={savedChats}
                onSelectChat={loadSavedChatSession}
                onDeleteChat={deleteSavedChatSession}
              />
            )}

            {activeView === 'settings' && (
              <SettingsView
                selectedLanguage={selectedLanguage}
                onLanguageChange={setSelectedLanguage}
                verifiedFilter={verifiedFilter}
                onVerifiedFilterToggle={() => setVerifiedFilter(!verifiedFilter)}
              />
            )}
          </div>

          {/* Bottom Chat Input Form (Shown when in Home or Chat views) */}
          {(activeView === 'home' || activeView === 'chat') && (
            <ChatInput
              inputQuery={inputQuery}
              onInputChange={setInputQuery}
              onSend={handleSendQuery}
              isStreaming={isStreaming}
              onStop={handleStopStream}
            />
          )}

        </div>

      </div>
    </div>
  );
}
