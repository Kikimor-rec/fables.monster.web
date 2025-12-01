import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
  try {
    const musicDir = path.join(process.cwd(), 'public', 'music', 'krampmusic');
    
    // Проверяем существование директории
    try {
      await fs.access(musicDir);
    } catch {
      return NextResponse.json({ tracks: [] });
    }
    
    const files = await fs.readdir(musicDir);
    
    // Фильтруем только аудио файлы
    const audioFiles = files.filter(file => 
      file.endsWith('.mp3') || file.endsWith('.wav') || file.endsWith('.ogg') || file.endsWith('.m4a')
    );
    
    // Преобразуем имена файлов в треки
    // Удаляем номер в начале (например, "01-" или "1.") и расширение
    const tracks = audioFiles.map(filename => {
      // Удаляем расширение
      const nameWithoutExt = filename.replace(/\.(mp3|wav|ogg|m4a)$/i, '');
      
      // Удаляем номер в начале (паттерны: "01-", "1-", "01.", "1. ", etc.)
      let title = nameWithoutExt.replace(/^\d+[-.\s]+/, '');
      
      // Заменяем дефисы и подчёркивания на пробелы
      title = title.replace(/[-_]/g, ' ');
      
      // Capitalize каждое слово
      title = title.split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
      
      return {
        title,
        filename
      };
    });
    
    // Сортируем по оригинальному имени файла (чтобы сохранить порядок по номерам)
    tracks.sort((a, b) => a.filename.localeCompare(b.filename, undefined, { numeric: true }));
    
    return NextResponse.json({ tracks });
  } catch (error) {
    console.error('Error reading kramp tracks:', error);
    return NextResponse.json({ tracks: [], error: 'Failed to load tracks' }, { status: 500 });
  }
}
