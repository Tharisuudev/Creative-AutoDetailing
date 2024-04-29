document.addEventListener("DOMContentLoaded", function () {
  const cars = document.querySelectorAll(".car")
  const washList = document.getElementById("wash-list")
  const detailsSection = document.getElementById("details")
  const formContainer = document.getElementById("form-container")
  const carTypeInput = document.getElementById("car-type")
  const washTypeInput = document.getElementById("wash-type")
  const carTypeDisplay = document.getElementById("carTypeDisplay")

  const prices = {
    Small: ["$75.00", "$120.00", "$300.00", "$175.00"],
    SUV: ["$85.00", "$130.00", "$310.00", "$185.00"],
    Minivan: ["$95.00", "$140.00", "$400.00", "$195.00"],
    Truck: ["$105.00", "$150.00", "$410.00", "$205.00"],
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
  }

  function createWashCard(washType, services, price) {
    const washCard = document.createElement("div")
    washCard.classList.add("wash-card")

    const title = document.createElement("h3")
    title.textContent = washType
    washCard.appendChild(title)

    const serviceList = document.createElement("ul")
    serviceList.classList.add("service-list") // Adicionando uma classe à lista de serviços
    for (let i = 0; i < 4 && i < services.length; i++) {
      // Exibindo apenas os 4 primeiros serviços
      const listItem = document.createElement("li")
      listItem.innerHTML = `<i class="far fa-check-circle"></i>${services[i]}`
      serviceList.appendChild(listItem)
    }
    washCard.appendChild(serviceList)

    if (services.length > 4) {
      // Adicionando um botão "show more" se houver mais de 4 serviços
      const showMoreBtn = document.createElement("button")
      showMoreBtn.textContent = "Show more"
      showMoreBtn.classList.add("show-more-btn") // Adicionando uma classe ao botão "show more"
      showMoreBtn.addEventListener("click", () => {
        serviceList.innerHTML = "" // Limpando a lista de serviços
        services.forEach((service) => {
          const listItem = document.createElement("li")
          listItem.innerHTML = `<i class="far fa-check-circle"></i>${service}`
          serviceList.appendChild(listItem)
        })
        showMoreBtn.style.display = "none" // Ocultando o botão "show more" após exibir todos os serviços
      })
      washCard.appendChild(showMoreBtn)
    }

    const priceElement = document.createElement("p")
    priceElement.textContent = `${price}`
    priceElement.id = "priceElement"
    washCard.appendChild(priceElement)

    const chooseBtn = document.createElement("button")
    chooseBtn.textContent = "Select"
    chooseBtn.id = `${washType
      .replace(/\s+/g, "-")
      .toLowerCase()}-select-button`
    chooseBtn.addEventListener("click", () => {
      console.log(washType)
      washTypeInput.value = washType
      formContainer.style.display = "block"

      const washTypeSelected = washType
      document.getElementById("washTypeDisplay").value = washTypeSelected
    })
    washCard.appendChild(chooseBtn)

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

  // Dentro do evento de envio do formulário
  document
    .getElementById("formulario-email")
    .addEventListener("submit", async function (event) {
      event.preventDefault()

      // Obter os dados do formulário
      const carType = document.getElementById("carTypeDisplay").value
      const washType = document.getElementById("washTypeDisplay").value
      const nomeCompleto = document.getElementById("nomeCompleto").value
      const numeroCliente = document.getElementById("numeroCliente").value
      const emailCliente = document.getElementById("emailCliente").value
      const ruaCliente = document.getElementById("ruaCliente").value
      const codigoPostal = document.getElementById("codigoPostal").value
      const comentario = document.getElementById("comentario").value
      const endereco = document.getElementById("endereco").value

      await new Promise((resolve) => setTimeout(resolve, 100));

      const formData = new FormData()
      formData.append("carType", carType)
      formData.append("washType", washType)
      formData.append("nomeCompleto", nomeCompleto)
      formData.append("numeroCliente", numeroCliente)
      formData.append("emailCliente", emailCliente)
      formData.append("ruaCliente", ruaCliente)
      formData.append("codigoPostal", codigoPostal)
      formData.append("comentario", comentario)
      formData.append("endereco", endereco)

      console.log(formData)

      // Enviar os dados do formulário para o servidor
      fetch("/", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          // Exibir um alerta com base na resposta do servidor
          if (data.status === "success") {
            alert(data.message)
          } else if (data.status === "error") {
            alert(data.message)
          }
        })
        .catch((error) => {
          console.error("Error:", error)
        })
    })
  // Dentro do evento de clique no botão de fechar
  document.querySelector(".fechar").addEventListener("click", function () {
    // Ocultar o formulário quando o botão "fechar" é clicado
    formContainer.style.display = "none"
  })
})
