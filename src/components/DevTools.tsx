"use client";

import { useState } from 'react';
import ContentEditor from './ContentEditor';
import { useEditMode } from '@/contexts/EditModeContext';

export default function DevTools() {
  const [showEditor, setShowEditor] = useState(false);
  const { isEditMode, toggleEditMode } = useEditMode();

  // Показывать только в DEV режиме
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <>
      {/* DEV кнопки */}
      <div className="fixed bottom-4 right-4 z-40 flex flex-col gap-2">
        <button
          onClick={toggleEditMode}
          className={`px-4 py-2 rounded shadow-lg font-mono text-sm transition-colors ${
            isEditMode 
              ? 'bg-green-600 hover:bg-green-700 text-white' 
              : 'bg-orange-600 hover:bg-orange-700 text-white'
          }`}
        >
          {isEditMode ? '✏️ EDIT MODE ON' : '✏️ EDIT MODE OFF'}
        </button>
        
        <button
          onClick={() => setShowEditor(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow-lg font-mono text-sm transition-colors"
        >
          📝 JSON EDITOR
        </button>
      </div>

      {/* Индикатор режима редактирования */}
      {isEditMode && (
        <div className="fixed top-4 right-4 z-40 bg-green-600 text-white px-3 py-1 rounded shadow-lg font-mono text-sm">
          ✏️ EDIT MODE: Click any text to edit
        </div>
      )}

      {/* Content Editor */}
      <ContentEditor 
        show={showEditor} 
        onClose={() => setShowEditor(false)} 
      />
    </>
  );
}
