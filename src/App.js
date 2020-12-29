import React, { useState, useEffect, useMemo } from 'react'
import './App.css';

import Table from './Table.js'

function App() {
  const [leaderboardData, setLeaderboardData] = useState([])
  const fetchLeaderboardData = () => {
      fetch('data.json',{
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
          }
      })
          .then((response) => {
              console.log(response);
              return response.json();
          })
          .then((data) => {
              console.log(data);
              setLeaderboardData(Object.values(data.members));
          });
  }
  const generateTimestampCell = ({ cell: {value} }) => {
        let date = new Date(parseInt(value, 10) * 1000)
        let day = date.getDate()
        let hours = '0' + date.getHours()
        let minutes = '0' + date.getMinutes()
        let seconds = '0' + date.getSeconds()
        return (
            <>
                <p className='timestamp-day'>
                    12/{day}
                </p>
                <p className='timestamp-cell'>
                    {hours.substr(-2)}:{minutes.substr(-2)}:{seconds.substr(-2)}
                </p>
            </>
        )

    }
    const generateTable = () => {
        let i;
        let tableColumns = []
        for (i = 1; i <= 25; i++) {
            tableColumns.push({
                Header: 'Day ' + i,
                columns: [
                    {
                    Header: 'Part 1',
                    accessor: 'completion_day_level.' + i + '.1.get_star_ts',
                    Cell: generateTimestampCell
                },
                {
                    Header: 'Part 2',
                    accessor: 'completion_day_level.' + i + '.2.get_star_ts',
                    Cell: generateTimestampCell
                }
            ]
        })
      }
      return tableColumns
  }
  const columns = useMemo(
      generateTable, []
  )

  useEffect(() => {
      fetchLeaderboardData()
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Advent of Code Leaderboard</h1>
          <Table columns={columns} data={leaderboardData} />
      </header>
    </div>
  );
}

export default App;
