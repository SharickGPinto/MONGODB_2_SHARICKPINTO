// ¿Cuántos municipios comienzan con "La" y cuál es la cantidad total incautada en ellos?//

db.incautaciones.aggregate([
    {
        $match: {
            Municipio: {$regex:"^(la)", $options: "i"  }

        }
    },
    {$group: {
        _id: "$cod_muni",
        cantidad: {$sum: "$cantidad"}
    }
}
]);