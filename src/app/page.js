"use client";

import * as THREE from "three";
import { useRef, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  Lightformer,
  Float,
  OrbitControls,
  ScrollControls,
  Scroll,
  Text3D,
} from "@react-three/drei";
import { LayerMaterial, Color, Depth } from "lamina";
import F1Mclaren from "./f1mclaren.js";

export default function Home() {
  const [degraded, degrade] = useState(false);
  return (
    <main className="h-full w-full">
      <Canvas shadows camera={{ position: [0, 1, -0.2] }}>
        <Suspense fallback={null}>
          <ScrollControls pages={4.5}>
            <Scroll>
              <Text3D
                font={"/f1mclaren/gt.json"}
                scale={[-0.2, 0.2, 0.1]}
                position={[3, 2, 2.5]}
                curveSegments={24}
                brevelSegments={1}
                bevelEnabled
                bevelSize={0.04}
                bevelThickness={0}
                height={0.3}
                lineHeight={0.9}
                letterSpacing={0.7}
              >
                {`McLaren Formula 1 Team`}
                <meshMatcapMaterial color="#f26c1a" />
              </Text3D>
              <Text3D
                font={"/f1mclaren/gt.json"}
                scale={[-0.2, 0.2, 0.1]}
                position={[2, 1.7, 2.5]}
                curveSegments={24}
                brevelSegments={1}
                bevelEnabled
                bevelSize={0}
                bevelThickness={0}
                height={0.3}
                lineHeight={0.9}
                letterSpacing={0.5}
              >
                {`Rafael-Valentin Ban`}
                <meshMatcapMaterial color="#f26c1a" />
              </Text3D>
            </Scroll>
            <Scroll>
              <F1Mclaren />
            </Scroll>
          </ScrollControls>
          <OrbitControls
            makeDefault
            minPolarAngle={Math.PI / 2}
            maxPolarAngle={Math.PI / 2}
            enableZoom={false}
            enableRotate={false}
            enablePan={false}
          />
          <Environment
            frames={degraded ? 1 : Infinity}
            resolution={256}
            background
            blur={1}
          >
            <Lightformers />
          </Environment>
        </Suspense>
      </Canvas>
    </main>
  );
}

function Lightformers({ positions = [2, 0, 2, 0, 2, 0, 2, 0] }) {
  const group = useRef();
  useFrame(
    (state, delta) =>
      (group.current.position.z += delta * 10) > 20 &&
      (group.current.position.z = -60)
  );
  return (
    <>
      {/* Ceiling */}
      <Lightformer
        intensity={0.75}
        rotation-x={Math.PI / 2}
        position={[0, 5, -9]}
        scale={[10, 10, 1]}
      />
      <group rotation={[0, 1, 0]}>
        <group ref={group}>
          {positions.map((x, i) => (
            <Lightformer
              key={i}
              form="circle"
              intensity={10}
              rotation={[Math.PI / 2, 0, 0]}
              position={[x, 4, i * 4]}
              scale={[0.5, 1, 1]}
            />
          ))}
        </group>
      </group>
      {/* Sides */}
      <Lightformer
        intensity={4}
        rotation-y={Math.PI / 2}
        position={[-5, 1, -1]}
        scale={[20, 0.1, 1]}
      />
      <Lightformer
        color="#ff9300"
        rotation-y={Math.PI / 2}
        position={[-5, -1, -1]}
        scale={[20, 0.5, 1]}
      />
      <Lightformer
        color="#ff9300"
        rotation-y={-Math.PI / 2}
        position={[10, 1, 0]}
        scale={[20, 1, 1]}
      />
      {/* Accent (red) */}
      <Float speed={5} floatIntensity={2} rotationIntensity={2}>
        <Lightformer
          form="ring"
          color="#ff9300"
          intensity={3}
          scale={10}
          position={[-15, 4, -18]}
          target={[0, 0, 0]}
        />
      </Float>
      {/* Background */}
      <mesh scale={100}>
        <sphereGeometry args={[1, 64, 64]} />
        <LayerMaterial side={THREE.BackSide}>
          <Color color="#ff9300" alpha={1} mode="normal" />
          <Depth
            colorA="black"
            colorB="black"
            alpha={1}
            mode="normal"
            near={0}
            far={300}
            origin={[100, 100, 100]}
          />
        </LayerMaterial>
      </mesh>
    </>
  );
}
