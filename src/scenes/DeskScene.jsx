import React, { Suspense, useRef, useEffect, useState, useCallback } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, useGLTF, Html, useProgress } from "@react-three/drei";
import * as THREE from "three";

// A custom loader component using drei's helpers
function Loader() {
  const { progress } = useProgress();
  return (
    <Html center position={[0, 6, 0]}>
      <div className="flex flex-col items-center text-white">
        {/* Progress bar container */}
        <div className="w-[150px] h-2 bg-zinc-800 rounded overflow-hidden border border-zinc-700">
          {/* The actual progress bar */}
          <div
            className="h-full bg-zinc-50 transition-width duration-300 ease-in-out"
            style={{ width: `${progress}%` }} 
          />
        </div>
        {/* Text below */}
        <p className="mt-3 text-sm">
          Loading... {Math.round(progress)}%
        </p>
      </div>
    </Html>
  );
}

// GLB Model using useGLTF from drei
function GLBModel({ url, screenWhite = false, ...props }) {
  const { scene } = useGLTF(url);

  useEffect(() => {
    const screenMesh = scene.getObjectByName('Cube006_1');
    if (screenMesh?.material && screenWhite) {
      screenMesh.material.color.set('#fff');
      screenMesh.material.emissive.set('#fff');
      screenMesh.material.emissiveIntensity = 1.0;
      screenMesh.material.needsUpdate = true;
    }
  }, [scene, screenWhite]);

  return <primitive object={scene} {...props} />;
}

// CameraZoomer animates camera and controls between two points
function CameraZoomer({ from, to, active, onZoomEnd, controlsRef }) {
  const { camera } = useThree();
  const zoomRef = useRef(false);

  useEffect(() => {
    if (active) zoomRef.current = true;
  }, [active]);

  useFrame(() => {
    if (zoomRef.current && controlsRef.current) {
      // Lerp camera position
      camera.position.lerp(to.position, 0.08);
      // Lerp controls' target
      controlsRef.current.target.lerp(to.target, 0.08);
      controlsRef.current.update();

      // Check if both are close enough
      const closeEnough =
        camera.position.distanceTo(to.position) < 0.02 &&
        controlsRef.current.target.distanceTo(to.target) < 0.02;

      if (closeEnough) {
        camera.position.copy(to.position);
        controlsRef.current.target.copy(to.target);
        controlsRef.current.update();

        zoomRef.current = false;
        if (onZoomEnd) onZoomEnd();
      }
    }
  });

  // On first activation, snap camera to "from" position/target (only for second zoom)
  useEffect(() => {
    if (active && from && controlsRef.current && from._shouldSnap) {
      camera.position.copy(from.position);
      controlsRef.current.target.copy(from.target);
      controlsRef.current.update();
    }
    // eslint-disable-next-line
  }, [active]);

  return null;
}

// Ground circle
function GroundCircle() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
      <circleGeometry args={[10, 64]} />
      <meshStandardMaterial
        color="#222"
        emissive="#ffffff"
        emissiveIntensity={0.5}
        roughness={0.7}
        metalness={0.1}
        transparent
        opacity={0.7}
      />
    </mesh>
  );
}

function Floating({ position, speed = 1, amplitude = 0.5, children }) {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.position.y =
        position[1] + Math.sin(clock.getElapsedTime() * speed) * amplitude;
      ref.current.rotation.y += 0.01 * speed;
    }
  });
  return (
    <group ref={ref} position={position}>
      {children}
    </group>
  );
}

// Main Scene: DeskScene owns zooming
function DeskScene({ onZoomComplete }) {
  const controlsRef = useRef();

  const [zooming, setZooming] = useState(false);
  const [zoomStage, setZoomStage] = useState(0);
  const [screenWhite, setScreenWhite] = useState(false);
  const firstZoomFromRef = useRef(null);

  // Stage 1: Mid zoom
  const mid = {
    position: new THREE.Vector3(0, 8, 6),
    target: new THREE.Vector3(0, 7.5, 0),
    _shouldSnap: true, // for second zoom only
  };
  // Stage 2: Close zoom
  const close = {
    position: new THREE.Vector3(0, 8, 0.7),
    target: new THREE.Vector3(0, 7.8, 0),
    _shouldSnap: true,
  };

  // Trigger zooming
  const startZoom = useCallback(() => {
    if (!zooming) setZooming(true);
  }, [zooming]);

  // Handle Enter key here
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Enter") startZoom();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [startZoom]);

  // When zooming toggles on, capture current camera and begin stage 1
  useEffect(() => {
    if (zooming && controlsRef.current) {
      const camera = controlsRef.current.object;
      const from = {
        position: camera.position.clone(),
        target: controlsRef.current.target.clone(),
        _shouldSnap: false,
      };
      firstZoomFromRef.current = from;
      setZoomStage(1);
      setScreenWhite(false); // Reset when starting zoom
    } else if (!zooming) {
      setZoomStage(0);
      setScreenWhite(false);
    }
  }, [zooming]);

  // When stage 1 ends, wait 1s, then start stage 2 and turn screen white
  useEffect(() => {
    if (zoomStage === 2) return;
    if (zoomStage === 1) {
      const timer = setTimeout(() => {
        setZoomStage(2);
        setScreenWhite(true); // Turn screen white after first zoom
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [zoomStage]);

  // When stage 2 ends, call onZoomComplete
  const handleZoomEnd = () => {
    if (zoomStage === 2) {
      setZoomStage(0);
      setZooming(false);
      if (onZoomComplete) onZoomComplete();
    }
  };

  return (
    <div className="relative w-full h-screen bg-[#18181b] main-font">
      {/* Overlayed Text */}
      {!zooming && (
        <div className="absolute top-28 left-0 w-full flex flex-col items-center z-10 select-none">
          <div className="text-4xl md:text-6xl text-gray-200 mb-4 font-bold">
            David's Portfolio
          </div>
          <div className="text-1xl md:text-2xl font-extralight text-gray-100 drop-shadow-lg text-center">
            <button
              className="hover:text-blue-300"
              onClick={startZoom}
            >
              Press [Enter] or
              click here
              to re-enter the portfolio
            </button>
          </div>
          {/* Shown on small (phone) screens only */}
          <p className="mt-2 text-xs sm:text-sm font-extralight text-gray-100 md:hidden">
            (this website is designed for larger devices)
          </p>
        </div>
      )}

      {/* 3D Canvas */}
      <Canvas className="w-full h-screen" shadows>
        <color attach="background" args={["#18181b"]} />
        <ambientLight intensity={1} />
        <directionalLight position={[10, 30, 20]} intensity={2} castShadow />
        <GroundCircle />

        <Suspense fallback={<Loader />}>
          <GLBModel url="/models/ComputerDesk.glb" position={[0, 0, 0]} scale={2.25} screenWhite={screenWhite} />
          {/* Floating elements */}
          <Floating position={[-7, 8, -2]} speed={1.2} amplitude={0.7}>
            <GLBModel url="/models/basketball.glb" position={[0, 0, 0]} scale={1} />
          </Floating>
          <Floating position={[8, 5, 2]} speed={2} amplitude={0.5}>
            <GLBModel url="/models/react_logo_circle.glb" position={[0, 0, 0]} scale={0.75} />
          </Floating>
        </Suspense>

        <OrbitControls
          ref={controlsRef}
          enablePan={false}
          enableZoom={true}
          maxDistance={40}
          target={[0, 7, 0]}
          maxPolarAngle={Math.PI / 2 - 0.05}
        />
        <PerspectiveCamera makeDefault position={[0, 9, 22]} />

        {/* Zoom stages */}
        {zoomStage === 1 && firstZoomFromRef.current && (
          <CameraZoomer
            from={firstZoomFromRef.current}
            to={mid}
            active={zoomStage === 1}
            onZoomEnd={handleZoomEnd}
            controlsRef={controlsRef}
          />
        )}
        {zoomStage === 2 && (
          <CameraZoomer
            from={mid}
            to={close}
            active={zoomStage === 2}
            onZoomEnd={handleZoomEnd}
            controlsRef={controlsRef}
          />
        )}
      </Canvas>
    </div>
  );
}

export default DeskScene;