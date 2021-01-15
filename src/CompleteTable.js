import React, {useEffect, useMemo, useState} from 'react';
import NameTable from "./NameTable";
import Table from "./Table";
import getRankings from "./getRankings";

function CompleteTable({leaderboardData}) {
    const [leaderboardPlacings, setLeaderboardPlacings] = useState([])
    const generateTimestampCell = ({cell: {value}}, puzzleDay) => {
        if (!value) {
            return null // don't render anything if the person hasn't completed the day's puzzle
        }
        let date = new Date(parseInt(value, 10) * 1000)
        let days = date.getDate() - puzzleDay
        let minutes = '0' + date.getMinutes()
        let seconds = '0' + date.getSeconds()
        let hours = '0' + date.getHours()
        return (
            <p className='timestamp-time'>
                {days + ' day' + ((days === 1) ? '' : 's')},
                <br/>
                {hours.substr(-2)}:{minutes.substr(-2)}:{seconds.substr(-2)}
            </p>
        )
    }
    const generatePuzzleColumns = () => {
        let tableColumns = []
        for (let i = 1; i <= 25; i++) {
            tableColumns.push({
                Header: 'Day ' + i,
                columns: [
                    {
                        Header: 'Part 1',
                        accessor: 'completion_day_level.' + i + '.1.get_star_ts',
                        Cell: (cell) => generateTimestampCell(cell, i)
                    },
                    {
                        Header: 'Part 2',
                        accessor: 'completion_day_level.' + i + '.2.get_star_ts',
                        Cell: (cell) => generateTimestampCell(cell, i)
                    }
                ]
            })
        }
        return tableColumns
    }
    const puzzleColumns = useMemo(
        generatePuzzleColumns, []
    )
    const generateDayPlacings = () => {
        let placingsArray = []
        for (let i = 0; i < 50; i++) {
            let currentDayTimes = []
            for (let memberIndex = 0; memberIndex < leaderboardData.length; memberIndex++) {
                let currentDay = Math.floor(i / 2) + 1
                let currentPart = i % 2 + 1
                let puzzleTimestamps = leaderboardData[memberIndex]['completion_day_level'][currentDay]

                if (!puzzleTimestamps || !puzzleTimestamps[currentPart]) {
                    currentDayTimes.push(Infinity)
                } else {
                    currentDayTimes.push(
                        parseInt(puzzleTimestamps[currentPart]['get_star_ts'], 10)
                    )
                }
            }
            placingsArray.push(getRankings(currentDayTimes, false))
        }
        setLeaderboardPlacings(placingsArray)
    }

    useEffect(() => {
        if (leaderboardData.length) {
            console.log(leaderboardData)
            generateDayPlacings()
        }
    }, [leaderboardData])

    return (
        <div className='tableArea'>
            <div className='nameTable'>
                <NameTable lbData={leaderboardData}/>
            </div>
            <div className='puzzleTable'>
                <Table columns={puzzleColumns} data={leaderboardData}
                       rankings={leaderboardPlacings}/>
            </div>
        </div>
    )
}

export default CompleteTable;
