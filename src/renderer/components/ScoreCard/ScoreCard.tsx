import React, { useEffect } from 'react';
import './ScoreCard.css';

function ScoreCard() {
  const [json, setJson] = React.useState<any>([]);
  const [table, setTable] = React.useState<any>([]);
  const [currentSession, setCurrentSession] = React.useState('default');
  const [sessions, setSessions] = React.useState<any>([]);
  const [sessionsOptions, setSessionsOptions] = React.useState<any>([]);
  const tableRef = React.useRef<HTMLTableElement>(null);
  const [scrollPosition, setScrollPosition] = React.useState<number>(0);

  useEffect(() => {
    window.electron.ipcRenderer.on('sendTimes', (args) => {
      setJson(JSON.parse(args as string));
    });

    window.electron.ipcRenderer.sendMessage('getTimes');
  }, []);

  useEffect(() => {
    window.electron.ipcRenderer.on('sendSessions', (args) => {
      setSessions(JSON.parse(args as string));
    });

    window.electron.ipcRenderer.sendMessage('getSessions');
  }, []);

  useEffect(() => {
    if (tableRef.current) {
      // Save the current scroll position before updating the table
      setScrollPosition(tableRef.current.scrollTop);
    }

    const t = [];
    for (let i = json.length - 1; i >= 0; i -= 1) {
      const date = new Date(json[i].timestamp);
      t.push(
        <tr key={i}>
          <th>{date.toLocaleString()}</th>
          <th>{json[i].time}</th>
        </tr>,
      );
    }
    // Reset the scroll position after the table update
    if (tableRef.current) {
      tableRef.current.scrollTop = scrollPosition;
    }
    setTable(t);
  }, [json, scrollPosition]);

  useEffect(() => {
    const t = [];
    for (let i = 0; i < sessions.length; i += 1) {
      t.push(<option value={sessions[i]}>{sessions[i]}</option>);
    }
    setSessionsOptions(t);
  }, [sessions]);

  const handleChange = (event: any) => {
    setCurrentSession(event.target.value);
    window.electron.ipcRenderer.sendMessage('setSession', event.target.value);
  };
  return (
    <div className="score-card">
      <div className="score-card-header">
        <h1>Score Card</h1>
        <div className="session-changer">
          <h1>Session: </h1>
          <select value={currentSession} onChange={handleChange}>
            {sessionsOptions}
            <option value="">Create New...</option>
          </select>
        </div>
      </div>
      <div className="score-card-scores">
        <table ref={tableRef}>
          <tbody>{table}</tbody>
        </table>
      </div>
    </div>
  );
}

export default ScoreCard;
