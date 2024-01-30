import Xarrow from "react-xarrows";

export default function Row({ row, rowIndex, hasCircuitBox, circuitboxId }) {
  return (
    <div className='aspect-video w-full border-2 border-[#9DB2BF] p-1 relative flex items-center justify-center'>
      <span className='absolute top-0 left-1'>{row.value}</span>
      <div className='rounded-full w-4 h-4 bg-slate-800 border-2 border-[#DDE6ED]' id={row.arrowEnd} />

      {rowIndex === 0 && hasCircuitBox ? (
        <div className='w-8 h-4 absolute bottom-1 left-1' id={circuitboxId} style={{ backgroundColor: row.color }} />
      ) : null}

      <Xarrow
        start={row.arrowStart}
        end={row.arrowEnd}
        showHead={rowIndex !== 0}
        startAnchor={rowIndex === 0 ? "right" : "top"}
        endAnchor={"bottom"}
        strokeWidth={3}
        headSize={4}
        color={row.color}
      />
    </div>
  )
}
