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
