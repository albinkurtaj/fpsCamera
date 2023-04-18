import { Canvas } from "@react-three/fiber";
import "../style.css";
import { OrbitControls } from "@react-three/drei";
import { useState } from "react";

export default function First() {
  const [pos, setPos] = useState([5, 0, 0]);
  return (
    <Canvas
      className="canvas"
      onClick={() => {
        setPos([5, 0, 2]);
      }}
    >
      <ambientLight intensity={0.1} />
      <directionalLight color="white" position={[0, 0, 6]} />
      <mesh>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="blue" />
      </mesh>
      <mesh
        position={pos}
        onClick={() => {
          setPos([5, 0, 2]);
        }}
      >
        <sphereGeometry args={[1, 32]} />
        <meshStandardMaterial color="blue" />
      </mesh>
    </Canvas>
  );
}
