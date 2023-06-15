const inquirer = require('inquirer');
require('colors');

const preguntas = [
  {
    type: 'list',
    name: 'opcion',
    message: '¿Qué desea hacer?',
    choices: [
      {
        value: '1',
        name: `${'1.'.green} Crear tarea`,
      },
      {
        value: '2',
        name: `${'2.'.green} Listar tarea`,
      },
      {
        value: '3',
        name: `${'3.'.green} Listar tareas completadas`,
      },
      {
        value: '4',
        name: `${'4.'.green} Listar tareas pendientes`,
      },
      {
        value: '5',
        name: `${'5.'.green} Completar tarea(s)`,
      },
      {
        value: '6',
        name: `${'6.'.green} Borrar tarea`,
      },
      {
        value: '0',
        name: `${'0.'.green} Salir`,
      },
    ],
  },
];

const enter = [
  {
    type: 'input',
    name: 'enterInput',
    message: `Presione ${'enter'.green} para continuar`,
  },
];

const inquirerMenu = async () => {
  console.clear();
  console.log('============================'.green);
  console.log('   Seleccione una opción'.white);
  console.log('============================\n'.green);

  const { opcion } = await inquirer.prompt(preguntas);

  return opcion;
};

const pausa = async () => {
  console.log('\n');
  const { enterInput } = await inquirer.prompt(enter);

  return enterInput;
};

const leerInput = async (message) => {
  const question = [
    {
      type: 'input',
      name: 'desc',
      message,
      validate(value) {
        if (value.length == 0) {
          return 'Por favor, ingrese un valor.';
        }

        return true;
      },
    },
  ];

  const { desc } = await inquirer.prompt(question);
  return desc;
};

const listadoTareasBorrar = async (tareas = []) => {
  const choices = tareas.map((tarea, i) => {
    const indice = `${i + 1}. `.green;
    return {
      value: tarea.id,
      name: `${indice} ${tarea.desc}`,
    };
  });

  choices.push({
    value: '0',
    name: '0. '.green + 'Cancelar',
  });
  const pregunta = [
    {
      type: 'list',
      name: 'id',
      message: 'Borrar',
      choices,
    },
  ];
  const { id } = await inquirer.prompt(pregunta);

  return id;
};
const confirmar = async (message) => {
  const pregunta = [
    {
      type: 'confirm',
      name: 'ok',
      message,
    },
  ];
  const { ok } = await inquirer.prompt(pregunta);

  return ok;
};

const mostrarListadoCheckList = async (tareas = []) => {
  const choices = tareas.map((tarea, i) => {
    const indice = `${i + 1}. `.green;
    return {
      value: tarea.id,
      name: `${indice} ${tarea.desc}`,
      checked: tarea.completadoEn ? true : false,
    };
  });

  const pregunta = [
    {
      type: 'checkbox',
      name: 'idSeleccionados',
      message: 'Selecciones',
      choices,
    },
  ];
  const { idSeleccionados } = await inquirer.prompt(pregunta);

  return idSeleccionados;
};
module.exports = {
  inquirerMenu,
  pausa,
  leerInput,
  listadoTareasBorrar,
  confirmar,
  mostrarListadoCheckList,
};
