import React, {useState, useEffect} from 'react'
import './App.css';

import CompleteTable from "./CompleteTable";

function App() {
    const [fileUploaded, setFileUploaded] = useState({})
    const [fileData, setFileData] = useState({})
    useEffect(() => {
        console.log(fileUploaded)
        if (fileUploaded.name) {
            let reader = new FileReader()
            reader.readAsText(fileUploaded)
            reader.onload = () => {
                setFileData(JSON.parse(reader.result))
            }
        }
    }, [fileUploaded])

    return (
        <div>
            <header>
                <h1>Advent of Code Leaderboard</h1>
                <hr/>
                <label>
                    {fileUploaded.name ? fileUploaded.name : 'Upload private leaderboard JSON'}
                    <input
                        type="file"
                        accept=".json"
                        onChange={e => {
                            setFileUploaded(e.target.files[0])
                        }} />
                </label>
                {!Object.keys(fileData).length
                    ? null : <CompleteTable leaderboardData={Object.values(fileData.members)}/>}
            </header>
        </div>
    );
}

export default App;
