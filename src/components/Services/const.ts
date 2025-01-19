import BuyHomeImage from '../../assets/images/homeservice-1.png';
import SellHomeImage from '../../assets/images/homeservice-2.png';
import RentHomeImage from '../../assets/images/homeservice-3.png';


export const OUR_SERVICES = [
    {
        img: BuyHomeImage,
        title: 'Buy A New Home',
        description: "Discover your dream home effortlessly. Explore diverse properties and expert guidance for a seamless buying experience."
    },
    {
        img: SellHomeImage,
        title: 'Sell A Home',
        description: "Sell confidently with expert guidance and effective strategies, showcasing your property's best features for a successful sale."
    },
    {
        img: RentHomeImage,
        title: 'Rent A Home',
        description: "Discover your perfect rental effortlessly. Explore a diverse variety of listings tailored precisely to suit your unique lifestyle needs."
    },


] as const