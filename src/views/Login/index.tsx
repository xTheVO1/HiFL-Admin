import { Container, Logo, Form, FormTitle, Error } from "./styles";
import logoimg from '../../assests/logo.png';
import Input from "../../components/Input";
import Button from "../../components/Button";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import {signIn} from "../../redux/actions/auth"
import { Dispatch } from "redux"
import { useDispatch, useSelector } from "react-redux"
import { Spinner } from "reactstrap";


function Login() {
    const dispatch: Dispatch<any> = useDispatch();
    const loading = useSelector((state: any) => state.auth.loading);
    const error = useSelector((state: any) => state.auth.error);
    const errorMessage = error && error ? error.data : {};

    const [email, setEmail] = useState<string>('')
    const [message, setMessage] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const history: any = useNavigate();

    const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const user = {Email:email, Password:password}
        await dispatch(signIn({user, history}))
        if(error)
        await setMessage(errorMessage.message)
    }
   
    return (
        <Container>
            <Logo>
                <img src={logoimg} alt="HIFL"  />
            </Logo>
            <Form onSubmit={(e) => handleLogin(e)}>
                <FormTitle>
                   Login
                </FormTitle>
                <Input onChange={(e) => setEmail(e.target.value)} required type="email" placeholder="example@gmail.com"/>
                <Input onChange={(e) => setPassword(e.target.value)} required type="password" />
                <Button type="submit">{loading ? <Spinner/> : "Login"}</Button>
            </Form>
            {message ? <Error>{message}</Error> : ""}

        </Container>
    );
}

export default Login;