import React, { useEffect, useState } from 'react'
import Modals from "../utils/Modals"
import Papa from "papaparse";

const CSVImport = (props) => {
    // This state will store the parsed data
    const [data, setData] = useState([]);
    const allowedExtensions = ["csv"];


    // It state will contain the error when
    // correct file extension is not used
    const [error, setError] = useState("");

    // It will store the file uploaded by the user
    const [file, setFile] = useState("");
    const [csvFile, setCsvFile] = useState();

    const handleFileChange = (e) => {
        console.log("tedtestP e=", e)
        setError("");

        // Check if user has entered the file
        if (e.target.files.length) {
            const inputFile = e.target.files[0];
            console.log("tedtestPinputFilee=", inputFile)
            // Check the file extensions, if it not
            // included in the allowed extensions
            // we show the error
            const fileExtension = inputFile?.type.split("/")[1];
            if (!allowedExtensions.includes(fileExtension)) {
                setError("Please input a csv file");
                return;
            }

            // If input type is correct set the state
            setFile(inputFile);
        }
    };

    // const handleParse = () => {

    //     // If user clicks the parse button without
    //     // a file we show a error
    //     if (!file) return setError("Enter a valid file");

    //     // Initialize a reader which allows user
    //     // to read any file or blob.
    //     const reader = new FileReader();

    //     // Event listener on reader when the file
    //     // loads, we parse it and set the data.
    //     reader.onload = async ({ target }) => {
    //         const csv = Papa.parse(target.result, { header: true });
    //         const parsedData = csv?.data;
    //         const columns = Object.keys(parsedData[0]);
    //         setData(columns);
    //     };
    //     reader.readAsText(file);
    // };
    const handleParse = () => {
        console.log("tedtestM handleParse")
        // If user clicks the parse button without a file, show an error
        if (!file) return setError("Enter a valid file");
        // Initialize a reader which allows the user to read any file or blob.
        const reader = new FileReader();
        // Event listener on the reader when the file loads, parse it and set the data.
        reader.onload = async ({ target }) => {
            const csv = Papa.parse(target.result, { header: true });
            console.log("tedtestM csv=", csv)
            const parsedData = csv?.data;
            console.log("tedtestM parsedData=", parsedData)
            setData(parsedData); // Set the entire parsed data as the state
        };
        reader.readAsText(file);
    };

    useEffect(() => {
        console.log("tedtestM data=", data)
    }, [data])

    const handleCloseModal = () => {
        props.close()
    }

    return (
        <div>
            <Modals
                title="Standard Accounts"
                onClose={() => handleCloseModal()}
                footer={
                    <div>
                        {/* <button
                            className={"UI-button-service"}
                            type="button"
                            onClick={handleProceed}
                        >
                            Proceed
                        </button> */}
                        <div>
                            <button onClick={handleParse}>Parse</button>
                        </div>

                        <button
                            className={"UI-button-service"}
                            type="button"
                            onClick={() => { handleCloseModal() }}
                        >
                            Cancel
                        </button>
                    </div>
                }>
                <div>
                    <label htmlFor="csvInput" style={{ display: "block" }}>
                        Enter CSV File
                    </label>
                    <input
                        onChange={handleFileChange}
                        id="csvInput"
                        name="file"
                        type="File"
                    />
                    <div style={{ marginTop: "3rem" }}>
                        {/* {error ? error : data.map((col,
                            idx) => <div key={idx}>{col}</div>)} */}
                    </div>
                </div>
            </Modals>


        </div>
    )
}

export default CSVImport