interface CompensationItem {
  label: string;
  value: string;
}

interface CareerTwilightContractProps {
  dict: {
    contract: {
      heading: string;
      subheading: string;
      stamp: string;
      client: string;
      clientValue: string;
      contractor: string;
      contractorValue: string;
      vessel: string;
      vesselValue: string;
      type: string;
      typeValue: string;
      briefing: string;
      authorization: string;
      task1title: string;
      task1: string;
      task2title: string;
      task2: string;
      ndaReminder: string;
      compensationTitle: string;
      compensation: CompensationItem[];
      ndaClause: string;
      liability: string;
    };
  };
}

export default function CareerTwilightContract({ dict }: CareerTwilightContractProps) {
  const c = dict.contract;

  return (
    <section className="py-16 md:py-24 border-b border-cyan-500/20">
      <div className="max-w-3xl mx-auto px-4">
        {/* Printed sheet */}
        <div className="ct-printed-sheet">
          {/* CONFIDENTIAL stamp */}
          <div className="ct-stamp" aria-hidden="true">
            {c.stamp}
          </div>

          {/* Header */}
          <div className="border-b-2 border-gray-400 pb-4 mb-6">
            <h2 className="ct-sheet-heading">{c.heading}</h2>
            <p className="ct-sheet-subheading">{c.subheading}</p>
          </div>

          {/* Contract fields */}
          <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 mb-6 text-sm">
            <span className="ct-sheet-label">{c.client}:</span>
            <span className="ct-sheet-value">{c.clientValue}</span>
            <span className="ct-sheet-label">{c.contractor}:</span>
            <span className="ct-sheet-value">{c.contractorValue}</span>
            <span className="ct-sheet-label">{c.vessel}:</span>
            <span className="ct-sheet-value">{c.vesselValue}</span>
            <span className="ct-sheet-label">{c.type}:</span>
            <span className="ct-sheet-value">{c.typeValue}</span>
          </div>

          {/* Briefing */}
          <div className="mb-6 text-sm leading-relaxed text-gray-800">
            <p className="mb-3">{c.briefing}</p>
            <p className="font-semibold">{c.authorization}</p>
          </div>

          {/* Tasks */}
          <div className="mb-6 space-y-3">
            <div className="ct-task-block">
              <span className="ct-task-title">{c.task1title} —</span>
              <span className="text-sm text-gray-800"> {c.task1}</span>
            </div>
            <div className="ct-task-block">
              <span className="ct-task-title">{c.task2title} —</span>
              <span className="text-sm text-gray-800"> {c.task2}</span>
            </div>
          </div>

          {/* NDA reminder */}
          <p className="text-xs italic text-gray-500 mb-6 border-l-2 border-gray-300 pl-3">
            {c.ndaReminder}
          </p>

          {/* Compensation */}
          <div className="mb-6">
            <h3 className="ct-sheet-section-title">{c.compensationTitle}</h3>
            <div className="space-y-1">
              {c.compensation.map((item, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span className="text-gray-700">{item.label}</span>
                  <span className="font-mono font-bold text-gray-900">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* NDA clause */}
          <p className="text-xs italic text-gray-500 mb-4">
            {c.ndaClause}
          </p>

          {/* Liability */}
          <div className="ct-liability">
            <p className="text-xs text-red-800">
              ⚠️ {c.liability}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
