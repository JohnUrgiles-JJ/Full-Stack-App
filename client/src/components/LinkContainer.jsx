import Table from "./Table"
import Form from "./Form"
import {useState, useEffect} from 'react'

function LinkContainer() {

    const fetchLinks = async () => {

        try {
            let response = await fetch ('/links')
            console.log(response)
            let data = await response.json()
            setFavLinks(data)
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    const postLink = async() => {
        let testLink = {
            name: "test",
            URL: "test.com"
        }

        try {
            let response = await fetch('/new', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(testLink)
            })
            console.log(response)
            let message = await response.text()
            console.log(message)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect( () => {
        fetchLinks()
    }, [])

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