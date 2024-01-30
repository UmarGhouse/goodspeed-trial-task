import { useState } from 'react';
import Xarrow from "react-xarrows";

function App() {
  const [width, setWidth] = useState(5);
  const [height, setHeight] = useState(5);
  const [cabinetsPerCircuit, setCabinetsPerCircuit] = useState(10);

  const numSections = Math.ceil(height / cabinetsPerCircuit);
  const lastSectionHeight = height - (cabinetsPerCircuit * (numSections - 1));

  const generateColor = () => {
    const string = Math.random().toString(16)
    return '#' + string.substring(9);
  }

  let counter = 1;
  const sectionArray = Array(numSections).fill({}, 0).map((_, sectionIndex) => {
    // setup section data
    const sectionData = {
      height: sectionIndex === (numSections - 1) ? lastSectionHeight : cabinetsPerCircuit,
      columns: [],
    };

    let circuitCounter = 0; // Keeps track of how many circuits are connected so far

    // cycle through columns to add rows
    for (let i = 0; i < width; i++) {
      const column = {
        color: generateColor(),
        rows: [],
      }

      // For each column, push rows with cabinet numbers
      for (let j = 0; j < sectionData.height; j++) {
        column.rows.push(counter);
        circuitCounter++;
        counter++;
      }

      // If there are more than 2 cabinets per circuit, i.e. in this section
      if (sectionData.height > 2) {
        // First, make sure we're not on the first column
        // Then check that the circuit counter, at the end of the column is within range
        if (i > 0 && circuitCounter <= cabinetsPerCircuit) {
          column.color = sectionData.columns[i - 1].color;
        }

        // If, by the end of the column, circuit counter is too large, reset it to the column height
        if (circuitCounter > cabinetsPerCircuit) {
          circuitCounter = sectionData.height;
        };
      }

      sectionData.columns.push(column);
    }

    return sectionData;
  });

  return (
    <div className="container mx-auto mt-6">
      <div className="m-auto p-4 w-full min-h-48 bg-slate-400 shadow-lg rounded-lg text-slate-100 align-middle">
        <label className="mt-4">
          Width
          <input type="number" min={1} className="rounded-lg p-4 w-full text-black" value={width} onChange={(e) => setWidth(Math.max(e.target.value, 1))} />
        </label>
        <label className="mt-4">
          Height
          <input type="number" min={1} className="rounded-lg p-4 w-full text-black" value={height} onChange={(e) => setHeight(Math.max(e.target.value, 1))} />
        </label>
        <label className="mt-4">
          Cabinets per Circuit
          <input type="number" min={1} className="rounded-lg p-4 w-full text-black" value={cabinetsPerCircuit} onChange={(e) => setCabinetsPerCircuit(Math.max(e.target.value, 1))} />
        </label>

        {/* GRID */}
        <div className='border-2 px-4 py-1 mt-2 w-full h-full flex flex-col-reverse'>
          {sectionArray.map((section, sectionIndex) => (
            <div key={`section-${sectionIndex}`} id={`section-${sectionIndex}`} className='flex w-full'>
              {section.columns.map((cols, colIndex) => (
                <div key={`col-${colIndex}`} style={{ width: `${100 / width}%` }} className='flex flex-col-reverse'>
                  {cols.rows.map((row, rowIndex) => (
                    <div key={`row-${row}`} className='aspect-video w-full border-2 p-1 relative flex items-center justify-center'>
                      {/* COLUMN 1, BOX 1 */}
                      <span className='absolute top-0 left-1'>{row}</span>
                      <div className='rounded-full w-4 h-4 bg-slate-800 border-2 border-white' id={`${sectionIndex}-${colIndex}-row-${rowIndex}-dot`} />
                      {rowIndex === 0 ? (
                        <>
                          <div className='w-8 h-4 absolute bottom-1 left-1' id={`${sectionIndex}-circuit-box-${colIndex}`} style={{ backgroundColor: cols.color }} />
                          <Xarrow
                            start={`${sectionIndex}-circuit-box-${colIndex}`}
                            end={`${sectionIndex}-${colIndex}-row-${rowIndex}-dot`}
                            showHead={false}
                            startAnchor={"right"}
                            endAnchor={"bottom"}
                            color={cols.color}
                          />
                        </>
                      ) : (
                        <Xarrow
                          start={`${sectionIndex}-${colIndex}-row-${rowIndex - 1}-dot`}
                          end={`${sectionIndex}-${colIndex}-row-${rowIndex}-dot`}
                          startAnchor={"top"}
                          endAnchor={"bottom"}
                          strokeWidth={3}
                          headSize={4}
                          color={cols.color}
                        />
                      )}
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
