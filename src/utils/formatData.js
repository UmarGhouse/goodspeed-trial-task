import * as colorSeed from "color-seed";

export default function formatData(width, height, cabinetsPerCircuit) {
  const numSections = Math.ceil(height / cabinetsPerCircuit);
  const lastSectionHeight = height - (cabinetsPerCircuit * (numSections - 1));

  let counter = 1; // Tracks current cabinet number

  return Array(numSections).fill({}, 0).map((_, sectionIndex) => {
    // setup section data
    const sectionData = {
      height: sectionIndex === (numSections - 1) ? lastSectionHeight : cabinetsPerCircuit,
      columns: [],
    };

    let circuitCounter = 0; // Keeps track of how many circuits are connected so far

    // cycle through columns to add rows
    for (let col = 0; col < width; col++) {
      const column = {
        color: colorSeed.getColor(counter), // Use color-seed package to get predictable colors for columns
        hasCircuitBox: true,
        circuitboxId: `${sectionIndex}-circuit-box-${col}`,
        rows: [],
      }

      // Check, at the start of the column, if circuit counter wil become too large
      if (circuitCounter + sectionData.height > cabinetsPerCircuit) {
        circuitCounter = 0;
      } else {
        // If not, adjust column color to previous column color, unless this is the first column
        if (col > 0) column.color = sectionData.columns[col - 1].color;
      };

      // For each column, push rows with cabinet data
      for (let row = 0; row < sectionData.height; row++) {
        const rowData = {
          value: counter,
          arrowStart: row === 0 ? column.circuitboxId : `${sectionIndex}-${col}-row-${row - 1}-dot`, // circuit box ID / previous row dot ID
          arrowEnd: `${sectionIndex}-${col}-row-${row}-dot`, // current row dot ID
          color: column.color, // column color
        };

        if (
          sectionData.height <= 2 // Section height is 2 or less
          && col !== 0 // column is NOT the first column
          && circuitCounter > 0 // This is not the first node in the circuit
          && circuitCounter + sectionData.height <= cabinetsPerCircuit // circuitCounter, at the end of col, will still be less than cabinetsPerCircuit
          && row === 0 // row is first row
        ) {
          // Remove circuit box only if previous column has one and reset arrowStart for this row
          if (sectionData.columns[col - 1].hasCircuitBox) {
            column.hasCircuitBox = false;
            rowData.arrowStart = sectionData.columns[col - 1].circuitboxId;
          }
        }

        column.rows.push(rowData); // Save row

        // Increment counters
        circuitCounter++;
        counter++;
      }

      sectionData.columns.push(column); // Save column
    }

    return sectionData;
  });
}
