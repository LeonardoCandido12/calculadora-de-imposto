let iper = 0,inss = 0,salario = 0,i = 0
const tabela = [
    {salinicio:0      ,salfim:5000.0 ,salresid:5000  ,incide:0.11 },
    {salinicio:5000.1 ,salfim:7500   ,salresid:2500  ,incide:0.115},
    {salinicio:7500.1 ,salfim:12000  ,salresid:4500  ,incide:0.12 },
    {salinicio:12000.1,salfim:16000  ,salresid:4000  ,incide:0.125},
    {salinicio:16000.1,salfim:19000  ,salresid:3000  ,incide:0.13 },
    {salinicio:19000.1,salfim:35000  ,salresid:16000 ,incide:0.135},
    {salinicio:35000  ,salfim:1000000,salresid:965000,incide:0.14 }   
]
function displayinss(inss){
    const exibirinss = document.getElementById('exibir-inss')
    exibirinss.innerText = inss.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
    document.getElementById('salario').value=''
}
function displayiper(iper){
    const exibiriper = document.getElementById('exibir-iper')
    exibiriper.innerText = iper.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
    document.getElementById('salario').value=''
}    
function lersalario(){
    salario = document.getElementById('salario').value
    return salario
}
function calculariper() {
    lersalario()
    while(salario>0){
        if(salario>=(tabela[i].salresid)){
            iper += (tabela[i].salresid*tabela[i].incide)
            salario -= tabela[i].salresid
        }else{
            iper += salario*(tabela[i].incide)          
            salario = 0
        }
        i++
    } 
    displayiper(iper)
    iper=0    
}
function calcularinss(){
    lersalario()
    if (salario<=1212.00){
        inss = (salario*100*0.075)/100
    }else if(salario>1212.00 && salario<=2427.35){
        inss = ((salario*100*0.09)/100)-18.18
    }else if(salario>2427.35 && salario<=3641.03){
        inss = ((salario*100*0.12)/100)-91.00
    }else if(salario>3641.03 && salario<=7087.22){
        inss = ((salario*100*0.14)/100)-91.00
    }else{
        inss = 828.38
    }
    displayinss(inss)
}


