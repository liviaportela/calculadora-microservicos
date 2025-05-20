document.addEventListener('DOMContentLoaded', async () => {
    const form = document.getElementById('calcForm');
    const resultDiv = document.getElementById('result');
    const errorDiv = document.getElementById('error');

    let serviceUrls;
    try {
        const response = await fetch('/api/config');
        if (!response.ok) throw new Error('Erro ao carregar configurações');
        serviceUrls = await response.json();
    } catch (error) {
        errorDiv.textContent = 'Erro ao carregar configurações';
        return;
    }

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const a = parseFloat(form.querySelector('input[name="a"]').value);
        const b = parseFloat(form.querySelector('input[name="b"]').value);
        const operation = form.querySelector('select[name="operation"]').value;

        resultDiv.textContent = '';
        errorDiv.textContent = '';

        if (isNaN(a) || isNaN(b)) {
            errorDiv.textContent = 'Parâmetros inválidos';
            return;
        }

        if (!serviceUrls[operation]) {
            errorDiv.textContent = 'Operação inválida';
            return;
        }

        try {
            const response = await fetch(serviceUrls[operation], {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ a, b })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Erro na requisição');
            }

            const data = await response.json();
            resultDiv.textContent = `Resultado: ${data.result}`;
        } catch (error) {
            errorDiv.textContent = error.message;
        }
    });
});