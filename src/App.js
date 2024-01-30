import { useState } from 'react';
import Xarrow from "react-xarrows";

function App() {
  const [width, setWidth] = useState(5);
  const [height, setHeight] = useState(7);
  const [cabinetsPerCircuit, setCabinetsPerCircuit] = useState(5);

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
        hasCircuitBox: true,
        circuitboxId: `${sectionIndex}-circuit-box-${i}`,
        rows: [],
      }

      // Check, at the start of the column, if circuit counter wil become too large
      if (circuitCounter + sectionData.height > cabinetsPerCircuit) {
        circuitCounter = 0;
      } else {
        // If not, adjust column color to previous column color, unless this is the first column
        if (i > 0) column.color = sectionData.columns[i - 1].color;
      };

      // For each column, push rows with cabinet data
      for (let j = 0; j < sectionData.height; j++) {
        const row = {
          value: counter,
          arrowStart: j === 0 ? column.circuitboxId : `${sectionIndex}-${i}-row-${j - 1}-dot`, // circuit box ID / previous row dot ID
          arrowEnd: `${sectionIndex}-${i}-row-${j}-dot`, // current row dot ID
          color: column.color, // column color
        };

        if (
          sectionData.height <= 2 // Section height is 2 or less
          && i !== 0 // column is NOT the first column
          && circuitCounter > 0 // This is not the first node in the circuit
          && circuitCounter + sectionData.height <= cabinetsPerCircuit // circuitCounter, at the end of col, will still be less than cabinetsPerCircuit
          && j === 0 // row is first row
        ) {
          // Remove circuit box only if previous column has one and reset arrowStart for this row
          if (sectionData.columns[i - 1].hasCircuitBox) {
            column.hasCircuitBox = false;
            row.arrowStart = sectionData.columns[i - 1].circuitboxId;
          }
        }

        column.rows.push(row); // Save row

        // Increment counters
        circuitCounter++;
        counter++;
      }

      sectionData.columns.push(column); // Save column
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
              {section.columns.map((column, colIndex) => (
                <div key={`col-${colIndex}`} style={{ width: `${100 / width}%` }} className='flex flex-col-reverse'>
                  {column.rows.map((row, rowIndex) => (
                    <div key={`row-${row}`} className='aspect-video w-full border-2 p-1 relative flex items-center justify-center'>
                      {/* COLUMN 1, BOX 1 */}
                      <span className='absolute top-0 left-1'>{row.value}</span>
                      <div className='rounded-full w-4 h-4 bg-slate-800 border-2 border-white' id={`${sectionIndex}-${colIndex}-row-${rowIndex}-dot`} />
                      {rowIndex === 0 ? (
                        <>
                          {column.hasCircuitBox ? (
                            <div className='w-8 h-4 absolute bottom-1 left-1' id={column.circuitboxId} style={{ backgroundColor: column.color }} />
                          ) : null}

                          <Xarrow
                            start={row.arrowStart}
                            end={row.arrowEnd}
                            showHead={false}
                            startAnchor={"right"}
                            endAnchor={"bottom"}
                            color={row.color}
                          />
                        </>
                      ) : (
                        <Xarrow
                          start={row.arrowStart}
                          end={row.arrowEnd}
                          startAnchor={"top"}
                          endAnchor={"bottom"}
                          strokeWidth={3}
                          headSize={4}
                          color={row.color}
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
