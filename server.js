const express = require("express")
const multer = require("multer")
const upload = multer()
const nodemailer = require("nodemailer")

const app = express()
const port = 3000

app.use(express.static("public"))

// Rota para servir o arquivo index.html
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html")
})

// Rota para lidar com o envio do formulário
app.post("/", upload.none(), (req, res) => {
  // Extrair os dados do formulário
  const {
    carType,
    washType,
    numeroCliente,
    emailCliente,
    ruaCliente,
    nomeCompleto,
    endereco,
    codigoPostal,
    comentario,
  } = req.body

  console.log(req.body)

  console.log(`Car Type: ${carType}`)
  console.log(`Wash Type: ${washType}`)

  // Configurar o transporter do nodemailer (substitua com suas configurações de e-mail)
  const transporter = nodemailer.createTransport({
    service: "Hotmail",
    auth: {
      user: "creativeautodetail@outlook.com",
      pass: "gu7Oi=-1RJFQR8!A",
    },
  })

  // Configurar o e-mail a ser enviado
  const mailOptions = {
    from: "creativeautodetail@outlook.com",
    to: "creativeautodetail@outlook.com", // Insira o e-mail do destinatário aqui
    subject: `Cliente: ${nomeCompleto}`,
    text: `
      Car Type: ${carType}
      Wash Type: ${washType}
      Phone Number: ${numeroCliente}
      Email: ${emailCliente}
      Street: ${ruaCliente}
      Full Name: ${nomeCompleto}
      Address: ${endereco}
      Zip Code: ${codigoPostal}
      Comment: ${comentario}
    `,
  }

  // Enviar o e-mail
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      // Enviar resposta de erro para o cliente
      console.log("Erro ao enviar o e-mail: " + error)
      res.send({ status: "error", message: "Erro ao enviar o e-mail" })
    } else {
      console.log("E-mail enviado: " + info.response)
      // Enviar resposta de sucesso para o cliente
      res.send({ status: "success", message: "E-mail enviado com sucesso" })
    }
  })
})

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`)
})
