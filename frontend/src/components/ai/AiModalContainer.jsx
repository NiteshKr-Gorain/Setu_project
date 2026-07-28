import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import HomeView from './HomeView';
import ChatInput from './ChatInput';
import ChatMessagesView from './ChatMessagesView';
import ChatsView from './ChatsView';
import SettingsView from './SettingsView';
import { 
  checkBackendHealth, 
  sendChatMessage 
} from '../../services/apiService';
import { 
  searchLocalStorage, 
  saveToLocalStorageCache, 
  getRecentChats, 
  addRecentChat,
  deleteHistoryAndChat
} from '../../services/localStorageService';

export default function AiModalContainer({ userProfile, onClose }) {
  const [activeTab, setActiveTab] = useState('home');
  const [darkMode, setDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [chatsList, setChatsList] = useState([]);
  const [activeChatMessages, setActiveChatMessages] = useState(null);
  const [activeChatTitle, setActiveChatTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState('Instant');
  const [isBackendConnected, setIsBackendConnected] = useState(false);

  const checkHealth = async () => {
    const health = await checkBackendHealth();
    setIsBackendConnected(health.connected);
    return health;
  };

  useEffect(() => {
    setChatsList(getRecentChats());
    checkHealth();

    const timer = setInterval(() => {
      checkHealth();
    }, 10000);

    return () => clearInterval(timer);
  }, []);

  const handleStartNewChat = () => {
    setActiveChatMessages(null);
    setActiveChatTitle('');
    setActiveTab('home');
  };

  const handleSendMessage = async (promptText, category = 'General') => {
    if (!promptText.trim()) return;

    const userMsg = {
      sender: 'user',
      text: promptText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const currentMessages = activeChatMessages ? [...activeChatMessages, userMsg] : [userMsg];
    setActiveChatMessages(currentMessages);
    if (!activeChatTitle) setActiveChatTitle(promptText);
    setIsLoading(true);

    const localCheck = searchLocalStorage(promptText);
    const apiResult = await sendChatMessage(promptText, category, localCheck);

    if (apiResult.success && apiResult.data) {
      const data = apiResult.data;
      const aiMsg = {
        sender: 'ai',
        text: data.response || 'No response content returned.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        category: data.category || category,
        source: data.source || 'Dual Search (Local + Google)',
        localMatch: data.local_match || (localCheck.found ? localCheck : null),
        googleMatch: data.google_match || null,
        sources: data.sources || ['Local Knowledge', 'Google Web Search'],
        points: data.points || null,
        kerasMetadata: data.keras_metadata || null,
        persona: data.persona || 'Wise Master'
      };

      setActiveChatMessages(prev => [...prev, aiMsg]);
      saveToLocalStorageCache(promptText, aiMsg.text, aiMsg.category, data);
      setChatsList(addRecentChat(promptText, aiMsg.category));
      setIsBackendConnected(true);
      setIsLoading(false);
      return;
    }

    setIsBackendConnected(false);
    const localResult = searchLocalStorage(promptText);

    if (localResult.found) {
      const cached = localResult.data;
      const aiMsg = {
        sender: 'ai',
        text: cached.response,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        category: cached.category || category,
        source: cached.source || 'Local Storage Cache (Offline)',
        points: cached.points || null,
        kerasMetadata: cached.kerasMetadata || null,
        persona: cached.persona || 'Cached Knowledge'
      };

      setActiveChatMessages(prev => [...prev, aiMsg]);
      setChatsList(addRecentChat(promptText, category));
    } else {
      const fallbackText = `I'm here to assist you with "${promptText}". Traditional wisdom combined with modern technology empowers sustainable solutions for our communities!`;
      const fallbackAiMsg = {
        sender: 'ai',
        text: fallbackText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        category,
        source: 'Setu Knowledge Synthesizer'
      };

      setActiveChatMessages(prev => [...prev, fallbackAiMsg]);
      saveToLocalStorageCache(promptText, fallbackText, category);
      setChatsList(addRecentChat(promptText, category));
    }

    setIsLoading(false);
  };

  const handleSelectRecentChat = (chat) => {
    setActiveChatTitle(chat.title);
    setActiveChatMessages([
      {
        sender: 'user',
        text: `Open chat thread for "${chat.title}"`,
        timestamp: chat.timestamp
      },
      {
        sender: 'ai',
        text: `Stored thread loaded for "${chat.title}".`,
        source: 'Local Storage Cache',
        timestamp: chat.timestamp
      }
    ]);
  };

  const handleResetChatView = () => {
    setActiveChatMessages(null);
    setActiveChatTitle('');
  };

  const handleDeleteRecentChat = (chatToDelete) => {
    const result = deleteHistoryAndChat(chatToDelete.id, chatToDelete.title);
    setChatsList(result.recentChats);
    if (activeChatTitle === chatToDelete.title) {
      handleResetChatView();
    }
  };

  const renderMainContent = () => {
    if (activeChatMessages) {
      return (
        <div className="flex-1 flex flex-col min-h-0 bg-[#f5f5f7]">
          <ChatMessagesView
            messages={activeChatMessages}
            title={activeChatTitle}
            onBack={handleResetChatView}
            isLoading={isLoading}
            userProfile={userProfile}
          />
          <div className="pb-6 pt-2 bg-[#f5f5f7]">
            <ChatInput
              onSendMessage={(txt) => handleSendMessage(txt)}
              isLoading={isLoading}
              selectedModel={selectedModel}
              setSelectedModel={setSelectedModel}
            />
          </div>
        </div>
      );
    }

    switch (activeTab) {
      case 'chats':
        return (
          <ChatsView
            chats={chatsList}
            setChatsList={setChatsList}
            onSelectChat={handleSelectRecentChat}
            onNewChat={handleStartNewChat}
          />
        );
      case 'settings':
        return (
          <SettingsView
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            isBackendConnected={isBackendConnected}
            onRefreshBackendStatus={checkHealth}
          />
        );
      case 'home':
      default:
        return (
          <HomeView
            onSendMessage={(prompt, cat) => handleSendMessage(prompt, cat)}
            isLoading={isLoading}
            selectedModel={selectedModel}
            setSelectedModel={setSelectedModel}
          />
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative flex h-full w-full max-w-7xl max-h-[92vh] bg-[#f5f5f7] rounded-3xl border border-slate-200/80 shadow-2xl overflow-hidden text-slate-800 selection:bg-amber-500 selection:text-white">
        {/* Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={(tab) => {
            setActiveTab(tab);
            setActiveChatMessages(null);
          }}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          onNewChat={handleStartNewChat}
          chats={chatsList}
          onSelectChat={handleSelectRecentChat}
          activeChatTitle={activeChatTitle}
          onDeleteChat={handleDeleteRecentChat}
          userProfile={userProfile}
        />

        {/* Main Container */}
        <main className="flex-1 flex flex-col h-full overflow-hidden relative bg-[#f5f5f7]">
          <Header
            onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
            activeChatTitle={activeChatTitle}
            isBackendConnected={isBackendConnected}
            onClose={onClose}
          />

          {renderMainContent()}
        </main>
      </div>
    </div>
  );
}
