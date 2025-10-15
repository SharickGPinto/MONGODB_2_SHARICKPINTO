# 🧠 Workshop Completo: MongoDB Aggregation + Regex

------

## 📌 Introducción

Este taller está orientado a dominar el uso del **framework de agregación de MongoDB** junto con el uso de **expresiones regulares**. Usaremos una colección `productos` con estructura semicompleja, incluyendo arrays de comentarios embebidos.

------

## 🛠 Preparación

```
use tienda;

db.productos.insertMany([
  // Pega aquí el contenido del archivo productos_avanzado_dataset.json
]);
```

------

## 🔄 Ejercicios con Teoría + Práctica

------

### 🧩 Ejercicio 1: Proyección de Campos

#### 📘 Teoría

`$project` selecciona qué campos mostrar en el resultado, permite formatear y transformar.

#### ⚙️ Práctica

```
db.productos.aggregate([
  { $project: { _id: false, nombre: true, precio: true, categoria: true} }
]);
```

------

### 🧩 Ejercicio 2: Filtro por categoría

#### 📘 Teoría

`$match` filtra documentos según una condición, equivalente al WHERE en SQL.

#### ⚙️ Práctica

```
db.productos.aggregate([
  { $match: { categoria: "Tecnología" } },
  { $project: { nombre: 1, precio: 1, _id: 0 } }
]);
```

------

### 🧩 Ejercicio 3: Agrupar por categoría

#### 📘 Teoría

`$group` permite calcular totales, promedios, máximos y más por grupos.

#### ⚙️ Práctica

```
db.productos.aggregate([
  { $group: { _id: "$categoria", total: { $sum: 1 } } },
  { $sort: { total: -1 } }
]);
```

------

### 🧩 Ejercicio 4: Productos caros

#### 📘 Teoría

Se pueden aplicar condiciones con `$gt`, `$lt`, `$gte`, `$lte`.

#### ⚙️ Práctica

```
db.productos.aggregate([
  { $match: { precio: { $gt: 500 } } },
  { $sort: { precio: -1 } }
]);
```

------

### 🧩 Ejercicio 5: Regex sobre descripciones

#### 📘 Teoría

`$regex` permite buscar palabras específicas en campos de texto, incluso con múltiples opciones.

#### ⚙️ Práctica
```
db.productos.aggregate([
  {
    $match: {
      descripcion: { $regex: "(accusantium|dolorem|libero)", $options: "i" }
    }
  },
  { $project: { nombre: 1, descripcion: 1 } }
]);
```

------

### 🧩 Ejercicio 6: Filtrar comentarios con Regex

#### 📘 Teoría

Se usa `$filter` para recorrer arrays y `$regexMatch` para buscar patrones dentro de ellos.

#### ⚙️ Práctica

```
db.productos.aggregate([
  {
    $project: {
      nombre: 1,
      comentarios: {
        $filter: {
          input: "$comentarios",
          as: "coment",
          cond: {
            $regexMatch: {
              input: "$$coment.comentario",
              regex: "(pésima|falla|mala)",
              options: "i"
            }
          }
        }
      }
    }
  },
  { $match: { "comentarios.0": { $exists: true } } }
]);
```

------

### 🧩 Ejercicio 7: Descomponer arrays con $unwind

#### 📘 Teoría

`$unwind` descompone arrays en documentos individuales.

#### ⚙️ Práctica

```
db.productos.aggregate([
  { $unwind: "$comentarios" },
  {
    $group: {
      _id: "$comentarios.usuario",
      total: { $sum: 1 }
    }
  },
  { $sort: { total: -1 } }
]);
```

------

### 🧩 Ejercicio 8: Stock bajo y alerta textual

#### 📘 Teoría

Se pueden combinar múltiples `$match` seguidos o uno solo con operadores `$and`.

#### ⚙️ Práctica

```
db.productos.aggregate([
  {
    $match: {
      stock: { $lt: 50 },
      descripcion: { $regex: "(similique|expedita)", $options: "i" }
    }
  },
  { $project: { nombre: 1, stock: 1, descripcion: 1 } }
]);
```

------

### 🧩 Ejercicio 9: Promedio de precios

#### 📘 Teoría

`$avg` calcula el promedio de valores numéricos.

#### ⚙️ Práctica

```
db.productos.aggregate([
  {
    $group: {
      _id: "$categoria",
      promedio: { $avg: "$precio" }
    }
  },
  { $sort: { promedio: -1 } }
]);
```

------

### 🧩 Ejercicio 10: Comentarios "excelentes" en Tecnología

```
db.productos.aggregate([
  { $match: { categoria: "Tecnología" } },
  {
    $project: {
      nombre: 1,
      comentarios: {
        $filter: {
          input: "$comentarios",
          as: "coment",
          cond: {
            $regexMatch: {
              input: "$$coment.comentario",
              regex: "excelente",
              options: "i"
            }
          }
        }
      }
    }
  },
  { $match: { "comentarios.0": { $exists: true } } }
]);
```

------

## 🎯 Ejercicios Finales (Taller)

------

### 🧪 Taller

Realiza los siguientes ejercicios combinando múltiples etapas:

1. **Listar productos con más de 3 comentarios y cuyo precio supere $100**

```javascript
```



1. **Buscar productos con nombre que comience con letra "A" o "P" usando REGEX**

```javascript
```



1. **Agrupar por categoría y obtener: cantidad, promedio de precio, y stock máximo**

```javascript
```



1. **Filtrar productos que tengan al menos un comentario con la palabra “recomendado” o “perfecto”**

```javascript

```



1. **Mostrar los 5 usuarios con más comentarios hechos**

```javascript
```

