import { useState, useEffect, useRef } from 'react';

export default function Terminal() {
  const [history, setHistory] = useState([
    { type: 'system', text: 'Anurag OS [Version 1.2.0] — Systems Architect Console' },
    { type: 'system', text: 'Type "help" to list available terminal commands.' },
    { type: 'system', text: '' }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [terminalTheme, setTerminalTheme] = useState('cyan'); // cyan, matrix, amber
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  const hasInteracted = useRef(false);

  useEffect(() => {
    if (!hasInteracted.current) return;
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const handleCommand = (e) => {
    if (e.key !== 'Enter') return;
    hasInteracted.current = true;
    const commandText = inputVal.trim();
    setInputVal('');

    if (!commandText) {
      setHistory(prev => [...prev, { type: 'input', text: '' }]);
      return;
    }

    const args = commandText.toLowerCase().split(' ');
    const cmd = args[0];
    const newHistory = [...history, { type: 'input', text: commandText }];

    switch (cmd) {
      case 'help':
      case '?':
        newHistory.push({
          type: 'output',
          text: `Available commands:
  help / ?      - Display this command menu
  neofetch      - Print system overview and engineering summary
  about         - Print professional overview and biography
  skills        - Render visual ASCII proficiency levels
  projects      - List key architectural projects
  contact       - Print contact details & network links
  theme <name>  - Switch theme (options: default, matrix, amber)
  clear         - Wipe the terminal output buffer`
        });
        break;

      case 'clear':
        setHistory([]);
        return;

      case 'neofetch':
        newHistory.push({
          type: 'output',
          text: `      _____      visitor@anurag.sharma
     /     \\     ---------------------
    |  SYS  |    OS: Anurag OS v1.2.0 (Custom Build)
    |  ARC  |    Kernel: React 18 / Node.js MERN
     \\_____/     Uptime: 2+ Years of Software Dev & Design
     /     \\     Shell: bash (systems-architect-portfolio)
    /|     |\\    Resolution: Responsive viewport
   /_|_____|_\\   CPU: B.Tech in Computer Science
                 GPU: Full Stack Web Dev & AI/ML
                 RAM: MongoDB, Express, React, Node, Python, Docker`
        });
        break;

      case 'about':
        newHistory.push({
          type: 'output',
          text: `Anurag Sharma — Full Stack Developer & Systems Engineer.
I craft end-to-end, high-performance web systems and design interfaces at the intersection of code, layout design, and data science. My engineering principles: understand deeply, design modularly, build with pixel-precision.`
        });
        break;

      case 'skills':
        newHistory.push({
          type: 'output',
          text: `Skill Matrix (ASCII System Compiling):
  React.js         [====================] 90%  [Active]
  JavaScript/TS    [=====================] 92%  [Active]
  Node.js/Express  [===================] 85%  [Running]
  Python/ML        [====================] 88%  [Compiled]
  Data Analysis    [===================] 83%  [Idle]
  Docker/DevOps    [================] 70%  [Idle]
  UI/UX & Figma    [===================] 86%  [Active]`
        });
        break;

      case 'projects':
        newHistory.push({
          type: 'output',
          text: `Featured Repository Nodes:
1. One-Stop Personalized Career & Education Advisor
   - Stack: React.js, Node.js, Express.js, MongoDB, Tailwind CSS, REST API, JWT Authentication
   - Description: Smart India Hackathon 2025 Submission for personalized student career and education guidance.
2. Malwa Institute of Technology – Official Website
   - Stack: React, Node.js, Express, MongoDB, Tailwind CSS, REST API
   - Description: Responsive, SEO-optimized official platform serving college directories and placements.
3. Auto Spectra
   - Stack: React, Three.js, Vite, Tailwind CSS, WebGL, 3D Graphics
   - Description: The ultimate 3D mechanical visualization platform with real-time 360° inspection and models.
4. SpeedType — Typing Race
   - Stack: React, Vite, Tailwind CSS, Recharts, Game Mechanics
   - Description: Interactive typing speed game featuring car and rocket racing with real-time WPM analytics.`
        });
        break;

      case 'contact':
        newHistory.push({
          type: 'output',
          text: `Network Link Accessors:
  Email:    anuragsharmabtcs23@mitindore.co.in (Mail client open)
  GitHub:   https://github.com/anurag-sharma09
  LinkedIn: https://www.linkedin.com/in/anurag-sharma-01155633a/
  Twitter:  https://x.com/AnuragS74286279`
        });
        break;

      case 'theme':
        const selectedTheme = args[1];
        if (selectedTheme === 'default' || selectedTheme === 'cyan') {
          setTerminalTheme('cyan');
          newHistory.push({ type: 'output', text: 'System terminal theme reset to default (cyan).' });
        } else if (selectedTheme === 'matrix' || selectedTheme === 'green') {
          setTerminalTheme('matrix');
          newHistory.push({ type: 'output', text: 'Matrix mode initialized. Charging subroutines...' });
        } else if (selectedTheme === 'amber' || selectedTheme === 'yellow') {
          setTerminalTheme('amber');
          newHistory.push({ type: 'output', text: 'Vintage CRT Amber mode initialized.' });
        } else {
          newHistory.push({ type: 'output', text: 'Error: Theme not found. Try: default, matrix, amber' });
        }
        break;

      default:
        newHistory.push({
          type: 'output',
          text: `Command not found: "${commandText}". Type "help" for a list of valid subroutines.`
        });
    }

    setHistory(newHistory);
  };

  const getThemeClass = () => {
    switch (terminalTheme) {
      case 'matrix': return 'term-theme-matrix';
      case 'amber': return 'term-theme-amber';
      default: return 'term-theme-cyan';
    }
  };

  return (
    <div className={`term-wrapper ${getThemeClass()}`} onClick={focusInput} data-aos="fade-up">
      <div className="term-header">
        <div className="term-dots">
          <span className="dot dot-red"></span>
          <span className="dot dot-yellow"></span>
          <span className="dot dot-green"></span>
        </div>
        <div className="term-title">anurag@systems-architect:~</div>
        <div className="term-status">[STATUS: ONLINE]</div>
      </div>
      <div className="term-body">
        <div className="term-log">
          {history.map((line, index) => {
            if (line.type === 'system') {
              return <div key={index} className="term-line term-line-system">{line.text}</div>;
            } else if (line.type === 'input') {
              return (
                <div key={index} className="term-line term-line-input">
                  <span className="term-prompt">visitor@anurag.sharma:~$</span> {line.text}
                </div>
              );
            } else {
              return (
                <pre key={index} className="term-line term-line-output">
                  {line.text}
                </pre>
              );
            }
          })}
          <div ref={bottomRef} />
        </div>
        <div className="term-input-line">
          <span className="term-prompt">visitor@anurag.sharma:~$</span>
          <input
            ref={inputRef}
            type="text"
            className="term-input"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleCommand}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            aria-label="Terminal input prompt"
          />
        </div>
      </div>
    </div>
  );
}
