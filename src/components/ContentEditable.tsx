"use client";

import React, { useState, useCallback } from 'react';
import ContentEditable from 'react-contenteditable';
import { useEditMode } from '@/contexts/EditModeContext';

interface ContentEditableProps {
  value: string;
  path: string;
  file?: string;
  className?: string;
  tag?: 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'p';
  multiline?: boolean;
  placeholder?: string;
}

export default function EditableContent({ 
  value, 
  path, 
  file = 'site-content.json',
  className = '',
  tag = 'span',
  multiline = false,
  placeholder = ''
}: ContentEditableProps) {
  const { isEditMode } = useEditMode();
  const [content, setContent] = useState(value);
  const [isHovered, setIsHovered] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Проверяем, что мы в DEV режиме
  const isDev = process.env.NODE_ENV === 'development';
  
  const saveContent = useCallback(async (filename: string, contentPath: string, newValue: string) => {
    try {
      // Загружаем текущий контент
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

      if (saveResponse.ok) {
        // Показываем успешное сохранение
        console.log('Content saved successfully');
        // Можно добавить toast уведомление
      } else {
        throw new Error('Save failed');
      }
    } catch (error) {
      console.error('Save failed:', error);
      // Можно добавить toast с ошибкой
    }
  }, []);
  
  const handleChange = useCallback((evt: { target: { value: string } }) => {
    setContent(evt.target.value);
  }, []);

  const handleBlur = useCallback(async () => {
    if (content !== value && content.trim() !== '') {
      setIsSaving(true);
      await saveContent(file, path, content.trim());
      setIsSaving(false);
    }
  }, [content, value, file, path, saveContent]);

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

  // Если не в режиме разработки или редактирование выключено, показываем обычный текст
  if (!isDev || !isEditMode) {
    const Tag = tag;
    return <Tag className={className}>{value}</Tag>;
  }

  const editableClassName = `
    ${className} 
    ${isEditMode ? 'cursor-text' : ''} 
    ${isHovered && isEditMode ? 'ring-2 ring-blue-400 ring-opacity-75 bg-blue-100/10 rounded px-1' : ''} 
    ${isSaving ? 'opacity-50' : ''}
    transition-all duration-200
    outline-none
    focus:ring-2 focus:ring-blue-500 focus:bg-blue-50/20
  `.replace(/\s+/g, ' ').trim();

  return (
    <div className="relative inline-block">
      <ContentEditable
        html={content}
        disabled={!isEditMode || isSaving}
        onChange={handleChange}
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
        placeholder={placeholder || 'Click to edit...'}
      />
      {isSaving && (
        <div className="absolute -top-6 left-0 text-xs text-blue-500 bg-white px-2 py-1 rounded shadow">
          Saving...
        </div>
      )}
      {isHovered && isEditMode && !isSaving && (
        <div className="absolute -bottom-6 left-0 text-xs text-gray-500 whitespace-nowrap">
          {multiline ? 'Click to edit, Esc to cancel' : 'Click to edit, Enter to save, Esc to cancel'}
        </div>
      )}
    </div>
  );
}
