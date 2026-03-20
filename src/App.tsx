/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Zap, Sparkles, Terminal, Copy, Check, RefreshCw, Lightbulb, Type, Hash, ListTree, BarChart3, BrainCircuit } from 'lucide-react';
import { generateCreativeResponse, CreativeMode } from './services/gemini';
import ChurnDashboard from './components/ChurnDashboard';

type AppView = 'creative' | 'analytics';

export default function App() {
  const [view, setView] = useState<AppView>('creative');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [mode, setMode] = useState<CreativeMode>('default');

  const modes: { id: CreativeMode; label: string; icon: React.ReactNode }[] = [
    { id: 'default', label: 'General', icon: <Sparkles size={16} /> },
    { id: 'brainstorming', label: 'Brainstorm', icon: <Lightbulb size={16} /> },
    { id: 'naming', label: 'Naming', icon: <Type size={16} /> },
    { id: 'tagline', label: 'Taglines', icon: <Hash size={16} /> },
    { id: 'outline', label: 'Outline', icon: <ListTree size={16} /> },
  ];

  const handleGenerate = async () => {
    if (!input.trim() || isLoading) return;
    setIsLoading(true);
    try {
      const result = await generateCreativeResponse(input, mode);
      setOutput(result || 'No response generated.');
    } catch (error) {
      setOutput('ERROR: Failed to connect to the creative core.');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gallery-white">
      {/* Top Navigation Bar */}
      <nav className="bg-brutal-black border-b-2 border-brutal-black flex justify-between items-center px-6 py-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-neon-green flex items-center justify-center border-2 border-white">
            <Zap size={20} className="text-black fill-current" />
          </div>
          <h1 className="font-display text-xl text-white uppercase italic tracking-tighter">Nexus OS</h1>
        </div>
        
        <div className="flex gap-2">
          <button 
            onClick={() => setView('creative')}
            className={`px-4 py-1 font-mono text-[10px] uppercase border-2 transition-all flex items-center gap-2 ${
              view === 'creative' ? 'bg-neon-green border-white text-black' : 'bg-transparent border-zinc-700 text-zinc-500 hover:border-zinc-500'
            }`}
          >
            <BrainCircuit size={14} /> Creative Core
          </button>
          <button 
            onClick={() => setView('analytics')}
            className={`px-4 py-1 font-mono text-[10px] uppercase border-2 transition-all flex items-center gap-2 ${
              view === 'analytics' ? 'bg-neon-green border-white text-black' : 'bg-transparent border-zinc-700 text-zinc-500 hover:border-zinc-500'
            }`}
          >
            <BarChart3 size={14} /> Churn Analytics
          </button>
        </div>
      </nav>

      {/* Header Marquee */}
      <div className="bg-zinc-100 text-brutal-black py-1 overflow-hidden whitespace-nowrap border-b-2 border-brutal-black">
        <div className="marquee-track flex gap-8 font-mono text-[10px] uppercase tracking-widest opacity-50">
          {[...Array(10)].map((_, i) => (
            <span key={i}>
              {view === 'creative' 
                ? "Nexus Creative AI // Powered by Gemini 3 Flash // System Online // 2026.03.20"
                : "Nexus Analytics // Churn Prediction Engine // Real-time Sync // 2026.03.20"}
            </span>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        {view === 'creative' ? (
          <main className="grid grid-cols-1 lg:grid-cols-2 h-full min-h-[calc(100vh-120px)]">
            {/* Input Section */}
            <section className="p-6 lg:p-12 border-r-2 border-brutal-black flex flex-col gap-8">
              <div className="flex items-center gap-4">
                <div className="big-number font-display text-6xl lg:text-8xl leading-none">01</div>
                <div>
                  <h2 className="font-display text-2xl uppercase tracking-tight">The Input</h2>
                  <p className="text-xs font-mono opacity-60 uppercase">Define your creative vision</p>
                </div>
              </div>

              <div className="flex-1 flex flex-col gap-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
                  {modes.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setMode(m.id)}
                      className={`py-2 px-3 border-2 border-black flex items-center justify-center gap-2 font-mono text-[10px] uppercase transition-all ${
                        mode === m.id ? 'bg-brutal-black text-neon-green shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' : 'bg-white hover:bg-zinc-100'
                      }`}
                    >
                      {m.icon}
                      {m.label}
                    </button>
                  ))}
                </div>

                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Enter a prompt to ignite the creative core..."
                  className="flex-1 w-full p-6 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:outline-none focus:ring-2 focus:ring-neon-green font-mono text-lg resize-none placeholder:opacity-30"
                />
                
                <button
                  onClick={handleGenerate}
                  disabled={isLoading || !input.trim()}
                  className="w-full py-6 bg-neon-green border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none flex items-center justify-center gap-3 font-display text-2xl uppercase transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <RefreshCw className="animate-spin" />
                  ) : (
                    <>
                      <Zap className="fill-current" />
                      Generate Vision
                    </>
                  )}
                </button>
              </div>
            </section>

            {/* Output Section */}
            <section className="p-6 lg:p-12 bg-brutal-black text-gallery-white flex flex-col gap-8 relative">
              <div className="flex items-center gap-4">
                <div className="big-number font-display text-6xl lg:text-8xl leading-none text-neon-green">02</div>
                <div>
                  <h2 className="font-display text-2xl uppercase tracking-tight">The Output</h2>
                  <p className="text-xs font-mono opacity-60 uppercase text-neon-green">AI-Generated Creative Artifacts</p>
                </div>
              </div>

              <div className="flex-1 border-2 border-neon-green p-6 overflow-auto font-mono text-sm leading-relaxed relative bg-zinc-900/50">
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-brutal-black/80 z-10">
                    <div className="flex flex-col items-center gap-4">
                      <RefreshCw className="w-12 h-12 text-neon-green animate-spin" />
                      <p className="font-mono text-xs uppercase tracking-widest animate-pulse">Processing Neural Pathways...</p>
                    </div>
                  </div>
                )}

                <AnimatePresence mode="wait">
                  {output ? (
                    <motion.div
                      key="output"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="prose prose-invert max-w-none"
                    >
                      <pre className="whitespace-pre-wrap font-mono text-neon-green/90">
                        {output}
                      </pre>
                    </motion.div>
                  ) : (
                    <div key="empty" className="h-full flex items-center justify-center opacity-20 italic">
                      Waiting for input...
                    </div>
                  )}
                </AnimatePresence>
              </div>

              {output && (
                <div className="flex gap-4">
                  <button
                    onClick={copyToClipboard}
                    className="flex-1 py-4 border-2 border-neon-green text-neon-green hover:bg-neon-green hover:text-brutal-black transition-colors font-mono text-xs uppercase flex items-center justify-center gap-2"
                  >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                    {copied ? 'Copied' : 'Copy Artifact'}
                  </button>
                </div>
              )}
            </section>
          </main>
        ) : (
          <ChurnDashboard />
        )}
      </div>

      {/* Footer */}
      <footer className="p-4 border-t-2 border-brutal-black flex justify-between items-center bg-gallery-white">
        <div className="flex items-center gap-2">
          <Terminal size={16} />
          <span className="font-mono text-[10px] uppercase tracking-tighter">Nexus_v1.0.4_Stable</span>
        </div>
        <div className="flex gap-6 font-mono text-[10px] uppercase tracking-tighter opacity-60">
          <span>Latency: {isLoading ? 'Calculating...' : '42ms'}</span>
          <span>Core: Gemini 3 Flash</span>
        </div>
      </footer>
    </div>
  );
}
