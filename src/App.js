import { useState } from 'react';

function App() {
  const [width, setWidth] = useState(5);
  const [height, setHeight] = useState(5);
  const [cabinetsPerCircuit, setCabinetsPerCircuit] = useState(5);

  const numSections = Math.ceil(height / cabinetsPerCircuit);
  const lastSectionHeight = height - (cabinetsPerCircuit * (numSections - 1));

  let counter = 1;
  const sectionArray = Array(numSections).fill([], 0).map((section, sectionIndex) => {
    // push arrays of columns
    const cols = [];
    for (let i = 0; i < width; i++) {
      // For each column, push rows with cabinet numbers
      const row = [];
      const sectionHeight = sectionIndex === (numSections - 1) ? lastSectionHeight : cabinetsPerCircuit;

      for (let j = 0; j < sectionHeight; j++) {
        row.push(counter);
        counter++;
      }

      cols.push(row);
    }

    return cols;
  });

  return (
    <div className="container mx-auto mt-6">
      <div className="m-auto p-4 w-full min-h-48 bg-slate-400 shadow-lg rounded-lg text-slate-100 align-middle">
        <label className="mt-4">
          Width
          <input type="number" className="rounded-lg p-4 w-full text-black" value={width} onChange={(e) => setWidth(e.target.value)} />
        </label>
        <label className="mt-4">
          Height
          <input type="number" className="rounded-lg p-4 w-full text-black" value={height} onChange={(e) => setHeight(e.target.value)} />
        </label>
        <label className="mt-4">
          Cabinets per Circuit
          <input type="number" className="rounded-lg p-4 w-full text-black" value={cabinetsPerCircuit} onChange={(e) => setCabinetsPerCircuit(e.target.value)} />
        </label>

        {/* GRID */}
        <div className='border-2 px-4 py-1 mt-2 w-full h-full flex flex-col-reverse'>
          {sectionArray.map((section, sectionIndex) => (
            <div key={`section-${sectionIndex}`} id={`section-${sectionIndex}`} className='flex w-full'>
              {section.map((cols, colIndex) => (
                <div key={`col-${colIndex}`} style={{ width: `${100 / width}%` }} className='flex-col'>
                  {cols.reverse().map((row) => (
                      <div key={`row-${row}`} className='aspect-video w-full border-2 p-1 relative flex items-center justify-center'>
                        {/* COLUMN 1, BOX 1 */}
                        <span className='absolute top-0 left-1'>{row}</span>
                        <div className='rounded-full w-4 h-4 bg-slate-800 border-2 border-white' />
                      </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
