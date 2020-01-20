var arrayHoras = [];
fetch('http://127.0.0.1:8000/reservas/')
    .then(function (response) {
        return response.json();
    })
    .then(function (horasreservadas) {
        arrayHoras = horasreservadas;
    });


var btnReserva = document.getElementsByClassName('btn-reserva');
var clndr = document.getElementsByClassName("calendar");


for (let btnR of btnReserva) {
    btnR.onclick = function () {
        for (let i of clndr) {
            if (i.id === btnR.id) {
                i.innerHTML = `<div class="container">
                                    <div class="row justify-content-center">
                                    <div class="col-12 col-lg-6">
                                    <div class="calendar-container">

                                    <div class="year-header">
                                    <span class="left-button" id="prev"> &lang; </span>
                                    <span id="date"></span>
                                    <span class="right-button" id="next"> &rang; </span>
                                    </div>
                                    <table class="days-table">
                                    <thead>
                                    <td class="day-name">Lu</td>
                                    <td class="day-name">Ma</td>
                                    <td class="day-name">Mi</td>
                                    <td class="day-name">Ju</td>
                                    <td class="day-name">Vi</td>
                                    <td class="day-name">Sa</td>
                                    <td class="day-name">Do</td>
                                    </thead>
                                    <tbody class="month-table">
                                    </tbody>
                                    </table>

                                    </div>
                                    </div>
                                    <div class="col-12 col-lg-6">
                                    <div class="events-container">
                                    <div id="horas" class="row">
                                    <div id="am" class="col-6">
                                     <div class="hora" id="1">08:00 - 09:00</div>

                                     <div class="hora" id="2">09:00 - 10:00</div>

                                     <div class="hora" id="3">10:00 - 11:00</div>

                                     <div class="hora" id="4">11:00 - 12:00</div>
                                     </div>
                                    <div id="pm" class="col-6">
                                     <div class="hora" id="5">12:00 - 13:00</div>

                                     <div class="hora" id="6">13:00 - 14:00</div>

                                     <div class="hora" id="7">14:00 - 15:00</div>

                                     <div class="hora" id="8">15:00 - 16:00</div>

                                     <div class="hora" id="9">16:00 - 17:00</div>

                                     <div class="hora" id="10">17:00 - 18:00</div>

                                     <div class="hora" id="11">18:00 - 19:00</div>

                                     <div class="hora" id="12">19:00 - 20:00</div>

                                     <div class="hora" id="13">20:00 - 21:00</div>
                                         </div>
                                    </div>
                                    </div>
                                    </div>
                                    </div>
                                    </div>
                                    `;

                let date = new Date();


                $(document).ready(function () {
                    let today = date.getDate();
                    // Set click handlers for DOM elements
                    $('.left-button').click({dt: date}, prev_month);
                    $('.right-button').click({dt: date}, next_month);
                    init_calendar(date);
                });

                let today = date.getDate(); // obtine numero del dia del mes
                let thisMonth = date.getMonth();
                let thisYear = date.getFullYear();

                function init_calendar() {

                    $(".reservado").removeClass("reservado");
                    let calendar_days = $(".month-table");// Asocia la tabla de fechas a la variable calendar_days
                    calendar_days.empty(); // Vacía los dias del calendario
                    let month = date.getMonth(); // obtiene numero de mes. enero = 0
                    let year = date.getFullYear(); // Obtiene el año yyyy
                    let day_count = days_in_month(month, year); // Obtiene cantidad de dias del mes
                    // Set date to 1 to find the first day of the month
                    date.setDate(1); // Setea variable date con el prier dia del mes
                    let first_day = date.getDay(); // Obtiene el dia (D,L,M,M,J,V,S) del primer die del mes
                    let firstDay = 0;
                    switch (first_day) {
                        case 0:
                            firstDay = 7;
                            break;
                        case 1:
                            firstDay = 1;
                            break;
                        case 2:
                            firstDay = 2;
                            break;
                        case 3:
                            firstDay = 3;
                            break;
                        case 4:
                            firstDay = 4;
                            break;
                        case 5:
                            firstDay = 5;
                            break;
                        case 6:
                            firstDay = 6;
                            break;
                    }
                    for (i = 0, e = 1; i < day_count + firstDay - 1; i++, e++) {
                        let day = e - firstDay + 1;
                        // If it is a sunday, make a new row
                        if (i % 7 === 0) { // cero y siente % 0
                            var row = $("<tr class='week'></tr>");
                            calendar_days.append(row);
                        }

                        if (e < firstDay || day > day_count) {
                            let curr_date = $("<td class='day nil'>" + "</td>"); // Agrega dia vacío a la tabla
                            row.append(curr_date);
                        } else {
                            let curr_date = $("<td class='day'>" + day + "</td>"); // Agrega dia a la tabla
                            let events = check_events(day, month + 1, year); // Verifica si hay eventos en la fecha seleccionada ----------------?
                            if (today === day && month === thisMonth && year === thisYear) { // varifica si la fecha agregada coincide con la decha actual y agrega clase
                                curr_date.addClass("today");
                                show_events(events);//Muestra eventos del dia actual
                            }
                            if (events.length !== 0) {
                                curr_date.addClass("event-date");//Verifica si hay eventos en el dia y agrega clase
                            }
                            // Set onClick handler for clicking a date
                            curr_date.click({events: events,day:day, month:month, year:year}, date_click);//------------------------------------?
                            row.append(curr_date); // Agrega dia a la tabla
                        }
                    }
                    let m = document.getElementById('date');
                    m.innerHTML = months[month] + ' ' + year
                }

                // Get the number of days in a given month/year
                function days_in_month(month, year) {
                    let monthStart = new Date(year, month, 1);
                    let monthEnd = new Date(year, month + 1, 1);
                    return (monthEnd - monthStart) / (1000 * 60 * 60 * 24);
                }


                let resr = [];
                // Event handler for when a date is clicked
                function date_click(event) {
                    $(".active-date").removeClass("active-date");
                    $(this).addClass("active-date");
                    show_events(event.data.events);
                    let hr = document.getElementsByClassName('hora');
                    for(let i of hr){
                        i.onclick = function () {
                            let a = document.getElementsByClassName('active-date')
                            console.log(a)
                            if(a.length === 0){
                                alert('Debe seleccionar el día')
                            }else {
                                $(".reservar_hora").removeClass("reservar_hora");
                                $(".btn-disabled").removeClass("btn-disabled");

                                i.classList.add('reservar_hora');
                                resr = [];
                                resr.push(event.data.day, event.data.month+1, event.data.year, parseInt(i.id), parseInt(btnR.id));
                                console.log(resr)
                            }
                        }
                    }
                }


                function next_month() {
                    $(".reservar_hora").removeClass("reservar_hora");
                    $(".btn-confirmar").addClass('btn-disabled');
                    let new_month = date.getMonth() + 1;
                    date.setMonth(new_month);
                    init_calendar();
                }

                function prev_month() {
                    $(".reservar_hora").removeClass("reservar_hora");
                    $(".btn-confirmar").addClass('btn-disabled');
                    let new_month = date.getMonth() - 1;
                    date.setMonth(new_month);
                    init_calendar();
                }

                // Display all events of the selected date in card views
                function show_events(events) {
                    if (events.length === 0) {
                        $(".reservado").removeClass("reservado");

                    } else {
                        $(".reservado").removeClass("reservado");
                        // Go through and add each event as a card to the events container
                        for (let i = 0; i < events.length; i++) {
                            console.log(events);
                            document.getElementById(events[i]['idhora_id']).classList.add('reservado');
                        }
                    }
                }

                function check_events(day, month, year) {
                    var events = [];
                    for (let i = 0; i < arrayHoras.length; i++) {
                        let event = arrayHoras[i];
                        if (event["dia"] === day &&
                            event["mes"] === month &&
                            event["ano"] === year &&
                            event["idbox"] == btnR.id) {
                            events.push(event);
                        }
                    }
                    return events;
                }
                const months = [
                    "Enero",
                    "Febrero",
                    "Marzo",
                    "Abril",
                    "Mayo",
                    "Junio",
                    "Julio",
                    "Agosto",
                    "Septiembre",
                    "Octubre",
                    "Noviembre",
                    "Diciembre"
                ];


            }
        }
    };
}

var btnCnRsrv = document.getElementsByClassName('btn-canReserva');
for (let bcr of btnCnRsrv) {
    bcr.onclick = function () {
        for (let i of clndr) {
            if (i.id === bcr.id) {
                i.innerHTML = '';
                break;
            }
        }
    };
}

/*function cargaHoras() {
    let am = document.getElementById('am');
    let pm = document.getElementById('pm');
    am.innerText = '';
    pm.innerText = '';
    fetch('http://127.0.0.1:8000/horas/')
        .then(function (response) {
            return response.json();
        })
        .then(function (horas) {
            for (let h of horas) {
                if(h.idhora < 5){
                    am.innerHTML += `
                                 <div class="hora" id="${h.idhora}">${h.hora}</div>
                                 `
                }
                else {
                    pm.innerHTML += `
                                 <div class="hora" id="${h.idhora}">${h.hora}</div>
                                     `
                }
            }
        });
}

 */

