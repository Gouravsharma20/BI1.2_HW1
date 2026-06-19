import {useState } from "react"

const AddBookForm = () => {

    const [isAdded,setisAdded] = useState(false)

    const [listOfMovie,setListOfMovie] = useState([])

    const [formData,setFormData] = useState({
        title:"",
        author:"",
        publishedYear:"",
        genre:"",
        language:"",
        country:"",
        rating:"",
        summary:"",
        coverImageUrl:""
    })

    const handleChange = (e) => {
        const {name,value} = e.target
        setFormData((prevState) => ({
            ...prevState,
            [name] : name === "publishedYear" || name === "rating" ? parseInt(value) :value
        }));
    }   
    const handleSubmit = async(e) => {
        e.preventDefault()

        console.log(formData)

        try {
            const response = await fetch("https://be-4-assignment1-navy.vercel.app/books",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(formData)})

            if (!response.ok) {
                console.log("Status:", response.status)
                const errorBody = await response.text()
                console.log("Error body:", errorBody)
                throw new Error("Failed to add Books")
            } 

            const data = await response.json()

            console.log("Added movie",data)

            setisAdded(true)

            setListOfMovie((prev)=>[...prev,data.newBookData.title])

        } catch(err) {
            console.log(err)

        }

    }
    
    return (
        <div>
        <h2>Add New Movie</h2>
        <form onSubmit={handleSubmit}>
            <label>Title</label>
            <input type="text" name="title" value={formData.title} onChange = {handleChange}/>
            <br/>
            <br/>



            <label>Author</label>
            <input type="text" name="author" value={formData.author} onChange={handleChange}/>
            <br/>
            <br/>


            <label>Publish Year</label>
            <input type="number" name="publishedYear" value={formData.publishedYear} onChange={handleChange}/>
            <br/>
            <br/>


            <label>Genre</label>
            <input type="text" name="genre" value={formData.genre} onChange={handleChange}/>
            <br/>
            <br/>




            <label>Language</label>
            <input type="text" name="language" value={formData.language} onChange={handleChange}/>
            <br/>
            <br/>


            <label>Country</label>
            <input type="text" name="country" value={formData.country} onChange={handleChange}/>
            <br/>
            <br/>


            <label>Rating</label>
            <input type="number" name="rating" value={formData.rating} onChange={handleChange}/>
            <br/>
            <br/>



            <label>Summary</label>
            <input type="text" name="summary" value={formData.summary} onChange={handleChange}/>
            <br/>
            <br/>




            <label>cover Image Url</label>
            <input type="text" name="coverImageUrl" value={formData.coverImageUrl} onChange={handleChange}/>
            <br/>
            <br/>



            <button>Submit</button>

            
        </form>

        {listOfMovie.length > 0 && <h1>List of added movies</h1>}
        {listOfMovie &&  listOfMovie.map((movie)=>{
            return (
                <ul key={movie}>
                <li>
                {movie}
                </li>
                </ul>
            )
        })}



        {isAdded && <><h1>New Movie Added successfully</h1>
        <ul key={isAdded._id}>
            <li>Title : {formData.title}</li>
            <li>Author : {formData.author}</li>
            <li>Publish Year : {formData.publishedYear}</li>
            <li>Gnere : {formData.genre}</li>
            <li>Language : {formData.language}</li>
            <li>Country : {formData.country}</li>
            <li>Rating : {formData.rating}</li>
            <li>Summary : {formData.summary}</li>
        </ul>
            </>}


        

        


        </div>

        

    )


}

export default AddBookForm