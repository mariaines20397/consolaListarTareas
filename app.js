require('colors');
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const {
  inquirerMenu,
  pausa,
  leerInput,
  listadoTareasBorrar,
  confirmar,
  mostrarListadoCheckList,
} = require('./helpers/inquirer');
const Tareas = require('./models/tareas');

const main = async () => {
  let opt = '';

  const tareas = new Tareas();
  const tareasDB = leerDB();

  if (tareasDB) {
    tareas.cargarTareasFromArray(tareasDB);
  }

  do {
    opt = await inquirerMenu();
    console.log(opt);

    switch (opt) {
      case '1':
        //crear opcion
        const resp = await leerInput('Descripcion: ');
        tareas.crearTarea(resp);
        break;

      case '2':
        tareas.listadoCompleto();
        break;

      case '3':
        tareas.listarPendientesCompletadas(true);
        break;

      case '4':
        tareas.listarPendientesCompletadas(false);
        break;

      case '5':
        const idSeleccionados = await mostrarListadoCheckList(
          tareas.listadoArr
        );
        tareas.tareasCompletadas(idSeleccionados);
        break;

      case '6':
        const id = await listadoTareasBorrar(tareas.listadoArr);
        if (id != '0') {
          const ok = await confirmar('¿Esta seguro que desea borrar?');
          if (ok) {
            tareas.borrarTarea(id);
            console.log('Tarea borrada.');
          }
        }
        break;
    }
    guardarDB(JSON.stringify(tareas.listadoArr));

    await pausa();
  } while (opt != '0');
};

main();
