import { useState } from 'react';
import Input from './components/Input';
import Section from './components/Section';
import formatData from './utils/formatData';

function App() {
  const [width, setWidth] = useState(5);
  const [height, setHeight] = useState(7);
  const [cabinetsPerCircuit, setCabinetsPerCircuit] = useState(5);

  const sectionArray = formatData(width, height, cabinetsPerCircuit);

  // Input elements to control config
  const controls = [
    { label: 'Number of Cabinets Wide:', value: width, onChange: setWidth },
    { label: 'Number of Cabinets Tall:', value: height, onChange: setHeight },
    { label: 'Number of Cabinets per Circuit', value: cabinetsPerCircuit, onChange: setCabinetsPerCircuit },
  ]

  return (
    <div className="container mx-auto mt-6">
      <h1 className='text-white text-4xl font-bold text-center mt-4 mb-8'>MicroLED Configuration Tool</h1>
      <div className="m-auto p-4 w-full min-h-48 bg-[#526D82] shadow-md shadow-slate-400 rounded-lg text-slate-100">
        {controls.map((control) => (
          <Input
            label={control.label}
            value={control.value}
            onChange={control.onChange}
          />
        ))}

        {/* GRID */}
        <div className='border-2 border-[#9DB2BF] px-4 py-1 mt-6 w-full h-full flex flex-col-reverse'>
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
