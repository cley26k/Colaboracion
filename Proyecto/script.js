document.addEventListener('DOMContentLoaded', function() {
    // ----------------------------------------------------
    // Lógica de Colabo-Bot, tu guía y bromista personal
    // ----------------------------------------------------
    const collaboBotContainer = document.getElementById('collabo-bot-container');
    const collaboBotDialogue = document.getElementById('collabo-bot-dialogue');
    const collaboBotImage = document.querySelector('.collabo-bot-image');

    const generalMessages = [
        "¡Hola! Soy Colabo-Bot, tu amigo en esta aventura. ¡Pregúntame lo que quieras... o no!",
        "La colaboración es como un buen código: ¡funciona mejor con varias manos!",
        "¿Sabías que la unión hace la fuerza? ¡Y los memes!",
        "¡No te preocupes si algo parece difícil, colaborar es la clave!",
        "Un equipo que colabora unido... ¡permanece unido y con café!",
        "Mi misión es ayudarte. ¡Y quizás soltar una broma de vez en cuando!",
        "¡Explora sin miedo! Detrás de cada click hay un mundo de conocimiento... o mi cara sonriente.",
        "Piensen dos cabezas mejor que una. ¡Imagina cuántas ideas con diez!",
        "¡A veces la mejor colaboración es conmigo mismo... para pensar en más bromas!",
        "La colaboración es la sinfonía de las mentes. ¡Y a veces, el caos organizado!",
        "¡Espero que estés disfrutando! Si no, dímelo... ¡y busco un chiste mejor!",
        "Mi circuito principal es la ayuda, mi circuito secundario... ¡los snacks de RAM!",
        "¿Quieres un consejo sobre colaboración? ¡No te la juegues solo cuando hay un equipo!",
        "¡Trabajar juntos es como usar git. ¡A veces hay conflictos, pero al final mergeas bien!",
        "¡Colaborar es como ser un superhéroe en equipo! Cada uno tiene su poder... el mío es ser carismático.",
        "¡No te olvides de la importancia del feedback! A mí me gusta que me digan 'buen robot'. 😉"
    ];

    const jokeMessages = [
        "¿Por qué el programador se perdió en el desierto? ¡Porque no encontró la ruta!",
        "Hay 10 tipos de persona: quienes saben binario y quienes no.",
        "Mi terapeuta me dijo que dejara de pensar en el futuro. Así que... ¡dejé de usar CSS en Internet Explorer!",
        "¿Qué le dice un HTML a un CSS? Sin ti, soy solo un esqueleto.",
        "¡La colaboración es la solución a todos los problemas... excepto a mi baja batería!",
        "¿Cuál es el colmo de un programador? ¡Que su mamá le diga 'Apaga la computadora que se gasta la internet!'",
        "Estaba a punto de contar un chiste sobre bases de datos, pero creo que no es el lugar para hacer un SQL.",
        "Mi software es tan bueno que tiene más bugs que un hotel de cucarachas... ¡es broma!"
    ];

    // Array para controlar que los chistes no se repitan tan seguido
    let lastJokeIndex = -1;
    let lastGeneralIndex = -1;

    
    function speak(message, isJoke = false) {
        collaboBotDialogue.textContent = message;
        collaboBotDialogue.classList.add('active'); // Muestra el globo de diálogo
        
        // Optional: play a sound for jokes
        // if (isJoke) { /* play joke sound */ }
        
        // Calcula duración basada en la longitud del mensaje
        const baseTime = isJoke ? 10000 : 7000; // Tiempo base aumentado
        const additionalTime = Math.max(0, (message.length - 50) * 50); // 50ms por cada carácter extra después de 50
        const totalTime = baseTime + additionalTime;
        
        // Limpiar cualquier timeout anterior para evitar solapamientos
        if (collaboBotDialogue.__hideTimeout) {
            clearTimeout(collaboBotDialogue.__hideTimeout);
        }

        collaboBotDialogue.__hideTimeout = setTimeout(() => {
            collaboBotDialogue.classList.remove('active'); // Oculta el globo de diálogo
            collaboBotDialogue.__hideTimeout = null; // Limpiar referencia
        }, totalTime);
    }

    // Función para mostrar un mensaje general aleatorio
    function showRandomGeneralMessage() {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * generalMessages.length);
        } while (newIndex === lastGeneralIndex);
        lastGeneralIndex = newIndex;
        speak(generalMessages[newIndex]);
    }

    // Función para mostrar un chiste aleatorio
    function showRandomJoke() {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * jokeMessages.length);
        } while (newIndex === lastJokeIndex);
        lastJokeIndex = newIndex;
        speak(jokeMessages[newIndex], true);
    }

    // Activar Colabo-Bot
    setTimeout(() => {
        collaboBotContainer.classList.add('visible');
        speak("¡Hola! Soy Colabo-Bot, tu amigo en esta aventura. ¡Listo para colaborar!");
    }, 1000); // Aparece después de 1 segundo

    // Colabo-Bot soltando mensajes o bromas automáticamente
    let botInteractionTimer;
    function startBotInteractionTimer() {
        clearTimeout(botInteractionTimer); // Limpiar cualquier timer existente
        botInteractionTimer = setTimeout(() => {
            if (collaboBotDialogue.classList.contains('active')) {
                // Si ya está hablando, esperar un poco más y luego reintentar el mensaje automático
                startBotInteractionTimer(); 
                return;
            }
            if (Math.random() < 0.3) { // 30% de probabilidad de soltar una broma
                showRandomJoke();
            } else { // 70% de probabilidad de mensaje general
                showRandomGeneralMessage();
            }
            startBotInteractionTimer(); // Reiniciar el timer
        }, 15000 + Math.random() * 10000); // Cada 15-25 segundos
    }
    startBotInteractionTimer(); // Inicia el timer al cargar la página

    // Colabo-Bot reacciona al click
    collaboBotImage.addEventListener('click', () => {
        speak("¡Qué te parece la interfaz! ¿Cool, verdad? 😉");
        startBotInteractionTimer(); // Reinicia el timer al interactuar
    });

    // ----------------------------------------------------
    // Lógica de navegación entre secciones
    // ----------------------------------------------------
    const presentationPage = document.getElementById('presentation-page');
    const contentPage = document.getElementById('content-page');
    const triviaPage = document.getElementById('trivia-page');
    // Ahora los botones de navegación están en la nueva barra .main-navbar
    const navButtons = document.querySelectorAll('.main-navbar .nav-button');

    function showSection(sectionIdToShow) {
        // Ocultar todas las secciones
        presentationPage.classList.add('hidden');
        contentPage.classList.add('hidden');
        triviaPage.classList.add('hidden');

        // Mostrar la sección deseada
        if (sectionIdToShow === 'presentation') {
            presentationPage.classList.remove('hidden');
            speak("¡Bienvenido de nuevo a la portada! Una joyita académica.", false);
        } else if (sectionIdToShow === 'content') {
            contentPage.classList.remove('hidden');
            speak("¡Aquí es donde la magia sucede! Observa cómo todo se conecta, como los buenos equipos.", false);
            // Re-observar para animaciones si se vuelve a la página
            if (contentPageObserver) contentPageObserver.observe(contentPage);
        } else if (sectionIdToShow === 'trivia') {
            triviaPage.classList.remove('hidden');
            speak("¡Es hora de poner a prueba esos cerebritos! A ver si eres un maestro de la colaboración. ¡Mucha suerte!", false);
            // Asegurarse de que la primera pregunta de la trivia se muestre
            if (triviaPage && currentQuestionIndex === 0 && questions.length > 0) {
                 displayQuestion(0);
            }
        }

        // Actualizar el estado de aria-current para accesibilidad y estilos visuales
        navButtons.forEach(button => {
            if (button.dataset.section === sectionIdToShow) {
                button.setAttribute('aria-current', 'page');
            } else {
                button.removeAttribute('aria-current');
            }
        });
    }

    // Event listeners para los botones de navegación
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            showSection(button.dataset.section);
        });
    });

    // Mostrar la página de presentación por defecto al cargar
    showSection('presentation'); // Cambiado a 'presentation' para empezar en la portada

    // ----------------------------------------------------
    // Lógica de la fecha dinámica en la portada y footer
    // ----------------------------------------------------
    const currentDateElement = document.getElementById('current-date');
    const footerDateElement = document.getElementById('footer-date-info');
    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = today.toLocaleDateString('es-ES', options);

    if (currentDateElement) {
        currentDateElement.textContent = formattedDate;
    }
    if (footerDateElement) {
        footerDateElement.textContent = formattedDate;
    }

    // ----------------------------------------------------
    // Animaciones de entrada para el mapa mental (Usando IntersectionObserver)
    // ----------------------------------------------------
    const centralConcept = document.querySelector('.central-concept');
    const branches = document.querySelectorAll('.branch');
    const contentPageObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (centralConcept) {
                    centralConcept.style.opacity = '0';
                    centralConcept.style.transform = 'scale(0.5)';
                    setTimeout(() => {
                        centralConcept.style.transition = 'all 0.8s ease';
                        centralConcept.style.opacity = '1';
                        centralConcept.style.transform = 'scale(1)';
                    }, 200);
                }
                
                branches.forEach((branch, index) => {
                    branch.style.opacity = '0';
                    branch.style.transform = 'translateY(30px)';
                    setTimeout(() => {
                        branch.style.transition = 'all 0.6s ease';
                        branch.style.opacity = '1';
                        branch.style.transform = 'translateY(0)';
                    }, 500 + (index * 150)); // Reducido el delay para que aparezcan más rápido
                });
                contentPageObserver.unobserve(entry.target); // Dejar de observar después de la primera vez
            }
        });
    }, { threshold: 0.1 }); // Se activa cuando el 10% del elemento es visible

    if (contentPage) { // Solo si el elemento existe, observa
        contentPageObserver.observe(contentPage);
    }

    // ----------------------------------------------------
    // Lógica de la Trivia
    // ----------------------------------------------------
    const triviaQuestionsContainer = document.getElementById('trivia-questions');
    const triviaResultDiv = document.getElementById('trivia-result');
    const triviaScoreDiv = document.getElementById('trivia-score');
    const restartTriviaBtn = document.getElementById('restart-trivia-btn');

    let currentQuestionIndex = 0;
    let score = 0;
    let answeredQuestions = 0;
    const questions = triviaQuestionsContainer ? triviaQuestionsContainer.querySelectorAll('.question-container') : []; // Manejar caso donde no existe
    const totalQuestions = questions.length;

    function displayQuestion(index) {
        if (questions.length === 0) return; // Salir si no hay preguntas

        questions.forEach((q, i) => {
            q.style.display = (i === index) ? 'block' : 'none';
        });

        // Limpiar estilos y habilitar opciones
        const currentOptions = questions[index].querySelectorAll('.option');
        currentOptions.forEach(opt => {
            opt.classList.remove('correct', 'incorrect');
            opt.style.pointerEvents = 'auto'; // Re-habilitar click
            opt.removeEventListener('click', handleOptionClick); // Eliminar listeners antiguos
            opt.addEventListener('click', handleOptionClick); // Añadir listener nuevo
        });

        triviaResultDiv.style.display = 'none';
        triviaScoreDiv.style.display = 'none';
        restartTriviaBtn.style.display = 'none';
    }

    function handleOptionClick(event) {
        const selectedOption = event.target;
        const isCorrect = selectedOption.dataset.correct === 'true';

        // Deshabilitar todas las opciones para la pregunta actual
        const currentOptions = selectedOption.closest('.options').querySelectorAll('.option');
        currentOptions.forEach(opt => {
            opt.style.pointerEvents = 'none';
            opt.removeEventListener('click', handleOptionClick); // Evitar múltiples clics
        });

        if (isCorrect) {
            selectedOption.classList.add('correct');
            score++;
            speak("¡Genial! ¡Respuesta correcta! ¡Trabajo en equipo!", false);
        } else {
            selectedOption.classList.add('incorrect');
            // Mostrar la respuesta correcta si la incorrecta fue seleccionada
            currentOptions.forEach(opt => {
                if (opt.dataset.correct === 'true') {
                    opt.classList.add('correct');
                }
            });
            speak("Uhm, ¡casi! Pero no te preocupes, ¡la colaboración es práctica! 😄", false);
        }
        answeredQuestions++;

        setTimeout(() => {
            if (currentQuestionIndex < totalQuestions - 1) {
                currentQuestionIndex++;
                displayQuestion(currentQuestionIndex);
            } else {
                showTriviaResults();
            }
        }, 1500); // Pequeño retraso para ver la respuesta
    }

    function showTriviaResults() {
        questions[currentQuestionIndex].style.display = 'none'; // Ocultar última pregunta

        let message = '';
        const percentage = (score / totalQuestions) * 100;

        if (percentage >= 80) {
            message = '🎉 ¡Excelente! Dominas muy bien el tema de colaboración. ¡Eres un líder de equipo!';
        } else if (percentage >= 60) {
            message = '👍 ¡Bien hecho! Tienes buenos conocimientos sobre colaboración. ¡Un esfuerzo notable!';
        } else if (percentage >= 40) {
            message = '📚 No está mal, pero puedes mejorar. Te recomiendo revisar el material nuevamente. ¡Juntos podemos lograrlo!';
        } else {
            message = '💪 ¡Sigue estudiando! La colaboración es un tema fascinante que vale la pena dominar. ¡No te rindas, que la práctica hace al maestro!';
        }

        triviaResultDiv.innerHTML = message;
        triviaScoreDiv.innerHTML = `Tu puntuación: ${score}/${totalQuestions} (${percentage.toFixed(0)}%)`;

        triviaResultDiv.style.display = 'block';
        triviaScoreDiv.style.display = 'block';
        restartTriviaBtn.style.display = 'inline-block';
        speak(`¡Resultados listos! Sacaste ${score} de ${totalQuestions}. ¡Bien hecho!`, false);
    }

    restartTriviaBtn.addEventListener('click', restartTrivia);

    function restartTrivia() {
        currentQuestionIndex = 0;
        score = 0;
        answeredQuestions = 0;
        displayQuestion(currentQuestionIndex); // Mostrar la primera pregunta
        speak("¡Trivia reiniciada! ¡Aceptas el desafío! ¡Me gusta tu espíritu colaborativo! 🚀", false);
    }

    // Inicializar la trivia solo si la sección existe y hay preguntas
    if (triviaPage && questions.length > 0) {
        displayQuestion(currentQuestionIndex);
    }
});
