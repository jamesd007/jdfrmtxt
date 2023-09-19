import React from 'react'
import { RiArrowGoBackFill } from 'react-icons/ri'

const FileTransfer = (props) => {

    const handleClose = () => {
        props.close()
    }

    return (
        <div
            className='work_container'
            style={{
                // height: "100%",
                // width: "100%",
                backgroundColor: "lightsteelblue"
            }}>
            <p>FileTransfer</p>
            <button
                className='side_buttons'
                onClick={handleClose}>
                <div
                    className='side_buttons_content'>
                    <RiArrowGoBackFill
                        className='side_buttons_content_icon'
                        size={24} />
                </div>
                <p className='side_buttons_content_text'>
                    Close</p>
            </button>
        </div>
    )
}

export default FileTransfer