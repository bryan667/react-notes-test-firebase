import React, {Component} from 'react'

class NoteForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentInput:''            
        }
        this.updateInput = this.updateInput.bind(this)
        this.writeNote = this.writeNote.bind(this)
    }

    updateInput(e){
        this.setState({
            currentInput: e.target.value
        })

    }

    writeNote(){
        this.props.addNote(this.state.currentInput)
        this.setState({
            currentInput: ''
        })
    }

    render() {
        return (
            <div>
                <input 
                    placeholder='Write notes here..'
                    value={this.state.currentInput}
                    onChange={this.updateInput}
                ></input>
                <button onClick={this.writeNote}>Add Note</button>
            </div>
        )
    }

}

export default NoteForm