// =======================================================
// EcoWater.js - Código Completo e Corrigido
// =======================================================

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

/* ------ FUNÇÃO FEEDBACK CENTRALIZADA (Corrigida) ------ */
function mostrarFeedback(texto, erro = false) {
    const box = document.getElementById("feedback-message");
    box.textContent = texto;
    // O seu CSS deve lidar com a cor, mas forçamos aqui para a mensagem de erro.
    box.style.backgroundColor = erro ? "#c62828" : "#1565c0"; 
    box.classList.add("show");
    setTimeout(() => {
        box.classList.remove("show");
        // Remove a cor customizada após sumir
        box.style.backgroundColor = "#1565c0"; 
    }, 3500);
}


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

if (menuToggleBtn && menu) {
    menuToggleBtn.addEventListener('click', () => {
        menu.classList.contains('show') ? fecharMenu() : abrirMenu();
    });
}

if (menuCloseBtn && menu) {
    menuCloseBtn.addEventListener('click', fecharMenu);
}

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

/* ------ CADASTRO ------ */
formCadastro?.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!formCadastro.checkValidity()) {
        mostrarFeedback("Preencha todos os campos corretamente.", true);
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

/* ------ MUDANÇA DE PÁGINA (Corrigido para mapear links -> IDs) ------ */
linksMenu.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        let alvo = link.getAttribute("href");

        // Lógica de mapeamento de IDs de link para IDs de seção (Se necessário)
        // Se você usou a Opção A (ajustar todos os HREFs no HTML), esta lógica se torna mais simples:
        
        // Exceção que você já tinha:
        if (alvo === "#participacao") {
          alvo = "#participacao-comunidade";
        } else if (alvo === "#inicial") {
          alvo = "#pagina-inicial";
        } else if (alvo === "#monitoramento") {
          alvo = "#pagina-monitoramento";
        } else if (alvo === "#educacao") {
          alvo = "#pagina-educacao";
        } else if (alvo === "#registro") {
          alvo = "#pagina-registro";
        } else if (alvo === "#servicos") {
          alvo = "#pagina-servicos";
        }
        
        const paginaAlvo = document.querySelector(alvo);
        
        if (!paginaAlvo) {
            console.error("❌ ERRO: página não encontrada:", alvo);
            mostrarFeedback("Erro ao carregar seção.", true);
            return; 
        }

        // remove ativa de todas
        paginas.forEach(p => p.classList.remove("ativa"));
        // adiciona ativa na correta
        paginaAlvo.classList.add("ativa");
        fecharMenu();
    });
});

/* ------ CARROSSEL ------ */
function mostrarSlide(index) {
    slides.forEach(s => s.classList.remove('ativo'));
    if (slides[index]) {
       slides[index].classList.add('ativo');
    }
}

document.addEventListener("DOMContentLoaded", () => {
    if (slides.length > 0) {
        mostrarSlide(slideAtual); // Garante que o primeiro slide apareça
    }
});


btnProximo?.addEventListener('click', () => {
    slideAtual = (slideAtual + 1) % slides.length;
    mostrarSlide(slideAtual);
});

btnAnterior?.addEventListener('click', () => {
    slideAtual = (slideAtual - 1 + slides.length) % slides.length;
    mostrarSlide(slideAtual);
});

if (slides.length > 1) {
    setInterval(() => {
        slideAtual = (slideAtual + 1) % slides.length;
        mostrarSlide(slideAtual);
    }, 7000);
}


/* ------ REGISTRO DE CONSUMO ------ */
const formRegistro = document.getElementById('form-registro');
const tabelaRegistros = document.querySelector('#tabela-registros tbody');

const dadosFicticios = [
    { data: "2025-09-01", quantidade: 150 },
    { data: "2025-09-02", quantidade: 162 },
    { data: "2025-09-03", quantidade: 148 },
    { data: "2025-09-04", quantidade: 172 },
    { data: "2025-09-05", quantidade: 160 },
];

// Preencher tabela com dados de exemplo (tabela de Monitoramento)
document.addEventListener("DOMContentLoaded", () => {
    const tabelaMonitoramento = document.querySelector('#pagina-monitoramento .tabela-monitoramento tbody');
    // A tabela de monitoramento já tem dados no HTML, mas se precisasse ser preenchida aqui:
    // dadosFicticios.forEach(reg => { /* ... */ });
    
    // Preencher a tabela VAZIA de Registros (que aceita novos dados)
    dadosFicticios.forEach(reg => {
        const tr = document.createElement("tr");
        tr.innerHTML = `<td>${reg.data}</td><td>${reg.quantidade} L</td>`;
        tabelaRegistros?.appendChild(tr);
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
    // 💡 CORRIGIDO: Uso correto de template literal (crase `)
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

/* ------ FORMULÁRIO PARA MULHERES ------ */
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
            console.log("Formulário enviado (mulheres):", { nome, email, mensagem });
            mostrarFeedback("Mensagem enviada com sucesso!", false);
            formMulheres.reset();
        });
    }
});


// ===================================================================
// PARTICIPAÇÃO DA COMUNIDADE (REVISADO E FUNCIONAL)
// ===================================================================
document.addEventListener("DOMContentLoaded", () => {
    const formIdeia = document.getElementById("form-ideia");
    const lista = document.getElementById("lista-ideias"); // Usando o novo ID do HTML

    // Carregar ideias do localStorage
    let ideiasSalvas = [];
    try {
        ideiasSalvas = JSON.parse(localStorage.getItem("ecoWaterIdeias")) || [];
    } catch (e) {
        console.error("Erro ao carregar ideias do localStorage:", e);
    }

    // Função para renderizar a lista no HTML
    function atualizarLista() {
        if (!lista) return; // Se a lista não existir, encerra
        lista.innerHTML = "";
        ideiasSalvas.forEach(i => {
            const li = document.createElement("li");
            // Formatação: Nome em negrito se existir
            li.innerHTML = `
                ${i.nome ? `<strong>${i.nome}:</strong> ` : ''}
                ${i.texto}
            `;
            lista.appendChild(li);
        });
    }

    // Renderiza a lista inicial
    atualizarLista();

    if (formIdeia) {
        formIdeia.addEventListener("submit", (e) => {
            e.preventDefault();
            const nome = document.getElementById("nomeIdeia").value.trim();
            const texto = document.getElementById("textoIdeia").value.trim();

            if (!texto) {
                mostrarFeedback("Digite sua ideia!", true);
                return;
            }

            // Adiciona nova ideia
            ideiasSalvas.unshift({ nome, texto }); // unshift: adiciona no início
            localStorage.setItem("ecoWaterIdeias", JSON.stringify(ideiasSalvas));

            // Atualiza o display e limpa o formulário
            atualizarLista();
            formIdeia.reset();
            mostrarFeedback("Ideia enviada! Obrigado pela sua contribuição.");
        });
    }
});




