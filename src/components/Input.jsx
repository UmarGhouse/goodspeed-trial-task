export default function Input({ label, value, onChange }) {
  return (
    <label className="mt-4 block">
      {label}
      <input type="number" min={1} className="rounded-lg p-4 w-full text-black" value={value} onChange={(e) => onChange(Math.max(e.target.value, 1))} />
    </label>
  );
}
