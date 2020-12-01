import * as THREE from 'three';
import RoyceHall from '../Images/Royce_mockup.svg'

export default function Background() {
  // const renderer = new THREE.WebGLRenderer();
  const texture = new THREE.TextureLoader().load(RoyceHall);
  // texture.anisotropy = renderer.getMaxAnisotropy();
  return (
    <mesh>
      <boxGeometry attach="geometry" args={[13, 6.5]} />
      <meshStandardMaterial attach="material" args={{ map: texture }} />
    </mesh>
  );
}
  