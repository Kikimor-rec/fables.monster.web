"use client";

import React, { useState, useCallback, useEffect } from 'react';
import ContentEditable from 'react-contenteditable';
import { useEditMode } from '@/contexts/EditModeContext';

interface ProEditableProps {
  value: string;
  path: string;
  file?: string;
  className?: string;
  tag?: 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'p';
  multiline?: boolean;
  placeholder?: string;
}

export default function ProEditable({ 
  value, 
  path, 
  file = 'site-content.json',
  className = '',
  tag = 'span',
  multiline = false,
  placeholder = 'Click to edit...'
}: ProEditableProps) {
  const { isEditMode } = useEditMode();
  const [content, setContent] = useState(value);
  const [isHovered, setIsHovered] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [isEditing, setIsEditing] = useState(false);
  
  // Проверяем, что мы в DEV режиме
  const isDev = process.env.NODE_ENV === 'development';
  
  // Синхронизируем с внешним значением
  useEffect(() => {
    setContent(value);
  }, [value]);

  const handleChange = useCallback((evt: { target: { value: string } }) => {
    setContent(evt.target.value);
  }, []);

  const handleFocus = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleBlur = useCallback(async () => {
    setIsEditing(false);
    
    // Очищаем HTML теги, если они есть
    const cleanContent = content.replace(/<[^>]*>/g, '').trim();
    
    if (cleanContent === value.trim()) {
      return;
    }

    if (cleanContent === '') {
      setContent(value);
      return;
    }

    setSaveStatus('saving');
    setIsSaving(true);
    
    try {
      await saveContent(file, path, cleanContent);
      setSaveStatus('saved');
      
      // Показываем статус "сохранено" на 2 секунды
      setTimeout(() => {
        setSaveStatus('idle');
      }, 2000);
      
    } catch (error) {
      console.error('Failed to save:', error);
      setSaveStatus('error');
      setContent(value); // Возвращаем исходное значение
      setTimeout(() => {
        setSaveStatus('idle');
      }, 3000);
    } finally {
      setIsSaving(false);
    }
  }, [content, value, file, path]);

  const handleKeyDown = useCallback((evt: React.KeyboardEvent) => {
    if (!multiline && evt.key === 'Enter') {
      evt.preventDefault();
      (evt.target as HTMLElement).blur();
    }
    if (evt.key === 'Escape') {
      setContent(value);
      (evt.target as HTMLElement).blur();
    }
  }, [multiline, value]);

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
  };

  // Если не в режиме разработки или редактирование выключено
  if (!isDev || !isEditMode) {
    const Tag = tag;
    return <Tag className={className}>{value}</Tag>;
  }

  const editableClassName = `
    ${className} 
    ${isEditMode ? 'cursor-text' : ''} 
    ${isHovered && isEditMode ? 'ring-2 ring-blue-400 ring-opacity-75 bg-blue-100/10 rounded px-1' : ''} 
    ${isEditing ? 'ring-2 ring-blue-500 bg-blue-50/20' : ''}
    ${isSaving ? 'opacity-50' : ''}
    transition-all duration-200
    outline-none
    focus:ring-2 focus:ring-blue-500
  `.replace(/\s+/g, ' ').trim();

  return (
    <div className="relative inline-block">
      <ContentEditable
        html={content}
        disabled={!isEditMode || isSaving}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        tagName={tag}
        className={editableClassName}
        style={{
          minHeight: multiline ? '2rem' : 'auto',
          minWidth: '2rem'
        }}
        title={isEditMode ? `Click to edit: ${path}` : undefined}
        data-placeholder={placeholder}
      />
      
      {/* Индикатор статуса сохранения */}
      {saveStatus !== 'idle' && (
        <StatusIndicator status={saveStatus} />
      )}
      
      {/* Подсказка при наведении */}
      {isHovered && isEditMode && !isEditing && saveStatus === 'idle' && (
        <div className="absolute -bottom-6 left-0 text-xs text-gray-500 whitespace-nowrap bg-black/75 text-white px-2 py-1 rounded animate-fade-in">
          Click to edit: {path}
        </div>
      )}
    </div>
  );
}

// Компонент для отображения статуса сохранения
function StatusIndicator({ status }: { status: string }) {
  const messages = {
    saving: { text: '💾 Saving...', color: 'text-blue-500', bg: 'bg-blue-50 border-blue-200' },
    saved: { text: '✅ Saved!', color: 'text-green-500', bg: 'bg-green-50 border-green-200' },
    error: { text: '❌ Error!', color: 'text-red-500', bg: 'bg-red-50 border-red-200' }
  };
  
  const msg = messages[status as keyof typeof messages] || messages.saving;
  
  return (
    <div className={`
      absolute -top-8 left-0 
      text-xs ${msg.color} ${msg.bg}
      px-2 py-1 rounded shadow-sm border
      animate-fade-in z-50
    `}>
      {msg.text}
    </div>
  );
}
