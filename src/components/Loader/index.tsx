import { LoaderStyle } from './style'
import {Spinner} from "reactstrap";

function Loader() {
    return (
        <LoaderStyle >
            <Spinner/>
        </LoaderStyle>
    );
}

export default Loader;