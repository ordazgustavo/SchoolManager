<template lang="html">
  <div class="alumnos">
    <md-layout md-gutter md-align="center" class="pd-t-35">
      <md-layout md-flex="80">
        <h2>Alumnos</h2>
      </md-layout>
    </md-layout>

    <md-layout md-gutter="24" md-align="center" class="pd-t-35 pd-b-35">
      <md-layout md-flex="80">
        <md-table-card class="card">

          <md-layout md-gutter="16" md-align="end" class="pd-r-35">
            <md-layout md-flex="20">
              <md-input-container>
                <label>Buscar...</label>
                <md-input v-model="filtroGen"></md-input>
              </md-input-container>
            </md-layout>

            <md-layout md-flex="10">
              <md-input-container>
                <label for="sexo">Sexo</label>
                <md-select name="sexo" id="sexo" v-model="filtroSexo">
                  <md-option value="Varón">Varón</md-option>
                  <md-option value="Hembra">Hembra</md-option>
                </md-select>
              </md-input-container>
            </md-layout>

            <md-layout md-flex="10">
              <md-input-container>
                <label for="grado">Grado</label>
                <md-select name="grado" id="grado" v-model="filtroGrado">
                  <md-subheader>Inicial</md-subheader>
                  <md-option value="Sala 3">Sala 3</md-option>
                  <md-option value="Sala 4">Sala 4</md-option>
                  <md-option value="Sala 5">Sala 5</md-option>
                  <md-subheader>Primaria</md-subheader>
                  <md-option value="1">1</md-option>
                  <md-option value="2">2</md-option>
                  <md-option value="3">3</md-option>
                  <md-option value="4">4</md-option>
                  <md-option value="5">5</md-option>
                  <md-option value="6">6</md-option>
                </md-select>
              </md-input-container>
            </md-layout>

            <md-layout md-flex="10">
              <md-input-container>
                <label for="seccion">Sección</label>
                <md-select name="seccion" id="seccion" v-model="filtroSeccion">
                  <md-option value="A">A</md-option>
                  <md-option value="B">B</md-option>
                  <md-option value="C">C</md-option>
                  <md-option value="D">D</md-option>
                </md-select>
              </md-input-container>
            </md-layout>
          </md-layout>

          <md-table md-sort="cedula">
            <md-table-header>
              <md-table-row>
                <md-table-head md-sort-by="cedula">Cédula escolar</md-table-head>
                <md-table-head md-sort-by="nombre">Nombre y apellido</md-table-head>
                <md-table-head md-sort-by="nacimiento">Fecha nac.</md-table-head>
                <md-table-head md-sort-by="edad" md-numeric>Edad</md-table-head>
                <md-table-head md-sort-by="sexo">Sexo</md-table-head>
                <md-table-head md-sort-by="procedencia">Procedencia</md-table-head>
                <md-table-head md-sort-by="direccion">Direccion</md-table-head>
                <md-table-head md-sort-by="grado">Grado</md-table-head>
                <md-table-head md-sort-by="Seccion">Seccion</md-table-head>
              </md-table-row>
            </md-table-header>

            <md-table-body v-if="alumnos && alumnos.length">
              <md-table-row v-for="alumno of filtrar(alumnos, filtroGen, filtroSeccion)" :key="alumno.cedula_escolar">
                <md-table-cell :key="alumno.cedula_escolar">{{ alumno.cedula_escolar }}</md-table-cell>
                <md-table-cell>{{ alumno.nombre }} {{ alumno.apellido }}</md-table-cell>
                <md-table-cell>{{ alumno.f_nacimiento }}</md-table-cell>
                <md-table-cell md-numeric>{{ alumno.edad }}</md-table-cell>
                <md-table-cell>{{ alumno.sexo }}</md-table-cell>
                <md-table-cell>{{ alumno.procedencia }}</md-table-cell>
                <md-table-cell>{{ alumno.habitacion }}</md-table-cell>
                <md-table-cell>{{ alumno.grado }}</md-table-cell>
                <md-table-cell>{{ alumno.seccion }}</md-table-cell>
              </md-table-row>
            </md-table-body>
          </md-table>

          <md-table-pagination
            md-size="5"
            :md-total="alumnos.length"
            md-page="1"
            md-label="Filas"
            md-separator="de"
            :md-page-options="[5, 10, 25, 50]"></md-table-pagination>

        </md-table-card>
      </md-layout>
    </md-layout>

  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'alumnos',
  data: () => ({
    alumnos: [],
    errors: [],
    filtroGen: '',
    filtroSexo: '',
    filtroGrado: '',
    filtroSeccion: ''
  }),

  methods: {
    fetchAlumnos() {
      axios.get('http://slimapp/api/alumnos')
        .then(response => {
          this.alumnos = response.data;
        }).catch(e => {
          this.errors.push(e);
        });
    },

    // filtrar(alumno) {
    //   return alumno.cedula_escolar.indexOf(this.filtroGen) != -1
    //       || alumno.nombre.indexOf(this.filtroGen) != -1
    //       ;
    // }

    filtrar(list, value, valueS){
      value = value.charAt(0).toUpperCase() + value.slice(1);
      valueS = valueS.charAt(0).toUpperCase() + valueS.slice(1);

      return list.filter(alumno => {
        // if (alumno.seccion.indexOf(value) > -1) {
        //   return alumno.seccion.indexOf(value) > -1;
        // } else if (alumno.cedula_escolar.indexOf(value) > -1) {
        //   return alumno.cedula_escolar.indexOf(value) > -1;
        // } else if (alumno.nombre.indexOf(value) > -1) {
        //   return alumno.nombre.indexOf(value) > -1;
        // } else if (alumno.apellido.indexOf(value) > -1) {
        //   return alumno.apellido.indexOf(value) > -1;
        // } else if (alumno.f_nacimiento.indexOf(value) > -1) {
        //   return alumno.f_nacimiento.indexOf(value) > -1;
        // } else if (alumno.edad.indexOf(value) > -1) {
        //   return alumno.edad.indexOf(value) > -1;
        // } else if (alumno.procedencia.indexOf(value) > -1) {
        //   return alumno.procedencia.indexOf(value) > -1;
        // } else if (alumno.habitacion.indexOf(value) > -1) {
        //   return alumno.habitacion.indexOf(value) > -1;
        // }
        if (valueS != '' && (valueS == 'A' || valueS == 'B' || valueS == 'C' || valueS == 'D')) {
          return alumno.seccion.indexOf(valueS) != -1;
        } else {
          return alumno.cedula_escolar.indexOf(value) != -1
                || alumno.nombre.indexOf(value) != -1;
        }


      });
    },
    //
    // filtrarSexo(list, value) {
    //   value = value.charAt(0).toUpperCase() + value.slice(1);
    //   return list.filter(alumno => {
    //     return alumno.sexo.indexOf(value) > -1;
    //   });
    // },
    //
    // filtrarGrado(list, value) {
    //   value = value.charAt(0).toUpperCase() + value.slice(1);
    //   return list.filter(alumno => {
    //     return alumno.grado.indexOf(value) > -1;
    //   });
    // },
    //
    // filtrarSeccion(list, value) {
    //   value = value.charAt(0).toUpperCase() + value.slice(1);
    //   return list.filter(alumno => {
    //     return alumno.seccion.indexOf(value) > -1;
    //   });
    // }
  },

  created: function() {
    this.fetchAlumnos();
  },

  // updated: function() {
  //    this.fetchAlumnos();
  // }
}
</script>

<style lang="css">
</style>
