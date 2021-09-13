"use strict";

window.addEventListener("DOMContentLoaded", start);

const HTML = {};
let allAnimals = [];

// The prototype for all animals:
const Animal = {
  name: "",
  desc: "-unknown animal-",
  type: "",
  age: 0,
};

function start() {
  console.log("ready");
  //variables for filter buttons
  // HTML.onlyCatsBtn = document.querySelector('button[data-filter="cat"]');
  // HTML.onlyDogsBtn = document.querySelector('button[data-filter="dog"]');
  // HTML.allBtn = document.querySelector('button[data-filter="*"]');
  // TODO: Add event-listeners to filter and sort buttons

  loadJSON();
  detectButtonClick();
}

function detectButtonClick() {
  document.querySelectorAll('button[data-action="filter"]').forEach((button) => button.addEventListener("click", getAnimalType));
  document.querySelectorAll('th[data-action="sort"]').forEach((th) => th.addEventListener("click", getSortingParams));
}

function getAnimalType(event) {
  //gets the dataset value of filter of the clicked button
  const filterType = event.target.dataset.filter;
  console.log(filterType);
  filterList(filterType);
}

function getSortingParams(event) {
  const filterType = event.target.dataset.sort;
  console.log(filterType);
  // const sortingParam
}

async function loadJSON() {
  const response = await fetch("animals.json");
  const jsonData = await response.json();

  // when loaded, prepare data objects
  prepareObjects(jsonData);
}

function prepareObjects(jsonData) {
  allAnimals = jsonData.map(prepareObject);
  // console.log(allAnimals);
  // TODO: This might not be the function we want to call first
  displayList(allAnimals);
}

function filterList(animalType) {
  if (animalType === "*") {
    displayList(allAnimals);
  } else {
    const filteredList = allAnimals.filter(isAnimalType);
    function isAnimalType(animal) {
      if (animal.type === animalType) {
        return true;
      }
    }

    // if (animalType === "cat") {
    //   filteredList = allAnimals.filter(isCat);
    // } else if (animalType === "dog") {
    //   filteredList = allAnimals.filter(isDog);
    // } else if (animalType === "*") {
    //   filteredList = allAnimals.filter(all);
    // }

    console.log(filteredList);
    displayList(filteredList);
  }
}

// function isCat(animal) {
//   return animal.type === "cat";
// }

// function isDog(animal) {
//   return animal.type === "dog";
// }

// function all(animal) {
//   return true;
// }

function prepareObject(jsonObject) {
  const animal = Object.create(Animal);

  const texts = jsonObject.fullname.split(" ");
  animal.name = texts[0];
  animal.desc = texts[2];
  animal.type = texts[3];
  animal.age = jsonObject.age;

  return animal;
}

function displayList(animals) {
  // clear the list
  document.querySelector("#list tbody").innerHTML = "";

  // build a new list
  animals.forEach(displayAnimal);
}

function displayAnimal(animal) {
  // create clone
  const clone = document.querySelector("template#animal").content.cloneNode(true);

  // set clone data
  clone.querySelector("[data-field=name]").textContent = animal.name;
  clone.querySelector("[data-field=desc]").textContent = animal.desc;
  clone.querySelector("[data-field=type]").textContent = animal.type;
  clone.querySelector("[data-field=age]").textContent = animal.age;

  // append clone to list
  document.querySelector("#list tbody").appendChild(clone);
}
