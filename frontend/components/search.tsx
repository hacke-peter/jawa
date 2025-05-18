'use client';

import { useState, useRef, useEffect } from 'react';

interface AutocompleteSearchProps {
  options: string[];
  onSearch?: (value: string) => void;
}

export default function AutocompleteSearch({
  options,
  onSearch,
}: AutocompleteSearchProps) {
  const [input, setInput] = useState('');
  const [filtered, setFiltered] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // close dropdown on outside click
    function onClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInput(val);
    if (val.trim() === '') {
      setFiltered([]);
      setOpen(false);
      return;
    }
    const matches = options.filter((opt) => {
      if (!opt || !val) {
        return false;
      }
      return opt.toLowerCase().startsWith(val.toLowerCase());
    });
    setFiltered(matches);
    setOpen(matches.length > 0);
  };

  const handleSelect = (val: string) => {
    setInput(val);
    setFiltered([]);
    setOpen(false);
    onSearch?.(val);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (options.includes(input)) {
      onSearch?.(input);
    }
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-sm">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={handleChange}
          onFocus={() => input && filtered.length > 0 && setOpen(true)}
          placeholder="Search..."
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </form>

      {open && (
        <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded shadow-lg max-h-60 overflow-auto">
          {filtered.map((opt, i) => (
            <li
              key={i}
              onMouseDown={() => handleSelect(opt)}
              className="px-3 py-2 hover:bg-blue-100 cursor-pointer"
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
