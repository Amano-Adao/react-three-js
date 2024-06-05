import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createRoot } from 'react-dom/client'
import { Canvas } from '@react-three/fiber'

function App() {
    return (
        <div id="canvas-container">
            <Canvas />
        </div>
    )
}

createRoot(document.getElementById('root')).render(<App />)

export default App
