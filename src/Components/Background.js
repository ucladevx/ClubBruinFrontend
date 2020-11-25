import RoyceHall from '../Images/Royce_mockup.svg';
import { HTML } from 'drei';

const Background = () => {
    
    return (
        <group>
            <HTML>
                <img src={RoyceHall} alt="royce" />
            </HTML>
        </group>
    );
}

export default Background;