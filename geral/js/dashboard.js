document.addEventListener('DOMContentLoaded', () => {
  const startButton = document.getElementById('startButton');
  const resetButton = document.getElementById('resetButton');
  const timerDisplay = document.querySelector('.timer-display');
  const resetCountSpan = document.getElementById('resetCount'); 

  // Som de aviso
  const sound = new Audio('../images/alerta.mp3');
  sound.preload = 'auto';

  const initialTime = 25 * 60 * 1000; // 25 minutos
  let remainingTime = initialTime;
  let timerInterval;
  let resetCount = 0;

  function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }

  function startTimer() {
    if (startButton.textContent === 'Iniciar') {
      startButton.textContent = 'Pausar';

      timerInterval = setInterval(() => {
        remainingTime -= 1000;

        if (remainingTime <= 0) {
          clearInterval(timerInterval);
          startButton.textContent = 'Iniciar';
          remainingTime = 0;
          timerDisplay.textContent = formatTime(remainingTime);

          // Toca o som de aviso!
          sound.load();
          sound.play().catch((error) => {
            console.error('Erro ao tentar reproduzir o som:', error);
          });
          
          resetCount++;
          resetCountSpan.textContent = resetCount;

          // **ALTERAÇÃO AQUI: Reseta o timer automaticamente**
          resetTimer(); 
        } else {
          timerDisplay.textContent = formatTime(remainingTime);
        }
      }, 1000);

    } else {
      startButton.textContent = 'Iniciar';
      clearInterval(timerInterval);
    }
  }

  function resetTimer() {
    clearInterval(timerInterval);
    startButton.textContent = 'Iniciar';
    remainingTime = initialTime;
    timerDisplay.textContent = formatTime(remainingTime);
  }

  startButton.addEventListener('click', startTimer);
  resetButton.addEventListener('click', resetTimer);

  timerDisplay.textContent = formatTime(initialTime);
});