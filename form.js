 // Navegación móvil
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');

        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        // Cerrar menú al hacer clic en un enlace
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });

        // Validación del formulario
        const form = document.getElementById('contactForm');
        const submitBtn = document.getElementById('submitBtn');
        const successMessage = document.getElementById('successMessage');

        // Función para validar email
        function validateEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }

        // Función para validar teléfono
        function validatePhone(phone) {
            const re = /^[\+]?[1-9][\d]{0,15}$/;
            return re.test(phone.replace(/\s/g, ''));
        }

        // Función para mostrar error
        function showError(fieldId, message) {
            const field = document.getElementById(fieldId);
            const errorDiv = document.getElementById(fieldId + 'Error');
            
            field.classList.add('error');
            errorDiv.textContent = message;
            errorDiv.classList.add('show');
        }

        // Función para limpiar error
        function clearError(fieldId) {
            const field = document.getElementById(fieldId);
            const errorDiv = document.getElementById(fieldId + 'Error');
            
            field.classList.remove('error');
            errorDiv.classList.remove('show');
        }

        // Limpiar errores al escribir
        form.addEventListener('input', function(e) {
            clearError(e.target.id);
        });

        // Validación en tiempo real
        document.getElementById('email').addEventListener('blur', function() {
            if (this.value && !validateEmail(this.value)) {
                showError('email', 'Por favor ingresa un email válido');
            }
        });

        document.getElementById('telefono').addEventListener('blur', function() {
            if (this.value && !validatePhone(this.value)) {
                showError('telefono', 'Por favor ingresa un teléfono válido');
            }
        });

        // Envío del formulario
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;

            // Validar campos requeridos
            const requiredFields = ['nombre', 'apellido', 'email', 'asunto', 'mensaje'];
            
            requiredFields.forEach(fieldId => {
                const field = document.getElementById(fieldId);
                if (!field.value.trim()) {
                    showError(fieldId, `Este campo es requerido`);
                    isValid = false;
                }
            });

            // Validar email
            const email = document.getElementById('email').value;
            if (email && !validateEmail(email)) {
                showError('email', 'Por favor ingresa un email válido');
                isValid = false;
            }

            // Validar teléfono si está presente
            const telefono = document.getElementById('telefono').value;
            if (telefono && !validatePhone(telefono)) {
                showError('telefono', 'Por favor ingresa un teléfono válido');
                isValid = false;
            }

            if (isValid) {
                // Simular envío
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';

                setTimeout(() => {
                    successMessage.classList.add('show');
                    form.reset();
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar Mensaje';
                    
                    // Ocultar mensaje después de 5 segundos
                    setTimeout(() => {
                        successMessage.classList.remove('show');
                    }, 5000);
                }, 2000);
            }
        });