import React, {useState, useEffect, useMemo} from 'react'
import './App.css';

import Table from './Table.js'

function App() {
    const [leaderboardData, setLeaderboardData] = useState([])
    const [leaderboardPlacings, setLeaderboardPlacings] = useState([])
    const fetchLeaderboardData = () => {
        fetch('data.json', {
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
                // generatePlacings()
            });
    }
    const generateTimestampCell = ({cell: {value}}) => {
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
                <p className='timestamp-time'>
                    {hours.substr(-2)}:{minutes.substr(-2)}:{seconds.substr(-2)}
                </p>
            </>
        )
    }
    const generateTable = () => {
        let tableColumns = []
        for (let i = 1; i <= 25; i++) {
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
    const generatePlacings = () => {
        let placingsArray = []
        for (let i = 0; i < 50; i++) {
            let currentDayTimes = []
            let currentDayPlacings = []
            for (let memberIndex = 0; memberIndex < leaderboardData.length; memberIndex++) {
                let puzzleTimestamps = leaderboardData[memberIndex]['completion_day_level']
                console.log("i = " + i)
                console.log("memberIndex = " + memberIndex)
                console.log(puzzleTimestamps[Math.floor(i / 2) + 1][i % 2 + 1]['get_star_ts'])
                currentDayTimes.push(
                    parseInt(
                        puzzleTimestamps[Math.floor(i / 2) + 1][i % 2 + 1]['get_star_ts'],
                        10
                    )
                )
            }
            console.log(currentDayTimes)
            for (let j = 0; j < currentDayTimes.length; j++) {
                let myPlacing = 0
                for (let k = 0; k < currentDayTimes.length; k++) {
                    if (currentDayTimes[k] < currentDayTimes[j]) {
                        myPlacing++
                    }
                }
                currentDayPlacings.push(myPlacing)
            }
            placingsArray.push(currentDayPlacings)
            console.log(currentDayPlacings)
        }
        setLeaderboardPlacings(placingsArray)
    }

    useEffect(() => {
        fetchLeaderboardData()
    }, []);

    useEffect(() => {
        if (leaderboardData.length) {
            console.log(leaderboardData)
            generatePlacings()
        }
    }, [leaderboardData])


    return (
        <div className="App">
            <header className="App-header">
                <h1>Advent of Code Leaderboard</h1>
                <hr />
                <Table columns={columns} data={leaderboardData} rankings={leaderboardPlacings}/>
            </header>
        </div>
    );
}

export default App;
