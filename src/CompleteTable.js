import React, {useEffect, useMemo, useState} from 'react';
import NameTable from "./NameTable";
import PuzzleTable from "./PuzzleTable";
import getRankings from "./getRankings";

function CompleteTable({leaderboardData}) {
    const [leaderboardPlacings, setLeaderboardPlacings] = useState([])
    const generateTimestampCell = ({cell: {value}}, puzzleDay) => {
        if (!value) {
            return null // don't render anything if the person hasn't completed the day's puzzle
        }
        const date = new Date(parseInt(value, 10) * 1000)
        const days = date.getDate() - puzzleDay
        const minutes = '0' + date.getMinutes()
        const seconds = '0' + date.getSeconds()
        const hours = '0' + date.getHours()
        return (
            <p className='timestamp-time'>
                {days + ' day' + ((days === 1) ? '' : 's')},
                <br/>
                {hours.substr(-2)}:{minutes.substr(-2)}:{seconds.substr(-2)}
            </p>
        )
    }
    const generatePuzzleColumns = () => {
        const tableColumns = []
        // tableColumns is an array of nearly identical objects, only differing in day numbers
        for (let i = 1; i <= 25; i++) {
            tableColumns.push({
                Header: 'Day ' + i,
                columns: [
                    {
                        Header: 'Part 1',
                        // accessor is the path in each person object where the desired data is pulled from
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
        // an array of the placings of each day/part, e.g.
        // [[1, 2, 3], [2, 1, 3]]
        // would mean that on the first day/part, the person at index 0 was first to solve the puzzle
        // and that they were the second to solve it on the second day/part. the person at index 2 solved
        // it slowest both day/parts
        const placingsArray = []
        for (let i = 0; i < 50; i++) {
            // an array to store the unix timestamps of each day for ranking purposes
            const currentDayTimes = []
            for (let memberIndex = 0; memberIndex < leaderboardData.length; memberIndex++) {
                const currentDay = Math.floor(i / 2) + 1
                const currentPart = i % 2 + 1
                const puzzleTimestamps = leaderboardData[memberIndex]['completion_day_level'][currentDay]

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

    // run whenever leaderboardData changes
    useEffect(() => {
        if (leaderboardData.length) {
            // when leaderboardData exists, generate the rankings of each day
            generateDayPlacings()
        }
    }, [leaderboardData])

    return (
        <div className='tableArea'>
            <div className='nameTable'>
                <NameTable lbData={leaderboardData}/>
            </div>
            <div className='puzzleTable'>
                <PuzzleTable
                    columns={puzzleColumns}
                    data={leaderboardData}
                    rankings={leaderboardPlacings}
                />
            </div>
        </div>
    )
}

export default CompleteTable;
