import React, { useEffect, useState ,useRef} from 'react'
import Modals from "../utils/Modals"
import Papa from "papaparse";
import CheckboxTable from '../utils/CheckboxTable';


const CSVImport = (props) => {
    // This state will store the parsed data
    const [data, setData] = useState([]);
    const allowedExtensions = ["csv"];
    const [errors, setErrors] = useState([]);
    const [accountsArray,setAccountsArray]=useState([])
    const fileInputRef=useRef(null)

    // It state will contain the error when
    // correct file extension is not used
    const [error, setError] = useState("");
    const [checkedAccs, setCheckedAccs] = useState([])

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
            console.log("tedtestQ inputfile=",inputFile)
        }
    };

    const handleCustomButtonClick = () => {
        // Trigger the file input when the custom button is clicked
        fileInputRef.current.click();
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
        console.log("tedtestt handleParse")
        if (!file) return setError("Enter a valid file");
        
        const reader = new FileReader();
        
        return new Promise((resolve, reject) => {
            reader.onload = ({ target }) => {
                let csvText = target.result;
                if (csvText.charCodeAt(0) === 65279) {
                    csvText = csvText.slice(1);
                }
                const csv = Papa.parse(csvText, { header: true });
                const parsedData = csv.data.filter(row => Object.values(row).some(value => value !== ''));
                setData(parsedData);
                resolve(parsedData);
                console.log("tedtestt parseddata=",parsedData)
            };
            
            reader.readAsText(file);
        });
    };
    // const handleParse = () => {
    //     console.log("tedtests handleParse")
    //     // If user clicks the parse button without a file, show an error
    //     if (!file) return setError("Enter a valid file");
    //     // Initialize a reader which allows the user to read any file or blob.
    //     const reader = new FileReader();
    //     // Event listener on the reader when the file loads, parse it and set the data.
    //     reader.onload = async ({ target }) => {
    //         console.log("tedtests target.result=",target.result)
    //         let csvText = target.result;
    //         if (csvText.charCodeAt(0) === 65279) {
    //             // Remove BOM character
    //             csvText = csvText.slice(1);
    //         }
    //         const csv = Papa.parse(csvText, { header: true });
    //         const parsedData = csv.data.filter(row => Object.values(row).some(value => value !== ''));
    //         setData(parsedData);
    //     };
    //     // reader.onload = async ({ target }) => {
    //     //     const csv = Papa.parse(target.result, { header: true });
    //     //     console.log("tedtestM csv=", csv)
    //     //     const parsedData = csv?.data;
    //     //     console.log("tedtestM parsedData=", parsedData)
    //     //     setData(parsedData); // Set the entire parsed data as the state
    //     // };
    //     reader.readAsText(file);
    // };
    const fixTheMissingData=(accsArr)=>{
        //data needs a number, and a name, and a class(?)//name and class is already checked
        //I don't think a class is necessary
        console.log("tedtestR FIXTHEMISSINGDATA accsArr=",accsArr)
            let currentNumber = 101;
            const updatedData = accsArr.map((item) => {
                console.log("tedtestr item= ",item)
              if (!item.number || item.number === null || item.number === undefined || item.number==="") {
                console.log("tedtestr number is not found")
                item.number = currentNumber;
                currentNumber++;
              }
              return item;
            });
        console.log("tedtestr updatedData=",updatedData)
            return (updatedData);
    }

  // Function to check for errors
  const checkDataForErrors = (theData) => {
    console.log("tedtestt checkDataForErorrs")
    const ERRNAME="Name missing"
    const ERRCLASS="Class missing"
    const ERRSTDAMT="stdAmt not numeric"
    let accsArr=[]
    let errorMessages = [];
    let rowNo=0
    for (const row of theData) {
        console.log("tedtestt row==",row)
        let errPres=false
      if (!row.name) {
        errorMessages=[...errorMessages,{row:rowNo,error:`${ERRNAME}`}]
        errPres=true
      }
    //   if (!row.class) {
    //     errorMessages=[...errorMessages,{row:rowNo,error:`${ERRCLASS}`}]
    //     errPres=true
    //   }
      if (row.stdAmt && !row.stdAmt.replace('.', '', 1).match(/^\d+$/)) {
        errorMessages=[...errorMessages,{row:rowNo,error:`${ERRSTDAMT}`}]
        errPres=true
      }
      if (!errPres){
        accsArr=[...accsArr,row]
        console.log("tedtestt in handle accsArr=",accsArr)
      }
      else console.log("tedtesttERROR in handle accsArr=",row)
      rowNo++
    }
    accsArr=fixTheMissingData(accsArr)
    console.log("tedtestRR accsarr=",accsArr)
    setAccountsArray(accsArr)//tedtest may not be needed
    props.importedAccs(accsArr)
    return errorMessages;
  };

  // Handle checking for errors
  const handleCheckForErrors = () => {
    const errorMessages = checkDataForErrors();
    setErrors(errorMessages);
  };
  
  useEffect(()=>{
    console.log("tedtesttt data=",data)
console.log("tedtesttt errors=",errors)
console.log("tedtesttt accountsArray=",accountsArray)
  },[errors,accountsArray])


    // useEffect(() => {
    //     console.log("tedtestM data=", data)
    // }, [data])

    const handleImport = async () => {
        console.log("tedtestt handleImport");
        try{
        handleParse()
        .then(parsedData => {
            const errorMessages = checkDataForErrors(parsedData);
            setErrors(errorMessages);
        })
        .catch(error => {
            console.error("Error parsing the file: " + error);
        });
    } catch (error){
        console.error("An error occurred during import: " + error);

    }
        
        // try {
        //     const parsedData = await handleParse();
        //     const errorMessages = checkDataForErrors(parsedData);
        //     setErrors(errorMessages);
        //     console.log("tedtestt errors is",errorMessages)
        // } catch (error) {
        //     console.error("Error parsing the file: " + error.message);
        // }
    };
    // const handleImport=()=>{
    //     console.log("tedtests handleImport")
    //     handleParse()
    //     const errorMessages = checkDataForErrors();
    //     setErrors(errorMessages);
    // }

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
                        {/* <div>
                            <button
                             onClick={handleParse}>Parse
                             </button>
                        </div>
                        <div>
                            <button 
                            onClick={handleCheckForErrors}>
                                checkData
                            </button>
                        </div> */}
                            <button 
                            className='button_login'
                            onClick={handleImport}>
                                IMPORT
                            </button>
                        <button
                            className={"button_login"}
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
                    ref={fileInputRef}
                        onChange={handleFileChange}
                        id="csvInput"
                        name="file"
                        type="File"
                        style={{ display: "none" }} // Hide the file input
                    />
                    <button 
                    className="button_login"
style={{marginBottom:"0.5rem"}}
                    onClick={handleCustomButtonClick}>
                        Choose File
                    </button>
                    {file &&
                    <div>
                        <span>
                            FILE:&nbsp;&nbsp;&nbsp;
                        </span>
                    <span 
                    style={{ marginTop: "0.5rem",
                    marginBottom:"0.5rem",
                    fontSize:"1.2rem",
                    fontWeight:"bold" }}>
                        {file.name}
                    
                        {/* {error ? error : data.map((col,
                            idx) => <span key={idx}>{col}</div>)} */}
                    </span>
                    </div>
                    }
                </div>
            </Modals>
            {/* {accountsArray?.length>0
        ?<CheckboxTable
                checkAccs={(chkdArr) => setCheckedAccs(chkdArr)}
                checkboxData={accountsArray}/>
                : <p>No records found</p>
        } */}

        </div>
    )
}

export default CSVImport