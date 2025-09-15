window.addEventListener('DOMContentLoaded', () => {
  const output = document.querySelector('.output');

  const commands = {
    help: () => 
      `Available commands:\n- about\n- projects\n- contact\n- clear\n`,
    about: () => 
      'Hi! I am a passionate developer who loves creating terminal-style portfolios and clean code.',
    contact: () => 
      'Email: testing@example.com\nLinkedIn: https://linkedin.com/in/yourprofile',
    projects: async () => {
      const data = [
        { name: 'Portfolio Site', description: 'A terminal-style personal portfolio.' },
        { name: 'Weather App', description: 'A real-time weather forecasting app.' }
      ];
      return data.map(p => `- ${p.name}: ${p.description}`).join('\n');
    },
    clear: () => {
      output.innerHTML = '';
      return '';
    }
  };

  function createInputLine() {
    const inputLine = document.createElement('div');
    inputLine.classList.add('input-line');

    const prompt = document.createElement('span');
    prompt.classList.add('prompt');
    prompt.textContent = 'guest@portfolio:~$';

    const input = document.createElement('input');
    input.type = 'text';
    input.autocomplete = 'off';
    input.spellcheck = false;
    input.focus();

    input.addEventListener('keydown', async (e) => {
      if (e.key === 'Enter') {
        const command = input.value.trim();
        // Freeze input so it looks permanent
        input.disabled = true;

        let result;
        if (commands[command]) {
          result = await commands[command]();
        } else {
          result = `Command not found: ${command}`;
        }

        if (result) {
          const resultDiv = document.createElement('div');
          resultDiv.innerHTML = result.replace(/\n/g, '<br>');
          output.appendChild(resultDiv);
        }

        createInputLine(); // new prompt for next command
        output.scrollTop = output.scrollHeight;
      }
    });

    inputLine.appendChild(prompt);
    inputLine.appendChild(input);
    output.appendChild(inputLine);
    input.focus();
  }

  // Start with first input line
  createInputLine();
});


// Always focus the latest input when clicking anywhere
document.addEventListener('click', () => {
  const inputs = document.querySelectorAll('.input-line input');
  if (inputs.length > 0) {
    inputs[inputs.length - 1].focus(); // focus last input
  }
});
