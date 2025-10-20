use Colegios

db.createCollection ("establecimiento");

show collections;

db.oficiales.aggregate([
    {
        $project: {
            id_establecimiento: "$_id",
            numero_de_Sedes: 1,
            grados: 1,
            nombre_Rector: 1,
            correo_Eletronico:1,
            niveles: 1,
            _id: 0
        }
    },
    {
        $merge:{
            into: "establecimiento"
        }
    }
]);
