import React, {Component} from 'react'
import propTypes from 'prop-types'

class Note extends Component {
    constructor(props){
        super(props)
            this.noteContent = props.noteContent
            this.noteID = props.noteID
            this.removeNote = this.removeNote.bind(this) 
    }

    removeNote(id){
        this.props.removeNote(id)
    }

    render(){
        return(
            <div className='notes'>
                <span onClick={() => this.removeNote(this.noteID)}>&times;</span>
                <p>{this.noteContent}</p>
            </div>
        )
    }
}

Note.propTypes = {
    noteContent: propTypes.string
}

export default Note