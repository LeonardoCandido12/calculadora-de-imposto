const tabela = [
    { salinicio: 0, salfim: 5000.0, salresid: 5000, incide: 0.11 },
    { salinicio: 5000.1, salfim: 7500, salresid: 2500, incide: 0.115 },
    { salinicio: 7500.1, salfim: 12000, salresid: 4500, incide: 0.12 },
    { salinicio: 12000.1, salfim: 16000, salresid: 4000, incide: 0.125 },
    { salinicio: 16000.1, salfim: 19000, salresid: 3000, incide: 0.13 },
    { salinicio: 19000.1, salfim: 35000, salresid: 16000, incide: 0.135 },
    { salinicio: 35000, salfim: 100000000, salresid: 965000000, incide: 0.14 },
];
const iperHTML = document.getElementById("salario-iper");
const inssHTML = document.getElementById("salario-inss");
const exibirIPER = document.getElementById("exibir-iper");

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

function onExecutarIPER() {
    const valorIPER = iperHTML.value.replace(",", ".");
    const IPERs = calcularIPER(valorIPER);

    let IPER = 0;
    try {
        IPER = IPERs.reduce((a, b) => a + b);
    } catch (error) {}
    displayIPER(IPER, IPERs);
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

function displayIPER(IPER, IPERs) {
    exibirIPER.innerText =
        "IPER: " +
        IPER.toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
        });

    for (let i = 0; i < idsIPER.length; i++) {
        try {
            idsIPER[i].innerText = IPERs[i].toLocaleString("pt-br", {
                style: "currency",
                currency: "BRL",
            });
        } catch (error) {
            idsIPER[i].innerText = "";
        }
    }
}

function onExecutarINSS() {
    const valorINSS = inssHTML.value;
    const INSS = calcularINSS(valorINSS);
    displayINSS(INSS);
}

function displayINSS(inss) {
    const exibirINSS = document.getElementById("exibir-inss");
    console.log(inss);
    exibirINSS.innerText =
        "INSS: " +
        inss.toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
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
    // return  Math.floor(inss)
    return inss;
}




