import { useState, useEffect } from "react"
import api from "../api"
import Note from "../components/Note"
import "../styles/Home.css"


function Home(){
    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState([]);
    const [title, setTitle] = useState([]);

    useEffect(() => { //loads getNotes as soon as we visit the page
        getNotes();
    }, []);

    const getNotes = () => {
        api
            .get("/api/notes/")
            .then((res) => res.data)
            .then((data) => {
                setNotes(data);
                console.log(data);
            })
            .catch((err) => alert(err));
    };
    const deleteNote = (id) => {
        api
            .delete(`/api/notes/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) alert("Note deleted successfully!");
                else alert("Failed to delete your note.");
                getNotes();             //to update the screen when we change anything
            })
            .catch((error) => alert(error));
    };

    const createNote = (e) => { //e because it is coming from a form
        e.preventDefault();
        api
            .post("/api/notes/", { content, title })
            .then((res) => {
                if (res.status === 201) alert("Note created!");
                else alert("Failed to make note.");
                getNotes();
            })
            .catch((err) => alert(err));
    };
    return<div>
        <div>
            <h1>NOTES</h1>
            {notes.map((note) => (<Note note={note} onDelete={deleteNote} key={note.id} />))}
        </div>
        <h2>Create a Note</h2>
        <form onSubmit={createNote}>
            <label htmlFor = "title">Title:</label>
            <br />
                <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />
                <br/>
                <label htmlFor="content">Content:</label>
                <br />
                <textarea
                    id="content"
                    name="content"
                    required
                    onChange={(e) => setContent(e.target.value)}
                    value={content}
                ></textarea>
                <br />
                <input type="submit" value="Submit"></input>
            </form>
    </div>
}
export default Home