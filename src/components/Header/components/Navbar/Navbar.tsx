import { LandingLink } from "../../../LandingLink"
import { NavSubLinks } from "./components/NavSubLinks"
import { NavSubLink } from "./components/NavSubLinks/components"
import { LINKS } from "./const"

export const Navbar = () => {
  return (
    <ul className="flex sticky">
                {LINKS.map(({name,url,subLinks}) => (
                    <li 
                        key={name}
                        className="pr-[65px] relative group"
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
