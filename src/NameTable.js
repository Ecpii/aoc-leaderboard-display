import React, {useState, useEffect} from "react";


export default function NameTable({lbData}) {
    const [overallRankings, setOverallRankings] = useState([])
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
    const getOrdinal = num => {
        switch (num % 10) {
            case 1:
                if (num < 10 || Math.floor(num / 10) !== 1) {
                    return 'st'
                } else {
                    return 'th'
                }
            case 2:
                if (num < 10 || Math.floor(num / 10) !== 1) {
                    return 'nd'
                } else {
                    return 'th'
                }
            case 3:
                if (num < 10 || Math.floor(num / 10) !== 1) {
                    return 'rd'
                } else {
                    return 'th'
                }
            default:
                return 'th'

        }
    }

    useEffect(() => {
            getOverallRankings()
        }
        , [lbData])

    if (lbData.length && overallRankings.length) {
        return (
            <table>
                <thead>
                <tr>
                    <th className='bigHead'>
                        Name
                    </th>
                </tr>
                <tr>
                    <th className='bigHead' style={{fontWeight: 'normal'}}>
                        Score
                    </th>
                </tr>
                </thead>
                <tbody>
                {lbData.map(
                    (accountInfo, accountIndex) =>
                        <tr key={accountInfo.id}>
                            <td>
                                <p>
                                    <span style={{color: '#fff'}}>
                                    {accountInfo.name == null
                                        ? '(#' + accountInfo.id + ')'
                                        : accountInfo.name}
                                    </span>
                                    <br/>
                                    <span className='rankNum'>
                                        {overallRankings[accountIndex] + getOrdinal(overallRankings[accountIndex])}
                                    </span> - {accountInfo['local_score']}
                                </p>
                            </td>
                        </tr>
                )}
                </tbody>
            </table>
        )
    } else {
        return null
    }
}