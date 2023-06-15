const Tarea = require('./tarea');

class Tareas {
  _listado = {};

  get listadoArr() {
    const listado = [];

    Object.keys(this._listado).forEach((data) => {
      const tarea = this._listado[data];
      listado.push(tarea);
    });

    return listado;
  }

  constructor() {
    this._listado = {};
  }

  cargarTareasFromArray(tareas = []) {
    tareas.forEach((tarea) => {
      this._listado[tarea.id] = tarea;
    });
  }

  crearTarea(desc = '') {
    const tarea = new Tarea(desc);
    this._listado[tarea.id] = tarea;
  }

  listadoCompleto() {
    console.log();
    this.listadoArr.forEach((data, i) => {
      const indice = `${i + 1}. `.green;
      const { desc, completadoEn } = data;
      const estado = completadoEn ? `Completada`.green : `Pendiente`.red;
      console.log(`${indice} ${desc} :: ${estado}`);
    });
  }

  listarPendientesCompletadas(completadas) {
    console.log();
    let contador = 0;
    this.listadoArr.forEach((data, i) => {
      const { desc, completadoEn } = data;
      const estado = completadoEn ? `Completada`.green : `Pendiente`.red;

      if (completadas) {
        if (completadoEn) {
          contador += 1;
          console.log(
            `${(contador + '. ').green} ${desc} :: ${completadoEn.green}`
          );
        }
      } else {
        if (!completadoEn) {
          contador += 1;
          console.log(`${(contador + '. ').green} ${desc} :: ${estado}`);
        }
      }
    });
    if (contador == 0) console.log('Aun no hay tareas para mostrar.');
  }

  borrarTarea(id = '') {
    if (this._listado[id]) {
      delete this._listado[id];
    }
  }

  tareasCompletadas(ids = []) {
    ids.forEach((id) => {
      const tarea = this._listado[id];
      if (!tarea.completadoEn) {
        tarea.completadoEn = new Date().toISOString();
      }
    });

    this.listadoArr.forEach((tarea) => {
      if (!ids.includes(tarea.id)) {
        this._listado[tarea.id].completadoEn = null;
      }
    });
  }
}

module.exports = Tareas;
