import React, { useEffect } from 'react';
import './ScoreCard.css';

function ScoreCard() {
  const [json, setJson] = React.useState<any>([]);

  useEffect(() => {
    window.electron.ipcRenderer.on('getTimes', (args) => {
      setJson(JSON.parse(args as string));
    });
    setTimeout(() => {
      window.electron.ipcRenderer.sendMessage('getTimes', []);
    }, 1000);
  }, []);

  const table = [];
  for (let i = 0; i < json.length; i += 1) {
    const date = new Date(json[i].timestamp);
    table.push(
      <tr key={i}>
        <th>{date.toLocaleString()}</th>
        <th>{json[i].time}</th>
      </tr>,
    );
  }
  return (
    <div className="score-card">
      <div className="score-card-header">
        <h1>Score Card</h1>
      </div>
      <div className="score-card-scores">
        <table>
          <tbody>{table}</tbody>
        </table>
      </div>
    </div>
  );
}

export default ScoreCard;
