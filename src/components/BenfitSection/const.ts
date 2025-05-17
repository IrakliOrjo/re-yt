import CheckListIcon from '../../assets/images/ChecklistIcon.svg';
import PartnerShipIcon from '../../assets/images/partnershipIcon.svg';
import ConfigurationIcon from '../../assets/images/configurationIcon.svg';


export const BENEFIT_BOXES = [
    {
        icon: CheckListIcon,
        title: 'Proven Expertise',
        description: 'Our seasoned team excels in real estate with years of successful market navigation, offering informed decisions and optimal results.'
    },
    {
        icon: ConfigurationIcon,
        title: 'Customized Solutions',
        description: 'We pride ourselves on crafting personalized strategies to match your unique goals, ensuring a seamless real estate journey.'
    },
    {
        icon: PartnerShipIcon,
        title: 'Transparent Partnerships',
        description: 'Transparency is key in our client relationships. We prioritize clear communication and ethical practices, fostering trust and reliability throughout.'
    }
] as const