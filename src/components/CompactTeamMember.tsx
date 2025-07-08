"use client";

import Image from "next/image";
import { useState } from "react";

interface CompactTeamMemberProps {
  member: {
    name: string;
    role: string;
    image: string;
  };
}

export default function CompactTeamMember({ member }: CompactTeamMemberProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="group relative flex items-center bg-black border border-red-700 p-3 hover:border-red-500 transition-all duration-300 hover:bg-red-950/20 w-64 h-20"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glitch overlay */}
      <div className={`absolute inset-0 bg-red-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isHovered ? "animate-pulse" : ""}`}></div>
      
      {/* Profile Image */}
      <div className="relative w-14 h-16 overflow-hidden mr-3">
        <div className="absolute inset-0 border border-red-700 group-hover:border-red-500 transition-colors duration-300"></div>
        
        <Image
          src={`/images/crew/${member.image}`}
          alt={member.name}
          fill
          className={`object-cover transition-all duration-300 ${
            isHovered ? "scale-105 brightness-110" : "grayscale-[50%]"
          }`}
          style={{ objectPosition: "50% 15%" }}
          sizes="56px"
        />
        
        {/* Mini glitch effect */}
        {isHovered && (
          <div className="absolute inset-0 bg-red-500/20 mix-blend-multiply animate-pulse"></div>
        )}
      </div>

      {/* Member Info */}
      <div className="flex-1">
        <h4 className="text-sm font-bold text-white font-mono group-hover:text-red-400 transition-colors duration-300 truncate">
          {member.name}
        </h4>
        <p className="text-xs text-gray-400 font-mono truncate">
          {member.role}
        </p>
      </div>
      
      {/* Status indicator */}
      <div className="w-2 h-2 border border-red-500 bg-red-500/30 group-hover:bg-red-500 group-hover:animate-pulse transition-all duration-300 ml-2"></div>
    </div>
  );
}
