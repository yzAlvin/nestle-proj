package main

import (
	"encoding/json"
	"fmt"
	"strings"
	"unicode"

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
		brandName := fmtName(element.Attr("title"))
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

func fmtName(name string) string {
	name = strings.ToLowerSpecial(unicode.TurkishCase, name)

	if strings.Contains(name, "logo") {
		name = name[0 : strings.Index(name, "logo")-1]
	}

	return strings.Title(name)
}

func writeJSON(data []Brand) {
	file, err := json.MarshalIndent(data, "", " ")

	if err != nil {
		log.Println("Unable to create json file")
		return
	}

	ioutil.WriteFile("nestle.json", file, 0644)
}
