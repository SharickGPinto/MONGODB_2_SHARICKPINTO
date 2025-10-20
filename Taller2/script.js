// ¿Cuántos municipios comienzan con "La" y cuál es la cantidad total incautada en ellos?//

/*
db.Municipio.aggregate([
    {
        $match: {
            nombre: { $regex: "^(la)", $options: "i" }

        }
    }
]);

db.incautaciones.aggregate([
    {
        $group: {
            _id: "$id_municipio",
            cantidad: { $sum: "$cantidad" }
        }
    }
]);*/

db.incautaciones.aggregate([
    {
        $lookup: {
          from: "Municipio",
          localField: "id_municipio",
          foreignField: "id_municipio",
          as: "nombre_municipio" 
        }
    },
    {
        $unwind: "$nombre_municipio"
    },
    {
        $match: {
            "nombre_municipio.nombre": {  $regex: "^(la)", $options: "i" }
        }
    },
    {
        $group: {
            _id: null,
            cantidad: { $sum: "$cantidad"},
            totalMunicipios: {$sum: 1}
        }
    }
]);


//Top 5 departamentos donde los municipios terminan en "al" y la cantidad incautada.//

db.Municipio.aggregate([
    {
        $match:{
            nombre: {$regex: "(al)$", $options: "i"}
        }
    }
]);

