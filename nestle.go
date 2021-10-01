package main

import (
	"encoding/json"
	"fmt"

	"io/ioutil"

	"log"

	"github.com/gocolly/colly"
)

type Brand struct {
	Name  string `json:"name"`
	Link  string `json:"link"`
	Image string `json:"image"`
}

func main() {
	allBrands := make([]Brand, 0)

	collector := colly.NewCollector()

	collector.OnHTML(".embedded-entity", func(element *colly.HTMLElement) {
		brandName := element.Attr("title")
		brandLink := element.ChildAttr("a", "href")
		brandImage := element.ChildAttr("img", "src")

		brand := Brand{
			Name:  brandName,
			Link:  brandLink,
			Image: brandImage,
		}

		allBrands = append(allBrands, brand)
	})

	collector.OnRequest(func(request *colly.Request) {
		fmt.Println("Visiting", request.URL.String())
	})

	collector.Visit("https://www.nestle.com.au/en/brands")

	writeJSON(allBrands)
}

func writeJSON(data []Brand) {

	file, err := json.MarshalIndent(data, "", " ")

	if err != nil {

		log.Println("Unable to create json file")

		return

	}

	_ = ioutil.WriteFile("nestle.json", file, 0644)

}
