use incautaciones;


const session = db.getMongo().startSession();

const evento = session.getDatabase("incautacionesPruebas");

session.startTransaction();

// Encuentra todos los municipios que empiezan por “San”.
evento.municipios.find({ nomMuni: { $regex: /^San/i } });

//Lista los municipios que terminan en “ito”.
evento.municipios.aggregate([
  {
    $match: {
      "nomMuni": { $regex: /ito$/i }
    }
  },
  {
    $sort: { nomMuni: 1 }
  },
  {
    $project: {
      _id: 0,
      nomMuni: 1
    }
  }
]);

// Busca los municipios cuyo nombre contenga la palabra “Valle”.
evento.municipios.find({ nomMuni: { $regex: /valle/i } });

// Devuelve los municipios cuyo nombre empiece por vocal.
evento.municipios.aggregate([
  {
    $match: {
      "nomMuni": { $regex: /^[aeiouáéíóú]/i }
    }
  }
]);

// Filtra los municipios que terminen en “al” o “el”.
evento.municipios.aggregate([
  {
    $match: {
      "nomMuni": { $regex: /(al|el)$/i }
    }
  }
]);

// Encuentra los municipios cuyo nombre contenga dos vocales seguidas.
evento.municipios.aggregate([
  {
    $match: {
      "nomMuni": { $regex: /[aeiouáéíóú][aeiouáéíóú]/i }
    }
  }
]);

// Obtén todos los municipios con nombres que contengan la letra “z”.
evento.municipios.aggregate([
  {
    $match: {
      "nomMuni": { $regex: /z/i }
    }
  }
]);

//Lista los municipios que empiecen con “Santa” y tengan cualquier cosa después.
evento.municipios.aggregate([
  {
    $match: {
      "nomMuni": { $regex: /^santa/i }
    }
  },
  {
    $sort: { nomMuni: 1 }
  },
  {
    $project: {
      _id: 0,
      nomMuni: 1
    }
  }
]);

// Encuentra municipios cuyo nombre tenga exactamente 6 letras.
evento.municipios.aggregate([
  {
        $match: {
            nomMuni: { $regex: "^.{6}$" }
        }
    }
]);

// Filtra los municipios cuyo nombre tenga 2 palabras.
evento.municipios.aggregate([
    {
        $match: {
            nomMuni: { $regex: /^[a-zA-Z]+ [a-zA-Z]+$/i }
        }
    }
]);

// Encuentra municipios cuyos nombres terminen en “ito” o “ita”.
evento.municipios.aggregate([
  {
    $match: {
      "nomMuni": { $regex: /(ito|ita)$/i }
    }
  }
]);

// Lista los municipios que contengan la sílaba “gua” en cualquier posición.
evento.municipios.aggregate([
  {
    $match: {
      "nomMuni": { $regex: /gua/i }
    }
  },
  {
    $sort: { nomMuni: 1 }
  },
  {
    $project: {
      _id: 0,
      nomMuni: 1
    }
  }
]);

// Devuelve los municipios que empiecen por “Puerto” y terminen en “o”.
evento.municipios.aggregate([
    {
        $match: {
            nomMuni: { $regex: /^Puerto.*o$/i }
        }
    }
]);

// Encuentra municipios con nombres que tengan más de 10 caracteres.
evento.municipios.aggregate([
  {
        $match: {
            nomMuni: { $regex: "^.{10}" }
        }
    }
]);

// Busca municipios que no contengan vocales.
evento.municipios.aggregate([
  {
    $match: {
      "nomMuni": { $regex: /[^aeiouáéíóú]/i }
    }
  }
]);

// Muestra la cantidad total incautada en municipios que empiezan con “La”.
evento.evento.aggregate([
    {
        $lookup: {
            from: "municipios",
            localField: "cod_muni",
            foreignField: "codMuni",
            as: "municipioInfo"
        }
    },
    {
      $unwind: "$municipioInfo"
    },
    {
        $match: {
            "municipioInfo.nomMuni": { $regex: /^la/i }
        }
    },
    {
        $group: {
            _id: "$municipioInfo.codMuni",
            nomMuni: { $first: "$municipioInfo.nomMuni" },
            cantidadTotal: { $sum: "$cantidad" }
        }
    },
    {
        $sort: {
            cantidadTotal: -1
        }
    }
]);

// Calcula el total de incautaciones en municipios cuyo nombre termine en “co”.
evento.evento.aggregate([
    {
        $lookup: {
            from: "municipios",
            localField: "cod_muni",
            foreignField: "codMuni",
            as: "municipioInfo"
        }
    },
    {
      $unwind: "$municipioInfo"
    },
    {
        $match: {
            "municipioInfo.nomMuni": { $regex: /co$/i }
        }
    },
    {
        $group: {
            _id: "$municipioInfo.codMuni",
            nomMuni: { $first: "$municipioInfo.nomMuni" },
            cantidadTotal: { $sum: "$cantidad" }
        }
    },
    {
        $sort: {
            cantidadTotal: -1
        }
    }
]);

// Obtén el top 5 de municipios con más incautaciones cuyo nombre contenga la letra “y”.
evento.evento.aggregate([
    {
        $lookup: {
            from: "municipios",
            localField: "cod_muni",
            foreignField: "codMuni",
            as: "municipioInfo"
        }
    },
    {
      $unwind: "$municipioInfo"
    },
    {
        $match: {
            "municipioInfo.nomMuni": { $regex: /y/i }
        }
    },
    {
        $group: {
            _id: "$municipioInfo.codMuni",
            nomMuni: { $first: "$municipioInfo.nomMuni" },
            cantidadTotal: { $sum: "$cantidad" }
        }
    },
    {
        $sort: {
            cantidadTotal: -1
        }
    },
    {
      $limit: 5
    }
]);

// Encuentra los municipios que empiecen por “San” y agrupa la cantidad incautada por año.
db.evento.aggregate([
    {
        $lookup: {
            from: "municipios",
            localField: "cod_muni",
            foreignField: "codMuni",
            as: "municipioInfo"
        }
    },
    {
        $unwind: "$municipioInfo"
    },
    {
        $match: {
            "municipioInfo.nomMuni": { $regex: /^san/i }
        }
    },
    {
        $group: {
            _id: {
                anio: { $year: "$fechaHecho" },
                codMuni: "$municipioInfo.codMuni"
            },
            nomMuni: { $first: "$municipioInfo.nomMuni" },
            cantidadTotal: { $sum: "$cantidad" }
        }
    },
    {
        $sort: {
            "_id.anio": 1,
            cantidadTotal: -1
        }
    }
]);

// Lista los departamentos que tengan al menos un municipio cuyo nombre termine en “ito” o “ita”, y muestra la cantidad total incautada en ellos.

session.commitTransaction();

session.endSession();