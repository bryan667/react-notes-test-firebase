import React, {Component} from 'react'
import Note from './Note/note'
import NoteForm from './Note/noteform'
import {DB_AWYIS} from './config/config'
import firebase from 'firebase/app'
import 'firebase/database'

class App extends Component {
    constructor(props){
        super(props)
        
        //check if firebase is already started
        if (!firebase.apps.length) {
            this.app = firebase.initializeApp(DB_AWYIS)
            this.db = this.app.database().ref().child('notes')
        }

        this.state = {
            notes: [],
        }

        this.addNote = this.addNote.bind(this)
        this.removeNote = this.removeNote.bind(this)
    }

    componentDidMount(){
        const oldNotes = this.state.notes
        
        // DataSnapshot on child_added
        this.db.on('child_added', snap => {
            console.log(snap.val())
                oldNotes.push({
                    id: snap.key,
                    noteContent: snap.val().noteContent
                })

                this.setState({
                    notes: oldNotes
                })
        })

        // DataSnapshot on child_removed
        this.db.on('child_removed', snap => {
            for (var i= 0 ; i < oldNotes.length; i++){
                if (oldNotes[i].id === snap.key) {
                    oldNotes.splice(i,1)  //splice/remove oldNotes
                }
            }
            this.setState({
                notes: oldNotes
            })
        })
    }

    addNote(note){
        this.db.push().set({ noteContent: note})
    }

    removeNote(noteId){
        this.db.child(noteId).remove()
    }



    render() {
        return (
            <div>
                <h2>React Notes</h2>
                <div>
                    {/*Array map here*/}
                    {this.state.notes.map((note) => {
                        return (
                            <Note noteContent={note.noteContent} noteID={note.id} removeNote={this.removeNote} key={note.id}/>
                        )
                    })
                    }
                </div>
                <div>
                    <NoteForm addNote={this.addNote}/>
                </div>
            </div>
        )
    }
}

 

export default App
