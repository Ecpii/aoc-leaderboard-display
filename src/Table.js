import React from 'react';
import {useTable} from 'react-table';

import PuzzleTableCell from "./PuzzleTableCell";

export default function Table({columns, data, rankings}) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = useTable({
        columns, data
    })

    if (rankings.length) {
        return (
            <table {...getTableProps()}>
                <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()}>
                                {column.render('Header')}
                            </th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                {rows.map((row, memberIndex) => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map((cell, puzzleNum) => {
                                return <PuzzleTableCell cell={cell}
                                                        rank={1 + rankings[puzzleNum][memberIndex]}/>
                            })}
                        </tr>
                    );
                })}
                </tbody>
            </table>
        )
    } else {
        return null
    }
}