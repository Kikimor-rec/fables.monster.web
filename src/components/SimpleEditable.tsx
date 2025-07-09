"use client";

import React, { useState } from 'react';

interface SimpleEditableProps {
  value: string;
  path: string;
  file?: string;
  className?: string;
  onClick?: () => void;
}

export default function SimpleEditable({ 
  value, 
  path, 
  file = 'site-content.json',
  className = '',
  onClick
}: SimpleEditableProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Проверяем, что мы в DEV режиме
  const isDev = process.env.NODE_ENV === 'development';
  
  if (!isDev) {
    return <span className={className}>{value}</span>;
  }

  const handleClick = () => {
    const newValue = prompt(`Edit ${path}:`, value);
    if (newValue !== null && newValue !== value) {
      // Сохраняем изменения
      saveContent(file, path, newValue);
    }
    if (onClick) onClick();
  };

  const saveContent = async (filename: string, contentPath: string, newValue: string) => {
    try {
      // Загружаем текущий контент
      const response = await fetch(`/api/dev/content?file=${filename}`);
      if (!response.ok) return;
      
      const content = await response.json();
      
      // Обновляем значение по пути
      const pathParts = contentPath.split('.');
      let current = content;
      
      for (let i = 0; i < pathParts.length - 1; i++) {
        if (!current[pathParts[i]]) current[pathParts[i]] = {};
        current = current[pathParts[i]];
      }
      
      current[pathParts[pathParts.length - 1]] = newValue;
      
      // Сохраняем
      const saveResponse = await fetch('/api/dev/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ file: filename, content })
      });

      if (saveResponse.ok) {
        // Перезагружаем страницу
        window.location.reload();
      }
    } catch (error) {
      console.error('Failed to save:', error);
      alert('Failed to save changes');
    }
  };

  return (
    <span 
      className={`${className} ${isHovered ? 'ring-2 ring-blue-400 ring-opacity-50' : ''} cursor-pointer transition-all`}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      title={`Click to edit: ${path}`}
    >
      {value}
    </span>
  );
}
