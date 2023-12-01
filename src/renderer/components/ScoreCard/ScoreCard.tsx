import React, { useEffect } from 'react';
import './ScoreCard.css';

function ScoreCard() {
  const [json, setJson] = React.useState<any>([]);
  const [table, setTable] = React.useState<any>([]);
  useEffect(() => {
    window.electron.ipcRenderer.on('sendTimes', (args) => {
      setJson(JSON.parse(args as string));
    });
  }, []);

  window.electron.ipcRenderer.sendMessage('getTimes');

  useEffect(() => {
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
    setTable(t);
  }, [json]);

  return (
    <div className="score-card">
      <div className="score-card-header">
        <h1>Score Card</h1>
        <div className="session-changer">
          <h1>Session: </h1>
          <select>
            <option value="fruit">Fruit</option>

            <option value="vegetable">Vegetable</option>

            <option value="meat">Meat</option>
          </select>
        </div>
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
