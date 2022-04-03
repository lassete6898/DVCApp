App = {
    contracts: {},
    init: async () => {
        console.log('Loaded')
        await App.loadEthereum()
        await App.loadAccount()
        await App.loadContracts()
        App.render()
        await App.renderInvestments()
    },
    loadEthereum: async () => {
        if (window.ethereum) {
            App.web3Provider = window.ethereum
            await window.ethereum.request({ method: 'eth_requestAccounts' })
        } else if (window.web3) {
            web3 = new Web3(window.web3.currentProvider)
        } else {
            console.log('No ethereum browser is installed. Try it installing Metamask')
        }
    },
    loadAccount: async () => {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        App.account = accounts[0]
        // var balance = await window.ethereum.request({ method: 'eth_getBalance', params: [App.account, 'latest'] })
        // App.balance = balance
        // console.log(balance)
    },
    loadContracts: async () => {
        const res = await fetch("InvestmentsContract.json")                       //Traigo el contrato en formato JSON
        const investmentsContractJSON = await res.json()                          //Traigo el contrato en formato JSON
        
        App.contracts.investmentsContract = TruffleContract(investmentsContractJSON)    // Convierto el JSON a Truffle
        App.contracts.investmentsContract.setProvider(App.web3Provider)           // Conectamos con MetaMask
        App.investmentsContract = await App.contracts.investmentsContract.deployed()    // Usamos el contrato desplegado
    },
    render: () => {
        console.log(App.account)
        document.getElementById('account').innerText = App.account
        // document.getElementById('balance').innerHTML = App.balance
    },
    renderInvestments: async () => {
        const investmentCounter = await App.investmentsContract.investmentCounter()
        const investmentCounterNumber = investmentCounter.toNumber()
        // console.log(investmentCounterNumber)

        let html = ''

        for (let i = 1; i <= investmentCounterNumber; i++) {
            const investment = await App.investmentsContract.investments(i)
            const investmentId = investment[0]
            const investmentTitle = investment[1]
            const investmentDescription = investment[2]
            const investmentDone = investment[3]
            const investmentCreated = investment[4]

            let investmentElement = `
                <div class="card bg-dark rounded-0 mb-2" style="border-radius: 5%; box-shadow: 10px 5px 5px black;">
                    <div class="card-header d-flex justify-content-between align-items-center">
                        <span> ${investmentTitle} </span>
                        <div class="form-check form-switch">
                            <span> ¿Retirar inversión? </span>
                            <input class="form-check-input" data-id="${investmentId}" type="checkbox" ${investmentDone && "checked"} onchange="App.toggleDone(this)"/>
                        </div>
                    </div> 
                    <div class="card-body">
                        <span> Has realizado una inversión de ${investmentDescription} ETH. </span>
                        <p class="text-muted">Transaction was created ${new Date(investmentCreated * 1000).toLocaleString()}</p>
                    </div>
                </div>
            `

            html += investmentElement;
        }

        document.querySelector('#investmentsList').innerHTML = html;
    },
    createInvestment: async (title, description) => {
        const result = await App.investmentsContract.createInvestment(title, description, { 
            from: App.account
        })
        // console.log(result.logs[0].args)
        location.reload();
    },
    toggleDone: async (element) => {
        const investmentId = element.dataset.id

        await App.investmentsContract.toggleDone(investmentId, {
            from: App.account
        })

        window.location.reload;
    }
}
