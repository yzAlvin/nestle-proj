import { NestleBrand } from "./NestleBrand";
import styled from "styled-components";
import { useState } from "react";

const px2vw = (size: number, width = 1440) => `${(size / width) * 100}vw`;

const Sprite = styled.img`
  width: 8em;
  heigth: 8em;
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: ${px2vw(32)};
  max-width: 100%;
`;

const Card = styled.div`
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.4)
transition: all 0.9s cubic-bezier(0.25, 0.8, 0.25, 1);
&:hover {
    box-shadow: 0 20px 30px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
}
display: flex;
width: 20%;
flex-direction: column;
padding: ${px2vw(20)};
height: 100%;
`;

const BoxTitle = styled.h3`
  color: #333;
  font-size: 2rem;
  text-align: center;
`;

const BoxText = styled.p`
  margin-top: ${px2vw(20)};
  color: #666;
  font-size: 1rem;
`;

const ReadMoreButton = styled.button`
   display: inline-block;
   border: 0;
  background: none;
   color: blue;
  cursor: pointer;
`;

const Brands = (prop: { brands: NestleBrand[] }) => {
  const [readMore, setReadMore] = useState(false);
  if (prop.brands.length > 0) {
    return (
      <Container>
        {prop.brands.map((brand) => (
          <Card key={brand.name} className={brand.name}>
            <BoxTitle>{brand.name}</BoxTitle>
            <a href={brand.link}>
              <Sprite src={brand.image} alt={`${brand.name} logo`} />
            </a>
            <BoxText>
              {readMore ? brand.desc : `${brand.desc.substring(0, 120)}...`}
              <ReadMoreButton onClick={() => setReadMore(!readMore)}>
                {readMore ? "Read Less" : "Read More"}
              </ReadMoreButton>
            </BoxText>
          </Card>
        ))}
      </Container>
    );
  } else {
    return <p>No brands found</p>;
  }
};

export default Brands;
