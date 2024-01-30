import { useState } from 'react';
import Input from './components/Input';
import Section from './components/Section';

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

  // Input elements to control config
  const controls = [
    { label: 'Width', value: width, onChange: setWidth },
    { label: 'Height', value: height, onChange: setHeight },
    { label: 'Cabinets per Circuit', value: cabinetsPerCircuit, onChange: setCabinetsPerCircuit },
  ]

  return (
    <div className="container mx-auto mt-6">
      <div className="m-auto p-4 w-full min-h-48 bg-slate-400 shadow-lg rounded-lg text-slate-100 align-middle">
        {controls.map((control) => (
          <Input
            label={control.label}
            value={control.value}
            onChange={control.onChange}
          />
        ))}

        {/* GRID */}
        <div className='border-2 px-4 py-1 mt-2 w-full h-full flex flex-col-reverse'>
          {sectionArray.map((section, sectionIndex) => (
            <Section
              section={section}
              width={width}
              key={`section-${sectionIndex}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
