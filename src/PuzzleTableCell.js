import React, {useState} from 'react';
import getOrdinal from "./getOrdinal";

function PuzzleTableCell({cell, rank}) {
    const [cellHovered, setCellHovered] = useState(false)

    return (
        <td {...cell.getCellProps()} className={!cell.value ? '' : 'rank' + rank}
            onMouseEnter={() => setCellHovered(true)}
            onMouseLeave={() => setCellHovered(false)}>
            {cellHovered
                ? <p className='puzzleRank'>{rank + getOrdinal(rank)}</p>
                : cell.render('Cell')}
        </td>
    )
}

export default PuzzleTableCell;
