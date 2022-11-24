import { OneThirdCard } from "./elements/UserContentTemplete";
import { AiOutlineSearch } from 'react-icons/ai'
import styled from "styled-components";
import theme from "../styles/theme";

const SearchInput = styled.input`
outline:none;
border:none;
border-radius:0;
width:80%;
padding:10px 0;
margin:0 6px;
font-size:12px;
::placeholder {
  color:#dddddd;
  font-size:12px;
}
`
const SearchComponent = (props) => {
    const { onSearch } = props;
    return (
        <>
            <OneThirdCard style={{ margin: '0 0 16px 0', width: '96%',cursor:'default' }}>
                <SearchInput type={'text'} placeholder='검색어입력' className='search-input' onKeyPress={(e) => e.key == 'Enter' ? onSearch() : console.log(null)} />
                <div style={{ width: '32px', textAlign: 'center', marginLeft: 'auto' }}>
                    <AiOutlineSearch style={{ fontSize: '24px', cursor: 'pointer', color: theme.color.background1 }} onClick={onSearch} />
                </div>
            </OneThirdCard>
        </>
    )
}
export default SearchComponent;