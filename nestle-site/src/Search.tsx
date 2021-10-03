import { ChangeEvent, useEffect, useState } from "react";
import Brands from "./Brands";
import _nestleData from "./nestle.json";
import { NestleBrand } from "./NestleBrand";

const scrapedNestleBrands = _nestleData as NestleBrand[];
const nestleBrands = scrapedNestleBrands.reduce(
  (prev, curr) =>
    prev.map((b) => b.name).includes(curr.name)
      ? prev
      : [...prev].concat([curr]),
  new Array<NestleBrand>()
);

const Search = () => {
  const [brands, setBrands] = useState(nestleBrands);
  const [searchTerm, setSearchTerm] = useState("");

  const editSearchTerm = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    setBrands(
      nestleBrands.filter((brand) =>
        brand.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm]);

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
