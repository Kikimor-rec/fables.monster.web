"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useEditMode } from '@/contexts/EditModeContext';

interface InlineEditableProps {
  value: string;
  path: string;
  file?: string;
  className?: string;
  tag?: 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'p';
  multiline?: boolean;
}

export default function InlineEditable({ 
  value, 
  path, 
  file = 'site-content.json',
  className = '',
  tag = 'span',
  multiline = false
}: InlineEditableProps) {
  const { isEditMode } = useEditMode();
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const [isHovered, setIsHovered] = useState(false);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  
  // Проверяем, что мы в DEV режиме
  const isDev = process.env.NODE_ENV === 'development';
  
  useEffect(() => {
    setEditValue(value);
  }, [value]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      if (inputRef.current instanceof HTMLInputElement) {
        inputRef.current.select();
      } else if (inputRef.current instanceof HTMLTextAreaElement) {
        inputRef.current.setSelectionRange(0, inputRef.current.value.length);
      }
    }
  }, [isEditing]);

  if (!isDev || !isEditMode) {
    const Tag = tag;
    return <Tag className={className}>{value}</Tag>;
  }

  const handleClick = () => {
    if (isEditMode) {
      setIsEditing(true);
    }
  };

  const handleSave = async () => {
    if (editValue !== value) {
      await saveContent(file, path, editValue);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(value);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !multiline) {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Enter' && e.ctrlKey && multiline) {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
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
        // Перезагружаем страницу для обновления контента
        window.location.reload();
      } else {
        throw new Error('Save failed');
      }
    } catch (error) {
      console.error('Failed to save:', error);
      alert('Failed to save changes. Please try again.');
    }
  };

  if (isEditing) {
    const inputClassName = `${className} border-2 border-blue-400 bg-blue-50 text-black p-1 rounded`;
    
    if (multiline) {
      return (
        <div className="relative inline-block w-full">
          <textarea
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleSave}
            className={`${inputClassName} resize-none min-h-[2.5rem]`}
            rows={Math.max(2, editValue.split('\n').length)}
          />
          <div className="absolute -bottom-6 left-0 text-xs text-gray-500">
            Ctrl+Enter to save, Esc to cancel
          </div>
        </div>
      );
    } else {
      return (
        <div className="relative inline-block">
          <input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleSave}
            className={inputClassName}
          />
          <div className="absolute -bottom-6 left-0 text-xs text-gray-500 whitespace-nowrap">
            Enter to save, Esc to cancel
          </div>
        </div>
      );
    }
  }

  const Tag = tag;
  return (
    <Tag 
      className={`${className} ${isEditMode ? 'cursor-pointer' : ''} ${isHovered && isEditMode ? 'ring-2 ring-blue-400 ring-opacity-75 bg-blue-100/20 rounded px-1' : ''} transition-all duration-200`}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      title={isEditMode ? `Click to edit: ${path}` : undefined}
    >
      {value}
    </Tag>
  );
}
