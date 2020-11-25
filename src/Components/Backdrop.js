import * as THREE from 'three';
import RoyceHall from '../Images/Royce_mockup.svg'

export default function Backdrop() {
  const texture = new THREE.TextureLoader().load(RoyceHall);
  return (
    <mesh>
      <boxGeometry attach="geometry" args={[20, 15]} />
      <meshStandardMaterial attach="material" args={{ map: texture }} />
    </mesh>
  );
}
  