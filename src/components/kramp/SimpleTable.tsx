import TableHeader from "./TableHeader";
import { useDiceRoller } from "./useDiceRoller";
import { TableData } from "./kramp-tables-data";

interface SimpleTableProps {
  tableData: TableData;
  lang: string;
}

export default function SimpleTable({ tableData, lang }: SimpleTableProps) {
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

      {/* Selected Result */}
      {selectedRow !== null && (
        <div className={`border-b border-green-700 p-3 ${isRolling ? "bg-yellow-900/30" : "bg-gray-800"}`}>
          <div className="flex items-start gap-3">
            <span className={`font-orbitron font-bold text-2xl min-w-[2.5rem] ${
              isRolling ? "text-yellow-500" : "text-green-400"
            }`}>
              {String(selectedRow).padStart(2, '0')}
            </span>
            <div className="flex-1">
              <p className={`text-sm md:text-base ${isRolling ? "text-yellow-300" : "text-white"}`}>
                {isRu ? tableData.rows[selectedRow - 1]?.ru : tableData.rows[selectedRow - 1]?.en}
              </p>
              {tableData.rows[selectedRow - 1]?.effect && !isRolling && (
                <div className="mt-2 bg-green-900/50 text-green-300 text-xs md:text-sm px-2 py-1 border-l-4 border-green-500 inline-block">
                  {isRu ? tableData.rows[selectedRow - 1].effect?.ru : tableData.rows[selectedRow - 1].effect?.en}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Expanded list */}
      {isExpanded && (
        <div className="max-h-[300px] md:max-h-[400px] overflow-y-auto">
          {tableData.rows.map((row) => (
            <div
              key={row.id}
              className={`flex items-start gap-2 px-3 py-1.5 border-b border-green-900/50 text-sm ${
                selectedRow === row.id && !isRolling ? "bg-green-900/30" : "hover:bg-gray-800"
              }`}
            >
              <span className="font-orbitron font-bold min-w-[1.5rem] text-green-500">
                {String(row.id).padStart(2, '0')}
              </span>
              <span className="text-gray-300">{isRu ? row.ru : row.en}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
