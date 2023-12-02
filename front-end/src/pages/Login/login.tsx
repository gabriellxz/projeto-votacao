import './style.css'
import { useNavigate } from 'react-router-dom'
import Arrow from '../../componentsSVG/arrow/arrow'
// import Btnpassword from '../../componentsSVG/btn-password/btn-password'
import logoEleicoes from '../../assets/img/eleicoes-logo.png'
import { useContext, useState } from 'react'
import typeLogin from '../../models/typeLogin'
import api from '../../config/apiConfig'
import { Context } from '../../context/authContext'
import LoadingIcon from '../../components/loading-icon/loading-icon'

export default function Login() {

    const { autenticado, signIn } = useContext(Context)
    console.log("Usuário logado: " + autenticado)

    const navigate = useNavigate()

    const [user, setUser] = useState<typeLogin>({
        email: "",
        senha: "",
    })

    const [mensagem, setMensagem] = useState({
        type: "",
        mensagem: "",
        loading: false
    })

    function handleInput(e: any) {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    function formIsValid() {
        return user.email.trim() !== "" && user.senha.trim() !== ""
    }

    const headers = {
        "Content-type": "application/json"
    }

    async function handlePostForm(e: any) {
        e.preventDefault()
        // console.log(user.email)
        setMensagem({
            type: "",
            mensagem: "",
            loading: true
        })

        await api.post("/Login", user, { headers })
            .then((response) => {
                console.log(response.data)
                setMensagem({
                    type: "sucess",
                    mensagem: response.data.msg,
                    loading: false
                })
                signIn(true)

                localStorage.setItem("tokenUser", JSON.stringify(response.data.acessToken))
                localStorage.setItem("nomeUser", JSON.stringify(response.data.name))
                localStorage.setItem("cidadeUser", JSON.stringify(response.data.cidade))
                localStorage.setItem("estadoUser", JSON.stringify(response.data.estado))
                localStorage.setItem("roleUser", JSON.stringify(response.data.role))

                navigate("/dashboard")
            })
            .catch((err) => {
                console.log(err)
                if (err.response) {
                    setMensagem({
                        type: "error",
                        mensagem: err.response.data.default.error.msg,
                        loading: false
                    })
                } else {
                    setMensagem({
                        type: "error",
                        mensagem: "Erro: tente mais tarde",
                        loading: false
                    })
                }
            })
    }

    const [showPassword, setShowPassword] = useState(false)

    function visibilityPassword() {
        setShowPassword(!showPassword)
    }

    return (
        <div className="container-login">
            <div className="box-right">
                <div className="container-box-right">
                    <div className="container-img-std">
                        <img src={logoEleicoes} alt="logo_eleições" className='logo-img' />
                    </div>
                    <div className="container-title">
                        <h1>Fazer login</h1>
                        <div className="msg-error">
                            {mensagem.type === "error" ? <p>{mensagem.mensagem}</p> : ""}
                        </div>
                        <div className="msg-sucess">
                            {mensagem.loading ? <LoadingIcon /> : ""}
                        </div>
                    </div>
                    <form className="container-form" onSubmit={handlePostForm}>
                        <div className='box-form'>
                            <div className="box-input">
                                <div className="input" id="single-input">
                                    <input required type="email" name="email" className='input' onChange={handleInput} />
                                    <label>E-MAIL</label>
                                </div>
                            </div>
                            <div className="box-input">
                                <div className='input' id='single-input'>
                                    <input required type={showPassword ? "text" : "password"} name="senha" className='input' onChange={handleInput} />
                                    <svg onClick={visibilityPassword} xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                                        <path d="M25.3124 26.25C25.1893 26.2502 25.0674 26.226 24.9536 26.1789C24.8399 26.1317 24.7366 26.0625 24.6498 25.9752L4.02475 5.35019C3.85636 5.17295 3.76387 4.93693 3.767 4.69247C3.77013 4.448 3.86863 4.21443 4.04151 4.04155C4.21438 3.86868 4.44795 3.77017 4.69242 3.76704C4.93688 3.76391 5.1729 3.85641 5.35014 4.0248L25.9751 24.6498C26.1062 24.7809 26.1954 24.9479 26.2315 25.1297C26.2677 25.3115 26.2491 25.5 26.1782 25.6712C26.1073 25.8425 25.9872 25.9888 25.8331 26.0919C25.679 26.1949 25.4978 26.2499 25.3124 26.25ZM14.98 22.5C12.549 22.5 10.2046 21.7805 8.01206 20.3613C6.01577 19.0723 4.2187 17.226 2.81479 15.0293V15.0246C3.98315 13.3506 5.26284 11.935 6.63745 10.7936C6.64988 10.7832 6.66003 10.7703 6.66724 10.7558C6.67445 10.7413 6.67857 10.7254 6.67934 10.7092C6.68011 10.693 6.67751 10.6769 6.67172 10.6617C6.66592 10.6466 6.65704 10.6328 6.64565 10.6213L5.47846 9.45586C5.45772 9.43494 5.42987 9.42261 5.40044 9.4213C5.37102 9.42 5.34218 9.42983 5.31967 9.44882C3.85952 10.6793 2.50424 12.1887 1.27202 13.9559C1.06002 14.2601 0.94326 14.6206 0.936583 14.9914C0.929905 15.3622 1.03361 15.7266 1.23452 16.0383C2.78198 18.46 4.77358 20.4996 6.99311 21.9357C9.49214 23.5547 12.1816 24.375 14.98 24.375C16.4905 24.3703 17.9904 24.1214 19.4214 23.6379C19.4403 23.6315 19.4572 23.6204 19.4706 23.6056C19.484 23.5908 19.4934 23.5729 19.4979 23.5535C19.5024 23.534 19.5019 23.5138 19.4964 23.4946C19.491 23.4755 19.4807 23.458 19.4666 23.4439L18.2021 22.1795C18.173 22.1511 18.137 22.1308 18.0976 22.1205C18.0583 22.1102 18.017 22.1104 17.9777 22.1209C16.9984 22.3731 15.9912 22.5004 14.98 22.5ZM28.7601 13.9805C27.2097 11.5828 25.1982 9.54609 22.9435 8.09003C20.4492 6.47754 17.6953 5.625 14.98 5.625C13.4855 5.62765 12.0021 5.88178 10.5919 6.37675C10.5732 6.38329 10.5563 6.39451 10.5431 6.40934C10.5298 6.42417 10.5206 6.44213 10.5162 6.46153C10.5118 6.48094 10.5124 6.50114 10.518 6.52024C10.5235 6.53933 10.5339 6.5567 10.548 6.5707L11.8107 7.83339C11.8401 7.86229 11.8766 7.88292 11.9165 7.89321C11.9564 7.9035 11.9983 7.90308 12.038 7.89199C12.9972 7.63252 13.9864 7.50072 14.98 7.5C17.3642 7.5 19.7015 8.22832 21.9263 9.66796C23.9601 10.9805 25.7783 12.825 27.1857 15C27.1867 15.0013 27.1873 15.003 27.1873 15.0047C27.1873 15.0064 27.1867 15.008 27.1857 15.0094C26.1641 16.6177 24.8963 18.0557 23.4287 19.2709C23.4161 19.2813 23.4058 19.2941 23.3985 19.3087C23.3912 19.3232 23.387 19.3391 23.3861 19.3554C23.3853 19.3716 23.3879 19.3879 23.3937 19.4031C23.3995 19.4183 23.4084 19.4322 23.4199 19.4437L24.5859 20.6092C24.6065 20.63 24.6342 20.6423 24.6635 20.6438C24.6928 20.6452 24.7215 20.6355 24.7441 20.6168C26.3109 19.2976 27.6671 17.7469 28.766 16.0184C28.9602 15.7138 29.0629 15.3598 29.0618 14.9986C29.0608 14.6373 28.9561 14.2839 28.7601 13.9805Z" fill="#A4D5D0" />
                                        <path d="M15 9.375C14.5786 9.37477 14.1586 9.42194 13.7478 9.51563C13.7271 9.51993 13.7079 9.52979 13.6923 9.54414C13.6767 9.55849 13.6653 9.5768 13.6593 9.59712C13.6533 9.61744 13.6529 9.63901 13.6581 9.65953C13.6634 9.68006 13.6742 9.69877 13.6892 9.71367L20.2863 16.309C20.3012 16.324 20.3199 16.3348 20.3404 16.3401C20.361 16.3453 20.3825 16.345 20.4028 16.3389C20.4232 16.3329 20.4415 16.3215 20.4558 16.3059C20.4702 16.2903 20.48 16.2711 20.4843 16.2504C20.6722 15.4266 20.672 14.5711 20.4838 13.7473C20.2957 12.9236 19.9243 12.1528 19.3974 11.4923C18.8705 10.8318 18.2016 10.2984 17.4403 9.93187C16.679 9.56532 15.8449 9.37498 15 9.375ZM9.71364 13.691C9.69873 13.676 9.68002 13.6652 9.6595 13.6599C9.63897 13.6547 9.6174 13.6551 9.59708 13.6611C9.57676 13.6671 9.55845 13.6785 9.5441 13.6941C9.52975 13.7097 9.5199 13.7289 9.51559 13.7496C9.3031 14.6779 9.32978 15.645 9.59314 16.5602C9.85649 17.4754 10.3479 18.3088 11.0213 18.9822C11.6947 19.6556 12.5281 20.147 13.4433 20.4103C14.3585 20.6737 15.3255 20.7004 16.2539 20.4879C16.2746 20.4836 16.2938 20.4737 16.3094 20.4594C16.325 20.445 16.3364 20.4267 16.3424 20.4064C16.3484 20.3861 16.3488 20.3645 16.3435 20.344C16.3383 20.3235 16.3275 20.3047 16.3125 20.2898L9.71364 13.691Z" fill="#A4D5D0" />
                                    </svg>
                                    <label>SENHA</label>
                                </div>
                            </div>
                            <div className="form-bottom">
                                <div className="checkbox-div">
                                    <input type="checkbox" name="" id="" />
                                    {/* <span className="checkbox-custom"></span> */}
                                    <span>Manter login</span>
                                </div>
                                {/* <div className="create-acount">
                                    <Link to="cadastro">Criar conta</Link>
                                </div> */}
                            </div>
                            <div className={formIsValid() ? "container-btn valid-btn" : "container-btn"}>
                                <button>
                                    <Arrow />
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className="container-background"></div>
        </div>
    )
}