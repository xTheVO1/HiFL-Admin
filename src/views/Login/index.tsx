import { Container, Logo, Form, FormTitle } from "./styles";
import logoimg from '../../assests/logo.png';
import Input from "../../components/Input";
import Button from "../../components/Button";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import {signIn} from "../../redux/actions/auth"
import { Dispatch } from "redux"
import { useDispatch } from "react-redux"

function Login() {
    const dispatch: Dispatch<any> = useDispatch()
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const history: any = useNavigate();

    const handleLogin = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const user = {Email:email, Password:password}
        dispatch(signIn({user, history}))
    }

    return (
        <Container>
            <Logo>
                <img src={logoimg} alt="HIFL"  />
            </Logo>
            <Form onSubmit={(e) => handleLogin(e)}>
                <FormTitle>
                   Enter
                </FormTitle>
                <Input onChange={(e) => setEmail(e.target.value)} required type="email" placeholder="exemplo@gmail.com"/>
                <Input onChange={(e) => setPassword(e.target.value)} required type="password" />
                <Button type="submit">Login</Button>
            </Form>
        </Container>
    );
}

export default Login;