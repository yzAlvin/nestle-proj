import { ChangeEvent, useState } from "react";
import Brands from "./Brands";
import _nestleData from "./nestle.json";
import { NestleBrand } from "./NestleBrand";

const nestleBrands = _nestleData as NestleBrand[];

const Search = () => {
  const [brands, setBrands] = useState(nestleBrands);
  const [searchTerm, setSearchTerm] = useState("");

  const editSearchTerm = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setBrands(
      nestleBrands.filter((brand) =>
        brand.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };
  return (
    <>
      <input
        type="text"
        onChange={editSearchTerm}
        placeholder="Search for a brand!"
      />
      <Brands brands={brands} />
    </>
  );
};

export default Search;
