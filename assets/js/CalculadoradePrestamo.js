function plazo() {
    
    if (document.getElementById("rango").value>1) {
        document.getElementById("rango").nextElementSibling.value = document.getElementById("rango").value+" años"
    } else {
        document.getElementById("rango").nextElementSibling.value = document.getElementById("rango").value+" año"
    }
}

function calcular() {


    dt = new Date(document.getElementById("Birthday").value);
    at = new Date();
    vv = document.getElementById("vivienda").value;

    let sn = document.getElementById("Salario").value;

    let ms = document.getElementById("prestamo").value;

    let tm = document.getElementById("Interes").value;

    let p = document.getElementById("rango").value;

    var pm = (((ms * (tm / 100) * (Math.pow(1 + (tm / 100), p))) / ((Math.pow(1 + (tm / 100), p) - 1))) / 12).toFixed(2);

    document.getElementById("Mensualidad").value = pm;

    let sm = document.getElementById("minimo").value = pm / 0.40;

    if (sn >= sm) {
        document.getElementById("StatusMonto").value = "Monto de salario suficiente para el crédito";
    } else {
        document.getElementById("StatusMonto").value = "Monto de salario insuficiente";
    }

    let ed = at.getFullYear() - dt.getFullYear();

    if (ed > 22 && ed < 55) {
        document.getElementById("StatusEdad").value = "Cliente con edad suficiente para crédito";
    } else {
        document.getElementById("StatusEdad").value = "Cliente no califica para crédito por edad";
    }
    document.getElementById("Porcentaje").value = (vv / ms) + "%";

    localStorage.setItem("correo", document.getElementById("correo").value);
    localStorage.setItem("Nombre", document.getElementById("Nombre").value);
    localStorage.setItem("Birthday", dt);
    localStorage.setItem("Salario", sn);
    localStorage.setItem("Interes", tm);
    localStorage.setItem("rango", p / 12);
    localStorage.setItem("prestamo", ms);
    localStorage.setItem("vivienda", vv);
    localStorage.setItem("Mensualidad", pm);
    localStorage.setItem("minimo", sm);
    localStorage.setItem("StatusMonto", document.getElementById("StatusMonto").value);
    localStorage.setItem("StatusEdad", document.getElementById("StatusEdad").value);
    localStorage.setItem("Porcentaje", document.getElementById("Porcentaje").value);
}

function loaddata() {
    document.getElementById("correo").value = localStorage.getItem("correo");
    document.getElementById("Nombre").value = localStorage.getItem("Nombre");
    document.getElementById("Birthday").value = localStorage.getItem("Birthday");
    document.getElementById("Salario").value = localStorage.getItem("Salario");
    document.getElementById("Interes").value = localStorage.getItem("Interes");
    document.getElementById("rango").value = localStorage.getItem("rango");
    document.getElementById("prestamo").value = localStorage.getItem("prestamo");
    document.getElementById("vivienda").value = localStorage.getItem("vivienda");
    document.getElementById("Mensualidad").value = localStorage.getItem("Mensualidad");
    document.getElementById("minimo").value = localStorage.getItem("minimo");
    document.getElementById("StatusMonto").value = localStorage.getItem("StatusMonto");
    document.getElementById("StatusEdad").value = localStorage.getItem("StatusEdad");
    document.getElementById("Porcentaje").value = localStorage.getItem("Porcentaje");
}


function mostrarProyeccion(tasaMensual, mes, pagoMensual, montoSolicitado) {

    var meses=mes*12;
    var tabla = "";
    
    tabla = `
        <Caption>Crédito Happy Eart</Caption>
        <Caption>Proyección de Crédito</Caption>
        <tr>
          <th>Mes</th>
          <th>Pago Mensual</th>
          <th>Intereses</th>
          <th>Amortización</th>
          <th>Saldo</th>
        </tr>`;

    var saldo = pagoMensual * meses;
    var vIntereses = 0;
    var amortiza = montoSolicitado;
    
    for (var i =1; i <= meses; i++) {
        
        saldo=saldo-pagoMensual  

        for (var j=1; j <= mes; j++) {
            vIntereses = (amortiza * (tasaMensual / 100));
            amortiza = amortiza - (pagoMensual - vIntereses);
        }

        tabla += `
           
        <tr>

            <td class="text-center">` + i + `</td>
  
            <td class="text-center">` + pagoMensual + `</td>

            <td class="text-center">` + vIntereses+ `</td>
    
            <td class="text-center">` + (pagoMensual-vIntereses) + `</td>
                
            <td class="text-center">` + saldo + `</d>


        </tr>

`;
    }
    

    document.getElementById("tabla").innerHTML = tabla;
}