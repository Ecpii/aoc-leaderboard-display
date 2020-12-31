import React, { useState } from 'react';
import getOrdinal from "./getOrdinal";

export default function PuzzleTableCell({cell, rank}) {
    const [cellHovered, setCellHovered] = useState(false)

    return (
        <td {...cell.getCellProps()} className={cell.value === undefined ? '' : 'rank' + rank}
            onMouseEnter={() => setCellHovered(true)}
            onMouseLeave={() => setCellHovered(false)}>
            {cellHovered ?
                <p className='puzzleRank'>
                    {rank + getOrdinal(rank)}
                </p>
            : cell.render('Cell')}
        </td>
    )

}