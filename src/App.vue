<template>
  <div id="app">

    <md-sidenav class="md-left" ref="leftSidenav">
      <md-toolbar class="md-account-header">
        <md-list class="md-transparent">
          <md-list-item class="md-avatar-list">
            <md-avatar class="md-large">
              <img src="https://placeimg.com/64/64/people/8" alt="People">
            </md-avatar>
          </md-list-item>

          <md-list-item>
            <div class="md-list-text-container">
              <span>Maria Angélica</span>
              <span>silvamartinez67@gmail.com</span>
            </div>

            <md-button class="md-icon-button md-list-action">
              <md-icon>arrow_drop_down</md-icon>
            </md-button>
          </md-list-item>
        </md-list>
      </md-toolbar>

      <md-list>
        <md-list-item @click.native="$refs.leftSidenav.close()">
          <router-link v-bind:to="'/'" exact><md-icon>dashboard</md-icon> <span>Inicio</span></router-link>
        </md-list-item>

        <md-list-item @click.native="$refs.leftSidenav.close()">
          <router-link v-bind:to="'/alumnos'" exact><md-icon>school</md-icon> <span>Alumnos</span></router-link>
        </md-list-item>

        <md-list-item @click.native="$refs.leftSidenav.close()">
          <router-link v-bind:to="'/alumnos/registrar'" exact><md-icon>school</md-icon> <span>Registrar Alumno</span></router-link>
        </md-list-item>
      </md-list>
    </md-sidenav>

    <div class="wrapper">
      <md-whiteframe md-elevation="10">
        <md-toolbar>
          <md-button @click="triggerSidenav">
            <md-icon>menu</md-icon>
          </md-button>
          <h2 class="md-title">Bernardo Acosta</h2>
        </md-toolbar>
      </md-whiteframe>

      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  methods: {
    triggerSidenav() {
      this.$refs.leftSidenav.toggle();
    },
    closeSidenav() {
      this.$refs.leftSidenav.toggle();
    }
  }
}
</script>

<style lang="scss">
  .md-title {
    color: #fff;
  }

  .md-list {
    overflow: auto;
  }

  .md-list-action .md-icon {
    color: rgba(#000, .26);
  }

  .md-avatar-icon .md-icon {
    color: #fff !important;
  }

  .md-sidenav .md-list-text-container > :nth-child(2) {
    color: rgba(#fff, .54);
  }

  .md-account-header {
    .md-list-item:hover .md-button:hover {
      background-color: inherit;
    }

    .md-avatar-list .md-list-item-container:hover {
      background: none !important;
    }
  }

  .stepper {
    background-color: #fff;
  }

  .card {
    width: 100%;
  }

  .pd-35 {
    padding-top: 35px;
  }

  .pd-t-35 {
    padding-top: 35px;
  }

  .pd-b-35 {
    padding-bottom: 35px;
  }

  .pd-r-35 {
    padding-right: 35px;
  }

  .pd-l-35 {
    padding-left: 35px;
  }

  input[type=date]::-webkit-clear-button,
  input[type=date]::-webkit-inner-spin-button,
  input[type=date]::-webkit-calendar-picker-indicator {
      display: none;
  }

  /* SPACE FOR THE SIDENAV */
  /*md-toolbar, main, footer {
    padding-left: 260px;
  }

  @media only screen and (max-width : 992px) {
    header, main, footer {
      padding-left: 0;
    }
  }*/

  /* STYLING THE SIDENAV */
  /*.side-nav li > a {
     padding-left: 15px !important;
  }

  .side-nav li > a.subheader {
     padding-left: 15px !important;
  }

  .side-nav .collapsible-body li a, .side-nav.fixed .collapsible-body li a {
     padding-left: 70px !important;
  }

  .side-nav li.active > a, .side-nav li.active > a > i{
     color: #000;
  }*/

  /* FOOTER FIXED */
  /*body {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }

  main {
    flex: 1 0 auto;
  }*/
</style>
