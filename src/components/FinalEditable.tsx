"use client";

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useEditMode } from '@/contexts/EditModeContext';

interface FinalEditableProps {
  value: string;
  path: string;
  file?: string;
  className?: string;
  tag?: 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'p';
  multiline?: boolean;
  placeholder?: string;
  trigger?: 'click' | 'doubleClick' | 'hover';
}

export default function FinalEditable({ 
  value, 
  path, 
  file = 'site-content.json',
  className = '',
  tag = 'span',
  multiline = false,
  placeholder = 'Click to edit...',
  trigger = 'click'
}: FinalEditableProps) {
  const { isEditMode } = useEditMode();
  const [content, setContent] = useState(value);
  const [isHovered, setIsHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const editableRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Проверяем, что мы в DEV режиме
  const isDev = process.env.NODE_ENV === 'development';
  
  // Синхронизируем с внешним значением
  useEffect(() => {
    setContent(value);
  }, [value]);

  // Очистка таймаута при размонтировании
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const startEditing = useCallback(() => {
    if (!isEditMode || isSaving || isEditing) return;
    
    setIsEditing(true);
    
    // Устанавливаем фокус на элемент
    setTimeout(() => {
      if (editableRef.current) {
        editableRef.current.focus();
        
        // Выделяем весь текст
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(editableRef.current);
        selection?.removeAllRanges();
        selection?.addRange(range);
      }
    }, 0);
  }, [isEditMode, isSaving, isEditing]);

  // Обработчики событий в зависимости от триггера
  const handleClick = useCallback(() => {
    if (trigger === 'click') {
      startEditing();
    }
  }, [trigger, startEditing]);

  const handleDoubleClick = useCallback(() => {
    if (trigger === 'doubleClick') {
      startEditing();
    }
  }, [trigger, startEditing]);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    if (trigger === 'hover') {
      timeoutRef.current = setTimeout(() => {
        startEditing();
      }, 500); // Задержка 500мс для hover
    }
  }, [trigger, startEditing]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  // Обработка ввода
  const handleInput = useCallback((e: React.FormEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    setContent(target.textContent || '');
  }, []);

  // Обработка потери фокуса
  const handleBlur = useCallback(async () => {
    if (!isEditing) return;
    
    setIsEditing(false);
    
    const cleanContent = content.trim();
    
    if (cleanContent === value.trim()) {
      return;
    }

    if (cleanContent === '') {
      setContent(value);
      if (editableRef.current) {
        editableRef.current.textContent = value;
      }
      return;
    }

    setSaveStatus('saving');
    setIsSaving(true);
    
    try {
      await saveContent(file, path, cleanContent);
      setSaveStatus('saved');
      
      // Показываем статус "сохранено" на 2 секунды
      timeoutRef.current = setTimeout(() => {
        setSaveStatus('idle');
      }, 2000);
      
    } catch (error) {
      console.error('Failed to save:', error);
      setSaveStatus('error');
      setContent(value);
      if (editableRef.current) {
        editableRef.current.textContent = value;
      }
      timeoutRef.current = setTimeout(() => {
        setSaveStatus('idle');
      }, 3000);
    } finally {
      setIsSaving(false);
    }
  }, [content, value, file, path, isEditing]);

  // Обработка клавиш
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !multiline) {
      e.preventDefault();
      editableRef.current?.blur();
    } else if (e.key === 'Enter' && e.ctrlKey && multiline) {
      e.preventDefault();
      editableRef.current?.blur();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setContent(value);
      if (editableRef.current) {
        editableRef.current.textContent = value;
      }
      editableRef.current?.blur();
    } else if (e.key === 'Tab') {
      e.preventDefault();
      editableRef.current?.blur();
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

  const getTriggerText = () => {
    switch (trigger) {
      case 'click': return 'Click to edit';
      case 'doubleClick': return 'Double-click to edit';
      case 'hover': return 'Hover to edit';
      default: return 'Click to edit';
    }
  };

  const editableClassName = `
    ${className} 
    ${isEditMode ? 'cursor-pointer' : ''} 
    ${isHovered && isEditMode && !isEditing ? 'ring-1 ring-blue-300 bg-blue-50/10 rounded px-1' : ''} 
    ${isEditing ? 'ring-2 ring-blue-500 bg-blue-50/20 cursor-text px-1 rounded' : ''}
    ${isSaving ? 'opacity-50' : ''}
    transition-all duration-200
    outline-none
    focus:ring-2 focus:ring-blue-500
    ${!value && isEditMode ? 'min-w-[100px] min-h-[1.5rem]' : ''}
  `.replace(/\s+/g, ' ').trim();

  return (
    <div className="relative inline-block group">
      <div
        ref={editableRef}
        contentEditable={isEditMode && !isSaving}
        suppressContentEditableWarning={true}
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
        onInput={handleInput}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={editableClassName}
        style={{
          minHeight: multiline ? '2rem' : 'auto',
          minWidth: isEditMode ? '2rem' : 'auto'
        }}
        title={isEditMode ? `${getTriggerText()}: ${path}` : undefined}
        data-placeholder={placeholder}
      >
        {content || (!isEditing && value) || (isEditing && placeholder)}
      </div>
      
      {/* Индикатор статуса сохранения */}
      {saveStatus !== 'idle' && (
        <StatusIndicator status={saveStatus} />
      )}
      
      {/* Подсказка при наведении */}
      {isHovered && isEditMode && !isEditing && saveStatus === 'idle' && (
        <div className="absolute -bottom-8 left-0 text-xs text-white bg-gray-800 px-2 py-1 rounded shadow-lg animate-fade-in whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50">
          {getTriggerText()}: {path}
        </div>
      )}
      
      {/* Индикатор редактирования */}
      {isEditing && (
        <div className="absolute -top-8 right-0 text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded shadow-sm animate-fade-in border border-blue-200 z-50">
          {multiline ? 'Ctrl+Enter to save' : 'Enter to save'} • Esc to cancel
        </div>
      )}
    </div>
  );
}

// Компонент для отображения статуса сохранения
function StatusIndicator({ status }: { status: string }) {
  const messages = {
    saving: { text: '💾 Saving...', color: 'text-blue-600', bg: 'bg-blue-50 border-blue-200' },
    saved: { text: '✅ Saved!', color: 'text-green-600', bg: 'bg-green-50 border-green-200' },
    error: { text: '❌ Error!', color: 'text-red-600', bg: 'bg-red-50 border-red-200' }
  };
  
  const msg = messages[status as keyof typeof messages] || messages.saving;
  
  return (
    <div className={`
      absolute -top-8 left-0 
      text-xs font-medium ${msg.color} ${msg.bg}
      px-3 py-1 rounded-md shadow-sm border
      animate-fade-in z-50
    `}>
      {msg.text}
    </div>
  );
}
