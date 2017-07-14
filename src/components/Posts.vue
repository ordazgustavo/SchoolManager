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

            <md-layout md-flex-large="15" md-flex="10">
              <md-input-container>
                <label for="sexo">Sexo</label>
                <md-select name="sexo" id="sexo" v-model="filtroSexo">
                  <md-option value="">Nada</md-option>
                  <md-option value="Varón">Varón</md-option>
                  <md-option value="Hembra">Hembra</md-option>
                </md-select>
              </md-input-container>
            </md-layout>

            <md-layout md-flex-large="15" md-flex="10">
              <md-input-container>
                <label for="grado">Grado</label>
                <md-select name="grado" id="grado" v-model="filtroGrado">
                  <md-option value="">Nada</md-option>
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

            <md-layout md-flex-large="15" md-flex="10">
              <md-input-container>
                <label for="seccion">Sección</label>
                <md-select name="seccion" id="seccion" v-model="filtroSeccion">
                  <md-option value="">Nada</md-option>
                  <md-option value="A">A</md-option>
                  <md-option value="B">B</md-option>
                  <md-option value="C">C</md-option>
                  <md-option value="D">D</md-option>
                </md-select>
              </md-input-container>
            </md-layout>
          </md-layout>

          <md-dialog md-open-from="#custom" md-close-to="#custom" ref="dialogo">
            <md-dialog-title style="color:black;">{{ alerta.nombre }} {{ alerta.apellido }}</md-dialog-title>

            <md-dialog-content>
              <div class="contenido">
                <p><strong>Cédula Escolar: </strong> {{ alerta.cedula }} <br>
                <strong>Fecha de nacimiento: </strong> {{ alerta.f_nacimiento }}<br>
                <strong>Edad: </strong> {{ alerta.edad }}<br>
                <strong>Sexo: </strong> {{ alerta.sexo }}<br>
                <strong>Procedencia: </strong> {{ alerta.procedencia }}<br>
                <strong>Dirección: </strong> {{ alerta.habitacion }}<br>
                <strong>Grado: </strong> {{ alerta.grado }}<br>
                <strong>Sección: </strong> {{ alerta.seccion }}</p>
              </div>
            </md-dialog-content>

            <md-dialog-actions>
              <md-button class="md-primary" @click="closeDialog('dialogo')">Cancelar</md-button>
              <md-button class="md-primary" @click="closeDialog('dialogo')">Ok</md-button>
            </md-dialog-actions>
          </md-dialog>

          <md-table md-sort="cedula">
            <md-table-header>
              <md-table-row>
                <md-table-head md-sort-by="cedula">Cédula escolar</md-table-head>
                <md-table-head md-sort-by="nombre">Nombre y apellido</md-table-head>
                <md-table-head md-sort-by="nacimiento">Fecha nac.</md-table-head>
                <md-table-head md-sort-by="edad" md-numeric>Edad</md-table-head>
                <md-table-head md-sort-by="sexo">Sexo</md-table-head>
                <md-table-head md-sort-by="grado">Grado</md-table-head>
                <md-table-head md-sort-by="seccion">Seccion</md-table-head>
                <md-table-head md-sort-by="acciones"></md-table-head>
              </md-table-row>
            </md-table-header>

            <md-table-body v-if="alumnos && alumnos.length">
              <md-table-row v-for="alumno of filtrar(alumnos, filtroGen, filtroSexo, filtroGrado, filtroSeccion)" :key="alumno.cedula_escolar">
                <md-table-cell :key="alumno.cedula_escolar">{{ alumno.cedula_escolar }}</md-table-cell>
                <md-table-cell>{{ alumno.nombre }} {{ alumno.apellido }}</md-table-cell>
                <md-table-cell>{{ alumno.f_nacimiento }}</md-table-cell>
                <md-table-cell md-numeric>{{ alumno.edad }}</md-table-cell>
                <md-table-cell>{{ alumno.sexo }}</md-table-cell>
                <md-table-cell>{{ alumno.grado }}</md-table-cell>
                <md-table-cell>{{ alumno.seccion }}</md-table-cell>
                <md-table-cell>
                  <md-button class="md-icon-button" id="custom" @click="openDialog('dialogo', alumno)">
                    <md-icon>remove_red_eye</md-icon>
                  </md-button>
                </md-table-cell>
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
    alerta: {
      nombre: '',
      apellido: '',
      cedula: '',
      f_nacimiento: '',
      edad: '',
      sexo: '',
      procedencia: '',
      habitacion: '',
      grado: '',
      seccion: ''
    },
    alumnos: [],
    errors: [],
    filtroGen: '',
    filtroSexo: '',
    filtroGrado: '',
    filtroSeccion: ''
  }),

  methods: {
    openDialog(ref, alumno) {
      this.alerta.nombre = alumno.nombre;
      this.alerta.apellido = alumno.apellido;
      this.alerta.cedula = alumno.cedula_escolar;
      this.alerta.f_nacimiento = alumno.f_nacimiento;
      this.alerta.edad = alumno.edad;
      this.alerta.sexo = alumno.sexo;
      this.alerta.procedencia = alumno.procedencia;
      this.alerta.habitacion = alumno.habitacion;
      this.alerta.grado = alumno.grado;
      this.alerta.seccion = alumno.seccion;
      this.$refs[ref].open();
    },

    closeDialog(ref) {
      this.$refs[ref].close();
    },

    onOpen() {
      console.log('Opened');
    },

    onClose(type) {
      console.log('Closed', type);
    },

    fetchAlumnos() {
      axios.get('http://jsonplaceholder.typicode.com/posts')
        .then(response => {
          this.alumnos = response.data;
        }).catch(e => {
          this.errors.push(e);
        });
    },

    filtrar(list, value, valueSex, valueG, valueS){
      value = value.charAt(0).toLowerCase() + value.slice(1).toLowerCase();

      return list.filter(alumno => {
        if (valueS != '' && (valueS == 'A' || valueS == 'B' || valueS == 'C' || valueS == 'D')) {
          return alumno.seccion.indexOf(valueS) != -1;
        } else if (valueSex != '' && (valueSex == 'Hembra' || valueSex == 'Varón')) {
          return alumno.sexo.indexOf(valueSex) != -1;
        } else if (valueG != '' && (valueG == 'Sala 3' || valueG == 'Sala 4' || valueG == 'Sala 5' || valueG == '1' || valueG == '2' || valueG == '3' || valueG == '4' || valueG == '5' || valueG == '6')) {
          return alumno.grado.indexOf(valueG) != -1;
        } else {
          return alumno.cedula_escolar.toLowerCase().indexOf(value) != -1
              || alumno.nombre.toLowerCase().indexOf(value) != -1;
        }


      });
    }
  },

  created: function() {
    this.fetchAlumnos();
  }
}
</script>

<style lang="css">
  .contenido {
    font-size: 12pt;
  }

  .contenido p {
    line-height: 30px;
  }
</style>
