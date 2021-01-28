import React, {useState, useEffect} from 'react'
import './App.css';

import CompleteTable from "./CompleteTable";

function App() {
    const [fileUploaded, setFileUploaded] = useState({})
    const [fileData, setFileData] = useState({})
    // runs whenever the fileUploaded is changed (i.e. whenever user uploads a file)
    useEffect(() => {
        if (fileUploaded.name) {
            const reader = new FileReader()
            reader.readAsText(fileUploaded)
            reader.onload = () => {
                // parses the file as json
                setFileData(JSON.parse(reader.result))
            }
        }
    }, [fileUploaded])

    return (
        <div>
            <header>
                <h1>Advent of Code Leaderboard</h1>
                <hr/>
                <p>Names in the leaderboard are censored such that no personally identifiable information is released.</p>
                <label>
                    {fileUploaded.name || 'Upload private leaderboard JSON'}
                    <input
                        type="file"
                        accept=".json"
                        onChange={e => {
                            setFileUploaded(e.target.files[0])
                        }} />
                </label>
                {!Object.keys(fileData).length // check if the file is not empty
                    ? null : <CompleteTable leaderboardData={Object.values(fileData.members)}/>}
            </header>
        </div>
    );
}

export default App;
