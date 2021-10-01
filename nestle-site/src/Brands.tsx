import { NestleBrand } from "./NestleBrand";

const Brands = (prop: { brands: NestleBrand[] }) => {
  if (prop.brands.length > 0) {
    return (
      <>
        {prop.brands.map((brand) => (
          <div key={brand.name} className={brand.name}>
            <h3>{brand.name}</h3>
            <a href={brand.link}>{brand.link}</a>
          </div>
        ))}
      </>
    );
  } else {
    return <p>No brands found</p>;
  }
};

export default Brands;
