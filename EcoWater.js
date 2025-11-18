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

// Menu
function abrirMenu() {
  menu.classList.add('show');
  menu.setAttribute('aria-hidden', 'false');
  menuToggleBtn.setAttribute('aria-expanded', 'true');
  menuToggleBtn.setAttribute('aria-label', 'Fechar menu');
}

function fecharMenu() {
  menu.classList.remove('show');
  menu.setAttribute('aria-hidden', 'true');
  menuToggleBtn.setAttribute('aria-expanded', 'false');
  menuToggleBtn.setAttribute('aria-label', 'Abrir menu');
}

menuToggleBtn.addEventListener('click', () => {
  if (menu.classList.contains('show')) {
    fecharMenu();
  } else {
    abrirMenu();
  }
});

menuCloseBtn.addEventListener('click', fecharMenu);

// Modais
function abrirModal(modal) {
  modal.classList.add('show');
  modal.focus();
  document.body.style.overflow = 'hidden';
}

function fecharModal(modal) {
  modal.classList.remove('show');
  document.body.style.overflow = '';
}

closeBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const modal = btn.closest('.modal');
    fecharModal(modal);
  });
});

btnCadastrar.addEventListener('click', () => abrirModal(modalCadastro));
btnLogin.addEventListener('click', () => abrirModal(modalLogin));

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (modalCadastro.classList.contains('show')) fecharModal(modalCadastro);
    if (modalLogin.classList.contains('show')) fecharModal(modalLogin);
    if (menu.classList.contains('show')) fecharMenu();
  }
});

[modalCadastro, modalLogin].forEach(modal => {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) fecharModal(modal);
  });
});

// Feedback
function mostrarFeedback(mensagem) {
  feedbackMessage.textContent = mensagem;
  feedbackMessage.classList.add('show');
  setTimeout(() => {
    feedbackMessage.classList.remove('show');
  }, 3500);
}

// Formulários
formCadastro?.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!formCadastro.checkValidity()) {
    mostrarFeedback('Preencha todos os campos corretamente no cadastro.');
    return;
  }

  const nome = document.getElementById('nome').value;
  localStorage.setItem('ecoWaterUsuario', nome);
  mostrarFeedback(`Bem-vindo, ${nome.split(' ')[0]}!`);

  formCadastro.reset();
  fecharModal(modalCadastro);
});

formLogin?.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!formLogin.checkValidity()) {
    mostrarFeedback('Preencha todos os campos corretamente no login.');
    return;
  }
  mostrarFeedback('Login realizado com sucesso!');
  formLogin.reset();
  fecharModal(modalLogin);
});

// Navegação de páginas
linksMenu.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const destino = link.getAttribute('href').replace('#', 'pagina-');

    paginas.forEach(pagina => pagina.classList.remove('ativa'));

    const novaPagina = document.getElementById(destino);
    if (novaPagina) novaPagina.classList.add('ativa');

    fecharMenu();
  });
});

// Carrossel
function mostrarSlide(index) {
  slides.forEach(slide => slide.classList.remove('ativo'));
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

// Registro de Consumo de Água
const formRegistro = document.getElementById('form-registro');
const tabelaRegistros = document.getElementById('tabela-registros')?.querySelector('tbody');

// Dados fictícios de consumo
const dadosFicticios = [
  { data: '2025-09-01', quantidade: 2.3 },
  { data: '2025-09-02', quantidade: 1.8 },
  { data: '2025-09-03', quantidade: 2.0 },
  { data: '2025-09-04', quantidade: 2.5 },
  { data: '2025-09-05', quantidade: 1.9 },
  { data: '2025-09-06', quantidade: 2.1 },
  { data: '2025-09-07', quantidade: 2.4 }
];

// Preenche tabela ao carregar
document.addEventListener('DOMContentLoaded', () => {
  if (!tabelaRegistros) return;

  dadosFicticios.forEach(registro => {
    const linha = document.createElement('tr');
    linha.innerHTML = `<td>${registro.data}</td><td>${registro.quantidade} L</td>`;
    tabelaRegistros.appendChild(linha);
  });
});

formRegistro?.addEventListener('submit', (e) => {
  e.preventDefault();

  const data = document.getElementById('data').value;
  const quantidade = document.getElementById('quantidade').value;

  if (!data || !quantidade) {
    mostrarFeedback('Preencha todos os campos para registrar.');
    return;
  }

  if (tabelaRegistros) {
    const novaLinha = document.createElement('tr');
    novaLinha.innerHTML = `<td>${data}</td><td>${quantidade} L</td>`;
    tabelaRegistros.appendChild(novaLinha);
  }

  formRegistro.reset();
  mostrarFeedback('Consumo registrado com sucesso!');
});

// Formulário de Serviços
const formServico = document.getElementById('form-servico');

formServico?.addEventListener('submit', (e) => {
  e.preventDefault();

  const tipo = document.getElementById('tipo-servico').value;
  const descricao = document.getElementById('descricao-servico').value;

  if (!tipo || !descricao.trim()) {
    mostrarFeedback('Preencha todos os campos para enviar a solicitação.');
    return;
  }

  mostrarFeedback(`Solicitação de "${tipo}" enviada com sucesso!`);
  formServico.reset();
});
