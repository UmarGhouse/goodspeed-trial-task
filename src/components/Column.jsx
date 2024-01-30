import Row from "./Row";

export default function Column ({ column, width }) {
  return (
    <div style={{ width: `${100 / width}%` }} className='flex flex-col-reverse'>
      {column.rows.map((row, rowIndex) => (
        <Row
          key={`row-${rowIndex}`}
          row={row}
          rowIndex={rowIndex}
          hasCircuitBox={column.hasCircuitBox}
          circuitboxId={column.circuitboxId}
        />
      ))}
    </div>
  )
}