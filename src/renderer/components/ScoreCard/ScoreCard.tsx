import React, { useEffect } from 'react';
import './ScoreCard.css';

function ScoreCard() {
  const [json, setJson] = React.useState<any>([]);

  useEffect(() => {
    window.electron.ipcRenderer.on('getTimes', (args) => {
      setJson(JSON.parse(args as string));
    });
    window.electron.ipcRenderer.sendMessage('getTimes');
  }, []);

  const table = [];
  for (let i = 0; i < json.length; i += 1) {
    table.push(
      <tr key={i}>
        <th>{json[i].timestamp}</th>
        <th>{json[i].time}</th>
      </tr>,
    );
  }
  return (
    <table>
      <tbody>{table}</tbody>
    </table>
  );
}

export default ScoreCard;
