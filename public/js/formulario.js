document.addEventListener("DOMContentLoaded", function () {
  const cars = document.querySelectorAll(".car")
  const washList = document.getElementById("wash-list")
  const detailsSection = document.getElementById("details")
  const formContainer = document.getElementById("form-container")
  const carTypeInput = document.getElementById("car-type")
  const washTypeInput = document.getElementById("wash-type")
  const carTypeDisplay = document.getElementById("carTypeDisplay")

  const prices = {
    Small: ["$75.00", "$120.00", "$175.00", "$300.00"],
    SUV: ["$85.00", "$130.00", "$185.00", "$310.00"],
    Minivan: ["$95.00", "$140.00", "$195.00", "$400.00"],
    Truck: ["$105.00", "$150.00", "$205.00", "$410.00"],
  }

  function updateWashList(carType) {
    washList.innerHTML = ""
    const priceRange = prices[carType]
    Object.entries(washTypes).forEach(([washType, data], index) => {
      const price = priceRange[index]
      const washCard = createWashCard(washType, data.services, price)
      washList.appendChild(washCard)
    })
  }

  const washTypes = {
    "Regular Wash": {
      services: [
        "Handwash & Micro Dry",
        "Clean vinyl, rubber & plastic",
        "Vacuum Interior",
        "Carpet & Mats",
        "Clean & Vacuum Trunk",
        "Clean door jambs",
        "Clean Windows",
        "Wheels & Tire Shine",
        "Spray Wax",
      ],
    },
    "Detailed Wash": {
      services: [
        "Handwash & Micro Dry",
        "Clean vinyl, rubber & plastic",
        "Vacuum Interior",
        "Carpet & Mats",
        "Clean & Vacuum Trunk",
        "Clean door jambs",
        "Clean Windows",
        "Wheels & Tire Shine",
        "Hard Paste Wax Protection",
      ],
    },
    "Interior Detail": {
      services: [
        "Interior Deep Cleaning",
        "Interior Double Vacuum",
        "Seats & Mats Shampoo",
        "Leather Conditioning",
        "Exterior Wash",
        "Wheels & Tire Shine",
        "Spray Wax",
      ],
    },
    "Full Detail": {
      services: [
        "Interior Deep Cleaning",
        "Seats & Mats Shampoo",
        "Exterior Wash",
        "Decontamination Paint",
        "Hard Paste Wax Protection",
        "Plastic Revitalization",
        "Wheels & Tire Shine",
      ],
    },
  }

  function createWashCard(washType, services, price) {
    const washCard = document.createElement("div")
    washCard.classList.add("wash-card")

    const title = document.createElement("h3")
    title.textContent = washType
    washCard.appendChild(title)

    const serviceList = document.createElement("ul")
    serviceList.classList.add("service-list")
    for (let i = 0; i < 4 && i < services.length; i++) {
        const listItem = document.createElement("li")
        listItem.innerHTML = `<i class="far fa-check-circle"></i>${services[i]}`
        serviceList.appendChild(listItem)
    }
    washCard.appendChild(serviceList)

    if (services.length > 4) {
        const showMoreBtn = document.createElement("button")
        showMoreBtn.textContent = "Show more"
        showMoreBtn.classList.add("show-more-btn")
        showMoreBtn.addEventListener("click", () => {
            serviceList.innerHTML = ""
            services.forEach((service) => {
                const listItem = document.createElement("li")
                listItem.innerHTML = `<i class="far fa-check-circle"></i>${service}`
                serviceList.appendChild(listItem)
            })
            showMoreBtn.style.display = "none"
        })
        washCard.appendChild(showMoreBtn)
    }

    const priceElement = document.createElement("p")
    priceElement.textContent = `${price}`
    priceElement.id = "priceElement"
    washCard.appendChild(priceElement)

    const callBtn = document.createElement("button")
    callBtn.textContent = "Call"
    callBtn.addEventListener("click", () => {
        window.location.href = "tel:+15612257973";
    })
    washCard.appendChild(callBtn)

    return washCard
}

  
  cars.forEach((car) => {
    car.addEventListener("click", function () {
      // Remover a classe "selected" de todos os carros
      cars.forEach((car) => {
        car.classList.remove("selected")
      })
      // Adicionar a classe "selected" ao carro clicado
      this.classList.add("selected")

      // Obter o tipo de carro clicado e atribuir ao campo "car-type"
      const carType = this.dataset.carType
      carTypeInput.value = carType

      // Exibir o tipo de carro selecionado no elemento "carTypeDisplay"
      carTypeDisplay.value = carType

      // Atualizar a lista de lavagens com base no tipo de carro selecionado
      updateWashList(carType)

      // Exibir a seção de detalhes
      detailsSection.style.display = "block"
    })
  })
})
