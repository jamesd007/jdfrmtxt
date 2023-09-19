import React from 'react'
import { RiArrowGoBackFill } from 'react-icons/ri'

const Journals = (props) => {

    const handleClose = () => {
        props.close()
    }
    return (
        <div>Journals
            <button
                className='main_buttons'
                onClick={handleClose}>
                <RiArrowGoBackFill
                    size={24} />
                Close
            </button>
        </div>
    )
}

export default Journals
