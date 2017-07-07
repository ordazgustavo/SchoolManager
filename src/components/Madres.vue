<template lang="html">
  <div class="madres">
    <md-layout md-gutter md-align="center" class="pd-t-35">
      <md-layout md-flex="80">
        <h2>Madres</h2>
      </md-layout>
    </md-layout>

    <md-layout md-gutter="24" md-align="center" class="pd-t-35 pd-b-35">
      <md-layout md-flex="80">
        <md-table-card class="card">
          <md-toolbar>
            <h1 class="md-title">Nutrition</h1>
            <md-button class="md-icon-button">
              <md-icon>filter_list</md-icon>
            </md-button>
            <md-button class="md-icon-button">
              <md-icon>search</md-icon>
            </md-button>
          </md-toolbar>

          <md-table md-sort="cedula">
            <md-table-header>
              <md-table-row>
                <md-table-head md-sort-by="cedula">Cédula escolar</md-table-head>
                <md-table-head md-sort-by="nombre">Nombre y apellido</md-table-head>
                <md-table-head md-sort-by="nacimiento">Fecha nacimiento</md-table-head>
                <md-table-head md-sort-by="edad">Edad</md-table-head>
                <md-table-head md-sort-by="sexo">Sexo</md-table-head>
                <md-table-head md-sort-by="procedencia">Procedencia</md-table-head>
                <md-table-head md-sort-by="direccion">Direccion</md-table-head>
                <md-table-head md-sort-by="grado">Grado</md-table-head>
              </md-table-row>
            </md-table-header>

            <md-table-body v-if="madres && madres.length">
              <md-table-row v-for="madre of madres" :key="madre">
                <md-table-cell :key="madre.cedula_escolar">{{ madre.cedula_escolar }}</md-table-cell>
                <md-table-cell>{{ madre.nombre }} {{ madre.apellido }}</md-table-cell>
                <md-table-cell>{{ madre.f_nacimiento }}</md-table-cell>
                <md-table-cell md-numeric>{{ madre.edad }}</md-table-cell>
                <md-table-cell>{{ madre.sexo }}</md-table-cell>
                <md-table-cell>{{ madre.procedencia }}</md-table-cell>
                <md-table-cell>{{ madre.habitacion }}</md-table-cell>
                <md-table-cell>{{ madre.grado }} {{ madre.seccion }}</md-table-cell>
              </md-table-row>
            </md-table-body>
          </md-table>

          <md-table-pagination
            md-size="5"
            :md-total="madres.length"
            md-page="1"
            md-label="Filas"
            md-separator="de"
            :md-page-options="[5, 10, 25, 50]"
            @pagination="onPagination"></md-table-pagination>

        </md-table-card>
      </md-layout>
    </md-layout>

  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'madres',
  data: () => ({
    madres: [],
    errors: []
  }),

  created() {
    axios.get('http://slimapp/api/madres')
      .then(response => {
        this.alumnos = response.data;
      }).catch(e => {
        this.errors.push(e);
      });
  }
}
</script>

<style lang="css">
</style>
