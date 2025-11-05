db.createCollection("UBICACION", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["id_ubi", "direccion", "zona"],
      properties: {
        _id: { bsonType: "objectId" },
        id_ubi: {
          bsonType: "int",
          description: "Identificador de la ubicación"
        },
        direccion: {
          bsonType: "string",
          maxLength: 120,
          description: "Dirección física del establecimiento"
        },
        zona: {
          bsonType: "string",
          enum: ["urbana", "rural", "mixta", ""],
          description: "Zona donde se ubica el establecimiento"
        }
      }
    }
  }
});

// TIPO_ESTABLECIMIENTO
db.createCollection("TIPO_ESTABLECIMIENTO", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["idTipo", "tipoEstable"],
      properties: {
        _id: { bsonType: "objectId" },
        idTipo: {
          bsonType: "int",
          description: "Identificador del tipo de establecimiento"
        },
        tipoEstable: {
          bsonType: "string",
          maxLength: 80,
          description: "Nombre del tipo de establecimiento (colegio, instituto, etc.)"
        },
        especialidad: {
          bsonType: ["string", "null"],
          maxLength: 80,
          description: "Especialidad del establecimiento (opcional)"
        }
      }
    }
  }
});

// TIPO_ESTABLECIMIENTO_JORNADA
db.createCollection("TIPO_ESTABLECIMIENTO_JORNADA", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["idTipo", "jornada"],
      properties: {
        _id: { bsonType: "objectId" },
        idTipo: {
          bsonType: "int",
          description: "FK al tipo de establecimiento"
        },
        jornada: {
          bsonType: "string",
          maxLength: 40,
          description: "Jornada que maneja este tipo: mañana, tarde, noche, completa"
        }
      }
    }
  }
});

// ESTABLECIMIENTO
db.createCollection("ESTABLECIMIENTO", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["id_establecimiento", "numSedes", "nomRector", "idTipo", "id_ubi"],
      properties: {
        _id: { bsonType: "objectId" },
        id_establecimiento: {
          bsonType: "int",
          description: "Identificador único del establecimiento"
        },
        numSedes: {
          bsonType: "int",
          minimum: 1,
          description: "Número de sedes que tiene el establecimiento"
        },
        nomRector: {
          bsonType: "string",
          maxLength: 100,
          description: "Nombre del rector o representante"
        },
        idTipo: {
          bsonType: "int",
          description: "FK al tipo de establecimiento"
        },
        id_ubi: {
          bsonType: "int",
          description: "FK a la ubicación del establecimiento"
        }
      }
    }
  }
});

// ESTABLECIMIENTO_CORREO
db.createCollection("ESTABLECIMIENTO_CORREO", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["id_establecimiento", "correo"],
      properties: {
        _id: { bsonType: "objectId" },
        id_establecimiento: {
          bsonType: "int",
          description: "FK al establecimiento"
        },
        correo: {
          bsonType: "string",
          pattern: "^.+@.+\\..+$",
          maxLength: 120,
          description: "Correo electrónico del establecimiento"
        }
      }
    }
  }
});

// ESTABLECIMIENTO_GRADO
db.createCollection("ESTABLECIMIENTO_GRADO", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["id_establecimiento", "grado"],
      properties: {
        _id: { bsonType: "objectId" },
        id_establecimiento: {
          bsonType: "int",
          description: "FK al establecimiento"
        },
        grado: {
          bsonType: "string",
          maxLength: 50,
          description: "Grado que ofrece el establecimiento (ej. '6°', '11°', 'Transición')"
        }
      }
    }
  }
});

// ESTABLECIMIENTO_NIVEL
db.createCollection("ESTABLECIMIENTO_NIVEL", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["id_establecimiento", "nivel"],
      properties: {
        _id: { bsonType: "objectId" },
        id_establecimiento: {
          bsonType: "int",
          description: "FK al establecimiento"
        },
        nivel: {
          bsonType: "string",
          maxLength: 50,
          description: "Nivel educativo que maneja (preescolar, básica, media...)"
        }
      }
    }
  }
});

// Índices 
db.ESTABLECIMIENTO.createIndex({ id_establecimiento: 1 }, { unique: true });
db.UBICACION.createIndex({ id_ubi: 1 }, { unique: true });
db.TIPO_ESTABLECIMIENTO.createIndex({ idTipo: 1 }, { unique: true });
db.ESTABLECIMIENTO_CORREO.createIndex({ id_establecimiento: 1 });
db.ESTABLECIMIENTO_GRADO.createIndex({ id_establecimiento: 1 });
db.ESTABLECIMIENTO_NIVEL.createIndex({ id_establecimiento: 1 });
db.TIPO_ESTABLECIMIENTO_JORNADA.createIndex({ idTipo: 1 });



