const tabela = [
    { salinicio: 0, salfim: 5000.0, salresid: 5000, incide: 0.11 },
    { salinicio: 5000.1, salfim: 7500, salresid: 2500, incide: 0.115 },
    { salinicio: 7500.1, salfim: 12000, salresid: 4500, incide: 0.12 },
    { salinicio: 12000.1, salfim: 16000, salresid: 4000, incide: 0.125 },
    { salinicio: 16000.1, salfim: 19000, salresid: 3000, incide: 0.13 },
    { salinicio: 19000.1, salfim: 35000, salresid: 16000, incide: 0.135 },
    { salinicio: 35000, salfim: 100000000, salresid: 965000000, incide: 0.14 },
]
const efetivoHTML = document.getElementById("salario-efetivo")
const comissHTML = document.getElementById("salario-comiss")
const numDepComissHTML = document.getElementById('número-dep-comiss')
const numDepEfetivoHTML = document.getElementById('número-dep-efetivo')
const exibirIPER = document.getElementById("exibir-iper")
const exibirINSS = document.getElementById("exibir-inss")
const exibirIrEfetivo = document.getElementById('exibir-ir-efetivo')
const exibirIrComiss = document.getElementById('exibir-ir-comiss')
const idsIPER = getIdsIPER();
function getIdsIPER() {
    const ids = [];
    const base = "iper-faixa-";

    for (let i = 1; i < 8; i++) {
        id = base.concat(i.toString());
        ids.push(document.getElementById(id));
    }
    return ids;
}

function onExecutarEfetivo() {
    const valorEfetivo = efetivoHTML.value.replace(",", ".")
    const IPERs = calcularIPER(valorEfetivo);
    const numDepEfetivo = numDepEfetivoHTML.value 
    let IPER = 0;
    try {
        IPER = IPERs.reduce((a, b) => a + b);
    } catch (error) {}
    const IRRF = calcularIRPF(valorEfetivo,IPER,numDepEfetivo)
    displayEfetivo(IPER, IPERs, IRRF)
   
}

function calcularIPER(salario) {
    let IPERs = [];
    let IPER = 0;
    i = 0;
    while (salario > 0) {
        if (salario >= tabela[i].salresid) {
            IPER = tabela[i].salresid * tabela[i].incide;
            salario -= tabela[i].salresid;
        } else {
            IPER = salario * tabela[i].incide;
            salario = 0;
        }
        IPERs.push(IPER);
        i++;
    }
    console.log(IPERs);
    return IPERs;
}

function displayEfetivo(IPER, IPERs, IRRF) {
    exibirIPER.innerText =
        "IPER: " +
        IPER.toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
            maximumFractionDigits:4,
        });

    for (let i = 0; i < idsIPER.length; i++) {
        try {
            idsIPER[i].innerText = IPERs[i].toLocaleString("pt-br", {
                style: "currency",
                currency: "BRL",
                maximumFractionDigits:4,
            });
        } catch (error) {
            idsIPER[i].innerText = "";
        }
    }
    exibirIrEfetivo.innerText = "IR: "+IRRF.toLocaleString("pt-br", {
        style: "currency",
        currency: "BRL",
    })
}

function onExecutarComiss() {
    const valorComiss = comissHTML.value.replace(",",".")
    const numDepComiss = numDepComissHTML.value
    const INSS = calcularINSS(valorComiss)
    const IRRF = calcularIRPF(valorComiss,INSS,numDepComiss)
    displayComiss(INSS, IRRF)
}

function displayComiss(inss,IRRF) {
    console.log(inss);
    exibirINSS.innerText =
        "INSS: " +
        inss.toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
            maximumFractionDigits: 4,
        });
    exibirIrComiss.innerText = 
        "IR: " +
        IRRF.toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
            maximumFractionDigits: 4,
    });
}
function calcularINSS(salario) {
    let inss = 0;
    if (salario <= 1212.0) {
        inss = salario * 0.075;
    } else if (salario > 1212.0 && salario <= 2427.35) {
        inss = salario * 0.09 - 18.18;
    } else if (salario > 2427.35 && salario <= 3641.03) {
        inss = salario * 0.12 - 91.0;
    } else if (salario > 3641.03 && salario <= 7087.22) {
        inss = salario * 0.14 - 91.0;
    } else {
        inss = 828.38;
    }
    return inss;
}

function calcularIRPF(salario, previdencia, numDep){
    let irrf = 0
    let valorMensal = (salario - previdencia) - (numDep * 189.59)

    if(valorMensal > 0.01 && valorMensal <= 1903){
        irrf = (valorMensal * 0.000)
    } else if (valorMensal > 1903.99 && valorMensal <= 2826.65){
        irrf = (valorMensal * 0.075)-142.80
    } else if(valorMensal > 2826.66 && valorMensal <= 3751.05){
        irrf = (valorMensal * 0.150)-354.80
    } else if(valorMensal > 3751.06 && valorMensal <= 4664.68) {
        irrf = (valorMensal * 0.225)-636.13
    } else if(valorMensal > 4664.68){
        irrf = (valorMensal*0.275)-869.36
    }
        return irrf
}



