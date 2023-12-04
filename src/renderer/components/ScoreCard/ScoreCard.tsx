import React, { useEffect } from 'react';
import './ScoreCard.css';
import CreatableSelect from 'react-select/creatable';

interface Option {
  readonly label: string;
  readonly value: string;
}

const createOption = (label: string) => ({
  label,
  value: label,
});

function ScoreCard() {
  const [json, setJson] = React.useState<any>([]);
  const [table, setTable] = React.useState<any>([]);
  const [sessions, setSessions] = React.useState<any>([]);
  const [currentSession, setCurrentSession] = React.useState<Option | null>(
    null,
  );
  const [sessionsOptions, setSessionsOptions] = React.useState<any>([]);
  const tableRef = React.useRef<HTMLTableElement>(null);
  const [scrollPosition, setScrollPosition] = React.useState<number>(0);

  const [isLoading, setIsLoading] = React.useState(false);

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
    const options = sessions.map((session: any) => {
      return { label: session, value: session };
    });
    setSessionsOptions(options);
  }, [sessions]);

  function onChange(newValue: any): void {
    setCurrentSession(newValue);
    window.electron.ipcRenderer.sendMessage('setSession', newValue.value);
    window.electron.ipcRenderer.sendMessage('getTimes');
  }

  function onCreateOption(input: string): void {
    setIsLoading(true);
    const newOption = createOption(input);
    setSessionsOptions([...sessionsOptions, newOption]);
    window.electron.ipcRenderer.sendMessage('addSession', input);
    window.electron.ipcRenderer.sendMessage('setSession', input);
    window.electron.ipcRenderer.sendMessage('sendTimes');
    setCurrentSession(newOption);
    setIsLoading(false);
  }

  return (
    <div className="score-card">
      <div className="score-card-header">
        <h1>Score Card</h1>
        <div className="session-changer">
          <h1 className="session-changer-tag">Session:</h1>
          <CreatableSelect
            isDisabled={isLoading}
            isLoading={isLoading}
            onChange={(newval) => {
              onChange(newval);
            }}
            onCreateOption={(v): void => {
              onCreateOption(v);
            }}
            options={sessionsOptions}
            value={currentSession}
          />
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
