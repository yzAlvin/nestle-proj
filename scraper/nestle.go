package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"

	"github.com/gocolly/colly"
)

type Brand struct {
	Name        string `json:"name"`
	Link        string `json:"link"`
	Image       string `json:"image"`
	Description string `json:"desc"`
}

func main() {
	allBrands := make([]Brand, 0)

	collector := colly.NewCollector()

	collector.OnHTML(".listing-row", func(e *colly.HTMLElement) {
		brandName := e.ChildAttr("a", "title")
		brandLink := e.ChildAttr("a", "href")
		brandImage := "https://www.nestle.com" + e.ChildAttr("img", "src")
		brandDesc := e.ChildText("span .description")

		brand := Brand{
			Name:        brandName,
			Link:        brandLink,
			Image:       brandImage,
			Description: brandDesc,
		}

		allBrands = append(allBrands, brand)
	})

	collector.OnRequest(func(request *colly.Request) {
		fmt.Println("Visiting", request.URL.String())
	})

	collector.Visit("https://www.nestle.com/brands/brandssearchlist")

	writeJSON(allBrands)
}

func writeJSON(data []Brand) {
	file, err := json.MarshalIndent(data, "", " ")

	if err != nil {
		log.Println("Unable to create json file")
		return
	}

	ioutil.WriteFile("nestle.json", file, 0644)
}
