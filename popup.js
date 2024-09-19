console.log('popup.js loaded');

document.addEventListener('DOMContentLoaded', function () {
    console.log('DOMContentLoaded event fired');
    const accountList = document.getElementById('accountList');

    // Load saved accounts from storage
    async function loadAccounts() {
        console.log('Loading accounts from storage');
        const result = await browser.storage.local.get('accounts');
        const accounts = result.accounts || [];
        console.log('Accounts loaded:', accounts);

        if (!Array.isArray(accounts)) {
            console.error('Accounts is not an array:', accounts);
            return;
        }

        accountList.innerHTML = accounts.map(acc => `
            <div class="account-item">
                <ul class="account-details">
                    <li>Num: ${acc.number}</li>
                    <li>Role: ${acc.role}</li>
                    <li>Name: ${acc.name}</li>
                    <li><a class="material-button" href="https://signin.aws.amazon.com/switchrole?account=${acc.number}&roleName=${acc.role}&displayName=${acc.name}">Switch</a></li>
                </ul>
            </div>
        `).join('');
    }

    function resizeBody() {
        console.log('Resizing body');
        document.body.style.height = document.body.scrollHeight + 'px';
    }

    resizeBody();

    // Resize body on content change
    const observer = new MutationObserver(resizeBody);
    observer.observe(accountList, { childList: true, subtree: true });

    // Load accounts on popup open
    loadAccounts();
});