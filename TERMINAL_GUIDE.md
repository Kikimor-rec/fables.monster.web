# Инструкция по заполнению терминала Lost Mark

## Базовая структура

Терминал состоит из двух основных экранов:
1. **Навигационная панель** (слева) - меню с опциями
2. **Панель отображения** (справа) - показывает выбранную информацию

## Как добавить контент

### 1. Логи корабля (Ship Logs)

Добавьте массив логов в компонент терминала:

```javascript
const shipLogs = [
  {
    id: 'log1',
    timestamp: '2157.245.14:32:07',
    type: 'system', // 'system', 'warning', 'error', 'info'
    message: 'NAVIGATION SYSTEM ONLINE',
    details: 'Primary navigation systems functioning normally. All sensors operational.'
  },
  {
    id: 'log2',
    timestamp: '2157.245.15:45:32',
    type: 'warning',
    message: 'ANOMALOUS READING DETECTED',
    details: 'Sensors detecting unusual energy signatures from Sector 7-Gamma. Recommend caution.'
  },
  {
    id: 'log3',
    timestamp: '2157.245.16:12:55',
    type: 'error',
    message: 'CREW QUARTERS - NO RESPONSE',
    details: 'Multiple attempts to contact crew quarters have failed. Override codes ineffective.'
  }
];
```

### 2. Поврежденные изображения (Security Footage)

Добавьте массив изображений:

```javascript
const securityFootage = [
  {
    id: 'img1',
    name: 'CORRIDOR_A_CAM_001',
    corrupted: true,
    description: 'Main corridor - timestamp corrupted',
    glitchLevel: 'high' // 'low', 'medium', 'high'
  },
  {
    id: 'img2',
    name: 'CREW_QUARTERS_CAM_005',
    corrupted: true,
    description: '[DATA CORRUPTED] - something moving in the shadows',
    glitchLevel: 'medium'
  }
];
```

### 3. Документы и файлы

```javascript
const documents = [
  {
    id: 'doc1',
    name: 'CREW_MANIFEST.txt',
    classification: 'PUBLIC',
    content: \`
VESSEL: THE LOST MARK
CREW COMPLEMENT: 12

CAPTAIN: [REDACTED]
FIRST OFFICER: Maria Santos
ENGINEER: Jin Wu
MEDIC: Dr. Alex Rivera
...
[REST OF DATA CORRUPTED]
    \`
  },
  {
    id: 'doc2',
    name: 'EMERGENCY_PROTOCOL_7.txt',
    classification: 'RESTRICTED',
    content: \`
EMERGENCY PROTOCOL 7 - ENTITY CONTAINMENT

WARNING: UNAUTHORIZED ACCESS DETECTED
PROTOCOL REQUIRES LEVEL 9 CLEARANCE

Step 1: [REDACTED]
Step 2: Evacuate all personnel from affected sectors
Step 3: [DATA CORRUPTED]
    \`
  }
];
```

## Добавление функциональности

### 1. Обработка кликов по меню

Добавьте состояние для текущего выбранного пункта меню:

```javascript
const [currentView, setCurrentView] = useState('default');
const [selectedData, setSelectedData] = useState(null);

const handleMenuClick = (menuItem) => {
  setCurrentView(menuItem);
  
  switch(menuItem) {
    case 'logs':
      setSelectedData(shipLogs);
      break;
    case 'footage':
      setSelectedData(securityFootage);
      break;
    case 'manifest':
      setSelectedData(documents);
      break;
    // и т.д.
  }
};
```

### 2. Эффекты глитчей

Добавьте случайные глитчи:

```javascript
useEffect(() => {
  const glitchInterval = setInterval(() => {
    if (Math.random() < 0.1) { // 10% вероятность глитча
      setGlitch(true);
      setTimeout(() => setGlitch(false), 200);
    }
  }, 3000);

  return () => clearInterval(glitchInterval);
}, []);
```

### 3. Искаженный текст

Создайте функцию для искажения текста:

```javascript
const corruptText = (text, level = 'medium') => {
  const glitchChars = ['█', '▓', '▒', '░', '?', '#', '@', '%'];
  
  return text.split('').map((char, index) => {
    const corruption = Math.random();
    
    if (level === 'high' && corruption < 0.3) {
      return glitchChars[Math.floor(Math.random() * glitchChars.length)];
    } else if (level === 'medium' && corruption < 0.15) {
      return glitchChars[Math.floor(Math.random() * glitchChars.length)];
    } else if (level === 'low' && corruption < 0.05) {
      return glitchChars[Math.floor(Math.random() * glitchChars.length)];
    }
    
    return char;
  }).join('');
};
```

## CSS эффекты

Добавьте эти стили в globals.css для большего реализма:

```css
/* CRT эффекты */
.crt-screen {
  background: linear-gradient(
    transparent 50%, 
    rgba(0, 255, 0, 0.03) 50%
  );
  background-size: 100% 4px;
  animation: flicker 0.15s infinite linear;
}

@keyframes flicker {
  0% { opacity: 1; }
  98% { opacity: 1; }
  99% { opacity: 0.98; }
  100% { opacity: 1; }
}

/* Глитч эффект */
.glitch {
  animation: glitch-animation 0.3s ease-in-out;
}

@keyframes glitch-animation {
  0% { transform: translate(0); }
  20% { transform: translate(-2px, 2px); }
  40% { transform: translate(-2px, -2px); }
  60% { transform: translate(2px, 2px); }
  80% { transform: translate(2px, -2px); }
  100% { transform: translate(0); }
}
```

## Использование в игре

1. **Ведущий** дает игрокам ссылку: `your-domain.com/lost-mark/terminal`
2. **Игроки** могут исследовать данные корабля в интерактивном режиме
3. **Ведущий** может добавлять новые логи/документы по ходу игры
4. **Эффекты** глитчей и искажений создают атмосферу ужаса

## Советы по контенту

- Используйте **неполную информацию** - пусть часть данных будет повреждена
- Добавляйте **временные метки** для создания хронологии событий  
- Используйте **классификацию документов** (PUBLIC/RESTRICTED/CLASSIFIED)
- **Постепенно раскрывайте** информацию через разные разделы
- **Противоречивые данные** в разных источниках создают напряжение

Эта структура позволит вам создать полноценный интерактивный инструмент для проведения игр!
