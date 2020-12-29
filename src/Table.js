import React from 'react';
import { useTable } from 'react-table';

export default function Table({ columns, data, rankings }) {
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
                            <th {...column.getHeaderProps()} className='bigHead'>
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
                            {row.cells.map((cell, i) => {
                                return <td {...cell.getCellProps()}
                                           className={'rank' + (1 + rankings[i][memberIndex])}>
                                    {cell.render('Cell')}
                                </td>
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