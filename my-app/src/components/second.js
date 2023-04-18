import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import "../style.css";
import { OrbitControls } from "@react-three/drei";

function Cube(props) {
  const meshRef = useRef();

  useFrame(({ mouse }) => {
    meshRef.current.rotation.x += 0.01;
    meshRef.current.rotation.y += 0.01;

    if (mouse.x < 0) {
      meshRef.current.position.x -= 0.1;
    } else if (mouse.x > 0) {
      meshRef.current.position.x += 0.1;
    }

    if (mouse.y < 0) {
      meshRef.current.position.y += 0.1;
    } else if (mouse.y > 0) {
      meshRef.current.position.y -= 0.1;
    }
  });

  return (
    <mesh {...props} ref={meshRef}>
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="hotpink" />
    </mesh>
  );
}

function Camera({ cubeRef }) {
  const cameraRef = useRef();

  useFrame(() => {
    if (cubeRef.current) {
      cameraRef.current.position.copy(cubeRef.current.position);
      cameraRef.current.position.y += 5;
      cameraRef.current.lookAt(cubeRef.current.position);
    }
  });

  return <perspectiveCamera ref={cameraRef} />;
}

function Scene() {
  const cubeRef = useRef();

  return (
    <Canvas>
      <Camera cubeRef={cubeRef} />
      <Cube position={[0, 0, 0]} ref={cubeRef} />
    </Canvas>
  );
}

export default Scene;
