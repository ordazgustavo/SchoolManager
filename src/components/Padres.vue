<template lang="html">
  <div class="padres">
    <md-layout md-gutter md-align="center" class="pd-t-35">
      <md-layout md-flex="80">
        <h2>Padres</h2>
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
          </md-layout>

          <md-dialog md-open-from="#custom" md-close-to="#custom" ref="dialogo">
            <md-dialog-title style="color:black;">{{ alerta.nombre }} {{ alerta.apellido }}</md-dialog-title>

            <md-dialog-content>
              <div class="contenido">
                <p><strong>Cédula: </strong> {{ alerta.cedula }} <br>
                <strong>Nacionalidad: </strong> {{ alerta.nacionalidad }}<br>
                <strong>Estado Civil: </strong> {{ alerta.estado_civil }}<br>
                <strong>Grado de Instrucción: </strong> {{ alerta.instruccion }}<br>
                <strong>Profesión u oficio: </strong> {{ alerta.profesion }}<br>
                <span v-if="alerta.trabaja">
                  <strong>Trabajo: </strong> {{ alerta.l_trabajo }}<br>
                  <strong>Dirección de trabajo: </strong> {{ alerta.d_trabajo }}<br>
                  <strong>Teléfono de trabajo: </strong> {{ alerta.tlf_trabajo }}<br>
                </span>
                <strong>Teléfono de habitación: </strong> {{ alerta.tlf_habitacion }}<br>
                <strong>Teléfono de móvil: </strong> {{ alerta.tlf_movil }}</p>
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
                <md-table-head md-sort-by="cedula">Cédula</md-table-head>
                <md-table-head md-sort-by="nombre">Nombre y apellido</md-table-head>
                <md-table-head md-sort-by="edad">Estado Civil</md-table-head>
                <md-table-head md-sort-by="habitacion">Tlf habitación</md-table-head>
                <md-table-head md-sort-by="movil">Tlf móvil</md-table-head>
                <md-table-head md-sort-by="acciones"></md-table-head>
              </md-table-row>
            </md-table-header>

            <md-table-body v-if="padres && padres.length">
              <md-table-row v-for="padre of filtrar(padres, filtroGen)" :key="padre.cedula">
                <md-table-cell :key="padre.cedula">{{ padre.cedula }}</md-table-cell>
                <md-table-cell>{{ padre.nombre }} {{ padre.apellido }}</md-table-cell>
                <md-table-cell>{{ padre.estado_civil }}</md-table-cell>
                <md-table-cell>{{ padre.tlf_habitacion }}</md-table-cell>
                <md-table-cell>{{ padre.tlf_movil }}</md-table-cell>
                <md-table-cell>
                  <md-button class="md-icon-button" id="custom" @click="openDialog('dialogo', padre)">
                    <md-icon>remove_red_eye</md-icon>
                  </md-button>
                </md-table-cell>
              </md-table-row>
            </md-table-body>
          </md-table>

          <md-table-pagination
            md-size="5"
            :md-total="padres.length"
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
  name: 'padres',
  data: () => ({
    alerta: {
      nombre: '',
      apellido: '',
      cedula: '',
      nacionalidad: '',
      estado_civil: '',
      instruccion: '',
      profesion: '',
      trabaja: '',
      l_trabajo: '',
      d_trabajo: '',
      tlf_trabajo: '',
      tlf_habitacion: '',
      tlf_movil: ''
    },
    padres: [],
    errors: [],
    filtroGen: '',
    filtroSexo: '',
    filtroGrado: '',
    filtroSeccion: ''
  }),

  methods: {
    openDialog(ref, padre) {
      this.alerta.nombre = padre.nombre;
      this.alerta.apellido = padre.apellido;
      this.alerta.cedula = padre.cedula;
      this.alerta.nacionalidad = padre.nacionalidad;
      this.alerta.estado_civil = padre.estado_civil;
      this.alerta.instruccion = padre.instruccion;
      this.alerta.profesion = padre.profesion;
      this.alerta.trabaja = padre.trabaja;
      this.alerta.l_trabajo = padre.l_trabajo;
      this.alerta.d_trabajo = padre.d_trabajo;
      this.alerta.tlf_trabajo = padre.tlf_trabajo;
      this.alerta.tlf_habitacion = padre.tlf_habitacion;
      this.alerta.tlf_movil = padre.tlf_movil;

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
      axios.get('http://slimapp/api/padres')
        .then(response => {
          this.padres = response.data;
        }).catch(e => {
          this.errors.push(e);
        });
    },

    filtrar(list, value){
      value = value.charAt(0).toLowerCase() + value.slice(1).toLowerCase();

      return list.filter(padre => {
          return padre.cedula.indexOf(value) != -1
              || padre.nombre.toLowerCase().indexOf(value) != -1
              || padre.apellido.toLowerCase().indexOf(value) != -1;
      });
    }
  },

  created: function() {
    this.fetchAlumnos();
  },
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
