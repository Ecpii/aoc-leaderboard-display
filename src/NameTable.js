import React, {useState, useEffect} from "react";
import getOrdinal from "./getOrdinal";
import getRankings from "./getRankings";


function NameTable({lbData}) {
    const [overallRankings, setOverallRankings] = useState([])

    // runs on first load
    useEffect(() => {
        // get the local score of each person and store them in an array
        const totalScores = lbData.map(person => person.local_score)
        // get the rankings of those scores and store them in a state variable called overallRankings
        setOverallRankings(getRankings(totalScores, true))
    }, [])

    if (lbData.length && overallRankings.length) {
        return (
            <table>
                <thead>
                <tr>
                    <th>
                        Name
                    </th>
                </tr>
                <tr>
                    <th style={{fontWeight: 'normal'}}>
                        Score
                    </th>
                </tr>
                </thead>
                <tbody>
                {lbData.map((accountInfo, accountIndex) => {
                    const overallRank = overallRankings[accountIndex] + 1;
                    return (
                        <tr key={accountInfo.id}>
                            <td>
                                <p>
                                    <span style={{color: '#fff'}}>
                                        (censored)
                                    </span>
                                    <br/>
                                    <span className='rankNum'>
                                        {/*renders the rank of the user within the group, as well
                                        as the ordinal after it (e.g. 'st', 'nd', 'th')*/}
                                        {overallRank + getOrdinal(overallRank)}
                                    </span> - {accountInfo['local_score']}
                                </p>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        )
    } else {
        return null  // return nothing if the data is not properly loaded yet
    }
}

export default NameTable;
