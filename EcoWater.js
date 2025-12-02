
// Seleção dos elementos
const menuToggleBtn = document.getElementById('menu-toggle');
const menuCloseBtn = document.getElementById('menu-close');
const menu = document.getElementById('menu');

const btnCadastrar = document.getElementById('btn-cadastrar');
const btnLogin = document.getElementById('btn-login');

const modalCadastro = document.getElementById('modal-cadastro');
const modalLogin = document.getElementById('modal-login');

const closeBtns = document.querySelectorAll('.close-btn');

const formCadastro = document.getElementById('form-cadastro');
const formLogin = document.getElementById('form-login');

const feedbackMessage = document.getElementById('feedback-message');

const linksMenu = document.querySelectorAll('nav a');
const paginas = document.querySelectorAll('.pagina');

const slides = document.querySelectorAll('.slides');
const btnProximo = document.querySelector('.carrossel-btn.proximo');
const btnAnterior = document.querySelector('.carrossel-btn.anterior');
let slideAtual = 0;

/* ---------------- MENU ---------------- */
function abrirMenu() {
  menu.classList.add('show');
  menu.setAttribute('aria-hidden', 'false');
  menuToggleBtn.setAttribute('aria-expanded', 'true');
}

function fecharMenu() {
  menu.classList.remove('show');
  menu.setAttribute('aria-hidden', 'true');
  menuToggleBtn.setAttribute('aria-expanded', 'false');
}

menuToggleBtn.addEventListener('click', () => {
  menu.classList.contains('show') ? fecharMenu() : abrirMenu();
});

menuCloseBtn.addEventListener('click', fecharMenu);

/* --------------- MODAIS ---------------- */
function abrirModal(modal) {
  modal.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function fecharModal(modal) {
  modal.classList.remove('show');
  document.body.style.overflow = '';
}

closeBtns.forEach(btn => {
  btn.addEventListener('click', () => fecharModal(btn.closest('.modal')));
});

btnCadastrar.addEventListener('click', () => abrirModal(modalCadastro));
btnLogin.addEventListener('click', () => abrirModal(modalLogin));

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    fecharModal(modalCadastro);
    fecharModal(modalLogin);
    fecharMenu();
  }
});

/* ------ FEEDBACK ------ */
function mostrarFeedback(msg) {
  feedbackMessage.textContent = msg;
  feedbackMessage.classList.add('show');

  setTimeout(() => {
    feedbackMessage.classList.remove('show');
  }, 3500);
}

/* ------ CADASTRO ------ */
formCadastro?.addEventListener('submit', (e) => {
  e.preventDefault();

  if (!formCadastro.checkValidity()) {
    mostrarFeedback("Preencha todos os campos corretamente.");
    return;
  }

  const nome = document.getElementById('nome').value;

  localStorage.setItem('ecoWaterUsuario', nome);

  mostrarFeedback(`Bem-vindo, ${nome.split(" ")[0]}!`);
  formCadastro.reset();
  fecharModal(modalCadastro);
});

/* ------ LOGIN ------ */
formLogin?.addEventListener('submit', (e) => {
  e.preventDefault();

  mostrarFeedback("Login realizado com sucesso!");
  formLogin.reset();
  fecharModal(modalLogin);
});

// ------ MUDANÇA DE PÁGINA ------
linksMenu.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();

    // Corrige link específico para a seção real
    let href = link.getAttribute('href');
    let destinoID = href === '#participacao' ? '#participacao-comunidade' : href.replace('#', '#pagina-');

    const paginaDestino = document.querySelector(destinoID);

    if (!paginaDestino) {
      console.error('Página não encontrada:', destinoID);
      return; // evita quebrar o JS
    }

    paginas.forEach(p => p.classList.remove('ativa'));
    paginaDestino.classList.add('ativa');

    fecharMenu();
  });
});



/* ------ CARROSSEL ------ */
function mostrarSlide(index) {
  slides.forEach(s => s.classList.remove('ativo'));
  slides[index].classList.add('ativo');
}

btnProximo?.addEventListener('click', () => {
  slideAtual = (slideAtual + 1) % slides.length;
  mostrarSlide(slideAtual);
});

btnAnterior?.addEventListener('click', () => {
  slideAtual = (slideAtual - 1 + slides.length) % slides.length;
  mostrarSlide(slideAtual);
});

setInterval(() => {
  slideAtual = (slideAtual + 1) % slides.length;
  mostrarSlide(slideAtual);
}, 7000);

/* ------ REGISTRO DE CONSUMO ------ */
const formRegistro = document.getElementById('form-registro');
const tabelaRegistros = document.querySelector('#tabela-registros tbody');

const dadosFicticios = [
  { data: "2025-09-01", quantidade: 2.3 },
  { data: "2025-09-02", quantidade: 1.8 },
  { data: "2025-09-03", quantidade: 2.0 },
  { data: "2025-09-04", quantidade: 2.5 },
  { data: "2025-09-05", quantidade: 1.9 },
  { data: "2025-09-06", quantidade: 2.1 },
  { data: "2025-09-07", quantidade: 2.4 }
];

// Preencher tabela com dados de exemplo
document.addEventListener("DOMContentLoaded", () => {
  dadosFicticios.forEach(reg => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${reg.data}</td><td>${reg.quantidade} L</td>`;
    tabelaRegistros.appendChild(tr);
  });
});

formRegistro?.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = document.getElementById("data").value;
  const quantidade = document.getElementById("quantidade").value;

  if (!data || !quantidade) {
    mostrarFeedback("Preencha todos os campos.");
    return;
  }

  const tr = document.createElement("tr");
  tr.innerHTML = `<td>${data}</td><td>${quantidade} L</td>`;
  tabelaRegistros.appendChild(tr);

  formRegistro.reset();
  mostrarFeedback("Consumo registrado!");
});

/* ------ SERVIÇOS ------ */
const formServico = document.getElementById("form-servico");

formServico?.addEventListener("submit", (e) => {
  e.preventDefault();

  const tipo = document.getElementById("tipo-servico").value;
  const descricao = document.getElementById("descricao-servico").value;

  if (!tipo || !descricao.trim()) {
    mostrarFeedback("Preencha todos os campos.");
    return;
  }

  mostrarFeedback(`Solicitação de "${tipo}" enviada com sucesso!`);
  formServico.reset();
});






// ===============================
// FORMULÁRIO PARA MULHERES
// ===============================

document.addEventListener("DOMContentLoaded", () => {
  const formMulheres = document.getElementById("form-mulheres");

  if (formMulheres) {
    formMulheres.addEventListener("submit", function (event) {
      event.preventDefault();

      const nome = document.getElementById("nomeMulher").value.trim();
      const email = document.getElementById("emailMulher").value.trim();
      const mensagem = document.getElementById("mensagemMulher").value.trim();

      if (!nome || !email || !mensagem) {
        mostrarFeedback("Preencha todos os campos!", true);
        return;
      }

      // Aqui você pode futuramente enviar para seu banco ou API
      console.log("Formulário enviado (mulheres):", {
        nome,
        email,
        mensagem
      });

      mostrarFeedback("Mensagem enviada com sucesso!", false);

      formMulheres.reset();
    });
  }
});

// Função reaproveitável para feedback
function mostrarFeedback(texto, erro = false) {
  const box = document.getElementById("feedback-message");
  box.textContent = texto;
  box.style.backgroundColor = erro ? "#c62828" : "#1565c0";
  box.classList.add("show");

  setTimeout(() => {
    box.classList.remove("show");
  }, 3000);
}


// ===================================================================
// PARTICIPAÇÃO DA COMUNIDADE (VERSÃO ISOLADA E À PROVA DE ERROS)
// ===================================================================

document.addEventListener("DOMContentLoaded", () => {
    const formIdeia = document.getElementById("form-ideia");
    const listaIdeias = document.getElementById("lista-ideias");

    // Se o HTML ainda não tiver a lista, criamos dinamicamente sem quebrar nada
    if (!listaIdeias) {
        console.warn("⚠ A lista UL de ideias não existe no HTML. Criando agora...");
        const novaLista = document.createElement("ul");
        novaLista.id = "lista-ideias";
        formIdeia.insertAdjacentElement("afterend", novaLista);
    }

    const lista = document.getElementById("lista-ideias");

    // Carregar do localStorage sem travar o JS
    let ideiasSalvas;
    try {
        ideiasSalvas = JSON.parse(localStorage.getItem("ecoWaterIdeias")) || [];
    } catch {
        ideiasSalvas = [];
    }

    function atualizarLista() {
        lista.innerHTML = "";

        ideiasSalvas.forEach(i => {
            const li = document.createElement("li");
            li.textContent = `${i.nome ? i.nome + ": " : ""}${i.texto}`;
            lista.appendChild(li);
        });
    }

    atualizarLista();

    if (formIdeia) {
        formIdeia.addEventListener("submit", (e) => {
            e.preventDefault();

            const nome = document.getElementById("nomeIdeia").value.trim();
            const texto = document.getElementById("textoIdeia").value.trim();

            if (!texto) {
                mostrarFeedback("Digite uma ideia!");
                return;
            }

            ideiasSalvas.push({ nome, texto });

            localStorage.setItem("ecoWaterIdeias", JSON.stringify(ideiasSalvas));

            atualizarLista();
            formIdeia.reset();
            mostrarFeedback("Ideia enviada!");
        });
    }
});



