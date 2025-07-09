"use client";

import { useState, useEffect } from 'react';

interface ContentEditorProps {
  show: boolean;
  onClose: () => void;
}

export default function ContentEditor({ show, onClose }: ContentEditorProps) {
  const [activeFile, setActiveFile] = useState<string>('site-content.json');
  const [editingContent, setEditingContent] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const files = [
    { id: 'site-content.json', name: 'Site Content' },
    { id: 'terminal-content.json', name: 'Terminal Content' }
  ];

  const loadContent = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/dev/content?file=${activeFile}`);
      if (response.ok) {
        const data = await response.json();
        setEditingContent(JSON.stringify(data, null, 2));
      }
    } catch {
      console.error('Failed to load content');
    }
    setLoading(false);
  };

  useEffect(() => {
    if (show) {
      loadContent();
    }
  }, [show, activeFile]); // eslint-disable-line react-hooks/exhaustive-deps

  const saveContent = async () => {
    try {
      const parsedContent = JSON.parse(editingContent);
      const response = await fetch('/api/dev/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ file: activeFile, content: parsedContent })
      });

      if (response.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
        // Перезагрузить страницу для применения изменений
        window.location.reload();
      }
    } catch {
      alert('Invalid JSON format!');
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div className="flex items-center space-x-4">
            <h2 className="text-2xl font-bold text-white">DEV Content Editor</h2>
            <div className="flex space-x-2">
              {files.map((file) => (
                <button
                  key={file.id}
                  onClick={() => setActiveFile(file.id)}
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                    activeFile === file.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {file.name}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center h-full text-gray-400">
              Loading...
            </div>
          ) : (
            <div className="h-full">
              <textarea
                value={editingContent}
                onChange={(e) => setEditingContent(e.target.value)}
                className="w-full h-full bg-gray-800 text-green-400 font-mono text-sm p-4 rounded border border-gray-600 focus:outline-none focus:border-blue-500 resize-none"
                placeholder="Edit JSON content here..."
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-700">
          <div className="text-sm text-gray-400">
            <span className="font-medium">File:</span> {activeFile}
          </div>
          <div className="flex items-center space-x-4">
            {saved && (
              <span className="text-green-400 text-sm">✓ Saved!</span>
            )}
            <button
              onClick={loadContent}
              className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors"
            >
              Reload
            </button>
            <button
              onClick={saveContent}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition-colors"
            >
              Save & Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
