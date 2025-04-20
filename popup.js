document.addEventListener('DOMContentLoaded', () => {
    // Aqui é pra listar todas as abas
    chrome.tabs.query({}, (tabs) => {
        const lista = document.getElementById('lista-abas');
        lista.innerHTML = '';

        tabs.forEach(tab => {
            const li = document.createElement('li');
            const img = document.createElement('img');
            const link = document.createElement('a');

            img.src = tab.favIconUrl || 'https://www.google.com/s2/favicons?domain_url=' + tab.url;
            link.textContent = tab.title || 'Sem Título';
            link.href = '#';

            link.addEventListener('click', (e) => {
                e.preventDefault();
                chrome.tabs.update(tab.id, { active: true });
                chrome.windows.update(tab.windowId, { focused: true });
            });

            li.appendChild(img);
            li.appendChild(link);
            lista.appendChild(li);
        });
    });

    // Aqui é pra pegar só a aba atual
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        const abaAtual = document.getElementById('aba-atual');
        abaAtual.innerHTML = '';

        const table = document.createElement('li');
        const imag = document.createElement('img');
        const linkImag = document.createElement('a');
        
        imag.src = tabs[0].favIconUrl || 'https://www.google.com/s2/favicons?domain_url=' + tabs[0].url;
        linkImag.textContent = tabs[0].title || 'Sem Título';
        linkImag.href = '#';

        linkImag.addEventListener('click', (e) => {
            e.preventDefault();
            chrome.tabs[0].update(tabs[0].id, { active: true });
            chrome.windows.update(tabs[0].windowId, { focused: true });
        });
        
        table.appendChild(imag);
        table.appendChild(linkImag);
        abaAtual.appendChild(table);
    });
});
