import TableHeader from "./TableHeader";
import { useDiceRoller } from "./useDiceRoller";
import { TableData } from "./kramp-tables-data";

interface EventsTableProps {
  tableData: TableData;
  lang: string;
}

function splitEventText(text: string): { title: string; description: string } {
  const parts = text.split('.');
  return {
    title: parts[0] + '.',
    description: parts.slice(1).join('.')
  };
}

export default function EventsTable({ tableData, lang }: EventsTableProps) {
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
            <span className={`font-orbitron font-bold text-3xl min-w-[2.5rem] ${
              isRolling ? "text-yellow-500" : "text-green-400"
            }`}>
              {String(selectedRow).padStart(2, '0')}
            </span>
            <div className="flex-1">
              {(() => {
                const eventText = isRu ? tableData.rows[selectedRow - 1]?.ru : tableData.rows[selectedRow - 1]?.en;
                const { title, description } = splitEventText(eventText);
                return (
                  <>
                    <p className={`font-bold text-sm md:text-base ${isRolling ? "text-yellow-300" : "text-white"}`}>
                      {title}
                    </p>
                    <p className={`text-sm mt-1 ${isRolling ? "text-yellow-400" : "text-gray-400"}`}>
                      {description}
                    </p>
                  </>
                );
              })()}
              {tableData.rows[selectedRow - 1]?.effect && !isRolling && (
                <div className="mt-2 bg-green-900/50 text-green-300 text-xs md:text-sm px-2 py-1 border-l-4 border-green-500">
                  <span className="font-bold">MECH:</span> {isRu ? tableData.rows[selectedRow - 1].effect?.ru : tableData.rows[selectedRow - 1].effect?.en}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Expanded list */}
      {isExpanded && (
        <div className="max-h-[400px] overflow-y-auto divide-y divide-green-900/50">
          {tableData.rows.map((row) => {
            const eventText = isRu ? row.ru : row.en;
            const { title, description } = splitEventText(eventText);

            return (
              <div
                key={row.id}
                className={`p-2 ${
                  selectedRow === row.id && !isRolling ? "bg-green-900/30" : "hover:bg-gray-800"
                }`}
              >
                <div className="flex items-start gap-2">
                  <span className="font-orbitron font-bold text-xl text-green-500 min-w-[2rem]">
                    {String(row.id).padStart(2, '0')}
                  </span>
                  <div className="flex-1">
                    <p className="font-bold text-sm text-white">{title}</p>
                    <p className="text-xs text-gray-400">{description}</p>
                    {row.effect && (
                      <div className="mt-1 bg-green-900/30 text-green-300 text-xs px-2 py-0.5 border-l-2 border-green-500">
                        {isRu ? row.effect.ru : row.effect.en}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
