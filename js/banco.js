// Importação dos módulos necessários do Firebase
import { 
    initializeApp 
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";

import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged, 
    updateProfile 
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";

// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDbcAR6rLoyHFiNFS6HgaRnudYCYK2H-LQ",
    authDomain: "maets-5eb14.firebaseapp.com",
    projectId: "maets-5eb14",
    storageBucket: "maets-5eb14.firebasestorage.app",
    messagingSenderId: "1028239878737",
    appId: "1:1028239878737:web:c711456d5d6cd7ca2a6670"
};

// Inicializando Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Referências aos elementos HTML
const modalContainer = document.getElementById('modalContainer');
const modalContent = document.getElementById('modalContent');
const loginBtn = document.getElementById('loginBtn');
const logoutBtn = document.getElementById('logoutBtn');
const dropdown = document.getElementById('dropdown');
const logado = document.getElementById('status-logado');

// Função para abrir o modal
function openModal(content) {
    modalContent.innerHTML = content;
    modalContainer.style.display = 'block';
}

// Função para fechar o modal
function closeModal() {
    modalContainer.style.display = 'none';
}

modalContainer.addEventListener('click', (e) => {
    if (e.target.id === 'modalBackdrop') {
      closeModal();
    } else if (e.target.id === 'closeBtn') {
      closeModal();
    }
  });

// Conteúdo HTML para o modal de login
const loginModalContent = `
    <span id="closeBtn">×</span>
    <h2>Login</h2>
    <form id="loginForm">
        <input type="email" id="loginEmail" placeholder="Email" required>
        <input type="password" id="loginPassword" placeholder="Senha" required>
        <button type="submit">Entrar</button>
    </form>
    <div class="switch-link" id="switchToRegister">Não tem uma conta? Criar agora</div>
`;

// Conteúdo HTML para o modal de registro
const registerModalContent = `
    <span id="closeBtn">×</span>
    <h2>Registrar</h2>
    <form id="registerForm">

        <p>*Por favor, não utilize seus dados reais*</p>

        <label for="regName">Nome:</label>
        <input type="text" id="regName" maxlength="12" required>
        
        <label for="regEmail">Email:</label>
        <input type="email" id="regEmail" required>
        
        <label for="regPassword">Senha:</label>
        <input type="password" id="regPassword" required>
        <button type="submit">Registrar</button>
    </form>
    <div class="switch-link" id="switchToLogin">Já tem uma conta? Entrar</div>
`;

// Ações para abrir o modal de login
loginBtn.addEventListener('click', () => openModal(loginModalContent));

// Delegação de eventos para troca entre os modais e submissão dos formulários
modalContent.addEventListener('click', (e) => {
    if (e.target.id === 'switchToRegister') {
        openModal(registerModalContent); // Abre modal de registro
    } else if (e.target.id === 'switchToLogin') {
        openModal(loginModalContent); // Abre modal de login
    }
});

modalContent.addEventListener('submit', (e) => {
    e.preventDefault();

    const submitButton = e.target.querySelector('button[type="submit"]');
    submitButton.disabled = true; // Desabilita o botão para evitar múltiplos envios

    if (e.target.id === 'loginForm') {
        // Processo de login
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                alert('Login realizado com sucesso!');
                window.location.reload(); // Recarrega a página após login bem-sucedido
            })
            .catch((error) => {
                alert(`Erro ao fazer login: ${error.message}`);
                submitButton.disabled = false; // Habilita o botão novamente em caso de erro
            });
    } else if (e.target.id === 'registerForm') {
        // Processo de registro
        const name = document.getElementById('regName').value;
        const email = document.getElementById('regEmail').value;
        const password = document.getElementById('regPassword').value;

        if (name.length > 12) {
            alert('O nome deve ter no máximo 12 caracteres.');
            submitButton.disabled = false; // Habilita o botão novamente em caso de erro
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                return updateProfile(user, {
                    displayName: name,
                });
            })
            .then(() => {
                alert('Usuário registrado com sucesso!');
                window.location.reload(); // Recarrega a página após registro bem-sucedido
            })
            .catch((error) => {
                alert(`Erro no registro: ${error.message}`);
                submitButton.disabled = false; // Habilita o botão novamente em caso de erro
            });
    }
});

// Logout
logoutBtn.addEventListener('click', () => {
    signOut(auth)
        .then(() => {
            alert('Você saiu com sucesso!');
            window.location.reload(); // Recarrega a página após logout
        })
        .catch((error) => {
            alert('Erro ao sair: ' + error.message);
        });
});

// Monitorar mudanças no estado de autenticação
onAuthStateChanged(auth, (user) => {
    if (user) {
        // Usuário autenticado
        const userName = user.displayName || "Usuário sem nome";
        document.getElementById('status').innerText = `${userName}`;
        loginBtn.style.display = "none"; // Esconde o botão de login
        logado.style.display = 'flex'; // Exibe o botão "logado"

        // Garante que o dropdown funcione corretamente
        document.addEventListener('click', (e) => {
            if (!dropdown.contains(e.target) && e.target !== logado) {
                dropdown.style.display = "none"; // Fecha o dropdown
            }
        });

        logado.addEventListener('click', (e) => {
            e.stopPropagation(); // Impede que o clique feche o dropdown imediatamente
            dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
        });
    } else {
        // Estado não autenticado
        document.getElementById('status').innerText = '';
        loginBtn.style.display = "block"; // Exibe o botão de login
        logado.style.display = 'none'; // Esconde o botão "logado"
        dropdown.style.display = 'none'; // Esconde o dropdown
    }
});
