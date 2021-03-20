import { AmbientLight } from "three";

export default function Light( {color, brightness} ) {
    return (
      <rectAreaLight
        width={1000}
        height={1000}
        color={color}
        intensity={brightness}
        position={[-2, 5, 5]}
        lookAt={[0, 0, 0]}
        penumbra={1}
        castShadow
      />
      // <AmbientLight color={0x404040} intensity={1} />
    );
  }
  