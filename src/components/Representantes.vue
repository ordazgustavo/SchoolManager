<template lang="html">
  <div class="representantes">
    <md-layout md-gutter md-align="center" class="pd-t-35">
      <md-layout md-flex="80">
        <h2>Representantes</h2>
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

          <md-table md-sort="cedula">
            <md-table-header>
              <md-table-row>
                <md-table-head md-sort-by="cedula">Cédula</md-table-head>
                <md-table-head md-sort-by="nombre">Nombre y apellido</md-table-head>
                <md-table-head md-sort-by="nacimiento">Parentesco</md-table-head>
                <md-table-head md-sort-by="edad">Dirección</md-table-head>
                <md-table-head md-sort-by="sexo">Teléfono</md-table-head>
              </md-table-row>
            </md-table-header>

            <md-table-body v-if="representantes && representantes.length">
              <md-table-row v-for="representante of filtrar(representantes, filtroGen, filtroSeccion)" :key="representante.cedula">
                <md-table-cell :key="representante.cedula">{{ representante.cedula }}</md-table-cell>
                <md-table-cell>{{ representante.nombre }} {{ representante.apellido }}</md-table-cell>
                <md-table-cell>{{ representante.parentesco }}</md-table-cell>
                <md-table-cell>{{ representante.direccion }}</md-table-cell>
                <md-table-cell>{{ representante.telefono }}</md-table-cell>
              </md-table-row>
            </md-table-body>
          </md-table>

          <md-table-pagination
            md-size="5"
            :md-total="representantes.length"
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
  name: 'representantes',
  data: () => ({
    representantes: [],
    errors: [],
    filtroGen: '',
    filtroSexo: '',
    filtroGrado: '',
    filtroSeccion: ''
  }),

  methods: {
    fetchAlumnos() {
      axios.get('http://slimapp/api/representantes')
        .then(response => {
          this.representantes = response.data;
        }).catch(e => {
          this.errors.push(e);
        });
    },

    filtrar(list, value, valueS){
      value = value.charAt(0).toUpperCase() + value.slice(1);
      valueS = valueS.charAt(0).toUpperCase() + valueS.slice(1);

      return list.filter(representante => {
        if (valueS != '' && (valueS == 'A' || valueS == 'B' || valueS == 'C' || valueS == 'D')) {
          return representante.seccion.indexOf(valueS) != -1;
        } else {
          return representante.cedula.indexOf(value) != -1
                || representante.nombre.indexOf(value) != -1;
        }


      });
    }
  },

  created: function() {
    this.fetchAlumnos();
  },
}
</script>

<style lang="css">
</style>
