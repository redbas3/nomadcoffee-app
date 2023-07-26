import React from "react";
import styled from "styled-components/native";
import noImageIcon from "../assets/no-image-icon.png";

const SCoffeeBox = styled.View`
  width: 100%;
  background-color: #efe1d1;
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 12px;
`;

const Image = styled.Image`
  width: 100%;
  height: 100px;
  object-fit: cover;
`;

const CoffeeName = styled.Text`
  font-size: 16px;
  padding: 12px;
  font-weight: 600;
  margin-top: 6px;
`;
const CoffeeUsername = styled.Text`
  padding: 12px;
  font-weight: 400;
  padding-top: 0;
  color: rgba(63, 46, 62, 0.8);
`;

const CategoryWrap = styled.View`
  display: flex;
  padding: 4px 8px;
  margin-bottom: 6px;
  overflow-x: auto;
`;

const Category = styled.Text`
  background-color: #3f2e3e;
  color: #efe1d1;
  padding: 10px 12px;
  margin: 4px;
`;

function CoffeeBox({ coffeeShop, readMode }) {
  let imageUri = "";
  if (coffeeShop.photos[coffeeShop.photos.length - 1]?.url) {
    imageUri = coffeeShop.photos[coffeeShop.photos.length - 1]?.url;
  }
  return (
    <SCoffeeBox>
      {imageUri !== "" ? (
        <Image
          source={{
            uri: imageUri != "" ? imageUri : noImageIcon,
          }}
        />
      ) : null}
      <CoffeeName>{coffeeShop.name}</CoffeeName>
      <CoffeeUsername>{coffeeShop.user.name}</CoffeeUsername>
      {coffeeShop["categories"] ? (
        <CategoryWrap>
          {coffeeShop["categories"].map((category) => (
            <Category key={`category_${category.id}`}>{category.name}</Category>
          ))}
        </CategoryWrap>
      ) : null}
    </SCoffeeBox>
  );
}

export default CoffeeBox;
