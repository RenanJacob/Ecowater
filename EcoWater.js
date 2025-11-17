// ---------------------------
// MENU LATERAL
// ---------------------------
const menu = document.getElementById("menu");
const btnMenu = document.getElementById("menu-toggle");
const btnMenuClose = document.getElementById("menu-close");

btnMenu.addEventListener("click", () => {
  menu.classList.add("ativo");
});

btnMenuClose.addEventListener("click", () => {
  menu.classList.remove("ativo");
});

// ---------------------------
// TROCAR PÁGINAS
// ---------------------------
const linksMenu = document.querySelectorAll("nav a");
const paginas = document.querySelectorAll(".pagina");

linksMenu.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();

    const destino = link.getAttribute("href");

    paginas.forEach(p => p.classList.remove("ativa"));
    document.querySelector(destino).classList.add("ativa");

    menu.classList.remove("ativo");
  });
});

// ---------------------------
// CARROSSEL
// ---------------------------
let indice = 0;
const slides = document.querySelectorAll(".slides");
const btnAnt = document.querySelector(".anterior");
const btnProx = document.querySelector(".proximo");

function mostrarSlide(i) {
  slides.forEach(s => s.classList.remove("ativo"));
  slides[i].classList.add("ativo");
}

btnProx.addEventListener("click", () => {
  indice = (indice + 1) % slides.length;
  mostrarSlide(indice);
});

btnAnt.addEventListener("click", () => {
  indice = (indice - 1 + slides.length) % slides.length;
  mostrarSlide(indice);
});

// ---------------------------
// FORMULÁRIO DE REGISTRO DE CONSUMO
// ---------------------------
const formRegistro = document.getElementById("form-registro");
const tabelaRegistros = document.querySelector("#tabela-registros tbody");

if (formRegistro) {
  formRegistro.addEventListener("submit", e => {
    e.preventDefault();

    const data = document.getElementById("data").value;
    const quantidade = document.getElementById("quantidade").value;

    if (data && quantidade) {
      const linha = document.createElement("tr");
      linha.innerHTML = `<td>${data}</td><td>${quantidade}</td>`;
      tabelaRegistros.appendChild(linha);

      formRegistro.reset();
    }
  });
}

// ---------------------------
// FORMULÁRIO DE SERVIÇOS
// ---------------------------
const formServico = document.getElementById("form-servico");

if (formServico) {
  formServico.addEventListener("submit", e => {
    e.preventDefault();
    alert("Solicitação enviada com sucesso!");
    formServico.reset();
  });
}

// ---------------------------
// MODAL CADASTRO E LOGIN
// ---------------------------
const modalCadastro = document.getElementById("modal-cadastro");
const modalLogin = document.getElementById("modal-login");
const btnCadastrar = document.getElementById("btn-cadastrar");
const btnLogin = document.getElementById("btn-login");
const closeBtns = document.querySelectorAll(".close-btn");

if (btnCadastrar) {
  btnCadastrar.addEventListener("click", () => {
    modalCadastro.style.display = "block";
  });
}

if (btnLogin) {
  btnLogin.addEventListener("click", () => {
    modalLogin.style.display = "block";
  });
}

closeBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    modalCadastro.style.display = "none";
    modalLogin.style.display = "none";
  });
});

window.addEventListener("click", e => {
  if (e.target === modalCadastro) modalCadastro.style.display = "none";
  if (e.target === modalLogin) modalLogin.style.display = "none";
});

// ---------------------------
// FORM CADASTRO E LOGIN (SIMPLIFICADO)
// ---------------------------

const formCadastro = document.getElementById("form-cadastro");
const formLogin = document.getElementById("form-login");

if (formCadastro) {
  formCadastro.addEventListener("submit", e => {
    e.preventDefault();

    alert("Cadastro realizado com sucesso!");
    modalCadastro.style.display = "none";
    formCadastro.reset();
  });
}

if (formLogin) {
  formLogin.addEventListener("submit", e => {
    e.preventDefault();

    alert("Login realizado!");
    modalLogin.style.display = "none";
    formLogin.reset();
  });
}
