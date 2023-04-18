import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { CameraControls, OrbitControls, Stars } from "@react-three/drei";
import { Physics, usePlane, useBox } from "@react-three/cannon";
import { useState, useEffect } from "react";
import { useRef } from "react";
import { PerspectiveCamera } from "@react-three/drei";
import { FirstPersonControls } from "three/addons/controls/FirstPersonControls.js";
import "..//style.css";

import { withCookies, useCookies, Cookies } from "react-cookie";

// const CameraController = () => {
//   const { camera, gl } = useThree();
//   useEffect(
//      () => {
//         const controls = new OrbitControls(camera, gl.domElement);
//         controls.minDistance = 3;
//         controls.maxDistance = 20;
//         return () => {
//           controls.dispose();
//         };
//      },
//      [camera, gl]
//   );
//   return null;
// };

function Box(props) {
  const [location, setLocation] = useCookies("location");
  const [x, setX] = useState([0, 0.5, 0]);
  let xx = [];
  for (let i = 0; i < 3; i++) {
    xx.push(x[i] + 5);
  }
  const [xxx, setXxx] = useState(xx);

  function change() {
    setXxx([5, 5, 5]);
  }

  const meshRef = useRef();

  const [ref, api] = useBox(() => ({ mass: 100, position: x }));
  return (
    <mesh
      // onClick={() => {
      //   api.velocity.set(0, 5, 0);
      //   setX([10, 10, 10]);
      // }}
      ref={ref}
      position={x}
      onPointerMove={(e) => {
        let h = [0, 0, 0];
        let h1, h2, h3;
        h1 = x[0] + 0;
        h2 = x[1] + 0;
        h3 = x[2] - 0.1;
        setX([h1, h2, h3]);
        //  meshRef.current.position.set(x[0], x[1], x[2]);
        api.position.set(x[0], x[1], x[2]);
      }}
      // ref={meshRef}
      // position={[0, 2, 0]}
    >
      {/* <boxBufferGeometry attach="geometry" /> */}
      <boxGeometry attach="geometry" args={[1, 1, 1]} />
      <meshLambertMaterial attach="material" color="hotpink" />
    </mesh>
  );
}

function Plane(props) {
  const [ref] = usePlane(() => ({
    mass: 0,
    rotation: [-Math.PI / 2, 0, 0],
  }));
  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]}>
      <planeBufferGeometry attach="geometry" args={[100, 100]} />
      <meshLambertMaterial attach="material" color="lightblue" />
    </mesh>
  );
}

function Scene1() {
  const [location, setLocation] = useCookies("location");
  const camera = useRef(null);
  const canvas = useRef(null);

  const [movingVector, setMovingVector] = useState([1, 1]);

  const [angle, setAngle] = useState([0, 0, 0]);
  const [pos, setPos] = useState([0, 5, 10]);
  const [pointerPos, setPointerPos] = useState([0, 0]);

  const cameraRef = useRef(null);
  const boxRef = useRef(null);
  //const [ref, api] = useBox(() => ({ mass: 100, position: pos }));
  const canvasRef = useRef(null);
  const controls = useRef();

  // const CameraController = () => {
  //   const { camera, gl } = useThree();
  //   useEffect(() => {
  //     const controls = new FirstPersonControls(camera, gl.domElement);
  //     // controls.minDistance = 3;
  //     // controls.maxDistance = 20;
  //     // return () => {
  //     //   controls.dispose();
  //     // };
  //   }, [camera, gl]);
  //   return null;
  // };

  function handleKeyDown(e) {
    // alert("Key pressed!");
    //console.log(e);
    // if (e.key == "ArrowUp") {
    //   let h = [0, 0, 0];
    //   let h1, h2, h3;
    //   h1 = pos[0] + 0;
    //   h2 = pos[1] + 0;
    //   h3 = pos[2] - 0.3;
    //   setPos([h1, h2, h3]);
    //   cameraRef.current.position.set(pos[0], pos[1], pos[2]);
    // }
    // if (e.key == "ArrowDown") {
    //   let h = [0, 0, 0];
    //   let h1, h2, h3;
    //   h1 = pos[0] + 0;
    //   h2 = pos[1] + 0;
    //   h3 = pos[2] + 0.3;
    //   setPos([h1, h2, h3]);
    //   cameraRef.current.position.set(pos[0], pos[1], pos[2]);
    // }
    // if (e.key == "ArrowLeft") {
    //   let h = [0, 0, 0];
    //   let h1, h2, h3;
    //   h1 = pos[0] - 0.3;
    //   h2 = pos[1] + 0;
    //   h3 = pos[2] + 0;
    //   setPos([h1, h2, h3]);
    //   cameraRef.current.position.set(pos[0], pos[1], pos[2]);
    // }
    // if (e.key == "ArrowRight") {
    //   let h = [0, 0, 0];
    //   let h1, h2, h3;
    //   h1 = pos[0] + 0.3;
    //   h2 = pos[1] + 0;
    //   h3 = pos[2] + 0;
    //   setPos([h1, h2, h3]);
    //   cameraRef.current.position.set(pos[0], pos[1], pos[2]);
    // }

    if (e.key == "ArrowUp") {
      let h = [0, 0, 0];
      let h1, h2, h3;
      h1 = pos[0] + 0.3 * movingVector[0];
      h2 = pos[1] + 0;
      h3 = pos[2] + 0.3 * movingVector[1];
      setPos([h1, h2, h3]);
      cameraRef.current.position.set(h1, h2, h3);
    }
    if (e.key == "ArrowDown") {
      let h = [0, 0, 0];
      let h1, h2, h3;
      h1 = pos[0] - 0.3 * movingVector[0];
      h2 = pos[1] + 0;
      h3 = pos[2] - 0.3 * movingVector[1];
      setPos([h1, h2, h3]);
      cameraRef.current.position.set(h1, h2, h3);
    }
    // if (e.key == "ArrowLeft") {
    //   let h = [0, 0, 0];
    //   let h1, h2, h3;
    //   h1 =
    //     pos[0] +
    //     0.3 * -1 * Math.sin(Math.atan2(movingVector[1] / movingVector[0]));
    //   h2 = pos[1] + 0;
    //   h3 =
    //     pos[2] + 0.3 * Math.cos(Math.atan2(movingVector[1] / movingVector[0]));
    //   setPos([h1, h2, h3]);
    //   cameraRef.current.position.set(h1, h2, h3);
    // }
    // if (e.key == "ArrowRight") {
    //   let h = [0, 0, 0];
    //   let h1, h2, h3;
    //   h1 =
    //     pos[0] -
    //     0.3 * -1 * Math.sin(Math.atan2(movingVector[1] / movingVector[0]));
    //   h2 = pos[1] + 0;
    //   h3 =
    //     pos[2] - 0.3 * Math.cos(Math.atan2(movingVector[1] / movingVector[0]));
    //   setPos([h1, h2, h3]);
    //   setPos([h1, h2, h3]);
    //   cameraRef.current.position.set(h1, h2, h3);
    // }

    if (e.key == "ArrowLeft") {
      let h = [0, 0, 0];
      let h1, h2, h3;
      h1 = pos[0] - 0.3 * -1 * movingVector[1];
      h2 = pos[1] + 0;
      h3 = pos[2] - 0.3 * movingVector[0];
      setPos([h1, h2, h3]);
      cameraRef.current.position.set(h1, h2, h3);
    }
    if (e.key == "ArrowRight") {
      let h = [0, 0, 0];
      let h1, h2, h3;
      h1 = pos[0] + 0.3 * -1 * movingVector[1];
      h2 = pos[1] + 0;
      h3 = pos[2] + 0.3 * movingVector[0];
      setPos([h1, h2, h3]);
      setPos([h1, h2, h3]);
      cameraRef.current.position.set(h1, h2, h3);
    }

    //up
    if (e.key == "t") {
      const event = new KeyboardEvent("keydown", {
        key: "l",
        code: "KeyL",
        keyCode: 76,
        charCode: 0,
        bubbles: true,
        cancelable: true,
      });

      const event1 = new KeyboardEvent("keydown", {
        key: "g",
        code: "KeyG",
        keyCode: 71,
        charCode: 0,
        bubbles: true,
        cancelable: true,
      });

      let j = 20;
      for (let i = 0; i < j; i++) {
        setTimeout(() => {
          canvasRef.current.dispatchEvent(event);
        }, i * 10); // dispatch events with 50ms delay between them
      }

      for (let i = 0; i < j; i++) {
        setTimeout(() => {
          canvasRef.current.dispatchEvent(event1);
        }, (j + i) * 10); // dispatch events with 50ms delay between them
      }
    }
    if (e.key == "l") {
      console.log("here");
      //  console.log(e);
      let h = [0, 0, 0];
      let h1, h2, h3;
      h1 = pos[0] + 0;
      h2 = pos[1] + 0.2;
      h3 = pos[2] + 0;
      setPos([h1, h2, h3]);
      cameraRef.current.position.set(pos[0], pos[1], pos[2]);
    }
    //down
    if (e.key == "g") {
      let h = [0, 0, 0];
      let h1, h2, h3;
      h1 = pos[0] + 0;
      h2 = pos[1] - 0.2;
      h3 = pos[2] + 0;
      setPos([h1, h2, h3]);
      cameraRef.current.position.set(pos[0], pos[1], pos[2]);
    }
  }
  let sensitivity = 0.006;
  let radius = 1;

  function handleMove(e) {
    let h1 = angle[0];
    let h2 = angle[1];

    let hh1 = sensitivity * (e.clientX - pointerPos[0]);
    let hh2 = sensitivity * (e.clientY - pointerPos[1]);
    h1 -= hh1;
    h2 -= hh2;
    let theta = h1;
    let phi = h2;

    setAngle([h1, h2, 10]);
    setPointerPos([e.clientX, e.clientY]);

    let x = radius * Math.sin(phi) * Math.sin(theta);
    let y = radius * Math.sin(phi) * Math.cos(theta);
    let z = radius * Math.cos(phi);
    // console.log(pos);

    cameraRef.current.lookAt(pos[0] + x, pos[1] + z, pos[2] + y);
    let modulus = Math.sqrt(x * x + y * y);
    setMovingVector([x / modulus, y / modulus]);
    console.log(movingVector);
  }

  return (
    <div className="canvas">
      <Canvas
        ref={canvasRef}
        tabIndex={0} //to focus on it when clicked because onKeyDown didnt work on its own
        // key={`${pos}`}  //to render when key is changed
        camera={{
          position: [pos[0], pos[1], pos[2]],
          fov: 90,
          rotation: [0, 0, 0],
        }}
        onKeyDown={handleKeyDown}
        onPointerMove={handleMove}
      >
        {/* <OrbitControls
          enabled={true}
          enableDamping={true}
          target={[0, 5, 0]}
          enableRotate={true}
          autoRotateSpeed={2}
          enablePan={false}
        /> */}
        <Stars />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 15, 10]} angle={0.3} />

        <Physics
        // iterations={20}
        // tolerance={0.0001}
        // defaultContactMaterial={{
        //   contactEquationRelaxation: 100,
        //   contactEquationStiffness: 1e7,
        //   friction: 0.9,
        //   frictionEquationRelaxation: 2,
        //   frictionEquationStiffness: 1e7,
        //   restitution: 0.4, //bounciness
        // }}
        // allowSleep={false}
        >
          <PerspectiveCamera
            ref={cameraRef}
            // ref={ref}
            fov={90}
            makeDefault
            position={[pos[0], pos[1], pos[2]]}
            rotation={[0, 0, 0]}
          />
          <Plane />
          <Box />

          {/* <Plane1 />
          <Cube1 /> */}
        </Physics>
      </Canvas>
    </div>
  );
}
export default withCookies(Scene1);
