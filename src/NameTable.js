import React, {useState, useEffect} from "react";
import getOrdinal from "./getOrdinal";
import getRankings from "./getRankings";


function NameTable({lbData}) {
    const [overallRankings, setOverallRankings] = useState([])
    // modified version of getRankings to work with the raw json
    const getOverallRankings = () => {
        let rankings = []
        for (let i = 0; i < lbData.length; i++) {
            let currentRanking = 1
            for (let k = 0; k < lbData.length; k++) {
                if (lbData[k]['local_score'] > lbData[i]['local_score']) {
                    currentRanking++
                }
            }
            rankings.push(currentRanking)
        }
        setOverallRankings(rankings)
    }

    // runs on first load
    useEffect(() => {
        getOverallRankings()
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
                {lbData.map(
                    (accountInfo, accountIndex) => (
                        <tr key={accountInfo.id}>
                            <td>
                                <p>
                                    <span style={{color: '#fff'}}>
                                        (censored)
                                    </span>
                                    <br/>
                                    <span className='rankNum'>
                                        {overallRankings[accountIndex] + getOrdinal(overallRankings[accountIndex])}
                                    </span> - {accountInfo['local_score']}
                                </p>
                            </td>
                        </tr>
                    )
                )}
                </tbody>
            </table>
        )
    } else {
        return null  // return nothing if the data is not properly loaded yet
    }
}

export default NameTable;
