import { LoaderStyle } from './style'

interface NoDataPropsType {
    text: string;
}
function NoData({text}: NoDataPropsType) {
    return (
        <LoaderStyle >
            {text}
        </LoaderStyle>
    );
}

export default NoData;