"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const CONTACTS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/raiven-rovic-leandicho-2baa69260/", isExternal: true },
];

export default function HomePage() {
  const [showContacts, setShowContacts] = useState(false);
  const [copied, setCopied] = useState(false);

  const email = "rovicleandicho@gmail.com";

  const handleEmailClick = useCallback(() => {
    window.location.href = `mailto:${email}`;
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [email]);

  return (
    <div className="h-screen w-full bg-gradient-to-b from-black via-gray-900 to-black text-white overflow-hidden flex flex-col relative">
      <main className="flex-1 flex flex-row items-stretch justify-between w-full mx-auto container">
        
        {/* Profile Image Section */}
        <motion.div 
          animate={{ x: showContacts ? -150 : 0, opacity: showContacts ? 0.3 : 1 }}
          transition={{ type: "spring", stiffness: 80, damping: 20 }}
          className="relative w-2/5 flex items-end justify-start h-full"
        >
          <Image
            src="/Raiven.png"
            alt="Raiven"
            fill
            className="object-contain object-left-bottom"
            priority
          />
        </motion.div>

        {/* Content Section */}
        <div className="relative flex flex-col justify-center w-3/5 pr-20 pl-24">
          <AnimatePresence mode="wait">
            {!showContacts ? (
              <motion.div
                key="hero"
                initial={{ x: 30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -30, opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col gap-6"
              >
                <h2 className="text-3xl font-bold text-gray-400">Hi, I'm Raiven!</h2>
                <h1 className="text-6xl md:text-8xl font-black uppercase leading-[0.9] tracking-tighter">
                  FRONT-END <span className="text-gray-500">DEVELOPER</span>
                </h1>
                <p className="text-lg text-gray-400 max-w-xl">
                  UI/UX Enthusiast. I create clean, visually stunning, and user-friendly web experiences 
                  by transforming ideas into functional digital products.
                </p>

                <div className="flex flex-wrap gap-4 mt-4">
                  <button
                    onClick={() => setShowContacts(true)}
                    className="px-8 py-3 rounded-md bg-white text-black font-bold hover:bg-gray-200 transition-transform active:scale-95"
                  >
                    CONTACT ME
                  </button>
                  
                  <a
                    href="/Raiven_CV.pdf"
                    download
                    className="px-8 py-3 rounded-md border border-white text-white font-bold hover:bg-white hover:text-black transition-all active:scale-95"
                  >
                    DOWNLOAD CV
                  </a>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="contacts"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 50, opacity: 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className="flex flex-col gap-8"
              >
                <button 
                  onClick={() => setShowContacts(false)}
                  className="text-gray-400 hover:text-white flex items-center gap-2 font-bold mb-4 w-fit transition-colors"
                >
                  ← BACK
                </button>
                <h2 className="text-5xl font-black uppercase tracking-tighter">Get In Touch</h2>
                
                <div className="flex flex-col gap-6 font-bold">
                  <div className="flex flex-col gap-1">
                    <button 
                      onClick={handleEmailClick}
                      className="text-3xl hover:text-gray-400 transition-colors w-fit text-left"
                    >
                      {copied ? "Email Copied" : "Email ↗"}
                    </button>
                    <AnimatePresence>
                      {copied && (
                        <motion.span 
                          initial={{ opacity: 0 }} 
                          animate={{ opacity: 1 }} 
                          className="text-xs text-green-400 font-normal"
                        >
                          Copied to clipboard!
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                  
                  {CONTACTS.map((link) => (
                    <a 
                      key={link.label}
                      href={link.href}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-3xl hover:text-gray-400 transition-colors w-fit"
                    >
                      {link.label} ↗
                    </a>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}