import { useState, useEffect } from 'react';

type Mode = 'light' | 'dark';

function loadFromLocalStorage(): Mode {
  let mode = window.localStorage.getItem('mode') ?? 'light';

  if (mode !== 'dark' && mode !== 'light') {
    mode = 'light';
  }

  return mode as Mode;
}

function saveToLocalStorage(mode: Mode) {
  window.localStorage.setItem('mode', mode);
}

function useTheme() {
  const [mode, setMode] = useState<Mode>(loadFromLocalStorage());
  const _mode: Mode = mode === 'light' ? 'dark' : 'light';

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove(_mode);
    root.classList.add(mode);
    saveToLocalStorage(mode);
  }, [mode, _mode]);

  function switchTheme() {
    setMode(mode === 'light' ? 'dark' : 'light');
  }

  function setTheme(mode: Mode) {
    setMode(mode);
  }

  return { switchTheme, setTheme };
}

export default useTheme;

