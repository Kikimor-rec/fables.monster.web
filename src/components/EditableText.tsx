"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useEditMode } from '@/contexts/EditModeContext';

interface EditableTextProps {
  value: string;
  path: string; // Путь к значению в JSON (например, "hero.title")
  file?: string; // Файл JSON (по умолчанию site-content.json)
  className?: string;
  placeholder?: string;
  multiline?: boolean;
  children?: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div'; // Тег для рендеринга
}

export default function EditableText({ 
  value, 
  path, 
  file = 'site-content.json',
  className = '', 
  placeholder = 'Click to edit...',
  multiline = false,
  children,
  as: Component = 'span'
}: EditableTextProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const [isSaving, setIsSaving] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { isEditMode } = useEditMode();
  
  // Проверяем, что мы в DEV режиме
  const isDev = process.env.NODE_ENV === 'development';
  
  useEffect(() => {
    setEditValue(value);
  }, [value]);

  useEffect(() => {
    if (isEditing) {
      if (multiline && textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.select();
      } else if (!multiline && inputRef.current) {
        inputRef.current.focus();
        inputRef.current.select();
      }
    }
  }, [isEditing, multiline]);

  const handleEdit = () => {
    if (!isDev || !isEditMode) return;
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (editValue === value) {
      setIsEditing(false);
      return;
    }

    setIsSaving(true);
    
    try {
      // Загружаем текущий контент
      const response = await fetch(`/api/dev/content?file=${file}`);
      if (!response.ok) throw new Error('Failed to load content');
      
      const content = await response.json();
      
      // Обновляем значение по пути
      const pathParts = path.split('.');
      let current = content;
      
      // Навигируемся до предпоследнего уровня
      for (let i = 0; i < pathParts.length - 1; i++) {
        if (!current[pathParts[i]]) {
          current[pathParts[i]] = {};
        }
        current = current[pathParts[i]];
      }
      
      // Устанавливаем новое значение
      current[pathParts[pathParts.length - 1]] = editValue;
      
      // Сохраняем
      const saveResponse = await fetch('/api/dev/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ file, content })
      });
      
      if (saveResponse.ok) {
        // Перезагружаем страницу для применения изменений
        window.location.reload();
      } else {
        throw new Error('Failed to save');
      }
    } catch (error) {
      console.error('Save failed:', error);
      alert('Failed to save changes');
    } finally {
      setIsSaving(false);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditValue(value);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (!multiline || e.ctrlKey)) {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      handleCancel();
    }
  };

  // Если не в DEV режиме или режим редактирования выключен, показываем обычный текст
  if (!isDev || !isEditMode) {
    return React.createElement(Component, { className }, children || value);
  }

  // В режиме редактирования
  const editableClassName = `${className} ${isEditing ? '' : 'cursor-pointer hover:bg-yellow-200 hover:bg-opacity-20 transition-colors duration-200 border-2 border-transparent hover:border-yellow-400 hover:border-opacity-50'}`;

  if (isEditing) {
    return (
      <div className="relative inline-block w-full">
        {isSaving && (
          <div className="absolute top-0 right-0 text-xs text-yellow-400 bg-black px-1 rounded">
            Saving...
          </div>
        )}
        {multiline ? (
          <textarea
            ref={textareaRef}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleSave}
            className="bg-gray-800 text-white border border-red-500 px-2 py-1 rounded w-full resize-vertical min-h-[40px]"
            placeholder={placeholder}
            rows={4}
          />
        ) : (
          <input
            type="text"
            ref={inputRef}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleSave}
            className="bg-gray-800 text-white border border-red-500 px-2 py-1 rounded w-full"
            placeholder={placeholder}
          />
        )}
        <div className="text-xs text-gray-400 mt-1">
          Press Enter to save, Escape to cancel
        </div>
      </div>
    );
  }

  return React.createElement(
    Component,
    {
      className: editableClassName,
      onClick: handleEdit,
      title: 'Click to edit'
    },
    children || value
  );
}
