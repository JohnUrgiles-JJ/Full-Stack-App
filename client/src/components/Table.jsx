function TableHeader() {
    // responisble for rendering the head of our table with the appropriate columns
    return(
        <thead>
            <tr>
                <th>Name</th>
                <th>URL</th>
                <th>Remove</th>
            </tr>
        </thead>
    )
}

const TableBody = (props) => {
    // we use Array.map to create table rows from LinkData passed via props
    const rows = props.linkData.map((row, index) => {
        return (
            <tr key={index}>
                <td>{row.name}</td>
                <td>
                    <a href={row.URL}>{row.URL}</a>
                </td>
                <td>
                    <button onClick={() => props.removeLink(index)}>Delete</button>
                </td>
            </tr>
        ) 
    })
     return <tbody>{rows}</tbody>
}

// function TableBody() {
//     // responisble for rendering our tables data
//     return(
//         <tbody>

//         </tbody>
//     )
// }

function Table(props) {

    // const handleRemove = () => {
    //     console.log("button clicked", index)
    // }

    return(
        <table>
            <TableHeader/>
            <TableBody linkData={props.linkData} removeLink={props.removeLink}/>
        </table>
    )
}

export default Table

// the tableBody using linkdata allows it to see the linkdata prop we have, to which then we can properly
// render the table rows/data. Linkdata sends data like an array, map creates a copy of an array
// with our table data and returns it to us