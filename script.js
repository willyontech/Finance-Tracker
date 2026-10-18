let transactions=
JSON.parse(localStorage.getItem('myFinance')) || [];
const form =document.getElementById('balance')
const incomeEl = document.getElementById('income');
const expensesEl = document.getElementById('expenses');
const list = document.getElementById('transactions-list');

console.log('Finance Tracker loaded', transactions.length);

// save data
function saveData() {
    localStorage.setItem('myFinance', JSON.stringify(transactions));
}

// calculate balance
function updateDashboard() {
    let income = 0;
    let expense = 0;

    for (let t of transactions) {
        if (t.type === 'income') {
            income += t.amount;
        } else {
            expense += t.amount;
        }
    }

    let balance = income - expense;

    balanceEl.textContent = balance.toLocaleString('en-RW') + ' RWF';
    incomeEl.textContent = income.toLocaleString('en-RW') + ' RWF';
    expensesEl.textContent = expense.toLocaleString('en-RW') + ' RWF';
}

// This function shows all transactions
function showTransactions() {
    if (transactions.length === 0) {
        list.innerHTML = '<tr><td colspan="5" class="text-center">No transactions yet</td></tr>';
        return;
    }

    list.innerHTML = '';
    // show newest first
    let sorted = [...transactions].reverse();

    for (let t of sorted) {
        let row = `
            <tr>
                <td>${t.date}</td>
                <td>${t.category}</td>
                <td class="${t.type}">${t.type === 'income' ? '+' : '-'} ${t.amount.toLocaleString('en-RW')} RWF</td>
                <td>${t.desc}</td>
                <td><button onclick="deleteTx(${t.id})" style="background:#ef4444; padding:5px 10px;">Delete</button></td>
            </tr>
        `;
        list.innerHTML += row;
    }
}

// delete transaction
function deleteTx(id) {
    if (confirm('Are you sure you want to delete?')) {
        transactions = transactions.filter(t => t.id !== id);
        saveData();
        updateDashboard();
        showTransactions();
    }
}

// add new transaction
form.addEventListener('submit', function(e) {
    e.preventDefault();

    let type = document.getElementById('type').value;
    let category = document.getElementById('category').value;
    let amount = parseFloat(document.getElementById('amount').value);
    let desc = document.getElementById('desc').value.trim();
    let date = document.getElementById('date').value;

    if (!amount || amount <= 0) {
        alert('Please enter valid amount');
        return;
    }

    if (!desc) {
        alert('Please enter description');
        return;
    }

    let newTx = {
        id: Date.now(),
        type: type,
        category: category,
        amount: amount,
        desc: desc,
        date: date || new Date().toLocaleDateString()
    };

    transactions.push(newTx);
    saveData();
    updateDashboard();
    showTransactions();

    form.reset();
    document.getElementById('desc').focus();
});

// load on start
updateDashboard();
showTransactions();