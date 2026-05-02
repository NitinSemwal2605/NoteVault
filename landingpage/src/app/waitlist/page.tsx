"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm, ValidationError } from "@formspree/react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function WaitlistPage() {
  const [state, handleSubmit] = useForm(process.env.NEXT_PUBLIC_FORMSPREE_ID || "");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen bg-[#FFFFFF] flex flex-col font-[var(--font-plus-jakarta),sans-serif]">
      {/* Simple Header */}
      <header className="py-6 px-6 lg:px-8 border-b border-[#E5E5E5]">
        <a
          href="/"
          className="flex items-center gap-2.5 group w-max"
          aria-label="NotesVaults Home"
        >
          <div className="relative w-10 h-10 group-hover:scale-105 transition-transform duration-200">
            <Image
              src="/logo.png"
              alt="NotesVaults Logo"
              fill
              className="object-contain mix-blend-multiply"
              priority
            />
          </div>
          <span className="font-[var(--font-plus-jakarta)] text-xl font-extrabold text-[#1A1A1A] tracking-tight">
            NotesVaults
          </span>
        </a>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-6 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-30">
           <div className="absolute top-0 left-[20%] w-px h-full bg-gradient-to-b from-transparent via-[#E5E5E5] to-transparent dashed-line-v" />
           <div className="absolute top-0 right-[20%] w-px h-full bg-gradient-to-b from-transparent via-[#E5E5E5] to-transparent dashed-line-v" />
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-16 w-full max-w-5xl relative z-10">
          
          {/* Left: Illustration with Speech Bubble */}
          <div className="hidden lg:block w-[350px] xl:w-[450px] shrink-0 animate-in fade-in slide-in-from-left-8 duration-700 relative mt-10">
             
             {/* Speech Bubble */}
             <div className="absolute -top-4 right-[15%] z-20 bg-white border-2 border-[#1A1A1A] rounded-2xl rounded-br-none px-5 py-2.5 shadow-[4px_4px_0_rgba(26,26,26,1)] animate-bounce origin-bottom-right rotate-[-5deg]">
               <span className="font-[var(--font-plus-jakarta)] font-extrabold text-[#1A1A1A] text-lg tracking-tight whitespace-nowrap">
                 Join fast! ⚡
               </span>
             </div>

             <Image 
               src="/waitlist-student.png" 
               alt="A student pointing to the waitlist form"
               width={500} 
               height={700} 
               className="w-full h-auto object-contain mix-blend-multiply drop-shadow-sm relative z-10" 
               priority
             />
          </div>

          {/* Right: Form */}
          <div className="max-w-md w-full shrink-0">
            <div className="bg-white border-2 border-[#1A1A1A] rounded-2xl p-8 sm:p-10 shadow-[8px_8px_0_rgba(26,26,26,1)] transition-all duration-300">
              {!state.succeeded ? (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.2em] font-bold text-[#1A1A1A] bg-[#F5F5F5] px-3 py-1.5 rounded-full border border-[#E5E5E5] mb-6">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1A1A1A] inline-block animate-pulse" />
                    Early Access
                  </div>
                  <h1 className="font-[var(--font-plus-jakarta)] text-3xl sm:text-4xl font-extrabold text-[#1A1A1A] mb-4 tracking-tight leading-tight">
                    Join the waitlist
                  </h1>
                  <p className="text-[#525252] text-sm sm:text-base font-medium">
                    Reserve your spot today. We'll notify you the moment NotesVaults is ready for launch.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-bold text-[#1A1A1A] mb-1.5">
                      First Name
                    </label>
                    <Input
                      id="name"
                      type="text"
                      name="name"
                      placeholder="John"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="h-12 border-2 border-[#E5E5E5] focus-visible:ring-0 focus-visible:border-[#1A1A1A] rounded-xl text-base shadow-sm"
                    />
                    <ValidationError 
                      prefix="Name" 
                      field="name"
                      errors={state.errors}
                      className="text-red-500 text-xs mt-1 font-bold"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-bold text-[#1A1A1A] mb-1.5">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="john@example.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12 border-2 border-[#E5E5E5] focus-visible:ring-0 focus-visible:border-[#1A1A1A] rounded-xl text-base shadow-sm"
                    />
                    <ValidationError 
                      prefix="Email" 
                      field="email"
                      errors={state.errors}
                      className="text-red-500 text-xs mt-1 font-bold"
                    />
                  </div>
                  
                  <ValidationError 
                    errors={state.errors}
                    className="text-red-500 text-sm font-semibold bg-red-50 p-3 rounded-lg border border-red-200 block"
                  />

                  <Button
                    type="submit"
                    disabled={state.submitting}
                    className="w-full h-12 mt-4 rounded-xl bg-[#1A1A1A] text-white text-[15px] font-bold hover:bg-[#333] transition-all duration-200 shadow-[3px_3px_0_rgba(26,26,26,1)] hover:shadow-[5px_5px_0_rgba(26,26,26,1)] hover:-translate-y-0.5 group cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-[3px_3px_0_rgba(26,26,26,1)]"
                  >
                    {state.submitting ? "Joining..." : "Join the queue"}
                    {!state.submitting && <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />}
                  </Button>
                </form>
              </div>
            ) : (
              <div className="text-center py-6 animate-in zoom-in-95 duration-500">
                <div className="w-16 h-16 bg-[#F5F5F5] rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-[#1A1A1A] shadow-[4px_4px_0_rgba(26,26,26,1)]">
                  <CheckCircle2 size={32} className="text-[#1A1A1A]" />
                </div>
                <h2 className="font-[var(--font-plus-jakarta)] text-2xl sm:text-3xl font-extrabold text-[#1A1A1A] mb-3 tracking-tight">
                  You're on the list!
                </h2>
                <p className="text-[#525252] text-sm sm:text-base font-medium mb-8">
                  Thanks for joining, {name}. Keep an eye on your inbox, we'll be in touch soon!
                </p>
                <a href="/">
                  <Button
                    className="h-11 px-6 rounded-xl bg-white border-2 border-[#1A1A1A] text-[#1A1A1A] text-[14px] font-bold hover:bg-[#F5F5F5] transition-all duration-200 shadow-[3px_3px_0_rgba(26,26,26,1)] hover:shadow-[4px_4px_0_rgba(26,26,26,1)] hover:-translate-y-0.5 cursor-pointer"
                  >
                    Return to home
                  </Button>
                </a>
              </div>
            )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
