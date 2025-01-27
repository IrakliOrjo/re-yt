import { LandingLink } from "../../../LandingLink"
import { NavSubLinks } from "./components/NavSubLinks"
import { NavSubLink } from "./components/NavSubLinks/components"
import { LINKS } from "./const"

export const Navbar = () => {
  return (
    <ul className="lg:flex items-center sticky hidden gap-6 xl:gap-11 xl:ml-14 2xl:ml-24 transition-all ease-in-out duration-300">
                {LINKS.map(({name,url,subLinks}) => (
                    <li 
                        key={name}
                        className=" relative group"
                        >
                        <LandingLink to={url}>{name}</LandingLink>
                        <NavSubLinks>{subLinks.map((sublink) => {
                            return (<NavSubLink to={sublink.url}>{sublink.name}</NavSubLink>)
                        })}</NavSubLinks>
                        </li>
                ))}
    </ul>
  )
}
