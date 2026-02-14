import TableHeader from "./TableHeader";
import { useDiceRoller } from "./useDiceRoller";
import { NpcTableData, NpcRow } from "./kramp-tables-data";

interface NpcTableProps {
  tableData: NpcTableData;
  lang: string;
  tags?: {
    history?: string;
    helps?: string;
    hinders?: string;
  };
}

interface NpcCardProps {
  npc: NpcRow;
  isSelected: boolean;
  lang: string;
  tags?: {
    history?: string;
    helps?: string;
    hinders?: string;
  };
}

function NpcCard({ npc, isSelected, lang, tags }: NpcCardProps) {
  const isRu = lang === "ru";

  return (
    <div className={`border border-green-700 bg-gray-800 ${isSelected ? "ring-2 ring-green-500" : ""}`}>
      {/* NPC Header */}
      <div className="bg-green-900/50 border-b border-green-700 px-2 py-1 flex items-center justify-between">
        <span className="font-orbitron font-bold text-sm text-green-400">
          {String(npc.id).padStart(2, '0')} {isRu ? npc.name.ru : npc.name.en}
        </span>
        <span className="text-xs uppercase text-green-600">
          {isRu ? npc.role.ru : npc.role.en}
        </span>
      </div>

      {/* Description */}
      <div className="px-2 py-1 text-xs md:text-sm border-b border-green-900/50 text-gray-300">
        {isRu ? npc.description.ru : npc.description.en}
      </div>

      {/* History (if exists) */}
      {npc.history && (
        <div className="px-2 py-1 text-xs border-b border-green-900/50 flex items-start gap-1">
          <span className="bg-green-700 text-white px-1 text-[10px] font-bold shrink-0">{tags?.history || "HIST"}</span>
          <span className="text-gray-400">{isRu ? npc.history.ru : npc.history.en}</span>
        </div>
      )}

      {/* Helps */}
      <div className="px-2 py-1 text-xs border-b border-green-900/50 flex items-start gap-1">
        <span className="bg-green-700 text-white px-1 text-[10px] font-bold shrink-0">{tags?.helps || "HELPS"}</span>
        <span className="text-gray-400">{isRu ? npc.helps.ru : npc.helps.en}</span>
      </div>

      {/* Hinders */}
      <div className="px-2 py-1 text-xs flex items-start gap-1">
        <span className="bg-red-700 text-white px-1 text-[10px] font-bold shrink-0">{tags?.hinders || "HINDERS"}</span>
        <span className="text-gray-400">{isRu ? npc.hinders.ru : npc.hinders.en}</span>
      </div>
    </div>
  );
}

export default function NpcTable({ tableData, lang, tags }: NpcTableProps) {
  const isRu = lang === "ru";
  const maxDice = parseInt(tableData.dice.replace("D", ""));
  const { selectedRow, isRolling, isExpanded, rollDice, toggleExpanded } = useDiceRoller();

  return (
    <div className="bg-gray-900 border-2 border-green-700 overflow-hidden">
      <TableHeader
        title={isRu ? tableData.title.ru : tableData.title.en}
        dice={tableData.dice}
        isExpanded={isExpanded}
        isRolling={isRolling}
        onToggle={toggleExpanded}
        onRoll={() => rollDice(maxDice)}
      />

      {/* Selected NPC */}
      {selectedRow !== null && (
        <div className={`p-3 border-b border-green-700 ${isRolling ? "bg-yellow-900/30" : ""}`}>
          {isRolling ? (
            <div className="text-center py-4">
              <span className="font-orbitron font-bold text-4xl text-yellow-500 animate-pulse">
                {String(selectedRow).padStart(2, '0')}
              </span>
            </div>
          ) : (
            <NpcCard npc={tableData.rows[selectedRow - 1]} isSelected={true} lang={lang} tags={tags} />
          )}
        </div>
      )}

      {/* Expanded Grid */}
      {isExpanded && (
        <div className="p-2 grid grid-cols-1 md:grid-cols-2 gap-2 max-h-[500px] overflow-y-auto">
          {tableData.rows.map((npc) => (
            <div key={npc.id}>
              <NpcCard npc={npc} isSelected={selectedRow === npc.id && !isRolling} lang={lang} tags={tags} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
