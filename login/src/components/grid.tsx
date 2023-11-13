import { IconUser } from "@tabler/icons-react"
import { Link, Outlet } from "react-router-dom"

interface Props {
    open: boolean
}

function Grid(props:Props) {
    return (
        <>
            {props.open &&
                <aside className='navbar-aside'>
                    <ul>
                        <li>
                            <Link to={"/listaCandidato"} className='link'>
                                <IconUser size={30} />
                                Candidatos
                            </Link>
                        </li>
                        <li>
                            <Link to={"/cadastrarCadidato"} className='link'>
                                <span>+</span>
                                Cadastrar
                            </Link>
                        </li>
                    </ul>
                </aside>
            }
            <section>
                <Outlet />
            </section>
        </>
    )
}

export default Grid