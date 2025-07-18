"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

interface TeamMemberProps {
  member: {
    name: string;
    role: string;
    bio: string;
    image: string;
    link?: string;
  };
}

export default function TeamMember({ member }: TeamMemberProps) {
  const [isHovered, setIsHovered] = useState(false);

  const content = (
    <div 
      className="group relative w-72 h-[30rem] bg-black border border-red-700 p-6 hover:border-red-500 transition-all duration-300 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glitch overlay effect */}
      <div className={`absolute inset-0 bg-red-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isHovered ? "animate-pulse" : ""}`}></div>
      
      {/* Scanlines effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-500/10 to-transparent animate-pulse"></div>
        <div className="absolute inset-0 bg-[linear-gradient(transparent_98%,rgba(255,0,0,0.03)_100%)] bg-[length:100%_4px]"></div>
      </div>
      
      <div className="relative z-10 flex flex-col h-full">
        {/* Profile Image */}
        <div className="relative mb-6 mx-auto w-36 h-52 overflow-hidden">
          <div className="absolute inset-0 border-2 border-red-700 group-hover:border-red-500 transition-colors duration-300"></div>
          
          {/* Main image */}
          <Image
            src={`/images/crew/${member.image}`}
            alt={member.name}
            fill
            className={`object-cover transition-all duration-300 ${
              isHovered ? "scale-105 brightness-110 contrast-125" : "grayscale-[30%]"
            }`}
            style={{ objectPosition: "50% 10%" }}
            sizes="128px"
          />
          
          {/* Glitch effect overlay */}
          {isHovered && (
            <>
              <div className="absolute inset-0 bg-red-500/20 mix-blend-multiply animate-pulse"></div>
              <div className="absolute inset-0 bg-blue-500/10 mix-blend-screen animate-ping"></div>
            </>
          )}
          
          {/* Digital noise effect */}
          <div className={`absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-300 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0ibm9pc2UiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSIyIiBoZWlnaHQ9IjIiIGZpbGw9IiNmZjAwMDAiIG9wYWNpdHk9IjAuMSIvPjxyZWN0IHg9IjIiIHk9IjIiIHdpZHRoPSIyIiBoZWlnaHQ9IjIiIGZpbGw9IiMwMGZmZmYiIG9wYWNpdHk9IjAuMDUiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjbm9pc2UpIi8+PC9zdmc+')] animate-pulse`}></div>
        </div>

        {/* Member Info */}
        <div className="text-center flex-grow flex flex-col">
          {/* Name with glitch text effect */}
          <h3 className="text-xl font-bold text-white mb-2 font-nunito group-hover:text-red-400 transition-colors duration-300 relative">
            {member.name}
            {isHovered && (
              <span className="absolute inset-0 text-red-500 opacity-50 animate-ping">
                {member.name}
              </span>
            )}
          </h3>
          
          {/* Role */}
          <div className="text-red-400 font-nunito text-sm mb-3 uppercase tracking-wider">
            {member.role}
          </div>
          
          {/* Bio */}
          <p className="text-gray-300 text-sm font-nunito flex-grow leading-relaxed">
            {member.bio}
          </p>
          
          {/* Terminal-style cursor blink */}
          <div className="mt-4 text-red-500 font-nunito text-sm animate-pulse">
            {isHovered ? ">>> ACCESS GRANTED" : ">>> HOVER TO ACCESS"}
          </div>
        </div>
      </div>
      
      {/* Corner decorations */}
      <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-red-700 group-hover:border-red-500 transition-colors"></div>
      <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-red-700 group-hover:border-red-500 transition-colors"></div>
      <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-red-700 group-hover:border-red-500 transition-colors"></div>
      <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-red-700 group-hover:border-red-500 transition-colors"></div>
    </div>
  );

  // If member has a link, wrap in Link component
  if (member.link) {
    return (
      <Link href={member.link} target="_blank" rel="noopener noreferrer" className="block cursor-pointer">
        {content}
      </Link>
    );
  }

  return content;
}
