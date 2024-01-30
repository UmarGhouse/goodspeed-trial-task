import Column from "./Column";

export default function Section ({ section, width }) {
  return (
    <div className='flex w-full'>
      {section.columns.map((column, colIndex) => (
        <Column
          column={column}
          width={width}
          key={`col-${colIndex}`}
        />
      ))}
    </div>
  )
}