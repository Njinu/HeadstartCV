import React from 'react'

export default function App() {
    return (
        <div>
            <h1>HeadStart CV v2 (Vite + React)</h1>
            <p>This is a minimal project (zero styling) to test your Netlify build process.</p>
            <ul>
                <li>Environment: {import.meta.env.MODE}</li>
                <li>Date: {new Date().toLocaleDateString()}</li>
            </ul>
        </div>
    )
}
