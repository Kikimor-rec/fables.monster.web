"use client";

interface TerminalOverlayProps {
    terminalHistory: string[];
    terminalInput: string;
    setTerminalInput: (value: string) => void;
    handleTerminalCommand: (cmd: string) => void;
    lang: string;
}

export default function TerminalOverlay({
    terminalHistory,
    terminalInput,
    setTerminalInput,
    handleTerminalCommand,
    lang
}: TerminalOverlayProps) {
    return (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-black/95 border-t border-green-500 p-4 font-mono text-sm">
            <div className="max-w-2xl mx-auto">
                <div className="text-green-400 mb-2">
                    {terminalHistory.map((line, i) => (
                        <div key={i} className="opacity-80">{line}</div>
                    ))}
                </div>
                <div className="flex items-center gap-2 text-green-400">
                    <span>$</span>
                    <input
                        type="text"
                        value={terminalInput}
                        onChange={(e) => setTerminalInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleTerminalCommand(terminalInput);
                            }
                        }}
                        className="flex-1 bg-transparent outline-none text-green-400 caret-green-400"
                        autoFocus
                        placeholder={lang === 'en' ? 'type "help" for commands...' : 'введите "help" для списка команд...'}
                    />
                </div>
                <div className="text-gray-600 text-xs mt-2">
                    {lang === 'en' ? 'Press ` to close terminal' : 'Нажмите ` чтобы закрыть терминал'}
                </div>
            </div>
        </div>
    );
}
