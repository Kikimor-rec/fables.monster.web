"use client";

import { useState, memo } from "react";
import OptimizedImage from "./OptimizedImage";

interface CompactTeamMemberProps {
  member: {
    name: string;
    role: string;
    image: string;
    status?: string;
    bio?: string;
    portfolio?: string;
  };
}

const CompactTeamMember = memo(function CompactTeamMember({ member }: CompactTeamMemberProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="group relative flex items-center bg-black border border-red-700 p-2 sm:p-3 hover:border-red-500 transition-all duration-300 hover:bg-red-950/20 w-56 sm:w-64 h-16 sm:h-20"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glitch overlay */}
      <div className={`absolute inset-0 bg-red-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isHovered ? "animate-pulse" : ""}`}></div>
      
      {/* Profile Image */}
      <div className="relative w-12 sm:w-14 h-12 sm:h-16 overflow-hidden mr-2 sm:mr-3">
        <div className="absolute inset-0 border border-red-700 group-hover:border-red-500 transition-colors duration-300"></div>
        
        <OptimizedImage
          src={`/images/crew/${member.image}`}
          alt={member.name}
          fill
          className={`transition-all duration-300 ${
            isHovered ? "scale-105 brightness-110" : "grayscale-[50%]"
          }`}
          style={{ objectFit: "cover", objectPosition: "50% 15%" }}
          sizes="(max-width: 640px) 48px, 56px"
        />
        
        {/* Mini glitch effect */}
        {isHovered && (
          <div className="absolute inset-0 bg-red-500/20 mix-blend-multiply animate-pulse"></div>
        )}
      </div>

      {/* Member Info */}
      <div className="flex-1 min-w-0">
        <h4 className="text-xs sm:text-sm font-bold text-white font-nunito group-hover:text-red-400 transition-colors duration-300 truncate">
            {member.name}
        </h4>
        <p className="text-xs text-gray-400 font-nunito truncate">
          {member.role}
        </p>
      </div>
      
      {/* Status indicator */}
      <div className="w-2 h-2 border border-red-500 bg-red-500/30 group-hover:bg-red-500 group-hover:animate-pulse transition-all duration-300 ml-1 sm:ml-2 flex-shrink-0"></div>
    </div>
  );
});

export default CompactTeamMember;
