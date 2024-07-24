
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createRoot } from 'react-dom/client'
import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useLoader } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Suspense } from "react";
import { OrbitControls } from "@react-three/drei";
import {Environment} from './env.jsx'
/*
const Model = ()=>{
    const gltf = useLoader((GLTFLoader, '../scene.gltf'));
    return (
        <>
            <primitive object={gltf.scene} scale={0.4} />
        </>
    );
} */
function Model(props) {
    const { nodes, materials } = useGLTF('./scene.gltf')
    return (
        <group {...props} dispose={null}>
            <mesh geometry={nodes.Object_2.geometry} material={materials['767c8b7b_1260_4325_b83f_f635800d9059_Standard00E280']} rotation={[-Math.PI / 2, 0, 0]} />
        </group>
    )
}
function Sphere(props){
    const ref = useRef()
    // Hold state for hovered and clicked events
    const [hovered, hover] = useState(false)
    const [clicked, click] = useState(false)
    // Subscribe this component to the render-loop, rotate the mesh every frame
    useFrame((state, delta) => (ref.current.rotation.x += delta))
    // Return the view, these are regular Threejs elements expressed in JSX
    return(
        <mesh
            {...props}
            ref={ref}
            scale={clicked ? 1.5 : 1}
            onClick={(event) => click(!clicked)}>
            <sphereGeometry args={[1, 16, 16]} />
            <meshStandardMaterial color="hotpink" transparent />
        </mesh>
    )
}

function Box(props) {
    // This reference gives us direct access to the THREE.Mesh object
    const ref = useRef()
    // Hold state for hovered and clicked events
    const [hovered, hover] = useState(false)
    const [clicked, click] = useState(false)
    // Subscribe this component to the render-loop, rotate the mesh every frame
    useFrame((state, delta) => (ref.current.rotation.x += delta))
    // Return the view, these are regular Threejs elements expressed in JSX
    return (
        <mesh
            {...props}
            ref={ref}
            scale={clicked ? 1.5 : 1}
            onClick={(event) => click(!clicked)}
            onPointerOver={(event) => hover(true)}
            onPointerOut={(event) => hover(false)}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
        </mesh>
    )
}

createRoot(document.getElementById('root')).render(
    <Canvas>
        <Suspense fallback={null}>
            <Model/>
            <OrbitControls />
            <Environment/>
        </Suspense>
    </Canvas>,
)