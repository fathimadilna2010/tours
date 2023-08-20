import React, { useEffect, useState } from 'react'
import style, { styled } from 'styled-components'
import axios from 'axios'

function Tours() {
    const [placeCards, setPlaceCards] = useState([])
    const [readMore, setReadMore] = useState(false)
    const [tours, setTours] = useState('Our Tours')
    let fetchingData = () => {
        axios.get('https://course-api.com/react-tours-project').then(function(response) {
            console.log(response.data)
            setPlaceCards(response.data)

        })
        .then(function(error) {
            console.log(error)
        })
    }
    useEffect(() => {
        {fetchingData()}
        setTours('Our Tours')
    }, [])
    let DeleteCard = (id) => {
        let newCard = placeCards.filter((card) => card.id !== id)
        setPlaceCards(newCard)
        if (placeCards.length-1 === 0) {
            setTours('No Tours Left')
        }
    }
    let renderItems = () => {
        return placeCards.map((card) => (
                <Card key={card.id}>
                <CardTop style={{background: `url('${card.image}')`, backgroundSize: 'cover'}}></CardTop>
                <CardBottom>
                    <NameAndPriceDiv>
                        <Name>{card.name}</Name>
                        <Price>{card.price}</Price>
                    </NameAndPriceDiv>
                    <ParaAndButtonDiv>
                        <Para>{readMore ? card.info : `${card.info.substring(0, 200)}...`}
                            <ReadMoreButton onClick={() => setReadMore(!readMore)}>{readMore ? 'Show less' : 'Read More'}</ReadMoreButton>
                        </Para>
                        <ButtonNotInterested onClick={() => DeleteCard(card.id)}>Not Interested</ButtonNotInterested>
                    </ParaAndButtonDiv>
                </CardBottom>
                </Card>
            
        ));
    };
  return (
    <Container>
        <SubContainer>
            <TopForH1>
                <Heading>{tours}</Heading>
                <Hr/>
                {placeCards.length === 0 ? <ButtonRefresh onClick={() => fetchingData()} >Refresh</ButtonRefresh> : <br/>}
            </TopForH1>
            <BottomForCards>
                <div>{renderItems()}</div>
            </BottomForCards>
        </SubContainer>
    </Container>
  )
  };

const Container = styled.section `
    width: 100%;
    background: #EFF5FA;
    height: 205rem;
`;
const SubContainer = styled.section `
    width: 40%;
    padding-top: 60px;
    margin: 0 auto;
    text-align: center;
    height: 76rem;
`;
const TopForH1 = styled.div `
    margin-bottom: 50px;
    width: 100%;
    height: 3rem;
`;
const Heading = styled.h1 `
    font-size: 40px;
    margin-bottom: 10px;
    color: #1D2530;
`;
const Hr = styled.hr `
    width: 100px;
    border: 2px solid #3B9EDC;
    
`
const BottomForCards = styled.div `
    width: 100%;
    height: 67rem;
`;
const Card = styled.div `
    width: 100%;
    background: #FBFBFB;
    margin: 2rem 0;
    border-radius: 5px;
    transition: all .2s;
    cursor: pointer;
    &:hover {
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    }
`;
const CardTop = styled.div `
    width: 100%;
    height: 20rem;
    background: pink;
    display: block;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;

`;
const CardBottom = styled.div `
    width: 100%;
    background: #FBFBFB;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    
`;
const NameAndPriceDiv = styled.div `
    width: 90%;
    margin: 10px auto;
    text-align: left;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
const Name = styled.h3 `
    color:#1D2530;
    letter-spacing: 1px;
`;
const Price = styled.span `
    background: #E4F3F4;
    padding: 5px 15px;
    border-radius: 5px;
    font-weight: 600;
    color: #4891C7;
`;
const ParaAndButtonDiv = styled.div `
    width: 90%;
    margin: 0 auto;
`;
const Para = styled.p `
    text-align: left;
    line-height: 1.4;
    color: #626F70;
    cursor: auto;
`;
const ButtonNotInterested = styled.button `
    text-align: center;
    width: 35%;
    padding: 5px 0;
    font-size: 16px;
    color: #7C1021;
    font-weight: 600;
    border: 1px solid #CBB2B3;
    border-radius: 5px;
    letter-spacing: 1px;
    margin-bottom: 40px;
    background: #fff;
    cursor: pointer;
`
const ReadMoreButton = styled.button `
    background: none;
    border: none;
    font-size: 16px;
    color: #4891C7;
    cursor: pointer;
`
const ButtonRefresh = styled.button `
    background: #3F9ED6;
    padding: 8px 10px;
    font-size: 16px;
    color: #fff;
    border: none;
    border-radius: 5px;
    letter-spacing: 1px;
    cursor: pointer;
`
export default Tours
