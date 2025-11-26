// script.js - Fungsionalitas untuk Portable Tracker Material

document.addEventListener('DOMContentLoaded', function() {
    // Deteksi halaman saat ini
    const currentPage = window.location.pathname.split('/').pop();
    
    // Inisialisasi berdasarkan halaman
    if (currentPage === 'index.html' || currentPage === '' || currentPage === '/') {
        initLandingPage();
    } else if (currentPage === 'login.html') {
        initLoginPage();
    } else if (currentPage === 'register.html') {
        initRegisterPage();
    } else if (currentPage === 'forgot-password.html') {
        initForgotPasswordPage();
    }

    // Fungsi untuk inisialisasi landing page
    function initLandingPage() {
        // Navbar scroll effect
        const navbar = document.querySelector('.navbar');
        
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Smooth scrolling untuk anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Animasi scroll reveal
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Element yang akan di-animate
        const animateElements = document.querySelectorAll('.feature-card, .stat-card, .contact-item');
        animateElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });

        console.log('Landing Page initialized successfully');
    }

    // Fungsi untuk inisialisasi halaman login
    function initLoginPage() {
        const loginForm = document.getElementById('loginForm');
        const usernameInput = document.getElementById('username');
        const passwordInput = document.getElementById('password');
        const rememberCheckbox = document.getElementById('remember');
        const forgotPasswordLink = document.getElementById('forgotPassword');
        const registerLink = document.getElementById('registerLink');

        checkRememberedLogin();

        if (loginForm) {
            loginForm.addEventListener('submit', function(e) {
                e.preventDefault();
                handleLogin();
            });
        }

        if (forgotPasswordLink) {
            forgotPasswordLink.addEventListener('click', function(e) {
                e.preventDefault();
                window.location.href = 'forgot-password.html';
            });
        }

        if (registerLink) {
            registerLink.addEventListener('click', function(e) {
                e.preventDefault();
                window.location.href = 'register.html';
            });
        }

        function handleLogin() {
            const username = usernameInput.value.trim();
            const password = passwordInput.value;
            const remember = rememberCheckbox.checked;

            if (!username || !password) {
                showMessage('Please fill in all fields', 'error');
                return;
            }

            simulateLogin(username, password, remember);
        }

        function simulateLogin(username, password, remember) {
            const submitBtn = loginForm.querySelector('.btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Logging in...';
            submitBtn.disabled = true;

            setTimeout(() => {
                if (username === 'demo' && password === 'password') {
                    if (remember) {
                        localStorage.setItem('rememberedUsername', username);
                    } else {
                        localStorage.removeItem('rememberedUsername');
                    }

                    sessionStorage.setItem('isLoggedIn', 'true');
                    sessionStorage.setItem('currentUser', username);
                    
                    showMessage('Login successful! Redirecting to dashboard...', 'success');
                    
                    setTimeout(() => {
                        // Redirect ke dashboard
                        window.location.href = '../Dashboard/dashboard.html';
                    }, 1500);
                } else {
                    showMessage('Invalid username or password', 'error');
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }
            }, 1500);
        }
    }

    // Fungsi untuk inisialisasi halaman register
    function initRegisterPage() {
        const registerForm = document.getElementById('registerForm');
        const loginLink = document.getElementById('loginLink');

        if (registerForm) {
            registerForm.addEventListener('submit', function(e) {
                e.preventDefault();
                handleRegister();
            });
        }

        if (loginLink) {
            loginLink.addEventListener('click', function(e) {
                e.preventDefault();
                window.location.href = 'login.html';
            });
        }

        function handleRegister() {
            const fullName = document.getElementById('fullName').value.trim();
            const email = document.getElementById('email').value.trim();
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const agreeTerms = document.getElementById('agreeTerms').checked;

            // Validasi
            if (!fullName || !email || !username || !password || !confirmPassword) {
                showMessage('Please fill in all fields', 'error');
                return;
            }

            if (!isValidEmail(email)) {
                showMessage('Please enter a valid email address', 'error');
                return;
            }

            if (password.length < 6) {
                showMessage('Password must be at least 6 characters long', 'error');
                return;
            }

            if (password !== confirmPassword) {
                showMessage('Passwords do not match', 'error');
                return;
            }

            if (!agreeTerms) {
                showMessage('Please agree to the terms and conditions', 'error');
                return;
            }

            simulateRegistration(fullName, email, username, password);
        }

        function simulateRegistration(fullName, email, username, password) {
            const submitBtn = registerForm.querySelector('.btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Creating Account...';
            submitBtn.disabled = true;

            setTimeout(() => {
                // Simpan data user
                const userData = {
                    fullName,
                    email,
                    username,
                    password: btoa(password),
                    registeredAt: new Date().toISOString()
                };

                localStorage.setItem(`user_${username}`, JSON.stringify(userData));
                
                showMessage('Registration successful! Redirecting to login...', 'success');
                
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 2000);
            }, 2000);
        }
    }

    // Fungsi untuk inisialisasi halaman lupa password
    function initForgotPasswordPage() {
        const forgotPasswordForm = document.getElementById('forgotPasswordForm');
        const loginLink = document.getElementById('loginLink');
        const backToLogin = document.getElementById('backToLogin');

        if (forgotPasswordForm) {
            forgotPasswordForm.addEventListener('submit', function(e) {
                e.preventDefault();
                handleForgotPassword();
            });
        }

        if (loginLink) {
            loginLink.addEventListener('click', function(e) {
                e.preventDefault();
                window.location.href = 'login.html';
            });
        }

        if (backToLogin) {
            backToLogin.addEventListener('click', function(e) {
                e.preventDefault();
                window.location.href = 'login.html';
            });
        }

        function handleForgotPassword() {
            const email = document.getElementById('email').value.trim();

            if (!email) {
                showMessage('Please enter your email address', 'error');
                return;
            }

            if (!isValidEmail(email)) {
                showMessage('Please enter a valid email address', 'error');
                return;
            }

            simulatePasswordReset(email);
        }

        function simulatePasswordReset(email) {
            const submitBtn = forgotPasswordForm.querySelector('.btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            setTimeout(() => {
                showMessage(`Password reset instructions have been sent to ${email}`, 'success');
                
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 3000);
                
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        }
    }

    // Fungsi untuk memeriksa dan mengisi data login yang diingat
    function checkRememberedLogin() {
        const rememberedUsername = localStorage.getItem('rememberedUsername');
        const usernameInput = document.getElementById('username');
        const rememberCheckbox = document.getElementById('remember');
        
        if (rememberedUsername && usernameInput && rememberCheckbox) {
            usernameInput.value = rememberedUsername;
            rememberCheckbox.checked = true;
        }
    }

    // Fungsi untuk menampilkan pesan
    function showMessage(message, type) {
        const existingMessage = document.querySelector('.message');
        if (existingMessage) {
            existingMessage.remove();
        }

        const messageEl = document.createElement('div');
        messageEl.className = `message message-${type}`;
        messageEl.textContent = message;

        messageEl.style.padding = '10px';
        messageEl.style.margin = '10px 0';
        messageEl.style.borderRadius = '5px';
        messageEl.style.textAlign = 'center';
        messageEl.style.fontWeight = 'bold';

        switch(type) {
            case 'error':
                messageEl.style.backgroundColor = 'rgba(255, 0, 0, 0.1)';
                messageEl.style.color = '#ff6b6b';
                messageEl.style.border = '1px solid #ff6b6b';
                break;
            case 'success':
                messageEl.style.backgroundColor = 'rgba(0, 255, 0, 0.1)';
                messageEl.style.color = '#51cf66';
                messageEl.style.border = '1px solid #51cf66';
                break;
            case 'info':
                messageEl.style.backgroundColor = 'rgba(0, 0, 255, 0.1)';
                messageEl.style.color = '#339af0';
                messageEl.style.border = '1px solid #339af0';
                break;
        }

        const form = document.querySelector('form');
        if (form) {
            form.insertBefore(messageEl, form.firstChild);
        }

        setTimeout(() => {
            if (messageEl.parentNode) {
                messageEl.remove();
            }
        }, 5000);
    }

    // Fungsi utilitas untuk validasi email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Ekspor fungsi untuk penggunaan di tempat lain
    window.appModule = {
        showMessage,
        isValidEmail,
        initLandingPage,
        initLoginPage
    };
});