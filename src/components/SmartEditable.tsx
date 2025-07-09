"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useEditMode } from '@/contexts/EditModeContext';

interface SmartEditableProps {
  value: string;
  path: string;
  file?: string;
  className?: string;
  tag?: 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'p';
  multiline?: boolean;
  placeholder?: string;
}

export default function SmartEditable({ 
  value, 
  path, 
  file = 'site-content.json',
  className = '',
  tag = 'span',
  multiline = false,
  placeholder = 'Click to edit...'
}: SmartEditableProps) {
  const { isEditMode } = useEditMode();
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const [isHovered, setIsHovered] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  
  // Проверяем, что мы в DEV режиме
  const isDev = process.env.NODE_ENV === 'development';
  
  // Синхронизируем с внешним значением
  useEffect(() => {
    setEditValue(value);
  }, [value]);

  // Фокус при входе в режим редактирования
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

  const handleClick = useCallback(() => {
    if (!isEditMode || isSaving) return;
    setIsEditing(true);
  }, [isEditMode, isSaving]);

  const handleSave = useCallback(async () => {
    if (editValue.trim() === value.trim()) {
      setIsEditing(false);
      return;
    }

    if (editValue.trim() === '') {
      setEditValue(value);
      setIsEditing(false);
      return;
    }

    setSaveStatus('saving');
    setIsSaving(true);
    
    try {
      await saveContent(file, path, editValue.trim());
      setSaveStatus('saved');
      setIsEditing(false);
      
      // Показываем статус "сохранено" на 2 секунды
      setTimeout(() => {
        setSaveStatus('idle');
      }, 2000);
      
    } catch (error) {
      console.error('Failed to save:', error);
      setSaveStatus('error');
      setTimeout(() => {
        setSaveStatus('idle');
      }, 3000);
    } finally {
      setIsSaving(false);
    }
  }, [editValue, value, file, path]);

  const handleCancel = useCallback(() => {
    setEditValue(value);
    setIsEditing(false);
    setSaveStatus('idle');
  }, [value]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !multiline) {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Enter' && e.ctrlKey && multiline) {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      handleCancel();
    }
  }, [multiline, handleSave, handleCancel]);

  const saveContent = async (filename: string, contentPath: string, newValue: string) => {
    const response = await fetch(`/api/dev/content?file=${filename}`);
    if (!response.ok) throw new Error('Failed to load content');
    
    const contentData = await response.json();
    
    // Обновляем значение по пути
    const pathParts = contentPath.split('.');
    let current = contentData;
    
    for (let i = 0; i < pathParts.length - 1; i++) {
      if (!current[pathParts[i]]) current[pathParts[i]] = {};
      current = current[pathParts[i]];
    }
    
    current[pathParts[pathParts.length - 1]] = newValue;
    
    // Сохраняем
    const saveResponse = await fetch('/api/dev/content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ file: filename, content: contentData })
    });

    if (!saveResponse.ok) {
      throw new Error('Save failed');
    }

    // НЕ перезагружаем страницу - просто обновляем локальное состояние
    // window.location.reload(); // Убираем это!
  };

  // Если не в режиме разработки или редактирование выключено
  if (!isDev || !isEditMode) {
    const Tag = tag;
    return <Tag className={className}>{value}</Tag>;
  }

  // Рендерим поле ввода
  if (isEditing) {
    const inputClassName = `
      ${className} 
      border-2 border-blue-500 
      bg-white text-black 
      p-2 rounded 
      focus:outline-none focus:ring-2 focus:ring-blue-400
      ${isSaving ? 'opacity-50 cursor-wait' : ''}
    `.replace(/\s+/g, ' ').trim();
    
    if (multiline) {
      return (
        <div className="relative inline-block w-full">
          <textarea
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleSave}
            disabled={isSaving}
            className={`${inputClassName} resize-vertical min-h-[3rem]`}
            rows={Math.max(2, editValue.split('\n').length)}
            placeholder={placeholder}
          />
          <StatusIndicator status={saveStatus} multiline={true} />
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
            disabled={isSaving}
            className={inputClassName}
            placeholder={placeholder}
          />
          <StatusIndicator status={saveStatus} multiline={false} />
        </div>
      );
    }
  }

  // Рендерим обычный элемент с возможностью редактирования
  const Tag = tag;
  return (
    <div className="relative inline-block">
      <Tag 
        className={`
          ${className} 
          cursor-pointer
          ${isHovered ? 'ring-2 ring-blue-400 ring-opacity-75 bg-blue-100/10 rounded px-1' : ''} 
          transition-all duration-200
          ${isSaving ? 'opacity-75' : ''}
        `.replace(/\s+/g, ' ').trim()}
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        title={`Click to edit: ${path}`}
      >
        {value || placeholder}
      </Tag>
      <StatusIndicator status={saveStatus} multiline={false} />
      {isHovered && !isEditing && (
        <div className="absolute -bottom-6 left-0 text-xs text-gray-500 whitespace-nowrap bg-black/75 text-white px-2 py-1 rounded">
          Click to edit: {path}
        </div>
      )}
    </div>
  );
}

// Компонент для отображения статуса сохранения
function StatusIndicator({ status, multiline }: { status: string; multiline: boolean }) {
  if (status === 'idle') return null;
  
  const messages = {
    saving: { text: 'Saving...', color: 'text-blue-500', bg: 'bg-blue-50' },
    saved: { text: 'Saved!', color: 'text-green-500', bg: 'bg-green-50' },
    error: { text: 'Error!', color: 'text-red-500', bg: 'bg-red-50' }
  };
  
  const msg = messages[status as keyof typeof messages] || messages.saving;
  
  return (
    <div className={`
      absolute 
      ${multiline ? '-top-6' : '-bottom-6'} 
      left-0 
      text-xs 
      ${msg.color} 
      ${msg.bg} 
      px-2 py-1 
      rounded 
      shadow-sm 
      border
      animate-fade-in
    `}>
      {msg.text}
    </div>
  );
}
