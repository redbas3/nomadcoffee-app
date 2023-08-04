import React from "react";
import styled from "styled-components/native";
import noImageIcon from "../assets/no-image-icon.png";

const SCoffeeBox = styled.View`
  width: ${(props) => props.width}px;
  height: ${(props) => props.width}px;
  background-color: #efe1d1;
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  overflow: hidden;
  margin: 6px;
`;

const Image = styled.Image`
  width: 100%;
  height: 100px;
  object-fit: cover;
`;

function CoffeeBoxSmall({ width, coffeeShop, readMode }) {
  let imageUri = "";
  if (coffeeShop.photos[coffeeShop.photos.length - 1]?.url) {
    imageUri = coffeeShop.photos[coffeeShop.photos.length - 1]?.url;
  }
  return (
    <SCoffeeBox width={width - 12}>
      {imageUri !== "" ? (
        <Image
          source={{
            uri: imageUri != "" ? imageUri : noImageIcon,
          }}
        />
      ) : null}
    </SCoffeeBox>
  );
}

export default CoffeeBoxSmall;
