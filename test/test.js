let ipe = 0,salario = 0,i = 0
const tabela = [
    {salinicio:0      ,salfim:5000.0 ,salresid:5000  ,incide:0.11 },
    {salinicio:5000.1 ,salfim:7500   ,salresid:2500  ,incide:0.115},
    {salinicio:7500.1 ,salfim:12000  ,salresid:4500  ,incide:0.12 },
    {salinicio:12000.1,salfim:16000  ,salresid:4000  ,incide:0.125},
    {salinicio:16000.1,salfim:19000  ,salresid:3000  ,incide:0.13 },
    {salinicio:19000.1,salfim:35000  ,salresid:16000 ,incide:0.135},
    {salinicio:35000  ,salfim:1000000,salresid:965000,incide:0.14 }   
]

function executar() {
    salario = parseFloat(prompt("informe o salario"))
    while(salario>0){
        if(salario>=(tabela[i].salresid)){
            ipe += (tabela[i].salresid*tabela[i].incide)
            salario -= tabela[i].salresid
        }else{
            ipe += salario*(tabela[i].incide)          
            salario = 0
        }
        i++
    }
    alert(ipe)   
}
executar()

