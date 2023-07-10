import {Component} from 'react'
import './home.css'

class ListUserComponent extends Component {
    constructor(props) {
        super(props)

    }


    render() {
        return (<>
            <div>
                <img className="shadow p-3 rounded-4 bg-style" src="src/assets/P-I-E-E.png" alt=""/>
            </div>
        </>)
    }
}

export default ListUserComponent