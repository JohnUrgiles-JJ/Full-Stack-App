import Table from "./Table"
import Form from "./Form"
import {useState} from 'react'
function LinkContainer() {

    const[favLinks, setFavLinks] = useState([])

    const handleRemove = (index) => {
        const updatedLinks = favLinks.filter((_, i) => i !== index)
        // filter filter() function creates a new array without the specified index (our desired url)
        setFavLinks(updatedLinks)
    }

    const handleSubmit = (favLink) => {
        setFavLinks([...favLinks, favLink])
        // let newArray = favLinks.push(favLink)
        // setFavLinks(newArray)
    }

    return (
        <div>
            <h1>My favorite Links</h1>
            <p>Add a new link with a name and URL to the table!</p>
            <Table linkData={favLinks} removeLink={handleRemove}/>
            <h1>Add New</h1>
            <Form onNewLink={handleSubmit}/>
        </div>
    )
}

export default LinkContainer