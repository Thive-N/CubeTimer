import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import './TimeGraph.css';
import { CategoryScale } from 'chart.js';
import { Link } from 'react-router-dom';

interface Option {
  readonly label: string;
  readonly value: string;
}

Chart.register(CategoryScale);

function timetoseconds(time: string): number {
  const timeArray = time[0].split(':');
  const ms =
    parseInt(timeArray[0], 10) * 60 * 1000 +
    parseInt(timeArray[1], 10) * 1000 +
    parseInt(timeArray[2], 10);
  return ms;
}

function timestamptolabel(timestamp: string): string {
  return timestamp.split(' ').slice(0, 4).join(' ');
}

function TimeGraph() {
  const [currentSessionTimes, setCurrentSessionTimes] = useState<any>([]);
  const [sessions, setSessions] = useState<any>([]);
  const [sessionsOptions, setSessionsOptions] = useState<any>([]);
  const [currentSession, setCurrentSession] = useState<Option | null>(null);
  const [graphData, setGraphData] = useState<any>({
    labels: [],
    datasets: [
      {
        label: 'Time',
        data: [],
      },
    ],
  });

  useEffect(() => {
    window.electron.ipcRenderer.on('sendSessions', (args) => {
      setSessions(JSON.parse(args as string));
    });

    window.electron.ipcRenderer.sendMessage('getSessions');
    setCurrentSession({ label: 'default', value: 'default' });
  }, []);

  useEffect(() => {
    const options = sessions.map((session: any) => {
      return { label: session, value: session };
    });
    setSessionsOptions(options);
  }, [sessions]);

  useEffect(() => {
    if (!currentSession) {
      return;
    }
    window.electron.ipcRenderer.on('sendTimes', (args) => {
      setCurrentSessionTimes(JSON.parse(args as string));
    });

    window.electron.ipcRenderer.sendMessage('getTimes');
  }, [currentSession]);

  useEffect(() => {
    const labels: any = currentSessionTimes.map((data: any) =>
      timestamptolabel(data.timestamp),
    );
    const data: any = currentSessionTimes.map((da: any) =>
      timetoseconds(da.time),
    );

    setGraphData({
      labels,
      datasets: [
        {
          label: 'Time',
          data,
        },
      ],
    });
  }, [currentSessionTimes]);

  useEffect(() => {}, [graphData]);

  function onChange(newValue: any): void {
    setCurrentSession(newValue);
    window.electron.ipcRenderer.sendMessage('setSession', newValue.value);
  }

  return (
    <div className="time-graph-page">
      <div className="graph-title">
        <Link className="link-back-home-from-graph" to="/">
          Go Back To Timer
        </Link>
        <Select
          className="session-select-time-graph"
          onChange={(newval) => {
            onChange(newval);
          }}
          options={sessionsOptions}
          value={sessionsOptions[0]}
        />
      </div>
      <div className="graph-container">
        <Line
          data={graphData}
          options={{
            plugins: {
              tooltip: {
                callbacks: {
                  label(context: any) {
                    const label = context.dataset.label || '';
                    if (label) {
                      return `${label}: ${context.parsed.y / 1000}s`;
                    }
                    return '';
                  },
                },
              },
            },
            scales: {
              y: {
                ticks: {
                  callback(value: any) {
                    return value / 1000;
                  },
                },
              },
              x: {
                ticks: {
                  maxTicksLimit: 10,
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
}

export default TimeGraph;
