/**
 * Conta Comigo - Landing Page
 * Todos os arquivos na mesma pasta
 */

// ============================================
// CONSTANTES
// ============================================

const WHATSAPP_NUMBER = '556185710321';  // Telefone atualizado: (61) 8571-0321
const INSTAGRAM_URL = 'https://www.instagram.com/contacomigoservicos.oficial';

const SERVICES = [
    { name: "Hidráulicas", icon: "fa-wrench", desc: "Reparos e instalações hidráulicas" },
    { name: "Elétrica", icon: "fa-bolt", desc: "Manutenção e instalações elétricas" },
    { name: "Pequenos reparos", icon: "fa-tools", desc: "Ajustes rápidos e manutenções" },
    { name: "Troca de chuveiro", icon: "fa-shower", desc: "Substituição segura de chuveiros" },
    { name: "Montagem de móveis", icon: "fa-couch", desc: "Montagem de móveis planejados" },
    { name: "Pinturas", icon: "fa-paint-roller", desc: "Pintura interna e externa" },
    { name: "Serviços de ladrilheiros", icon: "fa-border-all", desc: "Revestimentos e azulejos" },
    { name: "Serralherias", icon: "fa-cog", desc: "Serviços em metal e solda" },
    { name: "Assistência técnica em Imóveis", icon: "fa-home", desc: "Vistorias e manutenção predial" }
];

// ============================================
// FUNÇÕES DE RENDERIZAÇÃO
// ============================================

function renderServices() {
    const grid = document.getElementById('servicesGrid');
    if (!grid) return;

    grid.innerHTML = SERVICES.map(service => `
        <div class="service-card">
            <i class="fas ${service.icon}"></i>
            <h3>${service.name}</h3>
            <p>${service.desc}</p>
        </div>
    `).join('');
}

function populateServiceSelect() {
    const select = document.getElementById('service');
    if (!select) return;

    select.innerHTML = '<option value="" disabled selected>Selecione uma opção</option>' +
        SERVICES.map(service => `<option value="${service.name}">${service.name}</option>`).join('');
}

// ============================================
// FUNÇÕES DE VALIDAÇÃO
// ============================================

function showError(element, message) {
    if (element) {
        element.textContent = message;
        element.classList.add('visible');
    }
}

function clearError(element) {
    if (element) {
        element.textContent = '';
        element.classList.remove('visible');
    }
}

function validateForm(name, service) {
    let isValid = true;
    const nameError = document.getElementById('nameError');
    const serviceError = document.getElementById('serviceError');

    if (!name || name.trim() === '') {
        showError(nameError, 'Por favor, informe seu nome completo.');
        isValid = false;
    } else {
        clearError(nameError);
    }

    if (!service) {
        showError(serviceError, 'Por favor, selecione um tipo de serviço.');
        isValid = false;
    } else {
        clearError(serviceError);
    }

    return isValid;
}

// ============================================
// FUNÇÃO DO FORMULÁRIO
// ============================================

function setupForm() {
    const form = document.getElementById('budgetForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const nameInput = document.getElementById('name');
        const serviceSelect = document.getElementById('service');
        
        const name = nameInput?.value || '';
        const service = serviceSelect?.value || '';

        if (!validateForm(name, service)) {
            return;
        }

        // Mensagem com o novo número de telefone
        const message = `Olá! Meu nome é ${name.trim()}. Tenho interesse no serviço de ${service}. Podemos conversar?`;
        const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    });
}

// ============================================
// ANIMAÇÕES
// ============================================

function setupScrollAnimation() {
    const cards = document.querySelectorAll('.service-card');
    if (cards.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => observer.observe(card));
}

function setupSmoothScroll() {
    const btn = document.querySelector('.btn-primary');
    if (btn) {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector('#budget');
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
}

// ============================================
// INICIALIZAÇÃO
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    renderServices();
    populateServiceSelect();
    setupForm();
    setupScrollAnimation();
    setupSmoothScroll();
});