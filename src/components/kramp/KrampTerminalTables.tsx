"use client";

import SimpleTable from "./SimpleTable";
import EventsTable from "./EventsTable";
import NpcTable from "./NpcTable";
import {
  violationsTable,
  eventsTable,
  npcTable,
  announcementsTable,
} from "./kramp-tables-data";

interface KrampTerminalTablesProps {
  lang: string;
}

export default function KrampTerminalTables({ lang }: KrampTerminalTablesProps) {
  const isRu = lang === "ru";

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div className="bg-gray-900 border-2 border-green-700 p-3 md:p-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 border-b border-green-700 pb-2 mb-3">
          <h2 className="font-orbitron font-bold text-lg md:text-xl tracking-wide text-green-400">
            KRAMP_SCENARIO_LOG
          </h2>
          <div className="text-xs font-mono text-green-600">
            OPERATIONS MANIFEST // HAPPY KRAMPUS // BY FABLES.MONSTER
          </div>
        </div>
        <p className="text-sm text-gray-400">
          {isRu
            ? "Эти таблицы созданы, чтобы подстегнуть вашу фантазию. Меняйте значения и проверки под свой стол."
            : "These tables are designed to spark your imagination. Change values and checks to fit your table."
          }
        </p>
      </div>

      {/* Two-column layout for desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Left column */}
        <div className="space-y-4">
          <SimpleTable tableData={violationsTable} lang={lang} />
          <SimpleTable tableData={announcementsTable} lang={lang} />
        </div>

        {/* Right column */}
        <div className="space-y-4">
          <EventsTable tableData={eventsTable} lang={lang} />
          <NpcTable tableData={npcTable} lang={lang} />
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-green-600 font-mono py-2">
        DATE: 25-12-XX // LOC: &quot;SILENT NIGHT&quot; // AUTH: KRAMP.EXE
      </div>
    </div>
  );
}
