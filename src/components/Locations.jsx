import useLocationRandom from '../hooks/useLocationRandom';

const Locations = () => {

    const { fun } = useLocationRandom();

    return (
        fun()
    );
};

export default Locations;