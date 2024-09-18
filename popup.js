const form = document.getElementById('roleForm');
const accountList = document.getElementById('accountList');

// Load saved accounts on popup open
function loadAccounts() {
    browser.storage.local.get("accounts").then((result) => {
        const accounts = result.accounts || [];
        accountList.innerHTML = accounts.map(acc => `
      <div class="account-item">
        <p><a href="https://signin.aws.amazon.com/switchrole?account=${acc.number}&roleName=${acc.role}&displayName=${acc.name}">${acc.name}: ${acc.number}: ${acc.role}</a></p>
      </div>
    `).join('');
    });
}

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const accountName = document.getElementById('accountName').value;
    const accountNumber = document.getElementById('accountNumber').value;
    const roleName = document.getElementById('roleName').value;

    browser.storage.local.get("accounts").then((result) => {
        const accounts = result.accounts || [];
        accounts.push({ name: accountName, number: accountNumber, role: roleName });

        browser.storage.local.set({ accounts }).then(() => {
            loadAccounts();
            form.reset();
        });
    });
});

// // Switch to the selected AWS role
// function switchRole(accountNumber) {
//     console.log("Switch role clicked for account:", accountNumber);
//     browser.storage.local.get("accounts").then((result) => {
//         const accounts = result.accounts || [];
//         const account = accounts.find(acc => acc.number === accountNumber);

//         if (account) {
//             const roleName = account.role || 'default-role';  // Default role if not provided
//             const displayName = account.name;
//             const switchRoleUrl = `https://signin.aws.amazon.com/switchrole?account=${accountNumber}&roleName=${roleName}&displayName=${displayName}`;
//             console.log("Switching role to URL:", switchRoleUrl);
//             window.open(switchRoleUrl, '_blank');  // Open in a new tab
//         } else {
//             console.log("Account not found.");
//         }
//     });
// }// Load accounts on popup open
document.addEventListener('DOMContentLoaded', loadAccounts);
