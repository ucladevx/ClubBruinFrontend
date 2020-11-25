export default function Light({ brightness, color }) {
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
    );
  }
  