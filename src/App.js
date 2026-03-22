import React from 'react';

function App() {
    return (
        <div className="App" style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>HeadStart CV v2 (Standard React)</h1>
            <p>This is a standard React app built without Vite for testing your Netlify deployment.</p>
            <hr />
            <p>Status: NEW BUILD</p>
            <p>Date: {new Date().toLocaleDateString()}</p>
        </div>
    );
}

export default App;
