document.querySelector('.button.new')
.addEventListener('click', event => {
    Modal.open()
});

document.querySelector('.button.cancel')
.addEventListener('click', event => {
    Modal.close()
});

const Modal = {
    open() {
        document.querySelector('.modal-overlay')
        .classList.add('active');
    },
    close() {
        document.querySelector('.modal-overlay')
        .classList.remove('active');
    }
}

const Transaction = {
    all: transactions = [

        { 
            description: 'Luz',
            amount: -50000,
            date: '23/01/2021',
        },
        { 
            description: 'Criação website',
            amount: 500000,
            date: '25/02/2021',
        },
        { 
            description: 'Internet',
            amount: -20000,
            date: '09/04/2021',
        }
    ],

    add(transaction) {
        Transaction.all.push(transaction)
         
        App.reload();
    },

    remove(index) {
        Transaction.all.splice(index, 1);

        App.reload();
    }, 

    incomes() {
        let income = 0;

        Transaction.all.forEach(transaction => {
            if (transaction.amount > 0 ) {
                income += transaction.amount;
            }
        });
        
        return income; 
    },
    
    expenses() {
        let expense = 0;

        Transaction.all.forEach(transaction => {
            if (transaction.amount < 0 ) {
                expense += transaction.amount;
            }
        });
        
        return expense;
    },
    
    total() {
        return Transaction.incomes() + Transaction.expenses();
    }
}

const DOM = {
    transactionsContainer: document.querySelector('#data-table tbody'),
    
    addTransaction(transaction, index) {
        const tr = document.createElement('tr');
        tr.innerHTML = DOM.innerHTMLTransaction(transaction); 
        
        DOM.transactionsContainer.appendChild(tr);

        
    },
    
    innerHTMLTransaction(transaction) {
        const CSSclass = transaction.amount > 0 ? 'income' : 'expense'

        const amount = Utils.formatCurrency(transaction.amount)

        const html = `
        
            <td class="description">${transaction.description}</td>
            <td class="${CSSclass}">${amount}</td>
            <td class="date">${transaction.date}</td>
            <td>
                <img src="assets/minus.svg" alt="Remover transação" />
            </td>
        `
        return html;
    },

    updateBalance() {
        document.getElementById('incomeDisplay')
        .innerHTML = Utils.formatCurrency(Transaction.incomes());

        document.getElementById('expenseDisplay')
        .innerHTML = Utils.formatCurrency(Transaction.expenses());

        document.getElementById('totalDisplay')
        .innerHTML = Utils.formatCurrency(Transaction.total());
    },

    clearTransactions() {
        DOM.transactionsContainer.innerHTML = '';
    }

}

const Utils = {
    formatAmount(value) {
        value = Number(value) * 100
    },

    formatDate(date) {
        console.log(date)
    },

    formatCurrency(value) {
        const signal = Number(value) < 0 ? '-' : ''; 

        value = String(value).replace(/\D/g, '');
        value = Number(value) / 100;
        
        value = value.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
        
        return signal + value;
    }
}

const Form = {
    description: document.querySelector('input#description'),
    amount: document.querySelector('input#amount'),
    date: document.querySelector('input#date'),

    getValues() {
        return {
            description: Form.description.value,
            amount: Form.amount.value, 
            date: Form.date.value
        }
    }, 

    formatData() {
        console.log('formatar os dados')
    },
    
    validateFields() {
        const {description, amount, date} = Form.getValues();

        if(description.trim() === "" ||
            amount.trim() === "" || 
            date.trim() === "") {
                throw new Error("Por favor, preencha todos os campos")
        }

        console.log(Form.getValues());
    },

    formatValues() {
        let {description, amount, date} = Form.getValues();

        amount = Utils.formatAmount(amount);

        date = Utils.formatDate(date);
    },
    
    submit(event) {
        event.preventDefault()

        try {
            // Form.validateFields()
            // Formatar os dados para salvar
            Form.formatValues()
            // Salvar 
            // apagar os dados do formulario 
            // modal fechar

        } catch (error) {
            alert(error.message)
        }

        
    }
}

const App = {
    init() {
        Transaction.all.forEach(transaction => {
            DOM.addTransaction(transaction)
        });
        
        DOM.updateBalance();
    },

    reload() {
        DOM.clearTransactions()
        App.init()
    },

}

App.init()
